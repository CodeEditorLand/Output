export { u as $frb };
declare let u: {
    new (t: any, e: any, n: any, i: any): {
        h: any;
        i: any;
        j: any;
        b: C;
        c: C;
        f: any;
        g: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | null;
        a: any;
        d: any;
        startFindDefinitionFromCursor(t: any): Promise<void>;
        k(t: any, e: any): void;
        l(t: any): Promise<any>;
        m(t: any, e: any, n: any): any;
        n(t: any, e: any, n: any): any;
        o(t: any, e: any): c;
        p(t: any, e: any): void;
        q(): void;
        r(t: any, e: any): any;
        s(t: any, e: any): Promise<any>;
        t(t: any, e: any): any;
        u(t: any): any;
        dispose(): void;
    };
    ID: string | undefined;
    MAX_SOURCE_PREVIEW_LINES: number | undefined;
    get(t: any): any;
};
import { $ud as C } from "../../../../../base/common/lifecycle.js";
import { $eC as c } from "../../../../common/core/range.js";
//# sourceMappingURL=goToDefinitionAtPosition.d.ts.map