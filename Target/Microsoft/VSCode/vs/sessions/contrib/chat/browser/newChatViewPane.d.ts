import './media/chatWidget.css';
import './media/chatWelcomePart.css';
import { Event } from '../../../../base/common/event.js';
import { IObservable } from '../../../../base/common/observable.js';
import { URI } from '../../../../base/common/uri.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { AgentSessionProviders } from '../../../../workbench/contrib/chat/browser/agentSessions/agentSessions.js';
import { ISessionsManagementService } from '../../sessions/browser/sessionsManagementService.js';
import { ChatSessionPosition } from '../../../../workbench/contrib/chat/browser/chatSessions/chatSessions.contribution.js';
import { IChatSendRequestOptions } from '../../../../workbench/contrib/chat/common/chatService/chatService.js';
import { IChatSessionProviderOptionItem } from '../../../../workbench/contrib/chat/common/chatSessionsService.js';
import { IViewDescriptorService } from '../../../../workbench/common/views.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { IViewPaneOptions, ViewPane } from '../../../../workbench/browser/parts/views/viewPane.js';
/**
 * Tracks which agent session targets are available and which is selected.
 * Targets are fixed at construction time; only the selection changes.
 */
export interface ITargetConfig {
    readonly allowedTargets: IObservable<ReadonlySet<AgentSessionProviders>>;
    readonly selectedTarget: IObservable<AgentSessionProviders | undefined>;
    readonly onDidChangeSelectedTarget: Event<AgentSessionProviders | undefined>;
    readonly onDidChangeAllowedTargets: Event<ReadonlySet<AgentSessionProviders>>;
    setSelectedTarget(target: AgentSessionProviders): void;
}
export interface ITargetConfigOptions {
    allowedTargets: AgentSessionProviders[];
    defaultTarget?: AgentSessionProviders;
}
/**
 * Data passed to the `onSendRequest` callback when the user submits a query.
 */
export interface INewChatSendRequestData {
    readonly resource: URI;
    readonly target: AgentSessionProviders;
    readonly query: string;
    readonly sendOptions: IChatSendRequestOptions;
    readonly selectedOptions: ReadonlyMap<string, IChatSessionProviderOptionItem>;
    readonly folderUri?: URI;
}
/**
 * Options for creating a `NewChatWidget`.
 */
export interface INewChatWidgetOptions {
    readonly targetConfig: ITargetConfigOptions;
    readonly onSendRequest?: (data: INewChatSendRequestData) => void;
    readonly sessionPosition?: ChatSessionPosition;
}
export declare const SessionsViewId = "workbench.view.sessions.chat";
/**
 * A view pane that hosts the new-session welcome widget.
 */
export declare class NewChatViewPane extends ViewPane {
    private readonly activeSessionService;
    private readonly workspaceContextService;
    private readonly logService;
    private _widget;
    constructor(options: IViewPaneOptions, keybindingService: IKeybindingService, contextMenuService: IContextMenuService, configurationService: IConfigurationService, contextKeyService: IContextKeyService, viewDescriptorService: IViewDescriptorService, instantiationService: IInstantiationService, openerService: IOpenerService, themeService: IThemeService, hoverService: IHoverService, activeSessionService: ISessionsManagementService, workspaceContextService: IWorkspaceContextService, logService: ILogService);
    protected renderBody(container: HTMLElement): void;
    private computeAllowedTargets;
    protected layoutBody(height: number, width: number): void;
    focus(): void;
    setVisible(visible: boolean): void;
}
