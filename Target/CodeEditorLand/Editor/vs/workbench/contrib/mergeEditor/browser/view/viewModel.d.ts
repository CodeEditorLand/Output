import { Disposable } from "../../../../../base/common/lifecycle.js";
import {
	IObservable,
	ITransaction,
} from "../../../../../base/common/observable.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { INotificationService } from "../../../../../platform/notification/common/notification.js";
import { MergeEditorModel } from "../model/mergeEditorModel.js";
import {
	InputNumber,
	ModifiedBaseRange,
	ModifiedBaseRangeState,
} from "../model/modifiedBaseRange.js";
import { BaseCodeEditorView } from "./editors/baseCodeEditorView.js";
import { CodeEditorView } from "./editors/codeEditorView.js";
import { InputCodeEditorView } from "./editors/inputCodeEditorView.js";
import { ResultCodeEditorView } from "./editors/resultCodeEditorView.js";

export declare class MergeEditorViewModel extends Disposable {
	readonly model: MergeEditorModel;
	readonly inputCodeEditorView1: InputCodeEditorView;
	readonly inputCodeEditorView2: InputCodeEditorView;
	readonly resultCodeEditorView: ResultCodeEditorView;
	readonly baseCodeEditorView: IObservable<BaseCodeEditorView | undefined>;
	readonly showNonConflictingChanges: IObservable<boolean>;
	private readonly configurationService;
	private readonly notificationService;
	private readonly manuallySetActiveModifiedBaseRange;
	private readonly attachedHistory;
	constructor(
		model: MergeEditorModel,
		inputCodeEditorView1: InputCodeEditorView,
		inputCodeEditorView2: InputCodeEditorView,
		resultCodeEditorView: ResultCodeEditorView,
		baseCodeEditorView: IObservable<BaseCodeEditorView | undefined>,
		showNonConflictingChanges: IObservable<boolean>,
		configurationService: IConfigurationService,
		notificationService: INotificationService,
	);
	readonly shouldUseAppendInsteadOfAccept: IObservable<boolean, unknown>;
	private counter;
	private readonly lastFocusedEditor;
	readonly baseShowDiffAgainst: IObservable<1 | 2 | undefined, unknown>;
	readonly selectionInBase: IObservable<
		| {
				rangesInBase: Range[];
				sourceEditor: CodeEditorView;
		  }
		| undefined,
		unknown
	>;
	private getRangeOfModifiedBaseRange;
	readonly activeModifiedBaseRange: IObservable<
		ModifiedBaseRange | undefined,
		unknown
	>;
	setActiveModifiedBaseRange(
		range: ModifiedBaseRange | undefined,
		tx: ITransaction,
	): void;
	setState(
		baseRange: ModifiedBaseRange,
		state: ModifiedBaseRangeState,
		tx: ITransaction,
		inputNumber: InputNumber,
	): void;
	private goToConflict;
	goToNextModifiedBaseRange(
		predicate: (m: ModifiedBaseRange) => boolean,
	): void;
	goToPreviousModifiedBaseRange(
		predicate: (m: ModifiedBaseRange) => boolean,
	): void;
	toggleActiveConflict(inputNumber: 1 | 2): void;
	acceptAll(inputNumber: 1 | 2): void;
}
