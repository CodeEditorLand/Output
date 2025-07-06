declare let E: {
    new (e: any, n: any): {
        b: any;
        c: any;
        a: Map<any, any>;
        getConfigBasedTips(e: any): Promise<{
            extensionId: string;
            extensionName: any;
            configName: any;
            important: boolean;
            isExtensionPack: boolean;
            whenNotInstalled: any;
        }[]>;
        getImportantExecutableBasedTips(): Promise<never[]>;
        getOtherExecutableBasedTips(): Promise<never[]>;
        f(e: any): Promise<{
            extensionId: string;
            extensionName: any;
            configName: any;
            important: boolean;
            isExtensionPack: boolean;
            whenNotInstalled: any;
        }[]>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const K_base: {
    new (e: any, n: any): {
        b: any;
        c: any;
        a: Map<any, any>;
        getConfigBasedTips(e: any): Promise<{
            extensionId: string;
            extensionName: any;
            configName: any;
            important: boolean;
            isExtensionPack: boolean;
            whenNotInstalled: any;
        }[]>;
        getImportantExecutableBasedTips(): Promise<never[]>;
        getOtherExecutableBasedTips(): Promise<never[]>;
        f(e: any): Promise<{
            extensionId: string;
            extensionName: any;
            configName: any;
            important: boolean;
            isExtensionPack: boolean;
            whenNotInstalled: any;
        }[]>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class K extends K_base {
    constructor(e: any, n: any, t: any, s: any, i: any, o: any, a: any, r: any);
    r: any;
    s: any;
    t: any;
    u: any;
    w: any;
    z: any;
    g: Map<any, any>;
    h: Map<any, any>;
    j: Map<any, any>;
    m: Map<any, any>;
    n: Map<any, any>;
    getImportantExecutableBasedTips(): Promise<{
        extensionId: any;
        extensionName: any;
        isExtensionPack: any;
        exeName: any;
        exeFriendlyName: any;
        windowsPath: any;
        whenNotInstalled: any;
    }[]>;
    getOtherExecutableBasedTips(): Promise<{
        extensionId: any;
        extensionName: any;
        isExtensionPack: any;
        exeName: any;
        exeFriendlyName: any;
        windowsPath: any;
        whenNotInstalled: any;
    }[]>;
    C(): Promise<void>;
    D(e: any, n: any): Map<any, any>;
    F(): void;
    G(): void;
    H(e: any): Promise<any>;
    I(): any;
    J(e: any): void;
    L(): any;
    M(e: any, n: any): void;
    N(e: any, n: any): {
        installed: any[];
        uninstalled: any[];
    };
    O(e: any): Promise<{
        extensionId: any;
        extensionName: any;
        isExtensionPack: any;
        exeName: any;
        exeFriendlyName: any;
        windowsPath: any;
        whenNotInstalled: any;
    }[]>;
}
export { E as $UCc, K as $VCc };
//# sourceMappingURL=extensionTipsService.d.ts.map