declare class b {
    constructor(t: any);
    id: any;
    precondition: any;
    f: any;
    g: any;
    metadata: any;
    register(): void;
    k(t: any): void;
}
declare class C extends b {
    constructor(...args: any[]);
    d: any[];
    addImplementation(t: any, e: any, i: any, n: any): {
        dispose: () => void;
    };
    runCommand(t: any, e: any): any;
}
declare class w extends b {
    constructor(t: any, e: any);
    d: any;
    runCommand(t: any, e: any): any;
}
declare class h extends b {
    static bindToContribution(t: any): {
        new (i: any): {
            d: any;
            runEditorCommand(i: any, n: any, o: any): void;
            runCommand(t: any, e: any): any;
            id: any;
            precondition: any;
            f: any;
            g: any;
            metadata: any;
            register(): void;
            k(t: any): void;
        };
        bindToContribution(t: any): /*elided*/ any;
        runEditorCommand(t: any, e: any, i: any, n: any): any;
    };
    static runEditorCommand(t: any, e: any, i: any, n: any): any;
    runCommand(t: any, e: any): any;
}
declare class E extends h {
    static o(t: any): any;
    label: any;
    alias: any;
    runEditorCommand(t: any, e: any, i: any): any;
    q(t: any, e: any): void;
}
declare class ot extends E {
    constructor(...args: any[]);
    d: any[];
    addImplementation(t: any, e: any): {
        dispose: () => void;
    };
    run(t: any, e: any, i: any): any;
}
declare class dt extends F {
    run(t: any, ...e: any[]): any;
}
declare function st(r: any, t: any): void;
declare function ut(r: any): any;
declare function lt(r: any): any;
declare function ct(r: any): any;
declare function at(r: any): void;
declare function mt(r: any, t: any, e: any): void;
declare function ht(r: any, t: any): void;
declare const j: any;
declare const W: any;
declare const ft: any;
declare var A: any;
declare var $: any;
import { $KI as F } from "../../platform/actions/common/actions.js";
export { b as $Aab, C as $Bab, w as $Cab, h as $Dab, E as $Eab, ot as $Fab, dt as $Gab, st as $Hab, ut as $Iab, lt as $Jab, ct as $Kab, at as $Lab, mt as $Mab, ht as $Nab, j as $Oab, W as $Pab, ft as $Qab, A as EditorContributionInstantiation, $ as EditorExtensionsRegistry };
//# sourceMappingURL=editorExtensions.d.ts.map