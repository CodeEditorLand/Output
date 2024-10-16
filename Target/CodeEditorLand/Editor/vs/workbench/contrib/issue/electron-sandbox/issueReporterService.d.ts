import { Disposable } from "../../../../base/common/lifecycle.js";
import {
	IIssueMainService,
	IProcessMainService,
	OldIssueReporterWindowConfiguration,
} from "../../../../platform/issue/common/issue.js";
import { INativeHostService } from "../../../../platform/native/common/native.js";

export declare class IssueReporter extends Disposable {
	private readonly configuration;
	private readonly nativeHostService;
	private readonly issueMainService;
	private readonly processMainService;
	private readonly issueReporterModel;
	private numberOfSearchResultsDisplayed;
	private receivedSystemInfo;
	private receivedPerformanceInfo;
	private shouldQueueSearch;
	private hasBeenSubmitted;
	private openReporter;
	private loadingExtensionData;
	private selectedExtension;
	private delayedSubmit;
	private readonly previewButton;
	private nonGitHubIssueUrl;
	constructor(
		configuration: OldIssueReporterWindowConfiguration,
		nativeHostService: INativeHostService,
		issueMainService: IIssueMainService,
		processMainService: IProcessMainService,
	);
	render(): void;
	setInitialFocus(): void;
	private applyStyles;
	private handleExtensionData;
	private updateIssueReporterUri;
	private sendReporterMenu;
	private setEventHandlers;
	private updatePerformanceInfo;
	private updatePreviewButtonState;
	private isPreviewEnabled;
	private getExtensionRepositoryUrl;
	private getExtensionBugsUrl;
	private searchVSCodeIssues;
	private searchIssues;
	private searchExtensionIssues;
	private searchMarketplaceIssues;
	private close;
	private clearSearchResults;
	private searchGitHub;
	private searchDuplicates;
	private displaySearchResults;
	private setUpTypes;
	private makeOption;
	private setSourceOptions;
	private renderBlocks;
	private validateInput;
	private validateInputs;
	private submitToGitHub;
	private createIssue;
	private writeToClipboard;
	private getIssueUrl;
	private parseGitHubUrl;
	private getExtensionGitHubUrl;
	private getIssueUrlWithTitle;
	private updateSystemInfo;
	private updateExtensionSelector;
	private clearExtensionData;
	private updateExtensionStatus;
	private validateSelectedExtension;
	private setLoading;
	private removeLoading;
	private setExtensionValidationMessage;
	private updateProcessInfo;
	private updateWorkspaceInfo;
	private updateExtensionTable;
	private updateRestrictedMode;
	private updateUnsupportedMode;
	private updateExperimentsInfo;
	private getExtensionTableHtml;
	private openLink;
	private getElementById;
	private addEventListener;
}
export declare function hide(el: Element | undefined | null): void;
export declare function show(el: Element | undefined | null): void;
