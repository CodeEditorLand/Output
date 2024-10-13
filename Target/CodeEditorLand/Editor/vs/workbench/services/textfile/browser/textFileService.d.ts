import {
	VSBuffer,
	VSBufferReadable,
	VSBufferReadableStream,
} from "../../../../base/common/buffer.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ReadableStream } from "../../../../base/common/stream.js";
import { URI } from "../../../../base/common/uri.js";
import { ICodeEditorService } from "../../../../editor/browser/services/codeEditorService.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ITextSnapshot } from "../../../../editor/common/model.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { ITextResourceConfigurationService } from "../../../../editor/common/services/textResourceConfiguration.js";
import {
	IDialogService,
	IFileDialogService,
} from "../../../../platform/dialogs/common/dialogs.js";
import {
	ICreateFileOptions,
	IFileService,
	IFileStatWithMetadata,
} from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IRevertOptions } from "../../../common/editor.js";
import { IDecorationsService } from "../../decorations/common/decorations.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";
import { IElevatedFileService } from "../../files/common/elevatedFileService.js";
import { IFilesConfigurationService } from "../../filesConfiguration/common/filesConfigurationService.js";
import { ILifecycleService } from "../../lifecycle/common/lifecycle.js";
import { IPathService } from "../../path/common/pathService.js";
import {
	IUntitledTextEditorModelManager,
	IUntitledTextEditorService,
} from "../../untitled/common/untitledTextEditorService.js";
import {
	IFileOperationUndoRedoInfo,
	IWorkingCopyFileService,
} from "../../workingCopy/common/workingCopyFileService.js";
import {
	IReadTextFileEncodingOptions,
	IReadTextFileOptions,
	IResourceEncoding,
	IResourceEncodings,
	ITextFileContent,
	ITextFileEditorModelManager,
	ITextFileSaveAsOptions,
	ITextFileSaveOptions,
	ITextFileService,
	ITextFileStreamContent,
	IWriteTextFileOptions,
} from "../common/textfiles.js";

export declare abstract class AbstractTextFileService
	extends Disposable
	implements ITextFileService
{
	protected readonly fileService: IFileService;
	private untitledTextEditorService;
	protected readonly lifecycleService: ILifecycleService;
	protected readonly instantiationService: IInstantiationService;
	private readonly modelService;
	protected readonly environmentService: IWorkbenchEnvironmentService;
	private readonly dialogService;
	private readonly fileDialogService;
	protected readonly textResourceConfigurationService: ITextResourceConfigurationService;
	protected readonly filesConfigurationService: IFilesConfigurationService;
	private readonly codeEditorService;
	private readonly pathService;
	private readonly workingCopyFileService;
	private readonly uriIdentityService;
	private readonly languageService;
	protected readonly logService: ILogService;
	private readonly elevatedFileService;
	private readonly decorationsService;
	readonly _serviceBrand: undefined;
	private static readonly TEXTFILE_SAVE_CREATE_SOURCE;
	private static readonly TEXTFILE_SAVE_REPLACE_SOURCE;
	readonly files: ITextFileEditorModelManager;
	readonly untitled: IUntitledTextEditorModelManager;
	constructor(
		fileService: IFileService,
		untitledTextEditorService: IUntitledTextEditorService,
		lifecycleService: ILifecycleService,
		instantiationService: IInstantiationService,
		modelService: IModelService,
		environmentService: IWorkbenchEnvironmentService,
		dialogService: IDialogService,
		fileDialogService: IFileDialogService,
		textResourceConfigurationService: ITextResourceConfigurationService,
		filesConfigurationService: IFilesConfigurationService,
		codeEditorService: ICodeEditorService,
		pathService: IPathService,
		workingCopyFileService: IWorkingCopyFileService,
		uriIdentityService: IUriIdentityService,
		languageService: ILanguageService,
		logService: ILogService,
		elevatedFileService: IElevatedFileService,
		decorationsService: IDecorationsService,
	);
	private provideDecorations;
	private _encoding;
	get encoding(): EncodingOracle;
	read(
		resource: URI,
		options?: IReadTextFileOptions,
	): Promise<ITextFileContent>;
	readStream(
		resource: URI,
		options?: IReadTextFileOptions,
	): Promise<ITextFileStreamContent>;
	private doRead;
	create(
		operations: {
			resource: URI;
			value?: string | ITextSnapshot;
			options?: ICreateFileOptions;
		}[],
		undoInfo?: IFileOperationUndoRedoInfo,
	): Promise<readonly IFileStatWithMetadata[]>;
	write(
		resource: URI,
		value: string | ITextSnapshot,
		options?: IWriteTextFileOptions,
	): Promise<IFileStatWithMetadata>;
	getEncodedReadable(
		resource: URI,
		value: ITextSnapshot,
	): Promise<VSBufferReadable>;
	getEncodedReadable(resource: URI, value: string): Promise<VSBuffer>;
	getEncodedReadable(
		resource: URI,
		value?: ITextSnapshot,
	): Promise<VSBufferReadable | undefined>;
	getEncodedReadable(
		resource: URI,
		value?: string,
	): Promise<VSBuffer | undefined>;
	getEncodedReadable(
		resource: URI,
		value?: string | ITextSnapshot,
	): Promise<VSBuffer | VSBufferReadable | undefined>;
	getEncodedReadable(
		resource: URI,
		value: string | ITextSnapshot,
		options?: IWriteTextFileOptions,
	): Promise<VSBuffer | VSBufferReadable>;
	getDecodedStream(
		resource: URI,
		value: VSBufferReadableStream,
		options?: IReadTextFileEncodingOptions,
	): Promise<ReadableStream<string>>;
	private doGetDecodedStream;
	save(
		resource: URI,
		options?: ITextFileSaveOptions,
	): Promise<URI | undefined>;
	saveAs(
		source: URI,
		target?: URI,
		options?: ITextFileSaveAsOptions,
	): Promise<URI | undefined>;
	private doSaveAs;
	private doSaveAsTextFile;
	private confirmOverwrite;
	private confirmMakeWriteable;
	private suggestSavePath;
	suggestFilename(languageId: string, untitledName: string): string;
	revert(resource: URI, options?: IRevertOptions): Promise<void>;
	isDirty(resource: URI): boolean;
}
export interface IEncodingOverride {
	parent?: URI;
	extension?: string;
	encoding: string;
}
export declare class EncodingOracle
	extends Disposable
	implements IResourceEncodings
{
	private textResourceConfigurationService;
	private environmentService;
	private contextService;
	private readonly uriIdentityService;
	private _encodingOverrides;
	protected get encodingOverrides(): IEncodingOverride[];
	protected set encodingOverrides(value: IEncodingOverride[]);
	constructor(
		textResourceConfigurationService: ITextResourceConfigurationService,
		environmentService: IWorkbenchEnvironmentService,
		contextService: IWorkspaceContextService,
		uriIdentityService: IUriIdentityService,
	);
	private registerListeners;
	private getDefaultEncodingOverrides;
	getWriteEncoding(
		resource: URI,
		options?: IWriteTextFileOptions,
	): Promise<{
		encoding: string;
		addBOM: boolean;
	}>;
	getPreferredWriteEncoding(
		resource: URI,
		preferredEncoding?: string,
	): Promise<IResourceEncoding>;
	getPreferredReadEncoding(
		resource: URI,
		options?: IReadTextFileEncodingOptions,
		detectedEncoding?: string,
	): Promise<IResourceEncoding>;
	private getEncodingForResource;
	private getEncodingOverride;
}
