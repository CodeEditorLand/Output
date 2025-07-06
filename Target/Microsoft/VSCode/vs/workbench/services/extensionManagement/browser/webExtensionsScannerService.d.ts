export { v as $cCc };
declare let v: {
    new (e: any, r: any, n: any, s: any, i: any, t: any, o: any, a: any, c: any, p: any, m: any, g: any, U: any): {
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
        C: any;
        D: any;
        g: Y;
        c: any;
        f: any;
        h: any;
        G(): Promise<{
            extensions: any[];
            extensionsToMigrate: any[][];
            extensionLocations: any[];
            extensionGalleryResources: any[];
        }>;
        F: Promise<{
            extensions: any[];
            extensionsToMigrate: any[][];
            extensionLocations: any[];
            extensionGalleryResources: any[];
        }> | undefined;
        H(e: any): Promise<any[]>;
        I(): Promise<any[]>;
        J(e: any): Promise<any[]>;
        L(e: any): Promise<any[]>;
        M(e: any): Promise<any[]>;
        N(): Promise<any[]>;
        P(e: any): Promise<void>;
        O: Promise<void> | undefined;
        Q(): Promise<void>;
        R(): Promise<void>;
        U(): Promise<any[]>;
        S: Promise<any[]> | undefined;
        W(e: any): Promise<any[]>;
        X(e: any): Promise<any[]>;
        Y(e: any, r: any): Promise<void>;
        Z(e: any, r?: Set<any>, n?: Map<any, any>): any;
        scanSystemExtensions(): Promise<any[]>;
        scanUserExtensions(e: any, r: any): Promise<any[]>;
        scanExtensionsUnderDevelopment(): Promise<any[]>;
        scanExistingExtension(e: any, r: any, n: any): Promise<any>;
        scanExtensionManifest(e: any): Promise<any>;
        addExtensionFromGallery(e: any, r: any, n: any): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            location: any;
            manifest: any;
            type: number;
            isBuiltin: any;
            readmeUrl: any;
            changelogUrl: any;
            metadata: any;
            targetPlatform: string;
            validations: any[][];
            isValid: boolean;
            preRelease: boolean;
        }>;
        addExtension(e: any, r: any, n: any): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            location: any;
            manifest: any;
            type: number;
            isBuiltin: any;
            readmeUrl: any;
            changelogUrl: any;
            metadata: any;
            targetPlatform: string;
            validations: any[][];
            isValid: boolean;
            preRelease: boolean;
        }>;
        removeExtension(e: any, r: any): Promise<void>;
        updateMetadata(e: any, r: any, n: any): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            location: any;
            manifest: any;
            type: number;
            isBuiltin: any;
            readmeUrl: any;
            changelogUrl: any;
            metadata: any;
            targetPlatform: string;
            validations: any[][];
            isValid: boolean;
            preRelease: boolean;
        }>;
        copyExtensions(e: any, r: any, n: any): Promise<void>;
        $(e: any, r: any): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            location: any;
            manifest: any;
            type: number;
            isBuiltin: any;
            readmeUrl: any;
            changelogUrl: any;
            metadata: any;
            targetPlatform: string;
            validations: any[][];
            isValid: boolean;
            preRelease: boolean;
        }>;
        ab(e: any, r: any): Promise<void>;
        bb(e: any, r: any): Promise<any[]>;
        cb(e: any, r: any): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            version: any;
            location: any;
            manifest: any;
            readmeUri: any;
            changelogUri: any;
            packageNLSUris: any;
            fallbackPackageNLSUri: any;
            defaultManifestTranslations: any;
            metadata: any;
        }>;
        db(e: any, r: any, n: any, s: any, i: any): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            version: any;
            location: any;
            manifest: any;
            readmeUri: any;
            changelogUri: any;
            packageNLSUris: any;
            fallbackPackageNLSUri: any;
            defaultManifestTranslations: any;
            metadata: any;
        }>;
        eb(e: any): Map<any, any>;
        fb(e: any, r: any, n: any, s: any, i: any, t: any, o: any, a: any): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            version: any;
            location: any;
            manifest: any;
            readmeUri: any;
            changelogUri: any;
            packageNLSUris: any;
            fallbackPackageNLSUri: any;
            defaultManifestTranslations: any;
            metadata: any;
        }>;
        gb(e: any, r: any, n?: number): Promise<{
            identifier: {
                id: any;
                uuid: any;
            };
            location: any;
            manifest: any;
            type: number;
            isBuiltin: any;
            readmeUrl: any;
            changelogUrl: any;
            metadata: any;
            targetPlatform: string;
            validations: any[][];
            isValid: boolean;
            preRelease: boolean;
        }>;
        hb(e: any): Promise<any>;
        ib(e: any, r: any, n: any): Promise<any>;
        jb(e: any): Promise<any>;
        kb(e: any): Promise<any>;
        lb(e: any): Promise<any>;
        mb(e: any, r: any): Promise<any>;
        nb(): Promise<any>;
        ob(e: any): Promise<any>;
        pb(): Promise<any>;
        qb(e: any): Promise<any>;
        rb(e: any, r: any): Promise<any>;
        sb(e: any, r: any): Promise<any>;
        tb(e: any, r: any): Promise<void>;
        ub(e: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Ic as Y } from "../../../../base/common/map.js";
//# sourceMappingURL=webExtensionsScannerService.d.ts.map