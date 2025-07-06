declare class u extends T {
    constructor();
    id: string | undefined;
    dropMimeTypes: "text/plain"[];
    pasteMimeTypes: "text/plain"[];
    a(t: any, r: any): Promise<{
        handledMimeType: "text/plain";
        title: any;
        insertText: any;
        kind: any;
    } | undefined>;
}
declare let P: {
    new (t: any, r: any): {
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let x: {
    new (t: any, r: any): {
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class T {
    constructor(t: any);
    copyMimeTypes: any[];
    kind: any;
    providedDropEditKinds: any[];
    providedPasteEditKinds: any[];
    provideDocumentPasteEdits(t: any, r: any, e: any, s: any, i: any): Promise<{
        edits: {
            insertText: any;
            title: any;
            kind: any;
            handledMimeType: any;
            yieldTo: any;
        }[];
        dispose(): void;
    } | undefined>;
    provideDocumentDropEdits(t: any, r: any, e: any, s: any): Promise<{
        edits: {
            insertText: any;
            title: any;
            kind: any;
            handledMimeType: any;
            yieldTo: any;
        }[];
        dispose(): void;
    } | undefined>;
}
export { u as $Mhb, P as $Nhb, x as $Ohb };
//# sourceMappingURL=defaultProviders.d.ts.map