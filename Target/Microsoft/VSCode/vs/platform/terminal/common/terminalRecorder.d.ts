export { h as $vsc };
declare class h {
    constructor(t: any, s: any);
    b: number;
    a: {
        cols: any;
        rows: any;
        data: never[];
    }[];
    handleResize(t: any, s: any): void;
    handleData(t: any): void;
    generateReplayEventSync(): {
        events: {
            cols: any;
            rows: any;
            data: string;
        }[];
        commands: {
            isWindowsPty: boolean;
            hasRichCommandDetection: boolean;
            commands: never[];
            promptInputModel: undefined;
        };
    };
    generateReplayEvent(): Promise<{
        events: {
            cols: any;
            rows: any;
            data: string;
        }[];
        commands: {
            isWindowsPty: boolean;
            hasRichCommandDetection: boolean;
            commands: never[];
            promptInputModel: undefined;
        };
    }>;
}
//# sourceMappingURL=terminalRecorder.d.ts.map