export { C as $0Cc };
declare let C: {
    new (e: any, t: any, i: any, n: any, s: any, h: any, r: any, d: any, y: any, $: any): {
        n: {
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
        } | undefined;
        s: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        a: any;
        b: number;
        g: boolean;
        h: any;
        onError: any;
        S: any[];
        f: any;
        j: {
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
        } | undefined;
        r: any;
        I(): void;
        c: number | undefined;
        J(): boolean;
        L(): {
            enabled: boolean;
            message: string;
        } | {
            enabled: boolean;
            message?: never;
        };
        turnOn(): Promise<void>;
        turnOff(e: any, t: any, i: any): Promise<void>;
        M(e: any): void;
        N(): boolean;
        O(e: any): Promise<void>;
        P(): Promise<void>;
        Q(): any;
        R(): void;
        triggerSync(e: any, t: any): Promise<any>;
        U(): 0 | 3000;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=userDataAutoSyncService.d.ts.map