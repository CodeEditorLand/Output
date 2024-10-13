import { CancellationToken } from "../../../base/common/cancellation.js";
import { Event } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { URI, UriComponents } from "../../../base/common/uri.js";
import { IRange } from "../../../editor/common/core/range.js";
import * as languages from "../../../editor/common/languages.js";
import { ExtensionIdentifier } from "../../../platform/extensions/common/extensions.js";
import { IUriIdentityService } from "../../../platform/uriIdentity/common/uriIdentity.js";
import { MarshalledCommentThread } from "../../common/comments.js";
import { IViewDescriptorService } from "../../common/views.js";
import {
	ICommentController,
	ICommentService,
} from "../../contrib/comments/browser/commentService.js";
import { ICellRange } from "../../contrib/notebook/common/notebookRange.js";
import { IEditorService } from "../../services/editor/common/editorService.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { IViewsService } from "../../services/views/common/viewsService.js";
import {
	CommentProviderFeatures,
	CommentThreadChanges,
	ExtHostCommentsShape,
	MainThreadCommentsShape,
} from "../common/extHost.protocol.js";

export declare class MainThreadCommentThread<T>
	implements languages.CommentThread<T>
{
	commentThreadHandle: number;
	controllerHandle: number;
	extensionId: string;
	threadId: string;
	resource: string;
	private _range;
	private _canReply;
	private _isTemplate;
	editorId?: string | undefined;
	private _input?;
	get input(): languages.CommentInput | undefined;
	set input(value: languages.CommentInput | undefined);
	private readonly _onDidChangeInput;
	get onDidChangeInput(): Event<languages.CommentInput | undefined>;
	private _label;
	get label(): string | undefined;
	set label(label: string | undefined);
	private _contextValue;
	get contextValue(): string | undefined;
	set contextValue(context: string | undefined);
	private readonly _onDidChangeLabel;
	readonly onDidChangeLabel: Event<string | undefined>;
	private _comments;
	get comments(): ReadonlyArray<languages.Comment> | undefined;
	set comments(newComments: ReadonlyArray<languages.Comment> | undefined);
	private readonly _onDidChangeComments;
	get onDidChangeComments(): Event<readonly languages.Comment[] | undefined>;
	set range(range: T | undefined);
	get range(): T | undefined;
	private readonly _onDidChangeCanReply;
	get onDidChangeCanReply(): Event<boolean>;
	set canReply(state: boolean);
	get canReply(): boolean;
	private _collapsibleState;
	get collapsibleState(): languages.CommentThreadCollapsibleState | undefined;
	set collapsibleState(
		newState: languages.CommentThreadCollapsibleState | undefined,
	);
	private _initialCollapsibleState;
	get initialCollapsibleState():
		| languages.CommentThreadCollapsibleState
		| undefined;
	private set initialCollapsibleState(value);
	private readonly _onDidChangeCollapsibleState;
	onDidChangeCollapsibleState: Event<
		languages.CommentThreadCollapsibleState | undefined
	>;
	private readonly _onDidChangeInitialCollapsibleState;
	onDidChangeInitialCollapsibleState: Event<
		languages.CommentThreadCollapsibleState | undefined
	>;
	private _isDisposed;
	get isDisposed(): boolean;
	isDocumentCommentThread(): this is languages.CommentThread<IRange>;
	private _state;
	get state(): languages.CommentThreadState | undefined;
	set state(newState: languages.CommentThreadState | undefined);
	private _applicability;
	get applicability(): languages.CommentThreadApplicability | undefined;
	set applicability(value: languages.CommentThreadApplicability | undefined);
	private readonly _onDidChangeApplicability;
	readonly onDidChangeApplicability: Event<
		languages.CommentThreadApplicability | undefined
	>;
	get isTemplate(): boolean;
	private readonly _onDidChangeState;
	onDidChangeState: Event<languages.CommentThreadState | undefined>;
	constructor(
		commentThreadHandle: number,
		controllerHandle: number,
		extensionId: string,
		threadId: string,
		resource: string,
		_range: T | undefined,
		comments: languages.Comment[] | undefined,
		_canReply: boolean,
		_isTemplate: boolean,
		editorId?: string | undefined,
	);
	batchUpdate(changes: CommentThreadChanges<T>): void;
	hasComments(): boolean;
	dispose(): void;
	toJSON(): MarshalledCommentThread;
}
export declare class MainThreadCommentController implements ICommentController {
	private readonly _proxy;
	private readonly _commentService;
	private readonly _handle;
	private readonly _uniqueId;
	private readonly _id;
	private readonly _label;
	private _features;
	get handle(): number;
	get id(): string;
	get contextValue(): string;
	get proxy(): ExtHostCommentsShape;
	get label(): string;
	private _reactions;
	get reactions(): languages.CommentReaction[] | undefined;
	set reactions(reactions: languages.CommentReaction[] | undefined);
	get options(): languages.CommentOptions | undefined;
	private readonly _threads;
	activeEditingCommentThread?: MainThreadCommentThread<IRange | ICellRange>;
	get features(): CommentProviderFeatures;
	get owner(): string;
	constructor(
		_proxy: ExtHostCommentsShape,
		_commentService: ICommentService,
		_handle: number,
		_uniqueId: string,
		_id: string,
		_label: string,
		_features: CommentProviderFeatures,
	);
	get activeComment():
		| {
				thread: languages.CommentThread;
				comment?: languages.Comment;
		  }
		| undefined;
	private _activeComment;
	setActiveCommentAndThread(
		commentInfo:
			| {
					thread: languages.CommentThread;
					comment?: languages.Comment;
			  }
			| undefined,
	): Promise<void>;
	updateFeatures(features: CommentProviderFeatures): void;
	createCommentThread(
		extensionId: string,
		commentThreadHandle: number,
		threadId: string,
		resource: UriComponents,
		range: IRange | ICellRange | undefined,
		comments: languages.Comment[],
		isTemplate: boolean,
		editorId?: string,
	): languages.CommentThread<IRange | ICellRange>;
	updateCommentThread(
		commentThreadHandle: number,
		threadId: string,
		resource: UriComponents,
		changes: CommentThreadChanges,
	): void;
	deleteCommentThread(commentThreadHandle: number): void;
	deleteCommentThreadMain(commentThreadId: string): void;
	updateInput(input: string): void;
	updateCommentingRanges(
		resourceHints?: languages.CommentingRangeResourceHint,
	): void;
	private getKnownThread;
	getDocumentComments(
		resource: URI,
		token: CancellationToken,
	): Promise<{
		uniqueOwner: string;
		label: string;
		threads: languages.CommentThread<IRange>[];
		commentingRanges: {
			resource: URI;
			ranges: IRange[];
			fileComments: boolean;
		};
	}>;
	getNotebookComments(
		resource: URI,
		token: CancellationToken,
	): Promise<{
		uniqueOwner: string;
		label: string;
		threads: languages.CommentThread<ICellRange>[];
	}>;
	toggleReaction(
		uri: URI,
		thread: languages.CommentThread,
		comment: languages.Comment,
		reaction: languages.CommentReaction,
		token: CancellationToken,
	): Promise<void>;
	getAllComments(): MainThreadCommentThread<IRange | ICellRange>[];
	createCommentThreadTemplate(
		resource: UriComponents,
		range: IRange | undefined,
		editorId?: string,
	): Promise<void>;
	updateCommentThreadTemplate(
		threadHandle: number,
		range: IRange,
	): Promise<void>;
	toJSON(): any;
}
export declare class MainThreadComments
	extends Disposable
	implements MainThreadCommentsShape
{
	private readonly _commentService;
	private readonly _viewsService;
	private readonly _viewDescriptorService;
	private readonly _uriIdentityService;
	private readonly _editorService;
	private readonly _proxy;
	private _handlers;
	private _commentControllers;
	private _activeEditingCommentThread?;
	private readonly _activeEditingCommentThreadDisposables;
	private _openViewListener;
	constructor(
		extHostContext: IExtHostContext,
		_commentService: ICommentService,
		_viewsService: IViewsService,
		_viewDescriptorService: IViewDescriptorService,
		_uriIdentityService: IUriIdentityService,
		_editorService: IEditorService,
	);
	$registerCommentController(
		handle: number,
		id: string,
		label: string,
		extensionId: string,
	): void;
	$unregisterCommentController(handle: number): void;
	$updateCommentControllerFeatures(
		handle: number,
		features: CommentProviderFeatures,
	): void;
	$createCommentThread(
		handle: number,
		commentThreadHandle: number,
		threadId: string,
		resource: UriComponents,
		range: IRange | ICellRange | undefined,
		comments: languages.Comment[],
		extensionId: ExtensionIdentifier,
		isTemplate: boolean,
		editorId?: string,
	): languages.CommentThread<IRange | ICellRange> | undefined;
	$updateCommentThread(
		handle: number,
		commentThreadHandle: number,
		threadId: string,
		resource: UriComponents,
		changes: CommentThreadChanges,
	): void;
	$deleteCommentThread(handle: number, commentThreadHandle: number): void;
	$updateCommentingRanges(
		handle: number,
		resourceHints?: languages.CommentingRangeResourceHint,
	): void;
	$revealCommentThread(
		handle: number,
		commentThreadHandle: number,
		commentUniqueIdInThread: number,
		options: languages.CommentThreadRevealOptions,
	): Promise<void>;
	$hideCommentThread(
		handle: number,
		commentThreadHandle: number,
	): Promise<void>;
	private registerView;
	private setComments;
	private registerViewOpenedListener;
	/**
	 * If the comments view has never been opened, the constructor for it has not yet run so it has
	 * no listeners for comment threads being set or updated. Listen for the view opening for the
	 * first time and send it comments then.
	 */
	private registerViewListeners;
	private getHandler;
}
