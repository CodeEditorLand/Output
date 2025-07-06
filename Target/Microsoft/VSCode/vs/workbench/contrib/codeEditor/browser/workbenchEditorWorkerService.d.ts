export { p as $F8b };
declare let p: {
    new (r: any, t: any, e: any, n: any, o: any): {
        g: any;
        a: any;
        b: any;
        f: any;
        dispose(): void;
        canComputeUnicodeHighlights(t: any): boolean;
        computedUnicodeHighlights(t: any, e: any, r: any): Promise<any>;
        computeDiff(t: any, e: any, r: any, i: any): Promise<{
            identical: any;
            quitEarly: any;
            changes: any;
            moves: any;
        } | null>;
        canComputeDirtyDiff(t: any, e: any): boolean;
        computeDirtyDiff(t: any, e: any, r: any): Promise<any>;
        computeMoreMinimalEdits(t: any, e: any, r?: boolean): Promise<any>;
        computeHumanReadableDiff(t: any, e: any): Promise<any>;
        computeStringEditFromDiff(t: any, e: any, r: any, i: any): Promise<import("../../../../editor/common/core/edits/stringEdit.js").$lF>;
        canNavigateValueSet(t: any): boolean;
        navigateValueSet(t: any, e: any, r: any): Promise<any>;
        canComputeWordRanges(t: any): boolean;
        computeWordRanges(t: any, e: any): Promise<any>;
        findSectionHeaders(t: any, e: any): Promise<any>;
        computeDefaultDocumentColors(t: any): Promise<any>;
        h(t: any, e?: boolean): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=workbenchEditorWorkerService.d.ts.map