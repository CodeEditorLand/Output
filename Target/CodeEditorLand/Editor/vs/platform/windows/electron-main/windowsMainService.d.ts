import { WebContents } from "electron";

import { Event } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { IProcessEnvironment } from "../../../base/common/platform.js";
import { IAuxiliaryWindowsMainService } from "../../auxiliaryWindow/electron-main/auxiliaryWindows.js";
import { IBackupMainService } from "../../backup/electron-main/backup.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { ICSSDevelopmentService } from "../../cssDev/node/cssDevService.js";
import { IDialogMainService } from "../../dialogs/electron-main/dialogMainService.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import { IFileService } from "../../files/common/files.js";
import { IInstantiationService } from "../../instantiation/common/instantiation.js";
import { ILifecycleMainService } from "../../lifecycle/electron-main/lifecycleMainService.js";
import { ILogService } from "../../log/common/log.js";
import { ILoggerMainService } from "../../log/electron-main/loggerService.js";
import { IPolicyService } from "../../policy/common/policy.js";
import { IProtocolMainService } from "../../protocol/electron-main/protocol.js";
import { IStateService } from "../../state/node/state.js";
import { IThemeMainService } from "../../theme/electron-main/themeMainService.js";
import { IUserDataProfilesMainService } from "../../userDataProfile/electron-main/userDataProfile.js";
import { IOpenEmptyWindowOptions } from "../../window/common/window.js";
import { ICodeWindow } from "../../window/electron-main/window.js";
import { IWorkspacesHistoryMainService } from "../../workspaces/electron-main/workspacesHistoryMainService.js";
import { IWorkspacesManagementMainService } from "../../workspaces/electron-main/workspacesManagementMainService.js";
import {
	IOpenConfiguration,
	IOpenEmptyConfiguration,
	IWindowsCountChangedEvent,
	IWindowsMainService,
} from "./windows.js";

export declare class WindowsMainService
	extends Disposable
	implements IWindowsMainService
{
	private readonly machineId;
	private readonly sqmId;
	private readonly devDeviceId;
	private readonly initialUserEnv;
	private readonly logService;
	private readonly loggerService;
	private readonly stateService;
	private readonly policyService;
	private readonly environmentMainService;
	private readonly userDataProfilesMainService;
	private readonly lifecycleMainService;
	private readonly backupMainService;
	private readonly configurationService;
	private readonly workspacesHistoryMainService;
	private readonly workspacesManagementMainService;
	private readonly instantiationService;
	private readonly dialogMainService;
	private readonly fileService;
	private readonly protocolMainService;
	private readonly themeMainService;
	private readonly auxiliaryWindowsMainService;
	private readonly cssDevelopmentService;
	readonly _serviceBrand: undefined;
	private readonly _onDidOpenWindow;
	readonly onDidOpenWindow: Event<ICodeWindow>;
	private readonly _onDidSignalReadyWindow;
	readonly onDidSignalReadyWindow: Event<ICodeWindow>;
	private readonly _onDidDestroyWindow;
	readonly onDidDestroyWindow: Event<ICodeWindow>;
	private readonly _onDidChangeWindowsCount;
	readonly onDidChangeWindowsCount: Event<IWindowsCountChangedEvent>;
	private readonly _onDidMaximizeWindow;
	readonly onDidMaximizeWindow: Event<ICodeWindow>;
	private readonly _onDidUnmaximizeWindow;
	readonly onDidUnmaximizeWindow: Event<ICodeWindow>;
	private readonly _onDidChangeFullScreen;
	readonly onDidChangeFullScreen: Event<{
		window: ICodeWindow;
		fullscreen: boolean;
	}>;
	private readonly _onDidTriggerSystemContextMenu;
	readonly onDidTriggerSystemContextMenu: Event<{
		window: ICodeWindow;
		x: number;
		y: number;
	}>;
	private readonly windows;
	private readonly windowsStateHandler;
	constructor(
		machineId: string,
		sqmId: string,
		devDeviceId: string,
		initialUserEnv: IProcessEnvironment,
		logService: ILogService,
		loggerService: ILoggerMainService,
		stateService: IStateService,
		policyService: IPolicyService,
		environmentMainService: IEnvironmentMainService,
		userDataProfilesMainService: IUserDataProfilesMainService,
		lifecycleMainService: ILifecycleMainService,
		backupMainService: IBackupMainService,
		configurationService: IConfigurationService,
		workspacesHistoryMainService: IWorkspacesHistoryMainService,
		workspacesManagementMainService: IWorkspacesManagementMainService,
		instantiationService: IInstantiationService,
		dialogMainService: IDialogMainService,
		fileService: IFileService,
		protocolMainService: IProtocolMainService,
		themeMainService: IThemeMainService,
		auxiliaryWindowsMainService: IAuxiliaryWindowsMainService,
		cssDevelopmentService: ICSSDevelopmentService,
	);
	private registerListeners;
	openEmptyWindow(
		openConfig: IOpenEmptyConfiguration,
		options?: IOpenEmptyWindowOptions,
	): Promise<ICodeWindow[]>;
	openExistingWindow(
		window: ICodeWindow,
		openConfig: IOpenConfiguration,
	): void;
	open(openConfig: IOpenConfiguration): Promise<ICodeWindow[]>;
	private handleWaitMarkerFile;
	private doOpen;
	private doOpenFilesInExistingWindow;
	private focusMainOrChildWindow;
	private doAddFoldersToExistingWindow;
	private doOpenEmpty;
	private doOpenFolderOrWorkspace;
	private getPathsToOpen;
	private doExtractPathsFromAPI;
	private doExtractPathsFromCLI;
	private cliArgToUri;
	private doGetPathsFromLastSession;
	private getRestoreWindowsSetting;
	private resolveOpenable;
	private doResolveRemoteOpenable;
	private resourceFromOpenable;
	private doResolveFilePath;
	private onUNCHostNotAllowed;
	private doResolveRemotePath;
	private shouldOpenNewWindow;
	openExtensionDevelopmentHostWindow(
		extensionDevelopmentPaths: string[],
		openConfig: IOpenConfiguration,
	): Promise<ICodeWindow[]>;
	private openInBrowserWindow;
	private doOpenInBrowserWindow;
	private resolveProfileForBrowserWindow;
	private onWindowClosed;
	private onWindowDestroyed;
	getFocusedWindow(): ICodeWindow | undefined;
	getLastActiveWindow(): ICodeWindow | undefined;
	private getLastActiveWindowForAuthority;
	private doGetLastActiveWindow;
	sendToFocused(channel: string, ...args: any[]): void;
	sendToOpeningWindow(channel: string, ...args: any[]): void;
	sendToAll(
		channel: string,
		payload?: any,
		windowIdsToIgnore?: number[],
	): void;
	getWindows(): ICodeWindow[];
	getWindowCount(): number;
	getWindowById(windowId: number): ICodeWindow | undefined;
	getWindowByWebContents(webContents: WebContents): ICodeWindow | undefined;
}
