declare class m {
    constructor(e: any, t: any, i: any);
    g: any;
    h: any;
    j: any;
    e: number;
    _nestingLevel: number;
    d: any[][];
    _placeholderGroupsIdx: number;
    initialize(e: any): void;
    dispose(): void;
    k(): void;
    c: Map<any, any> | undefined;
    move(e: any): any;
    l(e: any): boolean;
    get isAtFirstPlaceholder(): boolean;
    get isAtLastPlaceholder(): boolean;
    get hasPlaceholder(): boolean;
    get isTrivialSnippet(): boolean;
    computePossibleSelections(): Map<any, any>;
    get activeChoice(): {
        range: any;
        choice: any;
    } | undefined;
    get hasChoice(): boolean;
    merge(e: any): void;
    getEnclosingRange(): any;
}
declare let Z: {
    new (e: any, t: any, i: {
        overwriteBefore: number;
        overwriteAfter: number;
        adjustWhitespace: boolean;
        clipboardText: undefined;
        overtypingCapturer: undefined;
    } | undefined, n: any): {
        e: any;
        f: any;
        g: {
            overwriteBefore: number;
            overwriteAfter: number;
            adjustWhitespace: boolean;
            clipboardText: undefined;
            overtypingCapturer: undefined;
        };
        h: any;
        c: any[];
        d: any[];
        dispose(): void;
        _logInfo(): string;
        insert(e: any): void;
        merge(e: any, t?: {
            overwriteBefore: number;
            overwriteAfter: number;
            adjustWhitespace: boolean;
            clipboardText: undefined;
            overtypingCapturer: undefined;
        }): void;
        next(): void;
        prev(): void;
        j(e: any): any[];
        readonly isAtFirstPlaceholder: any;
        readonly isAtLastPlaceholder: any;
        readonly hasPlaceholder: any;
        readonly hasChoice: any;
        readonly activeChoice: any;
        isSelectionWithinPlaceholders(): boolean;
        getEnclosingRange(): any;
    };
    adjustWhitespace(e: any, t: any, i: any, n: any, s: any): any;
    adjustSelection(e: any, t: any, i: any, n: any): any;
    createEditsAndSnippetsFromSelections(e: any, t: any, i: any, n: any, s: any, o: any, l: any, r: any, a: any): {
        edits: any[];
        snippets: any[];
    };
    createEditsAndSnippetsFromEdits(e: any, t: any, i: any, n: any, s: any, o: any, l: any): {
        edits: {
            range: any;
            text: any;
        }[];
        snippets: m[];
    };
};
export { m as $ykb, Z as $zkb };
//# sourceMappingURL=snippetSession.d.ts.map