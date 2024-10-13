import { IProcessEnvironment } from "../../../base/common/platform.js";
import { ICSSDevelopmentService } from "../../cssDev/node/cssDevService.js";
import {
	IDiagnosticsService,
	PerformanceInfo,
	SystemInfo,
} from "../../diagnostics/common/diagnostics.js";
import { IDiagnosticsMainService } from "../../diagnostics/electron-main/diagnosticsMainService.js";
import { IDialogMainService } from "../../dialogs/electron-main/dialogMainService.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import { ILogService } from "../../log/common/log.js";
import { INativeHostMainService } from "../../native/electron-main/nativeHostMainService.js";
import { IProductService } from "../../product/common/productService.js";
import { IProtocolMainService } from "../../protocol/electron-main/protocol.js";
import { IStateService } from "../../state/node/state.js";
import { IProcessMainService, ProcessExplorerData } from "../common/issue.js";

export declare class ProcessMainService implements IProcessMainService {
	private userEnv;
	private readonly environmentMainService;
	private readonly logService;
	private readonly diagnosticsService;
	private readonly diagnosticsMainService;
	private readonly dialogMainService;
	private readonly nativeHostMainService;
	private readonly protocolMainService;
	private readonly productService;
	private readonly stateService;
	private readonly cssDevelopmentService;
	readonly _serviceBrand: undefined;
	private static readonly DEFAULT_BACKGROUND_COLOR;
	private processExplorerWindow;
	private processExplorerParentWindow;
	constructor(
		userEnv: IProcessEnvironment,
		environmentMainService: IEnvironmentMainService,
		logService: ILogService,
		diagnosticsService: IDiagnosticsService,
		diagnosticsMainService: IDiagnosticsMainService,
		dialogMainService: IDialogMainService,
		nativeHostMainService: INativeHostMainService,
		protocolMainService: IProtocolMainService,
		productService: IProductService,
		stateService: IStateService,
		cssDevelopmentService: ICSSDevelopmentService,
	);
	private registerListeners;
	openProcessExplorer(data: ProcessExplorerData): Promise<void>;
	private focusWindow;
	private getWindowPosition;
	stopTracing(): Promise<void>;
	getSystemStatus(): Promise<string>;
	$getSystemInfo(): Promise<SystemInfo>;
	$getPerformanceInfo(): Promise<PerformanceInfo>;
	private createBrowserWindow;
	private safeSend;
	closeProcessExplorer(): Promise<void>;
}
