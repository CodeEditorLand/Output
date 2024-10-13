import { CancellationToken } from "../../../base/common/cancellation.js";
import { Event } from "../../../base/common/event.js";
import { ReadableStreamEvents } from "../../../base/common/stream.js";
import { URI } from "../../../base/common/uri.js";
import { ILogService } from "../../log/common/log.js";
import {
	AbstractDiskFileSystemProvider,
	IDiskFileSystemProviderOptions,
} from "../common/diskFileSystemProvider.js";
import {
	FileSystemProviderCapabilities,
	FileType,
	IFileAtomicReadOptions,
	IFileChange,
	IFileDeleteOptions,
	IFileOpenOptions,
	IFileOverwriteOptions,
	IFileReadStreamOptions,
	IFileSystemProviderWithFileAtomicDeleteCapability,
	IFileSystemProviderWithFileAtomicReadCapability,
	IFileSystemProviderWithFileAtomicWriteCapability,
	IFileSystemProviderWithFileCloneCapability,
	IFileSystemProviderWithFileFolderCopyCapability,
	IFileSystemProviderWithFileReadStreamCapability,
	IFileSystemProviderWithFileReadWriteCapability,
	IFileSystemProviderWithOpenReadWriteCloseCapability,
	IFileWriteOptions,
	IStat,
} from "../common/files.js";
import {
	AbstractNonRecursiveWatcherClient,
	AbstractUniversalWatcherClient,
	ILogMessage,
} from "../common/watcher.js";

export declare class DiskFileSystemProvider
	extends AbstractDiskFileSystemProvider
	implements
		IFileSystemProviderWithFileReadWriteCapability,
		IFileSystemProviderWithOpenReadWriteCloseCapability,
		IFileSystemProviderWithFileReadStreamCapability,
		IFileSystemProviderWithFileFolderCopyCapability,
		IFileSystemProviderWithFileAtomicReadCapability,
		IFileSystemProviderWithFileAtomicWriteCapability,
		IFileSystemProviderWithFileAtomicDeleteCapability,
		IFileSystemProviderWithFileCloneCapability
{
	private static TRACE_LOG_RESOURCE_LOCKS;
	constructor(
		logService: ILogService,
		options?: IDiskFileSystemProviderOptions,
	);
	readonly onDidChangeCapabilities: Event<any>;
	private _capabilities;
	get capabilities(): FileSystemProviderCapabilities;
	stat(resource: URI): Promise<IStat>;
	private statIgnoreError;
	readdir(resource: URI): Promise<[string, FileType][]>;
	private toType;
	private readonly resourceLocks;
	private createResourceLock;
	readFile(
		resource: URI,
		options?: IFileAtomicReadOptions,
	): Promise<Uint8Array>;
	private traceLock;
	readFileStream(
		resource: URI,
		opts: IFileReadStreamOptions,
		token: CancellationToken,
	): ReadableStreamEvents<Uint8Array>;
	writeFile(
		resource: URI,
		content: Uint8Array,
		opts: IFileWriteOptions,
	): Promise<void>;
	private canWriteFileAtomic;
	private doWriteFileAtomic;
	private doWriteFile;
	private readonly mapHandleToPos;
	private readonly mapHandleToLock;
	private readonly writeHandles;
	private static canFlush;
	static configureFlushOnWrite(enabled: boolean): void;
	open(
		resource: URI,
		opts: IFileOpenOptions,
		disableWriteLock?: boolean,
	): Promise<number>;
	close(fd: number): Promise<void>;
	read(
		fd: number,
		pos: number,
		data: Uint8Array,
		offset: number,
		length: number,
	): Promise<number>;
	private normalizePos;
	private updatePos;
	write(
		fd: number,
		pos: number,
		data: Uint8Array,
		offset: number,
		length: number,
	): Promise<number>;
	private doWrite;
	mkdir(resource: URI): Promise<void>;
	delete(resource: URI, opts: IFileDeleteOptions): Promise<void>;
	rename(from: URI, to: URI, opts: IFileOverwriteOptions): Promise<void>;
	copy(from: URI, to: URI, opts: IFileOverwriteOptions): Promise<void>;
	private validateMoveCopy;
	cloneFile(from: URI, to: URI): Promise<void>;
	private doCloneFile;
	protected createUniversalWatcher(
		onChange: (changes: IFileChange[]) => void,
		onLogMessage: (msg: ILogMessage) => void,
		verboseLogging: boolean,
	): AbstractUniversalWatcherClient;
	protected createNonRecursiveWatcher(
		onChange: (changes: IFileChange[]) => void,
		onLogMessage: (msg: ILogMessage) => void,
		verboseLogging: boolean,
	): AbstractNonRecursiveWatcherClient;
	private toFileSystemProviderError;
	private toFileSystemProviderWriteError;
}
