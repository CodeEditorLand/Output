declare const G: RegExp;
declare const H: RegExp;
declare const K: RegExp;
declare const L: RegExp;
declare const M: RegExp;
declare const J: any;
declare function l(r: any, t: any, n: any, o: any): any;
declare function P(): j;
declare const y: "vscode://schemas/icons";
declare const Y: any;
declare const Z: any;
declare const Q: any;
declare const V: any;
declare const W: any;
declare namespace v {
    let IconContribution: string;
}
declare const N: RegExp;
declare var d: any;
declare var g: any;
declare class j extends D {
    a: any;
    onDidChange: any;
    f: {
        definitions: {
            icons: {
                type: string;
                properties: {
                    fontId: {
                        type: string;
                        description: any;
                        pattern: string;
                        patternErrorMessage: any;
                    };
                    fontCharacter: {
                        type: string;
                        description: any;
                    };
                };
                additionalProperties: boolean;
                defaultSnippets: {
                    body: {
                        fontCharacter: string;
                    };
                }[];
            };
        };
        type: string;
        properties: {};
    };
    g: {
        type: string;
        pattern: string;
        enum: never[];
        enumDescriptions: never[];
    };
    b: {};
    h: {};
    registerIcon(t: any, n: any, o: any, i: any): any;
    deregisterIcon(t: any): void;
    getIcons(): any[];
    getIcon(t: any): any;
    getIconSchema(): {
        definitions: {
            icons: {
                type: string;
                properties: {
                    fontId: {
                        type: string;
                        description: any;
                        pattern: string;
                        patternErrorMessage: any;
                    };
                    fontCharacter: {
                        type: string;
                        description: any;
                    };
                };
                additionalProperties: boolean;
                defaultSnippets: {
                    body: {
                        fontCharacter: string;
                    };
                }[];
            };
        };
        type: string;
        properties: {};
    };
    getIconReferenceSchema(): {
        type: string;
        pattern: string;
        enum: never[];
        enumDescriptions: never[];
    };
    registerIconFont(t: any, n: any): any;
    deregisterIconFont(t: any): void;
    getIconFont(t: any): any;
}
import { $vd as D } from "../../../base/common/lifecycle.js";
export { G as $At, H as $Bt, K as $Ct, L as $Dt, M as $Et, J as $Ft, l as $Gt, P as $Ht, y as $It, Y as $Jt, Z as $Kt, Q as $Lt, V as $Mt, W as $Nt, v as $yt, N as $zt, d as IconContribution, g as IconFontDefinition };
//# sourceMappingURL=iconRegistry.d.ts.map