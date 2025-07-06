declare const he: any;
declare let I: {
    new (e: any, i: any, t: any, n: any): {
        h: any;
        j: any;
        m: any;
        a: {
            g: any;
            h: any;
            j: any;
            m: any;
            a: any;
            f: any;
            b: any;
            dispose(): void;
            n(): void;
            getDecorationInfo(e: any): {
                reason: {
                    kind: number;
                    confusableWith?: never;
                    notAmbiguousInLocales?: never;
                } | {
                    kind: number;
                    confusableWith: string;
                    notAmbiguousInLocales: any;
                } | null;
                inComment: boolean;
                inString: boolean;
            } | null;
            q: import("../../../../base/common/lifecycle.js").$ud;
            B(t: any): any;
        } | ge | null;
        g: boolean;
        n: (o: any) => void;
        f: any;
        b: any;
        dispose(): void;
        s(): void;
        getDecorationInfo(e: any): {
            reason: {
                kind: number;
                confusableWith?: never;
                notAmbiguousInLocales?: never;
            } | {
                kind: number;
                confusableWith: string;
                notAmbiguousInLocales: any;
            } | null;
            inComment: boolean;
            inString: boolean;
        } | null;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class We {
    constructor(e: any, i: any, t: any);
    owner: any;
    range: any;
    decoration: any;
    isValidForHoverAnchor(e: any): boolean;
}
declare let H: {
    new (e: any, i: any, t: any): {
        a: any;
        b: any;
        f: any;
        hoverOrdinal: number;
        computeSync(e: any, i: any): te[];
        renderHoverParts(e: any, i: any): import("../../hover/browser/hoverTypes.js").$tjb;
        getAccessibleContent(e: any): any;
    };
};
declare class fe extends k {
    constructor();
    shortLabel: any;
    run(e: any, i: any, t: any): Promise<void>;
    runAction(e: any): Promise<void>;
}
declare class me extends k {
    constructor();
    shortLabel: any;
    run(e: any, i: any, t: any): Promise<void>;
    runAction(e: any): Promise<void>;
}
declare class m extends $ {
    constructor();
    shortLabel: any;
    run(e: any, i: any, t: any): Promise<void>;
    runAction(e: any): Promise<void>;
}
declare class w extends $ {
    constructor();
    shortLabel: any;
    run(e: any, i: any, t: any): Promise<void>;
    runAction(e: any): Promise<void>;
}
declare class D extends $ {
    constructor();
    shortLabel: any;
    run(e: any, i: any, t: any): Promise<void>;
    runAction(e: any): Promise<void>;
}
declare class S extends $ {
    constructor();
    run(e: any, i: any): Promise<void>;
}
declare class ge extends j {
    constructor(e: any, i: any, t: any);
    g: any;
    h: any;
    j: any;
    a: any;
    f: any;
    b: any;
    m(): void;
    getDecorationInfo(e: any): {
        reason: {
            kind: number;
            confusableWith?: never;
            notAmbiguousInLocales?: never;
        } | {
            kind: number;
            confusableWith: string;
            notAmbiguousInLocales: any;
        } | null;
        inComment: boolean;
        inString: boolean;
    } | null;
}
import { $8lb as te } from "../../hover/browser/markdownHoverParticipant.js";
import { $Eab as k } from "../../../browser/editorExtensions.js";
import { $KI as $ } from "../../../../platform/actions/common/actions.js";
import { $vd as j } from "../../../../base/common/lifecycle.js";
export { he as $Atb, I as $Btb, We as $Ctb, H as $Dtb, fe as $Etb, me as $Ftb, m as $Gtb, w as $Htb, D as $Itb, S as $Jtb };
//# sourceMappingURL=unicodeHighlighter.d.ts.map