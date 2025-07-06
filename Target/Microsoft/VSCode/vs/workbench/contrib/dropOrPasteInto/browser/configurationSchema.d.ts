declare const _: Readonly<{
    properties: {
        "editor.pasteAs.preferences": {
            type: string;
            scope: number;
            description: any;
            default: never[];
            items: {
                description: any;
                anyOf: ({
                    type: string;
                    enum?: never;
                } | {
                    enum: any[];
                    type?: never;
                })[];
            };
        };
        "editor.dropIntoEditor.preferences": {
            type: string;
            scope: number;
            description: any;
            default: never[];
            items: {
                description: any;
                anyOf: ({
                    type: string;
                    enum?: never;
                } | {
                    enum: any[];
                    type?: never;
                })[];
            };
        };
    };
    id: "editor";
    order: 5;
    type: "object";
    title: any;
    scope: 6;
}>;
declare let l: {
    new (e: any, t: any): {
        f: any;
        a: any;
        b: any[];
        c: any[];
        g(): void;
        h(): void;
        j(): {
            if: {
                required: string[];
                properties: {
                    command: {
                        const: string;
                    };
                };
            };
            then: {
                properties: {
                    args: {
                        oneOf: ({
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
                                preferences?: never;
                            };
                        } | {
                            required: string[];
                            properties: {
                                preferences: {
                                    type: string;
                                    items: {
                                        anyOf: ({
                                            enum: any[];
                                            type?: never;
                                        } | {
                                            type: string;
                                            enum?: never;
                                        })[];
                                    };
                                };
                                kind?: never;
                            };
                        })[];
                    };
                };
            };
        }[];
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { _ as $rzc, l as $szc };
//# sourceMappingURL=configurationSchema.d.ts.map