declare class f {
    constructor(t: any, i: any, e: any);
    kind: any;
    name: any;
    description: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get id(): any;
    toJSON(): {
        id: any;
        name: any;
        description: any;
        kind: any;
    };
}
declare class g {
    constructor(t: any);
    get description(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get customTools(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get model(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get body(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get uri(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    kind: any;
    id: any;
    name: any;
    a: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    b: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    e: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    c: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    d: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    updateData(t: any): void;
    toJSON(): {
        id: any;
        name: any;
        description: any;
        kind: any;
        customTools: any;
        model: any;
        body: any;
        uri: any;
    };
}
declare const V: any;
declare let p: {
    new (t: any, i: any, e: any, r: any, o: any): {
        g: any;
        h: any;
        j: any;
        m: any;
        c: Map<any, any>;
        f: A;
        onDidChangeChatModes: any;
        b: any;
        n(): void;
        r(t: any): void;
        s(): void;
        t(t: any): Promise<void>;
        getModes(): {
            builtin: any[];
            custom: any[];
        };
        u(): any[];
        findModeById(t: any): any;
        findModeByName(t: any): any;
        w(): any[];
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function X(s: any): boolean;
declare var d: any;
import { $ef as A } from "../../../../base/common/event.js";
export { f as $$Db, g as $0Db, V as $8Db, p as $9Db, X as $_Db, d as ChatMode };
//# sourceMappingURL=chatModes.d.ts.map