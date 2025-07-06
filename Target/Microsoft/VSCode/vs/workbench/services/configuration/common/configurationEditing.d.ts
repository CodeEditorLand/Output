declare let D: {
    new (s: any, e: any, t: any, l: any, r: any, i: any, u: any, f: any, y: any, k: any, o: any, A: any, _: any): {
        b: any;
        c: any;
        d: any;
        e: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        a: $;
        writeConfiguration(s: any, e: any, t?: {}): Promise<any>;
        o(s: any, e: any): Promise<void>;
        p(s: any, e: any, t: any, l: any): Promise<void>;
        q(s: any, e: any): Promise<void>;
        r(s: any, e: any): boolean;
        s({ value: s, jsonPath: e }: {
            value: any;
            jsonPath: any;
        }, t: any, l: any): {
            offset: any;
            length: number;
            content: any;
        }[] | {
            content: string;
            length: any;
            offset: number;
        }[];
        t(s: any): {
            insertSpaces: any;
            tabSize: any;
            eol: any;
        };
        u(s: any, e: any, t: any): Promise<void>;
        v(s: any, e: any): void;
        w(s: any, e: any, t: any): void;
        x(s: any): void;
        y(s: any): void;
        z(s: any, e: any, t: any): F;
        A(s: any, e: any, t: any): any;
        B(s: any): any;
        C(s: any): "{}" | "{\n\t\"version\": \"2.0.0\",\n\t\"tasks\": []\n}";
        D(s: any): Promise<any>;
        E(s: any, e: any): boolean;
        F(s: any, e: any, t: any, l: any): Promise<void>;
        G(s: any, e: any, t: any): {
            key: any;
            jsonPath: any[];
            value: any;
            resource: any;
            workspaceStandAloneConfigurationKey: string;
            target: any;
        } | {
            key: any;
            jsonPath: any[];
            value: any;
            resource: any;
            target: any;
            workspaceStandAloneConfigurationKey?: never;
        };
        H(s: any): boolean;
        I(s: any, e: any, t: any, l: any, r: any): any;
    };
};
declare class F extends X {
    constructor(s: any, e: any);
    code: any;
}
declare var E: any;
declare var K: any;
import { $Th as $ } from "../../../../base/common/async.js";
import { $Ab as X } from "../../../../base/common/errors.js";
export { D as $AAc, F as $zAc, E as ConfigurationEditingErrorCode, K as EditableConfigurationTarget };
//# sourceMappingURL=configurationEditing.d.ts.map