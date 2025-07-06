declare function o(r: any): {
    top: number;
    bottom: number;
};
declare namespace n {
    export { e as padding };
    export let scrollBeyondLastLine: boolean;
    export namespace scrollbar {
        let verticalScrollbarSize: number;
        let horizontal: string;
        let vertical: string;
        let useShadows: boolean;
        let verticalHasArrows: boolean;
        let horizontalHasArrows: boolean;
        let alwaysConsumeMouseWheel: boolean;
    }
    export let renderLineHighlightOnlyWhenFocus: boolean;
    export let overviewRulerLanes: number;
    export let overviewRulerBorder: boolean;
    export let selectOnLineNumbers: boolean;
    export let wordWrap: string;
    export let lineNumbers: string;
    export let glyphMargin: boolean;
    export let fixedOverflowWidgets: boolean;
    export namespace minimap {
        let enabled: boolean;
    }
    export let renderValidationDecorations: string;
    export let renderLineHighlight: string;
    export let readOnly: boolean;
}
declare namespace a {
    let glyphMargin_1: boolean;
    export { glyphMargin_1 as glyphMargin };
    export let enableSplitViewResizing: boolean;
    export let renderIndicators: boolean;
    export let renderMarginRevertIcon: boolean;
    let readOnly_1: boolean;
    export { readOnly_1 as readOnly };
    export let isInEmbeddedEditor: boolean;
    export let renderOverviewRuler: boolean;
    let wordWrap_1: string;
    export { wordWrap_1 as wordWrap };
    export let diffWordWrap: string;
    export let diffAlgorithm: string;
    export let renderSideBySide: boolean;
    export let useInlineViewWhenSpaceIsLimited: boolean;
}
declare namespace e {
    let top: number;
    let bottom: number;
}
export { o as $Jzb, n as $Kzb, a as $Lzb };
//# sourceMappingURL=diffCellEditorOptions.d.ts.map