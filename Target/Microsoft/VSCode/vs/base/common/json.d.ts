declare function G(n: any, p?: any[], e?: any): undefined;
declare function P(n: any, p: any): any;
declare function H(n: any): any;
declare function Q(n: any): any;
declare function J(n: any, p: any, e?: boolean): boolean;
declare function X(n: any, p: any, e?: boolean): any;
declare function _(n: any, p: any, e?: any): boolean;
declare function D(n: any): "number" | "string" | "boolean" | "object" | "null" | "array";
declare function R(n: any, p?: boolean): {
    setPosition: (t: any) => void;
    getPosition: () => number;
    scan: () => number;
    getToken: () => number;
    getTokenValue: () => string;
    getTokenOffset: () => number;
    getTokenLength: () => number;
    getTokenError: () => number;
};
declare function Y(n: any, p: any): {
    path: any[];
    previousNode: undefined;
    isAtPropertyKey: boolean;
    matches: (l: any) => boolean;
};
declare function Z(n: any, p?: any[], e?: any): any;
declare var $: any;
declare var r: any;
declare var V: any;
declare var F: any;
export { G as $1u, P as $2u, H as $3u, Q as $4u, J as $5u, X as $6u, _ as $7u, D as $8u, R as $Xu, Y as $Yu, Z as $Zu, $ as ParseErrorCode, r as ParseOptions, V as ScanError, F as SyntaxKind };
//# sourceMappingURL=json.d.ts.map