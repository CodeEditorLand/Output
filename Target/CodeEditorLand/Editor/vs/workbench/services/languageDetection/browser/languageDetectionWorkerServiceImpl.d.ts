import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IDiagnosticsService } from "../../../../platform/diagnostics/common/diagnostics.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";
import { ILanguageDetectionService } from "../common/languageDetectionWorkerService.js";

export declare class LanguageDetectionService
	extends Disposable
	implements ILanguageDetectionService
{
	private readonly _environmentService;
	private readonly _configurationService;
	private readonly _diagnosticsService;
	private readonly _workspaceContextService;
	private readonly _editorService;
	private readonly _logService;
	static readonly enablementSettingKey = "workbench.editor.languageDetection";
	static readonly historyBasedEnablementConfig =
		"workbench.editor.historyBasedLanguageDetection";
	static readonly preferHistoryConfig =
		"workbench.editor.preferHistoryBasedLanguageDetection";
	static readonly workspaceOpenedLanguagesStorageKey =
		"workbench.editor.languageDetectionOpenedLanguages.workspace";
	static readonly globalOpenedLanguagesStorageKey =
		"workbench.editor.languageDetectionOpenedLanguages.global";
	_serviceBrand: undefined;
	private _languageDetectionWorkerClient;
	private hasResolvedWorkspaceLanguageIds;
	private workspaceLanguageIds;
	private sessionOpenedLanguageIds;
	private historicalGlobalOpenedLanguageIds;
	private historicalWorkspaceOpenedLanguageIds;
	private dirtyBiases;
	private langBiases;
	constructor(
		_environmentService: IWorkbenchEnvironmentService,
		languageService: ILanguageService,
		_configurationService: IConfigurationService,
		_diagnosticsService: IDiagnosticsService,
		_workspaceContextService: IWorkspaceContextService,
		modelService: IModelService,
		_editorService: IEditorService,
		telemetryService: ITelemetryService,
		storageService: IStorageService,
		_logService: ILogService,
	);
	private resolveWorkspaceLanguageIds;
	isEnabledForLanguage(languageId: string): boolean;
	private getLanguageBiases;
	detectLanguage(
		resource: URI,
		supportedLangs?: string[],
	): Promise<string | undefined>;
	private initEditorOpenedListeners;
}
export declare class LanguageDetectionWorkerClient extends Disposable {
	private readonly _modelService;
	private readonly _languageService;
	private readonly _telemetryService;
	private readonly _indexJsUri;
	private readonly _modelJsonUri;
	private readonly _weightsUri;
	private readonly _regexpModelUri;
	private worker;
	constructor(
		_modelService: IModelService,
		_languageService: ILanguageService,
		_telemetryService: ITelemetryService,
		_indexJsUri: string,
		_modelJsonUri: string,
		_weightsUri: string,
		_regexpModelUri: string,
	);
	private _getOrCreateLanguageDetectionWorker;
	private _guessLanguageIdByUri;
	getIndexJsUri(): Promise<string>;
	getLanguageId(languageIdOrExt: string | undefined): string | undefined;
	getModelJsonUri(): Promise<string>;
	getWeightsUri(): Promise<string>;
	getRegexpModelUri(): Promise<string>;
	sendTelemetryEvent(
		languages: string[],
		confidences: number[],
		timeSpent: number,
	): Promise<void>;
	detectLanguage(
		resource: URI,
		langBiases: Record<string, number> | undefined,
		preferHistory: boolean,
		supportedLangs?: string[],
	): Promise<string | undefined>;
}
