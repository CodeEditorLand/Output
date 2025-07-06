declare let x: {
    new (e: any, r: any, t: any, o: any, s: any, i: any, c: any, m: any): {
        y: any;
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
            results: import("../../../../base/common/map.js").$Ic;
            limitHit: boolean;
        };
        N(e: any, t: any): any;
        clearCache(e: any): Promise<void>;
        q: R;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let y: {
    new (e: any, r: any): {
        g: any;
        h: any;
        b: E;
        onDidReceiveTextSearchMatch: any;
        f: number;
        a: any;
        getAIName(): Promise<void>;
        sendTextSearchMatch(e: any, r: any): void;
        readonly j: any;
        m(e: any): Promise<void>;
        textSearch(e: any, r: any, t: any): Promise<{
            messages: never[];
            results: any[];
            limitHit: boolean;
        } | {
            results: never[];
            messages: {
                text: any;
                type: any;
            }[];
            limitHit?: never;
        }>;
        fileSearch(e: any, r: any): Promise<{
            messages: never[];
            results: any[];
            limitHit: boolean;
        } | {
            results: never[];
            messages: {
                text: any;
                type: any;
            }[];
            limitHit?: never;
        }>;
        clearCache(e: any): Promise<void>;
        n(): any;
        q: R;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as R } from "../../../../base/common/lifecycle.js";
import { $ef as E } from "../../../../base/common/event.js";
export { x as $oBc, y as $pBc };
//# sourceMappingURL=searchService.d.ts.map