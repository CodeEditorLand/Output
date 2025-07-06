declare let v: {
    new (t: any, e: any, i: any, n: any, s: any, r: any, a: any, h: any, j: any, b: any, I: any): {
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        c: f;
        d: Promise<any>[];
        f: A;
        g: any;
        h: any;
        dispose(): void;
        isEnabled(t: any): boolean;
        updateEnablement(t: any, e: any): void;
        updateUsageTimestamp(t: any): void;
        q(): Promise<any[]>;
        getSnippetFiles(): Promise<Generator<any, void, unknown>>;
        getSnippets(t: any, e: any): Promise<any[]>;
        getSnippetsSync(t: any, e: any): any[];
        r(t: any, e: any): any[];
        s(t: any, e: any): 0 | 1 | -1;
        t(): void;
        u(): void;
        v(t: any, e: any): Promise<void>;
        w(): Promise<void>;
        x(t: any, e: any, i: any): Promise<void>;
        y(t: any, e: any): {
            dispose: () => boolean;
        };
    };
};
declare function wt(o: any, t: any): any;
import { $ud as f } from "../../../../base/common/lifecycle.js";
import { $Ic as A } from "../../../../base/common/map.js";
export { v as $UFb, wt as $VFb };
//# sourceMappingURL=snippetsService.d.ts.map