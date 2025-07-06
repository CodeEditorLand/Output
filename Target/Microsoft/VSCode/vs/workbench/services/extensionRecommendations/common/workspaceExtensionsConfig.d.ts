declare const l: ".vscode/extensions.json";
declare const L: any;
declare let p: {
    new (e: any, t: any, n: any, i: any, o: any, s: any): {
        b: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        a: any;
        onDidChangeExtensionsConfigs: any;
        getExtensionsConfigs(): Promise<any[]>;
        getRecommendations(): Promise<any>;
        getUnwantedRecommendations(): Promise<any>;
        toggleRecommendation(e: any): Promise<void>;
        toggleUnwantedRecommendation(e: any): Promise<void>;
        n(e: any, t: any, n: any, i: any): Promise<any>;
        s(e: any, t: any, n: any, i: any): Promise<any>;
        t(e: any, t: any, n: any, i: any): Promise<any>;
        u(e: any, t: any, n: any, i: any): Promise<any>;
        w(e: any, t: any, n: any): Promise<any>;
        y(e: any): Promise<{
            recommendations: any;
            unwantedRecommendations: any;
        } | undefined>;
        z(e: any): Promise<{}>;
        C(e: any): {
            recommendations: any;
            unwantedRecommendations: any;
        };
        D(e: any, t: any, n: any): {
            path: any[];
            value: undefined;
        } | undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { l as $kNb, L as $lNb, p as $mNb };
//# sourceMappingURL=workspaceExtensionsConfig.d.ts.map