import "./media/panel.css";

import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	IContextKeyService,
	RawContextKey,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	FilterViewPane,
	IViewPaneOptions,
} from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IPathService } from "../../../services/path/common/pathService.js";
import { CommentNode } from "../common/commentModel.js";
import { ICommentsView } from "./comments.js";
import { ICommentService } from "./commentService.js";
import { CommentsFilters } from "./commentsViewActions.js";

export declare const CONTEXT_KEY_HAS_COMMENTS: RawContextKey<boolean>;
export declare const CONTEXT_KEY_SOME_COMMENTS_EXPANDED: RawContextKey<boolean>;
export declare const CONTEXT_KEY_COMMENT_FOCUSED: RawContextKey<boolean>;
export declare class CommentsPanel
	extends FilterViewPane
	implements ICommentsView
{
	private readonly editorService;
	private readonly commentService;
	private readonly uriIdentityService;
	private readonly pathService;
	private treeLabels;
	private tree;
	private treeContainer;
	private messageBoxContainer;
	private totalComments;
	private readonly hasCommentsContextKey;
	private readonly someCommentsExpandedContextKey;
	private readonly commentsFocusedContextKey;
	private readonly filter;
	readonly filters: CommentsFilters;
	private currentHeight;
	private currentWidth;
	private readonly viewState;
	private readonly stateMemento;
	private cachedFilterStats;
	readonly onDidChangeVisibility: import("../../../workbench.web.main.internal").Event<boolean>;
	get focusedCommentNode(): CommentNode | undefined;
	get focusedCommentInfo(): string | undefined;
	focusNextNode(): void;
	focusPreviousNode(): void;
	constructor(
		options: IViewPaneOptions,
		instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		editorService: IEditorService,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		contextMenuService: IContextMenuService,
		keybindingService: IKeybindingService,
		openerService: IOpenerService,
		themeService: IThemeService,
		commentService: ICommentService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		uriIdentityService: IUriIdentityService,
		storageService: IStorageService,
		pathService: IPathService,
	);
	saveState(): void;
	render(): void;
	focusFilter(): void;
	clearFilterText(): void;
	getFilterStats(): {
		total: number;
		filtered: number;
	};
	private updateFilter;
	protected renderBody(container: HTMLElement): void;
	focus(): void;
	private renderComments;
	collapseAll(): void;
	expandAll(): void;
	get hasRendered(): boolean;
	protected layoutBodyContent(height?: number, width?: number): void;
	private createMessageBox;
	private renderMessage;
	private getScreenReaderInfoForNode;
	private getRepliesAsString;
	private getReplyCountAsString;
	private createTree;
	private openFile;
	private refresh;
	private onAllCommentsChanged;
	private onCommentsUpdated;
	private onDataProviderDeleted;
	private updateSomeCommentsExpanded;
	areAllCommentsExpanded(): boolean;
	isSomeCommentsExpanded(): boolean;
}
