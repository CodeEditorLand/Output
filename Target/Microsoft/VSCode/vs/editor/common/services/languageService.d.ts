export { n as $PFb };
declare class n extends g {
    constructor(e?: boolean);
    c: any;
    onDidRequestBasicLanguageFeatures: any;
    f: any;
    onDidRequestRichLanguageFeatures: any;
    g: any;
    onDidChange: any;
    h: Set<any>;
    m: Set<any>;
    n: any;
    languageIdCodec: any;
    registerLanguage(e: any): any;
    isRegisteredLanguageId(e: any): any;
    getRegisteredLanguageIds(): any;
    getSortedRegisteredLanguageNames(): any;
    getLanguageName(e: any): any;
    getMimeType(e: any): any;
    getIcon(e: any): any;
    getExtensions(e: any): any;
    getFilenames(e: any): any;
    getConfigurationFiles(e: any): any;
    getLanguageIdByLanguageName(e: any): any;
    getLanguageIdByMimeType(e: any): any;
    guessLanguageIdByFilepathOrFirstLine(e: any, t: any): any;
    createById(e: any): i;
    createByMimeType(e: any): i;
    createByFilepathOrFirstLine(e: any, t: any): i;
    s(e: any): any;
    requestBasicLanguageFeatures(e: any): void;
    requestRichLanguageFeatures(e: any): void;
}
import { $vd as g } from "../../../base/common/lifecycle.js";
declare class i {
    constructor(e: any, t: any);
    a: import("../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
    onDidChange: any;
    get languageId(): any;
}
//# sourceMappingURL=languageService.d.ts.map