import { Disposable } from '../../../../base/common/lifecycle.js';
import { MenuId } from '../../../../platform/actions/common/actions.js';
import { IQuickInputService } from '../../../../platform/quickinput/common/quickInput.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IWorkbenchContribution } from '../../../../workbench/common/contributions.js';
import { ISessionsManagementService } from '../../sessions/browser/sessionsManagementService.js';
import { ITerminalService } from '../../../../workbench/contrib/terminal/browser/terminal.js';
export declare const RunScriptDropdownMenuId: MenuId;
/**
 * Workbench contribution that adds a split dropdown action to the auxiliary bar title
 * for running a custom command.
 */
export declare class RunScriptContribution extends Disposable implements IWorkbenchContribution {
    private readonly _storageService;
    private readonly _terminalService;
    private readonly _quickInputService;
    static readonly ID = "workbench.contrib.agentSessions.runScript";
    private readonly _activeRunState;
    private readonly _updateSignal;
    constructor(_storageService: IStorageService, _terminalService: ITerminalService, activeSessionService: ISessionsManagementService, _quickInputService: IQuickInputService);
    private _getStoredDefaultAction;
    private _setStoredDefaultAction;
    private _registerActions;
    private _showConfigureQuickPick;
    private _runScript;
}
