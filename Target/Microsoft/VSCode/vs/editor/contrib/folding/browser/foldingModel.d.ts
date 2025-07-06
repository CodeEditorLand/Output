declare function w(o: any, t: any): any;
declare function y(o: any, t: any): any;
declare class f {
    constructor(t: any, e: any);
    get regions(): g;
    get textModel(): any;
    get decorationProvider(): any;
    e: m;
    onDidChange: any;
    a: any;
    b: any;
    c: g;
    d: any[];
    toggleCollapseState(t: any): void;
    removeManualRanges(t: any): void;
    update(t: any, e: any): void;
    updatePost(t: any): void;
    f(t: any): {
        startLineNumber: any;
        endLineNumber: any;
        type: any;
        isCollapsed: boolean;
        source: number;
    }[];
    getMemento(): {
        startLineNumber: any;
        endLineNumber: any;
        isCollapsed: boolean;
        source: number;
        checksum: number;
    }[] | undefined;
    applyMemento(t: any): void;
    g(t: any, e: any): number;
    dispose(): void;
    getAllRegionsAtLine(t: any, e: any): import("./foldingRanges.js").$Zob[];
    getRegionAtLine(t: any): import("./foldingRanges.js").$Zob | null;
    getRegionsInside(t: any, e: any): import("./foldingRanges.js").$Zob[];
}
declare function N(o: any, t: any, e: any): void;
declare function x(o: any, t: any, e: number | undefined, s: any): void;
declare function C(o: any, t: any, e: any, s: any): void;
declare function R(o: any, t: any, e: any): void;
declare function I(o: any, t: any, e: any, s: any): void;
declare function A(o: any, t: any, e: any): void;
declare function S(o: any, t: any, e: any): void;
declare function $(o: any, t: any, e: any): void;
declare function D(o: any, t: any): any;
import { $Yob as g } from "./foldingRanges.js";
import { $ef as m } from "../../../../base/common/event.js";
export { w as $$ob, y as $0ob, f as $1ob, N as $2ob, x as $3ob, C as $4ob, R as $5ob, I as $6ob, A as $7ob, S as $8ob, $ as $9ob, D as $_ob };
//# sourceMappingURL=foldingModel.d.ts.map