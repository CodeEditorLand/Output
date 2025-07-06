export { m as $7Wb };
declare let m: {
    new (t: any, e: any, i: any): {
        c: any;
        f: any;
        g: any;
        a: Map<any, any>;
        b: any;
        onDidChange: any;
        readonly attachments: any[];
        readonly size: number;
        readonly fileAttachments: any[];
        getAttachmentIDs(): Set<any>;
        addFile(t: any, e: any): Promise<void>;
        addFolder(t: any): void;
        clear(t?: boolean): void;
        addContext(...t: any[]): void;
        clearAndSetContext(...t: any[]): void;
        delete(...t: any[]): void;
        updateContext(t: any, e: any): void;
        asFileVariableEntry(t: any, e: any): {
            kind: string;
            value: any;
            id: any;
            name: any;
        };
        asImageVariableEntry(t: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=chatAttachmentModel.d.ts.map