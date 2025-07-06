declare let m: {
    new (e: any, t: any, r: any): {
        b: any;
        c: any;
    };
    ID: string | undefined;
};
declare let O: {
    new (e: any, t: any, r: any, i: any, o: any, n: any, s: any): {
        readonly isDisposed: boolean;
        r: any;
        s: any;
        u: any;
        creationOptions: {
            menuIds: {
                notebookToolbar: import("../../../../../platform/actions/common/actions.js").$FI | undefined;
                cellTitleToolbar: import("../../../../../platform/actions/common/actions.js").$FI | undefined;
                cellDeleteToolbar: import("../../../../../platform/actions/common/actions.js").$FI | undefined;
                cellInsertToolbar: import("../../../../../platform/actions/common/actions.js").$FI | undefined;
                cellTopInsertToolbar: import("../../../../../platform/actions/common/actions.js").$FI | undefined;
                cellExecuteToolbar: import("../../../../../platform/actions/common/actions.js").$FI | undefined;
                cellExecutePrimary: import("../../../../../platform/actions/common/actions.js").$FI | undefined;
            };
            cellEditorContributions: any;
        };
        c: any;
        m: boolean;
        g: any;
        Y(e: any): void;
        b: any;
        readonly db: any;
        f: any;
        eb(): any;
        fb(e: any, t: any, r: any): Promise<void>;
        gb(): any;
        getTitle(): any;
        setInput(e: any, t: any, r: any, i: any): Promise<void>;
        j: any;
        hb(e: any, t: any): {
            type: number;
            source: any;
            htmlContent: string;
        };
        ib(e: any, t: any): {
            type: number;
            source: any;
            htmlContent: string;
        };
        jb(e: any, t: any): {
            type: number;
            source: any;
            htmlContent: string;
        };
        scheduleOutputHeightAck(e: any, t: any, r: any): void;
        focusNotebookCell(e: any, t: any): Promise<void>;
        focusNextNotebookCell(e: any, t: any): Promise<void>;
        toggleNotebookCellSelection(e: any): void;
        getCellById(e: any): void;
        getCellByInfo(e: any): any;
        layout(e: any, t: any): void;
        setScrollTop(e: any): void;
        triggerScroll(e: any): void;
        getOutputRenderer(): void;
        updateOutputHeight(e: any, t: any, r: any, i: any, o: any): void;
        updateMarkupCellHeight(e: any, t: any, r: any): void;
        setMarkupCellEditState(e: any, t: any): void;
        didResizeOutput(e: any): void;
        didStartDragMarkupCell(e: any, t: any): void;
        didDragMarkupCell(e: any, t: any): void;
        didDropMarkupCell(e: any, t: any): void;
        didEndDragMarkupCell(e: any): void;
        updatePerformanceMetadata(e: any, t: any, r: any, i: any): void;
        didFocusOutputInputChange(e: any): void;
        dispose(): void;
        readonly minimumWidth: any;
        readonly maximumWidth: any;
        readonly minimumHeight: any;
        readonly maximumHeight: any;
        readonly input: any;
        readonly options: any;
        readonly window: any;
        readonly scopedContextKeyService: void;
        group: any;
        onDidChangeSizeConstraints: any;
        S: any;
        onDidChangeControl: any;
        create(t: any): void;
        W: any;
        X: any;
        clearInput(): void;
        setOptions(t: any): void;
        setVisible(t: any): void;
        Z(t: any): void;
        setBoundarySashes(t: any): void;
        ab(t: any, e: any, n: any, i?: number): any;
        getViewState(): void;
        I(): void;
        readonly onDidFocus: any;
        y: any;
        readonly onDidBlur: any;
        J: any;
        hasFocus(): boolean;
        M(): any;
        L: boolean;
        Q: any;
        t: any;
        onTitleAreaUpdate: any;
        O: boolean;
        P: any;
        getContainer(): any;
        focus(): void;
        getMenuIds(): never[];
        getActions(): never[];
        getSecondaryActions(): never[];
        getContextMenuActions(): never[];
        getActionViewItem(t: any, i: any): void;
        getActionsContext(): null;
        getActionRunner(): any;
        N: any;
        R(): void;
        isVisible(): boolean;
        getControl(): void;
        D: any;
        C: import("../../../../common/memento.js").$Dub;
        getId(): any;
        F(t: any, e: any): any;
        G(t: any): void;
        H(t: any, e: any): any;
        n: any;
        h: any;
        w(t: any): void;
        updateStyles(): void;
        z(t: any, r: any): any;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    U: Map<any, any> | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class k extends T {
    get value(): Readonly<{
        padding: {
            top: number;
            bottom: number;
        };
        readOnly: true;
        scrollBeyondLastLine?: boolean;
        scrollbar?: {
            verticalScrollbarSize: number;
            horizontal: string;
            useShadows: boolean;
            verticalHasArrows: boolean;
            horizontalHasArrows: boolean;
            alwaysConsumeMouseWheel: boolean;
        };
        renderLineHighlightOnlyWhenFocus?: boolean;
        overviewRulerLanes?: number;
        lineDecorationsWidth?: number;
        folding?: boolean;
        fixedOverflowWidgets?: boolean;
        minimap?: {
            enabled: boolean;
        };
        renderValidationDecorations?: string;
        lineNumbersMinChars?: number;
    }>;
    c: any;
    onDidChange: any;
    f: Readonly<{
        padding: {
            top: number;
            bottom: number;
        };
        readOnly: true;
        scrollBeyondLastLine?: boolean;
        scrollbar?: {
            verticalScrollbarSize: number;
            horizontal: string;
            useShadows: boolean;
            verticalHasArrows: boolean;
            horizontalHasArrows: boolean;
            alwaysConsumeMouseWheel: boolean;
        };
        renderLineHighlightOnlyWhenFocus?: boolean;
        overviewRulerLanes?: number;
        lineDecorationsWidth?: number;
        folding?: boolean;
        fixedOverflowWidgets?: boolean;
        minimap?: {
            enabled: boolean;
        };
        renderValidationDecorations?: string;
        lineNumbersMinChars?: number;
    }>;
}
import { $vd as T } from "../../../../../base/common/lifecycle.js";
export { m as $$ec, O as $0ec, k as $9ec };
//# sourceMappingURL=notebookOutputEditor.d.ts.map