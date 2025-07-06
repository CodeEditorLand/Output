declare class R extends Error {
    constructor(i: any, r: any);
    code: any;
}
declare const k: any;
declare let E: {
    new (i: any, r: any, s: any, o: any, t: any): {
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        b: any;
        onAddExtensions: any;
        c: any;
        onDidAddExtensions: any;
        f: any;
        onRemoveExtensions: any;
        g: any;
        onDidRemoveExtensions: any;
        h: $;
        scanProfileExtensions(i: any, r: any): Promise<any>;
        addExtensionsToProfile(i: any, r: any, s: any): Promise<any[]>;
        updateMetadata(i: any, r: any): Promise<any[]>;
        removeExtensionsFromProfile(i: any, r: any): Promise<void>;
        t(i: any, r: any, s: any): Promise<any>;
        u(i: any): void;
        w(i: any): any;
        y(i: any): any;
        C(): Promise<any[] | undefined>;
        z: Promise<any[] | undefined> | undefined;
        D(i: any): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var g: any;
import { $Ic as $ } from "../../../base/common/map.js";
export { R as $Lz, k as $Mz, E as $Nz, g as ExtensionsProfileScanningErrorCode };
//# sourceMappingURL=extensionsProfileScannerService.d.ts.map