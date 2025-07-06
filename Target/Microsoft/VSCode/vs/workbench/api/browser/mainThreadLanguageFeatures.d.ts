declare let F: {
    new (e: any, r: any, i: any, s: any, t: any, n: any): {
        c: any;
        g: any;
        h: any;
        j: any;
        m: any;
        b: any;
        z: Map<any, any>;
        I: Map<any, any>;
        a: any;
        $unregister(e: any): void;
        $registerDocumentSymbolProvider(e: any, r: any, i: any): void;
        $registerCodeLensSupport(e: any, r: any, i: any): void;
        $emitCodeLensEvent(e: any, r: any): void;
        $registerDefinitionSupport(e: any, r: any): void;
        $registerDeclarationSupport(e: any, r: any): void;
        $registerImplementationSupport(e: any, r: any): void;
        $registerTypeDefinitionSupport(e: any, r: any): void;
        $registerHoverProvider(e: any, r: any): void;
        $registerEvaluatableExpressionProvider(e: any, r: any): void;
        $registerInlineValuesProvider(e: any, r: any, i: any): void;
        $emitInlineValuesEvent(e: any, r: any): void;
        $registerDocumentHighlightProvider(e: any, r: any): void;
        $registerMultiDocumentHighlightProvider(e: any, r: any): void;
        $registerLinkedEditingRangeProvider(e: any, r: any): void;
        $registerReferenceSupport(e: any, r: any): void;
        $registerCodeActionSupport(e: any, r: any, i: any, s: any, t: any, n: any): void;
        $registerPasteEditProvider(e: any, r: any, i: any): void;
        $resolvePasteFileData(e: any, r: any, i: any): any;
        $registerDocumentFormattingSupport(e: any, r: any, i: any, s: any): void;
        $registerRangeFormattingSupport(e: any, r: any, i: any, s: any, t: any): void;
        $registerOnTypeFormattingSupport(e: any, r: any, i: any, s: any): void;
        $registerNavigateTypeSupport(e: any, r: any): void;
        $registerRenameSupport(e: any, r: any, i: any): void;
        $registerNewSymbolNamesProvider(e: any, r: any): void;
        $registerDocumentSemanticTokensProvider(e: any, r: any, i: any, s: any): void;
        $emitDocumentSemanticTokensEvent(e: any): void;
        $registerDocumentRangeSemanticTokensProvider(e: any, r: any, i: any): void;
        $registerCompletionsProvider(e: any, r: any, i: any, s: any, t: any): void;
        $registerInlineCompletionsSupport(e: any, r: any, i: any, s: any, t: any, n: any, o: any, a: any, d: any, c: any): void;
        $emitInlineCompletionsChange(e: any): void;
        $registerSignatureHelpProvider(e: any, r: any, i: any): void;
        $registerInlayHintsProvider(e: any, r: any, i: any, s: any, t: any): void;
        $emitInlayHintsEvent(e: any): void;
        $registerDocumentLinkProvider(e: any, r: any, i: any): void;
        $registerDocumentColorProvider(e: any, r: any): void;
        $registerFoldingRangeProvider(e: any, r: any, i: any, s: any): void;
        $emitFoldingRangeEvent(e: any, r: any): void;
        $registerSelectionRangeProvider(e: any, r: any): void;
        $registerCallHierarchyProvider(e: any, r: any): void;
        $setLanguageConfiguration(e: any, r: any, i: any): void;
        $registerTypeHierarchyProvider(e: any, r: any): void;
        $registerDocumentOnDropEditProvider(e: any, r: any, i: any): void;
        $resolveDocumentOnDropFileData(e: any, r: any, i: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    n(e: any): any;
    r(e: any): any;
    s(e: any): any;
    t(e: any, r: any): any;
    u(e: any): any;
    w(e: any): any;
    y(e: any): any;
    C(e: any, r: any, i: any): {
        label: any;
        extensionId: any;
        kind: any;
        tags: any;
        detail: any;
        documentation: any;
        sortText: any;
        filterText: any;
        preselect: any;
        insertText: any;
        range: any;
        insertTextRules: any;
        commitCharacters: any[] | undefined;
        additionalTextEdits: any;
        command: {
            $ident: any;
            id: any;
            title: string;
            arguments: any;
        } | undefined;
        _id: any;
    };
    D(e: any): RegExp;
    F(e: any): {
        decreaseIndentPattern: any;
        increaseIndentPattern: any;
        indentNextLinePattern: any;
        unIndentedLinePattern: any;
    };
    G(e: any): {
        beforeText: any;
        afterText: any;
        previousLineText: any;
        action: any;
    };
    H(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class te {
    constructor(e: any, r: any, i: any, s: any);
    a: any;
    b: any;
    c: any;
    onDidChange: any;
    releaseDocumentSemanticTokens(e: any): void;
    getLegend(): any;
    provideDocumentSemanticTokens(e: any, r: any, i: any): Promise<{
        resultId: string;
        data: Uint32Array<any> | undefined;
        edits?: never;
    } | {
        resultId: string;
        edits: {
            start: number | undefined;
            deleteCount: number | undefined;
            data: Uint32Array<any> | undefined;
        }[] | undefined;
        data?: never;
    } | null>;
}
declare class re {
    constructor(e: any, r: any, i: any);
    a: any;
    b: any;
    c: any;
    getLegend(): any;
    provideDocumentRangeSemanticTokens(e: any, r: any, i: any): Promise<{
        resultId: string;
        data: Uint32Array<any> | undefined;
    } | null>;
}
export { F as $MZb, te as $NZb, re as $OZb };
//# sourceMappingURL=mainThreadLanguageFeatures.d.ts.map