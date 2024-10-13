import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { IViewletViewOptions } from "../../../browser/parts/views/viewsViewlet.js";
import { IViewBadge, IViewDescriptorService } from "../../../common/views.js";
import { IActivityService } from "../../../services/activity/common/activity.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { IWebviewService } from "../../webview/browser/webview.js";
import { IWebviewViewService } from "./webviewViewService.js";

export declare class WebviewViewPane extends ViewPane {
	private readonly activityService;
	private readonly extensionService;
	private readonly progressService;
	private readonly storageService;
	private readonly viewService;
	private readonly webviewService;
	private readonly webviewViewService;
	private static _originStore?;
	private static getOriginStore;
	private readonly _webview;
	private readonly _webviewDisposables;
	private _activated;
	private _container?;
	private _rootContainer?;
	private _resizeObserver?;
	private readonly defaultTitle;
	private setTitle;
	private badge;
	private readonly activity;
	private readonly memento;
	private readonly viewState;
	private readonly extensionId?;
	private _repositionTimeout?;
	constructor(
		options: IViewletViewOptions,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		contextMenuService: IContextMenuService,
		instantiationService: IInstantiationService,
		keybindingService: IKeybindingService,
		openerService: IOpenerService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		themeService: IThemeService,
		viewDescriptorService: IViewDescriptorService,
		activityService: IActivityService,
		extensionService: IExtensionService,
		progressService: IProgressService,
		storageService: IStorageService,
		viewService: IViewsService,
		webviewService: IWebviewService,
		webviewViewService: IWebviewViewService,
	);
	private readonly _onDidChangeVisibility;
	readonly onDidChangeVisibility: import("../../../workbench.web.main.internal.js").Event<boolean>;
	private readonly _onDispose;
	readonly onDispose: import("../../../workbench.web.main.internal.js").Event<void>;
	dispose(): void;
	focus(): void;
	protected renderBody(container: HTMLElement): void;
	saveState(): void;
	protected layoutBody(height: number, width: number): void;
	private updateTreeVisibility;
	private activate;
	protected updateTitle(value: string | undefined): void;
	protected updateBadge(badge: IViewBadge | undefined): void;
	private withProgress;
	onDidScrollRoot(): void;
	private doLayoutWebview;
	private layoutWebview;
	private findRootContainer;
}
