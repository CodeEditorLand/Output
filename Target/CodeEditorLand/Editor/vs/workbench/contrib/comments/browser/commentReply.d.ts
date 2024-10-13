import { Disposable } from "../../../../base/common/lifecycle.js";
import { ICodeEditor } from "../../../../editor/browser/editorBrowser.js";
import { IRange } from "../../../../editor/common/core/range.js";
import * as languages from "../../../../editor/common/languages.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	IContextKey,
	IContextKeyService,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ICellRange } from "../../notebook/common/notebookRange.js";
import { ICommentThreadWidget } from "../common/commentThreadWidget.js";
import { CommentMenus } from "./commentMenus.js";
import { ICommentService } from "./commentService.js";
import { LayoutableEditor } from "./simpleCommentEditor.js";

export declare const COMMENTEDITOR_DECORATION_KEY = "commenteditordecoration";
export declare class CommentReply<
	T extends IRange | ICellRange,
> extends Disposable {
	readonly owner: string;
	private readonly _parentEditor;
	private _commentThread;
	private _scopedInstatiationService;
	private _contextKeyService;
	private _commentMenus;
	private _commentOptions;
	private _pendingComment;
	private _parentThread;
	private _actionRunDelegate;
	private commentService;
	private keybindingService;
	private contextMenuService;
	private hoverService;
	private readonly textModelService;
	commentEditor: ICodeEditor;
	form: HTMLElement;
	commentEditorIsEmpty: IContextKey<boolean>;
	private _error;
	private _formActions;
	private _editorActions;
	private _commentThreadDisposables;
	private _commentFormActions;
	private _commentEditorActions;
	private _reviewThreadReplyButton;
	private _editorHeight;
	constructor(
		owner: string,
		container: HTMLElement,
		_parentEditor: LayoutableEditor,
		_commentThread: languages.CommentThread<T>,
		_scopedInstatiationService: IInstantiationService,
		_contextKeyService: IContextKeyService,
		_commentMenus: CommentMenus,
		_commentOptions: languages.CommentOptions | undefined,
		_pendingComment: languages.PendingComment | undefined,
		_parentThread: ICommentThreadWidget,
		focus: boolean,
		_actionRunDelegate: (() => void) | null,
		commentService: ICommentService,
		configurationService: IConfigurationService,
		keybindingService: IKeybindingService,
		contextMenuService: IContextMenuService,
		hoverService: IHoverService,
		textModelService: ITextModelService,
	);
	initialize(focus: boolean): Promise<void>;
	private calculateEditorHeight;
	updateCommentThread(
		commentThread: languages.CommentThread<IRange | ICellRange>,
	): void;
	getPendingComment(): languages.PendingComment | undefined;
	setPendingComment(pending: languages.PendingComment): void;
	layout(widthInPixel: number): void;
	focusIfNeeded(): void;
	focusCommentEditor(): void;
	expandReplyAreaAndFocusCommentEditor(): void;
	isCommentEditorFocused(): boolean;
	updateCanReply(): void;
	submitComment(): Promise<void>;
	setCommentEditorDecorations(): void;
	private createTextModelListener;
	/**
	 * Command based actions.
	 */
	private createCommentWidgetFormActions;
	private createCommentWidgetEditorActions;
	private get isReplyExpanded();
	private expandReplyArea;
	private clearAndExpandReplyArea;
	private hideReplyArea;
	private createReplyButton;
	dispose(): void;
}
