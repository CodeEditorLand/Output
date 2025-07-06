declare function F(c: any, t: any, i: any, e: any): any;
declare function et(c: any, t: any, i: any, e: any, s: any): any;
declare let g: {
    new (t: any, i: any, e: any, s: any, o: any, r: any, h: any): {
        a: {
            g: B;
            o: number;
            q: boolean;
            r: m;
            s: number;
            w: any;
            a: any;
            b: any;
            c: any;
            j: any;
            h: any;
            k: any;
            l: any;
            u: any;
            v: boolean;
            m: any;
            n: any;
            d: any;
            f: any;
            p: ot | it | null;
            hasDecorations(): boolean;
            restore(t: any): void;
            trigger(): void;
            stop(): void;
            z(): any;
            moveNext(): void;
            moveBack(): void;
            A(): void;
            B(t: any): void;
            C(): void;
            D(t: any): void;
            E(t: any): void;
            F(): any;
            G(t: any): any[];
            H(t: any, i: any): Promise<void>;
            I(t: any, i: any, e: any): ot | it;
            J(t: any): void;
            t: NodeJS.Timeout | undefined;
            K(): void;
            dispose(): void;
        } | null;
        readonly wordHighlighter: {
            g: B;
            o: number;
            q: boolean;
            r: m;
            s: number;
            w: any;
            a: any;
            b: any;
            c: any;
            j: any;
            h: any;
            k: any;
            l: any;
            u: any;
            v: boolean;
            m: any;
            n: any;
            d: any;
            f: any;
            p: ot | it | null;
            hasDecorations(): boolean;
            restore(t: any): void;
            trigger(): void;
            stop(): void;
            z(): any;
            moveNext(): void;
            moveBack(): void;
            A(): void;
            B(t: any): void;
            C(): void;
            D(t: any): void;
            E(t: any): void;
            F(): any;
            G(t: any): any[];
            H(t: any, i: any): Promise<void>;
            I(t: any, i: any, e: any): ot | it;
            J(t: any): void;
            t: NodeJS.Timeout | undefined;
            K(): void;
            dispose(): void;
        } | null;
        saveViewState(): boolean;
        moveNext(): void;
        moveBack(): void;
        restoreViewState(t: any): void;
        stopHighlighting(): void;
        dispose(): void;
        q: B;
        B(t: any): any;
    };
    ID: string | undefined;
    get(t: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as B } from "../../../../base/common/lifecycle.js";
import { $Ic as m } from "../../../../base/common/map.js";
declare class ot extends S {
    constructor(t: any, i: any, e: any, s: any, o: any);
    j: any;
    k: any;
    g(t: any, i: any, e: any, s: any): any;
}
declare class it extends S {
    constructor(t: any, i: any, e: any, s: any);
    j: any;
    g(t: any, i: any, e: any, s: any): any;
}
declare class S {
    constructor(t: any, i: any, e: any);
    c: any;
    d: any;
    f: any;
    a: T | null;
    b: {
        cancel(): void;
        then(r: any, h: any): Promise<any>;
        catch(r: any): Promise<any>;
        finally(r: any): Promise<any>;
    } | null;
    get result(): {
        cancel(): void;
        then(r: any, h: any): Promise<any>;
        catch(r: any): Promise<any>;
        finally(r: any): Promise<any>;
    };
    h(t: any, i: any): T | null;
    isValid(t: any, i: any, e: any): boolean;
    cancel(): void;
}
import { $eC as T } from "../../../common/core/range.js";
export { F as $Mtb, et as $Ntb, g as $Otb };
//# sourceMappingURL=wordHighlighter.d.ts.map