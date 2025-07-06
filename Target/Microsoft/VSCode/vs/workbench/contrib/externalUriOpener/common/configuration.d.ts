declare const p: "default";
declare const m: "workbench.externalUriOpeners";
declare const a: {
    properties: {
        "workbench.externalUriOpeners": {
            type: string;
            markdownDescription: any;
            defaultSnippets: {
                body: {
                    "example.com": string;
                };
            }[];
            additionalProperties: {
                anyOf: ({
                    type: string;
                    enum: never[];
                } | {
                    type: string;
                    markdownDescription: any;
                    enum?: never;
                    enumDescriptions?: never;
                } | {
                    type: string;
                    markdownDescription: any;
                    enum: string[];
                    enumDescriptions: any[];
                })[];
            };
        };
    };
    id: "workbench";
    order: 7;
    title: any;
    type: "object";
};
declare function u(s: any, n: any): void;
export { p as $Q1b, m as $R1b, a as $S1b, u as $T1b };
//# sourceMappingURL=configuration.d.ts.map