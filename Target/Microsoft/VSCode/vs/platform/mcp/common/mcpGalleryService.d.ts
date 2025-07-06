export { v as $r5 };
declare let v: {
    new (r: any, n: any, e: any, i: any, t: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        g: any;
        isEnabled(): boolean;
        query(r: any, n?: any): Promise<{
            id: any;
            name: any;
            displayName: any;
            url: any;
            description: any;
            version: any;
            lastUpdated: number | undefined;
            repositoryUrl: any;
            codicon: any;
            icon: {
                light: any;
                dark: any;
            } | undefined;
            readmeUrl: any;
            manifestUrl: any;
            packageTypes: any;
            publisher: string;
            publisherDisplayName: any;
            publisherDomain: {
                link: any;
                verified: any;
            } | undefined;
            manifest: any;
        }[]>;
        getMcpServers(r: any): Promise<any>;
        getManifest(r: any, n: any): Promise<any>;
        getReadme(r: any, n: any): Promise<any>;
        h(r: any): {
            id: any;
            name: any;
            displayName: any;
            url: any;
            description: any;
            version: any;
            lastUpdated: number | undefined;
            repositoryUrl: any;
            codicon: any;
            icon: {
                light: any;
                dark: any;
            } | undefined;
            readmeUrl: any;
            manifestUrl: any;
            packageTypes: any;
            publisher: string;
            publisherDisplayName: any;
            publisherDomain: {
                link: any;
                verified: any;
            } | undefined;
            manifest: any;
        };
        j(r: any, n: any): Promise<any>;
        m(r: any): any;
        n(): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=mcpGalleryService.d.ts.map