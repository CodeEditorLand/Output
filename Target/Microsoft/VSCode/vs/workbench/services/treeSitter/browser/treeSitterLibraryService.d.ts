declare const T: "editor.experimental.preferTreeSitter";
declare const H: string[];
declare function m(o: any): string;
declare let d: {
    new (e: any, t: any, s: any): {
        g: any;
        h: any;
        j: any;
        isTest: boolean;
        a: y;
        b: g;
        c: g;
        f: g;
        supportsLanguage(e: any, t: any): any;
        getParserClass(): Promise<any>;
        getLanguage(e: any, t: any): any;
        getInjectionQueries(e: any, t: any): any;
        getHighlightingQueries(e: any, t: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $wf as y } from "../../../../base/common/lazy.js";
import { $vf as g } from "../../../../base/common/cache.js";
export { T as $v8b, H as $w8b, m as $x8b, d as $y8b };
//# sourceMappingURL=treeSitterLibraryService.d.ts.map