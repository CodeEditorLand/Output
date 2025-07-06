declare class N extends x {
    constructor(e: any, t: any, i: any, s: any, r: any);
    c: any;
    f: any;
    g: any;
    h: any;
    b: any;
    onDidChange: any;
    a: A;
    loadConfiguration(): Promise<u>;
    reparse(e: any): u;
    getRestrictedSettings(): any[];
}
declare class j {
    static parse(e: any, t: any): j;
    static E(e: any, t: any): u;
    constructor(e: any, t: any, i: any, s: any, r: any, n: any, h: any, d: any, o: any, c: any);
    j: any;
    l: any;
    m: any;
    n: any;
    p: any;
    q: any;
    r: any;
    s: any;
    t: any;
    u: any;
    h: any;
    i: w;
    v: any;
    getValue(e: any, t: any, i: any): any;
    updateValue(e: any, t: any, i?: {}): void;
    inspect(e: any, t: any, i: any): D;
    keys(e: any): {
        default: any;
        user: any;
        workspace: any;
        workspaceFolder: any;
    };
    updateDefaultConfiguration(e: any): void;
    updatePolicyConfiguration(e: any): void;
    updateApplicationConfiguration(e: any): void;
    updateLocalUserConfiguration(e: any): void;
    updateRemoteUserConfiguration(e: any): void;
    updateWorkspaceConfiguration(e: any): void;
    updateFolderConfiguration(e: any, t: any): void;
    deleteFolderConfiguration(e: any): void;
    compareAndUpdateDefaultConfiguration(e: any, t: any): {
        keys: any;
        overrides: any[][];
    };
    compareAndUpdatePolicyConfiguration(e: any): {
        keys: any[];
        overrides: never[];
    };
    compareAndUpdateApplicationConfiguration(e: any): {
        keys: any[];
        overrides: any[][];
    };
    compareAndUpdateLocalUserConfiguration(e: any): {
        keys: any[];
        overrides: any[][];
    };
    compareAndUpdateRemoteUserConfiguration(e: any): {
        keys: any[];
        overrides: any[][];
    };
    compareAndUpdateWorkspaceConfiguration(e: any): {
        keys: any[];
        overrides: any[][];
    };
    compareAndUpdateFolderConfiguration(e: any, t: any): {
        keys: any[];
        overrides: any[][];
    };
    compareAndDeleteFolderConfiguration(e: any): {
        keys: any[];
        overrides: any[][];
    };
    get defaults(): any;
    get applicationConfiguration(): any;
    get userConfiguration(): any;
    get localUserConfiguration(): any;
    get remoteUserConfiguration(): any;
    get workspaceConfiguration(): any;
    get folderConfigurations(): any;
    w(e: any, t: any, i: any): any;
    x({ resource: e }: {
        resource: any;
    }, t: any): any;
    y(): any;
    z(e: any): any;
    A(e: any, t: any): any;
    toData(): {
        defaults: {
            contents: any;
            overrides: any;
            keys: any;
        };
        policy: {
            contents: any;
            overrides: any;
            keys: any;
        };
        application: {
            contents: any;
            overrides: any;
            keys: any;
            raw: any;
        };
        userLocal: {
            contents: any;
            overrides: any;
            keys: any;
            raw: any;
        };
        userRemote: {
            contents: any;
            overrides: any;
            keys: any;
            raw: any;
        };
        workspace: {
            contents: any;
            overrides: any;
            keys: any;
        };
        folders: any;
    };
    allKeys(): any[];
    B(): any[];
    D(e: any): any[];
}
declare function J(...a: any[]): any;
declare class Z {
    constructor(e: any, t: any, i: any, s: any, r: any);
    change: any;
    f: any;
    g: any;
    h: any;
    i: any;
    a: string;
    b: number;
    c: number;
    affectedKeys: Set<any>;
    d: string;
    get previousConfiguration(): j | undefined;
    j: j | undefined;
    affectsConfiguration(e: any, t: any): boolean;
}
declare class u {
    static createEmptyModel(e: any): u;
    constructor(e: any, t: any, i: any, s: any, r: any);
    b: any;
    c: any;
    d: any;
    raw: any;
    f: any;
    a: Map<any, any>;
    get rawConfiguration(): u | this | undefined;
    g: u | this | undefined;
    get contents(): any;
    get overrides(): any;
    get keys(): any;
    isEmpty(): boolean;
    getValue(e: any): any;
    inspect(e: any, t: any): {
        readonly value: any;
        readonly override: any;
        readonly merged: any;
        readonly overrides: any;
    };
    getOverrideValue(e: any, t: any): any;
    getKeysForOverrideIdentifier(e: any): any;
    getAllOverrideIdentifiers(): any;
    override(e: any): any;
    merge(...e: any[]): u;
    h(e: any): u;
    i(e: any, t: any): void;
    j(e: any): null;
    toJSON(): {
        contents: any;
        overrides: any;
        keys: any;
    };
    addValue(e: any, t: any): void;
    setValue(e: any, t: any): void;
    removeValue(e: any): void;
    k(e: any, t: any, i: any): void;
}
declare class A {
    constructor(e: any, t: any);
    f: any;
    g: any;
    a: any;
    b: u | null;
    c: any[];
    d: any[];
    get configurationModel(): u;
    get restrictedConfigurations(): any[];
    get errors(): any[];
    parse(e: any, t: any): void;
    reparse(e: any): void;
    parseRaw(e: any, t: any): void;
    h(e: any): {};
    i(e: any, t: any): {
        contents: any;
        keys: string[];
        overrides: {
            identifiers: any;
            keys: string[];
            contents: any;
        }[];
        restricted: any;
        hasExcludedProperties: any;
    };
    j(e: any, t: any, i: any, s: any): any;
    l(e: any, t: any, i: any): any;
    m(e: any, t: any): {
        identifiers: any;
        keys: string[];
        contents: any;
    }[];
}
import { $vd as x } from "../../../base/common/lifecycle.js";
import { $Ic as w } from "../../../base/common/map.js";
declare class D {
    constructor(e: any, t: any, i: any, s: any, r: any, n: any, h: any, d: any, o: any, c: any, p: any, $: any, I: any);
    a: any;
    b: any;
    c: any;
    overrideIdentifiers: any;
    d: any;
    f: any;
    g: any;
    h: any;
    i: any;
    j: any;
    k: any;
    l: any;
    m: any;
    get value(): any;
    n(e: any): any;
    get q(): any;
    p: any;
    get defaultValue(): any;
    get default(): any;
    get s(): any;
    r: any;
    get policyValue(): any;
    get policy(): {
        value: any;
    } | undefined;
    get u(): any;
    t: any;
    get applicationValue(): any;
    get application(): any;
    get w(): any;
    v: any;
    get userValue(): any;
    get user(): any;
    get y(): any;
    x: any;
    get userLocalValue(): any;
    get userLocal(): any;
    get A(): any;
    z: any;
    get userRemoteValue(): any;
    get userRemote(): any;
    get D(): any;
    B: any;
    get workspaceValue(): any;
    get workspace(): any;
    get F(): any;
    E: any;
    get workspaceFolderValue(): any;
    get workspaceFolder(): any;
    get H(): any;
    G: any;
    get memoryValue(): any;
    get memory(): any;
}
export { N as $1A, j as $2A, J as $3A, Z as $4A, u as $YA, A as $ZA };
//# sourceMappingURL=configurationModels.d.ts.map