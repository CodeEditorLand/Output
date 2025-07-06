declare let y: {
    new (t: any, i: any, e: any, r: any, s: any, l: any, a: any, f: any, $: any, I: any, v: any, R: any): {
        readonly local: any[];
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        a: any[];
        b: any[];
        c: any[];
        f: any;
        onChange: any;
        g: any;
        onReset: any;
        C(): Promise<void>;
        D(t: any): void;
        F(t: any): void;
        G(t: any, i: any): any;
        H(t: any): void;
        I(t: any): any;
        J(): Promise<void>;
        L(t: any): Promise<void>;
        queryGallery(t: any, i: any): Promise<any>;
        queryLocal(): Promise<any[]>;
        install(t: any): Promise<any>;
        uninstall(t: any): Promise<void>;
        M(t: any, i: any): Promise<any>;
        N(t: any): Promise<any>;
        getMcpConfigPath(t: any): any;
        O(t: any): {
            id: string;
            key: string;
            target: number;
            label: any;
            scope: number;
            order: number;
            uri: any;
            section: never[];
        };
        P(t: any): {
            id: string;
            key: string;
            target: number;
            label: any;
            scope: number;
            order: number;
            remoteAuthority: any;
            uri: any;
            section: never[];
        };
        Q(t: any): {
            id: string;
            key: string;
            target: number;
            label: any;
            scope: number;
            order: number;
            remoteAuthority: any;
            uri: any;
            section: string[];
            workspaceFolder?: never;
        } | {
            id: string;
            key: string;
            target: number;
            label: string;
            scope: number;
            remoteAuthority: any;
            order: number;
            uri: any;
            workspaceFolder: any;
            section?: never;
        } | undefined;
        handleURL(t: any): Promise<boolean>;
        open(t: any, i: any): Promise<void>;
        R(t: any): 0 | 1 | 2 | 3;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let g: {
    new (t: any, i: any, e: any): {
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { y as $vkc, g as $wkc };
//# sourceMappingURL=mcpWorkbenchService.d.ts.map