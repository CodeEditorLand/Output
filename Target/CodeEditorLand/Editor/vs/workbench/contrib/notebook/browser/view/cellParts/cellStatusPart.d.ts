import { Emitter, Event } from "../../../../../../base/common/event.js";
import { ICodeEditor } from "../../../../../../editor/browser/editorBrowser.js";
import { IConfigurationService } from "../../../../../../platform/configuration/common/configuration.js";
import { IHoverService } from "../../../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { IThemeService } from "../../../../../../platform/theme/common/themeService.js";
import { INotebookCellActionContext } from "../../controller/coreActions.js";
import {
	ICellViewModel,
	INotebookEditorDelegate,
} from "../../notebookBrowser.js";
import { CellContentPart } from "../cellPart.js";
import { IClickTarget } from "./cellWidgets.js";

export declare class CellEditorStatusBar extends CellContentPart {
	private readonly _notebookEditor;
	private readonly _cellContainer;
	private readonly _editor;
	private readonly _instantiationService;
	private readonly _themeService;
	readonly statusBarContainer: HTMLElement;
	private readonly leftItemsContainer;
	private readonly rightItemsContainer;
	private readonly itemsDisposable;
	private leftItems;
	private rightItems;
	private width;
	private currentContext;
	protected readonly _onDidClick: Emitter<IClickTarget>;
	readonly onDidClick: Event<IClickTarget>;
	private readonly hoverDelegate;
	constructor(
		_notebookEditor: INotebookEditorDelegate,
		_cellContainer: HTMLElement,
		editorPart: HTMLElement,
		_editor: ICodeEditor | undefined,
		_instantiationService: IInstantiationService,
		hoverService: IHoverService,
		configurationService: IConfigurationService,
		_themeService: IThemeService,
	);
	didRenderCell(element: ICellViewModel): void;
	updateInternalLayoutNow(element: ICellViewModel): void;
	private getMaxItemWidth;
	updateContext(context: INotebookCellActionContext): void;
	private updateActiveCell;
	private updateRenderedItems;
	dispose(): void;
}
