declare const R: any;
declare let d: {
    new (t: any, e: any, s: any): {
        j: any;
        m: any;
        n: any;
        g: any;
        onDidChangeExtensionStorageToSync: any;
        h: any;
        r(t: any): void;
        s(t: any): string;
        getExtensionState(t: any, e: any): any;
        getExtensionStateRaw(t: any, e: any): any;
        setExtensionState(t: any, e: any, s: any): void;
        setKeysForSync(t: any, e: any): void;
        getKeysForSync(t: any): any;
        addToMigrationList(t: any, e: any): void;
        t: any[];
        getSourceExtensionToMigrate(t: any): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: number | undefined;
    b(t: any): string;
    c(t: any): {
        id: string;
        version: string | undefined;
    } | undefined;
    removeOutdatedExtensionVersions(t: any, e: any): Promise<void>;
    f(t: any): Map<any, any>;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { R as $xM, d as $yM };
//# sourceMappingURL=extensionStorage.d.ts.map