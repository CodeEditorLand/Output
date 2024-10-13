import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { IViewletViewOptions } from "../../../browser/parts/views/viewsViewlet.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IPathService } from "../../../services/path/common/pathService.js";
import { IDebugService } from "../common/debug.js";

export declare class LoadedScriptsView extends ViewPane {
	private readonly editorService;
	private readonly contextService;
	private readonly debugService;
	private readonly labelService;
	private readonly pathService;
	private treeContainer;
	private loadedScriptsItemType;
	private tree;
	private treeLabels;
	private changeScheduler;
	private treeNeedsRefreshOnVisible;
	private filter;
	constructor(
		options: IViewletViewOptions,
		contextMenuService: IContextMenuService,
		keybindingService: IKeybindingService,
		instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		configurationService: IConfigurationService,
		editorService: IEditorService,
		contextKeyService: IContextKeyService,
		contextService: IWorkspaceContextService,
		debugService: IDebugService,
		labelService: ILabelService,
		pathService: IPathService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
	);
	protected renderBody(container: HTMLElement): void;
	protected layoutBody(height: number, width: number): void;
	collapseAll(): void;
	dispose(): void;
}
