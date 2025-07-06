export { c as $gCc };
declare let c: {
    new (e: any, n: any, r: any): {
        localExtensionManagementServer: any;
        remoteExtensionManagementServer: {
            id: string;
            extensionManagementService: any;
            readonly label: any;
        } | null;
        webExtensionManagementServer: {
            id: string;
            extensionManagementService: any;
            label: any;
        } | null;
        getExtensionManagementServer(e: any): {
            id: string;
            extensionManagementService: any;
            readonly label: any;
        } | null;
        getExtensionInstallLocation(e: any): 2 | 3;
    };
};
//# sourceMappingURL=extensionManagementServerService.d.ts.map