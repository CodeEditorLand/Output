import "./media/timelinePane.css";

import {
	IIdentityProvider,
	IKeyboardNavigationLabelProvider,
	IListVirtualDelegate,
} from "../../../../base/browser/ui/list/list.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { URI } from "../../../../base/common/uri.js";
import { ILocalizedString } from "../../../../platform/action/common/action.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	IContextKeyService,
	RawContextKey,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	IViewPaneOptions,
	ViewPane,
} from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { ITimelineService, TimelineItem } from "../common/timeline.js";

type TreeElement = TimelineItem | LoadMoreCommand;
declare class LoadMoreCommand {
	readonly handle = "vscode-command:loadMore";
	readonly timestamp = 0;
	readonly description: undefined;
	readonly tooltip: undefined;
	readonly contextValue: undefined;
	readonly id: undefined;
	readonly icon: undefined;
	readonly iconDark: undefined;
	readonly source: undefined;
	readonly relativeTime: undefined;
	readonly relativeTimeFullWord: undefined;
	readonly hideRelativeTime: undefined;
	constructor(loading: boolean);
	private _loading;
	get loading(): boolean;
	set loading(value: boolean);
	get ariaLabel(): string;
	get label(): string;
	get themeIcon(): ThemeIcon | undefined;
}
export declare const TimelineFollowActiveEditorContext: RawContextKey<boolean>;
export declare const TimelineExcludeSources: RawContextKey<string>;
export declare class TimelinePane extends ViewPane {
	private readonly storageService;
	protected editorService: IEditorService;
	protected commandService: ICommandService;
	private readonly progressService;
	protected timelineService: ITimelineService;
	private readonly labelService;
	private readonly uriIdentityService;
	private readonly extensionService;
	static readonly TITLE: ILocalizedString;
	private $container;
	private $message;
	private $tree;
	private tree;
	private treeRenderer;
	private commands;
	private visibilityDisposables;
	private followActiveEditorContext;
	private timelineExcludeSourcesContext;
	private excludedSources;
	private pendingRequests;
	private timelinesBySource;
	private uri;
	constructor(
		options: IViewPaneOptions,
		keybindingService: IKeybindingService,
		contextMenuService: IContextMenuService,
		contextKeyService: IContextKeyService,
		configurationService: IConfigurationService,
		storageService: IStorageService,
		viewDescriptorService: IViewDescriptorService,
		instantiationService: IInstantiationService,
		editorService: IEditorService,
		commandService: ICommandService,
		progressService: IProgressService,
		timelineService: ITimelineService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		labelService: ILabelService,
		uriIdentityService: IUriIdentityService,
		extensionService: IExtensionService,
	);
	private _followActiveEditor;
	get followActiveEditor(): boolean;
	set followActiveEditor(value: boolean);
	private _pageOnScroll;
	get pageOnScroll(): boolean;
	get pageSize(): number;
	reset(): void;
	setUri(uri: URI): void;
	private setUriCore;
	private onStorageServiceChanged;
	private onConfigurationChanged;
	private onActiveEditorChanged;
	private onProvidersChanged;
	private onTimelineChanged;
	private _filename;
	updateFilename(filename: string | undefined): void;
	private _message;
	get message(): string | undefined;
	set message(message: string | undefined);
	private updateMessage;
	private showMessage;
	private hideMessage;
	private resetMessageElement;
	private _isEmpty;
	private _maxItemCount;
	private _visibleItemCount;
	private get hasVisibleItems();
	private clear;
	private loadTimeline;
	private loadTimelineForSource;
	private updateTimeline;
	private _pendingRefresh;
	private handleRequest;
	private getItems;
	private refresh;
	private refreshDebounced;
	focus(): void;
	setExpanded(expanded: boolean): boolean;
	setVisible(visible: boolean): void;
	protected layoutBody(height: number, width: number): void;
	protected renderHeaderTitle(container: HTMLElement): void;
	protected renderBody(container: HTMLElement): void;
	private loadMore;
	ensureValidItems(): boolean;
	setLoadingUriMessage(): void;
	private onContextMenu;
}
export declare class TimelineIdentityProvider
	implements IIdentityProvider<TreeElement>
{
	getId(item: TreeElement): {
		toString(): string;
	};
}
export declare class TimelineKeyboardNavigationLabelProvider
	implements IKeyboardNavigationLabelProvider<TreeElement>
{
	getKeyboardNavigationLabel(element: TreeElement): {
		toString(): string;
	};
}
export declare class TimelineListVirtualDelegate
	implements IListVirtualDelegate<TreeElement>
{
	getHeight(_element: TreeElement): number;
	getTemplateId(element: TreeElement): string;
}
export {};
