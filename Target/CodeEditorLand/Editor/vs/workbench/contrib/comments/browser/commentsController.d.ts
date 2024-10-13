import "./media/review.css";

import {
	ICodeEditor,
	IEditorMouseEvent,
} from "../../../../editor/browser/editorBrowser.js";
import { ICodeEditorService } from "../../../../editor/browser/services/codeEditorService.js";
import { IRange, Range } from "../../../../editor/common/core/range.js";
import { IEditorContribution } from "../../../../editor/common/editorCommon.js";
import * as languages from "../../../../editor/common/languages.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { ICommentService } from "./commentService.js";
import {
	CommentWidgetFocus,
	ReviewZoneWidget,
} from "./commentThreadZoneWidget.js";

export declare const ID = "editor.contrib.review";
/**
 * Navigate to the next or previous comment in the current thread.
 * @param type
 */
export declare function moveToNextCommentInThread(
	commentInfo:
		| {
				thread: languages.CommentThread<IRange>;
				comment?: languages.Comment;
		  }
		| undefined,
	type: "next" | "previous",
):
	| {
			comment: languages.Comment;
			thread: languages.CommentThread<IRange>;
	  }
	| undefined;
export declare function revealCommentThread(
	commentService: ICommentService,
	editorService: IEditorService,
	uriIdentityService: IUriIdentityService,
	commentThread: languages.CommentThread<IRange>,
	comment: languages.Comment | undefined,
	focusReply?: boolean,
	pinned?: boolean,
	preserveFocus?: boolean,
	sideBySide?: boolean,
): void;
export declare class CommentController implements IEditorContribution {
	private readonly commentService;
	private readonly instantiationService;
	private readonly codeEditorService;
	private readonly contextMenuService;
	private readonly quickInputService;
	private readonly viewsService;
	private readonly configurationService;
	private readonly editorService;
	private readonly keybindingService;
	private readonly accessibilityService;
	private readonly globalToDispose;
	private readonly localToDispose;
	private editor;
	private _commentWidgets;
	private _commentInfos;
	private _commentingRangeDecorator;
	private _commentThreadRangeDecorator;
	private mouseDownInfo;
	private _commentingRangeSpaceReserved;
	private _commentingRangeAmountReserved;
	private _computePromise;
	private _computeAndSetPromise;
	private _addInProgress;
	private _emptyThreadsToAddQueue;
	private _computeCommentingRangePromise;
	private _computeCommentingRangeScheduler;
	private _pendingNewCommentCache;
	private _pendingEditsCache;
	private _inProcessContinueOnComments;
	private _editorDisposables;
	private _activeCursorHasCommentingRange;
	private _activeCursorHasComment;
	private _activeEditorHasCommentingRange;
	private _hasRespondedToEditorChange;
	constructor(
		editor: ICodeEditor,
		commentService: ICommentService,
		instantiationService: IInstantiationService,
		codeEditorService: ICodeEditorService,
		contextMenuService: IContextMenuService,
		quickInputService: IQuickInputService,
		viewsService: IViewsService,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		editorService: IEditorService,
		keybindingService: IKeybindingService,
		accessibilityService: IAccessibilityService,
	);
	private registerEditorListeners;
	private clearEditorListeners;
	private onEditorMouseLeave;
	private onEditorMouseMove;
	private onEditorChangeCursorSelection;
	private onEditorChangeCursorPosition;
	private isEditorInlineOriginal;
	private beginCompute;
	private beginComputeCommentingRanges;
	static get(editor: ICodeEditor): CommentController | null;
	revealCommentThread(
		threadId: string,
		commentUniqueId: number | undefined,
		fetchOnceIfNotExist: boolean,
		focus: CommentWidgetFocus,
	): void;
	collapseAll(): void;
	expandAll(): void;
	expandUnresolved(): void;
	nextCommentThread(focusThread: boolean): void;
	private _findNearestCommentThread;
	previousCommentThread(focusThread: boolean): void;
	private _findNearestCommentingRange;
	nextCommentingRange(): void;
	previousCommentingRange(): void;
	dispose(): void;
	private onWillChangeModel;
	private handleCommentAdded;
	onModelChanged(): void;
	private resumePendingComment;
	private beginComputeAndHandleEditorChange;
	private openCommentsView;
	private displayCommentThread;
	private onEditorMouseDown;
	private onEditorMouseUp;
	getCommentsAtLine(commentRange: Range | undefined): ReviewZoneWidget[];
	addOrToggleCommentAtLine(
		commentRange: Range | undefined,
		e: IEditorMouseEvent | undefined,
	): Promise<void>;
	private processNextThreadToAdd;
	private clipUserRangeToCommentRange;
	addCommentAtLine(
		range: Range | undefined,
		e: IEditorMouseEvent | undefined,
	): Promise<void>;
	private getCommentProvidersQuickPicks;
	private getContextMenuActions;
	addCommentAtLine2(range: Range | undefined, ownerId: string): void;
	private getExistingCommentEditorOptions;
	private getWithoutCommentsEditorOptions;
	private getWithCommentsLineDecorationWidth;
	private getWithCommentsEditorOptions;
	private updateEditorLayoutOptions;
	private ensureCommentingRangeReservedAmount;
	private tryUpdateReservedSpace;
	private setComments;
	closeWidget(): void;
	private removeCommentWidgetsAndStoreCache;
}
