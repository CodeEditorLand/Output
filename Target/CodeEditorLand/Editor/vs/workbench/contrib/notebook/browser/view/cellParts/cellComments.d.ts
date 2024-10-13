import { IConfigurationService } from "../../../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { IThemeService } from "../../../../../../platform/theme/common/themeService.js";
import { ICommentService } from "../../../../comments/browser/commentService.js";
import {
	ICellViewModel,
	INotebookEditorDelegate,
} from "../../notebookBrowser.js";
import { CellContentPart } from "../cellPart.js";

export declare class CellComments extends CellContentPart {
	private readonly notebookEditor;
	private readonly container;
	private readonly contextKeyService;
	private readonly themeService;
	private readonly commentService;
	private readonly configurationService;
	private readonly instantiationService;
	private readonly _commentThreadWidgets;
	private currentElement;
	constructor(
		notebookEditor: INotebookEditorDelegate,
		container: HTMLElement,
		contextKeyService: IContextKeyService,
		themeService: IThemeService,
		commentService: ICommentService,
		configurationService: IConfigurationService,
		instantiationService: IInstantiationService,
	);
	private initialize;
	private _createCommentTheadWidget;
	private _bindListeners;
	private _updateThread;
	private _calculateCommentThreadHeight;
	private _updateHeight;
	private _getCommentThreadsForCell;
	private _applyTheme;
	didRenderCell(element: ICellViewModel): void;
	prepareLayout(): void;
	updateInternalLayoutNow(element: ICellViewModel): void;
}
