export { u as $n5 };
declare let u: {
    new (e: any): {
        a: any;
        onDidChangeExtensionGalleryManifest: any;
        isEnabled(): boolean;
        getExtensionGalleryManifest(): Promise<{
            version: string;
            resources: {
                id: string;
                type: string;
            }[];
            capabilities: {
                extensionQuery: {
                    filtering: {
                        name: string;
                        value: number;
                    }[];
                    sorting: {
                        name: string;
                        value: number;
                    }[];
                    flags: {
                        name: string;
                        value: number;
                    }[];
                };
                signing: {
                    allPublicRepositorySigned: boolean;
                };
            };
        } | null>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=extensionGalleryManifestService.d.ts.map