var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import { Codicon } from "../../../../base/common/codicons.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { autorun, derived, observableSignal } from "../../../../base/common/observable.js";
import { localize, localize2 } from "../../../../nls.js";
import { MenuId, registerAction2, Action2, MenuRegistry } from "../../../../platform/actions/common/actions.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { TerminalLocation } from "../../../../platform/terminal/common/terminal.js";
import { ISessionsManagementService } from "../../sessions/browser/sessionsManagementService.js";
import { ITerminalService } from "../../../../workbench/contrib/terminal/browser/terminal.js";
import { Menus } from "../../../browser/menus.js";
const STORAGE_KEY_DEFAULT_RUN_ACTION = "workbench.agentSessions.defaultRunAction";
const RunScriptDropdownMenuId = MenuId.for("AgentSessionsRunScriptDropdown");
const RUN_SCRIPT_ACTION_ID = "workbench.action.agentSessions.runScript";
const CONFIGURE_DEFAULT_RUN_ACTION_ID = "workbench.action.agentSessions.configureDefaultRunAction";
let RunScriptContribution = class RunScriptContribution2 extends Disposable {
  static {
    __name(this, "RunScriptContribution");
  }
  static {
    this.ID = "workbench.contrib.agentSessions.runScript";
  }
  constructor(_storageService, _terminalService, activeSessionService, _quickInputService) {
    super();
    this._storageService = _storageService;
    this._terminalService = _terminalService;
    this._quickInputService = _quickInputService;
    this._updateSignal = observableSignal(this);
    this._activeRunState = derived(this, (reader) => {
      const activeSession = activeSessionService.activeSession.read(reader);
      if (!activeSession || !activeSession.repository) {
        return void 0;
      }
      this._updateSignal.read(reader);
      const storageKey = `${STORAGE_KEY_DEFAULT_RUN_ACTION}.${activeSession.repository.toString()}`;
      const action = this._getStoredDefaultAction(storageKey);
      return {
        storageKey,
        action,
        cwd: activeSession.worktree ?? activeSession.repository
      };
    });
    this._registerActions();
  }
  _getStoredDefaultAction(storageKey) {
    const stored = this._storageService.get(
      storageKey,
      1
      /* StorageScope.WORKSPACE */
    );
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed?.name === "string" && typeof parsed?.command === "string") {
          return parsed;
        }
      } catch {
        return void 0;
      }
    }
    return void 0;
  }
  _setStoredDefaultAction(storageKey, action) {
    this._storageService.store(
      storageKey,
      JSON.stringify(action),
      1,
      1
      /* StorageTarget.MACHINE */
    );
    this._updateSignal.trigger(void 0);
  }
  _registerActions() {
    const that = this;
    this._register(autorun((reader) => {
      const activeSession = this._activeRunState.read(reader);
      if (!activeSession) {
        return;
      }
      const title = activeSession.action ? activeSession.action.name : localize("runScriptNoAction", "Run Script");
      const tooltip = activeSession.action ? localize("runScriptTooltip", "Run '{0}' in terminal", activeSession.action.name) : localize("runScriptTooltipNoAction", "Configure run action");
      reader.store.add(registerAction2(class extends Action2 {
        constructor() {
          super({
            id: RUN_SCRIPT_ACTION_ID,
            title,
            tooltip,
            icon: Codicon.play,
            category: localize2("agentSessions", "Agent Sessions"),
            menu: [{
              id: RunScriptDropdownMenuId,
              group: "navigation",
              order: 0
            }]
          });
        }
        async run() {
          if (activeSession.action) {
            await that._runScript(activeSession.cwd, activeSession.action);
          } else {
            await that._showConfigureQuickPick(activeSession);
          }
        }
      }));
      reader.store.add(registerAction2(class extends Action2 {
        constructor() {
          super({
            id: CONFIGURE_DEFAULT_RUN_ACTION_ID,
            title: localize2("configureDefaultRunAction", "Configure Run Action..."),
            category: localize2("agentSessions", "Agent Sessions"),
            icon: Codicon.play,
            menu: [{
              id: RunScriptDropdownMenuId,
              group: "0_configure",
              order: 0
            }]
          });
        }
        async run() {
          await that._showConfigureQuickPick(activeSession);
        }
      }));
    }));
  }
  async _showConfigureQuickPick(activeSession) {
    const command = await this._quickInputService.input({
      placeHolder: localize("enterCommandPlaceholder", "Enter command (e.g., npm run dev)"),
      prompt: localize("enterCommandPrompt", "This command will be run in the integrated terminal")
    });
    if (command) {
      const storedAction = {
        name: command,
        command
      };
      this._setStoredDefaultAction(activeSession.storageKey, storedAction);
      await this._runScript(activeSession.cwd, storedAction);
    }
  }
  async _runScript(cwd, action) {
    const terminal = await this._terminalService.createTerminal({
      location: TerminalLocation.Panel,
      config: {
        name: action.name
      },
      cwd
    });
    terminal.sendText(action.command, true);
    await this._terminalService.revealTerminal(terminal);
  }
};
RunScriptContribution = __decorate([
  __param(0, IStorageService),
  __param(1, ITerminalService),
  __param(2, ISessionsManagementService),
  __param(3, IQuickInputService)
], RunScriptContribution);
MenuRegistry.appendMenuItem(Menus.TitleBarRight, {
  submenu: RunScriptDropdownMenuId,
  isSplitButton: true,
  title: localize2("run", "Run"),
  icon: Codicon.play,
  group: "navigation",
  order: 8
});
export {
  RunScriptContribution,
  RunScriptDropdownMenuId
};
//# sourceMappingURL=runScriptAction.js.map
