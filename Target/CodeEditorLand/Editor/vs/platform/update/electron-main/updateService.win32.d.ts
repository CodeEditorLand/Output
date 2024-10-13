import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import { IFileService } from "../../files/common/files.js";
import {
	ILifecycleMainService,
	IRelaunchHandler,
	IRelaunchOptions,
} from "../../lifecycle/electron-main/lifecycleMainService.js";
import { ILogService } from "../../log/common/log.js";
import { INativeHostMainService } from "../../native/electron-main/nativeHostMainService.js";
import { IProductService } from "../../product/common/productService.js";
import { IRequestService } from "../../request/common/request.js";
import { ITelemetryService } from "../../telemetry/common/telemetry.js";
import { AvailableForDownload, UpdateType } from "../common/update.js";
import { AbstractUpdateService } from "./abstractUpdateService.js";

export declare class Win32UpdateService
	extends AbstractUpdateService
	implements IRelaunchHandler
{
	private readonly telemetryService;
	private readonly fileService;
	private readonly nativeHostMainService;
	private availableUpdate;
	get cachePath(): Promise<string>;
	constructor(
		lifecycleMainService: ILifecycleMainService,
		configurationService: IConfigurationService,
		telemetryService: ITelemetryService,
		environmentMainService: IEnvironmentMainService,
		requestService: IRequestService,
		logService: ILogService,
		fileService: IFileService,
		nativeHostMainService: INativeHostMainService,
		productService: IProductService,
	);
	handleRelaunch(options?: IRelaunchOptions): boolean;
	protected initialize(): Promise<void>;
	protected buildUpdateFeedUrl(quality: string): string | undefined;
	protected doCheckForUpdates(context: any): void;
	protected doDownloadUpdate(state: AvailableForDownload): Promise<void>;
	private getUpdatePackagePath;
	private cleanup;
	protected doApplyUpdate(): Promise<void>;
	protected doQuitAndInstall(): void;
	protected getUpdateType(): UpdateType;
	_applySpecificUpdate(packagePath: string): Promise<void>;
}
