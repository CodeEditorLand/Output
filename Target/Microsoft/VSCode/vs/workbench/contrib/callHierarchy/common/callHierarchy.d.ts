declare const b: x;
declare class m {
    static create(t: any, e: any, r: any): Promise<m | undefined>;
    constructor(t: any, e: any, r: any, n: any);
    id: any;
    provider: any;
    roots: any;
    ref: any;
    root: any;
    dispose(): void;
    fork(t: any): {
        id: any;
        provider: any;
        roots: any;
        ref: any;
        root: any;
        dispose(): void;
        fork(t: any): /*elided*/ any;
        resolveIncomingCalls(t: any, e: any): Promise<any>;
        resolveOutgoingCalls(t: any, e: any): Promise<any>;
    };
    resolveIncomingCalls(t: any, e: any): Promise<any>;
    resolveOutgoingCalls(t: any, e: any): Promise<any>;
}
declare var C: any;
import { $$M as x } from "../../../../editor/common/languageFeatureRegistry.js";
export { b as $_M, m as $aN, C as CallHierarchyDirection };
//# sourceMappingURL=callHierarchy.d.ts.map