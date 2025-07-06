export { i as $hCc };
declare let i: {
    new (r: any, t: any, e: any, c: any, o: any, f: any, p: any): {
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        a: any;
        onInstallMcpServer: any;
        b: any;
        onDidInstallMcpServers: any;
        c: any;
        onDidUpdateMcpServers: any;
        f: any;
        onUninstallMcpServer: any;
        g: any;
        onDidUninstallMcpServer: any;
        h: any;
        onInstallMcpServerInCurrentProfile: any;
        j: any;
        onDidInstallMcpServersInCurrentProfile: any;
        m: any;
        onDidUpdateMcpServersInCurrentProfile: any;
        n: any;
        onUninstallMcpServerInCurrentProfile: any;
        r: any;
        onDidUninstallMcpServerInCurrentProfile: any;
        s: any;
        onDidChangeProfile: any;
        t: any;
        u: any;
        G(t: any): {
            mcpServerInstallResult: any[];
            mcpServerInstallResultInCurrentProfile: any[];
        };
        H(t: any, e: any, r: any): void;
        I(t: any, e: any, r: any): Promise<void>;
        getInstalled(): Promise<any[]>;
        J(t: any, e: any): any;
        install(t: any, e: any): Promise<any>;
        installFromGallery(t: any, e: any): any;
        updateMetadata(t: any, e: any, r: any): any;
        uninstall(t: any): Promise<any>;
        L(t: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=mcpWorkbenchManagementService.d.ts.map