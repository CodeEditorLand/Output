declare class V {
    constructor(t: any, e: any, r: any, n: any);
    position: any;
    completion: any;
    container: any;
    provider: any;
    isInvalid: boolean;
    score: any;
    distance: number;
    textLabel: any;
    labelLow: any;
    sortTextLow: any;
    filterTextLow: any;
    extensionId: any;
    editStart: h;
    editInsertEnd: h;
    editReplaceEnd: h;
    d: Promise<void> | undefined;
    c: number | undefined;
    get isResolved(): boolean;
    get resolveDuration(): number;
    resolve(t: any): Promise<void>;
}
declare const he: O;
declare namespace pe {
    export { U as Visible };
    export let HasFocusedSuggestion: f;
    export let DetailsVisible: f;
    export let MultipleSuggestions: f;
    export let MakesTextEdit: f;
    export let AcceptSuggestionsOnEnter: f;
    export let HasInsertAndReplaceRange: f;
    export let InsertMode: f;
    export let CanResolve: f;
}
declare class k {
    constructor(t?: number, e?: Set<any>, r?: Set<any>, n?: Map<any, any>, a?: boolean);
    snippetSortOrder: number;
    kindFilter: Set<any>;
    providerFilter: Set<any>;
    providerItemsToReuse: Map<any, any>;
    showDeprecated: boolean;
}
declare function we(): any;
declare function be(s: any): any;
declare class G {
    constructor(t: any, e: any, r: any, n: any);
    items: any;
    needsClipboard: any;
    durations: any;
    disposable: any;
}
declare function K(s: any, t: any, e: any, r?: k | undefined, n?: {
    triggerKind: number;
}, a?: any): Promise<G>;
declare function X(s: any): any;
declare function xe(s: any, t: any): void;
declare class Ce {
    static isAllOff(t: any): boolean;
    static isAllOn(t: any): boolean;
    static valueFor(t: any, e: any): any;
}
declare var E: any;
import { $dC as h } from "../../../common/core/position.js";
import { $FI as O } from "../../../../platform/actions/common/actions.js";
import { $4jb as U } from "../../../../platform/history/browser/contextScopedHistoryWidget.js";
import { $Wn as f } from "../../../../platform/contextkey/common/contextkey.js";
export { V as $$jb, he as $0jb, pe as $9jb, k as $_jb, we as $akb, be as $bkb, G as $ckb, K as $dkb, X as $ekb, xe as $fkb, Ce as $gkb, E as SnippetSortOrder };
//# sourceMappingURL=suggest.d.ts.map