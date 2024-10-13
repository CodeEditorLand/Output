import type { IRawTheme } from "vscode-textmate";

import { IDisposable } from "../../../../../base/common/lifecycle.js";
import { IObservable } from "../../../../../base/common/observable.js";
import {
	IBackgroundTokenizationStore,
	IBackgroundTokenizer,
} from "../../../../../editor/common/languages.js";
import { ILanguageService } from "../../../../../editor/common/languages/language.js";
import { ITextModel } from "../../../../../editor/common/model.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IEnvironmentService } from "../../../../../platform/environment/common/environment.js";
import { IExtensionResourceLoaderService } from "../../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js";
import { INotificationService } from "../../../../../platform/notification/common/notification.js";
import { ITelemetryService } from "../../../../../platform/telemetry/common/telemetry.js";
import { IValidGrammarDefinition } from "../../common/TMScopeRegistry.js";

export declare class ThreadedBackgroundTokenizerFactory implements IDisposable {
	private readonly _reportTokenizationTime;
	private readonly _shouldTokenizeAsync;
	private readonly _extensionResourceLoaderService;
	private readonly _configurationService;
	private readonly _languageService;
	private readonly _environmentService;
	private readonly _notificationService;
	private readonly _telemetryService;
	private static _reportedMismatchingTokens;
	private _workerProxyPromise;
	private _worker;
	private _workerProxy;
	private readonly _workerTokenizerControllers;
	private _currentTheme;
	private _currentTokenColorMap;
	private _grammarDefinitions;
	constructor(
		_reportTokenizationTime: (
			timeMs: number,
			languageId: string,
			sourceExtensionId: string | undefined,
			lineLength: number,
			isRandomSample: boolean,
		) => void,
		_shouldTokenizeAsync: () => boolean,
		_extensionResourceLoaderService: IExtensionResourceLoaderService,
		_configurationService: IConfigurationService,
		_languageService: ILanguageService,
		_environmentService: IEnvironmentService,
		_notificationService: INotificationService,
		_telemetryService: ITelemetryService,
	);
	dispose(): void;
	createBackgroundTokenizer(
		textModel: ITextModel,
		tokenStore: IBackgroundTokenizationStore,
		maxTokenizationLineLength: IObservable<number>,
	): IBackgroundTokenizer | undefined;
	setGrammarDefinitions(grammarDefinitions: IValidGrammarDefinition[]): void;
	acceptTheme(theme: IRawTheme, colorMap: string[]): void;
	private _getWorkerProxy;
	private _createWorkerProxy;
	private _disposeWorker;
}
