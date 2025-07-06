declare class L extends I {
    constructor(t: any, i: any, s: any);
    get selectedItem(): d | undefined;
    m: any;
    n: any;
    r: any;
    c: boolean;
    f: boolean;
    g: boolean;
    j: any;
    onDidSelectedItemChange: any;
    t(t: any): void;
    h: d | undefined;
    u(): d | undefined;
    stopForceRenderingAbove(): void;
    forceRenderingAbove(): void;
}
declare class d {
    static fromSuggestion(t: any, i: any, s: any, e: any, n: any): d;
    constructor(t: any, i: any, s: any, e: any);
    range: any;
    insertText: any;
    completionItemKind: any;
    isSnippetText: any;
    equals(t: any): any;
    toSelectedSuggestionInfo(): M;
    getSingleTextEdit(): E;
}
declare class X extends I {
    constructor(t: any, i: any, s: any);
    f: any;
    g: any;
    h: any;
    c: any;
    selectedItem: import("../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
    stopForceRenderingAbove(): void;
    forceRenderingAbove(): void;
}
import { $vd as I } from "../../../../../base/common/lifecycle.js";
import { $vD as M } from "../../../../common/languages.js";
import { $sF as E } from "../../../../common/core/edits/textEdit.js";
export { L as $Mlb, d as $Nlb, X as $Olb };
//# sourceMappingURL=suggestWidgetAdapter.d.ts.map