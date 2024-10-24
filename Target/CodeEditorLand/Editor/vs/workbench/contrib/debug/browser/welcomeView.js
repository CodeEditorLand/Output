var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { IViewletViewOptions } from "../../../browser/parts/views/viewsViewlet.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService, RawContextKey, IContextKey, ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { localize, localize2 } from "../../../../nls.js";
import { IDebugService, CONTEXT_DEBUGGERS_AVAILABLE, CONTEXT_DEBUG_EXTENSION_AVAILABLE } from "../common/debug.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IViewDescriptorService, IViewsRegistry, Extensions, ViewContentGroups } from "../../../common/views.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { WorkbenchStateContext } from "../../../common/contextkeys.js";
import { OpenFolderAction, OpenFileAction, OpenFileFolderAction } from "../../../browser/actions/workspaceActions.js";
import { isMacintosh, isWeb } from "../../../../base/common/platform.js";
import { isCodeEditor, isDiffEditor } from "../../../../editor/browser/editorBrowser.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { DisposableStore } from "../../../../base/common/lifecycle.js";
import { SELECT_AND_START_ID, DEBUG_CONFIGURE_COMMAND_ID, DEBUG_START_COMMAND_ID } from "./debugCommands.js";
import { ILocalizedString } from "../../../../platform/action/common/action.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
const debugStartLanguageKey = "debugStartLanguage";
const CONTEXT_DEBUG_START_LANGUAGE = new RawContextKey(debugStartLanguageKey, void 0);
const CONTEXT_DEBUGGER_INTERESTED_IN_ACTIVE_EDITOR = new RawContextKey("debuggerInterestedInActiveEditor", false);
let WelcomeView = class extends ViewPane {
  constructor(options, themeService, keybindingService, contextMenuService, configurationService, contextKeyService, debugService, editorService, instantiationService, viewDescriptorService, openerService, storageSevice, telemetryService, hoverService) {
    super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, telemetryService, hoverService);
    this.debugService = debugService;
    this.editorService = editorService;
    this.debugStartLanguageContext = CONTEXT_DEBUG_START_LANGUAGE.bindTo(contextKeyService);
    this.debuggerInterestedContext = CONTEXT_DEBUGGER_INTERESTED_IN_ACTIVE_EDITOR.bindTo(contextKeyService);
    const lastSetLanguage = storageSevice.get(debugStartLanguageKey, StorageScope.WORKSPACE);
    this.debugStartLanguageContext.set(lastSetLanguage);
    const setContextKey = /* @__PURE__ */ __name(() => {
      let editorControl = this.editorService.activeTextEditorControl;
      if (isDiffEditor(editorControl)) {
        editorControl = editorControl.getModifiedEditor();
      }
      if (isCodeEditor(editorControl)) {
        const model = editorControl.getModel();
        const language = model ? model.getLanguageId() : void 0;
        if (language && this.debugService.getAdapterManager().someDebuggerInterestedInLanguage(language)) {
          this.debugStartLanguageContext.set(language);
          this.debuggerInterestedContext.set(true);
          storageSevice.store(debugStartLanguageKey, language, StorageScope.WORKSPACE, StorageTarget.MACHINE);
          return;
        }
      }
      this.debuggerInterestedContext.set(false);
    }, "setContextKey");
    const disposables = new DisposableStore();
    this._register(disposables);
    this._register(editorService.onDidActiveEditorChange(() => {
      disposables.clear();
      let editorControl = this.editorService.activeTextEditorControl;
      if (isDiffEditor(editorControl)) {
        editorControl = editorControl.getModifiedEditor();
      }
      if (isCodeEditor(editorControl)) {
        disposables.add(editorControl.onDidChangeModelLanguage(setContextKey));
      }
      setContextKey();
    }));
    this._register(this.debugService.getAdapterManager().onDidRegisterDebugger(setContextKey));
    this._register(this.onDidChangeBodyVisibility((visible) => {
      if (visible) {
        setContextKey();
      }
    }));
    setContextKey();
    const debugKeybinding = this.keybindingService.lookupKeybinding(DEBUG_START_COMMAND_ID);
    debugKeybindingLabel = debugKeybinding ? ` (${debugKeybinding.getLabel()})` : "";
  }
  static {
    __name(this, "WelcomeView");
  }
  static ID = "workbench.debug.welcome";
  static LABEL = localize2("run", "Run");
  debugStartLanguageContext;
  debuggerInterestedContext;
  shouldShowWelcome() {
    return true;
  }
};
WelcomeView = __decorateClass([
  __decorateParam(1, IThemeService),
  __decorateParam(2, IKeybindingService),
  __decorateParam(3, IContextMenuService),
  __decorateParam(4, IConfigurationService),
  __decorateParam(5, IContextKeyService),
  __decorateParam(6, IDebugService),
  __decorateParam(7, IEditorService),
  __decorateParam(8, IInstantiationService),
  __decorateParam(9, IViewDescriptorService),
  __decorateParam(10, IOpenerService),
  __decorateParam(11, IStorageService),
  __decorateParam(12, ITelemetryService),
  __decorateParam(13, IHoverService)
], WelcomeView);
const viewsRegistry = Registry.as(Extensions.ViewsRegistry);
viewsRegistry.registerViewWelcomeContent(WelcomeView.ID, {
  content: localize(
    {
      key: "openAFileWhichCanBeDebugged",
      comment: [
        'Please do not translate the word "command", it is part of our internal syntax which must not change',
        '{Locked="](command:{0})"}'
      ]
    },
    "[Open a file](command:{0}) which can be debugged or run.",
    isMacintosh && !isWeb ? OpenFileFolderAction.ID : OpenFileAction.ID
  ),
  when: ContextKeyExpr.and(CONTEXT_DEBUGGERS_AVAILABLE, CONTEXT_DEBUGGER_INTERESTED_IN_ACTIVE_EDITOR.toNegated()),
  group: ViewContentGroups.Open
});
let debugKeybindingLabel = "";
viewsRegistry.registerViewWelcomeContent(WelcomeView.ID, {
  content: `[${localize("runAndDebugAction", "Run and Debug")}${debugKeybindingLabel}](command:${DEBUG_START_COMMAND_ID})`,
  when: CONTEXT_DEBUGGERS_AVAILABLE,
  group: ViewContentGroups.Debug,
  // Allow inserting more buttons directly after this one (by setting order to 1).
  order: 1
});
viewsRegistry.registerViewWelcomeContent(WelcomeView.ID, {
  content: `[${localize("detectThenRunAndDebug", "Show all automatic debug configurations")}](command:${SELECT_AND_START_ID}).`,
  when: CONTEXT_DEBUGGERS_AVAILABLE,
  group: ViewContentGroups.Debug,
  order: 10
});
viewsRegistry.registerViewWelcomeContent(WelcomeView.ID, {
  content: localize(
    {
      key: "customizeRunAndDebug",
      comment: [
        'Please do not translate the word "command", it is part of our internal syntax which must not change',
        '{Locked="](command:{0})"}'
      ]
    },
    "To customize Run and Debug [create a launch.json file](command:{0}).",
    DEBUG_CONFIGURE_COMMAND_ID
  ),
  when: ContextKeyExpr.and(CONTEXT_DEBUGGERS_AVAILABLE, WorkbenchStateContext.notEqualsTo("empty")),
  group: ViewContentGroups.Debug
});
viewsRegistry.registerViewWelcomeContent(WelcomeView.ID, {
  content: localize(
    {
      key: "customizeRunAndDebugOpenFolder",
      comment: [
        'Please do not translate the word "command", it is part of our internal syntax which must not change',
        'Please do not translate "launch.json", it is the specific configuration file name',
        '{Locked="](command:{0})"}'
      ]
    },
    "To customize Run and Debug, [open a folder](command:{0}) and create a launch.json file.",
    isMacintosh && !isWeb ? OpenFileFolderAction.ID : OpenFolderAction.ID
  ),
  when: ContextKeyExpr.and(CONTEXT_DEBUGGERS_AVAILABLE, WorkbenchStateContext.isEqualTo("empty")),
  group: ViewContentGroups.Debug
});
viewsRegistry.registerViewWelcomeContent(WelcomeView.ID, {
  content: localize("allDebuggersDisabled", "All debug extensions are disabled. Enable a debug extension or install a new one from the Marketplace."),
  when: CONTEXT_DEBUG_EXTENSION_AVAILABLE.toNegated(),
  group: ViewContentGroups.Debug
});
export {
  WelcomeView
};
//# sourceMappingURL=welcomeView.js.map
