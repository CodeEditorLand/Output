export { p as $Ksc };
declare let p: {
    new (e: any, t: any, r: any): {
        readonly onDidCreateInstance: any;
        readonly onDidRegisterBackend: any;
        g: any;
        h: any;
        b: Map<any, any>;
        c: any;
        f: any;
        a: any;
        createInstance(e: any, t: any): any;
        convertProfileToShellLaunchConfig(e: any, t: any): any;
        getBackend(e: any): Promise<any>;
        getRegisteredBackends(): any;
        didRegisterBackend(e: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=terminalInstanceService.d.ts.map