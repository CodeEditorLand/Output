import { IRemoteAgentService } from '../../../services/remote/common/remoteAgentService.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { IMenuService } from '../../../../platform/actions/common/actions.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';
import { IStatusbarService } from '../../../services/statusbar/browser/statusbar.js';
import { ILabelService } from '../../../../platform/label/common/label.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IExtensionService } from '../../../services/extensions/common/extensions.js';
import { IQuickInputService } from '../../../../platform/quickinput/common/quickInput.js';
import { IBrowserWorkbenchEnvironmentService } from '../../../services/environment/browser/environmentService.js';
import { IRemoteAuthorityResolverService } from '../../../../platform/remote/common/remoteAuthorityResolver.js';
import { IHostService } from '../../../services/host/browser/host.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IExtensionGalleryService, IExtensionManagementService } from '../../../../platform/extensionManagement/common/extensionManagement.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IProductService } from '../../../../platform/product/common/productService.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
export declare class RemoteStatusIndicator extends Disposable implements IWorkbenchContribution {
    private readonly statusbarService;
    private readonly environmentService;
    private readonly labelService;
    private contextKeyService;
    private menuService;
    private readonly quickInputService;
    private readonly commandService;
    private readonly extensionService;
    private readonly remoteAgentService;
    private readonly remoteAuthorityResolverService;
    private readonly hostService;
    private readonly workspaceContextService;
    private readonly logService;
    private readonly extensionGalleryService;
    private readonly telemetryService;
    private readonly productService;
    private readonly extensionManagementService;
    private readonly openerService;
    private readonly configurationService;
    static readonly ID = "workbench.contrib.remoteStatusIndicator";
    private static readonly REMOTE_ACTIONS_COMMAND_ID;
    private static readonly CLOSE_REMOTE_COMMAND_ID;
    private static readonly SHOW_CLOSE_REMOTE_COMMAND_ID;
    private static readonly INSTALL_REMOTE_EXTENSIONS_ID;
    private static readonly REMOTE_STATUS_LABEL_MAX_LENGTH;
    private static readonly REMOTE_CONNECTION_LATENCY_SCHEDULER_DELAY;
    private static readonly REMOTE_CONNECTION_LATENCY_SCHEDULER_FIRST_RUN_DELAY;
    private remoteStatusEntry;
    private readonly legacyIndicatorMenu;
    private readonly remoteIndicatorMenu;
    private remoteMenuActionsGroups;
    private readonly remoteAuthority;
    private virtualWorkspaceLocation;
    private connectionState;
    private connectionToken;
    private readonly connectionStateContextKey;
    private networkState;
    private measureNetworkConnectionLatencyScheduler;
    private loggedInvalidGroupNames;
    private _remoteExtensionMetadata;
    private get remoteExtensionMetadata();
    private remoteMetadataInitialized;
    private readonly _onDidChangeEntries;
    private readonly onDidChangeEntries;
    constructor(statusbarService: IStatusbarService, environmentService: IBrowserWorkbenchEnvironmentService, labelService: ILabelService, contextKeyService: IContextKeyService, menuService: IMenuService, quickInputService: IQuickInputService, commandService: ICommandService, extensionService: IExtensionService, remoteAgentService: IRemoteAgentService, remoteAuthorityResolverService: IRemoteAuthorityResolverService, hostService: IHostService, workspaceContextService: IWorkspaceContextService, logService: ILogService, extensionGalleryService: IExtensionGalleryService, telemetryService: ITelemetryService, productService: IProductService, extensionManagementService: IExtensionManagementService, openerService: IOpenerService, configurationService: IConfigurationService);
    private registerActions;
    private registerListeners;
    private initializeRemoteMetadata;
    private updateVirtualWorkspaceLocation;
    private updateWhenInstalledExtensionsRegistered;
    private setConnectionState;
    private scheduleMeasureNetworkConnectionLatency;
    private measureNetworkConnectionLatency;
    private setNetworkState;
    private logNetworkConnectionHealthTelemetry;
    private validatedGroup;
    private getRemoteMenuActions;
    private updateRemoteStatusIndicator;
    private renderRemoteStatusIndicator;
    private withNetworkStatus;
    private appendTooltipLine;
    private installExtension;
    private runRemoteStartCommand;
    private showRemoteMenu;
}
