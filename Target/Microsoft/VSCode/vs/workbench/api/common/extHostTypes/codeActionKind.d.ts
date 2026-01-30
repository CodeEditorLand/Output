export let CodeActionKind: {
    new (value: any): {
        value: any;
        append(parts: any): any;
        intersects(other: any): any;
        contains(other: any): any;
    };
    sep: string | undefined;
    Empty: {
        value: any;
        append(parts: any): any;
        intersects(other: any): any;
        contains(other: any): any;
    };
    QuickFix: any;
    Refactor: any;
    RefactorExtract: any;
    RefactorInline: any;
    RefactorMove: any;
    RefactorRewrite: any;
    Source: any;
    SourceOrganizeImports: any;
    SourceFixAll: any;
    Notebook: any;
};
//# sourceMappingURL=codeActionKind.d.ts.map