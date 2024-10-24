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
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { matchesFuzzy } from "../../../../base/common/filters.js";
import { DisposableStore } from "../../../../base/common/lifecycle.js";
import { localize } from "../../../../nls.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { FastAndSlowPicks, IPickerQuickAccessItem, PickerQuickAccessProvider, Picks } from "../../../../platform/quickinput/browser/pickerQuickAccess.js";
import { IQuickPickSeparator } from "../../../../platform/quickinput/common/quickInput.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { DEBUG_CONSOLE_QUICK_ACCESS_PREFIX, SELECT_AND_START_ID } from "./debugCommands.js";
import { IDebugService, IDebugSession, REPL_VIEW_ID } from "../common/debug.js";
let DebugConsoleQuickAccess = class extends PickerQuickAccessProvider {
  constructor(_debugService, _viewsService, _commandService) {
    super(DEBUG_CONSOLE_QUICK_ACCESS_PREFIX, { canAcceptInBackground: true });
    this._debugService = _debugService;
    this._viewsService = _viewsService;
    this._commandService = _commandService;
  }
  static {
    __name(this, "DebugConsoleQuickAccess");
  }
  _getPicks(filter, disposables, token) {
    const debugConsolePicks = [];
    this._debugService.getModel().getSessions(true).filter((s) => s.hasSeparateRepl()).forEach((session, index) => {
      const pick = this._createPick(session, index, filter);
      if (pick) {
        debugConsolePicks.push(pick);
      }
    });
    if (debugConsolePicks.length > 0) {
      debugConsolePicks.push({ type: "separator" });
    }
    const createTerminalLabel = localize("workbench.action.debug.startDebug", "Start a New Debug Session");
    debugConsolePicks.push({
      label: `$(plus) ${createTerminalLabel}`,
      ariaLabel: createTerminalLabel,
      accept: /* @__PURE__ */ __name(() => this._commandService.executeCommand(SELECT_AND_START_ID), "accept")
    });
    return debugConsolePicks;
  }
  _createPick(session, sessionIndex, filter) {
    const label = session.name;
    const highlights = matchesFuzzy(filter, label, true);
    if (highlights) {
      return {
        label,
        highlights: { label: highlights },
        accept: /* @__PURE__ */ __name((keyMod, event) => {
          this._debugService.focusStackFrame(void 0, void 0, session, { explicit: true });
          if (!this._viewsService.isViewVisible(REPL_VIEW_ID)) {
            this._viewsService.openView(REPL_VIEW_ID, true);
          }
        }, "accept")
      };
    }
    return void 0;
  }
};
DebugConsoleQuickAccess = __decorateClass([
  __decorateParam(0, IDebugService),
  __decorateParam(1, IViewsService),
  __decorateParam(2, ICommandService)
], DebugConsoleQuickAccess);
export {
  DebugConsoleQuickAccess
};
//# sourceMappingURL=debugConsoleQuickAccess.js.map
