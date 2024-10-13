import { CancellationToken } from "../../../base/common/cancellation.js";
import { SerializedError } from "../../../base/common/errors.js";
import { ExtensionIdentifier } from "../../../platform/extensions/common/extensions.js";
import { ILogService } from "../../../platform/log/common/log.js";
import {
	IChatMessage,
	IChatResponseFragment,
	ILanguageModelChatMetadata,
	ILanguageModelChatSelector,
	ILanguageModelsService,
} from "../../contrib/chat/common/languageModels.js";
import { ILanguageModelStatsService } from "../../contrib/chat/common/languageModelStats.js";
import { IAuthenticationAccessService } from "../../services/authentication/browser/authenticationAccessService.js";
import { IAuthenticationService } from "../../services/authentication/common/authentication.js";
import { IExtensionService } from "../../services/extensions/common/extensions.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { MainThreadLanguageModelsShape } from "../common/extHost.protocol.js";

export declare class MainThreadLanguageModels
	implements MainThreadLanguageModelsShape
{
	private readonly _chatProviderService;
	private readonly _languageModelStatsService;
	private readonly _logService;
	private readonly _authenticationService;
	private readonly _authenticationAccessService;
	private readonly _extensionService;
	private readonly _proxy;
	private readonly _store;
	private readonly _providerRegistrations;
	private readonly _pendingProgress;
	constructor(
		extHostContext: IExtHostContext,
		_chatProviderService: ILanguageModelsService,
		_languageModelStatsService: ILanguageModelStatsService,
		_logService: ILogService,
		_authenticationService: IAuthenticationService,
		_authenticationAccessService: IAuthenticationAccessService,
		_extensionService: IExtensionService,
	);
	dispose(): void;
	$registerLanguageModelProvider(
		handle: number,
		identifier: string,
		metadata: ILanguageModelChatMetadata,
	): void;
	$reportResponsePart(
		requestId: number,
		chunk: IChatResponseFragment,
	): Promise<void>;
	$reportResponseDone(
		requestId: number,
		err: SerializedError | undefined,
	): Promise<void>;
	$unregisterProvider(handle: number): void;
	$selectChatModels(selector: ILanguageModelChatSelector): Promise<string[]>;
	$whenLanguageModelChatRequestMade(
		identifier: string,
		extensionId: ExtensionIdentifier,
		participant?: string | undefined,
		tokenCount?: number | undefined,
	): void;
	$tryStartChatRequest(
		extension: ExtensionIdentifier,
		providerId: string,
		requestId: number,
		messages: IChatMessage[],
		options: {},
		token: CancellationToken,
	): Promise<any>;
	$countTokens(
		provider: string,
		value: string | IChatMessage,
		token: CancellationToken,
	): Promise<number>;
	private _registerAuthenticationProvider;
}
