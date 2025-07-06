declare const a: {
    QuickFix: s;
    Refactor: s;
    RefactorExtract: s;
    RefactorInline: s;
    RefactorMove: s;
    RefactorRewrite: s;
    Notebook: s;
    Source: s;
    SourceOrganizeImports: s;
    SourceFixAll: s;
    SurroundWith: s;
};
declare function h(e: any, t: any): boolean;
declare function d(e: any, t: any): boolean;
declare class n {
    static fromUser(t: any, i: any): n;
    static a(t: any, i: any): any;
    static b(t: any, i: any): any;
    static c(t: any): any;
    constructor(t: any, i: any, r: any);
    kind: any;
    apply: any;
    preferred: any;
}
declare class x {
    constructor(t: any, i: any, r: any);
    action: any;
    provider: any;
    highlightRange: any;
    resolve(t: any): Promise<this>;
}
declare var o: any;
declare var c: any;
import { $$C as s } from "../../../../base/common/hierarchicalKind.js";
export { a as $iib, h as $jib, d as $kib, n as $lib, x as $mib, o as CodeActionAutoApply, c as CodeActionTriggerSource };
//# sourceMappingURL=types.d.ts.map