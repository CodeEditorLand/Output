export { x as $Ktc };
declare let x: {
    new (o: any, r: any, t: any): {
        xterm: any;
        b: any;
        c: any;
        maxLinkLength: number;
        detect(o: any, r: any, t: any): ({
            text: any;
            uri: {
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
            contextLine?: never;
        } | {
            text: any;
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
            contextLine: string;
            uri?: never;
        })[];
        f(o: any): {
            text: any;
            startIndex: number;
            endIndex: any;
        }[];
        g(): void;
        a: RegExp | undefined;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    id: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=terminalWordLinkDetector.d.ts.map