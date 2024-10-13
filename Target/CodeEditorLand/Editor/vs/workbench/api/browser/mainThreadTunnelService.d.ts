import { CancellationToken } from "../../../base/common/cancellation.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../platform/contextkey/common/contextkey.js";
import { ILogService } from "../../../platform/log/common/log.js";
import { INotificationService } from "../../../platform/notification/common/notification.js";
import type { TunnelDescription } from "../../../platform/remote/common/remoteAuthorityResolver.js";
import {
	ITunnelService,
	PortAttributesProvider,
	ProvidedPortAttributes,
	TunnelOptions,
	TunnelProviderFeatures,
} from "../../../platform/tunnel/common/tunnel.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { IRemoteAgentService } from "../../services/remote/common/remoteAgentService.js";
import { IRemoteExplorerService } from "../../services/remote/common/remoteExplorerService.js";
import { CandidatePort } from "../../services/remote/common/tunnelModel.js";
import {
	CandidatePortSource,
	MainThreadTunnelServiceShape,
	PortAttributesSelector,
	TunnelDto,
} from "../common/extHost.protocol.js";

export declare class MainThreadTunnelService
	extends Disposable
	implements MainThreadTunnelServiceShape, PortAttributesProvider
{
	private readonly remoteExplorerService;
	private readonly tunnelService;
	private readonly notificationService;
	private readonly configurationService;
	private readonly logService;
	private readonly remoteAgentService;
	private readonly contextKeyService;
	private readonly _proxy;
	private elevateionRetry;
	private portsAttributesProviders;
	constructor(
		extHostContext: IExtHostContext,
		remoteExplorerService: IRemoteExplorerService,
		tunnelService: ITunnelService,
		notificationService: INotificationService,
		configurationService: IConfigurationService,
		logService: ILogService,
		remoteAgentService: IRemoteAgentService,
		contextKeyService: IContextKeyService,
	);
	private processFindingEnabled;
	$setRemoteTunnelService(processId: number): Promise<void>;
	private _alreadyRegistered;
	$registerPortsAttributesProvider(
		selector: PortAttributesSelector,
		providerHandle: number,
	): Promise<void>;
	$unregisterPortsAttributesProvider(providerHandle: number): Promise<void>;
	providePortAttributes(
		ports: number[],
		pid: number | undefined,
		commandLine: string | undefined,
		token: CancellationToken,
	): Promise<ProvidedPortAttributes[]>;
	$openTunnel(
		tunnelOptions: TunnelOptions,
		source: string,
	): Promise<TunnelDto | undefined>;
	private elevationPrompt;
	$closeTunnel(remote: { host: string; port: number }): Promise<void>;
	$getTunnels(): Promise<TunnelDescription[]>;
	$onFoundNewCandidates(candidates: CandidatePort[]): Promise<void>;
	$setTunnelProvider(
		features: TunnelProviderFeatures | undefined,
		isResolver: boolean,
	): Promise<void>;
	$setCandidateFilter(): Promise<void>;
	$setCandidatePortSource(source: CandidatePortSource): Promise<void>;
}
