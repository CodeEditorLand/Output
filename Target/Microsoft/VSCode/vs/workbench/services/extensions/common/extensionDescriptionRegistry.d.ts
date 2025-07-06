declare class A {
    constructor(t: any, e: any);
    versionId: any;
    removedDueToLooping: any;
}
declare class u extends m {
    static isHostExtension(t: any, e: any, i: any): boolean;
    static s(t: any): any[];
    constructor(t: any, e: any);
    n: any;
    c: any;
    onDidChange: any;
    f: number;
    g: any;
    r(): void;
    h: l | undefined;
    j: any[] | undefined;
    m: Map<any, any> | undefined;
    set(t: any): {
        versionId: number;
    };
    deltaExtensions(t: any, e: any): A;
    containsActivationEvent(t: any): boolean;
    containsExtension(t: any): boolean;
    getExtensionDescriptionsForActivationEvent(t: any): any;
    getAllExtensionDescriptions(): any[];
    getSnapshot(): U;
    getExtensionDescription(t: any): any;
    getExtensionDescriptionByUUID(t: any): any;
    getExtensionDescriptionByIdOrUUID(t: any, e: any): any;
}
declare class U {
    constructor(t: any, e: any);
    versionId: any;
    extensions: any;
}
declare class k {
    constructor(t: any);
    d: $;
    c: u;
    acquireLock(t: any): Promise<y>;
    deltaExtensions(t: any, e: any, i: any): A;
    containsActivationEvent(t: any): boolean;
    containsExtension(t: any): boolean;
    getExtensionDescriptionsForActivationEvent(t: any): any;
    getAllExtensionDescriptions(): any[];
    getSnapshot(): U;
    getExtensionDescription(t: any): any;
    getExtensionDescriptionByUUID(t: any): any;
    getExtensionDescriptionByIdOrUUID(t: any, e: any): any;
}
declare class y extends m {
    constructor(t: any, e: any);
    f: any;
    c: boolean;
    isAcquiredFor(t: any): boolean;
}
import { $vd as m } from "../../../../base/common/lifecycle.js";
import { $Uy as l } from "../../../../platform/extensions/common/extensions.js";
declare class $ {
    c: any[];
    d: boolean;
    acquire(t: any): Promise<any>;
    e(): void;
}
export { A as $HBc, u as $IBc, U as $JBc, k as $KBc, y as $LBc };
//# sourceMappingURL=extensionDescriptionRegistry.d.ts.map