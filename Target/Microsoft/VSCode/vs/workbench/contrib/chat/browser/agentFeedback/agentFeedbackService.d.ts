import { Event } from '../../../../../base/common/event.js';
import { Disposable } from '../../../../../base/common/lifecycle.js';
import { URI } from '../../../../../base/common/uri.js';
import { IRange } from '../../../../../editor/common/core/range.js';
import { ICommentService } from '../../../comments/browser/commentService.js';
import { IChatEditingService } from '../../common/editing/chatEditingService.js';
import { IAgentSessionsService } from '../agentSessions/agentSessionsService.js';
import { IChatWidgetService } from '../chat.js';
export interface IAgentFeedback {
    readonly id: string;
    readonly text: string;
    readonly resourceUri: URI;
    readonly range: IRange;
    readonly sessionResource: URI;
}
export interface IAgentFeedbackChangeEvent {
    readonly sessionResource: URI;
    readonly feedbackItems: readonly IAgentFeedback[];
}
export interface IAgentFeedbackNavigationBearing {
    readonly activeIdx: number;
    readonly totalCount: number;
}
export declare const IAgentFeedbackService: import("../../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<IAgentFeedbackService>;
export interface IAgentFeedbackService {
    readonly _serviceBrand: undefined;
    readonly onDidChangeFeedback: Event<IAgentFeedbackChangeEvent>;
    readonly onDidChangeNavigation: Event<URI>;
    /**
     * Add a feedback item for the given session.
     */
    addFeedback(sessionResource: URI, resourceUri: URI, range: IRange, text: string): IAgentFeedback;
    /**
     * Remove a single feedback item.
     */
    removeFeedback(sessionResource: URI, feedbackId: string): void;
    /**
     * Get all feedback items for a session.
     */
    getFeedback(sessionResource: URI): readonly IAgentFeedback[];
    /**
     * Resolve the most recently updated session that has feedback for a given resource.
     */
    getMostRecentSessionForResource(resourceUri: URI): URI | undefined;
    /**
     * Navigate to next/previous feedback item in a session.
     */
    getNextFeedback(sessionResource: URI, next: boolean): IAgentFeedback | undefined;
    /**
     * Get the current navigation bearings for a session.
     */
    getNavigationBearing(sessionResource: URI): IAgentFeedbackNavigationBearing;
    /**
     * Clear all feedback items for a session (e.g., after sending).
     */
    clearFeedback(sessionResource: URI): void;
}
export declare class AgentFeedbackService extends Disposable implements IAgentFeedbackService {
    private readonly _commentService;
    private readonly _chatEditingService;
    private readonly _agentSessionsService;
    private readonly _chatWidgetService;
    readonly _serviceBrand: undefined;
    private readonly _onDidChangeFeedback;
    readonly onDidChangeFeedback: Event<IAgentFeedbackChangeEvent>;
    private readonly _onDidChangeNavigation;
    readonly onDidChangeNavigation: Event<URI>;
    /** sessionResource → feedback items */
    private readonly _feedbackBySession;
    private readonly _sessionUpdatedOrder;
    private _sessionUpdatedSequence;
    private readonly _navigationAnchorBySession;
    private _controllerRegistered;
    private _nextThreadHandle;
    constructor(_commentService: ICommentService, _chatEditingService: IChatEditingService, _agentSessionsService: IAgentSessionsService, _chatWidgetService: IChatWidgetService);
    private _registerChatWidgetListeners;
    private _registerWidgetListeners;
    private _ensureController;
    addFeedback(sessionResource: URI, resourceUri: URI, range: IRange, text: string): IAgentFeedback;
    removeFeedback(sessionResource: URI, feedbackId: string): void;
    /**
     * Find which session a feedback item belongs to by its ID.
     */
    _findSessionForFeedback(feedbackId: string): URI | undefined;
    getFeedback(sessionResource: URI): readonly IAgentFeedback[];
    getMostRecentSessionForResource(resourceUri: URI): URI | undefined;
    private _sessionContainsResource;
    getNextFeedback(sessionResource: URI, next: boolean): IAgentFeedback | undefined;
    getNavigationBearing(sessionResource: URI): IAgentFeedbackNavigationBearing;
    clearFeedback(sessionResource: URI): void;
    /** Threads currently known to the comment service, keyed by feedback id */
    private readonly _activeThreadIds;
    /**
     * Sync feedback threads to the ICommentService using updateComments for
     * incremental add/remove, which the editor controller listens to.
     */
    private _syncThreads;
    private _createRemovedThread;
    private _createThread;
}
