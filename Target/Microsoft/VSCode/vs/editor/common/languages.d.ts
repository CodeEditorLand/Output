declare function se(e: any, t: any): any;
declare class re {
    static asEditOperation(t: any): {
        range: any;
        text: any;
    };
    static isTextEdit(t: any): any;
}
declare class n {
    static fromValue(t: any): n | undefined;
    constructor(t: any);
    value: any;
}
declare class ue {
    constructor(t: any);
    b: any;
    a: any;
    dispose(): void;
    get tokenizationSupport(): any;
}
declare const ae: X;
declare class S {
    constructor(t: any, c: any, a: any);
    offset: any;
    type: any;
    language: any;
    toString(): string;
}
declare class d {
    constructor(t: any, c: any);
    tokens: any;
    endState: any;
}
declare class C {
    constructor(t: any, c: any);
    tokens: any;
    endState: any;
}
declare class m {
    constructor(t: any, c: any, a: any, u: any);
    range: any;
    text: any;
    completionKind: any;
    isSnippetText: any;
    equals(t: any): boolean;
}
declare class K {
    constructor(t: any, c: any);
    extensionId: any;
    version: any;
    toString(): string;
}
declare function ee(e: any): any;
declare function te(e: any): any;
declare const Y: {
    17: any;
    16: any;
    4: any;
    13: any;
    8: any;
    9: any;
    21: any;
    23: any;
    7: any;
    0: any;
    11: any;
    10: any;
    19: any;
    5: any;
    1: any;
    2: any;
    20: any;
    15: any;
    18: any;
    24: any;
    3: any;
    6: any;
    14: any;
    22: any;
    25: any;
    12: any;
};
declare var R: any;
declare var W: any;
declare var q: any;
declare var G: any;
declare var U: any;
declare var j: any;
declare var O: any;
declare var F: any;
declare var y: any;
declare var b: any;
declare var k: any;
declare var E: any;
declare var $: any;
declare var N: any;
declare var L: any;
declare var h: any;
declare var J: any;
declare var w: any;
declare var P: any;
declare var B: any;
declare var z: any;
declare var M: any;
declare var D: any;
declare var A: any;
declare var g: any;
declare var V: any;
import { $cD as X } from "./tokenizationRegistry.js";
export { se as $AD, re as $BD, n as $CD, ue as $DD, ae as $ED, S as $sD, d as $tD, C as $uD, m as $vD, K as $wD, ee as $xD, te as $yD, Y as $zD, R as CodeActionTriggerType, W as Command, q as CommentMode, G as CommentState, U as CommentThreadApplicability, j as CommentThreadCollapsibleState, O as CommentThreadState, F as CompletionItemInsertTextRule, y as CompletionItemKind, b as CompletionItemKinds, k as CompletionItemTag, E as CompletionTriggerKind, $ as DocumentHighlightKind, N as DocumentPasteTriggerKind, L as ExternalUriOpenerPriority, h as HoverVerbosityAction, J as InlayHintKind, w as InlineCompletionEndOfLifeReasonKind, P as InlineCompletionTriggerKind, B as NewSymbolNameTag, z as NewSymbolNameTriggerKind, M as PartialAcceptTriggerKind, D as SignatureHelpTriggerKind, A as SymbolKind, g as SymbolKinds, V as SymbolTag };
//# sourceMappingURL=languages.d.ts.map