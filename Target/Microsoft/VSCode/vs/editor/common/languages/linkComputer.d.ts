declare class d {
    static a(n: any, t: any, r: any, i: any, s: any): {
        range: {
            startLineNumber: any;
            startColumn: any;
            endLineNumber: any;
            endColumn: number;
        };
        url: any;
    };
    static computeLinks(n: any, t?: any): {
        range: {
            startLineNumber: any;
            startColumn: any;
            endLineNumber: any;
            endColumn: number;
        };
        url: any;
    }[];
}
declare function R(e: any): {
    range: {
        startLineNumber: any;
        startColumn: any;
        endLineNumber: any;
        endColumn: number;
    };
    url: any;
}[];
declare class w {
    constructor(n: any);
    a: F;
    b: number;
    nextState(n: any, t: any): number | undefined;
}
declare var H: any;
declare class F {
    constructor(n: any, t: any, r: any);
    a: Uint8Array<ArrayBuffer>;
    rows: any;
    cols: any;
    get(n: any, t: any): number | undefined;
    set(n: any, t: any, r: any): void;
}
export { d as $1eb, R as $2eb, w as $Zeb, H as State };
//# sourceMappingURL=linkComputer.d.ts.map