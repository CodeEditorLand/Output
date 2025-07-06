declare class y extends p {
    n: any[];
    p: boolean;
    q: p;
    r: h;
    s: h;
    get folders(): any[];
    get transient(): boolean;
    get settingsModel(): h;
    get launchModel(): h;
    get tasksModel(): h;
    reparseWorkspaceSettings(t: any): void;
    getRestrictedWorkspaceSettings(): any[];
    u(t: any, s: any): h;
}
declare class V extends p {
    constructor(t: any, s: any, r: any);
    n: any;
    i(t: any, s: any): {
        contents: any;
        keys: string[];
        overrides: never[];
    };
}
declare class b extends m {
    constructor(t: any, s: any, r: any, o: any, u: any, e: any, n: any, c: any, a: any, i: any, l: any);
    a: any;
    getValue(t: any, s?: {}): any;
    inspect(t: any, s?: {}): {
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
        readonly value: any;
        n(e: any): any;
        readonly q: any;
        p: any;
        readonly defaultValue: any;
        readonly default: any;
        readonly s: any;
        r: any;
        readonly policyValue: any;
        readonly policy: {
            value: any;
        } | undefined;
        readonly u: any;
        t: any;
        readonly applicationValue: any;
        readonly application: any;
        readonly w: any;
        v: any;
        readonly userValue: any;
        readonly user: any;
        readonly y: any;
        x: any;
        readonly userLocalValue: any;
        readonly userLocal: any;
        readonly A: any;
        z: any;
        readonly userRemoteValue: any;
        readonly userRemote: any;
        readonly D: any;
        B: any;
        readonly workspaceValue: any;
        readonly workspace: any;
        readonly F: any;
        E: any;
        readonly workspaceFolderValue: any;
        readonly workspaceFolder: any;
        readonly H: any;
        G: any;
        readonly memoryValue: any;
        readonly memory: any;
    };
    keys(): {
        default: any;
        user: any;
        workspace: any;
        workspaceFolder: any;
    };
    compare(t: any): {
        keys: any[];
        overrides: any[][];
    };
}
import { $ZA as p } from "../../../../platform/configuration/common/configurationModels.js";
import { $YA as h } from "../../../../platform/configuration/common/configurationModels.js";
import { $2A as m } from "../../../../platform/configuration/common/configurationModels.js";
export { y as $wAc, V as $xAc, b as $yAc };
//# sourceMappingURL=configurationModels.d.ts.map