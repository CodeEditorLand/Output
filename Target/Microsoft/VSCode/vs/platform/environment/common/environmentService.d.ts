declare const b: RegExp;
declare class s {
    constructor(e: any, o: any, n: any);
    get appRoot(): any;
    get userHome(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get userDataPath(): any;
    get appSettingsHome(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get tmpDir(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get cacheHome(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get stateResource(): any;
    get userRoamingDataHome(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get userDataSyncHome(): any;
    get logsHome(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get sync(): any;
    get workspaceStorageHome(): any;
    get localHistoryHome(): any;
    get keyboardLayoutResource(): any;
    get argvResource(): any;
    get isExtensionDevelopment(): boolean;
    get untitledWorkspacesHome(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get builtinExtensionsPath(): any;
    get extensionsDownloadLocation(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get extensionsPath(): any;
    get extensionDevelopmentLocationURI(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    }[] | undefined;
    get extensionDevelopmentKind(): any;
    get extensionTestsLocationURI(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined;
    get disableExtensions(): boolean | any[];
    get debugExtensionHost(): {
        port: any;
        break: boolean;
        debugId: any;
        env: any;
    };
    get debugRenderer(): boolean;
    get isBuilt(): boolean;
    get verbose(): boolean;
    get logLevel(): any;
    get extensionLogLevel(): string[][] | undefined;
    get serviceMachineIdResource(): any;
    get crashReporterId(): any;
    get crashReporterDirectory(): any;
    get disableTelemetry(): boolean;
    get disableExperiments(): boolean;
    get disableWorkspaceTrust(): boolean;
    get useInMemorySecretStorage(): boolean;
    get policyFile(): any;
    get editSessionId(): any;
    set continueOn(e: any);
    get continueOn(): any;
    get args(): any;
    a: any;
    b: any;
    c: any;
}
declare function P(a: any, e: any): {
    port: any;
    break: boolean;
    debugId: any;
    env: any;
};
declare function R(a: any, e: any, o: any, n: any, c: any, l: any): {
    port: any;
    break: boolean;
    debugId: any;
    env: any;
};
export { b as $rn, s as $sn, P as $tn, R as $un };
//# sourceMappingURL=environmentService.d.ts.map