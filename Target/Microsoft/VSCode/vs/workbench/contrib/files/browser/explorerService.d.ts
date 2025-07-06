declare const B: A;
declare let C: {
    new (e: any, t: any, s: any, r: any, i: any, o: any, h: any, d: any, a: any, u: any): {
        m: any;
        n: any;
        o: any;
        q: any;
        t: any;
        u: any;
        v: any;
        w: any;
        x: any;
        b: P;
        k: any[];
        d: any;
        h: $;
        j: q;
        l: {
            g: any;
            h: any;
            j: any;
            m: any;
            b: any;
            onExpressionChange: any;
            c: Map<any, any>;
            f: Map<any, any>;
            n(): void;
            r(e: any): void;
            s(e: any): {
                expression: any;
                hasAbsolutePath: boolean;
            } | undefined;
            matches(e: any, s: any): boolean;
            t(e: any): any;
            q: P;
            dispose(): void;
            B(t: any): any;
        };
        readonly roots: any;
        readonly sortOrderConfiguration: {
            sortOrder: any;
            lexicographicOptions: any;
            reverse: any;
        };
        registerView(e: any): void;
        g: any;
        getContext(e: any, t?: boolean): any[];
        applyBulkEdit(e: any, t: any): Promise<void>;
        hasViewFocus(): any;
        findClosest(e: any): any;
        findClosestRoot(e: any): any;
        setEditable(e: any, t: any): Promise<void>;
        c: {
            stat: any;
            data: any;
        } | undefined;
        setToCopy(e: any, t: any): Promise<void>;
        f: any;
        isCut(e: any): any;
        getEditable(): {
            stat: any;
            data: any;
        } | undefined;
        getEditableData(e: any): any;
        isEditable(e: any): boolean;
        select(e: any, t: any): Promise<undefined>;
        refresh(e?: boolean): Promise<void>;
        y(e: any): Promise<void>;
        z(e: any, t: any): boolean;
        A(e: any): Promise<void>;
        dispose(): void;
    };
    a: number | undefined;
};
import { $0E as A } from "../../../../platform/undoRedo/common/undoRedo.js";
import { $ud as P } from "../../../../base/common/lifecycle.js";
import { $fIb as $ } from "../common/explorerModel.js";
import { $Zh as q } from "../../../../base/common/async.js";
export { B as $8nc, C as $9nc };
//# sourceMappingURL=explorerService.d.ts.map