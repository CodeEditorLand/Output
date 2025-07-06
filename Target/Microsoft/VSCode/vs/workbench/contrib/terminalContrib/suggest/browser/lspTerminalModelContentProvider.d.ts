declare let d: {
    new (t: any, e: any, i: any, n: any, s: any, o: any, a: any): {
        h: any;
        j: any;
        g: any;
        b: any;
        a: any;
        c: any;
        f: any;
        shellTypeChanged(t: any): void;
        setContent(t: any): void;
        trackPromptInputToVirtualFile(t: any): void;
        m(): void;
        provideTextContent(t: any): Promise<any>;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    scheme: any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function F(h: any, t: any): {
    _formatted: string | null;
    _fsPath: any;
    readonly fsPath: any;
    toString(e?: boolean): string;
    toJSON(): {
        $mid: number;
    };
    scheme: any;
    authority: any;
    path: any;
    query: any;
    fragment: any;
    with(e: any): /*elided*/ any;
};
export { d as $1uc, F as $2uc };
//# sourceMappingURL=lspTerminalModelContentProvider.d.ts.map