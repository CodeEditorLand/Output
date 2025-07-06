declare class x {
    constructor(t: any, i: any, s: any, n: any, e: any);
    injectionOffsets: any;
    injectionOptions: any;
    breakOffsets: any;
    breakOffsetsVisibleColumn: any;
    wrappedTextIndentLength: any;
    getOutputLineCount(): any;
    getMinOutputOffset(t: any): any;
    getLineLength(t: any): number;
    getMaxOutputOffset(t: any): number;
    translateToInputOffset(t: any, i: any): any;
    translateToOutputPosition(t: any, i?: number): c;
    a(t: any, i?: number): c;
    normalizeOutputPosition(t: any, i: any, s: any): c;
    b(t: any, i: any): any;
    c(t: any, i: any): any;
    getInjectedText(t: any, i: any): {
        options: any;
    } | null;
    d(t: any): {
        injectedTextIndex: number;
        offsetInInputWithInjections: any;
        length: any;
    } | undefined;
}
declare class T {
    constructor(t: any);
    options: any;
}
declare class c {
    constructor(t: any, i: any);
    outputLineIndex: any;
    outputOffset: any;
    toString(): string;
    toPosition(t: any): d;
}
import { $dC as d } from "./core/position.js";
export { x as $R_, T as $S_, c as $T_ };
//# sourceMappingURL=modelLineProjectionData.d.ts.map