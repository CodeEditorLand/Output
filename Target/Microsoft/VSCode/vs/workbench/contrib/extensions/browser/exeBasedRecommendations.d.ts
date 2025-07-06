export { m as $bjc };
declare let m: {
    new (t: any): {
        readonly otherRecommendations: {
            extension: any;
            reason: {
                reasonId: number;
                reasonText: any;
            };
        }[];
        readonly importantRecommendations: {
            extension: any;
            reason: {
                reasonId: number;
                reasonText: any;
            };
        }[];
        readonly recommendations: {
            extension: any;
            reason: {
                reasonId: number;
                reasonText: any;
            };
        }[];
        g: any;
        a: any[];
        b: any[];
        getRecommendations(t: any): {
            important: {
                extension: any;
                reason: {
                    reasonId: number;
                    reasonText: any;
                };
            }[];
            others: {
                extension: any;
                reason: {
                    reasonId: number;
                    reasonText: any;
                };
            }[];
        };
        c(): Promise<void>;
        m(): Promise<Map<any, any>>;
        j: Promise<Map<any, any>> | undefined;
        n(): Promise<Map<any, any>>;
        r(t: any): {
            extension: any;
            reason: {
                reasonId: number;
                reasonText: any;
            };
        };
        f: any;
        readonly activated: boolean;
        activate(): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=exeBasedRecommendations.d.ts.map