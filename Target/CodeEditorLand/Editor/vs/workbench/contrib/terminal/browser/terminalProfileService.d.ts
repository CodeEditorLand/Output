import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { OperatingSystem } from "../../../../base/common/platform.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import {
	IExtensionTerminalProfile,
	IShellLaunchConfig,
	ITerminalProfile,
} from "../../../../platform/terminal/common/terminal.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IRemoteAgentService } from "../../../services/remote/common/remoteAgentService.js";
import {
	IRegisterContributedProfileArgs,
	ITerminalProfileProvider,
	ITerminalProfileService,
} from "../common/terminal.js";
import { ITerminalContributionService } from "../common/terminalExtensionPoints.js";
import { ITerminalInstanceService } from "./terminal.js";

export declare class TerminalProfileService
	extends Disposable
	implements ITerminalProfileService
{
	private readonly _contextKeyService;
	private readonly _configurationService;
	private readonly _terminalContributionService;
	private readonly _extensionService;
	private _remoteAgentService;
	private readonly _environmentService;
	private readonly _terminalInstanceService;
	_serviceBrand: undefined;
	private _webExtensionContributedProfileContextKey;
	private _profilesReadyBarrier;
	private _profilesReadyPromise;
	private _availableProfiles;
	private _automationProfile;
	private _contributedProfiles;
	private _defaultProfileName?;
	private _platformConfigJustRefreshed;
	private readonly _refreshTerminalActionsDisposable;
	private readonly _profileProviders;
	private readonly _onDidChangeAvailableProfiles;
	get onDidChangeAvailableProfiles(): Event<ITerminalProfile[]>;
	get profilesReady(): Promise<void>;
	get availableProfiles(): ITerminalProfile[];
	get contributedProfiles(): IExtensionTerminalProfile[];
	constructor(
		_contextKeyService: IContextKeyService,
		_configurationService: IConfigurationService,
		_terminalContributionService: ITerminalContributionService,
		_extensionService: IExtensionService,
		_remoteAgentService: IRemoteAgentService,
		_environmentService: IWorkbenchEnvironmentService,
		_terminalInstanceService: ITerminalInstanceService,
	);
	private _setupConfigListener;
	getDefaultProfileName(): string | undefined;
	getDefaultProfile(os?: OperatingSystem): ITerminalProfile | undefined;
	private _getOsKey;
	refreshAvailableProfiles(): void;
	protected _refreshAvailableProfilesNow(): Promise<void>;
	private _updateContributedProfiles;
	getContributedProfileProvider(
		extensionIdentifier: string,
		id: string,
	): ITerminalProfileProvider | undefined;
	private _detectProfiles;
	private _updateWebContextKey;
	private _refreshPlatformConfig;
	getPlatformKey(): Promise<string>;
	registerTerminalProfileProvider(
		extensionIdentifier: string,
		id: string,
		profileProvider: ITerminalProfileProvider,
	): IDisposable;
	registerContributedProfile(
		args: IRegisterContributedProfileArgs,
	): Promise<void>;
	getContributedDefaultProfile(
		shellLaunchConfig: IShellLaunchConfig,
	): Promise<IExtensionTerminalProfile | undefined>;
}
