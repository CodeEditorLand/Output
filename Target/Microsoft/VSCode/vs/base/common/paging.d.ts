declare function u(i: any): {
    firstPage: any;
    total: any;
    pageSize: any;
    getPage: (e: any, s: any) => Promise<any>;
};
declare class f {
    constructor(e: any);
    get length(): any;
    b: {
        isResolved: boolean;
        promise: null;
        cts: null;
        promiseIndexes: Set<any>;
        elements: any;
    }[];
    a: any;
    isResolved(e: any): boolean;
    get(e: any): any;
    resolve(e: any, s: any): any;
}
declare class P {
    constructor(e: any, s?: number);
    get length(): any;
    a: any;
    b: number;
    isResolved(e: any): any;
    get(e: any): any;
    resolve(e: any, s: any): Promise<any>;
}
declare function v(i: any, e: any): {
    firstPage: any;
    total: any;
    pageSize: any;
    getPage: (s: any, o: any) => any;
};
export { u as $Iy, f as $Jy, P as $Ky, v as $Ly };
//# sourceMappingURL=paging.d.ts.map