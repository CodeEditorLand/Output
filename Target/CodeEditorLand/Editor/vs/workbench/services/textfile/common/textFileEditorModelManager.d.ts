import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import {
	IProgress,
	IProgressStep,
} from "../../../../platform/progress/common/progress.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	IStoredFileWorkingCopySaveParticipantContext,
	IWorkingCopyFileService,
} from "../../workingCopy/common/workingCopyFileService.js";
import { TextFileEditorModel } from "./textFileEditorModel.js";
import {
	ITextFileEditorModel,
	ITextFileEditorModelManager,
	ITextFileEditorModelResolveOrCreateOptions,
	ITextFileResolveEvent,
	ITextFileSaveEvent,
	ITextFileSaveParticipant,
} from "./textfiles.js";

export declare class TextFileEditorModelManager
	extends Disposable
	implements ITextFileEditorModelManager
{
	private readonly instantiationService;
	private readonly fileService;
	private readonly notificationService;
	private readonly workingCopyFileService;
	private readonly uriIdentityService;
	private readonly _onDidCreate;
	readonly onDidCreate: Event<TextFileEditorModel>;
	private readonly _onDidResolve;
	readonly onDidResolve: Event<ITextFileResolveEvent>;
	private readonly _onDidRemove;
	readonly onDidRemove: Event<URI>;
	private readonly _onDidChangeDirty;
	readonly onDidChangeDirty: Event<TextFileEditorModel>;
	private readonly _onDidChangeReadonly;
	readonly onDidChangeReadonly: Event<TextFileEditorModel>;
	private readonly _onDidChangeOrphaned;
	readonly onDidChangeOrphaned: Event<TextFileEditorModel>;
	private readonly _onDidSaveError;
	readonly onDidSaveError: Event<TextFileEditorModel>;
	private readonly _onDidSave;
	readonly onDidSave: Event<ITextFileSaveEvent>;
	private readonly _onDidRevert;
	readonly onDidRevert: Event<TextFileEditorModel>;
	private readonly _onDidChangeEncoding;
	readonly onDidChangeEncoding: Event<TextFileEditorModel>;
	private readonly mapResourceToModel;
	private readonly mapResourceToModelListeners;
	private readonly mapResourceToDisposeListener;
	private readonly mapResourceToPendingModelResolvers;
	private readonly modelResolveQueue;
	saveErrorHandler: {
		onSaveError(error: Error, model: ITextFileEditorModel): void;
	};
	get models(): TextFileEditorModel[];
	constructor(
		instantiationService: IInstantiationService,
		fileService: IFileService,
		notificationService: INotificationService,
		workingCopyFileService: IWorkingCopyFileService,
		uriIdentityService: IUriIdentityService,
	);
	private registerListeners;
	private onDidFilesChange;
	private onDidChangeFileSystemProviderCapabilities;
	private onDidChangeFileSystemProviderRegistrations;
	private queueModelReloads;
	private queueModelReload;
	private readonly mapCorrelationIdToModelsToRestore;
	private onWillRunWorkingCopyFileOperation;
	private onDidFailWorkingCopyFileOperation;
	private onDidRunWorkingCopyFileOperation;
	get(resource: URI): TextFileEditorModel | undefined;
	private has;
	private reload;
	resolve(
		resource: URI,
		options?: ITextFileEditorModelResolveOrCreateOptions,
	): Promise<TextFileEditorModel>;
	private doResolve;
	private joinPendingResolves;
	private doJoinPendingResolves;
	private registerModel;
	add(resource: URI, model: TextFileEditorModel): void;
	remove(resource: URI): void;
	private readonly saveParticipants;
	addSaveParticipant(participant: ITextFileSaveParticipant): IDisposable;
	runSaveParticipants(
		model: ITextFileEditorModel,
		context: IStoredFileWorkingCopySaveParticipantContext,
		progress: IProgress<IProgressStep>,
		token: CancellationToken,
	): Promise<void>;
	canDispose(model: TextFileEditorModel): true | Promise<true>;
	private doCanDispose;
	dispose(): void;
}
