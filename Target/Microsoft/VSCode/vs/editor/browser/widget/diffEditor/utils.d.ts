declare function G(i: any, e: any, t: any, n: any): any;
declare function J(i: any, e: any): w;
declare function K(i: any, e: any): any;
declare function Q(i: any, e: any): any;
declare class X extends $ {
    constructor(e: any, t: any);
    get width(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get height(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get automaticLayout(): boolean;
    n: boolean;
    f: any;
    g: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    h: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    observe(e: any): void;
    setAutomaticLayout(e: any): void;
}
declare function Y(i: any, e: any, t: any): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
declare function E(i: any, e: any): {};
declare class I extends $ {
    constructor(e: any, t: any, n: any);
}
declare class U {
    constructor(e: any, t: any);
    get afterLineNumber(): any;
    h: any;
    heightInPx: any;
    domNode: HTMLDivElement;
    f: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    g: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    actualTop: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    actualHeight: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    showInHiddenAreas: boolean;
    onChange: any;
    onDomNodeTop: (n: any) => void;
    onComputedHeight: (n: any) => void;
}
declare class x {
    constructor(e: any, t: any);
    k: any;
    n: any;
    g: string;
    h: {
        getId: () => string;
        getDomNode: () => any;
        getPosition: () => null;
    };
    dispose(): void;
}
declare function H(i: any, e: any): import("../../../../base/common/observableInternal/reactions/autorunImpl.js").$Vd;
declare function ee(i: any, e: any, t: any, n: any): w;
declare class te extends Z {
    dispose(): void;
}
declare function ne(i: any, e: any): any;
declare function ie(i: any, e: any): any;
declare class P {
    static create(e: any, t?: undefined): b;
    static createWithDisposable(e: any, t: any, n?: undefined): b;
    static createOfNonDisposable(e: any, t: any, n?: undefined): b;
}
import { $ud as w } from "../../../../base/common/lifecycle.js";
import { $vd as $ } from "../../../../base/common/lifecycle.js";
import { $qf as Z } from "../../../../base/common/cancellation.js";
declare class b extends P {
    constructor(e: any, t: any, n: any);
    object: any;
    k: any;
    n: any;
    f: number;
    g: boolean;
    h: any[];
    o(e: any): void;
    createNewRef(e: any): T;
    dispose(): void;
    _decreaseRefCount(e: any): void;
}
declare class T extends P {
    constructor(e: any, t: any);
    g: any;
    h: any;
    f: boolean;
    get object(): any;
    createNewRef(e: any): any;
    dispose(): void;
}
export { G as $Eeb, J as $Feb, K as $Geb, Q as $Heb, X as $Ieb, Y as $Jeb, E as $Keb, I as $Leb, U as $Meb, x as $Neb, H as $Oeb, ee as $Peb, te as $Qeb, ne as $Reb, ie as $Seb, P as $Teb };
//# sourceMappingURL=utils.d.ts.map