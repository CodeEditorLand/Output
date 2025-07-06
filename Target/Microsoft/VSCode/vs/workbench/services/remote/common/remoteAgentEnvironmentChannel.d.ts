export { g as $_3 };
declare class g {
    static getEnvironmentData(t: any, o: any, r: any): Promise<{
        pid: any;
        connectionToken: any;
        appRoot: any;
        settingsPath: any;
        mcpResource: any;
        logsPath: any;
        extensionHostLogsPath: any;
        globalStorageHome: any;
        workspaceStorageHome: any;
        localHistoryHome: any;
        userHome: any;
        os: any;
        arch: any;
        marks: any;
        useHostProxy: any;
        profiles: any;
        isUnsupportedGlibc: any;
    }>;
    static getExtensionHostExitInfo(t: any, o: any, r: any): Promise<any>;
    static getDiagnosticInfo(t: any, o: any): any;
    static updateTelemetryLevel(t: any, o: any): any;
    static logTelemetry(t: any, o: any, r: any): any;
    static flushTelemetry(t: any): any;
    static ping(t: any): Promise<void>;
}
//# sourceMappingURL=remoteAgentEnvironmentChannel.d.ts.map