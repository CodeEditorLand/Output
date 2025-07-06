export { m as $cjc };
declare let m: {
    new (t: any, s: any, i: any, n: any, e: any, r: any): {
        readonly recommendations: any[];
        readonly ignoredRecommendations: any[];
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        g: any[];
        h: any;
        onDidChangeRecommendations: any;
        j: any[];
        m: any[];
        n: any;
        c(): Promise<void>;
        C(): Promise<void>;
        D(): Promise<any>;
        F(): Promise<void>;
        G(t: any): Promise<{
            validRecommendations: any[];
            invalidRecommendations: any[];
            message: string;
        }>;
        H(): Promise<void>;
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
//# sourceMappingURL=workspaceRecommendations.d.ts.map