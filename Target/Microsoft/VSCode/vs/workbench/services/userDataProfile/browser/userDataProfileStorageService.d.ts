export { a as $PCc };
declare let a: {
    new (t: any, r: any, i: any): {
        j: any;
        m: any;
        h: any;
        onDidChange: any;
        n(): void;
        r(t: any): void;
        g(t: any): Promise<c | {
            hasPendingUpdate: boolean;
            name: string;
            clear(): Promise<void>;
            dispose(): void;
            onDidChangeItemsExternal: any;
            a: Map<any, any>;
            getItems(): Promise<Map<any, any>>;
            updateItems(t: any): Promise<void>;
            optimize(): Promise<void>;
            close(): Promise<void>;
        }>;
        b: any;
        a: any;
        readStorageData(e: any): Promise<any>;
        updateStorageData(e: any, t: any, s: any): Promise<any>;
        withProfileScopedStorageService(e: any, t: any): Promise<any>;
        c(e: any): Map<any, any>;
        f(e: any, t: any, s: any): void;
        q: j;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $LAc as c } from "../../storage/browser/storageService.js";
import { $ud as j } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=userDataProfileStorageService.d.ts.map