import { DeferredPromise } from "../../../base/common/async.js";
import { Event } from "../../../base/common/event.js";
import { IMarkdownString } from "../../../base/common/htmlContent.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { UriComponents } from "../../../base/common/uri.js";
import { ILanguageFeaturesService } from "../../../editor/common/services/languageFeatures.js";
import { ExtensionIdentifier } from "../../../platform/extensions/common/extensions.js";
import { IInstantiationService } from "../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../platform/log/common/log.js";
import { IChatWidgetService } from "../../contrib/chat/browser/chat.js";
import { IChatAgentService } from "../../contrib/chat/common/chatAgents.js";
import {
	IChatContentInlineReference,
	IChatContentReference,
	IChatService,
	IChatTask,
	IChatWarningMessage,
} from "../../contrib/chat/common/chatService.js";
import { IExtensionService } from "../../services/extensions/common/extensions.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { Dto } from "../../services/extensions/common/proxyIdentifier.js";
import {
	IChatProgressDto,
	IDynamicChatAgentProps,
	IExtensionChatAgentMetadata,
	MainThreadChatAgentsShape2,
} from "../common/extHost.protocol.js";

export declare class MainThreadChatTask implements IChatTask {
	content: IMarkdownString;
	readonly kind = "progressTask";
	readonly deferred: DeferredPromise<string | void>;
	private readonly _onDidAddProgress;
	get onDidAddProgress(): Event<IChatWarningMessage | IChatContentReference>;
	readonly progress: (IChatWarningMessage | IChatContentReference)[];
	constructor(content: IMarkdownString);
	task(): Promise<string | void>;
	isSettled(): boolean;
	complete(v: string | void): void;
	add(progress: IChatWarningMessage | IChatContentReference): void;
}
export declare class MainThreadChatAgents2
	extends Disposable
	implements MainThreadChatAgentsShape2
{
	private readonly _chatAgentService;
	private readonly _chatService;
	private readonly _languageFeaturesService;
	private readonly _chatWidgetService;
	private readonly _instantiationService;
	private readonly _logService;
	private readonly _extensionService;
	private readonly _agents;
	private readonly _agentCompletionProviders;
	private readonly _agentIdsToCompletionProviders;
	private readonly _chatParticipantDetectionProviders;
	private readonly _pendingProgress;
	private readonly _proxy;
	private _responsePartHandlePool;
	private readonly _activeTasks;
	private readonly _unresolvedAnchors;
	constructor(
		extHostContext: IExtHostContext,
		_chatAgentService: IChatAgentService,
		_chatService: IChatService,
		_languageFeaturesService: ILanguageFeaturesService,
		_chatWidgetService: IChatWidgetService,
		_instantiationService: IInstantiationService,
		_logService: ILogService,
		_extensionService: IExtensionService,
	);
	$unregisterAgent(handle: number): void;
	$transferActiveChatSession(toWorkspace: UriComponents): void;
	$registerAgent(
		handle: number,
		extension: ExtensionIdentifier,
		id: string,
		metadata: IExtensionChatAgentMetadata,
		dynamicProps: IDynamicChatAgentProps | undefined,
	): void;
	$updateAgent(
		handle: number,
		metadataUpdate: IExtensionChatAgentMetadata,
	): void;
	$handleProgressChunk(
		requestId: string,
		progress: IChatProgressDto,
		responsePartHandle?: number,
	): Promise<number | void>;
	$handleAnchorResolve(
		requestId: string,
		handle: string,
		resolveAnchor: Dto<IChatContentInlineReference> | undefined,
	): void;
	$registerAgentCompletionsProvider(
		handle: number,
		id: string,
		triggerCharacters: string[],
	): void;
	$unregisterAgentCompletionsProvider(handle: number, id: string): void;
	$registerChatParticipantDetectionProvider(handle: number): void;
	$unregisterChatParticipantDetectionProvider(handle: number): void;
}
