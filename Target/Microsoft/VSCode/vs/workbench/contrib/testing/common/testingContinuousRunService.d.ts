declare const X: any;
declare let g: {
    new (e: any, r: any, o: any, t: any): {
        readonly lastRunProfileIds: any;
        f: any;
        g: any;
        a: w;
        b: O;
        onDidChange: any;
        c: any;
        isSpecificallyEnabledFor(e: any): boolean;
        isEnabledForAParentOf(e: any): boolean;
        isEnabledForProfile({ profileId: e, controllerId: r }: {
            profileId: any;
            controllerId: any;
        }): boolean;
        isEnabledForAChildOf(e: any): boolean;
        isEnabled(): boolean;
        start(e: any, r: any): void;
        stopProfile({ profileId: e, controllerId: r }: {
            profileId: any;
            controllerId: any;
        }): void;
        stop(e: any): void;
        q: P;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as w } from "../../../../base/common/event.js";
import { $FU as O } from "../../../../base/common/prefixTree.js";
import { $ud as P } from "../../../../base/common/lifecycle.js";
export { X as $Lmc, g as $Mmc };
//# sourceMappingURL=testingContinuousRunService.d.ts.map