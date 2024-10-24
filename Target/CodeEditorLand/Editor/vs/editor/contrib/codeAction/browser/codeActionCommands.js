var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { HierarchicalKind } from "../../../../base/common/hierarchicalKind.js";
import { IJSONSchema } from "../../../../base/common/jsonSchema.js";
import { KeyCode, KeyMod } from "../../../../base/common/keyCodes.js";
import { escapeRegExpCharacters } from "../../../../base/common/strings.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { EditorAction, EditorCommand, ServicesAccessor } from "../../../browser/editorExtensions.js";
import { EditorContextKeys } from "../../../common/editorContextKeys.js";
import { autoFixCommandId, codeActionCommandId, fixAllCommandId, organizeImportsCommandId, quickFixCommandId, refactorCommandId, sourceActionCommandId } from "./codeAction.js";
import * as nls from "../../../../nls.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { KeybindingWeight } from "../../../../platform/keybinding/common/keybindingsRegistry.js";
import { CodeActionAutoApply, CodeActionCommandArgs, CodeActionFilter, CodeActionKind, CodeActionTriggerSource } from "../common/types.js";
import { CodeActionController } from "./codeActionController.js";
import { SUPPORTED_CODE_ACTIONS } from "./codeActionModel.js";
function contextKeyForSupportedActions(kind) {
  return ContextKeyExpr.regex(
    SUPPORTED_CODE_ACTIONS.keys()[0],
    new RegExp("(\\s|^)" + escapeRegExpCharacters(kind.value) + "\\b")
  );
}
__name(contextKeyForSupportedActions, "contextKeyForSupportedActions");
const argsSchema = {
  type: "object",
  defaultSnippets: [{ body: { kind: "" } }],
  properties: {
    "kind": {
      type: "string",
      description: nls.localize("args.schema.kind", "Kind of the code action to run.")
    },
    "apply": {
      type: "string",
      description: nls.localize("args.schema.apply", "Controls when the returned actions are applied."),
      default: CodeActionAutoApply.IfSingle,
      enum: [CodeActionAutoApply.First, CodeActionAutoApply.IfSingle, CodeActionAutoApply.Never],
      enumDescriptions: [
        nls.localize("args.schema.apply.first", "Always apply the first returned code action."),
        nls.localize("args.schema.apply.ifSingle", "Apply the first returned code action if it is the only one."),
        nls.localize("args.schema.apply.never", "Do not apply the returned code actions.")
      ]
    },
    "preferred": {
      type: "boolean",
      default: false,
      description: nls.localize("args.schema.preferred", "Controls if only preferred code actions should be returned.")
    }
  }
};
function triggerCodeActionsForEditorSelection(editor, notAvailableMessage, filter, autoApply, triggerAction = CodeActionTriggerSource.Default) {
  if (editor.hasModel()) {
    const controller = CodeActionController.get(editor);
    controller?.manualTriggerAtCurrentPosition(notAvailableMessage, triggerAction, filter, autoApply);
  }
}
__name(triggerCodeActionsForEditorSelection, "triggerCodeActionsForEditorSelection");
class QuickFixAction extends EditorAction {
  static {
    __name(this, "QuickFixAction");
  }
  constructor() {
    super({
      id: quickFixCommandId,
      label: nls.localize("quickfix.trigger.label", "Quick Fix..."),
      alias: "Quick Fix...",
      precondition: ContextKeyExpr.and(EditorContextKeys.writable, EditorContextKeys.hasCodeActionsProvider),
      kbOpts: {
        kbExpr: EditorContextKeys.textInputFocus,
        primary: KeyMod.CtrlCmd | KeyCode.Period,
        weight: KeybindingWeight.EditorContrib
      }
    });
  }
  run(_accessor, editor) {
    return triggerCodeActionsForEditorSelection(editor, nls.localize("editor.action.quickFix.noneMessage", "No code actions available"), void 0, void 0, CodeActionTriggerSource.QuickFix);
  }
}
class CodeActionCommand extends EditorCommand {
  static {
    __name(this, "CodeActionCommand");
  }
  constructor() {
    super({
      id: codeActionCommandId,
      precondition: ContextKeyExpr.and(EditorContextKeys.writable, EditorContextKeys.hasCodeActionsProvider),
      metadata: {
        description: "Trigger a code action",
        args: [{ name: "args", schema: argsSchema }]
      }
    });
  }
  runEditorCommand(_accessor, editor, userArgs) {
    const args = CodeActionCommandArgs.fromUser(userArgs, {
      kind: HierarchicalKind.Empty,
      apply: CodeActionAutoApply.IfSingle
    });
    return triggerCodeActionsForEditorSelection(
      editor,
      typeof userArgs?.kind === "string" ? args.preferred ? nls.localize("editor.action.codeAction.noneMessage.preferred.kind", "No preferred code actions for '{0}' available", userArgs.kind) : nls.localize("editor.action.codeAction.noneMessage.kind", "No code actions for '{0}' available", userArgs.kind) : args.preferred ? nls.localize("editor.action.codeAction.noneMessage.preferred", "No preferred code actions available") : nls.localize("editor.action.codeAction.noneMessage", "No code actions available"),
      {
        include: args.kind,
        includeSourceActions: true,
        onlyIncludePreferredActions: args.preferred
      },
      args.apply
    );
  }
}
class RefactorAction extends EditorAction {
  static {
    __name(this, "RefactorAction");
  }
  constructor() {
    super({
      id: refactorCommandId,
      label: nls.localize("refactor.label", "Refactor..."),
      alias: "Refactor...",
      precondition: ContextKeyExpr.and(EditorContextKeys.writable, EditorContextKeys.hasCodeActionsProvider),
      kbOpts: {
        kbExpr: EditorContextKeys.textInputFocus,
        primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyR,
        mac: {
          primary: KeyMod.WinCtrl | KeyMod.Shift | KeyCode.KeyR
        },
        weight: KeybindingWeight.EditorContrib
      },
      contextMenuOpts: {
        group: "1_modification",
        order: 2,
        when: ContextKeyExpr.and(
          EditorContextKeys.writable,
          contextKeyForSupportedActions(CodeActionKind.Refactor)
        )
      },
      metadata: {
        description: "Refactor...",
        args: [{ name: "args", schema: argsSchema }]
      }
    });
  }
  run(_accessor, editor, userArgs) {
    const args = CodeActionCommandArgs.fromUser(userArgs, {
      kind: CodeActionKind.Refactor,
      apply: CodeActionAutoApply.Never
    });
    return triggerCodeActionsForEditorSelection(
      editor,
      typeof userArgs?.kind === "string" ? args.preferred ? nls.localize("editor.action.refactor.noneMessage.preferred.kind", "No preferred refactorings for '{0}' available", userArgs.kind) : nls.localize("editor.action.refactor.noneMessage.kind", "No refactorings for '{0}' available", userArgs.kind) : args.preferred ? nls.localize("editor.action.refactor.noneMessage.preferred", "No preferred refactorings available") : nls.localize("editor.action.refactor.noneMessage", "No refactorings available"),
      {
        include: CodeActionKind.Refactor.contains(args.kind) ? args.kind : HierarchicalKind.None,
        onlyIncludePreferredActions: args.preferred
      },
      args.apply,
      CodeActionTriggerSource.Refactor
    );
  }
}
class SourceAction extends EditorAction {
  static {
    __name(this, "SourceAction");
  }
  constructor() {
    super({
      id: sourceActionCommandId,
      label: nls.localize("source.label", "Source Action..."),
      alias: "Source Action...",
      precondition: ContextKeyExpr.and(EditorContextKeys.writable, EditorContextKeys.hasCodeActionsProvider),
      contextMenuOpts: {
        group: "1_modification",
        order: 2.1,
        when: ContextKeyExpr.and(
          EditorContextKeys.writable,
          contextKeyForSupportedActions(CodeActionKind.Source)
        )
      },
      metadata: {
        description: "Source Action...",
        args: [{ name: "args", schema: argsSchema }]
      }
    });
  }
  run(_accessor, editor, userArgs) {
    const args = CodeActionCommandArgs.fromUser(userArgs, {
      kind: CodeActionKind.Source,
      apply: CodeActionAutoApply.Never
    });
    return triggerCodeActionsForEditorSelection(
      editor,
      typeof userArgs?.kind === "string" ? args.preferred ? nls.localize("editor.action.source.noneMessage.preferred.kind", "No preferred source actions for '{0}' available", userArgs.kind) : nls.localize("editor.action.source.noneMessage.kind", "No source actions for '{0}' available", userArgs.kind) : args.preferred ? nls.localize("editor.action.source.noneMessage.preferred", "No preferred source actions available") : nls.localize("editor.action.source.noneMessage", "No source actions available"),
      {
        include: CodeActionKind.Source.contains(args.kind) ? args.kind : HierarchicalKind.None,
        includeSourceActions: true,
        onlyIncludePreferredActions: args.preferred
      },
      args.apply,
      CodeActionTriggerSource.SourceAction
    );
  }
}
class OrganizeImportsAction extends EditorAction {
  static {
    __name(this, "OrganizeImportsAction");
  }
  constructor() {
    super({
      id: organizeImportsCommandId,
      label: nls.localize("organizeImports.label", "Organize Imports"),
      alias: "Organize Imports",
      precondition: ContextKeyExpr.and(
        EditorContextKeys.writable,
        contextKeyForSupportedActions(CodeActionKind.SourceOrganizeImports)
      ),
      kbOpts: {
        kbExpr: EditorContextKeys.textInputFocus,
        primary: KeyMod.Shift | KeyMod.Alt | KeyCode.KeyO,
        weight: KeybindingWeight.EditorContrib
      }
    });
  }
  run(_accessor, editor) {
    return triggerCodeActionsForEditorSelection(
      editor,
      nls.localize("editor.action.organize.noneMessage", "No organize imports action available"),
      { include: CodeActionKind.SourceOrganizeImports, includeSourceActions: true },
      CodeActionAutoApply.IfSingle,
      CodeActionTriggerSource.OrganizeImports
    );
  }
}
class FixAllAction extends EditorAction {
  static {
    __name(this, "FixAllAction");
  }
  constructor() {
    super({
      id: fixAllCommandId,
      label: nls.localize("fixAll.label", "Fix All"),
      alias: "Fix All",
      precondition: ContextKeyExpr.and(
        EditorContextKeys.writable,
        contextKeyForSupportedActions(CodeActionKind.SourceFixAll)
      )
    });
  }
  run(_accessor, editor) {
    return triggerCodeActionsForEditorSelection(
      editor,
      nls.localize("fixAll.noneMessage", "No fix all action available"),
      { include: CodeActionKind.SourceFixAll, includeSourceActions: true },
      CodeActionAutoApply.IfSingle,
      CodeActionTriggerSource.FixAll
    );
  }
}
class AutoFixAction extends EditorAction {
  static {
    __name(this, "AutoFixAction");
  }
  constructor() {
    super({
      id: autoFixCommandId,
      label: nls.localize("autoFix.label", "Auto Fix..."),
      alias: "Auto Fix...",
      precondition: ContextKeyExpr.and(
        EditorContextKeys.writable,
        contextKeyForSupportedActions(CodeActionKind.QuickFix)
      ),
      kbOpts: {
        kbExpr: EditorContextKeys.textInputFocus,
        primary: KeyMod.Alt | KeyMod.Shift | KeyCode.Period,
        mac: {
          primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.Period
        },
        weight: KeybindingWeight.EditorContrib
      }
    });
  }
  run(_accessor, editor) {
    return triggerCodeActionsForEditorSelection(
      editor,
      nls.localize("editor.action.autoFix.noneMessage", "No auto fixes available"),
      {
        include: CodeActionKind.QuickFix,
        onlyIncludePreferredActions: true
      },
      CodeActionAutoApply.IfSingle,
      CodeActionTriggerSource.AutoFix
    );
  }
}
export {
  AutoFixAction,
  CodeActionCommand,
  FixAllAction,
  OrganizeImportsAction,
  QuickFixAction,
  RefactorAction,
  SourceAction
};
//# sourceMappingURL=codeActionCommands.js.map
