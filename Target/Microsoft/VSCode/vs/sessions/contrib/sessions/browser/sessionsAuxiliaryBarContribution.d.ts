import { Disposable } from '../../../../base/common/lifecycle.js';
import { IAgentSessionsService } from '../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsService.js';
import { IChatService } from '../../../../workbench/contrib/chat/common/chatService/chatService.js';
import { IChatEditingService } from '../../../../workbench/contrib/chat/common/editing/chatEditingService.js';
import { IWorkbenchLayoutService } from '../../../../workbench/services/layout/browser/layoutService.js';
import { ISessionsManagementService } from './sessionsManagementService.js';
export declare class SessionsAuxiliaryBarContribution extends Disposable {
    private readonly layoutService;
    private readonly sessionManagementService;
    private readonly chatEditingService;
    private readonly agentSessionsService;
    private readonly chatService;
    static readonly ID = "workbench.contrib.sessionsAuxiliaryBarContribution";
    private readonly pendingTurnStateByResource;
    constructor(layoutService: IWorkbenchLayoutService, sessionManagementService: ISessionsManagementService, chatEditingService: IChatEditingService, agentSessionsService: IAgentSessionsService, chatService: IChatService);
    private hasSessionChanges;
    private syncAuxiliaryBarVisibility;
}
