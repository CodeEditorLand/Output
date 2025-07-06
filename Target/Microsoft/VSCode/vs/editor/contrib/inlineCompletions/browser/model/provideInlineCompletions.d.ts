declare function ye(e: any, t: any, i: any, n: any, d: any, u: any): {
    readonly didAllProvidersReturn: boolean;
    lists: P;
    cancelAndDispose: (o: any) => void;
};
declare function H(e: any, t: any): Readonly<{
    dispose(): void;
}> | undefined;
declare class Q {
    constructor(t: any, i: any, n: any, d: any, u: any, l: any, r: any, f: any, s: any, h: any);
    range: any;
    insertText: any;
    snippetInfo: any;
    displayLocation: any;
    additionalTextEdits: any;
    sourceInlineCompletion: any;
    source: any;
    context: any;
    isInlineEdit: any;
    l: any;
    a: boolean;
    d: number;
    g: number;
    i: boolean;
    k: number;
    h: {
        editorType: any;
    };
    get showInlineEditMenu(): any;
    getSingleTextEdit(): C;
    reportInlineEditShown(t: any, i: any, n: any, d: any): Promise<void>;
    b: number | undefined;
    reportPartialAccept(t: any, i: any): void;
    reportEndOfLife(t: any): void;
    reportInlineEditError(t: any): void;
    setEndOfLifeReason(t: any): void;
    j: any;
    m(t: any): void;
    c: number | undefined;
    f: number | undefined;
    n(): void;
}
declare class X {
    constructor(t: any, i: any, n: any);
    inlineSuggestions: any;
    inlineSuggestionsData: any;
    provider: any;
    a: number;
    addRef(): void;
    removeRef(t?: {
        kind: string;
    }): void;
}
declare var k: any;
import { $bi as P } from "../../../../../base/common/async.js";
import { $sF as C } from "../../../../common/core/edits/textEdit.js";
export { ye as $dlb, H as $elb, Q as $flb, X as $glb, k as InlineCompletionEditorType };
//# sourceMappingURL=provideInlineCompletions.d.ts.map