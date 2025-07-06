declare let y: {
    new (t: any, i: any, e: any, s: any, r: any): {
        C: any;
        c: any;
        onDidChange: any;
        f: any;
        onDidChangeFast: any;
        h: boolean;
        j: number;
        m: number;
        s: number;
        t: number;
        w: E;
        isSimpleWidget: any;
        contextMenuId: any;
        g: any;
        u: any;
        y: any;
        z: A;
        options: W;
        D(): void;
        F(): W;
        G(): {
            extraEditorClassName: string;
            outerWidth: any;
            outerHeight: any;
            emptySelectionClipboard: boolean;
            pixelRatio: any;
            editContextSupported: boolean;
            accessibilitySupport: any;
        };
        H(t: any): any;
        getRawOptions(): any;
        updateOptions(t: any): void;
        observeContainer(t: any): void;
        setIsDominatedByLongLines(t: any): void;
        setModelLineCount(t: any): void;
        setViewLineCount(t: any): void;
        setReservedHeight(t: any): void;
        setGlyphMarginDecorationLaneCount(t: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class W {
    c: any[];
    _read(t: any): any;
    get(t: any): any;
    _write(t: any, i: any): void;
}
import { ComputeOptionsMemory as E } from "../../common/config/editorOptions.js";
declare class A {
    c: any[];
    _read(t: any): any;
    get(t: any): any;
    _write(t: any, i: any): void;
}
export { y as $P_, W as $Q_ };
//# sourceMappingURL=editorConfiguration.d.ts.map