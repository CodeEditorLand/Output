declare const b: "^\\w+[-_\\w+]*$";
declare class f {
    constructor(e: any, n: any, r: any, c: any, l: any);
    foreground: any;
    bold: any;
    underline: any;
    strikethrough: any;
    italic: any;
}
declare function F(o: any, e: any): {
    type: any;
    modifiers: any[];
    language: any;
};
declare function W(): I;
declare const $: "vscode://schemas/token-styling";
declare var z: any;
declare class I extends N {
    c: any;
    onDidChangeSchema: any;
    f: number;
    g: number;
    m: any[];
    t: {
        type: string;
        properties: {};
        patternProperties: {
            "^(\\w+[-_\\w+]*|\\*)(\\.\\w+[-_\\w+]*)*(:\\w+[-_\\w+]*)?$": {
                description: any;
                deprecationMessage: any;
                defaultSnippets: {
                    body: string;
                }[];
                anyOf: ({
                    type: string;
                    format: string;
                    $ref?: never;
                } | {
                    $ref: string;
                    type?: never;
                    format?: never;
                })[];
            };
        };
        additionalProperties: boolean;
        definitions: {
            style: {
                type: string;
                description: any;
                properties: {
                    foreground: {
                        type: string;
                        description: any;
                        format: string;
                        default: string;
                    };
                    background: {
                        type: string;
                        deprecationMessage: any;
                    };
                    fontStyle: {
                        type: string;
                        description: any;
                        pattern: string;
                        patternErrorMessage: any;
                        defaultSnippets: ({
                            label: any;
                            bodyText: string;
                            body?: never;
                        } | {
                            body: string;
                            label?: never;
                            bodyText?: never;
                        })[];
                    };
                    bold: {
                        type: string;
                        description: any;
                    };
                    italic: {
                        type: string;
                        description: any;
                    };
                    underline: {
                        type: string;
                        description: any;
                    };
                    strikethrough: {
                        type: string;
                        description: any;
                    };
                };
                defaultSnippets: {
                    body: {
                        foreground: string;
                        fontStyle: string;
                    };
                }[];
            };
        };
    };
    h: any;
    j: any;
    n: any;
    registerTokenType(e: any, n: any, r: any, c: any): void;
    registerTokenModifier(e: any, n: any, r: any): void;
    parseTokenSelector(e: any, n: any): {
        match: (c: any, l: any, a: any) => number;
        id: string;
    };
    registerTokenStyleDefault(e: any, n: any): void;
    deregisterTokenStyleDefault(e: any): void;
    deregisterTokenType(e: any): void;
    deregisterTokenModifier(e: any): void;
    getTokenTypes(): any[];
    getTokenModifiers(): any[];
    getTokenStylingSchema(): {
        type: string;
        properties: {};
        patternProperties: {
            "^(\\w+[-_\\w+]*|\\*)(\\.\\w+[-_\\w+]*)*(:\\w+[-_\\w+]*)?$": {
                description: any;
                deprecationMessage: any;
                defaultSnippets: {
                    body: string;
                }[];
                anyOf: ({
                    type: string;
                    format: string;
                    $ref?: never;
                } | {
                    $ref: string;
                    type?: never;
                    format?: never;
                })[];
            };
        };
        additionalProperties: boolean;
        definitions: {
            style: {
                type: string;
                description: any;
                properties: {
                    foreground: {
                        type: string;
                        description: any;
                        format: string;
                        default: string;
                    };
                    background: {
                        type: string;
                        deprecationMessage: any;
                    };
                    fontStyle: {
                        type: string;
                        description: any;
                        pattern: string;
                        patternErrorMessage: any;
                        defaultSnippets: ({
                            label: any;
                            bodyText: string;
                            body?: never;
                        } | {
                            body: string;
                            label?: never;
                            bodyText?: never;
                        })[];
                    };
                    bold: {
                        type: string;
                        description: any;
                    };
                    italic: {
                        type: string;
                        description: any;
                    };
                    underline: {
                        type: string;
                        description: any;
                    };
                    strikethrough: {
                        type: string;
                        description: any;
                    };
                };
                defaultSnippets: {
                    body: {
                        foreground: string;
                        fontStyle: string;
                    };
                }[];
            };
        };
    };
    getTokenStylingDefaultRules(): any[];
    u(e: any): any;
}
import { $vd as N } from "../../../base/common/lifecycle.js";
export { b as $tub, f as $uub, F as $vub, W as $wub, $ as $xub, z as SemanticTokenRule };
//# sourceMappingURL=tokenClassificationRegistry.d.ts.map