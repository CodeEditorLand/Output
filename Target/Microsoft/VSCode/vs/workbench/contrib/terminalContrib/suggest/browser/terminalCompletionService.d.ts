declare const ft: any;
declare class dt {
    constructor(t: any, e: any);
    items: any;
    resourceRequestConfig: any;
}
declare let O: {
    new (t: any, e: any, i: any): {
        readonly providers: Generator<any, void, unknown>;
        b(): Generator<any, void, unknown>;
        processEnv: any;
        f: any;
        g: any;
        h: any;
        j: any;
        a: Map<any, any>;
        registerTerminalCompletionProvider(t: any, e: any, i: any, ...l: any[]): any;
        provideCompletions(t: any, e: any, i: any, l: any, s: any, o: any, d: any, $: any, w: any): Promise<any[] | undefined>;
        m(t: any, e: any, i: any, l: any, s: any, o: any, d: any, $: any): Promise<any[]>;
        resolveResources(t: any, e: any, i: any, l: any, s: any, o: any): Promise<{
            label: any;
            provider: any;
            kind: any;
            detail: any;
            replacementIndex: number;
            replacementLength: any;
        }[] | undefined>;
        n(t: any, e: any): any;
        r(t: any, e: any): any;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function C(f: any, t: any, e: any): any;
export { ft as $r1b, dt as $s1b, O as $t1b, C as $u1b };
//# sourceMappingURL=terminalCompletionService.d.ts.map