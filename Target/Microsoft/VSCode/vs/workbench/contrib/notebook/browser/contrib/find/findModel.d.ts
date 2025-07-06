declare class j {
    constructor(t: any, i: any, s: any, e: any);
    get length(): any;
    get contentMatches(): any;
    get webviewMatches(): any;
    cell: any;
    index: any;
    a: any;
    b: any;
    getMatch(t: any): any;
}
declare let S: {
    new (t: any, i: any, s: any): {
        readonly findMatches: any[];
        readonly currentMatch: number;
        r: any;
        s: any;
        t: any;
        a: any[];
        b: b | null;
        f: number;
        h: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | null;
        j: any;
        g: w;
        n: D;
        u(t: any): void;
        ensureFindMatches(): void;
        getCurrentMatch(): {
            cell: any;
            match: any;
            isModelMatch: boolean;
        };
        refreshCurrentMatch(t: any): void;
        find(t: any): void;
        w(t: any, i: any, s: any): void;
        y(t: any): void;
        research(): Promise<any>;
        _research(): Promise<void>;
        z(t: any, i: any): void;
        C(t: any): Promise<any>;
        D(t: any, i: any): void;
        F(t: any, i: any): number;
        G(): void;
        H(t: any, i: any): Promise<any>;
        clear(): void;
        dispose(): void;
        q: I;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $G2 as b } from "../../../../../../editor/common/model/prefixSumComputer.js";
import { $Jh as w } from "../../../../../../base/common/async.js";
import { $PSb as D } from "./findMatchDecorationModel.js";
import { $ud as I } from "../../../../../../base/common/lifecycle.js";
export { j as $QSb, S as $RSb };
//# sourceMappingURL=findModel.d.ts.map