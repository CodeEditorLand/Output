import "./media/window.css";

import { URI } from "../../base/common/uri.js";
import { IAccessibilityService } from "../../platform/accessibility/common/accessibility.js";
import { IMenuService } from "../../platform/actions/common/actions.js";
import { ICommandService } from "../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../platform/configuration/common/configuration.js";
import { IDialogService } from "../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../platform/files/common/files.js";
import { IInstantiationService } from "../../platform/instantiation/common/instantiation.js";
import { ISharedProcessService } from "../../platform/ipc/electron-sandbox/services.js";
import { IKeybindingService } from "../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../platform/label/common/label.js";
import { ILogService } from "../../platform/log/common/log.js";
import { INativeHostService } from "../../platform/native/common/native.js";
import { INotificationService } from "../../platform/notification/common/notification.js";
import {
	IOpenerService,
	IResolvedExternalUri,
	OpenOptions,
} from "../../platform/opener/common/opener.js";
import { IProductService } from "../../platform/product/common/productService.js";
import { IProgressService } from "../../platform/progress/common/progress.js";
import { IRemoteAuthorityResolverService } from "../../platform/remote/common/remoteAuthorityResolver.js";
import { IStorageService } from "../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../platform/telemetry/common/telemetry.js";
import { ITunnelService } from "../../platform/tunnel/common/tunnel.js";
import { IUriIdentityService } from "../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../platform/workspace/common/workspace.js";
import { BaseWindow } from "../browser/window.js";
import { IBannerService } from "../services/banner/browser/bannerService.js";
import { IEditorGroupsService } from "../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../services/editor/common/editorService.js";
import { INativeWorkbenchEnvironmentService } from "../services/environment/electron-sandbox/environmentService.js";
import { IFilesConfigurationService } from "../services/filesConfiguration/common/filesConfigurationService.js";
import { IHostService } from "../services/host/browser/host.js";
import { IIntegrityService } from "../services/integrity/common/integrity.js";
import { IWorkbenchLayoutService } from "../services/layout/browser/layoutService.js";
import { ILifecycleService } from "../services/lifecycle/common/lifecycle.js";
import { IPreferencesService } from "../services/preferences/common/preferences.js";
import { IWorkbenchThemeService } from "../services/themes/common/workbenchThemeService.js";
import { ITitleService } from "../services/title/browser/titleService.js";
import { IUtilityProcessWorkerWorkbenchService } from "../services/utilityProcess/electron-sandbox/utilityProcessWorkerWorkbenchService.js";
import { IWorkingCopyService } from "../services/workingCopy/common/workingCopyService.js";
import { IWorkspaceEditingService } from "../services/workspaces/common/workspaceEditing.js";

export declare class NativeWindow extends BaseWindow {
	private readonly editorService;
	private readonly editorGroupService;
	private readonly configurationService;
	private readonly titleService;
	protected themeService: IWorkbenchThemeService;
	private readonly notificationService;
	private readonly commandService;
	private readonly keybindingService;
	private readonly telemetryService;
	private readonly workspaceEditingService;
	private readonly fileService;
	private readonly menuService;
	private readonly lifecycleService;
	private readonly integrityService;
	private readonly nativeEnvironmentService;
	private readonly accessibilityService;
	private readonly contextService;
	private readonly openerService;
	private readonly nativeHostService;
	private readonly tunnelService;
	private readonly layoutService;
	private readonly workingCopyService;
	private readonly filesConfigurationService;
	private readonly productService;
	private readonly remoteAuthorityResolverService;
	private readonly dialogService;
	private readonly storageService;
	private readonly logService;
	private readonly instantiationService;
	private readonly sharedProcessService;
	private readonly progressService;
	private readonly labelService;
	private readonly bannerService;
	private readonly uriIdentityService;
	private readonly preferencesService;
	private readonly utilityProcessWorkerWorkbenchService;
	private readonly customTitleContextMenuDisposable;
	private readonly addFoldersScheduler;
	private pendingFoldersToAdd;
	private isDocumentedEdited;
	constructor(
		editorService: IEditorService,
		editorGroupService: IEditorGroupsService,
		configurationService: IConfigurationService,
		titleService: ITitleService,
		themeService: IWorkbenchThemeService,
		notificationService: INotificationService,
		commandService: ICommandService,
		keybindingService: IKeybindingService,
		telemetryService: ITelemetryService,
		workspaceEditingService: IWorkspaceEditingService,
		fileService: IFileService,
		menuService: IMenuService,
		lifecycleService: ILifecycleService,
		integrityService: IIntegrityService,
		nativeEnvironmentService: INativeWorkbenchEnvironmentService,
		accessibilityService: IAccessibilityService,
		contextService: IWorkspaceContextService,
		openerService: IOpenerService,
		nativeHostService: INativeHostService,
		tunnelService: ITunnelService,
		layoutService: IWorkbenchLayoutService,
		workingCopyService: IWorkingCopyService,
		filesConfigurationService: IFilesConfigurationService,
		productService: IProductService,
		remoteAuthorityResolverService: IRemoteAuthorityResolverService,
		dialogService: IDialogService,
		storageService: IStorageService,
		logService: ILogService,
		instantiationService: IInstantiationService,
		sharedProcessService: ISharedProcessService,
		progressService: IProgressService,
		labelService: ILabelService,
		bannerService: IBannerService,
		uriIdentityService: IUriIdentityService,
		preferencesService: IPreferencesService,
		utilityProcessWorkerWorkbenchService: IUtilityProcessWorkerWorkbenchService,
		hostService: IHostService,
	);
	protected registerListeners(): void;
	private handleRepresentedFilename;
	private updateRepresentedFilename;
	private onBeforeShutdown;
	private progressOnBeforeShutdown;
	private onBeforeShutdownError;
	private onWillShutdown;
	private toShutdownLabel;
	private toForceShutdownLabel;
	private updateDocumentEdited;
	private getWindowMinimumWidth;
	private onDidChangePanelPosition;
	private maybeCloseWindow;
	private provideCustomTitleContextMenu;
	protected create(): void;
	private handleWarnings;
	private setupDriver;
	private openTunnel;
	resolveExternalUri(
		uri: URI,
		options?: OpenOptions,
	): Promise<IResolvedExternalUri | undefined>;
	private setupOpenHandlers;
	private touchBarMenu;
	private readonly touchBarDisposables;
	private lastInstalledTouchedBar;
	private updateTouchbarMenu;
	private doUpdateTouchbarMenu;
	private onAddFoldersRequest;
	private doAddFolders;
	private onOpenFiles;
	private trackClosedWaitFiles;
	private openResources;
	private readonly mapWindowIdToZoomStatusEntry;
	private configuredWindowZoomLevel;
	private resolveConfiguredWindowZoomLevel;
	private handleOnDidChangeZoomLevel;
	private createWindowZoomStatusEntry;
	private updateWindowZoomStatusEntry;
	private onDidChangeConfiguredWindowZoomLevel;
	dispose(): void;
}
