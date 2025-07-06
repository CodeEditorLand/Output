declare let $: {
    new (e: any, t: any, o: any, i: any, r: any, s: any, n: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        listFiles(e: any, t: any, o: any): Promise<any[]>;
        m(e: any, t: any): Promise<any[]>;
        getCopilotInstructionsFiles(e: any): Promise<any[]>;
        createFilesUpdatedEvent(e: any): {
            event: any;
            dispose: () => void;
        };
        getConfigBasedSourceFolders(e: any): any[];
        n(e: any, t: any): Promise<any[]>;
        s(e: any): ({
            parent: any;
            filePattern?: never;
        } | {
            parent: any;
            filePattern: any;
        })[];
        t(e: any): any[];
        u(e: any, t: any): Promise<any[]>;
        w(e: any, t: any, o: any): Promise<any>;
        q: w;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function b(c: any): boolean;
import { $ud as w } from "../../../../../../base/common/lifecycle.js";
export { $ as $cfc, b as $dfc };
//# sourceMappingURL=promptFilesLocator.d.ts.map