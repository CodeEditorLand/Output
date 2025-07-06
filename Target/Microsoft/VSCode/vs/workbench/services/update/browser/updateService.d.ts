export { p as $y_ };
declare let p: {
    new (t: any, e: any): {
        state: any;
        b: any;
        c: any;
        f: any;
        a: any;
        onStateChange: any;
        isLatestVersion(): Promise<boolean | undefined>;
        checkForUpdates(t: any): Promise<void>;
        g(t: any): Promise<any>;
        downloadUpdate(): Promise<void>;
        applyUpdate(): Promise<void>;
        quitAndInstall(): Promise<void>;
        _applySpecificUpdate(t: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=updateService.d.ts.map