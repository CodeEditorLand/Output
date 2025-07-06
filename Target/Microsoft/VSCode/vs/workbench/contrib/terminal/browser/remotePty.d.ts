export { c as $Urc };
declare let c: {
    new (t: any, e: any, r: any, n: any, i: any): {
        s: any;
        t: any;
        u: any;
        r: f;
        start(): Promise<any>;
        detach(t: any): Promise<any>;
        shutdown(t: any): void;
        input(t: any): void;
        sendSignal(t: any): void;
        processBinary(t: any): any;
        resize(t: any, e: any): void;
        clearBuffer(): Promise<void>;
        freePortKillProcess(t: any): any;
        acknowledgeDataEvent(t: any): void;
        setUnicodeVersion(t: any): Promise<any>;
        refreshProperty(t: any): Promise<any>;
        updateProperty(t: any, e: any): Promise<any>;
        handleOrphanQuestion(): void;
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
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Lh as f } from "../../../../base/common/async.js";
//# sourceMappingURL=remotePty.d.ts.map