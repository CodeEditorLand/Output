declare let x: {
    new (e: any, t: any, i: any, o: any, n: any, s: any): {
        M: any;
        N: any;
        O: any;
        J: any;
        f: any;
        _foldingLimitReporter: any;
        g: any;
        h: boolean;
        j: any;
        m: boolean;
        t: boolean;
        n: any;
        G: any;
        w: q | null;
        y: se | null;
        z: P | D | null;
        C: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | null;
        D: any;
        F: G | null;
        I: V | null;
        L: {
            lineNumber: any;
            iconClicked: boolean;
        } | null;
        u: de;
        H: any;
        readonly limitReporter: any;
        saveViewState(): {
            collapsedRegions?: never;
            lineCount?: never;
            provider?: never;
            foldedImports?: never;
        } | {
            collapsedRegions: {
                startLineNumber: any;
                endLineNumber: any;
                isCollapsed: boolean;
                source: number;
                checksum: number;
            }[] | undefined;
            lineCount: any;
            provider: string | undefined;
            foldedImports: boolean;
        } | undefined;
        restoreViewState(e: any): void;
        P(): void;
        Q(): void;
        R(e: any): P | D;
        getFoldingModel(): any;
        S(e: any): void;
        triggerFoldingModelChanged(): void;
        U(e: any): void;
        W(): void;
        X(): void;
        Y(e: any): void;
        Z(e: any): void;
        reveal(e: any): void;
        q: H;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    get(e: any): any;
    getFoldingRangeProviders(e: any, t: any): any;
    setFoldingRangeProviderSelector(e: any): {
        dispose: () => void;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class be extends M {
    constructor(e: any);
    c: any;
    f: any;
    onDidChange: any;
    g: number;
    h: boolean;
    get limit(): any;
    get computed(): number;
    get limited(): boolean;
    update(e: any, t: any): void;
}
declare function Ce(l: any): {
    startsInside(e: any, t: any): boolean;
};
import { $1ob as q } from "./foldingModel.js";
import { $apb as se } from "./hiddenRangeModel.js";
import { $bpb as P } from "./indentRangeProvider.js";
import { $jpb as D } from "./syntaxRangeProvider.js";
import { $Jh as G } from "../../../../base/common/async.js";
import { $Zh as V } from "../../../../base/common/async.js";
import { $ipb as de } from "./foldingDecorations.js";
import { $ud as H } from "../../../../base/common/lifecycle.js";
import { $vd as M } from "../../../../base/common/lifecycle.js";
export { x as $lpb, be as $mpb, Ce as $npb };
//# sourceMappingURL=folding.d.ts.map