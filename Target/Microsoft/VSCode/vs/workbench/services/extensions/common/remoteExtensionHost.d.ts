export { I as $0Bc };
declare let I: {
    new (e: any, t: any, s: any, r: any, i: any, h: any, o: any, c: any, m: any, u: any, d: any, p: any, l: any): {
        runningLocation: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        pid: any;
        startup: number;
        extensions: any;
        a: any;
        onExit: any;
        g: boolean;
        remoteAuthority: any;
        b: any;
        c: boolean;
        f: boolean;
        h: any;
        start(): any;
        F(e: any): void;
        G(e: any): Promise<{
            commit: any;
            version: any;
            quality: any;
            date: any;
            parentPid: any;
            environment: {
                isExtensionDevelopmentDebug: any;
                appRoot: any;
                appName: any;
                appHost: any;
                appUriScheme: any;
                isExtensionTelemetryLoggingOnly: boolean;
                appLanguage: string;
                extensionDevelopmentLocationURI: any;
                extensionTestsLocationURI: any;
                globalStorageHome: any;
                workspaceStorageHome: any;
                extensionLogLevel: any;
            };
            workspace: {
                configuration: any;
                id: any;
                name: any;
                transient: any;
            } | null;
            remote: {
                isRemote: boolean;
                authority: any;
                connectionData: any;
            };
            consoleForward: {
                includeStack: boolean;
                logNative: boolean;
            };
            extensions: any;
            telemetryInfo: {
                sessionId: any;
                machineId: any;
                sqmId: any;
                devDeviceId: any;
                firstSessionDate: any;
                msftInternal: any;
            };
            logLevel: any;
            loggers: any[];
            logsLocation: any;
            autoStart: boolean;
            uiKind: any;
        }>;
        getInspectPort(): void;
        enableInspectPort(): Promise<boolean>;
        disconnect(): Promise<void>;
        dispose(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=remoteExtensionHost.d.ts.map