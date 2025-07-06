declare function w(o: any, t: any, e: any, h: any): {
    start: {
        x: any;
        y: any;
    };
    end: {
        x: number;
        y: any;
    };
};
declare function k(o: any, t: any): {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
};
declare function M(o: any, t: any, e: any, h: any): string;
declare function $(o: any, t: any, e: any, h: any): {
    start: {
        x: number;
        y: any;
    } | undefined;
    end: {
        x: number;
        y: any;
    };
}[];
declare function v(o: any, t: any, e: any, h: any, l: any): any[] | undefined;
declare function A(o: any): {
    resolve(...e: any[]): string;
    normalize(e: any): any;
    isAbsolute(e: any): boolean;
    join(...e: any[]): any;
    relative(e: any, t: any): any;
    toNamespacedPath(e: any): any;
    dirname(e: any): any;
    basename(e: any, t: any): any;
    extname(e: any): any;
    format: (t?: any) => any;
    parse(e: any): {
        root: string;
        dir: string;
        base: string;
        ext: string;
        name: string;
    };
    sep: string;
    delimiter: string;
    win32: null;
    posix: null;
};
export { w as $utc, k as $vtc, M as $wtc, $ as $xtc, v as $ytc, A as $ztc };
//# sourceMappingURL=terminalLinkHelpers.d.ts.map