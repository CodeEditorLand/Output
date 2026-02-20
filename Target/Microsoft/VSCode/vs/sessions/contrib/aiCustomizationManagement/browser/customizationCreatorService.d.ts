import { ISessionsManagementService } from '../../sessions/browser/sessionsManagementService.js';
import { IChatWidgetService } from '../../../../workbench/contrib/chat/browser/chat.js';
import { IChatService } from '../../../../workbench/contrib/chat/common/chatService/chatService.js';
import { PromptsType } from '../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js';
import { IPromptsService } from '../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js';
import { URI } from '../../../../base/common/uri.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IQuickInputService } from '../../../../platform/quickinput/common/quickInput.js';
/**
 * Service that opens an AI-guided chat session to help the user create
 * a new customization (agent, skill, instructions, prompt, hook).
 *
 * Opens a new chat in agent mode, then sends a request with hidden
 * system instructions (modeInstructions) that guide the AI through
 * the creation process. The user sees only their message.
 */
export declare class CustomizationCreatorService {
    private readonly commandService;
    private readonly chatService;
    private readonly chatWidgetService;
    private readonly activeSessionService;
    private readonly promptsService;
    private readonly quickInputService;
    constructor(commandService: ICommandService, chatService: IChatService, chatWidgetService: IChatWidgetService, activeSessionService: ISessionsManagementService, promptsService: IPromptsService, quickInputService: IQuickInputService);
    createWithAI(type: PromptsType): Promise<void>;
    /**
     * Returns the worktree and repository URIs from the active session.
     */
    /**
     * Resolves the worktree directory for a new customization file based on the
     * active session's worktree (preferred) or repository path.
     * Falls back to the first local source folder from promptsService.getSourceFolders()
     * if there's no active worktree.
     */
    resolveTargetDirectory(type: PromptsType): URI | undefined;
    /**
     * Resolves the user-level directory for a new customization file.
     * Delegates to IPromptsService.getSourceFolders() which knows the correct
     * user data profile path.
     */
    resolveUserDirectory(type: PromptsType): Promise<URI | undefined>;
}
