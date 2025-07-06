declare class C {
    constructor(t: any, e: any);
    f: any;
    c: any;
    d: any;
    get value(): any;
    setValue(t: any, e: any): boolean;
    removeValue(t: any): boolean;
    getValue(t: any): any;
    updateParent(t: any): void;
    collectAllValues(): any;
}
declare class K extends E {
    constructor(t: any);
    g: any;
    onDidChangeContext: any;
    c: boolean;
    f: any;
    get contextId(): any;
    createKey(t: any, e: any): D;
    bufferChangeEvents(t: any): void;
    createScoped(t: any): B;
    createOverlay(t?: any): g;
    contextMatchesRules(t: any): any;
    getContextKeyValue(t: any): any;
    setContext(t: any, e: any): void;
    removeContext(t: any): void;
    getContext(t: any): any;
}
declare let V: {
    new (t: any): {
        j: Map<any, any>;
        h: number;
        getContextValuesContainer(t: any): any;
        createChildContext(t?: any): number;
        disposeContext(t: any): void;
        updateParent(t: any): void;
        g: any;
        onDidChangeContext: any;
        c: boolean;
        f: any;
        readonly contextId: any;
        createKey(t: any, e: any): D;
        bufferChangeEvents(t: any): void;
        createScoped(t: any): B;
        createOverlay(t?: any): g;
        contextMatchesRules(t: any): any;
        getContextKeyValue(t: any): any;
        setContext(t: any, e: any): void;
        removeContext(t: any): void;
        getContext(t: any): any;
        dispose(): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function k(n: any, t: any, e: any): void;
import { $vd as E } from "../../../base/common/lifecycle.js";
declare class D {
    constructor(t: any, e: any, s: any);
    c: any;
    d: any;
    f: any;
    set(t: any): void;
    reset(): void;
    get(): any;
}
declare class B extends K {
    constructor(t: any, e: any);
    m: any;
    h: any;
    j: any;
    n(): void;
    getContextValuesContainer(t: any): any;
    createChildContext(t?: any): any;
    disposeContext(t: any): void;
    updateParent(t: any): void;
}
declare class g {
    constructor(t: any, e: any);
    get contextId(): any;
    get onDidChangeContext(): any;
    d: any;
    c: Map<any, any>;
    bufferChangeEvents(t: any): void;
    createKey(): void;
    getContext(t: any): v;
    getContextValuesContainer(t: any): v;
    contextMatchesRules(t: any): any;
    getContextKeyValue(t: any): any;
    createScoped(): void;
    createOverlay(t?: any): g;
    updateParent(): void;
}
declare class v {
    constructor(t: any, e: any);
    c: any;
    d: any;
    getValue(t: any): any;
}
export { C as $u4b, K as $v4b, V as $w4b, k as $x4b };
//# sourceMappingURL=contextKeyService.d.ts.map