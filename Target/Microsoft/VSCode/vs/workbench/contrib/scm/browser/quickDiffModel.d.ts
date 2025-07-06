declare const $i: any;
declare let x: {
    new (i: any, t: any, e: any): {
        f: any;
        g: any;
        h: any;
        c: any;
        createQuickDiffModelReference(i: any, t?: {
            algorithm: string;
            maxComputationTimeMs: number;
        }): any;
    };
};
declare let y: {
    new (i: any, t: any, e: any, s: any, r: any, h: any, c: any, n: any, u: any): {
        readonly originalTextModels: any;
        readonly allChanges: any[];
        readonly changes: any[];
        readonly quickDiffChanges: Map<any, any>;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        f: P;
        g: any;
        h: boolean;
        j: any[];
        n: A;
        s: Y;
        onDidChange: any;
        t: any[];
        u: any[];
        w: Map<any, any>;
        y: B;
        c: any;
        readonly quickDiffs: any[];
        getQuickDiffResults(): {
            original: any;
            modified: any;
            changes: any[];
            changes2: any[];
        }[];
        getDiffEditorModel(i: any): {
            modified: any;
            original: any;
        } | undefined;
        L(i: any): void;
        M(): void;
        N(i: any, t: any, e: any): void;
        O(): any;
        P(i: any, t: any, e: any): Promise<{
            changes: any;
            changes2: any;
        }>;
        Q(): Promise<any>;
        m: Promise<any> | undefined;
        R(): Promise<any>;
        findNextClosestChange(i: any, t: boolean | undefined, e: any): number;
        findPreviousClosestChange(i: any, t: boolean | undefined, e: any): number;
        dispose(): void;
        q: I;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Ic as P } from "../../../../base/common/map.js";
import { $Kh as A } from "../../../../base/common/async.js";
import { $ef as Y } from "../../../../base/common/event.js";
import { $Ed as B } from "../../../../base/common/lifecycle.js";
import { $ud as I } from "../../../../base/common/lifecycle.js";
export { $i as $TXb, x as $UXb, y as $VXb };
//# sourceMappingURL=quickDiffModel.d.ts.map