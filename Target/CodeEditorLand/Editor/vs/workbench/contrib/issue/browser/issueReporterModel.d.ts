import { SystemInfo } from "../../../../platform/diagnostics/common/diagnostics.js";
import { OldIssueType } from "../../../../platform/issue/common/issue.js";
import {
	ISettingSearchResult,
	IssueReporterExtensionData,
	IssueType,
} from "../common/issue.js";

export interface IssueReporterData {
	issueType: IssueType | OldIssueType;
	issueDescription?: string;
	issueTitle?: string;
	extensionData?: string;
	versionInfo?: any;
	systemInfo?: SystemInfo;
	systemInfoWeb?: string;
	processInfo?: string;
	workspaceInfo?: string;
	includeSystemInfo: boolean;
	includeWorkspaceInfo: boolean;
	includeProcessInfo: boolean;
	includeExtensions: boolean;
	includeExperiments: boolean;
	includeExtensionData: boolean;
	numberOfThemeExtesions?: number;
	allExtensions: IssueReporterExtensionData[];
	enabledNonThemeExtesions?: IssueReporterExtensionData[];
	extensionsDisabled?: boolean;
	fileOnExtension?: boolean;
	fileOnMarketplace?: boolean;
	fileOnProduct?: boolean;
	selectedExtension?: IssueReporterExtensionData;
	actualSearchResults?: ISettingSearchResult[];
	query?: string;
	filterResultCount?: number;
	experimentInfo?: string;
	restrictedMode?: boolean;
	isUnsupported?: boolean;
}
export declare class IssueReporterModel {
	private readonly _data;
	constructor(initialData?: Partial<IssueReporterData>);
	getData(): IssueReporterData;
	update(newData: Partial<IssueReporterData>): void;
	serialize(): string;
	private getRemoteOSes;
	fileOnExtension(): boolean | undefined;
	private getExtensionVersion;
	private getIssueTypeTitle;
	private getInfos;
	private getExtensionData;
	private generateSystemInfoMd;
	private generateProcessInfoMd;
	private generateWorkspaceInfoMd;
	private generateExperimentsInfoMd;
	private generateExtensionsMd;
}
