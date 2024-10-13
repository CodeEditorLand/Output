import type * as vscode from "vscode";

import { VSBuffer } from "../../../base/common/buffer.js";
import { IDisposable } from "../../../base/common/lifecycle.js";
import { UriComponents } from "../../../base/common/uri.js";
import { IExtensionDescription } from "../../../platform/extensions/common/extensions.js";
import * as files from "../../../platform/files/common/files.js";
import { ExtHostFileSystemShape, IMainContext } from "./extHost.protocol.js";
import { ExtHostLanguageFeatures } from "./extHostLanguageFeatures.js";

export declare class ExtHostFileSystem implements ExtHostFileSystemShape {
	private _extHostLanguageFeatures;
	private readonly _proxy;
	private readonly _linkProvider;
	private readonly _fsProvider;
	private readonly _registeredSchemes;
	private readonly _watches;
	private _linkProviderRegistration?;
	private _handlePool;
	constructor(
		mainContext: IMainContext,
		_extHostLanguageFeatures: ExtHostLanguageFeatures,
	);
	dispose(): void;
	registerFileSystemProvider(
		extension: IExtensionDescription,
		scheme: string,
		provider: vscode.FileSystemProvider,
		options?: {
			isCaseSensitive?: boolean;
			isReadonly?: boolean | vscode.MarkdownString;
		},
	): IDisposable;
	private static _validateFileSystemProvider;
	private static _asIStat;
	$stat(handle: number, resource: UriComponents): Promise<files.IStat>;
	$readdir(
		handle: number,
		resource: UriComponents,
	): Promise<[string, files.FileType][]>;
	$readFile(handle: number, resource: UriComponents): Promise<VSBuffer>;
	$writeFile(
		handle: number,
		resource: UriComponents,
		content: VSBuffer,
		opts: files.IFileWriteOptions,
	): Promise<void>;
	$delete(
		handle: number,
		resource: UriComponents,
		opts: files.IFileDeleteOptions,
	): Promise<void>;
	$rename(
		handle: number,
		oldUri: UriComponents,
		newUri: UriComponents,
		opts: files.IFileOverwriteOptions,
	): Promise<void>;
	$copy(
		handle: number,
		oldUri: UriComponents,
		newUri: UriComponents,
		opts: files.IFileOverwriteOptions,
	): Promise<void>;
	$mkdir(handle: number, resource: UriComponents): Promise<void>;
	$watch(
		handle: number,
		session: number,
		resource: UriComponents,
		opts: files.IWatchOptions,
	): void;
	$unwatch(_handle: number, session: number): void;
	$open(
		handle: number,
		resource: UriComponents,
		opts: files.IFileOpenOptions,
	): Promise<number>;
	$close(handle: number, fd: number): Promise<void>;
	$read(
		handle: number,
		fd: number,
		pos: number,
		length: number,
	): Promise<VSBuffer>;
	$write(
		handle: number,
		fd: number,
		pos: number,
		data: VSBuffer,
	): Promise<number>;
	private _getFsProvider;
}
