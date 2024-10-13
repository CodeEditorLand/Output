import { IActionViewItem } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { IAction } from "../../../../base/common/actions.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";

import "./media/debugViewlet.css";

import { IBaseActionViewItemOptions } from "../../../../base/browser/ui/actionbar/actionViewItems.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import {
	IContextMenuService,
	IContextViewService,
} from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { ViewPaneContainer } from "../../../browser/parts/views/viewPaneContainer.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import { IDebugService } from "../common/debug.js";

export declare class DebugViewPaneContainer extends ViewPaneContainer {
	private readonly progressService;
	private readonly debugService;
	private readonly contextViewService;
	private readonly contextKeyService;
	private startDebugActionViewItem;
	private progressResolve;
	private breakpointView;
	private paneListeners;
	private readonly stopActionViewItemDisposables;
	constructor(
		layoutService: IWorkbenchLayoutService,
		telemetryService: ITelemetryService,
		progressService: IProgressService,
		debugService: IDebugService,
		instantiationService: IInstantiationService,
		contextService: IWorkspaceContextService,
		storageService: IStorageService,
		themeService: IThemeService,
		contextMenuService: IContextMenuService,
		extensionService: IExtensionService,
		configurationService: IConfigurationService,
		contextViewService: IContextViewService,
		contextKeyService: IContextKeyService,
		viewDescriptorService: IViewDescriptorService,
	);
	create(parent: HTMLElement): void;
	focus(): void;
	getActionViewItem(
		action: IAction,
		options: IBaseActionViewItemOptions,
	): IActionViewItem | undefined;
	focusView(id: string): void;
	private onDebugServiceStateChange;
	addPanes(
		panes: {
			pane: ViewPane;
			size: number;
			index?: number;
			disposable: IDisposable;
		}[],
	): void;
	removePanes(panes: ViewPane[]): void;
	private updateBreakpointsMaxSize;
}
