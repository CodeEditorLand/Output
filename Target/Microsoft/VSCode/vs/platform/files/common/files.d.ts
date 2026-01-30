export namespace AutoSaveConfiguration {
    let OFF: string;
    let AFTER_DELAY: string;
    let ON_FOCUS_CHANGE: string;
    let ON_WINDOW_CHANGE: string;
}
export class ByteSize {
    static formatSize(size: any): any;
}
export const ETAG_DISABLED: "";
export const FILES_ASSOCIATIONS_CONFIG: "files.associations";
export const FILES_EXCLUDE_CONFIG: "files.exclude";
export const FILES_READONLY_EXCLUDE_CONFIG: "files.readonlyExclude";
export const FILES_READONLY_FROM_PERMISSIONS_CONFIG: "files.readonlyFromPermissions";
export const FILES_READONLY_INCLUDE_CONFIG: "files.readonlyInclude";
export var FileChangeFilter: any;
export var FileChangeType: any;
export class FileChangesEvent {
    constructor(changes: any, ignorePathCasing: any);
    ignorePathCasing: any;
    added: Lazy;
    updated: Lazy;
    deleted: Lazy;
    rawAdded: any[];
    rawUpdated: any[];
    rawDeleted: any[];
    correlationId: any;
    /**
     * Find out if the file change events match the provided resource.
     *
     * Note: when passing `FileChangeType.DELETED`, we consider a match
     * also when the parent of the resource got deleted.
     */
    contains(resource: any, ...types: any[]): boolean;
    /**
     * Find out if the file change events either match the provided
     * resource, or contain a child of this resource.
     */
    affects(resource: any, ...types: any[]): boolean;
    doContains(resource: any, options: any, ...types: any[]): boolean;
    /**
     * Returns if this event contains added files.
     */
    gotAdded(): boolean;
    /**
     * Returns if this event contains deleted files.
     */
    gotDeleted(): boolean;
    /**
     * Returns if this event contains updated files.
     */
    gotUpdated(): boolean;
    /**
     * Returns if this event contains changes that correlate to the
     * provided `correlationId`.
     *
     * File change event correlation is an advanced watch feature that
     * allows to  identify from which watch request the events originate
     * from. This correlation allows to route events specifically
     * only to the requestor and not emit them to all listeners.
     */
    correlates(correlationId: any): boolean;
    /**
     * Figure out if the event contains changes that correlate to one
     * correlation identifier.
     *
     * File change event correlation is an advanced watch feature that
     * allows to  identify from which watch request the events originate
     * from. This correlation allows to route events specifically
     * only to the requestor and not emit them to all listeners.
     */
    hasCorrelation(): boolean;
}
export var FileKind: any;
export var FileOperation: any;
export class FileOperationError extends Error {
    constructor(message: any, fileOperationResult: any, options: any);
    fileOperationResult: any;
    options: any;
}
export class FileOperationEvent {
    constructor(resource: any, operation: any, target: any);
    resource: any;
    operation: any;
    target: any;
    isOperation(operation: any): boolean;
}
export var FileOperationResult: any;
export var FilePermission: any;
export var FileSystemProviderCapabilities: any;
export class FileSystemProviderError extends Error {
    static create(error: any, code: any): FileSystemProviderError;
    constructor(message: any, code: any);
    code: any;
}
export var FileSystemProviderErrorCode: any;
export var FileType: any;
export namespace HotExitConfiguration {
    let OFF_1: string;
    export { OFF_1 as OFF };
    export let ON_EXIT: string;
    export let ON_EXIT_AND_WINDOW_CLOSE: string;
}
export const IFileService: any;
export class NotModifiedSinceFileOperationError extends FileOperationError {
    stat: any;
}
export class TooLargeFileOperationError extends FileOperationError {
    constructor(message: any, fileOperationResult: any, size: any, options: any);
    size: any;
}
export function createFileSystemProviderError(error: any, code: any): FileSystemProviderError;
export function ensureFileSystemProviderError(error: any): any;
export function etag(stat: any): any;
export function getLargeFileConfirmationLimit(arg: any): number;
export function hasFileAppendCapability(provider: any): boolean;
export function hasFileAtomicDeleteCapability(provider: any): boolean;
export function hasFileAtomicReadCapability(provider: any): boolean;
export function hasFileAtomicWriteCapability(provider: any): boolean;
export function hasFileCloneCapability(provider: any): boolean;
export function hasFileFolderCopyCapability(provider: any): boolean;
export function hasFileReadStreamCapability(provider: any): boolean;
export function hasFileRealpathCapability(provider: any): boolean;
export function hasOpenReadWriteCloseCapability(provider: any): boolean;
export function hasReadWriteCapability(provider: any): boolean;
export function hasReadonlyCapability(provider: any): boolean;
export function isFileOpenForWriteOptions(options: any): boolean;
export function isFileSystemWatcher(thing: any): boolean;
export function isParent(path: any, candidate: any, ignoreCase: any): boolean;
export function markAsFileSystemProviderError(error: any, code: any): any;
export function toFileOperationResult(error: any): any;
export function toFileSystemProviderErrorCode(error: any): any;
export function whenProviderRegistered(file: any, fileService: any): Promise<any>;
import { Lazy } from "../../../base/common/lazy.js";
//# sourceMappingURL=files.d.ts.map