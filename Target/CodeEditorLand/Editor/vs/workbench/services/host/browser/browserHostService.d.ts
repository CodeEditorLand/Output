import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { ILayoutService } from "../../../../platform/layout/browser/layoutService.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import {
	IOpenEmptyWindowOptions,
	IOpenWindowOptions,
	IWindowOpenable,
} from "../../../../platform/window/common/window.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { BrowserLifecycleService } from "../../lifecycle/browser/lifecycleService.js";
import { IHostService } from "./host.js";

export declare class BrowserHostService
	extends Disposable
	implements IHostService
{
	private readonly layoutService;
	private readonly configurationService;
	private readonly fileService;
	private readonly labelService;
	private readonly environmentService;
	private readonly instantiationService;
	private readonly lifecycleService;
	private readonly logService;
	private readonly dialogService;
	private readonly contextService;
	private readonly userDataProfilesService;
	readonly _serviceBrand: undefined;
	private workspaceProvider;
	private shutdownReason;
	constructor(
		layoutService: ILayoutService,
		configurationService: IConfigurationService,
		fileService: IFileService,
		labelService: ILabelService,
		environmentService: IBrowserWorkbenchEnvironmentService,
		instantiationService: IInstantiationService,
		lifecycleService: BrowserLifecycleService,
		logService: ILogService,
		dialogService: IDialogService,
		contextService: IWorkspaceContextService,
		userDataProfilesService: IUserDataProfilesService,
	);
	private registerListeners;
	private onBeforeShutdown;
	private updateShutdownReasonFromEvent;
	get onDidChangeFocus(): Event<boolean>;
	get hasFocus(): boolean;
	hadLastFocus(): Promise<boolean>;
	focus(targetWindow: Window): Promise<void>;
	get onDidChangeActiveWindow(): Event<number>;
	get onDidChangeFullScreen(): Event<{
		windowId: number;
		fullscreen: boolean;
	}>;
	openWindow(options?: IOpenEmptyWindowOptions): Promise<void>;
	openWindow(
		toOpen: IWindowOpenable[],
		options?: IOpenWindowOptions,
	): Promise<void>;
	private doOpenWindow;
	private withServices;
	private preservePayload;
	private getRecentLabel;
	private shouldReuse;
	private doOpenEmptyWindow;
	private doOpen;
	toggleFullScreen(targetWindow: Window): Promise<void>;
	moveTop(targetWindow: Window): Promise<void>;
	getCursorScreenPoint(): Promise<undefined>;
	restart(): Promise<void>;
	reload(): Promise<void>;
	close(): Promise<void>;
	withExpectedShutdown<T>(expectedShutdownTask: () => Promise<T>): Promise<T>;
	private handleExpectedShutdown;
}
