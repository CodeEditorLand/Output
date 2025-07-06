export { A as $97b };
declare let A: {
    new (e: any, t: any, s: any, c: any, i: any, r: any, n: any, d: any): {
        authenticationService: any;
        authenticationUsageService: any;
        authenticationMcpUsageService: any;
        authenticationAccessService: any;
        authenticationMcpAccessService: any;
        authenticationExtensionsService: any;
        authenticationMcpService: any;
        logService: any;
        c: any;
        onDidChangePreferences: any;
        f: any;
        onDidChangeAccess: any;
        provider(e: any): R;
        extension(e: any): O;
        mcpServer(e: any): L;
        getProviderIds(e: any): any;
        clearAllData(e: any, t?: boolean): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class R extends h {
    account(e: any): I;
    extension(e: any): g;
    mcpServer(e: any): w;
    getActiveEntities(): Promise<{
        extensions: any[];
        mcpServers: any[];
    }>;
    getAccountNames(): Promise<any>;
    getUsageStats(): Promise<{
        totalSessions: number;
        totalAccounts: number;
        recentActivity: {
            accountName: any;
            lastUsed: number;
            usageCount: number;
        }[];
    }>;
    forEachAccount(e: any): Promise<void>;
}
declare class O {
    constructor(e: any, t: any);
    extensionId: any;
    c: any;
    getProvidersWithAccess(e: any): Promise<any[]>;
    getAllAccountPreferences(e: any): Map<any, any>;
    provider(e: any): g;
}
declare class L {
    constructor(e: any, t: any);
    mcpServerId: any;
    c: any;
    getProvidersWithAccess(e: any): Promise<any[]>;
    getAllAccountPreferences(e: any): Map<any, any>;
    provider(e: any): w;
}
declare class h {
    constructor(e: any, t: any);
    providerId: any;
    c: any;
}
declare class I extends h {
    constructor(e: any, t: any, s: any);
    accountName: any;
    extension(e: any): p;
    mcpServer(e: any): f;
    extensions(): l;
    mcpServers(): m;
    entities(): B;
    remove(): void;
}
declare class g extends h {
    constructor(e: any, t: any, s: any);
    extensionId: any;
    getPreferredAccount(): any;
    setPreferredAccount(e: any): void;
    removeAccountPreference(): void;
}
declare class w extends h {
    constructor(e: any, t: any, s: any);
    mcpServerId: any;
    getLastUsedAccount(): Promise<any>;
    getPreferredAccount(): any;
    setPreferredAccount(e: any): void;
    removeAccountPreference(): void;
    getUsedAccounts(): Promise<any[]>;
}
declare class p extends h {
    constructor(e: any, t: any, s: any, c: any);
    accountName: any;
    extensionId: any;
    isAccessAllowed(): any;
    setAccessAllowed(e: any, t: any): void;
    addUsage(e: any, t: any): void;
    getUsage(): any;
    removeUsage(): void;
    setAsPreferred(): void;
    isPreferred(): boolean;
    isTrusted(): boolean;
}
declare class f extends h {
    constructor(e: any, t: any, s: any, c: any);
    accountName: any;
    mcpServerId: any;
    isAccessAllowed(): any;
    setAccessAllowed(e: any, t: any): void;
    addUsage(e: any, t: any): void;
    getUsage(): any;
    removeUsage(): void;
    setAsPreferred(): void;
    isPreferred(): boolean;
    isTrusted(): boolean;
}
declare class l extends h {
    constructor(e: any, t: any, s: any);
    accountName: any;
    getAllowedExtensions(): any;
    allowAccess(e: any): void;
    removeAccess(e: any): void;
    forEach(e: any): void;
}
declare class m extends h {
    constructor(e: any, t: any, s: any);
    accountName: any;
    getAllowedMcpServers(): any;
    allowAccess(e: any): void;
    removeAccess(e: any): void;
    forEach(e: any): void;
}
declare class B extends h {
    constructor(e: any, t: any, s: any);
    accountName: any;
    hasAnyUsage(): boolean;
    getEntityCount(): {
        extensions: number;
        mcpServers: number;
        total: number;
    };
    removeAllAccess(): void;
    forEach(e: any): void;
}
//# sourceMappingURL=authenticationQueryService.d.ts.map