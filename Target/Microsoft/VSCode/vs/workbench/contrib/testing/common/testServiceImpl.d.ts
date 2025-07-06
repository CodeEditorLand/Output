export { P as $Qnc };
declare let P: {
    new (t: any, e: any, o: any, n: any, s: any, i: any, r: any, a: any, l: any, c: any): {
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        g: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        h: Set<any>;
        j: w;
        m: w;
        n: w;
        s: Set<any>;
        y: Map<any, any>;
        onWillProcessDiff: any;
        onDidProcessDiff: any;
        onDidCancelTestRun: any;
        collection: O;
        showInlineOutput: any;
        excluded: any;
        u: any;
        w: any;
        expandTest(t: any, e: any): Promise<void>;
        cancelTestRun(t: any, e: any): void;
        runTests(t: any, e?: any): Promise<any>;
        startContinuousRun(t: any, e: any): Promise<void>;
        runResolvedTests(t: any, e?: any): Promise<any>;
        provideTestFollowups(t: any, e: any): Promise<{
            followups: any[];
            dispose: () => void;
        }>;
        publishDiff(t: any, e: any): void;
        getTestController(t: any): any;
        syncTests(): Promise<void>;
        refreshTests(t: any): Promise<void>;
        cancelRefreshTests(): void;
        registerExtHost(t: any): any;
        getTestsRelatedToCode(t: any, e: any, o?: any): Promise<any[]>;
        registerTestController(t: any, e: any): any;
        getCodeRelatedToTest(t: any, e?: any): Promise<any>;
        I(): void;
        J(t: any, e?: any, o?: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as w } from "../../../../base/common/event.js";
import { $Pnc as O } from "./mainThreadTestCollection.js";
//# sourceMappingURL=testServiceImpl.d.ts.map