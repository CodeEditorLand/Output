export { l as $MCc };
declare let l: {
    new (e: any, t: any, n: any): {
        c: any;
        f: any;
        g: any;
        a: u;
        onDidChangeEnablement: any;
        b: u;
        onDidChangeResourceEnablement: any;
        isEnabled(): any;
        canToggleEnablement(): boolean;
        setEnablement(e: any): void;
        isResourceEnabled(e: any, t: any): any;
        isResourceEnablementConfigured(e: any): boolean;
        setResourceEnablement(e: any, t: any): void;
        getResourceSyncStateVersion(e: any): void;
        h(e: any, t: any): void;
        j(e: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as u } from "../../../base/common/event.js";
//# sourceMappingURL=userDataSyncEnablementService.d.ts.map