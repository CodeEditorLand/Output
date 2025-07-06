declare let M: {
    new (e: any, t: any, n: any, l: any, r: any, i: any, u: any): {
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        a: any;
        b: any;
        s(): any;
        t(): any;
        u(e: any): Promise<void>;
        q: D;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class de extends S {
    constructor(...args: any[]);
    kind: string;
    isFile: boolean;
    a: boolean;
    b: any;
    onDidChangeValue: any;
    f: boolean;
    get id(): "vscode.implicit.file" | "vscode.implicit.selection" | "vscode.implicit.viewport" | "vscode.implicit";
    get name(): string;
    get modelDescription(): "User's active file" | "User's active selection" | "User's current visible code";
    get isSelection(): boolean;
    get value(): any;
    set enabled(e: boolean);
    get enabled(): boolean;
    setValue(e: any, t: any, n: any): void;
    c: any;
    toBaseEntries(): {
        kind: string;
        id: string;
        name: string;
        value: any;
        modelDescription: string;
    }[];
}
import { $ud as D } from "../../../../../base/common/lifecycle.js";
import { $vd as S } from "../../../../../base/common/lifecycle.js";
export { M as $3Mb, de as $4Mb };
//# sourceMappingURL=chatImplicitContext.d.ts.map