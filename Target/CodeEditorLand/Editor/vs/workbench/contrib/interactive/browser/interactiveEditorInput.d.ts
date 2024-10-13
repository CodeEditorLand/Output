import { URI } from "../../../../base/common/uri.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import {
	EditorInputCapabilities,
	GroupIdentifier,
	IRevertOptions,
	ISaveOptions,
	IUntypedEditorInput,
} from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IResolvedNotebookEditorModel } from "../../notebook/common/notebookCommon.js";
import {
	ICompositeNotebookEditorInput,
	NotebookEditorInput,
} from "../../notebook/common/notebookEditorInput.js";
import { INotebookService } from "../../notebook/common/notebookService.js";
import { IInteractiveDocumentService } from "./interactiveDocumentService.js";
import { IInteractiveHistoryService } from "./interactiveHistoryService.js";

export declare class InteractiveEditorInput
	extends EditorInput
	implements ICompositeNotebookEditorInput
{
	private readonly _notebookService;
	private readonly _fileDialogService;
	static create(
		instantiationService: IInstantiationService,
		resource: URI,
		inputResource: URI,
		title?: string,
		language?: string,
	): InteractiveEditorInput;
	private static windowNames;
	static setName(notebookUri: URI, title: string | undefined): void;
	static readonly ID: string;
	get editorId(): string;
	get typeId(): string;
	private name;
	private readonly isScratchpad;
	get language(): string | undefined;
	private _initLanguage?;
	private _notebookEditorInput;
	get notebookEditorInput(): NotebookEditorInput;
	get editorInputs(): NotebookEditorInput[];
	private _resource;
	get resource(): URI;
	private _inputResource;
	get inputResource(): URI;
	private _inputResolver;
	private _editorModelReference;
	private _inputModelRef;
	get primary(): EditorInput;
	private _textModelService;
	private _interactiveDocumentService;
	private _historyService;
	constructor(
		resource: URI,
		inputResource: URI,
		title: string | undefined,
		languageId: string | undefined,
		instantiationService: IInstantiationService,
		textModelService: ITextModelService,
		interactiveDocumentService: IInteractiveDocumentService,
		historyService: IInteractiveHistoryService,
		_notebookService: INotebookService,
		_fileDialogService: IFileDialogService,
		configurationService: IConfigurationService,
	);
	private _registerListeners;
	get capabilities(): EditorInputCapabilities;
	private _resolveEditorModel;
	resolve(): Promise<IResolvedNotebookEditorModel | null>;
	resolveInput(
		language?: string,
	): Promise<import("../../../../editor/common/model.js").ITextModel>;
	save(
		group: GroupIdentifier,
		options?: ISaveOptions,
	): Promise<EditorInput | IUntypedEditorInput | undefined>;
	saveAs(
		group: GroupIdentifier,
		options?: ISaveOptions,
	): Promise<IUntypedEditorInput | undefined>;
	matches(otherInput: EditorInput | IUntypedEditorInput): boolean;
	getName(): string;
	isDirty(): boolean;
	isModified(): boolean;
	revert(_group: GroupIdentifier, options?: IRevertOptions): Promise<void>;
	dispose(): void;
	get historyService(): IInteractiveHistoryService;
}
