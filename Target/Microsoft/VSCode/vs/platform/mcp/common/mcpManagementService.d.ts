declare let d: {
    new (e: any, s: any, t: any, r: any, i: any, n: any, o: any): {
        readonly onDidInstallMcpServers: any;
        readonly onDidUpdateMcpServers: any;
        readonly onUninstallMcpServer: any;
        readonly onDidUninstallMcpServer: any;
        n: any;
        r: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        c: Map<any, any>;
        f: any;
        onInstallMcpServer: any;
        g: any;
        h: any;
        j: any;
        m: any;
        b: any;
        C(): Promise<void>;
        a: Promise<void> | undefined;
        D(): Promise<Map<any, any>>;
        F(): void;
        G(): Promise<void>;
        getInstalled(): Promise<any[]>;
        H(e: any, s: any): Promise<{
            name: any;
            config: any;
            mcpResource: any;
            version: any;
            location: any;
            id: any;
            displayName: any;
            description: any;
            publisher: any;
            publisherDisplayName: any;
            repositoryUrl: any;
            readmeUrl: any;
            icon: any;
            codicon: any;
            manifest: any;
            source: string;
        }>;
        install(e: any, s: any): Promise<any>;
        uninstall(e: any, s: any): Promise<void>;
        I(e: any, s: any): {
            config: {
                type: string;
                url: any;
                headers: {} | undefined;
                command?: never;
                args?: never;
                env?: never;
            } | {
                type: string;
                command: any;
                args: any[] | undefined;
                env: {} | undefined;
                url?: never;
                headers?: never;
            };
            inputs: {
                id: string;
                type: string;
                description: any;
                password: boolean;
                default: any;
                options: any;
            }[] | undefined;
        };
        J(e: any): any;
        L(e: any): {
            id: string;
            type: string;
            description: any;
            password: boolean;
            default: any;
            options: any;
        }[];
        q: j;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let f: {
    new (e: any, s: any, t: any, r: any, i: any, n: any, o: any): {
        O: any;
        installFromGallery(e: any, s: any): Promise<any>;
        updateMetadata(e: any, s: any): Promise<any>;
        P(e: any): Promise<any>;
        M(e: any, s: any): Promise<any>;
        R(e: any, s: any): any;
        N(e: any, s: any): void;
        readonly onDidInstallMcpServers: any;
        readonly onDidUpdateMcpServers: any;
        readonly onUninstallMcpServer: any;
        readonly onDidUninstallMcpServer: any;
        n: any;
        r: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        c: Map<any, any>;
        f: any;
        onInstallMcpServer: any;
        g: any;
        h: any;
        j: any;
        m: any;
        b: any;
        C(): Promise<void>;
        a: Promise<void> | undefined;
        D(): Promise<Map<any, any>>;
        F(): void;
        G(): Promise<void>;
        getInstalled(): Promise<any[]>;
        H(e: any, s: any): Promise<{
            name: any;
            config: any;
            mcpResource: any;
            version: any;
            location: any;
            id: any;
            displayName: any;
            description: any;
            publisher: any;
            publisherDisplayName: any;
            repositoryUrl: any;
            readmeUrl: any;
            icon: any;
            codicon: any;
            manifest: any;
            source: string;
        }>;
        install(e: any, s: any): Promise<any>;
        uninstall(e: any, s: any): Promise<void>;
        I(e: any, s: any): {
            config: {
                type: string;
                url: any;
                headers: {} | undefined;
                command?: never;
                args?: never;
                env?: never;
            } | {
                type: string;
                command: any;
                args: any[] | undefined;
                env: {} | undefined;
                url?: never;
                headers?: never;
            };
            inputs: {
                id: string;
                type: string;
                description: any;
                password: boolean;
                default: any;
                options: any;
            }[] | undefined;
        };
        J(e: any): any;
        L(e: any): {
            id: string;
            type: string;
            description: any;
            password: boolean;
            default: any;
            options: any;
        }[];
        q: j;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let g: {
    new (e: any, s: any): {
        j: any;
        m: any;
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
        h: D;
        n(e: any): any;
        getInstalled(e: any): Promise<any>;
        install(e: any, s: any): Promise<any>;
        uninstall(e: any, s: any): Promise<any>;
        installFromGallery(e: any, s: any): Promise<any>;
        updateMetadata(e: any, s: any, t: any): Promise<any>;
        dispose(): void;
        r(e: any): any;
        q: j;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as j } from "../../../base/common/lifecycle.js";
import { $Ic as D } from "../../../base/common/map.js";
export { d as $TW, f as $UW, g as $VW };
//# sourceMappingURL=mcpManagementService.d.ts.map