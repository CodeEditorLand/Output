declare let N: {
    new (i: any, e: any): {
        g: any;
        h: any;
        preferPreReleases: boolean;
        canInstall(i: any): Promise<true | k>;
        j(i: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let G: {
    new (i: any, e: any, t: any, s: any, o: any, c: any, d: any): {
        readonly onInstallExtension: any;
        readonly onDidInstallExtensions: any;
        readonly onUninstallExtension: any;
        readonly onDidUninstallExtension: any;
        readonly onDidUpdateExtensionMetadata: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        n: number;
        s: Map<any, any>;
        t: Map<any, any>;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any[];
        installFromGallery(i: any, e?: {}): Promise<any>;
        installGalleryExtensions(i: any): Promise<any[]>;
        uninstall(i: any, e: any): Promise<void>;
        toggleApplicationScope(i: any, e: any): Promise<any>;
        getExtensionsControlManifest(): Promise<any>;
        m: Promise<any> | undefined;
        registerParticipant(i: any): void;
        resetPinnedStateForAllUserExtensions(i: any): Promise<void>;
        L(i: any): Promise<any[]>;
        M(i: any): Promise<any[][]>;
        N(i: any, e: any): boolean;
        O(i: any, e: any): Promise<any[]>;
        P(i: any, e: any, t: any, s: any, o: any): Promise<any[]>;
        Q(i: any, e: any, t: any, s: any): Promise<{
            extension: any;
            manifest: any;
        }>;
        R(i: any, e: any, t: any, s: any): Promise<any>;
        uninstallExtensions(i: any): Promise<void>;
        S(i: any, e: any, t: any): void;
        U(i: any, e: any, t: any): any;
        W(i: any, e: any, t?: any[]): any;
        X(i: any, e: any): any;
        Y(): Promise<any>;
        g: any;
        h: any;
        preferPreReleases: boolean;
        canInstall(i: any): Promise<true | k>;
        j(i: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function R(m: any, i: any): $;
declare class Di {
    d: j;
    waitUntilTaskIsFinished(): Promise<undefined>;
    run(): {
        cancel(): void;
        then(r: any, h: any): Promise<any>;
        catch(r: any): Promise<any>;
        finally(r: any): Promise<any>;
    };
    g: {
        cancel(): void;
        then(r: any, h: any): Promise<any>;
        catch(r: any): Promise<any>;
        finally(r: any): Promise<any>;
    } | undefined;
    cancel(): void;
}
import { $Vj as k } from "../../../base/common/htmlContent.js";
import { $kz as $ } from "./extensionManagement.js";
import { $Lh as j } from "../../../base/common/async.js";
export { N as $I3, G as $J3, R as $K3, Di as $L3 };
//# sourceMappingURL=abstractExtensionManagementService.d.ts.map