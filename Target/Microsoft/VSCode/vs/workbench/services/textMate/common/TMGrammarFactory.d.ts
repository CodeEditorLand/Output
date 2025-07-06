declare const g: "No TM Grammar registered for this language.";
declare class p extends m {
    constructor(o: any, i: any, s: any, n: any);
    a: any;
    b: any;
    c: d;
    f: {};
    g: {};
    h: Map<any, any>;
    j: any;
    has(o: any): boolean;
    setTheme(o: any, i: any): void;
    getColorMap(): any;
    createGrammar(o: any, i: any): Promise<{
        languageId: any;
        grammar: any;
        initialState: any;
        containsEmbeddedLanguages: boolean;
        sourceExtensionId: any;
    }>;
}
import { $vd as m } from "../../../../base/common/lifecycle.js";
import { $i8b as d } from "./TMScopeRegistry.js";
export { g as $j8b, p as $k8b };
//# sourceMappingURL=TMGrammarFactory.d.ts.map