import {
	MessageBoxOptions,
	MessageBoxReturnValue,
	OpenDevToolsOptions,
	OpenDialogOptions,
	OpenDialogReturnValue,
	SaveDialogOptions,
	SaveDialogReturnValue,
} from "electron";

import { VSBuffer } from "../../../base/common/buffer.js";
import { Event } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { AddFirstParameterToFunctions } from "../../../base/common/types.js";
import { URI } from "../../../base/common/uri.js";
import { ISerializableCommandAction } from "../../action/common/action.js";
import { IAuxiliaryWindowsMainService } from "../../auxiliaryWindow/electron-main/auxiliaryWindows.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { INativeOpenDialogOptions } from "../../dialogs/common/dialogs.js";
import { IDialogMainService } from "../../dialogs/electron-main/dialogMainService.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import {
	ILifecycleMainService,
	IRelaunchOptions,
} from "../../lifecycle/electron-main/lifecycleMainService.js";
import { ILogService } from "../../log/common/log.js";
import { IProductService } from "../../product/common/productService.js";
import { IV8Profile } from "../../profiling/common/profiling.js";
import {
	AuthInfo,
	Credentials,
	IRequestService,
} from "../../request/common/request.js";
import { IPartsSplash } from "../../theme/common/themeService.js";
import { IThemeMainService } from "../../theme/electron-main/themeMainService.js";
import {
	IColorScheme,
	IOpenedAuxiliaryWindow,
	IOpenedMainWindow,
	IOpenEmptyWindowOptions,
	IOpenWindowOptions,
	IPoint,
	IRectangle,
	IWindowOpenable,
} from "../../window/common/window.js";
import { IWindowsMainService } from "../../windows/electron-main/windows.js";
import { IWorkspacesManagementMainService } from "../../workspaces/electron-main/workspacesManagementMainService.js";
import {
	ICommonNativeHostService,
	INativeHostOptions,
	IOSProperties,
	IOSStatistics,
} from "../common/native.js";
import { IProxyAuthService } from "./auth.js";

export interface INativeHostMainService
	extends AddFirstParameterToFunctions<
		ICommonNativeHostService,
		Promise<unknown>,
		number | undefined
	> {}
export declare const INativeHostMainService: import("../../instantiation/common/instantiation.js").ServiceIdentifier<INativeHostMainService>;
export declare class NativeHostMainService
	extends Disposable
	implements INativeHostMainService
{
	private readonly windowsMainService;
	private readonly auxiliaryWindowsMainService;
	private readonly dialogMainService;
	private readonly lifecycleMainService;
	private readonly environmentMainService;
	private readonly logService;
	private readonly productService;
	private readonly themeMainService;
	private readonly workspacesManagementMainService;
	private readonly configurationService;
	private readonly requestService;
	private readonly proxyAuthService;
	readonly _serviceBrand: undefined;
	constructor(
		windowsMainService: IWindowsMainService,
		auxiliaryWindowsMainService: IAuxiliaryWindowsMainService,
		dialogMainService: IDialogMainService,
		lifecycleMainService: ILifecycleMainService,
		environmentMainService: IEnvironmentMainService,
		logService: ILogService,
		productService: IProductService,
		themeMainService: IThemeMainService,
		workspacesManagementMainService: IWorkspacesManagementMainService,
		configurationService: IConfigurationService,
		requestService: IRequestService,
		proxyAuthService: IProxyAuthService,
	);
	get windowId(): never;
	readonly onDidOpenMainWindow: Event<number>;
	readonly onDidTriggerWindowSystemContextMenu: Event<{
		windowId: number;
		x: number;
		y: number;
	}>;
	readonly onDidMaximizeWindow: Event<number>;
	readonly onDidUnmaximizeWindow: Event<number>;
	readonly onDidChangeWindowFullScreen: Event<{
		windowId: number;
		fullscreen: boolean;
	}>;
	readonly onDidBlurMainWindow: Event<any>;
	readonly onDidFocusMainWindow: Event<any>;
	readonly onDidBlurMainOrAuxiliaryWindow: Event<any>;
	readonly onDidFocusMainOrAuxiliaryWindow: Event<any>;
	readonly onDidResumeOS: Event<unknown>;
	readonly onDidChangeColorScheme: Event<IColorScheme>;
	private readonly _onDidChangePassword;
	readonly onDidChangePassword: Event<{
		account: string;
		service: string;
	}>;
	readonly onDidChangeDisplay: Event<void>;
	getWindows(
		windowId: number | undefined,
		options: {
			includeAuxiliaryWindows: true;
		},
	): Promise<Array<IOpenedMainWindow | IOpenedAuxiliaryWindow>>;
	getWindows(
		windowId: number | undefined,
		options: {
			includeAuxiliaryWindows: false;
		},
	): Promise<Array<IOpenedMainWindow>>;
	getWindowCount(windowId: number | undefined): Promise<number>;
	getActiveWindowId(
		windowId: number | undefined,
	): Promise<number | undefined>;
	getActiveWindowPosition(): Promise<IRectangle | undefined>;
	openWindow(
		windowId: number | undefined,
		options?: IOpenEmptyWindowOptions,
	): Promise<void>;
	openWindow(
		windowId: number | undefined,
		toOpen: IWindowOpenable[],
		options?: IOpenWindowOptions,
	): Promise<void>;
	private doOpenWindow;
	private doOpenEmptyWindow;
	isFullScreen(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<boolean>;
	toggleFullScreen(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	handleTitleDoubleClick(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	getCursorScreenPoint(windowId: number | undefined): Promise<{
		readonly point: IPoint;
		readonly display: IRectangle;
	}>;
	isMaximized(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<boolean>;
	maximizeWindow(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	unmaximizeWindow(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	minimizeWindow(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	moveWindowTop(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	positionWindow(
		windowId: number | undefined,
		position: IRectangle,
		options?: INativeHostOptions,
	): Promise<void>;
	updateWindowControls(
		windowId: number | undefined,
		options: INativeHostOptions & {
			height?: number;
			backgroundColor?: string;
			foregroundColor?: string;
		},
	): Promise<void>;
	focusWindow(
		windowId: number | undefined,
		options?: INativeHostOptions & {
			force?: boolean;
		},
	): Promise<void>;
	setMinimumSize(
		windowId: number | undefined,
		width: number | undefined,
		height: number | undefined,
	): Promise<void>;
	saveWindowSplash(
		windowId: number | undefined,
		splash: IPartsSplash,
	): Promise<void>;
	installShellCommand(windowId: number | undefined): Promise<void>;
	uninstallShellCommand(windowId: number | undefined): Promise<void>;
	private getShellCommandLink;
	showMessageBox(
		windowId: number | undefined,
		options: MessageBoxOptions & INativeHostOptions,
	): Promise<MessageBoxReturnValue>;
	showSaveDialog(
		windowId: number | undefined,
		options: SaveDialogOptions & INativeHostOptions,
	): Promise<SaveDialogReturnValue>;
	showOpenDialog(
		windowId: number | undefined,
		options: OpenDialogOptions & INativeHostOptions,
	): Promise<OpenDialogReturnValue>;
	pickFileFolderAndOpen(
		windowId: number | undefined,
		options: INativeOpenDialogOptions,
	): Promise<void>;
	pickFolderAndOpen(
		windowId: number | undefined,
		options: INativeOpenDialogOptions,
	): Promise<void>;
	pickFileAndOpen(
		windowId: number | undefined,
		options: INativeOpenDialogOptions,
	): Promise<void>;
	pickWorkspaceAndOpen(
		windowId: number | undefined,
		options: INativeOpenDialogOptions,
	): Promise<void>;
	private doOpenPicked;
	showItemInFolder(windowId: number | undefined, path: string): Promise<void>;
	setRepresentedFilename(
		windowId: number | undefined,
		path: string,
		options?: INativeHostOptions,
	): Promise<void>;
	setDocumentEdited(
		windowId: number | undefined,
		edited: boolean,
		options?: INativeHostOptions,
	): Promise<void>;
	openExternal(
		windowId: number | undefined,
		url: string,
		defaultApplication?: string,
	): Promise<boolean>;
	private openExternalBrowser;
	moveItemToTrash(
		windowId: number | undefined,
		fullPath: string,
	): Promise<void>;
	isAdmin(): Promise<boolean>;
	writeElevated(
		windowId: number | undefined,
		source: URI,
		target: URI,
		options?: {
			unlock?: boolean;
		},
	): Promise<void>;
	isRunningUnderARM64Translation(): Promise<boolean>;
	private get cliPath();
	getOSStatistics(): Promise<IOSStatistics>;
	getOSProperties(): Promise<IOSProperties>;
	getOSVirtualMachineHint(): Promise<number>;
	getOSColorScheme(): Promise<IColorScheme>;
	hasWSLFeatureInstalled(): Promise<boolean>;
	getProcessId(windowId: number | undefined): Promise<number | undefined>;
	killProcess(
		windowId: number | undefined,
		pid: number,
		code: string,
	): Promise<void>;
	readClipboardText(
		windowId: number | undefined,
		type?: "selection" | "clipboard",
	): Promise<string>;
	readImage(): Promise<Uint8Array>;
	writeClipboardText(
		windowId: number | undefined,
		text: string,
		type?: "selection" | "clipboard",
	): Promise<void>;
	readClipboardFindText(windowId: number | undefined): Promise<string>;
	writeClipboardFindText(
		windowId: number | undefined,
		text: string,
	): Promise<void>;
	writeClipboardBuffer(
		windowId: number | undefined,
		format: string,
		buffer: VSBuffer,
		type?: "selection" | "clipboard",
	): Promise<void>;
	readClipboardBuffer(
		windowId: number | undefined,
		format: string,
	): Promise<VSBuffer>;
	hasClipboard(
		windowId: number | undefined,
		format: string,
		type?: "selection" | "clipboard",
	): Promise<boolean>;
	newWindowTab(): Promise<void>;
	showPreviousWindowTab(): Promise<void>;
	showNextWindowTab(): Promise<void>;
	moveWindowTabToNewWindow(): Promise<void>;
	mergeAllWindowTabs(): Promise<void>;
	toggleWindowTabsBar(): Promise<void>;
	updateTouchBar(
		windowId: number | undefined,
		items: ISerializableCommandAction[][],
	): Promise<void>;
	notifyReady(windowId: number | undefined): Promise<void>;
	relaunch(
		windowId: number | undefined,
		options?: IRelaunchOptions,
	): Promise<void>;
	reload(
		windowId: number | undefined,
		options?: {
			disableExtensions?: boolean;
		},
	): Promise<void>;
	closeWindow(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	quit(windowId: number | undefined): Promise<void>;
	exit(windowId: number | undefined, code: number): Promise<void>;
	resolveProxy(
		windowId: number | undefined,
		url: string,
	): Promise<string | undefined>;
	lookupAuthorization(
		_windowId: number | undefined,
		authInfo: AuthInfo,
	): Promise<Credentials | undefined>;
	lookupKerberosAuthorization(
		_windowId: number | undefined,
		url: string,
	): Promise<string | undefined>;
	loadCertificates(_windowId: number | undefined): Promise<string[]>;
	findFreePort(
		windowId: number | undefined,
		startPort: number,
		giveUpAfter: number,
		timeout: number,
		stride?: number,
	): Promise<number>;
	openDevTools(
		windowId: number | undefined,
		options?: Partial<OpenDevToolsOptions> & INativeHostOptions,
	): Promise<void>;
	toggleDevTools(
		windowId: number | undefined,
		options?: INativeHostOptions,
	): Promise<void>;
	profileRenderer(
		windowId: number | undefined,
		session: string,
		duration: number,
	): Promise<IV8Profile>;
	windowsGetStringRegKey(
		windowId: number | undefined,
		hive:
			| "HKEY_CURRENT_USER"
			| "HKEY_LOCAL_MACHINE"
			| "HKEY_CLASSES_ROOT"
			| "HKEY_USERS"
			| "HKEY_CURRENT_CONFIG",
		path: string,
		name: string,
	): Promise<string | undefined>;
	private windowById;
	private codeWindowById;
	private auxiliaryWindowById;
}
