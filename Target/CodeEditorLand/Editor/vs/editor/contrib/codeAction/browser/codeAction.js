var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { coalesce, equals, isNonEmptyArray } from "../../../../base/common/arrays.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { illegalArgument, isCancellationError, onUnexpectedExternalError } from "../../../../base/common/errors.js";
import { Disposable, DisposableStore } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { IBulkEditService } from "../../../browser/services/bulkEditService.js";
import { Range } from "../../../common/core/range.js";
import { Selection } from "../../../common/core/selection.js";
import { LanguageFeatureRegistry } from "../../../common/languageFeatureRegistry.js";
import * as languages from "../../../common/languages.js";
import { ITextModel } from "../../../common/model.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
import { IModelService } from "../../../common/services/model.js";
import { TextModelCancellationTokenSource } from "../../editorState/browser/editorState.js";
import * as nls from "../../../../nls.js";
import { CommandsRegistry, ICommandService } from "../../../../platform/commands/common/commands.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IProgress, Progress } from "../../../../platform/progress/common/progress.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { CodeActionFilter, CodeActionItem, CodeActionKind, CodeActionSet, CodeActionTrigger, CodeActionTriggerSource, filtersAction, mayIncludeActionsOfKind } from "../common/types.js";
import { HierarchicalKind } from "../../../../base/common/hierarchicalKind.js";
import { raceTimeout } from "../../../../base/common/async.js";
const codeActionCommandId = "editor.action.codeAction";
const quickFixCommandId = "editor.action.quickFix";
const autoFixCommandId = "editor.action.autoFix";
const refactorCommandId = "editor.action.refactor";
const refactorPreviewCommandId = "editor.action.refactor.preview";
const sourceActionCommandId = "editor.action.sourceAction";
const organizeImportsCommandId = "editor.action.organizeImports";
const fixAllCommandId = "editor.action.fixAll";
class ManagedCodeActionSet extends Disposable {
  constructor(actions, documentation, disposables) {
    super();
    this.documentation = documentation;
    this._register(disposables);
    this.allActions = [...actions].sort(ManagedCodeActionSet.codeActionsComparator);
    this.validActions = this.allActions.filter(({ action }) => !action.disabled);
  }
  static {
    __name(this, "ManagedCodeActionSet");
  }
  static codeActionsPreferredComparator(a, b) {
    if (a.isPreferred && !b.isPreferred) {
      return -1;
    } else if (!a.isPreferred && b.isPreferred) {
      return 1;
    } else {
      return 0;
    }
  }
  static codeActionsComparator({ action: a }, { action: b }) {
    if (a.isAI && !b.isAI) {
      return 1;
    } else if (!a.isAI && b.isAI) {
      return -1;
    }
    if (isNonEmptyArray(a.diagnostics)) {
      return isNonEmptyArray(b.diagnostics) ? ManagedCodeActionSet.codeActionsPreferredComparator(a, b) : -1;
    } else if (isNonEmptyArray(b.diagnostics)) {
      return 1;
    } else {
      return ManagedCodeActionSet.codeActionsPreferredComparator(a, b);
    }
  }
  validActions;
  allActions;
  get hasAutoFix() {
    return this.validActions.some(({ action: fix }) => !!fix.kind && CodeActionKind.QuickFix.contains(new HierarchicalKind(fix.kind)) && !!fix.isPreferred);
  }
  get hasAIFix() {
    return this.validActions.some(({ action: fix }) => !!fix.isAI);
  }
  get allAIFixes() {
    return this.validActions.every(({ action: fix }) => !!fix.isAI);
  }
}
const emptyCodeActionsResponse = { actions: [], documentation: void 0 };
async function getCodeActions(registry, model, rangeOrSelection, trigger, progress, token) {
  const filter = trigger.filter || {};
  const notebookFilter = {
    ...filter,
    excludes: [...filter.excludes || [], CodeActionKind.Notebook]
  };
  const codeActionContext = {
    only: filter.include?.value,
    trigger: trigger.type
  };
  const cts = new TextModelCancellationTokenSource(model, token);
  const excludeNotebookCodeActions = trigger.type === languages.CodeActionTriggerType.Auto;
  const providers = getCodeActionProviders(registry, model, excludeNotebookCodeActions ? notebookFilter : filter);
  const disposables = new DisposableStore();
  const promises = providers.map(async (provider) => {
    try {
      const codeActionsPromise = Promise.resolve(provider.provideCodeActions(model, rangeOrSelection, codeActionContext, cts.token));
      const providedCodeActions = await raceTimeout(codeActionsPromise, 1250, () => progress.report(provider));
      if (providedCodeActions) {
        disposables.add(providedCodeActions);
      }
      if (cts.token.isCancellationRequested) {
        return emptyCodeActionsResponse;
      }
      const filteredActions = (providedCodeActions?.actions || []).filter((action) => action && filtersAction(filter, action));
      const documentation = getDocumentationFromProvider(provider, filteredActions, filter.include);
      return {
        actions: filteredActions.map((action) => new CodeActionItem(action, provider)),
        documentation
      };
    } catch (err) {
      if (isCancellationError(err)) {
        throw err;
      }
      onUnexpectedExternalError(err);
      return emptyCodeActionsResponse;
    }
  });
  const listener = registry.onDidChange(() => {
    const newProviders = registry.all(model);
    if (!equals(newProviders, providers)) {
      cts.cancel();
    }
  });
  try {
    const actions = await Promise.all(promises);
    const allActions = actions.map((x) => x.actions).flat();
    const allDocumentation = [
      ...coalesce(actions.map((x) => x.documentation)),
      ...getAdditionalDocumentationForShowingActions(registry, model, trigger, allActions)
    ];
    return new ManagedCodeActionSet(allActions, allDocumentation, disposables);
  } finally {
    listener.dispose();
    cts.dispose();
  }
}
__name(getCodeActions, "getCodeActions");
function getCodeActionProviders(registry, model, filter) {
  return registry.all(model).filter((provider) => {
    if (!provider.providedCodeActionKinds) {
      return true;
    }
    return provider.providedCodeActionKinds.some((kind) => mayIncludeActionsOfKind(filter, new HierarchicalKind(kind)));
  });
}
__name(getCodeActionProviders, "getCodeActionProviders");
function* getAdditionalDocumentationForShowingActions(registry, model, trigger, actionsToShow) {
  if (model && actionsToShow.length) {
    for (const provider of registry.all(model)) {
      if (provider._getAdditionalMenuItems) {
        yield* provider._getAdditionalMenuItems?.({ trigger: trigger.type, only: trigger.filter?.include?.value }, actionsToShow.map((item) => item.action));
      }
    }
  }
}
__name(getAdditionalDocumentationForShowingActions, "getAdditionalDocumentationForShowingActions");
function getDocumentationFromProvider(provider, providedCodeActions, only) {
  if (!provider.documentation) {
    return void 0;
  }
  const documentation = provider.documentation.map((entry) => ({ kind: new HierarchicalKind(entry.kind), command: entry.command }));
  if (only) {
    let currentBest;
    for (const entry of documentation) {
      if (entry.kind.contains(only)) {
        if (!currentBest) {
          currentBest = entry;
        } else {
          if (currentBest.kind.contains(entry.kind)) {
            currentBest = entry;
          }
        }
      }
    }
    if (currentBest) {
      return currentBest?.command;
    }
  }
  for (const action of providedCodeActions) {
    if (!action.kind) {
      continue;
    }
    for (const entry of documentation) {
      if (entry.kind.contains(new HierarchicalKind(action.kind))) {
        return entry.command;
      }
    }
  }
  return void 0;
}
__name(getDocumentationFromProvider, "getDocumentationFromProvider");
var ApplyCodeActionReason = /* @__PURE__ */ ((ApplyCodeActionReason2) => {
  ApplyCodeActionReason2["OnSave"] = "onSave";
  ApplyCodeActionReason2["FromProblemsView"] = "fromProblemsView";
  ApplyCodeActionReason2["FromCodeActions"] = "fromCodeActions";
  ApplyCodeActionReason2["FromAILightbulb"] = "fromAILightbulb";
  ApplyCodeActionReason2["FromProblemsHover"] = "fromProblemsHover";
  return ApplyCodeActionReason2;
})(ApplyCodeActionReason || {});
async function applyCodeAction(accessor, item, codeActionReason, options, token = CancellationToken.None) {
  const bulkEditService = accessor.get(IBulkEditService);
  const commandService = accessor.get(ICommandService);
  const telemetryService = accessor.get(ITelemetryService);
  const notificationService = accessor.get(INotificationService);
  telemetryService.publicLog2("codeAction.applyCodeAction", {
    codeActionTitle: item.action.title,
    codeActionKind: item.action.kind,
    codeActionIsPreferred: !!item.action.isPreferred,
    reason: codeActionReason
  });
  await item.resolve(token);
  if (token.isCancellationRequested) {
    return;
  }
  if (item.action.edit?.edits.length) {
    const result = await bulkEditService.apply(item.action.edit, {
      editor: options?.editor,
      label: item.action.title,
      quotableLabel: item.action.title,
      code: "undoredo.codeAction",
      respectAutoSaveConfig: codeActionReason !== "onSave" /* OnSave */,
      showPreview: options?.preview
    });
    if (!result.isApplied) {
      return;
    }
  }
  if (item.action.command) {
    try {
      await commandService.executeCommand(item.action.command.id, ...item.action.command.arguments || []);
    } catch (err) {
      const message = asMessage(err);
      notificationService.error(
        typeof message === "string" ? message : nls.localize("applyCodeActionFailed", "An unknown error occurred while applying the code action")
      );
    }
  }
}
__name(applyCodeAction, "applyCodeAction");
function asMessage(err) {
  if (typeof err === "string") {
    return err;
  } else if (err instanceof Error && typeof err.message === "string") {
    return err.message;
  } else {
    return void 0;
  }
}
__name(asMessage, "asMessage");
CommandsRegistry.registerCommand("_executeCodeActionProvider", async function(accessor, resource, rangeOrSelection, kind, itemResolveCount) {
  if (!(resource instanceof URI)) {
    throw illegalArgument();
  }
  const { codeActionProvider } = accessor.get(ILanguageFeaturesService);
  const model = accessor.get(IModelService).getModel(resource);
  if (!model) {
    throw illegalArgument();
  }
  const validatedRangeOrSelection = Selection.isISelection(rangeOrSelection) ? Selection.liftSelection(rangeOrSelection) : Range.isIRange(rangeOrSelection) ? model.validateRange(rangeOrSelection) : void 0;
  if (!validatedRangeOrSelection) {
    throw illegalArgument();
  }
  const include = typeof kind === "string" ? new HierarchicalKind(kind) : void 0;
  const codeActionSet = await getCodeActions(
    codeActionProvider,
    model,
    validatedRangeOrSelection,
    { type: languages.CodeActionTriggerType.Invoke, triggerAction: CodeActionTriggerSource.Default, filter: { includeSourceActions: true, include } },
    Progress.None,
    CancellationToken.None
  );
  const resolving = [];
  const resolveCount = Math.min(codeActionSet.validActions.length, typeof itemResolveCount === "number" ? itemResolveCount : 0);
  for (let i = 0; i < resolveCount; i++) {
    resolving.push(codeActionSet.validActions[i].resolve(CancellationToken.None));
  }
  try {
    await Promise.all(resolving);
    return codeActionSet.validActions.map((item) => item.action);
  } finally {
    setTimeout(() => codeActionSet.dispose(), 100);
  }
});
export {
  ApplyCodeActionReason,
  applyCodeAction,
  autoFixCommandId,
  codeActionCommandId,
  fixAllCommandId,
  getCodeActions,
  organizeImportsCommandId,
  quickFixCommandId,
  refactorCommandId,
  refactorPreviewCommandId,
  sourceActionCommandId
};
//# sourceMappingURL=codeAction.js.map
