declare class ie extends L {
    constructor(e: any, t: any);
    extensionIds: any;
}
declare class p extends L {
    constructor(e: any, t: any, i: any, n: any, r: any, a: any, l: any, h: any, u: any);
    settingsTarget: any;
    n: any;
    r: any;
    u: any;
    w: any;
    y: any;
    z: any;
    h: any;
    j: any;
    isConfigured: boolean;
    isUntrusted: boolean;
    hasPolicyValue: boolean;
    overriddenScopeList: any[];
    overriddenDefaultsLanguageList: any[];
    languageOverrideValues: Map<any, any>;
    setting: any;
    parent: any;
    get displayCategory(): any;
    get displayLabel(): any;
    C(): void;
    D(): void;
    description: any;
    F(): void;
    valueType: any;
    inspectSelf(): void;
    G(e: any): any;
    H(e: any, t: any): void;
    defaultValueSource: any;
    scopeValue: any;
    defaultValue: any;
    value: any;
    tags: Set<any> | undefined;
    matchesAllTags(e: any): boolean;
    matchesScope(e: any, t: any): boolean;
    matchesAnyExtension(e: any): boolean;
    matchesAnyFeature(e: any): boolean;
    matchesAnyId(e: any): any;
    matchesAllLanguages(e: any): boolean;
}
declare let R: {
    new (e: any, t: any, i: any, n: any, r: any, a: any): {
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        e: Map<any, any>;
        readonly root: $ | undefined;
        update(e?: any): void;
        c: $ | undefined;
        updateWorkspaceTrust(e: any): void;
        l(e: any): void;
        n(e: any): void;
        getElementsByName(e: any): any;
        updateElementsByName(e: any): void;
        o(): void;
        p(e: any): void;
        q(e: any, t: any): $;
        r(e: any): any;
        u(e: any, t: any): p;
        dispose(): void;
    };
};
declare function re(s: any, e: any, t: any, i: any): {
    isConfigured: boolean;
    inspected: any;
    targetSelector: string;
    inspectedLanguageOverrides: Map<any, any>;
    languageSelector: any;
};
declare function ae(s: any, e?: string, t?: boolean): {
    category: string;
    label: any;
};
declare function fe(s: any): boolean;
declare let O: {
    new (e: any, t: any, i: any, n: any, r: any, a: any, l: any, h: any): {
        B: any;
        v: any;
        x: any;
        y: number | null;
        A: boolean;
        id: string;
        z: any;
        w: Map<any, any>;
        showAiResults: any;
        C(e: any): any;
        getUniqueSearchResults(): any;
        getRawResults(): any;
        D(): any;
        updateChildren(): void;
        setResult(e: any, t: any): void;
        getUniqueResultsCount(): number;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        e: Map<any, any>;
        readonly root: $ | undefined;
        update(e?: any): void;
        c: $ | undefined;
        updateWorkspaceTrust(e: any): void;
        l(e: any): void;
        n(e: any): void;
        getElementsByName(e: any): any;
        updateElementsByName(e: any): void;
        o(): void;
        p(e: any): void;
        q(e: any, t: any): $;
        r(e: any): any;
        u(e: any, t: any): p;
        dispose(): void;
    };
};
declare function Ue(s: any): {
    tags: any[];
    extensionFilters: any[];
    featureFilters: any[];
    idFilters: any[];
    languageFilter: any;
    query: any;
};
declare const Fe: "usesOnlineServices";
declare class L extends N {
    constructor(e: any);
    c: boolean;
    f: any;
    onDidChangeTabbable: any;
    id: any;
    set tabbable(e: boolean);
    get tabbable(): boolean;
}
declare class $ extends L {
    constructor(e: any, t: any, i: any, n: any, r: any);
    set children(e: any[]);
    get children(): any[];
    h: any[];
    g: Set<any>;
    count: any;
    label: any;
    level: any;
    isFirstGroup: any;
    containsSetting(e: any): boolean;
}
declare var A: any;
import { $vd as N } from "../../../../base/common/lifecycle.js";
export { ie as $A0b, p as $B0b, R as $C0b, re as $D0b, ae as $E0b, fe as $F0b, O as $G0b, Ue as $H0b, Fe as $x0b, L as $y0b, $ as $z0b, A as SearchResultIdx };
//# sourceMappingURL=settingsTreeModels.d.ts.map