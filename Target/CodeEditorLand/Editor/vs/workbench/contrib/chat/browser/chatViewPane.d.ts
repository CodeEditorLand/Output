import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import {
	IViewPaneOptions,
	ViewPane,
} from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IChatViewTitleActionContext } from "../common/chatActions.js";
import { ChatAgentLocation, IChatAgentService } from "../common/chatAgents.js";
import { IChatService } from "../common/chatService.js";
import { ChatWidget, IChatViewState } from "./chatWidget.js";

export declare const CHAT_SIDEBAR_PANEL_ID = "workbench.panel.chatSidebar";
export declare const CHAT_EDITING_SIDEBAR_PANEL_ID =
	"workbench.panel.chatEditing";
export declare class ChatViewPane extends ViewPane {
	private readonly chatOptions;
	private readonly storageService;
	private readonly chatService;
	private readonly chatAgentService;
	private readonly logService;
	private _widget;
	get widget(): ChatWidget;
	private readonly modelDisposables;
	private memento;
	private readonly viewState;
	private didProviderRegistrationFail;
	private didUnregisterProvider;
	private isInitialized;
	constructor(
		options: IViewPaneOptions,
		chatOptions:
			| {
					location:
						| ChatAgentLocation.Panel
						| ChatAgentLocation.EditingSession;
			  }
			| undefined,
		keybindingService: IKeybindingService,
		contextMenuService: IContextMenuService,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		viewDescriptorService: IViewDescriptorService,
		instantiationService: IInstantiationService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		storageService: IStorageService,
		chatService: IChatService,
		chatAgentService: IChatAgentService,
		logService: ILogService,
	);
	getActionsContext(): IChatViewTitleActionContext | undefined;
	private updateModel;
	shouldShowWelcome(): boolean;
	private getSessionId;
	protected renderBody(parent: HTMLElement): void;
	acceptInput(query?: string): void;
	private clear;
	loadSession(sessionId: string, viewState?: IChatViewState): void;
	focusInput(): void;
	focus(): void;
	protected layoutBody(height: number, width: number): void;
	saveState(): void;
	private updateViewState;
}
