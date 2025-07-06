export { f as $Vsc };
declare let f: {
    new (i: any, t: any, n: any, s: any, e: any): {
        c: any;
        f: any;
        id: string;
        options: {
            type: string;
            language: string;
            id: string;
        };
        verbositySettingKey: string;
        b: l;
        onDidRequestClearLastProvider: any;
        a: any;
        onClose(): void;
        provideContent(): any;
        getSymbols(): {
            label: any;
            lineNumber: any;
        }[];
        g(): ({
            command: any;
            lineNumber: any;
            exitCode: any;
        } | {
            command: any;
            lineNumber: any;
            exitCode?: never;
        })[] | undefined;
        h(i: any): any;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as l } from "../../../../../base/common/event.js";
//# sourceMappingURL=terminalAccessibleBufferProvider.d.ts.map