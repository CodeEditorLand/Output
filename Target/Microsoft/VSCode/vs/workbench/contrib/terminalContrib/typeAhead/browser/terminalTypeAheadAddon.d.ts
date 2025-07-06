declare class it extends _ {
    constructor(t: any);
    get accuracy(): number;
    get sampleSize(): number;
    get latency(): {
        count: number;
        min: any;
        median: any;
        max: any;
    };
    get maxLatency(): number;
    f: any[];
    h: number;
    j: WeakMap<WeakKey, any>;
    m: w;
    onChange: any;
    t(t: any, e: any): void;
}
declare class st {
    constructor(t: any, e: any);
    get u(): any[];
    get isShowingPredictions(): boolean;
    get length(): number;
    terminal: any;
    w: any;
    d: any[];
    f: number;
    l: boolean;
    o: w;
    onPredictionAdded: any;
    q: w;
    onPredictionFailed: any;
    t: w;
    onPredictionSucceeded: any;
    setShowPredictions(t: any): void;
    undoAllPredictions(): void;
    beforeServerInput(t: any): any;
    m: any;
    k: any;
    z(): void;
    addPrediction(t: any, e: any): boolean;
    addBoundary(t: any, e: any): boolean;
    peekEnd(): any;
    peekStart(): any;
    physicalCursor(t: any): B;
    h: B | undefined;
    tentativeCursor(t: any): B;
    j: B | undefined;
    clearCursor(): void;
    A(): any;
}
declare let x: {
    new (t: any, e: any, i: any): {
        C: any;
        D: any;
        F: any;
        w: string;
        h: any;
        j: RegExp;
        activate(t: any): void;
        f: any;
        u: st | undefined;
        stats: any;
        reset(): void;
        G(): void;
        z: any;
        H(t: any, e: any): void;
        I(t: any, e: any): void;
        J(t: any): void;
        L(t: any): void;
        m: {
            y: any;
            startingX: any;
            endingX: any;
            charState: number;
        } | undefined;
        M(t: any): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var j: any;
import { $vd as _ } from "../../../../../base/common/lifecycle.js";
import { $ef as w } from "../../../../../base/common/event.js";
declare class B {
    constructor(t: any, e: any, i: any);
    get x(): any;
    get y(): any;
    get baseY(): any;
    get coordinate(): {
        x: any;
        y: any;
        baseY: any;
    };
    rows: any;
    cols: any;
    j: any;
    d: any;
    f: any;
    h: any;
    getLine(): any;
    getCell(t: any): any;
    moveTo(t: any): string;
    clone(): B;
    move(t: any, e: any): string;
    shift(t?: number, e?: number): string;
    moveInstruction(): string;
}
export { it as $cuc, st as $duc, x as $euc, j as CharPredictState };
//# sourceMappingURL=terminalTypeAheadAddon.d.ts.map