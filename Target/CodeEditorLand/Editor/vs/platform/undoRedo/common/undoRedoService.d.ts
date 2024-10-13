import { IDisposable } from "../../../base/common/lifecycle.js";
import { URI } from "../../../base/common/uri.js";
import { IDialogService } from "../../dialogs/common/dialogs.js";
import { INotificationService } from "../../notification/common/notification.js";
import {
	IPastFutureElements,
	IUndoRedoElement,
	IUndoRedoService,
	ResourceEditStackSnapshot,
	UndoRedoGroup,
	UndoRedoSource,
	UriComparisonKeyComputer,
} from "./undoRedo.js";

export declare class UndoRedoService implements IUndoRedoService {
	private readonly _dialogService;
	private readonly _notificationService;
	readonly _serviceBrand: undefined;
	private readonly _editStacks;
	private readonly _uriComparisonKeyComputers;
	constructor(
		_dialogService: IDialogService,
		_notificationService: INotificationService,
	);
	registerUriComparisonKeyComputer(
		scheme: string,
		uriComparisonKeyComputer: UriComparisonKeyComputer,
	): IDisposable;
	getUriComparisonKey(resource: URI): string;
	private _print;
	pushElement(
		element: IUndoRedoElement,
		group?: UndoRedoGroup,
		source?: UndoRedoSource,
	): void;
	private _pushElement;
	getLastElement(resource: URI): IUndoRedoElement | null;
	private _splitPastWorkspaceElement;
	private _splitFutureWorkspaceElement;
	removeElements(resource: URI | string): void;
	setElementsValidFlag(
		resource: URI,
		isValid: boolean,
		filter: (element: IUndoRedoElement) => boolean,
	): void;
	hasElements(resource: URI): boolean;
	createSnapshot(resource: URI): ResourceEditStackSnapshot;
	restoreSnapshot(snapshot: ResourceEditStackSnapshot): void;
	getElements(resource: URI): IPastFutureElements;
	private _findClosestUndoElementWithSource;
	canUndo(resourceOrSource: URI | UndoRedoSource): boolean;
	private _onError;
	private _acquireLocks;
	private _safeInvokeWithLocks;
	private _invokeWorkspacePrepare;
	private _invokeResourcePrepare;
	private _getAffectedEditStacks;
	private _tryToSplitAndUndo;
	private _checkWorkspaceUndo;
	private _workspaceUndo;
	private _isPartOfUndoGroup;
	private _confirmAndExecuteWorkspaceUndo;
	private _resourceUndo;
	private _findClosestUndoElementInGroup;
	private _continueUndoInGroup;
	undo(resourceOrSource: URI | UndoRedoSource): Promise<void> | void;
	private _undo;
	private _confirmAndContinueUndo;
	private _findClosestRedoElementWithSource;
	canRedo(resourceOrSource: URI | UndoRedoSource): boolean;
	private _tryToSplitAndRedo;
	private _checkWorkspaceRedo;
	private _workspaceRedo;
	private _executeWorkspaceRedo;
	private _resourceRedo;
	private _findClosestRedoElementInGroup;
	private _continueRedoInGroup;
	redo(resourceOrSource: URI | UndoRedoSource | string): Promise<void> | void;
	private _redo;
}
