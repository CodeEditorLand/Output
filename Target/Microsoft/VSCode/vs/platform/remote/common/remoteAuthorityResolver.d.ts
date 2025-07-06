declare const u: any;
declare class p {
    constructor(t: any);
    id: any;
    type: number;
    toString(): string;
}
declare class v {
    constructor(t: any, s: any);
    host: any;
    port: any;
    type: number;
    toString(): string;
}
declare class n extends r {
    static isNotAvailable(t: any): boolean;
    static isTemporarilyNotAvailable(t: any): boolean;
    static isNoResolverFound(t: any): boolean;
    static isInvalidAuthority(t: any): boolean;
    static isHandled(t: any): boolean;
    constructor(t: any, s: any, a: any);
    _message: any;
    _code: any;
    _detail: any;
    isHandled: boolean;
}
declare function h(i: any): any;
declare var o: any;
declare var e: any;
import { $Ab as r } from "../../../base/common/errors.js";
export { u as $hB, p as $iB, v as $jB, n as $kB, h as $lB, o as RemoteAuthorityResolverErrorCode, e as RemoteConnectionType };
//# sourceMappingURL=remoteAuthorityResolver.d.ts.map