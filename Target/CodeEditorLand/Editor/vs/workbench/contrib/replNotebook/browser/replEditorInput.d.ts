import { ThemeIcon } from "../../../../base/common/themables.js";
import { URI } from "../../../../base/common/uri.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { ITextResourceConfigurationService } from "../../../../editor/common/services/textResourceConfiguration.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { ICustomEditorLabelService } from "../../../services/editor/common/customEditorLabelService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IInteractiveHistoryService } from "../../interactive/browser/interactiveHistoryService.js";
import { NotebookTextModel } from "../../notebook/common/model/notebookTextModel.js";
import {
	ICompositeNotebookEditorInput,
	NotebookEditorInput,
} from "../../notebook/common/notebookEditorInput.js";
import { INotebookEditorModelResolverService } from "../../notebook/common/notebookEditorModelResolverService.js";
import { INotebookService } from "../../notebook/common/notebookService.js";

export declare class ReplEditorInput
	extends NotebookEditorInput
	implements ICompositeNotebookEditorInput
{
	readonly historyService: IInteractiveHistoryService;
	private readonly _textModelService;
	static ID: string;
	private inputModelRef;
	private isScratchpad;
	private label;
	private isDisposing;
	constructor(
		resource: URI,
		label: string | undefined,
		_notebookService: INotebookService,
		_notebookModelResolverService: INotebookEditorModelResolverService,
		_fileDialogService: IFileDialogService,
		labelService: ILabelService,
		fileService: IFileService,
		filesConfigurationService: IFilesConfigurationService,
		extensionService: IExtensionService,
		editorService: IEditorService,
		textResourceConfigurationService: ITextResourceConfigurationService,
		customEditorLabelService: ICustomEditorLabelService,
		historyService: IInteractiveHistoryService,
		_textModelService: ITextModelService,
		configurationService: IConfigurationService,
	);
	getIcon(): ThemeIcon | undefined;
	private createEditorLabel;
	get typeId(): string;
	get editorId(): string | undefined;
	getName(): string;
	get editorInputs(): this[];
	get capabilities(): number;
	resolve(): Promise<
		| import("../../notebook/common/notebookCommon.js").IResolvedNotebookEditorModel
		| null
	>;
	private ensureInputBoxCell;
	resolveInput(
		notebook: NotebookTextModel,
	): Promise<import("../../../../editor/common/model.js").ITextModel>;
	dispose(): void;
}
