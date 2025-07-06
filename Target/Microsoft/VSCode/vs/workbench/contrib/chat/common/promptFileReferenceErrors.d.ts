declare class n extends p {
    constructor(t: any, e: any, r: any);
    uri: any;
}
declare class h extends n {
    constructor(t: any, e: any, r?: string);
    originalError: any;
    errorType: string;
}
declare class g extends h {
    constructor(t: any, e: any);
}
declare class d extends n {
    constructor(t: any, e: any);
    recursivePath: any;
    errorType: string;
    get message(): string;
    getRecursivePathString(t: any, e?: string): any;
    a: any;
}
declare class f extends n {
    constructor(t: any, e?: string);
    errorType: string;
}
declare class m extends f {
}
declare class p extends Error {
    constructor(t: any, e: any);
    sameTypeAs(t: any): boolean;
    equal(t: any): boolean;
}
export { n as $UR, h as $VR, g as $WR, d as $XR, f as $YR, m as $ZR };
//# sourceMappingURL=promptFileReferenceErrors.d.ts.map