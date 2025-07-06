declare let C: {
    new (t: any, e: any, s: any, n: any, i: any, a: any, o: any, r: any, l: any, c: any, u: any, f: any): {
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
        O(t: any, e: any, s: any, n: any, i: any, a: any, o: any): Promise<w>;
        P(t: any): Promise<any>;
        Q(): {
            version: any;
            date: any;
        };
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class w {
    static createNlsConfiguration(t: any): {
        language: any;
        pseudo: boolean;
        devMode: any;
        translations: any;
    };
    static equals(t: any, e: any): any;
    constructor(t: any, e: any, s: any, n: any, i: any, a: any, o: any, r: any, l: any, c: any, u: any, f: any, p: any, O: any);
    location: any;
    mtime: any;
    applicationExtensionslocation: any;
    applicationExtensionslocationMtime: any;
    profile: any;
    profileScanOptions: any;
    type: any;
    validate: any;
    productVersion: any;
    productDate: any;
    productCommit: any;
    devMode: any;
    language: any;
    translations: any;
}
declare function Jt(h: any, t: any): any;
declare const qt_base: {
    new (t: any, e: any, s: any, n: any, i: any, a: any, o: any, r: any, l: any, c: any, u: any, f: any): {
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
        O(t: any, e: any, s: any, n: any, i: any, a: any, o: any): Promise<w>;
        P(t: any): Promise<any>;
        Q(): {
            version: any;
            date: any;
        };
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class qt extends qt_base {
    R: Promise<any>;
    f(t: any): Promise<any>;
}
declare const At: any;
declare var D: any;
export { C as $1z, w as $2z, Jt as $3z, qt as $4z, At as $Zz, D as Translations };
//# sourceMappingURL=extensionsScannerService.d.ts.map