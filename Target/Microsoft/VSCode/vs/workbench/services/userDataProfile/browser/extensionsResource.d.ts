declare let P: {
    new (n: any, e: any, i: any, a: any, s: any): {
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        initialize(n: any): Promise<void>;
    };
};
declare let g: {
    new (n: any, e: any, i: any, a: any, s: any): {
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        getContent(n: any, e: any): Promise<string>;
        toContent(n: any, e: any): string;
        apply(n: any, e: any, i: any, a: any): Promise<any>;
        copy(n: any, e: any, i: any): Promise<void>;
        getLocalExtensions(n: any): Promise<any>;
        getProfileExtensions(n: any): Promise<any>;
        i(n: any, e: any): Promise<any>;
    };
};
declare class S {
    type: string;
    handle: string;
    label: {
        label: any;
    };
    collapsibleState: any;
    contextValue: string;
    c: Set<any>;
    getChildren(): Promise<any>;
    hasContent(): Promise<boolean>;
}
declare let I: {
    new (n: any, e: any): {
        f: any;
        g: any;
        isFromDefaultProfile(): boolean;
        d(): any;
        getContent(): Promise<any>;
        type: string;
        handle: string;
        label: {
            label: any;
        };
        collapsibleState: any;
        contextValue: string;
        c: Set<any>;
        getChildren(): Promise<any>;
        hasContent(): Promise<boolean>;
    };
};
declare let $: {
    new (n: any, e: any): {
        f: any;
        g: any;
        isFromDefaultProfile(): boolean;
        d(): any;
        getContent(): Promise<any>;
        type: string;
        handle: string;
        label: {
            label: any;
        };
        collapsibleState: any;
        contextValue: string;
        c: Set<any>;
        getChildren(): Promise<any>;
        hasContent(): Promise<boolean>;
    };
};
export { P as $a7b, g as $b7b, S as $c7b, I as $d7b, $ as $e7b };
//# sourceMappingURL=extensionsResource.d.ts.map