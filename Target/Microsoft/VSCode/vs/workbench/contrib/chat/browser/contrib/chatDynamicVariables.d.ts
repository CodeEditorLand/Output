declare const L: "chat-dynamic-variable";
declare let m: {
    new (e: any, t: any): {
        readonly variables: any[];
        readonly id: any;
        c: any;
        f: any;
        a: any[];
        b: any[];
        getInputState(): any[];
        setInputState(e: any): void;
        addReference(e: any): void;
        g(): void;
        h(e: any): f | undefined;
        j(): void;
        dispose(): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class g extends R {
    constructor();
    run(e: any, ...t: any[]): Promise<void>;
}
import { $Vj as f } from "../../../../../base/common/htmlContent.js";
import { $KI as R } from "../../../../../platform/actions/common/actions.js";
export { L as $VWb, m as $WWb, g as $XWb };
//# sourceMappingURL=chatDynamicVariables.d.ts.map