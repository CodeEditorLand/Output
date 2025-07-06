declare const u: any;
declare const o: {
    maxSampleCount: number;
    sampleDelay: number;
    initial: any[];
    maxInitialCount: number;
    average: any[];
    maxAverageCount: number;
    highLatencyMultiple: number;
    highLatencyMinThreshold: number;
    highLatencyMaxThreshold: number;
    readonly latency: {
        initial: number | undefined;
        current: number;
        average: number;
        high: boolean;
    } | undefined;
    measure(n: any): Promise<{
        initial: number | undefined;
        current: number;
        average: number;
        high: boolean;
    } | undefined>;
    lastMeasurement: {
        initial: number | undefined;
        current: number;
        average: number;
        high: boolean;
    } | undefined;
};
export { u as $oL, o as $pL };
//# sourceMappingURL=remoteAgentService.d.ts.map