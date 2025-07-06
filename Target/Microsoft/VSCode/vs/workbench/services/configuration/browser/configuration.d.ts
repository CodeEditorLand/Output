declare class C extends Y {
    constructor(t: any, i: any, s: any);
    t: any;
    m: any;
    n: {};
    r: {
        type: string;
        key: string;
    };
    s: boolean;
    hasCachedConfigurationDefaultsOverrides(): boolean;
    y(): Promise<void>;
    w: Promise<void> | undefined;
    C(): Promise<void>;
}
declare class gt extends B {
    constructor(t: any, i: any, s: any, e: any);
    j: any;
    onDidChangeConfiguration: any;
    m: any;
    initialize(): Promise<g>;
}
declare class lt extends f {
    constructor(t: any, i: any, s: any, e: any, r: any, n: any, o: any);
    get hasTasksLoaded(): boolean;
    g: any;
    h: any;
    j: any;
    m: any;
    n: any;
    r: any;
    s: any;
    a: any;
    onDidChangeConfiguration: any;
    b: any;
    c: any;
    f: any;
    reset(t: any, i: any, s: any, e: any): Promise<g>;
    t(t: any): Promise<g>;
    initialize(): Promise<any>;
    reload(t: any): Promise<any>;
    reparse(t: any): any;
    getRestrictedSettings(): any;
}
declare class dt extends f {
    constructor(t: any, i: any, s: any, e: any, r: any, n: any);
    f: any;
    g: any;
    onDidChangeConfiguration: any;
    h: any;
    onDidInitialize: any;
    b: any;
    c: H;
    a: H;
    initialize(): Promise<g>;
    reload(): Promise<g>;
    reparse(): g;
    getRestrictedSettings(): any[];
    j(t: any): void;
    m(): Promise<void>;
}
declare class pt extends f {
    constructor(t: any, i: any, s: any, e: any);
    get initialized(): boolean;
    m: any;
    n: any;
    r: any;
    s: any;
    c: any;
    f: any;
    g: boolean;
    h: any;
    onDidUpdateConfiguration: any;
    j: boolean;
    b: X;
    a: X;
    initialize(t: any, i: any): Promise<void>;
    reload(): Promise<void>;
    getFolders(): any[];
    setFolders(t: any, i: any): any;
    isTransient(): boolean;
    getConfiguration(): g;
    updateWorkspaceTrust(t: any): g;
    reparseWorkspaceSettings(): g;
    getRestrictedSettings(): any[];
    t(t: any): Promise<void>;
    u(t: any): void;
    w(): boolean;
    y(t: any, i: any): Promise<void>;
    z(): Promise<void>;
}
declare class Ct extends f {
    constructor(t: any, i: any, s: any, e: any, r: any, n: any, o: any, h: any, l: any);
    workspaceFolder: any;
    h: any;
    j: any;
    m: any;
    a: any;
    onDidChange: any;
    c: number[];
    f: any;
    g: Z;
    b: any;
    loadConfiguration(): any;
    updateWorkspaceTrust(t: any): any;
    reparse(): any;
    getRestrictedSettings(): any;
    n(): boolean;
    r(): void;
    s(t: any, i: any, s: any): y;
    t(): Promise<void>;
}
import { $5A as Y } from "../../../../platform/configuration/common/configurations.js";
import { $1A as B } from "../../../../platform/configuration/common/configurationModels.js";
import { $YA as g } from "../../../../platform/configuration/common/configurationModels.js";
import { $vd as f } from "../../../../base/common/lifecycle.js";
declare class H extends f {
    constructor(t: any, i: any, s: any, e: any);
    h: any;
    a: any;
    onDidChange: any;
    b: {
        type: string;
        key: any;
    };
    c: b;
    f: any;
    g: g;
    getConfigurationModel(): g;
    initialize(): Promise<g>;
    reparse(t: any): g;
    getRestrictedSettings(): any[];
    reload(): Promise<g>;
    updateConfiguration(t: any): Promise<any>;
}
declare class X {
    constructor(t: any, i: any);
    a: any;
    b: any;
    onDidChange: any;
    workspaceConfigurationModelParser: m;
    workspaceSettings: g;
    load(t: any, i: any): Promise<void>;
    get workspaceIdentifier(): null;
    getConfigurationModel(): g;
    getFolders(): any[];
    isTransient(): boolean;
    getWorkspaceSettings(): g;
    reparseWorkspaceSettings(t: any): g;
    getRestrictedSettings(): any[];
    c(): void;
    updateWorkspace(t: any, i: any): Promise<void>;
    d(t: any): {
        type: string;
        key: any;
    };
}
declare class Z {
    constructor(t: any, i: any, s: any, e: any, r: any);
    g: any;
    h: any;
    onDidChange: any;
    f: {
        type: string;
        key: any;
    };
    a: b;
    b: any;
    c: any[];
    d: g;
    loadConfiguration(): Promise<g>;
    updateConfiguration(t: any, i: any): Promise<void>;
    getRestrictedSettings(): any[];
    reparse(t: any): g;
    i(): void;
    getUnsupportedKeys(): never[];
}
declare class y extends f {
    constructor(t: any, i: any, s: any, e: any, r: any, n: any, o: any);
    j: any;
    m: any;
    n: any;
    r: any;
    s: any;
    h: any;
    onDidChange: any;
    a: any[];
    b: b;
    c: any;
    f: any[];
    g: g;
    resolveContents(t: any): Promise<any[]>;
    loadConfiguration(t: any): Promise<g>;
    getRestrictedSettings(): any[];
    reparse(t: any): g;
    t(t: any): void;
    u(t: any): boolean;
    w(t: any): boolean;
}
import { $ZA as b } from "../../../../platform/configuration/common/configurationModels.js";
import { $wAc as m } from "../common/configurationModels.js";
export { C as $BAc, gt as $CAc, lt as $DAc, dt as $EAc, pt as $FAc, Ct as $GAc };
//# sourceMappingURL=configuration.d.ts.map