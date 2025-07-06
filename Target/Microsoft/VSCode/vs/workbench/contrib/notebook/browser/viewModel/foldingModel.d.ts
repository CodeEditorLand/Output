declare class D {
    get regions(): x;
    a: any;
    b: R;
    d: b;
    onDidFoldingRegionChanged: any;
    e: any[];
    c: x;
    dispose(): void;
    detachViewModel(): void;
    attachViewModel(t: any): void;
    getRegionAtLine(t: any): import("../../../../../editor/contrib/folding/browser/foldingRanges.js").$Zob | null;
    getRegionsInside(t: any, e: any): import("../../../../../editor/contrib/folding/browser/foldingRanges.js").$Zob[];
    getAllRegionsAtLine(t: any, e: any): import("../../../../../editor/contrib/folding/browser/foldingRanges.js").$Zob[];
    setCollapsed(t: any, e: any): void;
    recompute(): void;
    getMemento(): {
        start: number;
        end: number;
    }[];
    applyMemento(t: any): boolean;
}
declare function E(g: any, t: any, e: any): void;
declare function N(g: any): Generator<{
    depth: any;
    text: any;
}, void, unknown>;
import { $Yob as x } from "../../../../../editor/contrib/folding/browser/foldingRanges.js";
import { $ud as R } from "../../../../../base/common/lifecycle.js";
import { $ef as b } from "../../../../../base/common/event.js";
export { D as $hVb, E as $iVb, N as $jVb };
//# sourceMappingURL=foldingModel.d.ts.map