export { w as $qic };
declare let w: {
    new (e: any, t: any, n: any, r: any, l: any, o: any): {
        h: any;
        j: any;
        n: any;
        s: any;
        t: any;
        f: {
            allowedDuringChat: Map<any, any>;
            allowedOutsideChat: Map<any, any>;
        };
        g: any;
        sample(e: any, t?: any): Promise<{
            sample: {
                model: any;
                content: {
                    type: string;
                    text: string;
                };
                role: string;
            };
        }>;
        hasLogs(e: any): any;
        getLogText(e: any): any;
        u(e: any): any;
        w(e: any, t: any): {
            [x: number]: () => Promise<boolean>;
        };
        y(e: any, t: any, n: any, r: any): Promise<any>;
        z(e: any, t: any): Promise<any>;
        C(e: any, t: any, n: any): Promise<any>;
        D(e: any): string;
        getConfig(e: any): any;
        F(e: any): {
            value: any;
            key: string;
            mapping: any;
            target: number;
            resource: any;
        } | {
            value: undefined;
            mapping: undefined;
            key: string;
            target: any;
            resource: any;
        };
        updateConfig(e: any, t: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=mcpSamplingService.d.ts.map