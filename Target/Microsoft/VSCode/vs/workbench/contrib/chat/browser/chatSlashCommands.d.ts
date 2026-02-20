import { Disposable } from '../../../../base/common/lifecycle.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IChatAgentService } from '../common/participants/chatAgents.js';
import { IChatSlashCommandService } from '../common/participants/chatSlashCommands.js';
import { IChatService } from '../common/chatService/chatService.js';
import { IAgentSessionsService } from './agentSessions/agentSessionsService.js';
import { IChatWidgetService } from './chat.js';
export declare class ChatSlashCommandsContribution extends Disposable {
    static readonly ID = "workbench.contrib.chatSlashCommands";
    constructor(slashCommandService: IChatSlashCommandService, commandService: ICommandService, chatAgentService: IChatAgentService, chatWidgetService: IChatWidgetService, instantiationService: IInstantiationService, agentSessionsService: IAgentSessionsService, chatService: IChatService);
}
