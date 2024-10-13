import { Disposable } from "../../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IHostService } from "../../../services/host/browser/host.js";

export declare class WorkspaceWatcher extends Disposable {
	private readonly fileService;
	private readonly configurationService;
	private readonly contextService;
	private readonly notificationService;
	private readonly openerService;
	private readonly uriIdentityService;
	private readonly hostService;
	private readonly telemetryService;
	static readonly ID = "workbench.contrib.workspaceWatcher";
	private readonly watchedWorkspaces;
	constructor(
		fileService: IFileService,
		configurationService: IConfigurationService,
		contextService: IWorkspaceContextService,
		notificationService: INotificationService,
		openerService: IOpenerService,
		uriIdentityService: IUriIdentityService,
		hostService: IHostService,
		telemetryService: ITelemetryService,
	);
	private registerListeners;
	private onDidChangeWorkspaceFolders;
	private onDidChangeWorkbenchState;
	private onDidChangeConfiguration;
	private onDidWatchError;
	private watchWorkspace;
	private unwatchWorkspace;
	private refresh;
	private unwatchWorkspaces;
	dispose(): void;
}
