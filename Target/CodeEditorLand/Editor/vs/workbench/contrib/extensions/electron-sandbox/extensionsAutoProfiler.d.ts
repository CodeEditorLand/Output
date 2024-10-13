import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IProfileAnalysisWorkerService } from "../../../../platform/profiling/electron-sandbox/profileAnalysisWorkerService.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { INativeWorkbenchEnvironmentService } from "../../../services/environment/electron-sandbox/environmentService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { ITimerService } from "../../../services/timer/browser/timerService.js";
import { IExtensionHostProfileService } from "./runtimeExtensionsEditor.js";

export declare class ExtensionsAutoProfiler implements IWorkbenchContribution {
	private readonly _extensionService;
	private readonly _extensionProfileService;
	private readonly _telemetryService;
	private readonly _logService;
	private readonly _notificationService;
	private readonly _editorService;
	private readonly _instantiationService;
	private readonly _environmentServie;
	private readonly _profileAnalysisService;
	private readonly _configService;
	private readonly _fileService;
	private readonly _blame;
	private _session;
	private _unresponsiveListener;
	private _perfBaseline;
	constructor(
		_extensionService: IExtensionService,
		_extensionProfileService: IExtensionHostProfileService,
		_telemetryService: ITelemetryService,
		_logService: ILogService,
		_notificationService: INotificationService,
		_editorService: IEditorService,
		_instantiationService: IInstantiationService,
		_environmentServie: INativeWorkbenchEnvironmentService,
		_profileAnalysisService: IProfileAnalysisWorkerService,
		_configService: IConfigurationService,
		_fileService: IFileService,
		timerService: ITimerService,
	);
	dispose(): void;
	private _onDidChangeResponsiveChange;
	private _processCpuProfile;
}
