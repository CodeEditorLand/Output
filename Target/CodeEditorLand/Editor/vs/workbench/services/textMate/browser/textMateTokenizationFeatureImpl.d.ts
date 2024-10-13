import type { IGrammar } from "vscode-textmate";

import { Disposable } from "../../../../base/common/lifecycle.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IExtensionResourceLoaderService } from "../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";
import { IWorkbenchThemeService } from "../../themes/common/workbenchThemeService.js";
import { ITextMateTokenizationService } from "./textMateTokenizationFeature.js";

export declare class TextMateTokenizationFeature
	extends Disposable
	implements ITextMateTokenizationService
{
	private readonly _languageService;
	private readonly _themeService;
	private readonly _extensionResourceLoaderService;
	private readonly _notificationService;
	private readonly _logService;
	private readonly _configurationService;
	private readonly _progressService;
	private readonly _environmentService;
	private readonly _instantiationService;
	private readonly _telemetryService;
	private static reportTokenizationTimeCounter;
	_serviceBrand: undefined;
	private readonly _styleElement;
	private readonly _createdModes;
	private readonly _encounteredLanguages;
	private _debugMode;
	private _debugModePrintFunc;
	private _grammarDefinitions;
	private _grammarFactory;
	private readonly _tokenizersRegistrations;
	private _currentTheme;
	private _currentTokenColorMap;
	private readonly _threadedBackgroundTokenizerFactory;
	constructor(
		_languageService: ILanguageService,
		_themeService: IWorkbenchThemeService,
		_extensionResourceLoaderService: IExtensionResourceLoaderService,
		_notificationService: INotificationService,
		_logService: ILogService,
		_configurationService: IConfigurationService,
		_progressService: IProgressService,
		_environmentService: IWorkbenchEnvironmentService,
		_instantiationService: IInstantiationService,
		_telemetryService: ITelemetryService,
	);
	private getAsyncTokenizationEnabled;
	private getAsyncTokenizationVerification;
	private _handleGrammarsExtPoint;
	private _validateGrammarDefinition;
	startDebugMode(printFn: (str: string) => void, onStop: () => void): void;
	private _canCreateGrammarFactory;
	private _getOrCreateGrammarFactory;
	private _createTokenizationSupport;
	private _updateTheme;
	createTokenizer(languageId: string): Promise<IGrammar | null>;
	private _vscodeOniguruma;
	private _getVSCodeOniguruma;
	private _loadVSCodeOnigurumaWASM;
	private _reportTokenizationTime;
}
