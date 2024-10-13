import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import {
	IResourcePreview,
	IUserDataSyncEnablementService,
	IUserDataSyncService,
} from "../../../../platform/userDataSync/common/userDataSync.js";
import { TreeViewPane } from "../../../browser/parts/views/treeView.js";
import { IViewletViewOptions } from "../../../browser/parts/views/viewsViewlet.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IAccessibleViewInformationService } from "../../../services/accessibility/common/accessibleViewInformationService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import {
	IUserDataSyncConflictsView,
	IUserDataSyncWorkbenchService,
} from "../../../services/userDataSync/common/userDataSync.js";

export declare class UserDataSyncConflictsViewPane
	extends TreeViewPane
	implements IUserDataSyncConflictsView
{
	private readonly editorService;
	private readonly userDataSyncService;
	private readonly userDataSyncWorkbenchService;
	private readonly userDataSyncEnablementService;
	private readonly userDataProfilesService;
	constructor(
		options: IViewletViewOptions,
		editorService: IEditorService,
		keybindingService: IKeybindingService,
		contextMenuService: IContextMenuService,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		viewDescriptorService: IViewDescriptorService,
		instantiationService: IInstantiationService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		notificationService: INotificationService,
		hoverService: IHoverService,
		userDataSyncService: IUserDataSyncService,
		userDataSyncWorkbenchService: IUserDataSyncWorkbenchService,
		userDataSyncEnablementService: IUserDataSyncEnablementService,
		userDataProfilesService: IUserDataProfilesService,
		accessibleViewVisibilityService: IAccessibleViewInformationService,
	);
	protected renderTreeView(container: HTMLElement): void;
	private getTreeItems;
	private parseHandle;
	private registerActions;
	open(conflictToOpen: IResourcePreview): Promise<void>;
}
