declare const J: Readonly<{
    id: "application";
    order: 100;
    title: any;
    type: "object";
}>;
declare const Q: Readonly<{
    id: "workbench";
    order: 7;
    title: any;
    type: "object";
}>;
declare const z: Readonly<{
    id: "security";
    scope: 1;
    title: any;
    type: "object";
    order: 7;
}>;
declare const T: Readonly<{
    id: "problems";
    title: any;
    type: "object";
    order: 101;
}>;
declare const O: Readonly<{
    id: "window";
    order: 8;
    title: any;
    type: "object";
}>;
declare namespace W {
    let ConfigurationMigration: string;
}
declare let b: {
    new (t: any, e: any): {
        a: any;
        b: any;
        c(t: any): Promise<void>;
        f(t: any, e: any): Promise<void>;
        g(t: any, e: any): Promise<void>;
        h(t: any, e: any, i: any, r: any, o: any): Promise<any[]>;
        q: import("../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let $: {
    new (t: any): {
        b: any;
        a: M;
        ready: Promise<any>;
        c(): Promise<void>;
        f(): Promise<void>;
        q: import("../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const p: "window.newWindowProfile";
declare let C: {
    new (t: any, e: any): {
        c: any;
        f: any;
        g(): void;
        a: {
            properties: {
                "window.newWindowProfile": {
                    type: string[];
                    default: null;
                    enum: any[];
                    enumItemLabels: any[];
                    description: any;
                    scope: number;
                };
            };
            id: "window";
            order: 8;
            title: any;
            type: "object";
        } | undefined;
        h(): void;
        b: any;
        j(): void;
        q: import("../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $$h as M } from "../../base/common/async.js";
export { J as $qL, Q as $rL, z as $sL, T as $tL, O as $uL, W as $vL, b as $wL, $ as $xL, p as $yL, C as $zL };
//# sourceMappingURL=configuration.d.ts.map