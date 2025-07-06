declare const k: any;
declare const D: any;
declare namespace S {
    export let description: string;
    export let isWholeLine: boolean;
    export let className: string;
    export { c as stickiness };
}
declare namespace y {
    let description_1: string;
    export { description_1 as description };
    let isWholeLine_1: boolean;
    export { isWholeLine_1 as isWholeLine };
    let className_1: string;
    export { className_1 as className };
    export { c as stickiness };
}
declare function I(e: any): {
    description: string;
    before: {
        content: string;
        inlineClassName: string;
        inlineClassNameAffectsLetterSpacing: boolean;
    };
};
declare function T(e: any, t: any, i: any): ({
    options: {
        description: string;
        glyphMarginClassName: any;
        glyphMargin: {
            position: any;
        };
        zIndex: number;
        stickiness: number;
        overviewRuler: {
            position: any;
            color: {
                id: any;
            };
        };
    };
    range: p;
} | {
    options: {
        description: string;
        isWholeLine: boolean;
        className: string;
        stickiness: number;
    };
    range: p;
} | {
    options: {
        description: string;
        before: {
            content: string;
            inlineClassName: string;
            inlineClassNameAffectsLetterSpacing: boolean;
        };
    };
    range: p;
})[];
declare let h: {
    new (t: any, i: any, o: any, r: any): {
        b: any;
        c: any;
        f: any;
        g: any;
        a: any;
        h(): any;
        dispose(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const c: 1;
import { $eC as p } from "../../../../editor/common/core/range.js";
export { k as $J_b, D as $K_b, S as $L_b, y as $M_b, I as $N_b, T as $O_b, h as $P_b };
//# sourceMappingURL=callStackEditorContribution.d.ts.map