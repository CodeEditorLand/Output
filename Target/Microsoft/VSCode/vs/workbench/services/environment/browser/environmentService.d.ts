declare const S: any;
declare class n {
    constructor(e: any, i: any, s: any, r: any);
    get remoteAuthority(): any;
    get expectsResolverExtension(): boolean;
    get isBuilt(): boolean;
    get logLevel(): any;
    get extensionLogLevel(): any;
    get profDurationMarkers(): any[] | undefined;
    get windowLogsPath(): any;
    get logFile(): any;
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
    get argvResource(): any;
    get cacheHome(): any;
    get workspaceStorageHome(): any;
    get localHistoryHome(): any;
    get stateResource(): any;
    get userDataSyncHome(): any;
    get sync(): void;
    get keyboardLayoutResource(): any;
    get untitledWorkspacesHome(): any;
    get serviceMachineIdResource(): any;
    get extHostLogsPath(): any;
    get debugExtensionHost(): {
        port: null;
        break: boolean;
    };
    a: {
        params: {
            port: null;
            break: boolean;
        };
        debugRenderer: boolean;
        isExtensionDevelopment: boolean;
        extensionDevelopmentLocationURI: undefined;
        extensionDevelopmentKind: undefined;
    } | undefined;
    get isExtensionDevelopment(): boolean;
    get extensionDevelopmentLocationURI(): undefined;
    get extensionDevelopmentLocationKind(): undefined;
    get extensionTestsLocationURI(): any;
    get extensionEnabledProposedApi(): any;
    get debugRenderer(): boolean;
    get enableSmokeTestDriver(): any;
    get disableExtensions(): boolean;
    get enableExtensions(): any;
    get webviewExternalEndpoint(): any;
    get extensionTelemetryLogResource(): any;
    get disableTelemetry(): boolean;
    get disableExperiments(): boolean;
    get verbose(): boolean;
    get logExtensionHostCommunication(): boolean;
    get skipReleaseNotes(): boolean;
    get skipWelcome(): boolean;
    get disableWorkspaceTrust(): boolean;
    get profile(): any;
    get editSessionId(): any;
    d: any;
    logsHome: any;
    options: any;
    f: any;
    b: Map<any, any> | undefined;
    g(): {
        params: {
            port: null;
            break: boolean;
        };
        debugRenderer: boolean;
        isExtensionDevelopment: boolean;
        extensionDevelopmentLocationURI: undefined;
        extensionDevelopmentKind: undefined;
    };
    get filesToOpenOrCreate(): {
        fileUri: {
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
        options: {
            selection: {
                startLineNumber: number | undefined;
                startColumn: number;
            } | undefined;
        };
    }[] | {
        fileUri: {
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
    }[] | undefined;
    get filesToDiff(): {
        fileUri: {
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
    }[] | undefined;
    get filesToMerge(): {
        fileUri: {
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
    }[] | undefined;
}
export { S as $r_, n as $s_ };
//# sourceMappingURL=environmentService.d.ts.map