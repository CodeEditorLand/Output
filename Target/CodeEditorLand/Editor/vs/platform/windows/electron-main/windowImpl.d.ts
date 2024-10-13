import electron, { BrowserWindowConstructorOptions } from "electron";

import { CancellationToken } from "../../../base/common/cancellation.js";
import { Event } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { ISerializableCommandAction } from "../../action/common/action.js";
import { IBackupMainService } from "../../backup/electron-main/backup.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IDialogMainService } from "../../dialogs/electron-main/dialogMainService.js";
import { NativeParsedArgs } from "../../environment/common/argv.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import { IFileService } from "../../files/common/files.js";
import { IInstantiationService } from "../../instantiation/common/instantiation.js";
import { ILifecycleMainService } from "../../lifecycle/electron-main/lifecycleMainService.js";
import { ILogService } from "../../log/common/log.js";
import { ILoggerMainService } from "../../log/electron-main/loggerService.js";
import { IPolicyService } from "../../policy/common/policy.js";
import { IProductService } from "../../product/common/productService.js";
import { IProtocolMainService } from "../../protocol/electron-main/protocol.js";
import { IStateService } from "../../state/node/state.js";
import {
	IApplicationStorageMainService,
	IStorageMainService,
} from "../../storage/electron-main/storageMainService.js";
import { ITelemetryService } from "../../telemetry/common/telemetry.js";
import { IThemeMainService } from "../../theme/electron-main/themeMainService.js";
import { IUserDataProfile } from "../../userDataProfile/common/userDataProfile.js";
import { IUserDataProfilesMainService } from "../../userDataProfile/electron-main/userDataProfile.js";
import { INativeWindowConfiguration } from "../../window/common/window.js";
import {
	IBaseWindow,
	ICodeWindow,
	ILoadEvent,
	IWindowState,
} from "../../window/electron-main/window.js";
import {
	ISingleFolderWorkspaceIdentifier,
	IWorkspaceIdentifier,
} from "../../workspace/common/workspace.js";
import { IWorkspacesManagementMainService } from "../../workspaces/electron-main/workspacesManagementMainService.js";
import { IWindowsMainService } from "./windows.js";

export interface IWindowCreationOptions {
	readonly state: IWindowState;
	readonly extensionDevelopmentPath?: string[];
	readonly isExtensionTestHost?: boolean;
}
interface ILoadOptions {
	readonly isReload?: boolean;
	readonly disableExtensions?: boolean;
}
export declare abstract class BaseWindow
	extends Disposable
	implements IBaseWindow
{
	protected readonly configurationService: IConfigurationService;
	protected readonly stateService: IStateService;
	protected readonly environmentMainService: IEnvironmentMainService;
	protected readonly logService: ILogService;
	private readonly _onDidClose;
	readonly onDidClose: Event<void>;
	private readonly _onDidMaximize;
	readonly onDidMaximize: Event<void>;
	private readonly _onDidUnmaximize;
	readonly onDidUnmaximize: Event<void>;
	private readonly _onDidTriggerSystemContextMenu;
	readonly onDidTriggerSystemContextMenu: Event<{
		x: number;
		y: number;
	}>;
	private readonly _onDidEnterFullScreen;
	readonly onDidEnterFullScreen: Event<void>;
	private readonly _onDidLeaveFullScreen;
	readonly onDidLeaveFullScreen: Event<void>;
	abstract readonly id: number;
	protected _lastFocusTime: number;
	get lastFocusTime(): number;
	protected _win: electron.BrowserWindow | null;
	get win(): any;
	protected setWin(
		win: electron.BrowserWindow,
		options?: BrowserWindowConstructorOptions,
	): void;
	constructor(
		configurationService: IConfigurationService,
		stateService: IStateService,
		environmentMainService: IEnvironmentMainService,
		logService: ILogService,
	);
	protected applyState(
		state: IWindowState,
		hasMultipleDisplays?: boolean,
	): void;
	private representedFilename;
	setRepresentedFilename(filename: string): void;
	getRepresentedFilename(): string | undefined;
	private documentEdited;
	setDocumentEdited(edited: boolean): void;
	isDocumentEdited(): boolean;
	focus(options?: { force: boolean }): void;
	handleTitleDoubleClick(): void;
	private static readonly windowControlHeightStateStorageKey;
	private readonly hasWindowControlOverlay;
	updateWindowControls(options: {
		height?: number;
		backgroundColor?: string;
		foregroundColor?: string;
	}): void;
	private transientIsNativeFullScreen;
	private joinNativeFullScreenTransition;
	toggleFullScreen(): void;
	protected setFullScreen(fullscreen: boolean, fromRestore: boolean): void;
	get isFullScreen(): boolean;
	private setNativeFullScreen;
	private doSetNativeFullScreen;
	private setSimpleFullScreen;
	abstract matches(webContents: electron.WebContents): boolean;
	dispose(): void;
}
export declare class CodeWindow extends BaseWindow implements ICodeWindow {
	private readonly loggerMainService;
	private readonly policyService;
	private readonly userDataProfilesService;
	private readonly fileService;
	private readonly applicationStorageMainService;
	private readonly storageMainService;
	private readonly themeMainService;
	private readonly workspacesManagementMainService;
	private readonly backupMainService;
	private readonly telemetryService;
	private readonly dialogMainService;
	private readonly lifecycleMainService;
	private readonly productService;
	private readonly protocolMainService;
	private readonly windowsMainService;
	private readonly _onWillLoad;
	readonly onWillLoad: Event<ILoadEvent>;
	private readonly _onDidSignalReady;
	readonly onDidSignalReady: Event<void>;
	private readonly _onDidDestroy;
	readonly onDidDestroy: Event<void>;
	private _id;
	get id(): number;
	protected _win: electron.BrowserWindow;
	get backupPath(): string | undefined;
	get openedWorkspace():
		| IWorkspaceIdentifier
		| ISingleFolderWorkspaceIdentifier
		| undefined;
	get profile(): IUserDataProfile | undefined;
	get remoteAuthority(): string | undefined;
	private _config;
	get config(): INativeWindowConfiguration | undefined;
	get isExtensionDevelopmentHost(): boolean;
	get isExtensionTestHost(): boolean;
	get isExtensionDevelopmentTestFromCli(): boolean;
	private readonly windowState;
	private currentMenuBarVisibility;
	private readonly whenReadyCallbacks;
	private readonly touchBarGroups;
	private currentHttpProxy;
	private currentNoProxy;
	private customZoomLevel;
	private readonly configObjectUrl;
	private pendingLoadConfig;
	private wasLoaded;
	constructor(
		config: IWindowCreationOptions,
		logService: ILogService,
		loggerMainService: ILoggerMainService,
		environmentMainService: IEnvironmentMainService,
		policyService: IPolicyService,
		userDataProfilesService: IUserDataProfilesMainService,
		fileService: IFileService,
		applicationStorageMainService: IApplicationStorageMainService,
		storageMainService: IStorageMainService,
		configurationService: IConfigurationService,
		themeMainService: IThemeMainService,
		workspacesManagementMainService: IWorkspacesManagementMainService,
		backupMainService: IBackupMainService,
		telemetryService: ITelemetryService,
		dialogMainService: IDialogMainService,
		lifecycleMainService: ILifecycleMainService,
		productService: IProductService,
		protocolMainService: IProtocolMainService,
		windowsMainService: IWindowsMainService,
		stateService: IStateService,
		instantiationService: IInstantiationService,
	);
	private readyState;
	setReady(): void;
	ready(): Promise<ICodeWindow>;
	get isReady(): boolean;
	get whenClosedOrLoaded(): Promise<void>;
	private registerListeners;
	private marketplaceHeadersPromise;
	private getMarketplaceHeaders;
	private onWindowError;
	private destroyWindow;
	private onDidDeleteUntitledWorkspace;
	private onConfigurationUpdated;
	addTabbedWindow(window: ICodeWindow): void;
	load(
		configuration: INativeWindowConfiguration,
		options?: ILoadOptions,
	): void;
	private updateConfiguration;
	reload(cli?: NativeParsedArgs): Promise<void>;
	private validateWorkspaceBeforeReload;
	serializeWindowState(): IWindowState;
	private restoreWindowState;
	getBounds(): electron.Rectangle;
	protected setFullScreen(fullscreen: boolean, fromRestore: boolean): void;
	private getMenuBarVisibility;
	private setMenuBarVisibility;
	private doSetMenuBarVisibility;
	notifyZoomLevel(zoomLevel: number | undefined): void;
	private getZoomLevel;
	close(): void;
	sendWhenReady(
		channel: string,
		token: CancellationToken,
		...args: any[]
	): void;
	send(channel: string, ...args: any[]): void;
	updateTouchBar(groups: ISerializableCommandAction[][]): void;
	private createTouchBar;
	private createTouchBarGroup;
	private createTouchBarGroupSegments;
	matches(webContents: electron.WebContents): boolean;
	dispose(): void;
}
export {};
