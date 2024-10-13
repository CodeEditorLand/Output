import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IExtensionManagementService } from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import {
	IColorTheme,
	IThemeService,
} from "../../../../platform/theme/common/themeService.js";
import { IWorkspaceTrustManagementService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { IWorkbenchAssignmentService } from "../../../services/assignment/common/assignmentService.js";
import { IAuthenticationService } from "../../../services/authentication/common/authentication.js";
import { IWorkbenchExtensionEnablementService } from "../../../services/extensionManagement/common/extensionManagement.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IIntegrityService } from "../../../services/integrity/common/integrity.js";
import {
	IIssueFormService,
	IssueReporterData,
	IssueReporterStyles,
	IWorkbenchIssueService,
} from "../common/issue.js";

export declare class BrowserIssueService implements IWorkbenchIssueService {
	private readonly extensionService;
	private readonly productService;
	private readonly issueFormService;
	private readonly themeService;
	private readonly experimentService;
	private readonly workspaceTrustManagementService;
	private readonly integrityService;
	private readonly extensionManagementService;
	private readonly extensionEnablementService;
	private readonly authenticationService;
	private readonly configurationService;
	readonly _serviceBrand: undefined;
	constructor(
		extensionService: IExtensionService,
		productService: IProductService,
		issueFormService: IIssueFormService,
		themeService: IThemeService,
		experimentService: IWorkbenchAssignmentService,
		workspaceTrustManagementService: IWorkspaceTrustManagementService,
		integrityService: IIntegrityService,
		extensionManagementService: IExtensionManagementService,
		extensionEnablementService: IWorkbenchExtensionEnablementService,
		authenticationService: IAuthenticationService,
		configurationService: IConfigurationService,
	);
	openReporter(options: Partial<IssueReporterData>): Promise<void>;
	private getExtensionGitHubUrl;
	private getIssueUriFromStaticContent;
}
export declare function getIssueReporterStyles(
	theme: IColorTheme,
): IssueReporterStyles;
