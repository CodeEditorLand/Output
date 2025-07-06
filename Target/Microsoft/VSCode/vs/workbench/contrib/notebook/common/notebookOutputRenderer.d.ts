declare class p {
    constructor(e: any);
    id: any;
    extensionId: any;
    extensionLocation: any;
    isBuiltin: any;
    entrypoint: {
        extends: any;
        path: any;
    };
    displayName: any;
    mimeTypes: any;
    a: any;
    hardDependencies: o;
    optionalDependencies: o;
    messaging: any;
    matchesWithoutKernel(e: any): 0 | 1 | 2 | 3;
    matches(e: any, n: any): 0 | 1 | 2 | 3;
    b(e: any): any;
}
declare class x {
    constructor(e: any);
    type: any;
    entrypoint: any;
    extensionLocation: any;
    localResourceRoots: any;
}
declare class o {
    constructor(e: any);
    a: Set<any>;
    defined: boolean;
    matches(e: any): any;
}
export { p as $m$b, x as $n$b };
//# sourceMappingURL=notebookOutputRenderer.d.ts.map