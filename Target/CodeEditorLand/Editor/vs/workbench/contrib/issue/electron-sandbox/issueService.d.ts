import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IExtensionManagementService } from "../../../../platform/extensionManagement/common/extensionManagement.js";
import {
	IIssueMainService,
	OldIssueReporterStyles,
} from "../../../../platform/issue/common/issue.js";
import {
	IColorTheme,
	IThemeService,
} from "../../../../platform/theme/common/themeService.js";
import { IWorkspaceTrustManagementService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { IWorkbenchAssignmentService } from "../../../services/assignment/common/assignmentService.js";
import { IAuthenticationService } from "../../../services/authentication/common/authentication.js";
import { IWorkbenchExtensionEnablementService } from "../../../services/extensionManagement/common/extensionManagement.js";
import { IIntegrityService } from "../../../services/integrity/common/integrity.js";
import {
	IIssueFormService,
	IssueReporterData,
	IssueReporterStyles,
	IWorkbenchIssueService,
} from "../common/issue.js";

export declare class NativeIssueService implements IWorkbenchIssueService {
	private readonly issueMainService;
	private readonly issueFormService;
	private readonly themeService;
	private readonly extensionManagementService;
	private readonly extensionEnablementService;
	private readonly workspaceTrustManagementService;
	private readonly experimentService;
	private readonly authenticationService;
	private readonly integrityService;
	private readonly menuService;
	private readonly contextKeyService;
	private readonly configurationService;
	readonly _serviceBrand: undefined;
	private extensionIdentifierSet;
	constructor(
		issueMainService: IIssueMainService,
		issueFormService: IIssueFormService,
		themeService: IThemeService,
		extensionManagementService: IExtensionManagementService,
		extensionEnablementService: IWorkbenchExtensionEnablementService,
		workspaceTrustManagementService: IWorkspaceTrustManagementService,
		experimentService: IWorkbenchAssignmentService,
		authenticationService: IAuthenticationService,
		integrityService: IIntegrityService,
		menuService: IMenuService,
		contextKeyService: IContextKeyService,
		configurationService: IConfigurationService,
	);
	openReporter(dataOverrides?: Partial<IssueReporterData>): Promise<void>;
}
export declare function getIssueReporterStyles(
	theme: IColorTheme,
): IssueReporterStyles;
export declare function oldGetIssueReporterStyles(
	theme: IColorTheme,
): OldIssueReporterStyles;
