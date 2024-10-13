import { ActionBar } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { IHighlight } from "../../../../base/browser/ui/highlightedlabel/highlightedLabel.js";
import { ITreeNode } from "../../../../base/browser/ui/tree/tree.js";
import { FuzzyScore } from "../../../../base/common/filters.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import {
	IContextMenuService,
	IContextViewService,
} from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { IViewletViewOptions } from "../../../browser/parts/views/viewsViewlet.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IDebugService, IExpression } from "../common/debug.js";
import {
	AbstractExpressionsRenderer,
	IExpressionTemplateData,
	IInputBoxOptions,
} from "./baseDebugView.js";
import { DebugExpressionRenderer } from "./debugExpressionRenderer.js";

export declare class WatchExpressionsView extends ViewPane {
	private readonly debugService;
	private watchExpressionsUpdatedScheduler;
	private needsRefresh;
	private tree;
	private watchExpressionsExist;
	private watchItemType;
	private variableReadonly;
	private menu;
	private expressionRenderer;
	constructor(
		options: IViewletViewOptions,
		contextMenuService: IContextMenuService,
		debugService: IDebugService,
		keybindingService: IKeybindingService,
		instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		menuService: IMenuService,
	);
	protected renderBody(container: HTMLElement): void;
	protected layoutBody(height: number, width: number): void;
	focus(): void;
	collapseAll(): void;
	private onMouseDblClick;
	private onContextMenu;
}
export declare class WatchExpressionsRenderer extends AbstractExpressionsRenderer {
	private readonly expressionRenderer;
	private readonly menuService;
	private readonly contextKeyService;
	private configurationService;
	static readonly ID = "watchexpression";
	constructor(
		expressionRenderer: DebugExpressionRenderer,
		menuService: IMenuService,
		contextKeyService: IContextKeyService,
		debugService: IDebugService,
		contextViewService: IContextViewService,
		hoverService: IHoverService,
		configurationService: IConfigurationService,
	);
	get templateId(): string;
	renderElement(
		node: ITreeNode<IExpression, FuzzyScore>,
		index: number,
		data: IExpressionTemplateData,
	): void;
	protected renderExpression(
		expression: IExpression,
		data: IExpressionTemplateData,
		highlights: IHighlight[],
	): void;
	protected getInputBoxOptions(
		expression: IExpression,
		settingValue: boolean,
	): IInputBoxOptions;
	protected renderActionBar(
		actionBar: ActionBar,
		expression: IExpression,
	): void;
}
export declare const ADD_WATCH_ID =
	"workbench.debug.viewlet.action.addWatchExpression";
export declare const ADD_WATCH_LABEL: string;
export declare const REMOVE_WATCH_EXPRESSIONS_COMMAND_ID =
	"workbench.debug.viewlet.action.removeAllWatchExpressions";
export declare const REMOVE_WATCH_EXPRESSIONS_LABEL: string;
