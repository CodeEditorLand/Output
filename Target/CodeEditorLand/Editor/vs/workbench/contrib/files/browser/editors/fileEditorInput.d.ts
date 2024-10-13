import { IMarkdownString } from "../../../../../base/common/htmlContent.js";
import { URI } from "../../../../../base/common/uri.js";
import { ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { ITextResourceConfigurationService } from "../../../../../editor/common/services/textResourceConfiguration.js";
import { ITextResourceEditorInput } from "../../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import {
	EditorInputCapabilities,
	GroupIdentifier,
	IEditorDescriptor,
	IEditorPane,
	IFileEditorInput,
	IFileEditorInputOptions,
	IMoveResult,
	IUntypedEditorInput,
	Verbosity,
} from "../../../../common/editor.js";
import { BinaryEditorModel } from "../../../../common/editor/binaryEditorModel.js";
import {
	EditorInput,
	IUntypedEditorOptions,
} from "../../../../common/editor/editorInput.js";
import { AbstractTextResourceEditorInput } from "../../../../common/editor/textResourceEditorInput.js";
import { ICustomEditorLabelService } from "../../../../services/editor/common/customEditorLabelService.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { IFilesConfigurationService } from "../../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IPathService } from "../../../../services/path/common/pathService.js";
import {
	EncodingMode,
	ITextFileEditorModel,
	ITextFileService,
} from "../../../../services/textfile/common/textfiles.js";

/**
 * A file editor input is the input type for the file editor of file system resources.
 */
export declare class FileEditorInput
	extends AbstractTextResourceEditorInput
	implements IFileEditorInput
{
	private readonly instantiationService;
	private readonly textModelService;
	private readonly pathService;
	get typeId(): string;
	get editorId(): string | undefined;
	get capabilities(): EditorInputCapabilities;
	private preferredName;
	private preferredDescription;
	private preferredEncoding;
	private preferredLanguageId;
	private preferredContents;
	private forceOpenAs;
	private model;
	private cachedTextFileModelReference;
	private readonly modelListeners;
	constructor(
		resource: URI,
		preferredResource: URI | undefined,
		preferredName: string | undefined,
		preferredDescription: string | undefined,
		preferredEncoding: string | undefined,
		preferredLanguageId: string | undefined,
		preferredContents: string | undefined,
		instantiationService: IInstantiationService,
		textFileService: ITextFileService,
		textModelService: ITextModelService,
		labelService: ILabelService,
		fileService: IFileService,
		filesConfigurationService: IFilesConfigurationService,
		editorService: IEditorService,
		pathService: IPathService,
		textResourceConfigurationService: ITextResourceConfigurationService,
		customEditorLabelService: ICustomEditorLabelService,
	);
	private onDidCreateTextFileModel;
	private registerModelListeners;
	getName(): string;
	setPreferredName(name: string): void;
	private allowLabelOverride;
	getPreferredName(): string | undefined;
	isReadonly(): boolean | IMarkdownString;
	getDescription(verbosity?: Verbosity): string | undefined;
	setPreferredDescription(description: string): void;
	getPreferredDescription(): string | undefined;
	getTitle(verbosity?: Verbosity): string;
	protected getPreferredTitle(): string | undefined;
	getEncoding(): string | undefined;
	getPreferredEncoding(): string | undefined;
	setEncoding(encoding: string, mode: EncodingMode): Promise<void>;
	setPreferredEncoding(encoding: string): void;
	getLanguageId(): string | undefined;
	getPreferredLanguageId(): string | undefined;
	setLanguageId(languageId: string, source?: string): void;
	setPreferredLanguageId(languageId: string): void;
	setPreferredContents(contents: string): void;
	setForceOpenAsText(): void;
	setForceOpenAsBinary(): void;
	isDirty(): boolean;
	isSaving(): boolean;
	prefersEditorPane<T extends IEditorDescriptor<IEditorPane>>(
		editorPanes: T[],
	): T | undefined;
	resolve(
		options?: IFileEditorInputOptions,
	): Promise<ITextFileEditorModel | BinaryEditorModel>;
	private doResolveAsText;
	private doResolveAsBinary;
	isResolved(): boolean;
	rename(group: GroupIdentifier, target: URI): Promise<IMoveResult>;
	toUntyped(options?: IUntypedEditorOptions): ITextResourceEditorInput;
	matches(otherInput: EditorInput | IUntypedEditorInput): boolean;
	dispose(): void;
	private disposeModelReference;
}
