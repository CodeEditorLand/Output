declare let g: {
    new (t: any, s: any, e: any, i: any): {
        b: any;
        c: any;
        f: any;
        g: any;
        a: boolean;
        h(): Promise<void>;
        j(t: any, s: any): void;
        m(t: any): any;
        n(t: any, s: any): {
            tasks: any[];
            taskNames: any[];
            locations: Map<any, any>;
        };
        r(t: any, s: any, e: any, i: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class l extends P {
    constructor();
    run(t: any): Promise<void>;
}
import { $KI as P } from "../../../../platform/actions/common/actions.js";
export { g as $$uc, l as $_uc };
//# sourceMappingURL=runAutomaticTasks.d.ts.map