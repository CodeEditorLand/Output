export class BugIndicatingError extends Error {
    constructor(message: any);
}
export class CancellationError extends Error {
    constructor();
}
export class ErrorHandler {
    listeners: any[];
    unexpectedErrorHandler: (e: any) => void;
    addListener(listener: any): () => void;
    emit(e: any): void;
    _removeListener(listener: any): void;
    setUnexpectedErrorHandler(newUnexpectedErrorHandler: any): void;
    getUnexpectedErrorHandler(): (e: any) => void;
    onUnexpectedError(e: any): void;
    onUnexpectedExternalError(e: any): void;
}
export class ErrorNoTelemetry extends Error {
    static fromError(err: any): ErrorNoTelemetry;
    static isErrorNoTelemetry(err: any): boolean;
    constructor(msg: any);
}
export class ExpectedError extends Error {
    constructor(...args: any[]);
    isExpected: boolean;
}
export class NotImplementedError extends Error {
    constructor(message: any);
    message: any;
}
export class NotSupportedError extends Error {
    constructor(message: any);
    message: any;
}
export class PendingMigrationError extends Error {
    static is(error: any): boolean;
    constructor(message: any);
    name: string | undefined;
}
export class ReadonlyError extends TypeError {
    constructor(name: any);
}
export function canceled(): Error;
export const canceledName: "Canceled";
export const errorHandler: ErrorHandler;
export function getErrorMessage(err: any): any;
export function illegalArgument(name: any): Error;
export function illegalState(name: any): Error;
export function isCancellationError(error: any): boolean;
export function isSigPipeError(e: any): boolean;
export function onBugIndicatingError(e: any): undefined;
export function onUnexpectedError(e: any): undefined;
export function onUnexpectedExternalError(e: any): undefined;
export function setUnexpectedErrorHandler(newUnexpectedErrorHandler: any): void;
export function transformErrorForSerialization(error: any): any;
export function transformErrorFromSerialization(data: any): Error;
//# sourceMappingURL=errors.d.ts.map