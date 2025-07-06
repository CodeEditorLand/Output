export { p as $aCc };
declare let p: {
    new (r: any, t: any, e: any, n: any, o: any): {
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        b: any;
        onAddExtensions: any;
        c: any;
        onDidAddExtensions: any;
        f: any;
        onRemoveExtensions: any;
        g: any;
        onDidRemoveExtensions: any;
        h: import("../../../../base/common/map.js").$Ic;
        scanProfileExtensions(i: any, r: any): Promise<any>;
        addExtensionsToProfile(i: any, r: any, s: any): Promise<any[]>;
        updateMetadata(i: any, r: any): Promise<any[]>;
        removeExtensionsFromProfile(i: any, r: any): Promise<void>;
        t(i: any, r: any, s: any): Promise<any>;
        u(i: any): void;
        w(i: any): any;
        y(i: any): any;
        C(): Promise<any[] | undefined>;
        z: Promise<any[] | undefined> | undefined;
        D(i: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=extensionsProfileScannerService.d.ts.map