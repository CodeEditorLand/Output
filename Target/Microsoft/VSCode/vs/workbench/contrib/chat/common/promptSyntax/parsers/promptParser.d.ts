export { p as $bfc };
declare let p: {
    new (t: any, r: any, e: any, c: any, o: any, f: any): {
        H: any;
        toString(): string;
        readonly tokens: any[];
        readonly header: import("./promptHeader/modeHeader.js").$sR | import("./promptHeader/instructionsHeader.js").$xR | import("./promptHeader/promptHeader.js").$vR | undefined;
        getBody(): Promise<any>;
        onSettled(e: any): any;
        readonly errorCondition: import("../../promptFileReferenceErrors.js").$UR | undefined;
        readonly resolveFailed: boolean | undefined;
        settled(): Promise<any>;
        r: any;
        s: any;
        t: any;
        u: any;
        c: any[];
        f: any[];
        h: any;
        onUpdate: any;
        j: any;
        n: {
            f: boolean;
            readonly gotFirstResult: boolean;
            readonly promise: Promise<any>;
            end(): void;
            readonly isRejected: boolean;
            readonly isResolved: boolean;
            readonly isSettled: boolean;
            readonly value: any;
            p: Promise<any>;
            a: (value: any) => void;
            b: (reason?: any) => void;
            complete(e: any): Promise<any>;
            d: {
                outcome: number;
                value: any;
            } | {
                outcome: number;
                value: any;
            } | undefined;
            error(e: any): Promise<any>;
            settleWith(e: any): any;
            cancel(): Promise<any>;
        };
        G: boolean;
        b: any;
        y(e: any): void;
        m: import("../../promptFileReferenceErrors.js").$UR | undefined;
        w: any;
        z(e: any): void;
        g: import("./promptHeader/modeHeader.js").$sR | import("./promptHeader/instructionsHeader.js").$xR | import("./promptHeader/promptHeader.js").$vR | undefined;
        C(e: any): /*elided*/ any;
        D(e: any, t: any): /*elided*/ any;
        F(): void;
        start(e: any): /*elided*/ any;
        readonly uri: any;
        readonly references: any[];
        readonly metadata: {
            promptType: any;
        } | {
            description: any;
            tools: any;
            mode: any;
            model: any;
            promptType: any;
        } | null;
        readonly topError: import("./topError.js").$1R | undefined;
        dispose(): void;
        a: any;
        readonly isDisposed: any;
        onDispose(s: any): any;
        addDisposables(...s: any[]): /*elided*/ any;
        assertNotDisposed(s: any): void;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=promptParser.d.ts.map