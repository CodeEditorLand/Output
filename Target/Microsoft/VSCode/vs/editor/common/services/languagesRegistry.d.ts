declare class N {
    e: any[];
    f: Map<any, any>;
    c: number;
    g(e: any, t: any): void;
    register(e: any): void;
    encodeLanguageId(e: any): any;
    decodeLanguageId(e: any): any;
}
declare class c extends g {
    constructor(e?: boolean, t?: boolean);
    c: any;
    onDidChange: any;
    f: boolean;
    languageIdCodec: N;
    g: any[];
    h: {};
    j: {};
    n: {};
    r: {};
    setDynamicLanguages(e: any): void;
    s(): void;
    registerLanguage(e: any): {
        dispose: () => void;
    };
    _registerLanguages(e: any): void;
    t(e: any): void;
    u(e: any, t: any): void;
    isRegisteredLanguageId(e: any): boolean;
    getRegisteredLanguageIds(): string[];
    getSortedRegisteredLanguageNames(): {
        languageName: string;
        languageId: any;
    }[];
    getLanguageName(e: any): any;
    getMimeType(e: any): any;
    getExtensions(e: any): any;
    getFilenames(e: any): any;
    getIcon(e: any): any;
    getConfigurationFiles(e: any): any;
    getLanguageIdByLanguageName(e: any): any;
    getLanguageIdByMimeType(e: any): any;
    guessLanguageIdByFilepathOrFirstLine(e: any, t: any): any[];
}
import { $vd as g } from "../../../base/common/lifecycle.js";
export { N as $NFb, c as $OFb };
//# sourceMappingURL=languagesRegistry.d.ts.map