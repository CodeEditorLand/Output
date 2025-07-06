export { f as $l5b };
declare let f: {
    new (i: any, t: any, o: any): {
        n: any;
        r: any;
        f: any;
        s(): void;
        t(): void;
        g: {
            properties: {
                "workbench.editor.autoLockGroups": {
                    type: string;
                    description: any;
                    properties: any;
                    default: any;
                    additionalProperties: boolean;
                };
            };
            id: "workbench";
            order: 7;
            title: any;
            type: "object";
        } | undefined;
        h: {
            properties: {
                "workbench.editor.defaultBinaryEditor": {
                    type: string;
                    default: string;
                    enum: any[];
                    description: any;
                };
            };
            id: "workbench";
            order: 7;
            title: any;
            type: "object";
        } | undefined;
        j: {
            properties: {
                "workbench.editorAssociations": {
                    type: string;
                    markdownDescription: any;
                    patternProperties: {
                        ".*": {
                            type: string;
                            enum: any;
                        };
                    };
                };
            };
            id: "workbench";
            order: 7;
            title: any;
            type: "object";
        } | undefined;
        m: {
            properties: {
                "workbench.editorLargeFileConfirmation": {
                    type: string;
                    default: number;
                    minimum: number;
                    scope: number;
                    markdownDescription: any;
                };
            };
            id: "workbench";
            order: 7;
            title: any;
            type: "object";
        } | undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    a: Set<string> | undefined;
    b: {
        id: string;
        label: any;
        priority: any;
    }[] | undefined;
    c: Set<string> | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=editorConfiguration.d.ts.map