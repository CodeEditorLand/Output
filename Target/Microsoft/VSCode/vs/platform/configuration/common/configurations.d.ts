declare class N extends C {
    constructor(t: any);
    get configurationModel(): f;
    c: any;
    a: any;
    onDidChangeConfiguration: any;
    b: f;
    initialize(): Promise<f>;
    reload(): f;
    f(t: any, n: any): void;
    g(): {};
    h(): void;
    j(t: any, n: any): void;
}
declare class q {
    onDidChangeConfiguration: any;
    configurationModel: f;
    initialize(): Promise<f>;
}
declare let m: {
    new (t: any, n: any, o: any): {
        readonly configurationModel: f;
        f: any;
        g: any;
        h: any;
        a: any;
        onDidChangeConfiguration: any;
        c: f;
        b: any;
        initialize(): Promise<f>;
        j(t: any): Promise<any[]>;
        m(t: any): void;
        n(t: any, n: any): void;
        r(t: any): {};
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as C } from "../../../base/common/lifecycle.js";
import { $YA as f } from "./configurationModels.js";
export { N as $5A, q as $6A, m as $7A };
//# sourceMappingURL=configurations.d.ts.map