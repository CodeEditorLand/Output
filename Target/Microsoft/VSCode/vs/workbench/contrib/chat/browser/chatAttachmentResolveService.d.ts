declare const ut: any;
declare let $: {
    new (t: any, e: any, r: any, n: any, i: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        e: any;
        resolveEditorAttachContext(t: any): Promise<any>;
        resolveUntitledEditorAttachContext(t: any): Promise<{
            id: string;
            name: string;
            value: any;
            kind: string;
            modelDescription: string;
            isRoot: boolean;
            originLabel: any;
            automaticallyAdded: boolean;
        } | {
            kind: string;
            value: any;
            id: any;
            name: any;
            omittedState: number;
        } | undefined>;
        resolveResourceAttachContext(t: any, e: any): Promise<{
            id: string;
            name: string;
            value: any;
            kind: string;
            modelDescription: string;
            isRoot: boolean;
            originLabel: any;
            automaticallyAdded: boolean;
        } | {
            kind: string;
            value: any;
            id: any;
            name: any;
            omittedState: number;
        }>;
        resolveImageEditorAttachContext(t: any, e: any, r: any): Promise<any>;
        resolveImageAttachContext(t: any): Promise<any[]>;
        resolveMarkerAttachContext(t: any): any;
        resolveSymbolsAttachContext(t: any): any;
        resolveNotebookOutputAttachContext(t: any): {
            value: any;
            id: any;
            name: any;
            icon: any;
            kind: string;
            outputIndex: number;
            mimeType: any;
        }[];
    };
};
export { ut as $5Wb, $ as $6Wb };
//# sourceMappingURL=chatAttachmentResolveService.d.ts.map