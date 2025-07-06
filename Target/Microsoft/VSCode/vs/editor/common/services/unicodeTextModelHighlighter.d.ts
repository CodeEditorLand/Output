declare class W {
    static computeUnicodeHighlights(e: any, s: any, i: any): {
        ranges: T[];
        hasMore: boolean;
        ambiguousCharacterCount: number;
        invisibleCharacterCount: number;
        nonBasicAsciiCharacterCount: number;
    };
    static computeUnicodeHighlightReason(e: any, s: any): {
        kind: number;
        confusableWith?: never;
        notAmbiguousInLocales?: never;
    } | {
        kind: number;
        confusableWith: string;
        notAmbiguousInLocales: any;
    } | null;
}
declare var B: any;
import { $eC as T } from "../core/range.js";
export { W as $Yeb, B as UnicodeHighlighterReasonKind };
//# sourceMappingURL=unicodeTextModelHighlighter.d.ts.map