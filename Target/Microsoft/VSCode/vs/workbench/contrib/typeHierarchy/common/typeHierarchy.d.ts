declare const C: b;
declare class u {
    static create(t: any, e: any, r: any): Promise<u | undefined>;
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
        provideSupertypes(t: any, e: any): Promise<any>;
        provideSubtypes(t: any, e: any): Promise<any>;
    };
    provideSupertypes(t: any, e: any): Promise<any>;
    provideSubtypes(t: any, e: any): Promise<any>;
}
declare var h: any;
import { $$M as b } from "../../../../editor/common/languageFeatureRegistry.js";
export { C as $KX, u as $LX, h as TypeHierarchyDirection };
//# sourceMappingURL=typeHierarchy.d.ts.map