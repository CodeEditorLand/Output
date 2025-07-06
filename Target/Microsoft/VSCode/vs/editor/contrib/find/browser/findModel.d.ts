declare const y: m;
declare const j: any;
declare const z: m;
declare const H: m;
declare namespace Y {
    let primary: number;
    namespace mac {
        let primary_1: number;
        export { primary_1 as primary };
    }
}
declare namespace G {
    let primary_2: number;
    export { primary_2 as primary };
    export namespace mac_1 {
        let primary_3: number;
        export { primary_3 as primary };
    }
    export { mac_1 as mac };
}
declare namespace X {
    let primary_4: number;
    export { primary_4 as primary };
    export namespace mac_2 {
        let primary_5: number;
        export { primary_5 as primary };
    }
    export { mac_2 as mac };
}
declare namespace Z {
    let primary_6: number;
    export { primary_6 as primary };
    export namespace mac_3 {
        let primary_7: number;
        export { primary_7 as primary };
    }
    export { mac_3 as mac };
}
declare namespace J {
    let primary_8: number;
    export { primary_8 as primary };
    export namespace mac_4 {
        let primary_9: number;
        export { primary_9 as primary };
    }
    export { mac_4 as mac };
}
declare namespace K {
    let StartFindAction: string;
    let StartFindWithSelection: string;
    let StartFindWithArgs: string;
    let NextMatchFindAction: string;
    let PreviousMatchFindAction: string;
    let GoToMatchFindAction: string;
    let NextSelectionMatchFindAction: string;
    let PreviousSelectionMatchFindAction: string;
    let StartFindReplaceAction: string;
    let CloseFindWidgetCommand: string;
    let ToggleCaseSensitiveCommand: string;
    let ToggleWholeWordCommand: string;
    let ToggleRegexCommand: string;
    let ToggleSearchScopeCommand: string;
    let TogglePreserveCaseCommand: string;
    let ReplaceOneAction: string;
    let ReplaceAllAction: string;
    let SelectAllMatchesAction: string;
}
declare const d: 19999;
declare class u {
    static l(t: any, i: any): any;
    constructor(t: any, i: any);
    c: C;
    a: any;
    b: any;
    j: boolean;
    g: b;
    d: v;
    h: S;
    f: boolean;
    dispose(): void;
    k(t: any): void;
    n(t: any, i: any): void;
    o(): boolean;
    p(): boolean;
    q(t: any): void;
    r(t: any): g;
    s(t: any, i?: boolean): any;
    moveToPrevMatch(): void;
    t(t: any): g;
    u(t: any): void;
    v(t: any, i: any, e: any, s?: boolean): any;
    moveToNextMatch(): void;
    w(t: any): void;
    moveToMatch(t: any): void;
    x(): $;
    replace(): void;
    y(t: any, i: any, e: any): any;
    replaceAll(): void;
    z(): void;
    A(t: any): void;
    selectAllMatches(): void;
    B(t: any, i: any): void;
}
import { $Wn as m } from "../../../../platform/contextkey/common/contextkey.js";
import { $ud as C } from "../../../../base/common/lifecycle.js";
import { $Xh as b } from "../../../../base/common/async.js";
import { $bob as v } from "./findDecorations.js";
import { $Zh as S } from "../../../../base/common/async.js";
import { $dC as g } from "../../../common/core/position.js";
import { $eob as $ } from "./replacePattern.js";
export { y as $hob, j as $iob, z as $job, H as $kob, Y as $lob, G as $mob, X as $nob, Z as $oob, J as $pob, K as $qob, d as $rob, u as $sob };
//# sourceMappingURL=findModel.d.ts.map