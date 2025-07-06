declare const U: any;
declare let h: {
    new (t: any, e: any, o: any, c: any): {
        c: any;
        f: any;
        g: any;
        a: p;
        b: Set<any>;
        initializeUsageCache(): Promise<void>;
        hasUsedAuth(t: any): Promise<boolean>;
        readAccountUsages(t: any, e: any): any;
        removeAccountUsage(t: any, e: any): void;
        addAccountUsage(t: any, e: any, o: any, c: any, s: any): void;
        h(t: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Th as p } from "../../../../base/common/async.js";
export { U as $43b, h as $53b };
//# sourceMappingURL=authenticationMcpUsageService.d.ts.map