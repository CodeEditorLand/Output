declare let c: {
    new (s: any, t: any): {
        a: any;
        b: any;
        getContent(s: any): Promise<string>;
        getTasksResourceContent(s: any): Promise<{
            tasks: any;
        }>;
        apply(s: any, t: any): Promise<void>;
        c(s: any): Promise<any>;
    };
};
declare let f: {
    new (s: any, t: any, e: any): {
        a: any;
        b: any;
        c: any;
        initialize(s: any): Promise<void>;
    };
};
declare let p: {
    new (s: any, t: any, e: any): {
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
export { c as $$6b, f as $06b, p as $_6b };
//# sourceMappingURL=tasksResource.d.ts.map