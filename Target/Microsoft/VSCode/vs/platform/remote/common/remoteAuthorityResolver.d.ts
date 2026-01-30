export const IRemoteAuthorityResolverService: any;
export class ManagedRemoteConnection {
    constructor(id: any);
    id: any;
    type: number;
    toString(): string;
}
export class RemoteAuthorityResolverError extends ErrorNoTelemetry {
    static isNotAvailable(err: any): boolean;
    static isTemporarilyNotAvailable(err: any): boolean;
    static isNoResolverFound(err: any): boolean;
    static isInvalidAuthority(err: any): boolean;
    static isHandled(err: any): boolean;
    constructor(message: any, code: any, detail: any);
    _message: any;
    _code: any;
    _detail: any;
    isHandled: boolean;
}
export var RemoteAuthorityResolverErrorCode: any;
export var RemoteConnectionType: any;
export class WebSocketRemoteConnection {
    constructor(host: any, port: any);
    host: any;
    port: any;
    type: number;
    toString(): string;
}
export function getRemoteAuthorityPrefix(remoteAuthority: any): any;
import { ErrorNoTelemetry } from "../../../base/common/errors.js";
//# sourceMappingURL=remoteAuthorityResolver.d.ts.map