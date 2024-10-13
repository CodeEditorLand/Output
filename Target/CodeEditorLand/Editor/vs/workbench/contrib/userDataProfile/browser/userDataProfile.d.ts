import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { MenuId } from "../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IURLService } from "../../../../platform/url/common/url.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IBrowserWorkbenchEnvironmentService } from "../../../services/environment/browser/environmentService.js";
import { ILifecycleService } from "../../../services/lifecycle/common/lifecycle.js";
import {
	IUserDataProfileManagementService,
	IUserDataProfileService,
} from "../../../services/userDataProfile/common/userDataProfile.js";
import { IWorkspaceTagsService } from "../../tags/common/workspaceTags.js";

export declare const OpenProfileMenu: MenuId;
export declare class UserDataProfilesWorkbenchContribution
	extends Disposable
	implements IWorkbenchContribution
{
	private readonly userDataProfileService;
	private readonly userDataProfilesService;
	private readonly userDataProfileManagementService;
	private readonly telemetryService;
	private readonly workspaceContextService;
	private readonly workspaceTagsService;
	private readonly editorGroupsService;
	private readonly instantiationService;
	private readonly lifecycleService;
	private readonly urlService;
	static readonly ID = "workbench.contrib.userDataProfiles";
	private readonly currentProfileContext;
	private readonly isCurrentProfileTransientContext;
	private readonly hasProfilesContext;
	constructor(
		userDataProfileService: IUserDataProfileService,
		userDataProfilesService: IUserDataProfilesService,
		userDataProfileManagementService: IUserDataProfileManagementService,
		telemetryService: ITelemetryService,
		workspaceContextService: IWorkspaceContextService,
		workspaceTagsService: IWorkspaceTagsService,
		contextKeyService: IContextKeyService,
		editorGroupsService: IEditorGroupsService,
		instantiationService: IInstantiationService,
		lifecycleService: ILifecycleService,
		urlService: IURLService,
		environmentService: IBrowserWorkbenchEnvironmentService,
	);
	handleURL(uri: URI): Promise<boolean>;
	private openProfilesEditor;
	private registerEditor;
	private registerActions;
	private registerProfileSubMenu;
	private registerOpenProfileSubMenu;
	private readonly profilesDisposable;
	private registerProfilesActions;
	private registerProfileEntryAction;
	private registerNewWindowWithProfileAction;
	private registerNewWindowAction;
	private registerSwitchProfileAction;
	private registerManageProfilesAction;
	private registerExportCurrentProfileAction;
	private registerCreateFromCurrentProfileAction;
	private registerNewProfileAction;
	private registerDeleteProfileAction;
	private registerHelpAction;
	private reportWorkspaceProfileInfo;
}
