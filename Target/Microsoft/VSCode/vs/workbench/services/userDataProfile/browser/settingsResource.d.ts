declare let f: {
    new (e: any, t: any, n: any): {
        a: any;
        b: any;
        c: any;
        initialize(e: any): Promise<void>;
    };
};
declare let c: {
    new (e: any, t: any, n: any): {
        a: any;
        b: any;
        c: any;
        getContent(e: any): Promise<string>;
        getSettingsContent(e: any): Promise<{
            settings: any;
        }>;
        apply(e: any, t: any): Promise<void>;
        d(): string[];
        e(e: any): Promise<any>;
    };
};
declare let p: {
    new (e: any, t: any, n: any): {
        a: any;
        b: any;
        c: any;
        type: string;
        handle: string;
        label: {
            label: any;
        };
        collapsibleState: any;
        getChildren(): Promise<{
            handle: any;
            resourceUri: any;
            collapsibleState: any;
            parent: /*elided*/ any;
            accessibilityInformation: {
                label: any;
            };
            command: {
                id: string;
                title: string;
                arguments: any[];
            };
        }[]>;
        hasContent(): Promise<boolean>;
        getContent(): Promise<any>;
        isFromDefaultProfile(): boolean;
    };
};
export { f as $16b, c as $26b, p as $36b };
//# sourceMappingURL=settingsResource.d.ts.map