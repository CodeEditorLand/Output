import {
	VSBuffer,
	VSBufferReadable,
	VSBufferReadableStream,
} from "../../../base/common/buffer.js";
import { CancellationToken } from "../../../base/common/cancellation.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import { URI } from "../../../base/common/uri.js";
import { ILogService } from "../../log/common/log.js";
import {
	FileChangesEvent,
	FileOperationEvent,
	FileSystemProviderCapabilities,
	ICreateFileOptions,
	IFileContent,
	IFileDeleteOptions,
	IFileService,
	IFileStat,
	IFileStatResult,
	IFileStatResultWithMetadata,
	IFileStatWithMetadata,
	IFileStatWithPartialMetadata,
	IFileStreamContent,
	IFileSystemProvider,
	IFileSystemProviderActivationEvent,
	IFileSystemProviderCapabilitiesChangeEvent,
	IFileSystemProviderRegistrationEvent,
	IFileSystemWatcher,
	IReadFileOptions,
	IReadFileStreamOptions,
	IResolveFileOptions,
	IResolveMetadataFileOptions,
	IWatchOptionsWithCorrelation,
	IWatchOptionsWithoutCorrelation,
	IWriteFileOptions,
} from "./files.js";

export declare class FileService extends Disposable implements IFileService {
	private readonly logService;
	readonly _serviceBrand: undefined;
	private readonly BUFFER_SIZE;
	constructor(logService: ILogService);
	private readonly _onDidChangeFileSystemProviderRegistrations;
	readonly onDidChangeFileSystemProviderRegistrations: import("../../../workbench/workbench.web.main.internal.js").Event<IFileSystemProviderRegistrationEvent>;
	private readonly _onWillActivateFileSystemProvider;
	readonly onWillActivateFileSystemProvider: import("../../../workbench/workbench.web.main.internal.js").Event<IFileSystemProviderActivationEvent>;
	private readonly _onDidChangeFileSystemProviderCapabilities;
	readonly onDidChangeFileSystemProviderCapabilities: import("../../../workbench/workbench.web.main.internal.js").Event<IFileSystemProviderCapabilitiesChangeEvent>;
	private readonly provider;
	registerProvider(
		scheme: string,
		provider: IFileSystemProvider,
	): IDisposable;
	getProvider(scheme: string): IFileSystemProvider | undefined;
	activateProvider(scheme: string): Promise<void>;
	canHandleResource(resource: URI): Promise<boolean>;
	hasProvider(resource: URI): boolean;
	hasCapability(
		resource: URI,
		capability: FileSystemProviderCapabilities,
	): boolean;
	listCapabilities(): Iterable<{
		scheme: string;
		capabilities: FileSystemProviderCapabilities;
	}>;
	protected withProvider(resource: URI): Promise<IFileSystemProvider>;
	private withReadProvider;
	private withWriteProvider;
	private readonly _onDidRunOperation;
	readonly onDidRunOperation: import("../../../workbench/workbench.web.main.internal.js").Event<FileOperationEvent>;
	resolve(
		resource: URI,
		options: IResolveMetadataFileOptions,
	): Promise<IFileStatWithMetadata>;
	resolve(resource: URI, options?: IResolveFileOptions): Promise<IFileStat>;
	private doResolveFile;
	private toFileStat;
	resolveAll(
		toResolve: {
			resource: URI;
			options?: IResolveFileOptions;
		}[],
	): Promise<IFileStatResult[]>;
	resolveAll(
		toResolve: {
			resource: URI;
			options: IResolveMetadataFileOptions;
		}[],
	): Promise<IFileStatResultWithMetadata[]>;
	stat(resource: URI): Promise<IFileStatWithPartialMetadata>;
	exists(resource: URI): Promise<boolean>;
	canCreateFile(
		resource: URI,
		options?: ICreateFileOptions,
	): Promise<Error | true>;
	private doValidateCreateFile;
	createFile(
		resource: URI,
		bufferOrReadableOrStream?:
			| VSBuffer
			| VSBufferReadable
			| VSBufferReadableStream,
		options?: ICreateFileOptions,
	): Promise<IFileStatWithMetadata>;
	writeFile(
		resource: URI,
		bufferOrReadableOrStream:
			| VSBuffer
			| VSBufferReadable
			| VSBufferReadableStream,
		options?: IWriteFileOptions,
	): Promise<IFileStatWithMetadata>;
	private validateWriteFile;
	readFile(
		resource: URI,
		options?: IReadFileOptions,
		token?: CancellationToken,
	): Promise<IFileContent>;
	private doReadFileAtomic;
	private doReadFile;
	readFileStream(
		resource: URI,
		options?: IReadFileStreamOptions,
		token?: CancellationToken,
	): Promise<IFileStreamContent>;
	private doReadFileStream;
	private restoreReadError;
	private readFileStreamed;
	private readFileBuffered;
	private readFileUnbuffered;
	private validateReadFile;
	private validateReadFileLimits;
	canMove(
		source: URI,
		target: URI,
		overwrite?: boolean,
	): Promise<Error | true>;
	canCopy(
		source: URI,
		target: URI,
		overwrite?: boolean,
	): Promise<Error | true>;
	private doCanMoveCopy;
	move(
		source: URI,
		target: URI,
		overwrite?: boolean,
	): Promise<IFileStatWithMetadata>;
	copy(
		source: URI,
		target: URI,
		overwrite?: boolean,
	): Promise<IFileStatWithMetadata>;
	private doMoveCopy;
	private doCopyFile;
	private doCopyFolder;
	private doValidateMoveCopy;
	private getExtUri;
	private isPathCaseSensitive;
	createFolder(resource: URI): Promise<IFileStatWithMetadata>;
	private mkdirp;
	canDelete(
		resource: URI,
		options?: Partial<IFileDeleteOptions>,
	): Promise<Error | true>;
	private doValidateDelete;
	del(resource: URI, options?: Partial<IFileDeleteOptions>): Promise<void>;
	cloneFile(source: URI, target: URI): Promise<void>;
	private readonly internalOnDidFilesChange;
	private readonly _onDidUncorrelatedFilesChange;
	readonly onDidFilesChange: import("../../../workbench/workbench.web.main.internal.js").Event<FileChangesEvent>;
	private readonly _onDidWatchError;
	readonly onDidWatchError: import("../../../workbench/workbench.web.main.internal.js").Event<Error>;
	private readonly activeWatchers;
	private static WATCHER_CORRELATION_IDS;
	createWatcher(
		resource: URI,
		options: IWatchOptionsWithoutCorrelation,
	): IFileSystemWatcher;
	watch(
		resource: URI,
		options: IWatchOptionsWithCorrelation,
	): IFileSystemWatcher;
	watch(
		resource: URI,
		options?: IWatchOptionsWithoutCorrelation,
	): IDisposable;
	private doWatch;
	dispose(): void;
	private readonly writeQueue;
	private doWriteBuffered;
	private doWriteStreamBufferedQueued;
	private doWriteReadableBufferedQueued;
	private doWriteBuffer;
	private doWriteUnbuffered;
	private doWriteUnbufferedQueued;
	private doPipeBuffered;
	private doPipeBufferedQueued;
	private doPipeUnbuffered;
	private doPipeUnbufferedQueued;
	private doPipeUnbufferedToBuffered;
	private doPipeUnbufferedToBufferedQueued;
	private doPipeBufferedToUnbuffered;
	protected throwIfFileSystemIsReadonly<T extends IFileSystemProvider>(
		provider: T,
		resource: URI,
	): T;
	private throwIfFileIsReadonly;
	private resourceForError;
}
