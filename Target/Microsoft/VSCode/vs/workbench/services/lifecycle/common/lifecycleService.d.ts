export { u as $yxb };
declare let u: {
    new (t: any, e: any): {
        readonly startupKind: number;
        phase: number;
        readonly willShutdown: boolean;
        t: any;
        u: any;
        b: any;
        onBeforeShutdown: any;
        c: any;
        onWillShutdown: any;
        f: any;
        onDidShutdown: any;
        g: any;
        onBeforeShutdownError: any;
        h: any;
        onShutdownVeto: any;
        m: number;
        n: boolean;
        r: Map<any, any>;
        j: number;
        w(): number;
        y(): number | undefined;
        when(t: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=lifecycleService.d.ts.map