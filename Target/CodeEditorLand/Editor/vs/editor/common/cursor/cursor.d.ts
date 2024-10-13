import { Disposable } from "../../../base/common/lifecycle.js";
import { Position } from "../core/position.js";
import { Range } from "../core/range.js";
import { ISelection, Selection } from "../core/selection.js";
import {
	CursorConfiguration,
	CursorState,
	EditOperationType,
	IColumnSelectData,
	ICursorSimpleModel,
	PartialCursorState,
} from "../cursorCommon.js";
import { CursorChangeReason } from "../cursorEvents.js";
import * as editorCommon from "../editorCommon.js";
import {
	ICursorStateComputer,
	IIdentifiedSingleEditOperation,
	ITextModel,
} from "../model.js";
import {
	InternalModelContentChangeEvent,
	ModelInjectedTextChangedEvent,
} from "../textModelEvents.js";
import { VerticalRevealType } from "../viewEvents.js";
import { ICoordinatesConverter } from "../viewModel.js";
import { ViewModelEventsCollector } from "../viewModelEventDispatcher.js";
import { CursorContext } from "./cursorContext.js";

export declare class CursorsController extends Disposable {
	private readonly _model;
	private _knownModelVersionId;
	private readonly _viewModel;
	private readonly _coordinatesConverter;
	context: CursorContext;
	private _cursors;
	private _hasFocus;
	private _isHandling;
	private _compositionState;
	private _columnSelectData;
	private _autoClosedActions;
	private _prevEditOperationType;
	constructor(
		model: ITextModel,
		viewModel: ICursorSimpleModel,
		coordinatesConverter: ICoordinatesConverter,
		cursorConfig: CursorConfiguration,
	);
	dispose(): void;
	updateConfiguration(cursorConfig: CursorConfiguration): void;
	onLineMappingChanged(eventsCollector: ViewModelEventsCollector): void;
	setHasFocus(hasFocus: boolean): void;
	private _validateAutoClosedActions;
	getPrimaryCursorState(): CursorState;
	getLastAddedCursorIndex(): number;
	getCursorStates(): CursorState[];
	setStates(
		eventsCollector: ViewModelEventsCollector,
		source: string | null | undefined,
		reason: CursorChangeReason,
		states: PartialCursorState[] | null,
	): boolean;
	setCursorColumnSelectData(columnSelectData: IColumnSelectData): void;
	revealAll(
		eventsCollector: ViewModelEventsCollector,
		source: string | null | undefined,
		minimalReveal: boolean,
		verticalType: VerticalRevealType,
		revealHorizontal: boolean,
		scrollType: editorCommon.ScrollType,
	): void;
	revealPrimary(
		eventsCollector: ViewModelEventsCollector,
		source: string | null | undefined,
		minimalReveal: boolean,
		verticalType: VerticalRevealType,
		revealHorizontal: boolean,
		scrollType: editorCommon.ScrollType,
	): void;
	saveState(): editorCommon.ICursorState[];
	restoreState(
		eventsCollector: ViewModelEventsCollector,
		states: editorCommon.ICursorState[],
	): void;
	onModelContentChanged(
		eventsCollector: ViewModelEventsCollector,
		event: InternalModelContentChangeEvent | ModelInjectedTextChangedEvent,
	): void;
	getSelection(): Selection;
	getTopMostViewPosition(): Position;
	getBottomMostViewPosition(): Position;
	getCursorColumnSelectData(): IColumnSelectData;
	getSelections(): Selection[];
	getPosition(): Position;
	setSelections(
		eventsCollector: ViewModelEventsCollector,
		source: string | null | undefined,
		selections: readonly ISelection[],
		reason: CursorChangeReason,
	): void;
	getPrevEditOperationType(): EditOperationType;
	setPrevEditOperationType(type: EditOperationType): void;
	private _pushAutoClosedAction;
	private _executeEditOperation;
	private _interpretCommandResult;
	private _emitStateChangedIfNecessary;
	private _findAutoClosingPairs;
	executeEdits(
		eventsCollector: ViewModelEventsCollector,
		source: string | null | undefined,
		edits: IIdentifiedSingleEditOperation[],
		cursorStateComputer: ICursorStateComputer,
	): void;
	private _executeEdit;
	getAutoClosedCharacters(): Range[];
	startComposition(eventsCollector: ViewModelEventsCollector): void;
	endComposition(
		eventsCollector: ViewModelEventsCollector,
		source?: string | null | undefined,
	): void;
	type(
		eventsCollector: ViewModelEventsCollector,
		text: string,
		source?: string | null | undefined,
	): void;
	compositionType(
		eventsCollector: ViewModelEventsCollector,
		text: string,
		replacePrevCharCnt: number,
		replaceNextCharCnt: number,
		positionDelta: number,
		source?: string | null | undefined,
	): void;
	paste(
		eventsCollector: ViewModelEventsCollector,
		text: string,
		pasteOnNewLine: boolean,
		multicursorText?: string[] | null | undefined,
		source?: string | null | undefined,
	): void;
	cut(
		eventsCollector: ViewModelEventsCollector,
		source?: string | null | undefined,
	): void;
	executeCommand(
		eventsCollector: ViewModelEventsCollector,
		command: editorCommon.ICommand,
		source?: string | null | undefined,
	): void;
	executeCommands(
		eventsCollector: ViewModelEventsCollector,
		commands: editorCommon.ICommand[],
		source?: string | null | undefined,
	): void;
}
export declare class CommandExecutor {
	static executeCommands(
		model: ITextModel,
		selectionsBefore: Selection[],
		commands: (editorCommon.ICommand | null)[],
	): Selection[] | null;
	private static _innerExecuteCommands;
	private static _arrayIsEmpty;
	private static _getEditOperations;
	private static _getEditOperationsFromCommand;
	private static _getLoserCursorMap;
}
