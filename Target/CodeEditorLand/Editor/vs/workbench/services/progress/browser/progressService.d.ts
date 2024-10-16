import "./media/progressService.css";

import { Disposable } from "../../../../base/common/lifecycle.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILayoutService } from "../../../../platform/layout/browser/layoutService.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import {
	IProgress,
	IProgressOptions,
	IProgressService,
	IProgressStep,
} from "../../../../platform/progress/common/progress.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IActivityService } from "../../activity/common/activity.js";
import { IPaneCompositePartService } from "../../panecomposite/browser/panecomposite.js";
import { IStatusbarService } from "../../statusbar/browser/statusbar.js";
import { IUserActivityService } from "../../userActivity/common/userActivityService.js";
import { IViewsService } from "../../views/common/viewsService.js";

export declare class ProgressService
	extends Disposable
	implements IProgressService
{
	private readonly activityService;
	private readonly paneCompositeService;
	private readonly viewDescriptorService;
	private readonly viewsService;
	private readonly notificationService;
	private readonly statusbarService;
	private readonly layoutService;
	private readonly keybindingService;
	private readonly userActivityService;
	readonly _serviceBrand: undefined;
	constructor(
		activityService: IActivityService,
		paneCompositeService: IPaneCompositePartService,
		viewDescriptorService: IViewDescriptorService,
		viewsService: IViewsService,
		notificationService: INotificationService,
		statusbarService: IStatusbarService,
		layoutService: ILayoutService,
		keybindingService: IKeybindingService,
		userActivityService: IUserActivityService,
	);
	withProgress<R = unknown>(
		options: IProgressOptions,
		originalTask: (progress: IProgress<IProgressStep>) => Promise<R>,
		onDidCancel?: (choice?: number) => void,
	): Promise<R>;
	private readonly windowProgressStack;
	private windowProgressStatusEntry;
	private withWindowProgress;
	private updateWindowProgress;
	private withNotificationProgress;
	private withPaneCompositeProgress;
	private withViewProgress;
	private showOnActivityBar;
	private withCompositeProgress;
	private withDialogProgress;
}
