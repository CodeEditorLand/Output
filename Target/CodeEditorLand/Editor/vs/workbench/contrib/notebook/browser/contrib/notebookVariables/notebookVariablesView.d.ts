import { ILocalizedString } from "../../../../../../platform/action/common/action.js";
import { IMenuService } from "../../../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../../../platform/opener/common/opener.js";
import { IQuickInputService } from "../../../../../../platform/quickinput/common/quickInput.js";
import { ITelemetryService } from "../../../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../../../platform/theme/common/themeService.js";
import {
	IViewPaneOptions,
	ViewPane,
} from "../../../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../../../common/views.js";
import { IEditorService } from "../../../../../services/editor/common/editorService.js";
import { INotebookExecutionStateService } from "../../../common/notebookExecutionStateService.js";
import { INotebookKernelService } from "../../../common/notebookKernelService.js";

export type contextMenuArg = {
	source: string;
	name: string;
	type?: string;
	value?: string;
	expression?: string;
	language?: string;
	extensionId?: string;
};
export declare class NotebookVariablesView extends ViewPane {
	private readonly editorService;
	private readonly notebookKernelService;
	private readonly notebookExecutionStateService;
	protected quickInputService: IQuickInputService;
	protected commandService: ICommandService;
	private readonly menuService;
	static readonly ID = "notebookVariablesView";
	static readonly NOTEBOOK_TITLE: ILocalizedString;
	static readonly REPL_TITLE: ILocalizedString;
	private tree;
	private activeNotebook;
	private readonly dataSource;
	private updateScheduler;
	constructor(
		options: IViewPaneOptions,
		editorService: IEditorService,
		notebookKernelService: INotebookKernelService,
		notebookExecutionStateService: INotebookExecutionStateService,
		keybindingService: IKeybindingService,
		contextMenuService: IContextMenuService,
		contextKeyService: IContextKeyService,
		configurationService: IConfigurationService,
		instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		openerService: IOpenerService,
		quickInputService: IQuickInputService,
		commandService: ICommandService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		menuService: IMenuService,
	);
	protected renderBody(container: HTMLElement): void;
	private onContextMenu;
	protected layoutBody(height: number, width: number): void;
	private setActiveNotebook;
	private getActiveNotebook;
	private handleCloseEditor;
	private handleActiveEditorChange;
	private handleExecutionStateChange;
	private handleVariablesChanged;
}
