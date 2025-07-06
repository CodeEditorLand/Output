declare let a: {
    new (t: any, e: any, r: any, o: any): {
        a: any;
        b: any;
        c(t: any): void;
        f(): void;
        g(): void;
        q: h;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function y(s: any, t: any): {
    isRunning: any;
    passed: number;
    failed: number;
    runSoFar: number;
    totalWillBeRun: number;
    skipped: number;
};
declare function z({ isRunning: s, passed: t, runSoFar: e, totalWillBeRun: r, skipped: o, failed: i }: {
    isRunning: any;
    passed: any;
    runSoFar: any;
    totalWillBeRun: any;
    skipped: any;
    failed: any;
}): any;
import { $ud as h } from "../../../../base/common/lifecycle.js";
export { a as $Knc, y as $Lnc, z as $Mnc };
//# sourceMappingURL=testingProgressUiService.d.ts.map