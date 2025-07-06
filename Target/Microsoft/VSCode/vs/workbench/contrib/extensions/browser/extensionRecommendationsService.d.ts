export { d as $ljc };
declare let d: {
    new (t: any, e: any, i: any, o: any, s: any, a: any, m: any, f: any, l: any, p: any, u: any): {
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        r: any;
        onDidChangeRecommendations: any;
        b: any;
        a: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: number;
        activationPromise: Promise<void>;
        H(): Promise<void>;
        I(): any;
        J(): Promise<void>;
        getAllRecommendationsWithReason(): any;
        getConfigBasedRecommendations(): Promise<{
            important: string[];
            others: string[];
        }>;
        getOtherRecommendations(): Promise<string[]>;
        getImportantRecommendations(): Promise<string[]>;
        getKeymapRecommendations(): string[];
        getLanguageRecommendations(): string[];
        getRemoteRecommendations(): string[];
        getWorkspaceRecommendations(): Promise<any[]>;
        getExeBasedRecommendations(t: any): Promise<{
            important: string[];
            others: string[];
        }>;
        getFileBasedRecommendations(): string[];
        L(t: any): void;
        M(t: any): string[];
        N(t: any): boolean;
        O(): Promise<void>;
        P(t: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=extensionRecommendationsService.d.ts.map