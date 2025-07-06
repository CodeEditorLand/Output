declare let u: {
    new (e: any, t: any, n: any): {
        a: any;
        b: any;
        c: any;
        initialize(e: any): Promise<void>;
    };
};
declare let a: {
    new (e: any, t: any): {
        a: any;
        b: any;
        getContent(e: any): Promise<string>;
        getMcpResourceContent(e: any): Promise<{
            mcp: any;
        }>;
        apply(e: any, t: any): Promise<void>;
        c(e: any): Promise<any>;
    };
};
declare let h: {
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
export { u as $Wxc, a as $Xxc, h as $Yxc };
//# sourceMappingURL=mcpProfileResource.d.ts.map