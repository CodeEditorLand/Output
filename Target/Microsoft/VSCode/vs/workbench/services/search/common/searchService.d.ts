export { P as $mBc };
declare let P: {
    new (e: any, t: any, s: any, i: any, a: any, c: any, l: any): {
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        z: any;
        a: Map<any, any>;
        b: Map<any, any>;
        f: Map<any, any>;
        g: Map<any, any>;
        h: Map<any, any>;
        j: Map<any, any>;
        m: Set<any>;
        registerSearchResultProvider(e: any, t: any, s: any): any;
        textSearch(e: any, t: any, s: any): Promise<{
            limitHit: any;
            results: any[];
            messages: any[];
        }>;
        aiTextSearch(e: any, t: any, s: any): Promise<any>;
        getAIName(): Promise<any>;
        textSearchSplitSyncAsync(e: any, t: any, s: any, i: any, a: any): {
            syncResults: {
                results: any;
                limitHit: boolean;
                messages: never[];
            };
            asyncResults: Promise<any>;
        };
        fileSearch(e: any, t: any): Promise<any>;
        schemeHasFileSearchProvider(e: any): boolean;
        C(e: any, t: any, s: any): Promise<any>;
        D(e: any): Set<any>;
        F(e: any, t: any): Promise<any>;
        G(e: any): Map<any, any>;
        H(e: any): Map<any, any>;
        I(e: any, t: any, s: any): Promise<any[]>;
        J(e: any): Map<any, any>;
        L(e: any, t: any, s: any, i: any): void;
        M(e: any): {
            results: S;
            limitHit: boolean;
        };
        N(e: any, t: any): any;
        clearCache(e: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Ic as S } from "../../../../base/common/map.js";
//# sourceMappingURL=searchService.d.ts.map