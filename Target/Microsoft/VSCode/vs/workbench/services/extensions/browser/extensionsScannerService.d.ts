export { i as $bCc };
declare let i: {
    new (o: any, t: any, n: any, p: any, r: any, m: any, a: any, e: any, u: any): {
        f(): Promise<{}>;
        systemExtensionsLocation: any;
        userExtensionsLocation: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        g: any;
        onDidChangeCache: any;
        h: any;
        j: any;
        m: any;
        F(): Promise<"unknown" | "win32-x64" | "win32-arm64" | "linux-x64" | "linux-arm64" | "linux-armhf" | "alpine-x64" | "alpine-arm64" | "darwin-x64" | "darwin-arm64" | "web" | undefined>;
        D: Promise<"unknown" | "win32-x64" | "win32-arm64" | "linux-x64" | "linux-arm64" | "linux-armhf" | "alpine-x64" | "alpine-arm64" | "darwin-x64" | "darwin-arm64" | "web" | undefined> | undefined;
        scanAllExtensions(t: any, e: any): Promise<any[]>;
        scanSystemExtensions(t: any): Promise<any>;
        scanUserExtensions(t: any): Promise<any>;
        scanAllUserExtensions(t?: {
            includeInvalid: boolean;
            includeAllVersions: boolean;
        }): Promise<any>;
        scanExtensionsUnderDevelopment(t: any, e: any): Promise<any>;
        scanExistingExtension(t: any, e: any, s: any): Promise<any>;
        scanOneOrMultipleExtensions(t: any, e: any, s: any): Promise<any>;
        scanMultipleExtensions(t: any, e: any, s: any): Promise<any>;
        updateManifestMetadata(t: any, e: any): Promise<void>;
        initializeDefaultProfileExtensions(): Promise<void>;
        H(): Promise<any>;
        G: any;
        I(t: any, e: any, s?: {}): Promise<any>;
        J(t: any, e: any, s: any, n: any, i: any): any[];
        L(t: any): Promise<any>;
        M(t: any, e: any): Promise<any>;
        N(): Promise<any>;
        O(t: any, e: any, s: any, n: any, i: any, a: any, o: any): Promise<import("../../../../platform/extensionManagement/common/extensionsScannerService.js").$2z>;
        P(t: any): Promise<any>;
        Q(): {
            version: any;
            date: any;
        };
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=extensionsScannerService.d.ts.map