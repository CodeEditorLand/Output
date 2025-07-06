declare function j(t: any): any;
declare function v(t: any): any;
declare function P(t: any): {
    row: any;
    col: any;
    rowEnd: any;
    colEnd: any;
    suffix: {
        index: any;
        text: any;
    };
}[];
declare function S(t: any): {
    row: any;
    col: any;
    rowEnd: any;
    colEnd: any;
    suffix: {
        index: any;
        text: any;
    };
} | null;
declare function b(t: any): {
    row: any;
    col: any;
    rowEnd: any;
    colEnd: any;
    suffix: {
        index: any;
        text: any;
    };
} | null;
declare function y(t: any, e: any): {
    path: {
        index: any;
        text: any;
    };
    prefix: {
        index: any;
        text: any;
    } | undefined;
    suffix: {
        row: any;
        col: any;
        rowEnd: any;
        colEnd: any;
        suffix: {
            index: any;
            text: any;
        };
    };
}[];
declare const A: "(?:\\\\\\\\\\?\\\\|file:\\/\\/\\/)?[a-zA-Z]:";
export { j as $d1b, v as $e1b, P as $f1b, S as $g1b, b as $h1b, y as $i1b, A as $j1b };
//# sourceMappingURL=terminalLinkParsing.d.ts.map