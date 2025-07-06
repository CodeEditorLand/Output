export { P as $Cub };
declare let P: {
    new (a: any, i: any, e: any, t: any): {
        b: any;
        c: any;
        f: any;
        g: any;
        a: Map<any, any>;
        h(a: any): Promise<void>;
        j(a: any): Promise<any>;
        w(a: any, i: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    m(a: any, i: any): {} | undefined;
    n(a: any, i: any): never[] | undefined;
    r(a: any, i: any): never[] | undefined;
    s(a: any, i: any): never[] | undefined;
    t(a: any, i: any): any[][] | undefined;
    u(a: any, i: any): never[] | undefined;
    extractValidConfig(a: any, i: any): {
        comments: {} | undefined;
        brackets: never[] | undefined;
        wordPattern: RegExp | undefined;
        indentationRules: {
            increaseIndentPattern: RegExp;
            decreaseIndentPattern: RegExp;
        } | undefined;
        onEnterRules: never[] | undefined;
        autoClosingPairs: never[] | undefined;
        surroundingPairs: never[] | undefined;
        colorizedBracketPairs: any[][] | undefined;
        autoCloseBefore: any;
        folding: {
            offSide: any;
            markers: {
                start: RegExp;
                end: RegExp;
            } | undefined;
        } | undefined;
        __electricCharacterSupport: undefined;
    };
    y(a: any, i: any, e: any): RegExp | undefined;
    z(a: any, i: any): {
        increaseIndentPattern: RegExp;
        decreaseIndentPattern: RegExp;
    } | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=languageConfigurationExtensionPoint.d.ts.map