export { f as $Trc };
declare class f extends r {
    constructor(e: any, i: any);
    id: any;
    shouldPersist: any;
    a: {
        cwd: string;
        initialCwd: string;
        fixedDimensions: {
            cols: undefined;
            rows: undefined;
        };
        title: string;
        shellType: undefined;
        hasChildProcesses: boolean;
        resolvedShellLaunchConfig: {};
        overrideDimensions: undefined;
        failedShellIntegrationActivation: boolean;
        usedShellIntegrationInjection: undefined;
        shellIntegrationInjectionFailureReason: undefined;
    };
    b: {
        cols: number;
        rows: number;
    };
    c: boolean;
    f: any;
    onProcessData: any;
    g: any;
    onProcessReplayComplete: any;
    h: any;
    onProcessReady: any;
    j: any;
    onDidChangeProperty: any;
    m: any;
    onProcessExit: any;
    n: any;
    onRestoreCommands: any;
    getInitialCwd(): Promise<string>;
    getCwd(): Promise<string>;
    handleData(e: any): void;
    handleExit(e: any): void;
    handleReady(e: any): void;
    handleDidChangeProperty({ type: e, value: i }: {
        type: any;
        value: any;
    }): void;
    handleReplay(e: any): Promise<void>;
}
import { $vd as r } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=basePty.d.ts.map