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
import * as dom from "../../../../../base/browser/dom.js";
import { AutoOpenBarrier } from "../../../../../base/common/async.js";
import { Event } from "../../../../../base/common/event.js";
import { KeyCode, KeyMod } from "../../../../../base/common/keyCodes.js";
import { DisposableStore, MutableDisposable, toDisposable } from "../../../../../base/common/lifecycle.js";
import { isWindows } from "../../../../../base/common/platform.js";
import { localize2 } from "../../../../../nls.js";
import { CONTEXT_ACCESSIBILITY_MODE_ENABLED } from "../../../../../platform/accessibility/common/accessibility.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr, IContextKey, IContextKeyService, IReadableSet } from "../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { KeybindingWeight } from "../../../../../platform/keybinding/common/keybindingsRegistry.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../../platform/storage/common/storage.js";
import { GeneralShellType, TerminalLocation, TerminalSettingId } from "../../../../../platform/terminal/common/terminal.js";
import { ShellIntegrationOscPs } from "../../../../../platform/terminal/common/xterm/shellIntegrationAddon.js";
import { SimpleCompletionItem } from "../../../../services/suggest/browser/simpleCompletionItem.js";
import { ITerminalContribution, ITerminalInstance, IXtermTerminal } from "../../../terminal/browser/terminal.js";
import { registerActiveInstanceAction } from "../../../terminal/browser/terminalActions.js";
import { registerTerminalContribution } from "../../../terminal/browser/terminalExtensions.js";
import { registerSendSequenceKeybinding } from "../../../terminal/browser/terminalKeybindings.js";
import { TERMINAL_CONFIG_SECTION } from "../../../terminal/common/terminal.js";
import { TerminalContextKeys, TerminalContextKeyStrings } from "../../../terminal/common/terminalContextKey.js";
import { TerminalSuggestCommandId } from "../common/terminal.suggest.js";
import { terminalSuggestConfigSection, TerminalSuggestSettingId } from "../common/terminalSuggestConfiguration.js";
import { parseCompletionsFromShell, SuggestAddon, VSCodeSuggestOscPt } from "./terminalSuggestAddon.js";
import { TerminalClipboardContribution } from "../../clipboard/browser/terminal.clipboard.contribution.js";
var Constants = /* @__PURE__ */ ((Constants2) => {
  Constants2["CachedPwshCommandsStorageKey"] = "terminal.suggest.pwshCommands";
  return Constants2;
})(Constants || {});
let TerminalSuggestContribution = class extends DisposableStore {
  constructor(_ctx, _contextKeyService, _configurationService, _instantiationService, _storageService) {
    super();
    this._ctx = _ctx;
    this._contextKeyService = _contextKeyService;
    this._configurationService = _configurationService;
    this._instantiationService = _instantiationService;
    this._storageService = _storageService;
    this.add(toDisposable(() => this._addon?.dispose()));
    this._terminalSuggestWidgetVisibleContextKey = TerminalContextKeys.suggestWidgetVisible.bindTo(this._contextKeyService);
    if (TerminalSuggestContribution._cachedPwshCommands.size === 0) {
      const config = this._storageService.get("terminal.suggest.pwshCommands" /* CachedPwshCommandsStorageKey */, StorageScope.APPLICATION, void 0);
      if (config !== void 0) {
        const completions = JSON.parse(config);
        for (const c of completions) {
          TerminalSuggestContribution._cachedPwshCommands.add(c);
        }
      }
    }
    this.add(this._configurationService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(TerminalSuggestSettingId.Enabled)) {
        this.clearSuggestCache();
      }
    }));
  }
  static {
    __name(this, "TerminalSuggestContribution");
  }
  static ID = "terminal.suggest";
  static get(instance) {
    return instance.getContribution(TerminalSuggestContribution.ID);
  }
  _xterm;
  _addon = new MutableDisposable();
  _terminalSuggestWidgetContextKeys = new Set(TerminalContextKeys.suggestWidgetVisible.key);
  _terminalSuggestWidgetVisibleContextKey;
  get addon() {
    return this._addon.value;
  }
  static _cachedPwshCommands = /* @__PURE__ */ new Set();
  xtermReady(xterm) {
    this._xterm = xterm.raw;
    const config = this._configurationService.getValue(terminalSuggestConfigSection);
    const enabled = config.enabled;
    if (!enabled) {
      return;
    }
    this.add(xterm.raw.parser.registerOscHandler(ShellIntegrationOscPs.VSCode, (data) => {
      return this._handleVSCodeSequence(data);
    }));
  }
  _handleVSCodeSequence(data) {
    if (!this._xterm) {
      return false;
    }
    const [command, ...args] = data.split(";");
    switch (command) {
      case VSCodeSuggestOscPt.CompletionsPwshCommands:
        return this._handleCompletionsPwshCommandsSequence(this._xterm, data, command, args);
    }
    return false;
  }
  async _handleCompletionsPwshCommandsSequence(terminal, data, command, args) {
    const type = args[0];
    const rawCompletions = JSON.parse(data.slice(
      command.length + type.length + 2
      /*semi-colons*/
    ));
    const completions = parseCompletionsFromShell(rawCompletions);
    const set = TerminalSuggestContribution._cachedPwshCommands;
    set.clear();
    for (const c of completions) {
      set.add(c);
    }
    this._storageService.store("terminal.suggest.pwshCommands" /* CachedPwshCommandsStorageKey */, JSON.stringify(Array.from(set.values())), StorageScope.APPLICATION, StorageTarget.MACHINE);
    return true;
  }
  clearSuggestCache() {
    TerminalSuggestContribution._cachedPwshCommands.clear();
    this._storageService.remove("terminal.suggest.pwshCommands" /* CachedPwshCommandsStorageKey */, StorageScope.APPLICATION);
  }
  xtermOpen(xterm) {
    const config = this._configurationService.getValue(terminalSuggestConfigSection);
    const enabled = config.enabled;
    if (!enabled) {
      return;
    }
    this.add(Event.runAndSubscribe(this._ctx.instance.onDidChangeShellType, async () => {
      this._loadSuggestAddon(xterm.raw);
    }));
    this.add(this._contextKeyService.onDidChangeContext((e) => {
      if (e.affectsSome(this._terminalSuggestWidgetContextKeys)) {
        this._loadSuggestAddon(xterm.raw);
      }
    }));
    this.add(this._configurationService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(TerminalSettingId.SendKeybindingsToShell)) {
        this._loadSuggestAddon(xterm.raw);
      }
    }));
  }
  _loadSuggestAddon(xterm) {
    const sendingKeybindingsToShell = this._configurationService.getValue(TERMINAL_CONFIG_SECTION).sendKeybindingsToShell;
    if (sendingKeybindingsToShell || this._ctx.instance.shellType !== "pwsh") {
      this._addon.clear();
      return;
    }
    if (this._terminalSuggestWidgetVisibleContextKey) {
      const addon = this._addon.value = this._instantiationService.createInstance(SuggestAddon, TerminalSuggestContribution._cachedPwshCommands, this._ctx.instance.capabilities, this._terminalSuggestWidgetVisibleContextKey);
      xterm.loadAddon(addon);
      if (this._ctx.instance.target === TerminalLocation.Editor) {
        addon.setContainerWithOverflow(xterm.element);
      } else {
        addon.setContainerWithOverflow(dom.findParentWithClass(xterm.element, "panel"));
      }
      addon.setScreen(xterm.element.querySelector(".xterm-screen"));
      this.add(this._ctx.instance.onDidBlur(() => addon.hideSuggestWidget()));
      this.add(addon.onAcceptedCompletion(async (text) => {
        this._ctx.instance.focus();
        this._ctx.instance.sendText(text, false);
      }));
      const clipboardContrib = TerminalClipboardContribution.get(this._ctx.instance);
      this.add(clipboardContrib.onWillPaste(() => addon.isPasting = true));
      this.add(clipboardContrib.onDidPaste(() => {
        setTimeout(() => addon.isPasting = false, 100);
      }));
      if (!isWindows) {
        let barrier;
        this.add(addon.onDidRequestCompletions(() => {
          barrier = new AutoOpenBarrier(2e3);
          this._ctx.instance.pauseInputEvents(barrier);
        }));
        this.add(addon.onDidReceiveCompletions(() => {
          barrier?.open();
          barrier = void 0;
        }));
      }
    }
  }
};
TerminalSuggestContribution = __decorateClass([
  __decorateParam(1, IContextKeyService),
  __decorateParam(2, IConfigurationService),
  __decorateParam(3, IInstantiationService),
  __decorateParam(4, IStorageService)
], TerminalSuggestContribution);
registerTerminalContribution(TerminalSuggestContribution.ID, TerminalSuggestContribution);
registerSendSequenceKeybinding("\x1B[24~e", {
  // F12,e -> ctrl+space (Native suggest)
  when: ContextKeyExpr.and(TerminalContextKeys.focus, ContextKeyExpr.equals(TerminalContextKeyStrings.ShellType, GeneralShellType.PowerShell), TerminalContextKeys.terminalShellIntegrationEnabled, CONTEXT_ACCESSIBILITY_MODE_ENABLED.negate(), ContextKeyExpr.equals(`config.${TerminalSuggestSettingId.Enabled}`, true)),
  primary: KeyMod.CtrlCmd | KeyCode.Space,
  mac: { primary: KeyMod.WinCtrl | KeyCode.Space }
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.SelectPrevSuggestion,
  title: localize2("workbench.action.terminal.selectPrevSuggestion", "Select the Previous Suggestion"),
  f1: false,
  precondition: ContextKeyExpr.and(ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated), TerminalContextKeys.focus, TerminalContextKeys.isOpen, TerminalContextKeys.suggestWidgetVisible),
  keybinding: {
    // Up is bound to other workbench keybindings that this needs to beat
    primary: KeyCode.UpArrow,
    weight: KeybindingWeight.WorkbenchContrib + 1
  },
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.addon?.selectPreviousSuggestion(), "run")
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.SelectPrevPageSuggestion,
  title: localize2("workbench.action.terminal.selectPrevPageSuggestion", "Select the Previous Page Suggestion"),
  f1: false,
  precondition: ContextKeyExpr.and(ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated), TerminalContextKeys.focus, TerminalContextKeys.isOpen, TerminalContextKeys.suggestWidgetVisible),
  keybinding: {
    // Up is bound to other workbench keybindings that this needs to beat
    primary: KeyCode.PageUp,
    weight: KeybindingWeight.WorkbenchContrib + 1
  },
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.addon?.selectPreviousPageSuggestion(), "run")
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.SelectNextSuggestion,
  title: localize2("workbench.action.terminal.selectNextSuggestion", "Select the Next Suggestion"),
  f1: false,
  precondition: ContextKeyExpr.and(ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated), TerminalContextKeys.focus, TerminalContextKeys.isOpen, TerminalContextKeys.suggestWidgetVisible),
  keybinding: {
    // Down is bound to other workbench keybindings that this needs to beat
    primary: KeyCode.DownArrow,
    weight: KeybindingWeight.WorkbenchContrib + 1
  },
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.addon?.selectNextSuggestion(), "run")
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.SelectNextPageSuggestion,
  title: localize2("workbench.action.terminal.selectNextPageSuggestion", "Select the Next Page Suggestion"),
  f1: false,
  precondition: ContextKeyExpr.and(ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated), TerminalContextKeys.focus, TerminalContextKeys.isOpen, TerminalContextKeys.suggestWidgetVisible),
  keybinding: {
    // Down is bound to other workbench keybindings that this needs to beat
    primary: KeyCode.PageDown,
    weight: KeybindingWeight.WorkbenchContrib + 1
  },
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.addon?.selectNextPageSuggestion(), "run")
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.AcceptSelectedSuggestion,
  title: localize2("workbench.action.terminal.acceptSelectedSuggestion", "Accept Selected Suggestion"),
  f1: false,
  precondition: ContextKeyExpr.and(ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated), TerminalContextKeys.focus, TerminalContextKeys.isOpen, TerminalContextKeys.suggestWidgetVisible),
  keybinding: {
    primary: KeyCode.Tab,
    // Tab is bound to other workbench keybindings that this needs to beat
    weight: KeybindingWeight.WorkbenchContrib + 1
  },
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.addon?.acceptSelectedSuggestion(), "run")
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.AcceptSelectedSuggestionEnter,
  title: localize2("workbench.action.terminal.acceptSelectedSuggestionEnter", "Accept Selected Suggestion (Enter)"),
  f1: false,
  precondition: ContextKeyExpr.and(ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated), TerminalContextKeys.focus, TerminalContextKeys.isOpen, TerminalContextKeys.suggestWidgetVisible),
  keybinding: {
    primary: KeyCode.Enter,
    // Enter is bound to other workbench keybindings that this needs to beat
    weight: KeybindingWeight.WorkbenchContrib + 1,
    when: ContextKeyExpr.notEquals(`config.${TerminalSuggestSettingId.RunOnEnter}`, "ignore")
  },
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.addon?.acceptSelectedSuggestion(void 0, true), "run")
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.HideSuggestWidget,
  title: localize2("workbench.action.terminal.hideSuggestWidget", "Hide Suggest Widget"),
  f1: false,
  precondition: ContextKeyExpr.and(ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated), TerminalContextKeys.focus, TerminalContextKeys.isOpen, TerminalContextKeys.suggestWidgetVisible),
  keybinding: {
    primary: KeyCode.Escape,
    // Escape is bound to other workbench keybindings that this needs to beat
    weight: KeybindingWeight.WorkbenchContrib + 1
  },
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.addon?.hideSuggestWidget(), "run")
});
registerActiveInstanceAction({
  id: TerminalSuggestCommandId.ClearSuggestCache,
  title: localize2("workbench.action.terminal.clearSuggestCache", "Clear Suggest Cache"),
  f1: true,
  run: /* @__PURE__ */ __name((activeInstance) => TerminalSuggestContribution.get(activeInstance)?.clearSuggestCache(), "run")
});
//# sourceMappingURL=terminal.suggest.contribution.js.map
