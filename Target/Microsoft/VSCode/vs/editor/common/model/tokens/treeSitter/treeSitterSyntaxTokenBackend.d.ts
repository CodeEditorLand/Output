export { m as $_H };
declare let m: {
    new (e: any, t: any, s: any, h: any, i: any, u: any): {
        t: any;
        u: any;
        w: any;
        f: number;
        g: any;
        onDidChangeBackgroundTokenizationState: any;
        r: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        s: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        readonly tree: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        readonly tokenizationImpl: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        getLineTokens(e: any): any;
        todo_resetTokenization(e?: boolean): void;
        handleDidChangeAttached(): void;
        handleDidChangeContent(e: any): void;
        forceTokenization(e: any): void;
        hasAccurateTokensForLine(e: any): any;
        isCheapToTokenize(e: any): boolean;
        getTokenTypeIfInsertingCharacter(e: any, t: any, s: any): number;
        tokenizeLinesAt(e: any, t: any): any;
        readonly hasTokens: any;
        readonly backgroundTokenizationState: any;
        j: any;
        m: any;
        h: any;
        onDidChangeTokens: any;
        tokenizeIfCheap(e: any): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=treeSitterSyntaxTokenBackend.d.ts.map