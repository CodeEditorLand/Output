export { P as $EBc };
declare let P: {
    new (e: any, s: any, t: any, o: any, r: any, n: any, a: any, f: any, m: any, u: any, g: any, l: any, $: any): {
        runningLocation: any;
        startup: any;
        h: any;
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
        pid: any;
        remoteAuthority: any;
        extensions: any;
        a: any;
        onExit: any;
        b: boolean;
        c: Promise<any> | null;
        f: any;
        g: any;
        C(): Promise<string>;
        start(): Promise<any>;
        D(): Promise<any>;
        F(e: any): Promise<any>;
        dispose(): void;
        getInspectPort(): void;
        enableInspectPort(): Promise<boolean>;
        G(): Promise<{
            commit: any;
            version: any;
            quality: any;
            date: any;
            parentPid: number;
            environment: {
                isExtensionDevelopmentDebug: any;
                appName: any;
                appHost: any;
                appUriScheme: any;
                appLanguage: string;
                isExtensionTelemetryLoggingOnly: boolean;
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
            } | undefined;
            consoleForward: {
                includeStack: boolean;
                logNative: any;
            };
            extensions: any;
            nlsBaseUrl: any;
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
            remote: {
                authority: any;
                connectionData: null;
                isRemote: boolean;
            };
            uiKind: any;
        }>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=webWorkerExtensionHost.d.ts.map