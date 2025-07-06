declare let h: {
    new (t: any, i: any, s: any): {
        readonly xterm: any;
        c: any;
        a: any;
        capabilities: l;
        b: Map<any, any>;
        readonly selection: any;
        hasSelection(): any;
        clearSelection(): void;
        focus(t: any): void;
        attachToElement(t: any, i: any): void;
        domElement: any;
        forceScrollbarVisibility(): void;
        resetScrollbarVisibility(): void;
        getContribution(t: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class j {
    constructor(t: any);
    processState: number;
    ptyProcessReady: Promise<void>;
    initialCwd: string;
    shouldPersist: boolean;
    hasWrittenData: boolean;
    hasChildProcesses: boolean;
    capabilities: l;
    shellIntegrationNonce: string;
}
import { $VYb as l } from "../../../../platform/terminal/common/capabilities/terminalCapabilityStore.js";
export { h as $qmc, j as $rmc };
//# sourceMappingURL=detachedTerminal.d.ts.map