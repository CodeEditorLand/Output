import "./media/scm.css";

import { IActionViewItem } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { IDropdownMenuActionViewItemOptions } from "../../../../base/browser/ui/dropdown/dropdownActionViewItem.js";
import { IAction, IActionRunner } from "../../../../base/common/actions.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import {
	IViewPaneOptions,
	ViewPane,
} from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { ISCMProvider } from "../common/scm.js";

export declare class SCMHistoryViewPane extends ViewPane {
	private readonly _commandService;
	private readonly _instantiationService;
	private readonly _notificationService;
	private readonly _progressService;
	private _treeContainer;
	private _tree;
	private _treeViewModel;
	private _treeDataSource;
	private _treeIdentityProvider;
	private readonly _repositoryIsLoadingMore;
	private readonly _repositoryOutdated;
	private readonly _actionRunner;
	private readonly _visibilityDisposables;
	private readonly _treeOperationSequencer;
	private readonly _treeLoadMoreSequencer;
	private readonly _updateChildrenThrottler;
	private readonly _scmProviderCtx;
	constructor(
		options: IViewPaneOptions,
		_commandService: ICommandService,
		_instantiationService: IInstantiationService,
		_notificationService: INotificationService,
		_progressService: IProgressService,
		configurationService: IConfigurationService,
		contextMenuService: IContextMenuService,
		keybindingService: IKeybindingService,
		instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		contextKeyService: IContextKeyService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
	);
	protected renderHeaderTitle(container: HTMLElement): void;
	protected renderBody(container: HTMLElement): void;
	protected layoutBody(height: number, width: number): void;
	getActionRunner(): IActionRunner | undefined;
	getActionsContext(): ISCMProvider | undefined;
	getActionViewItem(
		action: IAction,
		options?: IDropdownMenuActionViewItemOptions,
	): IActionViewItem | undefined;
	focus(): void;
	shouldShowWelcome(): boolean;
	refresh(): Promise<void>;
	pickRepository(): Promise<void>;
	pickHistoryItemRef(): Promise<void>;
	revealCurrentHistoryItem(): Promise<void>;
	private _createTree;
	private _onDidOpen;
	private _onContextMenu;
	private _loadMore;
	private _updateChildren;
	dispose(): void;
}
