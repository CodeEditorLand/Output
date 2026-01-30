export class StopWatch {
    static create(highResolution: any): StopWatch;
    constructor(highResolution: any);
    _now: () => number;
    _startTime: number;
    _stopTime: number;
    stop(): void;
    reset(): void;
    elapsed(): number;
}
//# sourceMappingURL=stopwatch.d.ts.map