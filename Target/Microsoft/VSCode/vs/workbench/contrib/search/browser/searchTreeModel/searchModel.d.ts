declare let w: {
    new (t: any, s: any, i: any, n: any, e: any, r: any): {
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        b: any;
        c: boolean;
        f: any;
        g: b | null;
        h: boolean;
        j: Promise<void>;
        m: any[];
        n: any[];
        r: any;
        onReplaceTermChanged: any;
        s: any;
        onSearchResultChanged: any;
        t: R | null;
        u: R | null;
        w: boolean;
        y: boolean;
        location: any;
        a: any;
        z: E;
        C: string;
        id(): string;
        getAITextResultProviderName(): Promise<any>;
        isReplaceActive(): boolean;
        replaceActive: any;
        readonly replacePattern: b | null;
        replaceString: any;
        preserveCase: boolean;
        readonly searchResult: any;
        aiSearch(t: any): any;
        L(t: any, s: any, i: any, n: any, e: any, r: any): {
            asyncResults: Promise<{
                results: any[];
                messages: any[];
                limitHit: any;
                exit: any;
                stats: any;
            }>;
            syncResults: any;
        };
        readonly hasAIResults: boolean;
        readonly hasPlainResults: boolean;
        search(t: any, s: any, i: any): {
            asyncResults: Promise<{
                results: any[];
                messages: any[];
                limitHit: any;
                exit: any;
                stats: any;
            }>;
            syncResults: any;
        };
        M(t: any, s: any, i: any, n: any): any;
        N(t: any, s: any, i: any): void;
        O(t: any, s: any, i?: boolean, n?: boolean): void;
        readonly P: any;
        cancelSearch(t?: boolean): boolean;
        cancelAISearch(t?: boolean): boolean;
        clearAiSearchResults(): void;
        dispose(): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let $: {
    new (t: any): {
        b: any;
        a: any;
        searchModel: any;
    };
};
import { $zbc as b } from "../../../../services/search/common/replace.js";
import { $qf as R } from "../../../../../base/common/cancellation.js";
import { $wf as E } from "../../../../../base/common/lazy.js";
export { w as $$cc, $ as $_cc };
//# sourceMappingURL=searchModel.d.ts.map