export { $ as $Tpc };
declare let $: {
    new (t: any, e: any, i: any, s: any, r: any, o: any, f: any, l: any, p: any, d: any, m: any, n: any, a: any): {
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        g: Map<any, any>;
        m: D;
        n: D;
        r: any[];
        t: Set<any>;
        u: any[];
        y: Set<any>;
        f: any[];
        b: any[];
        h: any;
        j: any;
        Q(): void;
        R(): void;
        S(): void;
        registerDebugAdapterFactory(t: any, e: any): {
            dispose: () => void;
        };
        hasEnabledDebuggers(): boolean;
        createDebugAdapter(t: any): any;
        substituteVariables(t: any, e: any, i: any): any;
        runInTerminal(t: any, e: any, i: any): any;
        registerDebugAdapterDescriptorFactory(t: any): {
            dispose: () => void;
        };
        unregisterDebugAdapterDescriptorFactory(t: any): void;
        getDebugAdapterDescriptor(t: any): any;
        getDebuggerLabel(t: any): any;
        readonly onDidRegisterDebugger: any;
        readonly onDidDebuggersExtPointRead: any;
        canSetBreakpointsIn(t: any): boolean;
        getDebugger(t: any): any;
        getEnabledDebugger(t: any): any;
        someDebuggerInterestedInLanguage(t: any): boolean;
        guessDebugger(t: any): Promise<any>;
        U(): void;
        w: Set<any> | undefined;
        activateDebuggers(t: any, e: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as D } from "../../../../base/common/event.js";
//# sourceMappingURL=debugAdapterManager.d.ts.map