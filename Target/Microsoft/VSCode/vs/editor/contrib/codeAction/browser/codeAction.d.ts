declare const kt: "editor.action.codeAction";
declare const Pt: "editor.action.quickFix";
declare const St: "editor.action.autoFix";
declare const Ft: "editor.action.refactor";
declare const Nt: "editor.action.refactor.preview";
declare const Tt: "editor.action.sourceAction";
declare const Dt: "editor.action.organizeImports";
declare const qt: "editor.action.fixAll";
declare function et(o: any, t: any, e: any, n: any, i: any, r: any): Promise<v>;
declare function Et(o: any, t: any, e: any, n: any, i?: any): Promise<void>;
declare var I: any;
declare class v extends L {
    static c(t: any, e: any): 0 | 1 | -1;
    static f({ action: t }: {
        action: any;
    }, { action: e }: {
        action: any;
    }): 0 | 1 | -1;
    constructor(t: any, e: any, n: any);
    documentation: any;
    allActions: any[];
    validActions: any[];
    get hasAutoFix(): boolean;
    get hasAIFix(): boolean;
    get allAIFixes(): boolean;
}
import { $vd as L } from "../../../../base/common/lifecycle.js";
export { kt as $nib, Pt as $oib, St as $pib, Ft as $qib, Nt as $rib, Tt as $sib, Dt as $tib, qt as $uib, et as $vib, Et as $wib, I as ApplyCodeActionReason };
//# sourceMappingURL=codeAction.d.ts.map