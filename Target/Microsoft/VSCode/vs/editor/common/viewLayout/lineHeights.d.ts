declare class M {
    constructor(e: any, i: any, h: any, r: any, s: any);
    decorationId: any;
    index: any;
    lineNumber: any;
    specialHeight: any;
    prefixSum: any;
    maximumSpecialHeight: any;
    deleted: boolean;
}
declare class y {
    constructor(e: any, i: any);
    a: H;
    b: any[];
    c: any[];
    d: number;
    f: boolean;
    e: any;
    set defaultLineHeight(e: any);
    get defaultLineHeight(): any;
    removeCustomLineHeight(e: any): void;
    insertOrChangeCustomLineHeight(e: any, i: any, h: any, r: any): void;
    heightForLineNumber(e: any): any;
    getAccumulatedLineHeightsIncludingLineNumber(e: any): any;
    onLinesDeleted(e: any, i: any): void;
    onLinesInserted(e: any, i: any): void;
    commit(): void;
    g(e: any): number;
}
declare class H {
    a: Map<any, any>;
    add(e: any, i: any): void;
    get(e: any): any;
    delete(e: any): void;
}
export { M as $deb, y as $eeb };
//# sourceMappingURL=lineHeights.d.ts.map