export { L as $u8b };
declare let L: {
    new (e: any, t: any, r: any, i: any, s: any, n: any, l: any, u: any, a: any, f: any): {
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        g: any[];
        h: any[];
        j: boolean;
        m: () => void;
        n: any[] | null;
        s: x | null;
        t: any;
        u: {
            name: any;
            settings: any;
        } | null;
        w: any;
        y: any;
        X: Promise<any> | null;
        f: HTMLStyleElement;
        N(): boolean;
        O(): boolean;
        P(e: any): void;
        Q(e: any, t: any): {
            location: any;
            language: any;
            scopeName: any;
            embeddedLanguages: any;
            tokenTypes: any;
            injectTo: any;
            balancedBracketSelectors: any;
            unbalancedBracketSelectors: any;
            sourceExtensionId: any;
        } | null;
        startDebugMode(e: any, t: any): void;
        R(): boolean;
        S(): Promise<x>;
        U(e: any): Promise<Z | null>;
        W(e: any, t: any): void;
        createTokenizer(e: any): Promise<any>;
        Y(): Promise<any>;
        Z(): Promise<ArrayBuffer | Response>;
        $(e: any, t: any, r: any, i: any, s: any, n: any): void;
        q: w;
        dispose(): void;
        B(t: any): any;
    };
    c: {
        sync: number;
        async: number;
    } | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $k8b as x } from "../common/TMGrammarFactory.js";
import { $h8b as Z } from "./tokenizationSupport/tokenizationSupportWithLineLimit.js";
import { $ud as w } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=textMateTokenizationFeatureImpl.d.ts.map