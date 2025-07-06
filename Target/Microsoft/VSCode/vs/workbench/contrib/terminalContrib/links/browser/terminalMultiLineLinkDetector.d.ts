export { v as $Mtc };
declare let v: {
    new (n: any, e: any, r: any, c: any, i: any, s: any): {
        xterm: any;
        a: any;
        b: any;
        c: any;
        d: any;
        e: any;
        maxLinkLength: number;
        detect(n: any, e: any, r: any): Promise<({
            text: string;
            uri: any;
            selection: {
                startLineNumber: number;
                startColumn: number;
            };
            disableTrimColon: boolean;
            bufferRange: {
                start: {
                    x: any;
                    y: any;
                };
                end: {
                    x: number;
                    y: any;
                };
            };
            type: string;
        } | {
            text: string;
            uri: any;
            selection: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
            };
            bufferRange: {
                start: {
                    x: any;
                    y: any;
                };
                end: {
                    x: number;
                    y: any;
                };
            };
            type: string;
        })[]>;
        f(n: any): boolean;
    };
    id: string | undefined;
};
//# sourceMappingURL=terminalMultiLineLinkDetector.d.ts.map