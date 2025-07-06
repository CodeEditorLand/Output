declare namespace o {
    let explorer: string;
    let debug: string;
    let scm: string;
    let testing: string;
}
declare namespace r {
    export let extensionPoint: string;
    export { c as jsonSchema };
}
declare var e: any;
declare const c: Readonly<{
    type: "array";
    description: any;
    items: {
        type: string;
        description: any;
        required: any[];
        properties: {
            [e.view]: {
                anyOf: ({
                    type: string;
                    description: any;
                } | {
                    type: string;
                    description: any;
                    enum: string[];
                })[];
            };
            [e.contents]: {
                type: string;
                description: any;
            };
            [e.when]: {
                type: string;
                description: any;
            };
            [e.group]: {
                type: string;
                description: any;
            };
            [e.enablement]: {
                type: string;
                description: any;
            };
        };
    };
}>;
export { o as $bxc, r as $cxc, e as ViewsWelcomeExtensionPointFields };
//# sourceMappingURL=viewsWelcomeExtensionPoint.d.ts.map