export class AbstractLogger extends Disposable {
    constructor(...args: any[]);
    level: any;
    _onDidChangeLogLevel: any;
    get onDidChangeLogLevel(): any;
    setLevel(level: any): void;
    getLevel(): any;
    checkLogLevel(level: any): boolean;
    canLog(level: any): boolean;
}
export class AbstractLoggerService extends Disposable {
    constructor(logLevel: any, logsHome: any, loggerResources: any);
    logLevel: any;
    logsHome: any;
    _loggers: ResourceMap;
    _onDidChangeLoggers: any;
    onDidChangeLoggers: any;
    _onDidChangeLogLevel: any;
    onDidChangeLogLevel: any;
    _onDidChangeVisibility: any;
    onDidChangeVisibility: any;
    getLoggerEntry(resourceOrId: any): any;
    getLogger(resourceOrId: any): any;
    createLogger(idOrResource: any, options: any): any;
    toResource(idOrResource: any): any;
    setLogLevel(arg1: any, arg2: any): void;
    setVisibility(resourceOrId: any, visibility: any): void;
    getLogLevel(resource: any): any;
    registerLogger(resource: any): void;
    deregisterLogger(idOrResource: any): void;
    getRegisteredLoggers(): Generator<any, void, unknown>;
    getRegisteredLogger(resource: any): any;
}
export class AbstractMessageLogger extends AbstractLogger {
    constructor(logAlways: any);
    logAlways: any;
    checkLogLevel(level: any): any;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    flush(): void;
}
export class AdapterLogger extends AbstractLogger {
    constructor(adapter: any, logLevel?: any);
    adapter: any;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    extractMessage(msg: any): any;
    flush(): void;
}
export const CONTEXT_LOG_LEVEL: RawContextKey;
export class ConsoleLogger extends AbstractLogger {
    constructor(logLevel?: any, useColors?: boolean);
    useColors: boolean;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    flush(): void;
}
export class ConsoleMainLogger extends AbstractLogger {
    constructor(logLevel?: any);
    useColors: boolean;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    flush(): void;
}
export const DEFAULT_LOG_LEVEL: any;
export const ILogService: any;
export const ILoggerService: any;
export var LogLevel: any;
export function LogLevelToLocalizedString(logLevel: any): {
    original: string;
    value: any;
} | undefined;
export function LogLevelToString(logLevel: any): "error" | "off" | "info" | "debug" | "trace" | "warn" | undefined;
export class MultiplexLogger extends AbstractLogger {
    constructor(loggers: any);
    loggers: any;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    flush(): void;
}
export class NullLogService extends NullLogger {
}
export class NullLogger {
    onDidChangeLogLevel: any;
    setLevel(level: any): void;
    getLevel(): any;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    critical(message: any, ...args: any[]): void;
    dispose(): void;
    flush(): void;
}
export class NullLoggerService extends AbstractLoggerService {
    constructor();
    doCreateLogger(resource: any, logLevel: any, options: any): NullLogger;
}
export function canLog(loggerLevel: any, messageLevel: any): boolean;
export function getLogLevel(environmentService: any): any;
export function isLogLevel(thing: any): boolean;
export function log(logger: any, level: any, message: any): void;
export function parseLogLevel(logLevel: any): any;
import { Disposable } from "../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../base/common/map.js";
import { RawContextKey } from "../../contextkey/common/contextkey.js";
//# sourceMappingURL=log.d.ts.map