export { l as $Ugc };
declare let l: {
    new (t: any, e: any, s: any, r: any, i: any, o: any, h: any): {
        readonly isDisposed: boolean;
        readonly isEditFromUs: any;
        readonly allEditsAreFromUs: any;
        readonly diffInfo: any;
        notebookUri: any;
        cell: any;
        g: any;
        h: any;
        j: any;
        m: any;
        a: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        maxModifiedLineNumber: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        b: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        state: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        c: any;
        f: any;
        clearCurrentEditLineDecoration(): void;
        acceptAgentEdits(t: any, e: any, s: any): Promise<void>;
        revertMarkdownPreviewState(): void;
        keep(t: any): Promise<any>;
        undo(t: any): Promise<any>;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=chatEditingNotebookCellEntry.d.ts.map