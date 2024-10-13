import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IHostService } from "../../../services/host/browser/host.js";
import {
	ISpeechProvider,
	ISpeechService,
	ISpeechToTextSession,
	ITextToSpeechSession,
	KeywordRecognitionStatus,
} from "../common/speechService.js";

export interface ISpeechProviderDescriptor {
	readonly name: string;
	readonly description?: string;
}
export declare class SpeechService
	extends Disposable
	implements ISpeechService
{
	private readonly logService;
	private readonly contextKeyService;
	private readonly hostService;
	private readonly telemetryService;
	private readonly configurationService;
	private readonly extensionService;
	readonly _serviceBrand: undefined;
	private readonly _onDidChangeHasSpeechProvider;
	readonly onDidChangeHasSpeechProvider: Event<void>;
	get hasSpeechProvider(): boolean;
	private readonly providers;
	private readonly providerDescriptors;
	private readonly hasSpeechProviderContext;
	constructor(
		logService: ILogService,
		contextKeyService: IContextKeyService,
		hostService: IHostService,
		telemetryService: ITelemetryService,
		configurationService: IConfigurationService,
		extensionService: IExtensionService,
	);
	private handleAndRegisterSpeechExtensions;
	registerSpeechProvider(
		identifier: string,
		provider: ISpeechProvider,
	): IDisposable;
	private handleHasSpeechProviderChange;
	private readonly _onDidStartSpeechToTextSession;
	readonly onDidStartSpeechToTextSession: Event<void>;
	private readonly _onDidEndSpeechToTextSession;
	readonly onDidEndSpeechToTextSession: Event<void>;
	private activeSpeechToTextSessions;
	get hasActiveSpeechToTextSession(): boolean;
	private readonly speechToTextInProgress;
	createSpeechToTextSession(
		token: CancellationToken,
		context?: string,
	): Promise<ISpeechToTextSession>;
	private getProvider;
	private readonly _onDidStartTextToSpeechSession;
	readonly onDidStartTextToSpeechSession: Event<void>;
	private readonly _onDidEndTextToSpeechSession;
	readonly onDidEndTextToSpeechSession: Event<void>;
	private activeTextToSpeechSessions;
	get hasActiveTextToSpeechSession(): boolean;
	private readonly textToSpeechInProgress;
	createTextToSpeechSession(
		token: CancellationToken,
		context?: string,
	): Promise<ITextToSpeechSession>;
	private readonly _onDidStartKeywordRecognition;
	readonly onDidStartKeywordRecognition: Event<void>;
	private readonly _onDidEndKeywordRecognition;
	readonly onDidEndKeywordRecognition: Event<void>;
	private activeKeywordRecognitionSessions;
	get hasActiveKeywordRecognition(): boolean;
	recognizeKeyword(
		token: CancellationToken,
	): Promise<KeywordRecognitionStatus>;
	private doRecognizeKeyword;
}
