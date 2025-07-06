declare class d {
    constructor(e: any);
    set paddingTop(e: any);
    get paddingTop(): any;
    f: any;
    g: any;
    get count(): number;
    get size(): any;
    c: any[];
    d: any[];
    e: l;
    getWhitespaces(): any[];
    restoreWhitespace(e: any): void;
    splice(e: any, i: any, t: any): void;
    insertWhitespace(e: any, i: any, t: any): void;
    changeOneWhitespace(e: any, i: any, t: any): void;
    removeWhitespace(e: any): void;
    getWhitespacePosition(e: any): any;
    indexAt(e: any): any;
    indexAfter(e: any): number;
    positionAt(e: any): any;
}
declare class z extends u {
    constructor(...args: any[]);
    Fb: number;
    Gb: number;
    get inRenderingTransaction(): boolean;
    get notebookRangeMap(): import("../../../../../base/browser/ui/list/rangeMap.js").$H8;
    db(e: any, i: any, t: any, n: any, h: any, s: any): void;
    Y(e: any): d;
    insertWhitespace(e: any, i: any): string;
    changeOneWhitespace(e: any, i: any, t: any): void;
    removeWhitespace(e: any): void;
    getWhitespacePosition(e: any): any;
}
import { $H2 as l } from "../../../../../editor/common/model/prefixSumComputer.js";
import { $N8 as u } from "../../../../../base/browser/ui/list/listView.js";
export { d as $vTb, z as $wTb };
//# sourceMappingURL=notebookCellListView.d.ts.map