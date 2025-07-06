declare const E: any;
declare let l: {
    new (e: any, t: any): {
        b: any;
        a: any;
        readStorageData(e: any): Promise<any>;
        updateStorageData(e: any, t: any, s: any): Promise<any>;
        withProfileScopedStorageService(e: any, t: any): Promise<any>;
        c(e: any): Map<any, any>;
        f(e: any, t: any, s: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const I_base: {
    new (e: any, t: any): {
        b: any;
        a: any;
        readStorageData(e: any): Promise<any>;
        updateStorageData(e: any, t: any, s: any): Promise<any>;
        withProfileScopedStorageService(e: any, t: any): Promise<any>;
        c(e: any): Map<any, any>;
        f(e: any, t: any, s: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class I extends I_base {
    constructor(e: any, t: any, s: any, r: any, i: any);
    j: any;
    h: any;
    onDidChange: any;
    g(e: any): Promise<b | x>;
}
import { $$x as b } from "../../storage/common/storageIpc.js";
import { $_x as x } from "../../storage/common/storageIpc.js";
export { E as $7z, l as $8z, I as $9z };
//# sourceMappingURL=userDataProfileStorageService.d.ts.map