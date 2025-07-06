declare class C extends y {
    constructor(t: any, e: any, s: any, o: any, i: any, r: any, h: any, d: any, n: any);
    b: any;
    c: any;
    f: any;
    g: any;
    h: any;
    j: any;
    m: any;
    n: any;
    output: any;
    resizeListener: any;
    render(t: any, e: any): void;
    domNode: HTMLDivElement | undefined;
    renderResult: {
        type: number;
        source: any;
        htmlContent: string;
    } | {
        type: number;
        renderer: any;
        source: any;
        mimeType: any;
    } | undefined;
    r(t: any, e: any): {
        type: number;
        source: any;
        htmlContent: string;
    };
    s(t: any, e: any): {
        type: number;
        source: any;
        htmlContent: string;
    };
    t(t: any, e: any): {
        type: number;
        source: any;
        htmlContent: string;
    };
    u(t: any, e: any): Promise<void>;
    w(t: any): any;
    getCellOutputCurrentIndex(): any;
    updateHeight(t: any, e: any): void;
    getOutputOffsetInContainer(t: any): any;
    getOutputOffsetInCell(t: any): any;
}
declare let b: {
    new (t: any, e: any, s: any, o: any, i: any, r: any, h: any, d: any): {
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        b: Map<any, any>;
        s(t: any): void;
        render(): void;
        showOutputs(): void;
        hideOutputs(): void;
        t(t: any, e: any, s: any): void;
        q: f;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as y } from "../../../../../base/common/lifecycle.js";
import { $ud as f } from "../../../../../base/common/lifecycle.js";
export { C as $A$b, b as $B$b };
//# sourceMappingURL=diffElementOutputs.d.ts.map