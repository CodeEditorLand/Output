declare let h: {
    new (e: any, t: any, n: any): {
        a: any;
        b: any;
        c: any;
        initialize(e: any): Promise<void>;
    };
};
declare let c: {
    new (e: any, t: any): {
        a: any;
        b: any;
        getContent(e: any): Promise<string>;
        getKeybindingsResourceContent(e: any): Promise<{
            keybindings: any;
            platform: number;
        }>;
        apply(e: any, t: any): Promise<void>;
        c(e: any): Promise<any>;
    };
};
declare let f: {
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
        isFromDefaultProfile(): boolean;
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
    };
};
export { h as $46b, c as $56b, f as $66b };
//# sourceMappingURL=keybindingsResource.d.ts.map