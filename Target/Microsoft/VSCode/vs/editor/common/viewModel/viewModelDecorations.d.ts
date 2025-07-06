declare class P {
    constructor(e: any, t: any, s: any, o: any, n: any);
    a: any;
    b: any;
    c: any;
    d: any;
    e: any;
    f: any;
    g: {
        decorations: any[];
        inlineDecorations: never[][];
        hasVariableFonts: boolean;
    } | null;
    h: any;
    k(): void;
    dispose(): void;
    reset(): void;
    onModelDecorationsChanged(): void;
    onLineMappingChanged(): void;
    l(e: any): any;
    getMinimapDecorationsInRange(e: any): any[];
    getDecorationsViewportData(e: any): {
        decorations: any[];
        inlineDecorations: never[][];
        hasVariableFonts: boolean;
    } | null;
    getInlineDecorationsOnLine(e: any, t?: boolean, s?: boolean): {
        inlineDecorations: never[] | undefined;
        hasVariableFonts: boolean;
    };
    m(e: any, t: any, s: any): {
        decorations: any[];
        inlineDecorations: never[][];
        hasVariableFonts: boolean;
    };
}
declare function T(l: any, e: any): boolean;
declare function x(l: any, e: any): boolean;
declare function $(l: any, e: any): boolean;
export { P as $leb, T as $meb, x as $neb, $ as $oeb };
//# sourceMappingURL=viewModelDecorations.d.ts.map