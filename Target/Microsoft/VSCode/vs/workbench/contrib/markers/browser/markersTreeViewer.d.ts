declare let q: {
    new (t: any, e: any, i: any, s: any): {
        a: any;
        b: any;
        d: any;
        e: any;
        templateId: string;
        renderTemplate(t: any): any;
        renderElement(t: any, e: any, i: any): void;
        disposeTemplate(t: any): void;
    };
};
declare let S: {
    new (t: any): {
        a: any;
        templateId: string;
        renderTemplate(t: any): any;
        renderElement(t: any, e: any, i: any): void;
        disposeTemplate(t: any): void;
    };
};
declare class $e {
    constructor(t: any);
    options: any;
    filter(t: any, e: any): any;
    a(t: any): boolean | 2 | {
        visibility: boolean;
        data: {
            type: number;
            uriMatches: {
                start: any;
                end: any;
            }[];
        };
    };
    b(t: any, e: any): any;
    d(t: any, e: any): any;
}
declare let E: {
    new (t: any, e: any, i: any, s: any, o: any): {
        g: any;
        h: any;
        j: any;
        m: any;
        s: any;
        a: any;
        onDidChange: any;
        b: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | null;
        f: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | null;
        t: boolean;
        u: any;
        multiline: boolean;
        readonly quickFixAction: any;
        showLightBulb(): void;
        w(t: any): Promise<void>;
        y(t: any): Promise<any> | {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        };
        z(t: any): any;
        C(t: any): any;
        D(t: any): Promise<any> | {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        };
        q: O;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let N: {
    new (t: boolean | undefined, e: string | undefined, i: any, s: any): {
        t: any;
        u: any;
        a: any;
        onDidChange: any;
        b: any;
        onDidChangeViewMode: any;
        f: Map<any, any>;
        g: Map<any, any>;
        h: boolean;
        j: any;
        m: et;
        w: boolean;
        y: string;
        s: any;
        add(t: any): void;
        remove(t: any): void;
        getViewModel(t: any): any;
        onMarkerMouseHover(t: any): void;
        onMarkerMouseLeave(t: any): void;
        multiline: boolean;
        viewMode: string;
        dispose(): void;
        q: O;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let k: {
    new (t: any): {
        a: any;
        getWidgetAriaLabel(): any;
        getAriaLabel(t: any): any;
    };
};
declare class M {
    constructor(t: any);
    a: any;
    getHeight(t: any): number | undefined;
    getTemplateId(t: any): "m" | "ri" | "rm";
}
declare class _t {
    constructor(t: any, e: any);
    d: any;
    a: Map<any, any>;
    b: O;
    templateId: string;
    renderTemplate(t: any): {
        count: z;
        resourceLabel: any;
    };
    renderElement(t: any, e: any, i: any): void;
    disposeElement(t: any, e: any, i: any): void;
    disposeTemplate(t: any): void;
    e(t: any): void;
    f(t: any, e: any): void;
    dispose(): void;
}
declare class me extends _t {
}
import { $ud as O } from "../../../../base/common/lifecycle.js";
import { $Jh as et } from "../../../../base/common/async.js";
import { $$9 as z } from "../../../../base/browser/ui/countBadge/countBadge.js";
export { q as $Aqc, S as $Bqc, $e as $Cqc, E as $Dqc, N as $Eqc, k as $wqc, M as $xqc, _t as $yqc, me as $zqc };
//# sourceMappingURL=markersTreeViewer.d.ts.map