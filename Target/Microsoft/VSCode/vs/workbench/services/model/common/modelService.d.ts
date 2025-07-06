export { c as $j6b };
declare let c: {
    new (r: any, o: any, e: any, i: any, t: any): {
        Q: any;
        M(r: any): boolean;
        r: any;
        s: any;
        t: any;
        u: any;
        c: any;
        onModelAdded: any;
        f: any;
        onModelRemoved: any;
        g: any;
        onModelLanguageChanged: any;
        h: any;
        j: {};
        m: Map<any, any>;
        n: number;
        y(t: any, i: any): any;
        z(): boolean;
        getCreationOptions(t: any, i: any, e: any): any;
        C(t: any): void;
        F(t: any): void;
        G(t: any): any;
        H(t: any): void;
        I(t: any, i: any, e: any, o: any): {
            model: any;
            c: import("../../../../base/common/lifecycle.js").$ud;
            dispose(): void;
        };
        updateModel(t: any, i: any, e?: import("../../../../editor/common/textModelEditReason.js").$ME): void;
        createModel(t: any, i: any, e: any, o?: boolean): any;
        destroyModel(t: any): void;
        getModels(): any[];
        getModel(t: any): any;
        N(t: any): void;
        O(t: any, i: any): void;
        P(): import("../../../../editor/common/services/modelService.js").$qQb;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    MAX_MEMORY_FOR_CLOSED_FILES_UNDO_STACK: number | undefined;
    w(t: any, i: any): {
        isForSimpleWidget: any;
        tabSize: number;
        indentSize: string;
        insertSpaces: boolean;
        detectIndentation: boolean;
        defaultEOL: number;
        trimAutoWhitespace: boolean;
        largeFileOptimizations: boolean;
        bracketPairColorizationOptions: {
            enabled: boolean;
            independentColorPoolPerBracketType: boolean;
        };
    };
    D(t: any, i: any, e: any): void;
    J(t: any, i: any, e: any, o: any, s: any, n: any): number;
    L(t: any, i: any, e: any, o: any, s: any, n: any): number;
    _computeEdits(t: any, i: any): {
        range: any;
        text: any;
        forceMoveMarkers: boolean;
    }[];
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=modelService.d.ts.map