import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IPathService } from "../../../services/path/common/pathService.js";
import { IWorkingCopyHistoryService } from "../../../services/workingCopy/common/workingCopyHistory.js";
import {
	ITimelineService,
	Timeline,
	TimelineChangeEvent,
	TimelineOptions,
	TimelineProvider,
} from "../../timeline/common/timeline.js";

export declare class LocalHistoryTimeline
	extends Disposable
	implements IWorkbenchContribution, TimelineProvider
{
	private readonly timelineService;
	private readonly workingCopyHistoryService;
	private readonly pathService;
	private readonly fileService;
	private readonly environmentService;
	private readonly configurationService;
	private readonly contextService;
	static readonly ID = "workbench.contrib.localHistoryTimeline";
	private static readonly LOCAL_HISTORY_ENABLED_SETTINGS_KEY;
	readonly id = "timeline.localHistory";
	readonly label: string;
	readonly scheme = "*";
	private readonly _onDidChange;
	readonly onDidChange: import("../../../workbench.web.main.internal.js").Event<TimelineChangeEvent>;
	private readonly timelineProviderDisposable;
	constructor(
		timelineService: ITimelineService,
		workingCopyHistoryService: IWorkingCopyHistoryService,
		pathService: IPathService,
		fileService: IFileService,
		environmentService: IWorkbenchEnvironmentService,
		configurationService: IConfigurationService,
		contextService: IWorkspaceContextService,
	);
	private registerComponents;
	private updateTimelineRegistration;
	private registerListeners;
	private onDidChangeWorkingCopyHistoryEntry;
	provideTimeline(
		uri: URI,
		options: TimelineOptions,
		token: CancellationToken,
	): Promise<Timeline>;
	private toTimelineItem;
}
