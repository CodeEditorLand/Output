declare const o: string[];
declare const n: {
    "terminal.integrated.localEchoLatencyThreshold": {
        description: any;
        type: string;
        minimum: number;
        default: number;
        tags: string[];
    };
    "terminal.integrated.localEchoEnabled": {
        markdownDescription: any;
        type: string;
        enum: string[];
        enumDescriptions: any[];
        default: string;
        tags: string[];
    };
    "terminal.integrated.localEchoExcludePrograms": {
        description: any;
        type: string;
        items: {
            type: string;
            uniqueItems: boolean;
        };
        default: string[];
        tags: string[];
    };
    "terminal.integrated.localEchoStyle": {
        description: any;
        default: string;
        anyOf: ({
            enum: string[];
            type?: never;
            format?: never;
        } | {
            type: string;
            format: string;
            enum?: never;
        })[];
        tags: string[];
    };
};
declare var l: any;
export { o as $v4, n as $w4, l as TerminalTypeAheadSettingId };
//# sourceMappingURL=terminalTypeAheadConfiguration.d.ts.map