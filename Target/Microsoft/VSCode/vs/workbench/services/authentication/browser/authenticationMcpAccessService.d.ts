declare const S: any;
declare let f: {
    new (t: any, r: any): {
        b: any;
        c: any;
        a: any;
        onDidChangeMcpSessionAccess: any;
        isAccessAllowed(t: any, r: any, i: any): any;
        readAllowedMcpServers(t: any, r: any): any;
        updateAllowedMcpServers(t: any, r: any, i: any): void;
        removeAllowedMcpServers(t: any, r: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { S as $23b, f as $33b };
//# sourceMappingURL=authenticationMcpAccessService.d.ts.map