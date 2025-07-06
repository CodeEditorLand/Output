declare class c {
    constructor(e: any);
    languageId: any;
    affects(e: any): boolean;
}
declare const K: any;
declare let l: {
    new (e: any, t: any): {
        h: any;
        j: any;
        c: any;
        f: any;
        onDidChange: any;
        g: Map<any, any>;
        register(e: any, t: any, i: any): any;
        getLanguageConfiguration(e: any): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function se(r: any, e: any, t: any): any;
declare class m {
    constructor(e: any);
    languageId: any;
}
declare class q extends p {
    c: Map<any, any>;
    f: any;
    onDidChange: any;
    register(e: any, t: any, i?: number): any;
    getLanguageConfiguration(e: any): any;
}
declare class a {
    static g(e: any): {
        lineCommentToken: any;
        lineCommentNoIndent: any;
        blockCommentStartToken: any;
        blockCommentEndToken: any;
    } | null;
    constructor(e: any, t: any);
    languageId: any;
    underlyingConfig: any;
    c: L | null;
    d: S | null;
    f: D | null;
    comments: {
        lineCommentToken: any;
        lineCommentNoIndent: any;
        blockCommentStartToken: any;
        blockCommentEndToken: any;
    } | null;
    characterPair: _;
    wordDefinition: any;
    indentationRules: any;
    indentRulesSupport: z | null;
    foldingRules: any;
    bracketsNew: O;
    getWordDefinition(): RegExp;
    get brackets(): L | null;
    get electricCharacter(): S;
    onEnter(e: any, t: any, i: any, n: any): any;
    getAutoClosingPairs(): v;
    getAutoCloseBeforeSet(e: any): any;
    getSurroundingPairs(): any;
}
import { $vd as p } from "../../../base/common/lifecycle.js";
import { $MD as L } from "./supports/richEditBrackets.js";
import { $kE as S } from "./supports/electricCharacter.js";
import { $mE as D } from "./supports/onEnter.js";
import { $jE as _ } from "./supports/characterPair.js";
import { $lE as z } from "./supports/indentRules.js";
import { $PD as O } from "./supports/languageBracketsConfiguration.js";
import { $KD as v } from "./languageConfiguration.js";
export { c as $sE, K as $tE, l as $uE, se as $vE, m as $wE, q as $xE, a as $yE };
//# sourceMappingURL=languageConfigurationRegistry.d.ts.map