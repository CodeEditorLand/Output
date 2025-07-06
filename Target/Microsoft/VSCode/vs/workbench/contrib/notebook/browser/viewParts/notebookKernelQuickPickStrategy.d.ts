export { N as $qVb };
declare let N: {
    new (t: any, e: any, n: any, i: any, s: any, o: any, a: any, c: any, l: any, d: any, r: any): {
        w: any;
        x: any;
        o(t: any, e: any, n: any, i: any): ({
            kernel: any;
            picked: boolean;
            label: any;
            description: any;
            detail: any;
        } | {
            type: string;
            id?: never;
            label?: never;
            autoRun?: never;
        } | {
            id: string;
            label: any;
            autoRun: boolean;
            type?: never;
        })[];
        q(t: any, e: any): void;
        n(t: any): {
            selected: any;
            all: any;
            suggestions: any;
            hidden: never[];
        };
        p(t: any, e: any, n: any): Promise<any>;
        C(t: any, e: any): any;
        D(t: any): Promise<any[]>;
        E(t: any, e: any, n: any): Promise<void>;
        F(t: any, e: any): Promise<any>;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        l: any;
        m: any;
        showQuickPick(t: any, e: any, n: any): Promise<boolean>;
        r(t: any, e: any, n: any, i: any, s: any, o: any): Promise<void>;
        s(t: any, e: any, n: any, i: any): Promise<void>;
        t(t: any, e: any): Promise<({
            id: string;
            description: any;
            label: string;
            extensionIds: any;
        } | {
            id: string;
            label: any;
            description?: never;
            extensionIds?: never;
        })[] | undefined>;
        u(t: any): any;
        v(t: any, e: any): any;
    };
    updateKernelStatusAction(t: any, e: any, n: any, i: any): void;
    resolveKernel(t: any, e: any, n: any, i: any): Promise<any>;
};
//# sourceMappingURL=notebookKernelQuickPickStrategy.d.ts.map