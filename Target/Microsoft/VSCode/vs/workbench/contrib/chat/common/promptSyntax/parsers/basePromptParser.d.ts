declare class T {
    constructor(e: any, t: any);
    uri: any;
    token: any;
    get linkRange(): import("../../../../../../editor/common/core/range.js").$eC | undefined;
    get type(): "file" | undefined;
    get subtype(): "markdown" | "prompt" | undefined;
    get range(): any;
    get path(): any;
    get text(): any;
    toString(): string;
}
declare let $: {
    new (e: any, t: any, i: any, n: any, r: any): {
        readonly tokens: any[];
        readonly header: p | c | A | undefined;
        getBody(): Promise<any>;
        onSettled(e: any): any;
        readonly errorCondition: I | undefined;
        readonly resolveFailed: boolean | undefined;
        settled(): Promise<any>;
        r: any;
        s: any;
        t: any;
        u: any;
        c: any[];
        f: any[];
        h: any;
        onUpdate: any;
        j: any;
        n: q;
        G: boolean;
        b: any;
        y(e: any): void;
        m: I | undefined;
        w: any;
        z(e: any): void;
        g: p | c | A | undefined;
        C(e: any): /*elided*/ any;
        D(e: any, t: any): /*elided*/ any;
        F(): void;
        start(e: any): /*elided*/ any;
        readonly uri: any;
        readonly references: any[];
        readonly metadata: {
            promptType: any;
        } | {
            description: any;
            tools: any;
            mode: any;
            model: any;
            promptType: any;
        } | null;
        readonly topError: R | undefined;
        toString(): string;
        dispose(): void;
        a: any;
        readonly isDisposed: any;
        onDispose(s: any): any;
        addDisposables(...s: any[]): /*elided*/ any;
        assertNotDisposed(s: any): void;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $sR as p } from "./promptHeader/modeHeader.js";
import { $xR as c } from "./promptHeader/instructionsHeader.js";
import { $vR as A } from "./promptHeader/promptHeader.js";
import { $UR as I } from "../../promptFileReferenceErrors.js";
declare class q extends D {
    constructor(...args: any[]);
    f: boolean;
    get gotFirstResult(): boolean;
    get promise(): Promise<any>;
    end(): void;
}
import { $1R as R } from "./topError.js";
import { $$h as D } from "../../../../../../base/common/async.js";
export { T as $AS, $ as $zS };
//# sourceMappingURL=basePromptParser.d.ts.map