import { IProcessEnvironment } from "../../../base/common/platform.js";
import { ICSSDevelopmentService } from "../../cssDev/node/cssDevService.js";
import { IDialogMainService } from "../../dialogs/electron-main/dialogMainService.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import { ILogService } from "../../log/common/log.js";
import { INativeHostMainService } from "../../native/electron-main/nativeHostMainService.js";
import { IProtocolMainService } from "../../protocol/electron-main/protocol.js";
import { ICodeWindow } from "../../window/electron-main/window.js";
import { IWindowsMainService } from "../../windows/electron-main/windows.js";
import { IIssueMainService, OldIssueReporterData } from "../common/issue.js";

export declare class IssueMainService implements IIssueMainService {
	private userEnv;
	private readonly environmentMainService;
	private readonly logService;
	private readonly dialogMainService;
	private readonly nativeHostMainService;
	private readonly protocolMainService;
	private readonly windowsMainService;
	private readonly cssDevelopmentService;
	readonly _serviceBrand: undefined;
	private static readonly DEFAULT_BACKGROUND_COLOR;
	private issueReporterWindow;
	private issueReporterParentWindow;
	constructor(
		userEnv: IProcessEnvironment,
		environmentMainService: IEnvironmentMainService,
		logService: ILogService,
		dialogMainService: IDialogMainService,
		nativeHostMainService: INativeHostMainService,
		protocolMainService: IProtocolMainService,
		windowsMainService: IWindowsMainService,
		cssDevelopmentService: ICSSDevelopmentService,
	);
	openReporter(data: OldIssueReporterData): Promise<void>;
	$reloadWithExtensionsDisabled(): Promise<void>;
	$showConfirmCloseDialog(): Promise<void>;
	$showClipboardDialog(): Promise<boolean>;
	issueReporterWindowCheck(): ICodeWindow;
	$sendReporterMenu(
		extensionId: string,
		extensionName: string,
	): Promise<OldIssueReporterData | undefined>;
	$closeReporter(): Promise<void>;
	private focusWindow;
	private createBrowserWindow;
	private getWindowPosition;
}
