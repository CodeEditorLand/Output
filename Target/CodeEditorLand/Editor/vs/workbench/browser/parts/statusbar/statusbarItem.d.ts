import { IHoverDelegate } from "../../../../base/browser/ui/hover/hoverDelegate.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IStatusbarEntry } from "../../../services/statusbar/browser/statusbar.js";

export declare class StatusbarEntryItem extends Disposable {
	private container;
	private readonly hoverDelegate;
	private readonly commandService;
	private readonly hoverService;
	private readonly notificationService;
	private readonly telemetryService;
	private readonly themeService;
	private readonly label;
	private entry;
	private readonly foregroundListener;
	private readonly backgroundListener;
	private readonly commandMouseListener;
	private readonly commandTouchListener;
	private readonly commandKeyboardListener;
	private hover;
	readonly labelContainer: HTMLElement;
	readonly beakContainer: HTMLElement;
	get name(): string;
	get hasCommand(): boolean;
	constructor(
		container: HTMLElement,
		entry: IStatusbarEntry,
		hoverDelegate: IHoverDelegate,
		commandService: ICommandService,
		hoverService: IHoverService,
		notificationService: INotificationService,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
	);
	update(entry: IStatusbarEntry): void;
	private isEqualTooltip;
	private executeCommand;
	private applyColor;
}
