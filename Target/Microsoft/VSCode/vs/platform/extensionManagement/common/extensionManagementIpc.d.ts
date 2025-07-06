declare class F {
    constructor(t: any, i: any);
    a: any;
    b: any;
    onInstallExtension: any;
    onDidInstallExtensions: any;
    onUninstallExtension: any;
    onDidUninstallExtension: any;
    onDidUpdateExtensionMetadata: any;
    listen(t: any, i: any): any;
    call(t: any, i: any, e: any): Promise<any>;
}
declare const M_base: {
    new (i: any, e: any): {
        g: any;
        h: any;
        preferPreReleases: boolean;
        canInstall(i: any): Promise<true | import("../../../base/common/htmlContent.js").$Vj>;
        j(i: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class M extends M_base {
    constructor(t: any, i: any, e: any);
    get onInstallExtension(): any;
    get onDidInstallExtensions(): any;
    get onUninstallExtension(): any;
    get onDidUninstallExtension(): any;
    get onDidUpdateExtensionMetadata(): any;
    u: any;
    f: any;
    m: any;
    n: any;
    s: any;
    t: any;
    w(t: any): void;
    y(t: any): void;
    z(t: any): void;
    C(t: any): void;
    D(t: any): void;
    F(t: any): boolean;
    getTargetPlatform(): any;
    G: any;
    zip(t: any): Promise<any>;
    install(t: any, i: any): Promise<any>;
    installFromLocation(t: any, i: any): Promise<any>;
    installExtensionsFromProfile(t: any, i: any, e: any): Promise<any>;
    getManifest(t: any): Promise<any>;
    installFromGallery(t: any, i: any): Promise<any>;
    installGalleryExtensions(t: any): Promise<any>;
    uninstall(t: any, i: any): Promise<any>;
    uninstallExtensions(t: any): Promise<any>;
    getInstalled(t: null | undefined, i: any, e: any): Promise<any>;
    updateMetadata(t: any, i: any, e: any): Promise<any>;
    resetPinnedStateForAllUserExtensions(t: any): any;
    toggleApplicationScope(t: any, i: any): any;
    copyExtensions(t: any, i: any): any;
    getExtensionsControlManifest(): Promise<any>;
    download(t: any, i: any, e: any): Promise<any>;
    cleanUp(): Promise<any>;
    registerParticipant(): void;
}
declare class B {
    constructor(t: any);
    a: any;
    listen(t: any, i: any): void;
    call(t: any, i: any, e: any): any;
}
export { F as $M3, M as $N3, B as $O3 };
//# sourceMappingURL=extensionManagementIpc.d.ts.map