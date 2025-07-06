export { z as $Ntc };
declare let z: {
    new (e: any, t: any, i: any, s: any, n: any, o: any, r: any, l: any, c: any, f: any, d: any): {
        m: any;
        n: any;
        q: any;
        s: any;
        t: any;
        u: any;
        w: any;
        z: any;
        b: Map<any, any>;
        c: any[];
        h: any[];
        j: Map<any, any>;
        B(e: any, t: any, i?: boolean): any;
        C(e: any): Promise<void>;
        openRecentLink(e: any): Promise<any>;
        getLinks(): Promise<{
            viewport: {
                wordLinks: never[];
                webLinks: never[];
                fileLinks: never[];
                folderLinks: never[];
            };
            all: Promise<{
                wordLinks: never[];
                webLinks: never[];
                fileLinks: never[];
                folderLinks: never[];
            }>;
        }>;
        D(e: any): Promise<{
            wordLinks: any[] | undefined;
            webLinks: any;
            fileLinks: any;
            folderLinks: any;
        }>;
        F(e: any, t: any): Promise<any>;
        G(e: any, t: any, i: any, s: any): void;
        H(e: any, t: any, i: any, s: any, n: any): any;
        setWidgetManager(e: any): void;
        a: any;
        I(): void;
        J(): void;
        L(e: any): any;
        M(e: any, t: any): H;
        f: Set<any>;
        g: boolean;
        dispose(): void;
        readonly isDisposed: boolean;
        clear(): void;
        add(t: any): any;
        delete(t: any): void;
        deleteAndLeak(t: any): void;
    };
    DISABLE_DISPOSED_WARNING: boolean | undefined;
};
import { $Vj as H } from "../../../../../base/common/htmlContent.js";
//# sourceMappingURL=terminalLinkManager.d.ts.map