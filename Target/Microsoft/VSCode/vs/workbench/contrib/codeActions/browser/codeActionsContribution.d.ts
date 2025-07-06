declare const j: Readonly<{
    properties: {
        "editor.codeActionsOnSave": {
            oneOf: ({
                type: string;
                additionalProperties: {
                    type: string;
                };
                items?: never;
            } | {
                type: string;
                items: {
                    type: string;
                };
                additionalProperties?: never;
            })[];
            markdownDescription: any;
            type: string[];
            additionalProperties: {
                type: string;
                enum: (string | boolean)[];
            };
            default: {};
            scope: number;
        };
    };
    id: "editor";
    order: 5;
    type: "object";
    title: any;
    scope: 6;
}>;
declare const U: Readonly<{
    properties: {
        "notebook.codeActionsOnSave": {
            oneOf: ({
                type: string;
                additionalProperties: {
                    type: string;
                };
                items?: never;
            } | {
                type: string;
                items: {
                    type: string;
                };
                additionalProperties?: never;
            })[];
            markdownDescription: any;
            type: string;
            additionalProperties: {
                type: string[];
                enum: (string | boolean)[];
            };
            default: {};
        };
    };
    id: "editor";
    order: 5;
    type: "object";
    title: any;
    scope: 6;
}>;
declare let h: {
    new (t: any, e: any): {
        c: any;
        a: any;
        b: any[];
        f(): any[];
        g(t: any): void;
        h(): {
            if: {
                required: string[];
                properties: {
                    command: {
                        const: any;
                    };
                };
            };
            then: {
                properties: {
                    args: {
                        required: string[];
                        properties: {
                            kind: {
                                anyOf: ({
                                    enum: any[];
                                    type?: never;
                                } | {
                                    type: string;
                                    enum?: never;
                                })[];
                            };
                        };
                    };
                };
            };
        }[];
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { j as $Ayc, U as $Byc, h as $Cyc };
//# sourceMappingURL=codeActionsContribution.d.ts.map