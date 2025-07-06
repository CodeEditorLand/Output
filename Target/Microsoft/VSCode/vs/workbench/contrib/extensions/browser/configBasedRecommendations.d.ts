export { c as $ijc };
declare let c: {
    new (t: any, e: any): {
        readonly otherRecommendations: any[];
        readonly importantRecommendations: any[];
        readonly recommendations: any[];
        m: any;
        n: any;
        a: any[];
        b: any[];
        g: any;
        onDidChangeRecommendations: any;
        h: any[];
        j: any[];
        c(): Promise<void>;
        s(): Promise<void>;
        t(t: any): Promise<void>;
        u(t: any): {
            extension: any;
            reason: {
                reasonId: number;
                reasonText: any;
            };
            whenNotInstalled: any;
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
//# sourceMappingURL=configBasedRecommendations.d.ts.map