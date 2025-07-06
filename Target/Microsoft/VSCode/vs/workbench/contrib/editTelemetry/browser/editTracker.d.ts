declare class y extends h {
    constructor(t: any, s: any);
    f: any;
    data: any;
    a: r | undefined;
    b: r | undefined;
    c: {
        readonly debugName: any;
        toString(): any;
        a: any;
        c: any;
        trigger(t: any, r: any): void;
        get(): void;
        f: Set<any>;
        addObserver(e: any): void;
        removeObserver(e: any): void;
        g(): void;
        h(): void;
        log(): /*elided*/ any;
        debugGetObservers(): Set<any>;
        readonly TChange: null;
        reportChanges(): void;
        read(e: any): any;
        map(e: any, t: any): any;
        flatten(): any;
        recomputeInitiallyAndOnChange(e: any, t: any): /*elided*/ any;
        keepObserved(e: any): /*elided*/ any;
        readonly b: any;
    };
    waitForQueue(): Promise<void>;
    getTrackedRanges(t: any): g[];
    isEmpty(): boolean;
    reset(): void;
    _getDebugVisualization(): {
        $fileExtension: string;
        value: any;
        decorations: {
            range: any[];
            color: any;
        }[];
    };
}
declare class g {
    constructor(t: any, s: any, e: any, o: any);
    originalRange: any;
    range: any;
    source: any;
    sourceKey: any;
}
import { $vd as h } from "../../../../base/common/lifecycle.js";
import { $pF as r } from "../../../../editor/common/core/edits/stringEdit.js";
export { y as $Gzc, g as $Hzc };
//# sourceMappingURL=editTracker.d.ts.map