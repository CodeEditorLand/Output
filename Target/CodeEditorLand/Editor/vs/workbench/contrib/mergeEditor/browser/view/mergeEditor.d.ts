import { Dimension } from "../../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { Event } from "../../../../../base/common/event.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { IObservable } from "../../../../../base/common/observable.js";
import { URI } from "../../../../../base/common/uri.js";

import "./media/mergeEditor.css";

import { ICodeEditor } from "../../../../../editor/browser/editorBrowser.js";
import { ICodeEditorService } from "../../../../../editor/browser/services/codeEditorService.js";
import { IEditorOptions as ICodeEditorOptions } from "../../../../../editor/common/config/editorOptions.js";
import { ICodeEditorViewState } from "../../../../../editor/common/editorCommon.js";
import { ITextResourceConfigurationService } from "../../../../../editor/common/services/textResourceConfiguration.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import {
	IEditorOptions,
	ITextEditorOptions,
} from "../../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import { AbstractTextEditor } from "../../../../browser/parts/editor/textEditor.js";
import { IEditorOpenContext } from "../../../../common/editor.js";
import { EditorInput } from "../../../../common/editor/editorInput.js";
import {
	IEditorGroup,
	IEditorGroupsService,
} from "../../../../services/editor/common/editorGroupsService.js";
import { IEditorResolverService } from "../../../../services/editor/common/editorResolverService.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { MergeEditorLayoutKind } from "../../common/mergeEditor.js";
import { IMergeEditorInputModel } from "../mergeEditorInputModel.js";
import { MergeEditorModel } from "../model/mergeEditorModel.js";
import { MergeEditorViewModel } from "./viewModel.js";

import "./colors.js";

export declare class MergeEditor extends AbstractTextEditor<IMergeEditorViewState> {
	private readonly contextKeyService;
	private readonly _configurationService;
	private readonly _codeEditorService;
	private readonly configurationService;
	static readonly ID = "mergeEditor";
	private readonly _sessionDisposables;
	private readonly _viewModel;
	get viewModel(): IObservable<MergeEditorViewModel | undefined>;
	private rootHtmlElement;
	private readonly _grid;
	private readonly input1View;
	private readonly baseView;
	private readonly baseViewOptions;
	private readonly input2View;
	private readonly inputResultView;
	private readonly _layoutMode;
	private readonly _layoutModeObs;
	private readonly _ctxIsMergeEditor;
	private readonly _ctxUsesColumnLayout;
	private readonly _ctxShowBase;
	private readonly _ctxShowBaseAtTop;
	private readonly _ctxResultUri;
	private readonly _ctxBaseUri;
	private readonly _ctxShowNonConflictingChanges;
	private readonly _inputModel;
	get inputModel(): IObservable<IMergeEditorInputModel | undefined>;
	get model(): MergeEditorModel | undefined;
	private get inputsWritable();
	private readonly viewZoneComputer;
	protected readonly codeLensesVisible: IObservable<boolean, unknown>;
	private readonly scrollSynchronizer;
	constructor(
		group: IEditorGroup,
		instantiation: IInstantiationService,
		contextKeyService: IContextKeyService,
		telemetryService: ITelemetryService,
		storageService: IStorageService,
		themeService: IThemeService,
		textResourceConfigurationService: ITextResourceConfigurationService,
		_configurationService: IConfigurationService,
		editorService: IEditorService,
		editorGroupService: IEditorGroupsService,
		fileService: IFileService,
		_codeEditorService: ICodeEditorService,
		configurationService: IConfigurationService,
	);
	dispose(): void;
	private readonly _onDidChangeSizeConstraints;
	readonly onDidChangeSizeConstraints: Event<void>;
	get minimumWidth(): number;
	getTitle(): string;
	protected createEditorControl(
		parent: HTMLElement,
		initialOptions: ICodeEditorOptions,
	): void;
	protected updateEditorControlOptions(options: ICodeEditorOptions): void;
	private applyOptions;
	protected getMainControl(): ICodeEditor | undefined;
	layout(dimension: Dimension): void;
	setInput(
		input: EditorInput,
		options: IEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	private setViewZones;
	setOptions(options: ITextEditorOptions | undefined): void;
	clearInput(): void;
	focus(): void;
	hasFocus(): boolean;
	protected setEditorVisible(visible: boolean): void;
	getControl(): ICodeEditor | undefined;
	get scopedContextKeyService(): IContextKeyService | undefined;
	toggleBase(): void;
	toggleShowBaseTop(): void;
	toggleShowBaseCenter(): void;
	setLayoutKind(kind: MergeEditorLayoutKind): void;
	setLayout(newLayout: IMergeEditorLayout): void;
	private readonly baseViewDisposables;
	private applyLayout;
	private setGrid;
	private _applyViewState;
	protected computeEditorViewState(
		resource: URI,
	): IMergeEditorViewState | undefined;
	protected tracksEditorViewState(input: EditorInput): boolean;
	private readonly showNonConflictingChangesStore;
	private readonly showNonConflictingChanges;
	toggleShowNonConflictingChanges(): void;
}
export interface IMergeEditorLayout {
	readonly kind: MergeEditorLayoutKind;
	readonly showBase: boolean;
	readonly showBaseAtTop: boolean;
}
export declare class MergeEditorOpenHandlerContribution extends Disposable {
	private readonly _editorService;
	constructor(
		_editorService: IEditorService,
		codeEditorService: ICodeEditorService,
	);
	private openCodeEditorFromMergeEditor;
}
export declare class MergeEditorResolverContribution extends Disposable {
	static readonly ID = "workbench.contrib.mergeEditorResolver";
	constructor(
		editorResolverService: IEditorResolverService,
		instantiationService: IInstantiationService,
	);
}
type IMergeEditorViewState = ICodeEditorViewState & {
	readonly input1State?: ICodeEditorViewState;
	readonly input2State?: ICodeEditorViewState;
	readonly focusIndex: number;
};
export {};
