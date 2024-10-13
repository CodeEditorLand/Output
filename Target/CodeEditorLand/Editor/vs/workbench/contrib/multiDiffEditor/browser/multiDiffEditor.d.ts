import * as DOM from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { URI } from "../../../../base/common/uri.js";
import { ICodeEditor } from "../../../../editor/browser/editorBrowser.js";
import { MultiDiffEditorViewModel } from "../../../../editor/browser/widget/multiDiffEditor/multiDiffEditorViewModel.js";
import {
	IMultiDiffEditorOptions,
	IMultiDiffEditorViewState,
} from "../../../../editor/browser/widget/multiDiffEditor/multiDiffEditorWidgetImpl.js";
import { IDiffEditor } from "../../../../editor/common/editorCommon.js";
import { ITextResourceConfigurationService } from "../../../../editor/common/services/textResourceConfiguration.js";
import { InstantiationService } from "../../../../platform/instantiation/common/instantiationService.js";
import { IEditorProgressService } from "../../../../platform/progress/common/progress.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { AbstractEditorWithViewState } from "../../../browser/parts/editor/editorWithViewState.js";
import { ICompositeControl } from "../../../common/composite.js";
import { IEditorOpenContext } from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import {
	IEditorGroup,
	IEditorGroupsService,
} from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { MultiDiffEditorInput } from "./multiDiffEditorInput.js";
import { MultiDiffEditorItem } from "./multiDiffSourceResolverService.js";

export declare class MultiDiffEditor extends AbstractEditorWithViewState<IMultiDiffEditorViewState> {
	private editorProgressService;
	static readonly ID = "multiDiffEditor";
	private _multiDiffEditorWidget;
	private _viewModel;
	get viewModel(): MultiDiffEditorViewModel | undefined;
	constructor(
		group: IEditorGroup,
		instantiationService: InstantiationService,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
		storageService: IStorageService,
		editorService: IEditorService,
		editorGroupService: IEditorGroupsService,
		textResourceConfigurationService: ITextResourceConfigurationService,
		editorProgressService: IEditorProgressService,
	);
	protected createEditor(parent: HTMLElement): void;
	setInput(
		input: MultiDiffEditorInput,
		options: IMultiDiffEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	setOptions(options: IMultiDiffEditorOptions | undefined): void;
	private _applyOptions;
	clearInput(): Promise<void>;
	layout(dimension: DOM.Dimension): void;
	getControl(): ICompositeControl | undefined;
	focus(): void;
	hasFocus(): boolean;
	protected computeEditorViewState(
		resource: URI,
	): IMultiDiffEditorViewState | undefined;
	protected tracksEditorViewState(input: EditorInput): boolean;
	protected toEditorViewStateResource(input: EditorInput): URI | undefined;
	tryGetCodeEditor(resource: URI):
		| {
				diffEditor: IDiffEditor;
				editor: ICodeEditor;
		  }
		| undefined;
	findDocumentDiffItem(resource: URI): MultiDiffEditorItem | undefined;
	showWhile(promise: Promise<unknown>): Promise<void>;
}
