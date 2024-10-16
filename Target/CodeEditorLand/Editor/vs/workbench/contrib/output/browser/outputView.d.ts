import "./output.css";

import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import {
	IViewPaneOptions,
	ViewPane,
} from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IOutputChannel } from "../../../services/output/common/output.js";

export declare class OutputViewPane extends ViewPane {
	private readonly editor;
	private channelId;
	private editorPromise;
	private readonly scrollLockContextKey;
	get scrollLock(): boolean;
	set scrollLock(scrollLock: boolean);
	constructor(
		options: IViewPaneOptions,
		keybindingService: IKeybindingService,
		contextMenuService: IContextMenuService,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		viewDescriptorService: IViewDescriptorService,
		instantiationService: IInstantiationService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
	);
	showChannel(channel: IOutputChannel, preserveFocus: boolean): void;
	focus(): void;
	protected renderBody(container: HTMLElement): void;
	protected layoutBody(height: number, width: number): void;
	private onDidChangeVisibility;
	private setInput;
	private clearInput;
	private createInput;
}
