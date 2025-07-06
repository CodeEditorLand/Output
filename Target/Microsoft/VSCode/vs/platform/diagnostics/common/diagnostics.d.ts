declare class m {
    getPerformanceInfo(e: any, n: any): Promise<{}>;
    getSystemInfo(e: any, n: any): Promise<{
        processArgs: string;
        gpuStatus: string;
        screenReader: string;
        remoteData: never[];
        os: string;
        memory: string;
        vmHint: string;
    }>;
    getDiagnostics(e: any, n: any): Promise<string>;
    getWorkspaceFileExtensions(e: any): Promise<{
        extensions: never[];
    }>;
    reportWorkspaceStats(e: any): Promise<void>;
}
declare function c(r: any): boolean;
declare const a: any;
declare const o: "diagnosticsService";
export { m as $$v, c as $0v, a as $9v, o as ID };
//# sourceMappingURL=diagnostics.d.ts.map