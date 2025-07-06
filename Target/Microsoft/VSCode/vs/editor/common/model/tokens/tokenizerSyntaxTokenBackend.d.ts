export { M as $cI };
declare class M extends L {
    constructor(t: any, e: any, i: any, o: any);
    G: any;
    n: p | null;
    f: number;
    g: any;
    onDidChangeBackgroundTokenizationState: any;
    u: C | null;
    w: any;
    y: c;
    D: any;
    F: any;
    todo_resetTokenization(t?: boolean): void;
    C: g | undefined;
    z: any;
    handleDidChangeAttached(): void;
    handleDidChangeContent(t: any): void;
    H(t: any): {
        changes: {
            fromLineNumber: number;
            toLineNumber: number;
        }[];
    };
    I(): void;
    J(t: any): void;
    L(t: any, e: any): void;
    forceTokenization(t: any): void;
    hasAccurateTokensForLine(t: any): boolean;
    isCheapToTokenize(t: any): boolean;
    getLineTokens(t: any): import("../../tokens/lineTokens.js").$gD;
    getTokenTypeIfInsertingCharacter(t: any, e: any, i: any): number;
    tokenizeLinesAt(t: any, e: any): import("../../tokens/lineTokens.js").$gD[] | null;
    get hasTokens(): boolean;
}
import { $LH as L } from "./abstractSyntaxTokenBackend.js";
import { $1H as p } from "../textModelTokens.js";
import { $6H as C } from "../textModelTokens.js";
import { $bI as c } from "../../tokens/contiguousTokensStore.js";
import { $3H as g } from "../textModelTokens.js";
//# sourceMappingURL=tokenizerSyntaxTokenBackend.d.ts.map