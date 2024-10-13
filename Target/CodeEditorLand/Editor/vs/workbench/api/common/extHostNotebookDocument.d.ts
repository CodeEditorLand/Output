import * as vscode from "vscode";

import { URI } from "../../../base/common/uri.js";
import * as notebookCommon from "../../contrib/notebook/common/notebookCommon.js";
import * as extHostProtocol from "./extHost.protocol.js";
import { ExtHostDocuments } from "./extHostDocuments.js";
import { ExtHostDocumentsAndEditors } from "./extHostDocumentsAndEditors.js";

export declare class ExtHostCell {
	readonly notebook: ExtHostNotebookDocument;
	private readonly _extHostDocument;
	private readonly _cellData;
	static asModelAddData(
		cell: extHostProtocol.NotebookCellDto,
	): extHostProtocol.IModelAddedData;
	private _outputs;
	private _metadata;
	private _previousResult;
	private _internalMetadata;
	readonly handle: number;
	readonly uri: URI;
	readonly cellKind: notebookCommon.CellKind;
	private _apiCell;
	private _mime;
	constructor(
		notebook: ExtHostNotebookDocument,
		_extHostDocument: ExtHostDocumentsAndEditors,
		_cellData: extHostProtocol.NotebookCellDto,
	);
	get internalMetadata(): notebookCommon.NotebookCellInternalMetadata;
	get apiCell(): vscode.NotebookCell;
	setOutputs(newOutputs: extHostProtocol.NotebookOutputDto[]): void;
	setOutputItems(
		outputId: string,
		append: boolean,
		newOutputItems: extHostProtocol.NotebookOutputItemDto[],
	): void;
	setMetadata(newMetadata: notebookCommon.NotebookCellMetadata): void;
	setInternalMetadata(
		newInternalMetadata: notebookCommon.NotebookCellInternalMetadata,
	): void;
	setMime(newMime: string | undefined): void;
}
export declare class ExtHostNotebookDocument {
	private readonly _proxy;
	private readonly _textDocumentsAndEditors;
	private readonly _textDocuments;
	readonly uri: URI;
	private static _handlePool;
	readonly handle: number;
	private readonly _cells;
	private readonly _notebookType;
	private _notebook;
	private _metadata;
	private _versionId;
	private _isDirty;
	private _disposed;
	constructor(
		_proxy: extHostProtocol.MainThreadNotebookDocumentsShape,
		_textDocumentsAndEditors: ExtHostDocumentsAndEditors,
		_textDocuments: ExtHostDocuments,
		uri: URI,
		data: extHostProtocol.INotebookModelAddedData,
	);
	dispose(): void;
	get versionId(): number;
	get apiNotebook(): vscode.NotebookDocument;
	acceptDocumentPropertiesChanged(
		data: extHostProtocol.INotebookDocumentPropertiesChangeData,
	): void;
	acceptDirty(isDirty: boolean): void;
	acceptModelChanged(
		event: extHostProtocol.NotebookCellsChangedEventDto,
		isDirty: boolean,
		newMetadata: notebookCommon.NotebookDocumentMetadata | undefined,
	): vscode.NotebookDocumentChangeEvent;
	private _validateIndex;
	private _validateRange;
	private _getCells;
	private _save;
	private _spliceNotebookCells;
	private _moveCells;
	private _setCellOutputs;
	private _setCellOutputItems;
	private _changeCellLanguage;
	private _changeCellMime;
	private _changeCellMetadata;
	private _changeCellInternalMetadata;
	getCellFromApiCell(apiCell: vscode.NotebookCell): ExtHostCell | undefined;
	getCellFromIndex(index: number): ExtHostCell | undefined;
	getCell(cellHandle: number): ExtHostCell | undefined;
	getCellIndex(cell: ExtHostCell): number;
}
