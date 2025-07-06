declare function j(r: any, t: any): any;
declare class X extends l {
    constructor(t: any, i: any, e: any, s: any, h: any, n: any, u: any);
    f: any;
    g: any;
    h: any;
    j: any;
    m: any;
    n: any;
    r: any;
    a: Promise<void>;
    s(): Promise<void>;
    t(t: any): void;
    b: any;
    c: any;
    supportsExtensionGalleryResources(): Promise<boolean>;
    getExtensionGalleryResourceURL({ publisher: t, name: i, version: e, targetPlatform: s }: {
        publisher: any;
        name: any;
        version: any;
        targetPlatform: any;
    }, h: any): Promise<{
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined>;
    isExtensionGalleryResource(t: any): Promise<boolean>;
    u(): Promise<{
        "X-Client-Name": string;
        "X-Client-Version": any;
    }>;
    y(): Promise<any>;
    w: Promise<any> | undefined;
    z(t: any): any;
    C(t: any): any;
}
declare const S: any;
import { $vd as l } from "../../../base/common/lifecycle.js";
export { j as $Aub, X as $Bub, S as $zub };
//# sourceMappingURL=extensionResourceLoader.d.ts.map