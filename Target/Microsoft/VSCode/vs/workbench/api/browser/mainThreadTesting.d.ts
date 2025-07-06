export { R as $R3b };
declare let R: {
    new (e: any, t: any, s: any, r: any, n: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        b: any;
        c: Map<any, any>;
        a: any;
        $markTestRetired(e: any): void;
        $publishTestRunProfile(e: any): void;
        $updateTestRunConfig(e: any, t: any, s: any): void;
        $removeTestProfile(e: any, t: any): void;
        $addTestsToRun(e: any, t: any, s: any): void;
        $appendCoverage(e: any, t: any, s: any): void;
        $startedExtensionTestRun(e: any): void;
        $startedTestRunTask(e: any, t: any): void;
        $finishedTestRunTask(e: any, t: any): void;
        $finishedExtensionTestRun(e: any): void;
        $updateTestStateInRun(e: any, t: any, s: any, r: any, n: any): void;
        $appendOutputToRun(e: any, t: any, s: any, r: any, n: any): void;
        $appendTestMessagesInRun(e: any, t: any, s: any, r: any): void;
        $registerTestController(e: any, t: any, s: any): void;
        $updateController(e: any, t: any): void;
        $unregisterTestController(e: any): void;
        $subscribeToDiffs(): void;
        $unsubscribeFromDiffs(): void;
        $publishDiff(e: any, t: any): void;
        $runTests(e: any, t: any): Promise<any>;
        $getCoverageDetails(e: any, t: any, s: any, r: any): Promise<any>;
        dispose(): void;
        m(e: any, t: any): any;
        q: w;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as w } from "../../../base/common/lifecycle.js";
//# sourceMappingURL=mainThreadTesting.d.ts.map