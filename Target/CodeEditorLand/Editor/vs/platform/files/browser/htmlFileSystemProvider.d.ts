import { IndexedDB } from "../../../base/browser/indexedDB.js";
import { CancellationToken } from "../../../base/common/cancellation.js";
import { Event } from "../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import { ReadableStreamEvents } from "../../../base/common/stream.js";
import { URI } from "../../../base/common/uri.js";
import { ILogService } from "../../log/common/log.js";
import {
	FileSystemProviderCapabilities,
	FileType,
	IFileChange,
	IFileDeleteOptions,
	IFileOverwriteOptions,
	IFileReadStreamOptions,
	IFileSystemProviderWithFileReadStreamCapability,
	IFileSystemProviderWithFileReadWriteCapability,
	IFileWriteOptions,
	IStat,
	IWatchOptions,
} from "../common/files.js";

export declare class HTMLFileSystemProvider
	extends Disposable
	implements
		IFileSystemProviderWithFileReadWriteCapability,
		IFileSystemProviderWithFileReadStreamCapability
{
	private indexedDB;
	private readonly store;
	private logService;
	readonly onDidChangeCapabilities: Event<any>;
	private extUri;
	private _capabilities;
	get capabilities(): FileSystemProviderCapabilities;
	constructor(
		indexedDB: IndexedDB | undefined,
		store: string,
		logService: ILogService,
	);
	stat(resource: URI): Promise<IStat>;
	readdir(resource: URI): Promise<[string, FileType][]>;
	readFileStream(
		resource: URI,
		opts: IFileReadStreamOptions,
		token: CancellationToken,
	): ReadableStreamEvents<Uint8Array>;
	readFile(resource: URI): Promise<Uint8Array>;
	writeFile(
		resource: URI,
		content: Uint8Array,
		opts: IFileWriteOptions,
	): Promise<void>;
	mkdir(resource: URI): Promise<void>;
	delete(resource: URI, opts: IFileDeleteOptions): Promise<void>;
	rename(from: URI, to: URI, opts: IFileOverwriteOptions): Promise<void>;
	private readonly _onDidChangeFileEmitter;
	readonly onDidChangeFile: Event<readonly IFileChange[]>;
	watch(resource: URI, opts: IWatchOptions): IDisposable;
	private doWatch;
	private readonly _files;
	private readonly _directories;
	registerFileHandle(handle: FileSystemFileHandle): Promise<URI>;
	registerDirectoryHandle(handle: FileSystemDirectoryHandle): Promise<URI>;
	get directories(): Iterable<FileSystemDirectoryHandle>;
	private registerHandle;
	getHandle(resource: URI): Promise<FileSystemHandle | undefined>;
	private getFileHandle;
	private getDirectoryHandle;
	private doGetHandle;
	private toFileSystemProviderError;
	private createFileSystemProviderError;
}
