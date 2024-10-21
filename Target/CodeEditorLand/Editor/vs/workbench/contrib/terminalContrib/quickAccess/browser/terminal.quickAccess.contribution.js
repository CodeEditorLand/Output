var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as nls from "../../../../../nls.js";
import { CommandsRegistry } from "../../../../../platform/commands/common/commands.js";
import { ContextKeyExpr } from "../../../../../platform/contextkey/common/contextkey.js";
import { IQuickAccessRegistry, Extensions as QuickAccessExtensions } from "../../../../../platform/quickinput/common/quickAccess.js";
import { IQuickInputService } from "../../../../../platform/quickinput/common/quickInput.js";
import { Registry } from "../../../../../platform/registry/common/platform.js";
import { getQuickNavigateHandler } from "../../../../browser/quickaccess.js";
import { registerTerminalAction } from "../../../terminal/browser/terminalActions.js";
import { TerminalContextKeys } from "../../../terminal/common/terminalContextKey.js";
import { TerminalQuickAccessProvider } from "../../../terminalContrib/quickAccess/browser/terminalQuickAccess.js";
var TerminalQuickAccessCommandId = /* @__PURE__ */ ((TerminalQuickAccessCommandId2) => {
  TerminalQuickAccessCommandId2["QuickOpenTerm"] = "workbench.action.quickOpenTerm";
  return TerminalQuickAccessCommandId2;
})(TerminalQuickAccessCommandId || {});
const quickAccessRegistry = Registry.as(QuickAccessExtensions.Quickaccess);
const inTerminalsPicker = "inTerminalPicker";
quickAccessRegistry.registerQuickAccessProvider({
  ctor: TerminalQuickAccessProvider,
  prefix: TerminalQuickAccessProvider.PREFIX,
  contextKey: inTerminalsPicker,
  placeholder: nls.localize("tasksQuickAccessPlaceholder", "Type the name of a terminal to open."),
  helpEntries: [{ description: nls.localize("tasksQuickAccessHelp", "Show All Opened Terminals"), commandId: "workbench.action.quickOpenTerm" /* QuickOpenTerm */ }]
});
const quickAccessNavigateNextInTerminalPickerId = "workbench.action.quickOpenNavigateNextInTerminalPicker";
CommandsRegistry.registerCommand({ id: quickAccessNavigateNextInTerminalPickerId, handler: getQuickNavigateHandler(quickAccessNavigateNextInTerminalPickerId, true) });
const quickAccessNavigatePreviousInTerminalPickerId = "workbench.action.quickOpenNavigatePreviousInTerminalPicker";
CommandsRegistry.registerCommand({ id: quickAccessNavigatePreviousInTerminalPickerId, handler: getQuickNavigateHandler(quickAccessNavigatePreviousInTerminalPickerId, false) });
registerTerminalAction({
  id: "workbench.action.quickOpenTerm" /* QuickOpenTerm */,
  title: nls.localize2("quickAccessTerminal", "Switch Active Terminal"),
  precondition: ContextKeyExpr.or(TerminalContextKeys.processSupported, TerminalContextKeys.terminalHasBeenCreated),
  run: /* @__PURE__ */ __name((c, accessor) => accessor.get(IQuickInputService).quickAccess.show(TerminalQuickAccessProvider.PREFIX), "run")
});
//# sourceMappingURL=terminal.quickAccess.contribution.js.map
