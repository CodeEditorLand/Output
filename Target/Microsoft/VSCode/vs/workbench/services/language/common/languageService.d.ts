declare const y: any;
declare let $: {
    new (e: any, r: any, a: any, f: any): {
        u: any;
        r: any;
        t: any;
        w(): void;
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
        dispose(): void;
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
        createById(e: any): {
            a: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
            onDidChange: any;
            readonly languageId: any;
        };
        createByMimeType(e: any): {
            a: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
            onDidChange: any;
            readonly languageId: any;
        };
        createByFilepathOrFirstLine(e: any, t: any): {
            a: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
            onDidChange: any;
            readonly languageId: any;
        };
        s(e: any): any;
        requestBasicLanguageFeatures(e: any): void;
        requestRichLanguageFeatures(e: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    instanceCount: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { y as $QFb, $ as $RFb };
//# sourceMappingURL=languageService.d.ts.map