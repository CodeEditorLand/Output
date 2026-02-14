import { Event } from '../../../../base/common/event.js';
import { MarkdownString } from '../../../../base/common/htmlContent.js';
import { ContextKeyExpression, IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IProductService } from '../../../../platform/product/common/productService.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { AgentFileType, IPromptsService } from '../common/promptSyntax/service/promptsService.js';
import { PromptsType } from '../common/promptSyntax/promptTypes.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { ILanguageModelToolsService } from '../common/tools/languageModelToolsService.js';
export declare const IChatTipService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<IChatTipService>;
export interface IChatTip {
    readonly id: string;
    readonly content: MarkdownString;
    readonly enabledCommands?: readonly string[];
}
export interface IChatTipService {
    readonly _serviceBrand: undefined;
    /**
     * Fired when the current tip is dismissed.
     */
    readonly onDidDismissTip: Event<void>;
    /**
     * Fired when the user navigates to a different tip (previous/next).
     */
    readonly onDidNavigateTip: Event<IChatTip>;
    /**
     * Fired when the tip widget is hidden without dismissing the tip.
     */
    readonly onDidHideTip: Event<void>;
    /**
     * Fired when tips are disabled.
     */
    readonly onDidDisableTips: Event<void>;
    /**
     * Gets a tip to show for a request, or undefined if a tip has already been shown this session.
     * Only one tip is shown per conversation session (resets when switching conversations).
     * Tips are suppressed if a welcome tip was already shown in this session.
     * Tips are only shown for requests created after the current session started.
     * @param requestId The unique ID of the request (used for stable rerenders).
     * @param requestTimestamp The timestamp when the request was created.
     * @param contextKeyService The context key service to evaluate tip eligibility.
     */
    getNextTip(requestId: string, requestTimestamp: number, contextKeyService: IContextKeyService): IChatTip | undefined;
    /**
     * Gets a tip to show on the welcome/getting-started view.
     * Unlike {@link getNextTip}, this does not require a request and skips request-timestamp checks.
     * Returns the same tip on repeated calls for stable rerenders.
     */
    getWelcomeTip(contextKeyService: IContextKeyService): IChatTip | undefined;
    /**
     * Resets tip state for a new conversation.
     * Call this when the chat widget binds to a new model.
     */
    resetSession(): void;
    /**
     * Dismisses the current tip and allows a new one to be picked for the same request.
     * The dismissed tip will not be shown again in this profile.
     */
    dismissTip(): void;
    /**
     * Hides the tip widget without permanently dismissing the tip.
     * The tip may be shown again in a future session.
     */
    hideTip(): void;
    /**
     * Disables tips permanently by setting the `chat.tips.enabled` configuration to false.
     */
    disableTips(): Promise<void>;
    /**
     * Navigates to the next tip in the catalog without permanently dismissing the current one.
     * @param contextKeyService The context key service to evaluate tip eligibility.
     */
    navigateToNextTip(contextKeyService: IContextKeyService): IChatTip | undefined;
    /**
     * Navigates to the previous tip in the catalog without permanently dismissing the current one.
     * @param contextKeyService The context key service to evaluate tip eligibility.
     */
    navigateToPreviousTip(contextKeyService: IContextKeyService): IChatTip | undefined;
}
export interface ITipDefinition {
    readonly id: string;
    readonly message: string;
    /**
     * When clause expression that determines if this tip is eligible to be shown.
     * If undefined, the tip is always eligible.
     */
    readonly when?: ContextKeyExpression;
    /**
     * Command IDs that are allowed to be executed from this tip's markdown.
     */
    readonly enabledCommands?: string[];
    /**
     * Command IDs that, if ever executed in this workspace, make this tip ineligible.
     * The tip won't be shown if the user has already performed the action it suggests.
     */
    readonly excludeWhenCommandsExecuted?: string[];
    /**
     * Chat mode names that, if ever used in this workspace, make this tip ineligible.
     * The tip won't be shown if the user has already used the mode it suggests.
     * Matches against both mode kind (e.g. 'agent') and mode name (e.g. 'Plan').
     */
    readonly excludeWhenModesUsed?: string[];
    /**
     * Tool IDs that, if ever invoked in this workspace, make this tip ineligible.
     * The tip won't be shown if the tool it describes has already been used.
     */
    readonly excludeWhenToolsInvoked?: string[];
    /**
     * If set, exclude this tip when prompt files of the specified type exist in the workspace.
     */
    readonly excludeWhenPromptFilesExist?: {
        readonly promptType: PromptsType;
        /** Also check for this specific agent instruction file type. */
        readonly agentFileType?: AgentFileType;
        /** If true, exclude the tip until the async file check completes. Default: false. */
        readonly excludeUntilChecked?: boolean;
    };
}
/**
 * Tracks workspace-level signals that determine whether certain tips should be
 * excluded. Persists state to workspace storage and disposes listeners once all
 * signals of interest have been observed.
 */
export declare class TipEligibilityTracker extends Disposable {
    private readonly _storageService;
    private readonly _promptsService;
    private readonly _languageModelToolsService;
    private readonly _logService;
    private static readonly _COMMANDS_STORAGE_KEY;
    private static readonly _MODES_STORAGE_KEY;
    private static readonly _TOOLS_STORAGE_KEY;
    private readonly _executedCommands;
    private readonly _usedModes;
    private readonly _invokedTools;
    private readonly _pendingCommands;
    private readonly _pendingModes;
    private readonly _pendingTools;
    private readonly _commandListener;
    private readonly _toolListener;
    /**
     * Tip IDs excluded because prompt files of the required type exist in the workspace.
     * Tips with `excludeUntilChecked` are pre-added and removed if no files are found.
     */
    private readonly _excludedByFiles;
    /** Tips that have file-based exclusions, kept for re-checks. */
    private readonly _tipsWithFileExclusions;
    /** Generation counter per tip ID to discard stale async file-check results. */
    private readonly _fileCheckGeneration;
    constructor(tips: readonly ITipDefinition[], commandService: ICommandService, _storageService: IStorageService, _promptsService: IPromptsService, _languageModelToolsService: ILanguageModelToolsService, _logService: ILogService);
    /**
     * Records the current chat mode (kind + name) so future tip eligibility
     * checks can exclude mode-related tips. No-ops once all tracked modes
     * have been observed.
     */
    recordCurrentMode(contextKeyService: IContextKeyService): void;
    /**
     * Returns `true` when the tip should be **excluded** from the eligible set.
     */
    isExcluded(tip: ITipDefinition): boolean;
    private _checkForPromptFiles;
    private _persistSet;
}
export declare class ChatTipService extends Disposable implements IChatTipService {
    private readonly _productService;
    private readonly _configurationService;
    private readonly _storageService;
    private readonly _logService;
    readonly _serviceBrand: undefined;
    private readonly _onDidDismissTip;
    readonly onDidDismissTip: Event<void>;
    private readonly _onDidNavigateTip;
    readonly onDidNavigateTip: Event<IChatTip>;
    private readonly _onDidHideTip;
    readonly onDidHideTip: Event<void>;
    private readonly _onDidDisableTips;
    readonly onDidDisableTips: Event<void>;
    /**
     * Timestamp when the current session started.
     * Used to only show tips for requests created after this time.
     * Resets on each {@link resetSession} call.
     */
    private _sessionStartedAt;
    /**
     * Whether a chatResponse tip has already been shown in this conversation
     * session. Only one response tip is shown per session.
     */
    private _hasShownRequestTip;
    /**
     * The request ID that was assigned a tip (for stable rerenders).
     */
    private _tipRequestId;
    /**
     * The tip that was shown (for stable rerenders).
     */
    private _shownTip;
    private static readonly _DISMISSED_TIP_KEY;
    private static readonly _LAST_TIP_ID_KEY;
    private readonly _tracker;
    constructor(_productService: IProductService, _configurationService: IConfigurationService, _storageService: IStorageService, instantiationService: IInstantiationService, _logService: ILogService);
    resetSession(): void;
    dismissTip(): void;
    private _getDismissedTipIds;
    hideTip(): void;
    disableTips(): Promise<void>;
    getNextTip(requestId: string, requestTimestamp: number, contextKeyService: IContextKeyService): IChatTip | undefined;
    getWelcomeTip(contextKeyService: IContextKeyService): IChatTip | undefined;
    private _pickTip;
    navigateToNextTip(contextKeyService: IContextKeyService): IChatTip | undefined;
    navigateToPreviousTip(contextKeyService: IContextKeyService): IChatTip | undefined;
    private _navigateTip;
    private _isEligible;
    private _isChatLocation;
    private _isCopilotEnabled;
    private _createTip;
}
