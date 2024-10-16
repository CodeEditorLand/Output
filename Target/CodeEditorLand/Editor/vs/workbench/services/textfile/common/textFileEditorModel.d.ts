import { CancellationToken } from "../../../../base/common/cancellation.js";
import { IMarkdownString } from "../../../../base/common/htmlContent.js";
import { URI } from "../../../../base/common/uri.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import {
	IFileService,
	IFileStatWithMetadata,
} from "../../../../platform/files/common/files.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IRevertOptions } from "../../../common/editor.js";
import { BaseTextEditorModel } from "../../../common/editor/textEditorModel.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { IFilesConfigurationService } from "../../filesConfiguration/common/filesConfigurationService.js";
import { ILanguageDetectionService } from "../../languageDetection/common/languageDetectionWorkerService.js";
import { IPathService } from "../../path/common/pathService.js";
import {
	IWorkingCopyBackup,
	WorkingCopyCapabilities,
} from "../../workingCopy/common/workingCopy.js";
import { IWorkingCopyBackupService } from "../../workingCopy/common/workingCopyBackup.js";
import { IWorkingCopyService } from "../../workingCopy/common/workingCopyService.js";
import {
	EncodingMode,
	IResolvedTextFileEditorModel,
	ITextFileEditorModel,
	ITextFileEditorModelSaveEvent,
	ITextFileResolveOptions,
	ITextFileSaveAsOptions,
	ITextFileService,
	TextFileEditorModelState,
	TextFileResolveReason,
} from "./textfiles.js";

/**
 * The text file editor model listens to changes to its underlying code editor model and saves these changes through the file service back to the disk.
 */
export declare class TextFileEditorModel
	extends BaseTextEditorModel
	implements ITextFileEditorModel
{
	readonly resource: URI;
	private preferredEncoding;
	private preferredLanguageId;
	private readonly fileService;
	private readonly textFileService;
	private readonly workingCopyBackupService;
	private readonly logService;
	private readonly workingCopyService;
	private readonly filesConfigurationService;
	private readonly labelService;
	private readonly pathService;
	private readonly extensionService;
	private readonly progressService;
	private static readonly TEXTFILE_SAVE_ENCODING_SOURCE;
	private readonly _onDidChangeContent;
	readonly onDidChangeContent: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidResolve;
	readonly onDidResolve: import("../../../workbench.web.main.internal.js").Event<TextFileResolveReason>;
	private readonly _onDidChangeDirty;
	readonly onDidChangeDirty: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidSaveError;
	readonly onDidSaveError: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidSave;
	readonly onDidSave: import("../../../workbench.web.main.internal.js").Event<ITextFileEditorModelSaveEvent>;
	private readonly _onDidRevert;
	readonly onDidRevert: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidChangeEncoding;
	readonly onDidChangeEncoding: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidChangeOrphaned;
	readonly onDidChangeOrphaned: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidChangeReadonly;
	readonly onDidChangeReadonly: import("../../../workbench.web.main.internal.js").Event<void>;
	readonly typeId = "";
	readonly capabilities = WorkingCopyCapabilities.None;
	readonly name: string;
	private resourceHasExtension;
	private contentEncoding;
	private versionId;
	private bufferSavedVersionId;
	private ignoreDirtyOnModelContentChange;
	private ignoreSaveFromSaveParticipants;
	private static readonly UNDO_REDO_SAVE_PARTICIPANTS_AUTO_SAVE_THROTTLE_THRESHOLD;
	private lastModelContentChangeFromUndoRedo;
	lastResolvedFileStat: IFileStatWithMetadata | undefined;
	private readonly saveSequentializer;
	private dirty;
	private inConflictMode;
	private inOrphanMode;
	private inErrorMode;
	constructor(
		resource: URI,
		preferredEncoding: string | undefined, // encoding as chosen by the user
		preferredLanguageId: string | undefined, // language id as chosen by the user
		languageService: ILanguageService,
		modelService: IModelService,
		fileService: IFileService,
		textFileService: ITextFileService,
		workingCopyBackupService: IWorkingCopyBackupService,
		logService: ILogService,
		workingCopyService: IWorkingCopyService,
		filesConfigurationService: IFilesConfigurationService,
		labelService: ILabelService,
		languageDetectionService: ILanguageDetectionService,
		accessibilityService: IAccessibilityService,
		pathService: IPathService,
		extensionService: IExtensionService,
		progressService: IProgressService,
	);
	private registerListeners;
	private onDidFilesChange;
	private setOrphaned;
	private onDidChangeFilesAssociation;
	setLanguageId(languageId: string, source?: string): void;
	backup(token: CancellationToken): Promise<IWorkingCopyBackup>;
	revert(options?: IRevertOptions): Promise<void>;
	resolve(options?: ITextFileResolveOptions): Promise<void>;
	private doResolve;
	private resolveFromBuffer;
	private resolveFromBackup;
	private doResolveFromBackup;
	private resolveFromFile;
	private resolveFromContent;
	private doCreateTextModel;
	private doUpdateTextModel;
	protected installModelListeners(model: ITextModel): void;
	private onModelContentChanged;
	protected autoDetectLanguage(): Promise<void>;
	private forceResolveFromFile;
	isDirty(): this is IResolvedTextFileEditorModel;
	isModified(): boolean;
	setDirty(dirty: boolean): void;
	private doSetDirty;
	save(options?: ITextFileSaveAsOptions): Promise<boolean>;
	private doSave;
	private doSaveSequential;
	private handleSaveSuccess;
	private handleSaveError;
	private updateSavedVersionId;
	private updateLastResolvedFileStat;
	hasState(state: TextFileEditorModelState): boolean;
	joinState(state: TextFileEditorModelState.PENDING_SAVE): Promise<void>;
	getLanguageId(this: IResolvedTextFileEditorModel): string;
	getLanguageId(): string | undefined;
	private onMaybeShouldChangeEncoding;
	private hasEncodingSetExplicitly;
	setEncoding(encoding: string, mode: EncodingMode): Promise<void>;
	private setEncodingInternal;
	updatePreferredEncoding(encoding: string | undefined): void;
	private isNewEncoding;
	getEncoding(): string | undefined;
	private trace;
	isResolved(): this is IResolvedTextFileEditorModel;
	isReadonly(): boolean | IMarkdownString;
	dispose(): void;
}
