declare const u: any;
declare let c: {
    new (e: any): {
        readonly snoozeTimeLeft: number;
        g: any;
        a: any;
        onDidChangeIsSnoozing: any;
        f: any;
        snooze(e?: any): void;
        setSnoozeDuration(e: any): void;
        c: any;
        isSnoozing(): boolean;
        cancelSnooze(): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    b: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class z extends p {
    constructor();
    run(e: any, ...n: any[]): Promise<void>;
    a(e: any, n: any): Promise<any>;
}
declare class g extends p {
    constructor();
    run(e: any): Promise<void>;
}
import { $KI as p } from "../../../platform/actions/common/actions.js";
export { u as $Plb, c as $Qlb, z as $Rlb, g as $Slb };
//# sourceMappingURL=inlineCompletionsService.d.ts.map