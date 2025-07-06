declare class D {
    constructor(t: any);
    c: any;
    d(): boolean;
}
declare class A {
    static checkAndRunFormatCodeAction(t: any, e: any, i: any, o: any): Promise<boolean>;
    static applyOnSaveGenericCodeActions(t: any, e: any, i: any, o: any, r: any, n: any): Promise<void>;
    static applyOnSaveFormatCodeAction(t: any, e: any, i: any, o: any, r: any, n: any, d: any): Promise<boolean>;
    static getActionsToRun(t: any, e: any, i: any, o: any, r: any, n: any): Promise<{
        documentation: any;
        allActions: any[];
        validActions: any[];
        readonly hasAutoFix: boolean;
        readonly hasAIFix: boolean;
        readonly allAIFixes: boolean;
        q: w;
        dispose(): void;
        B(t: any): any;
    }>;
}
declare let j: {
    new (t: any, e: any): {
        c: any;
        f: any;
        g(): void;
        q: w;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as w } from "../../../../../../base/common/lifecycle.js";
export { D as $5dc, A as $6dc, j as $7dc };
//# sourceMappingURL=saveParticipants.d.ts.map