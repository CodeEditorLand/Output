declare class q {
    constructor(t: any, i: any, e: any, s: any);
    startLineNumber: any;
    endLineNumber: any;
    top: any;
    height: any;
}
declare let b: {
    new (t: any, i: any, e: any): {
        r: any;
        s: any;
        c: any;
        onDidChangeStickyScroll: any;
        j: any;
        m: _ | null;
        n: any;
        f: any;
        h: any;
        g: any;
        t(): void;
        getVersionId(): any;
        u(): void;
        update(): Promise<void>;
        w(t: any): Promise<void>;
        getCandidateStickyLinesIntersecting(t: any): any;
        y(t: any, i: any, e: any, s: any, n: any, u: any): void;
        z(t: any): any;
        C(t: any): any;
        q: $;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $qf as _ } from "../../../../base/common/cancellation.js";
import { $ud as $ } from "../../../../base/common/lifecycle.js";
export { q as $aqb, b as $bqb };
//# sourceMappingURL=stickyScrollProvider.d.ts.map