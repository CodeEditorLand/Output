import { Dimension } from "../../../../../base/browser/dom.js";
import { CodeWindow } from "../../../../../base/browser/window.js";
import { URI } from "../../../../../base/common/uri.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import {
	IInstantiationService,
	ServicesAccessor,
} from "../../../../../platform/instantiation/common/instantiation.js";
import { IEditorProgressService } from "../../../../../platform/progress/common/progress.js";
import { IEditorGroupsService } from "../../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { NotebookEditorInput } from "../../common/notebookEditorInput.js";
import {
	INotebookEditor,
	INotebookEditorCreationOptions,
} from "../notebookBrowser.js";
import { NotebookEditorWidget } from "../notebookEditorWidget.js";
import {
	IBorrowValue,
	INotebookEditorService,
} from "./notebookEditorService.js";

export declare class NotebookEditorWidgetService
	implements INotebookEditorService
{
	private readonly editorGroupService;
	private readonly instantiationService;
	readonly _serviceBrand: undefined;
	private _tokenPool;
	private readonly _disposables;
	private readonly _notebookEditors;
	private readonly groupListener;
	private readonly _onNotebookEditorAdd;
	private readonly _onNotebookEditorsRemove;
	readonly onDidAddNotebookEditor: import("../../../../workbench.web.main.internal.js").Event<INotebookEditor>;
	readonly onDidRemoveNotebookEditor: import("../../../../workbench.web.main.internal.js").Event<INotebookEditor>;
	private readonly _borrowableEditors;
	constructor(
		editorGroupService: IEditorGroupsService,
		editorService: IEditorService,
		contextKeyService: IContextKeyService,
		instantiationService: IInstantiationService,
	);
	dispose(): void;
	private _disposeWidget;
	private _allowWidgetMove;
	retrieveExistingWidgetFromURI(
		resource: URI,
	): IBorrowValue<NotebookEditorWidget> | undefined;
	retrieveAllExistingWidgets(): IBorrowValue<NotebookEditorWidget>[];
	retrieveWidget(
		accessor: ServicesAccessor,
		groupId: number,
		input: NotebookEditorInput,
		creationOptions?: INotebookEditorCreationOptions,
		initialDimension?: Dimension,
		codeWindow?: CodeWindow,
	): IBorrowValue<NotebookEditorWidget>;
	protected createWidget(
		editorGroupContextKeyService: IContextKeyService,
		editorGroupEditorProgressService: IEditorProgressService,
		creationOptions?: INotebookEditorCreationOptions,
		codeWindow?: CodeWindow,
		initialDimension?: Dimension,
	): NotebookEditorWidget;
	private _createBorrowValue;
	addNotebookEditor(editor: INotebookEditor): void;
	removeNotebookEditor(editor: INotebookEditor): void;
	getNotebookEditor(editorId: string): INotebookEditor | undefined;
	listNotebookEditors(): readonly INotebookEditor[];
}
