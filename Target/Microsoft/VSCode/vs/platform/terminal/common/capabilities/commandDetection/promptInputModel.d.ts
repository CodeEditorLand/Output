export { m as $Cw };
declare let m: {
    new (t: any, i: any, h: any, r: any, e: any): {
        readonly value: string;
        readonly prefix: string;
        readonly suffix: string;
        readonly cursorIndex: number;
        readonly ghostTextIndex: number;
        D: any;
        F: any;
        c: number;
        g: number;
        n: string;
        r: string;
        s: number;
        t: number;
        u: any;
        onDidStartInput: any;
        w: any;
        onDidChangeInput: any;
        z: any;
        onDidFinishInput: any;
        C: any;
        onDidInterrupt: any;
        G(t: any): void;
        setShellType(t: any): void;
        m: any;
        setContinuationPrompt(t: any): void;
        j: any;
        setLastPromptLine(t: any): void;
        h: any;
        setConfidentCommandLine(t: any): void;
        getCombinedString(t: any): string;
        serialize(): {
            modelState: Readonly<{
                value: string;
                prefix: string;
                suffix: string;
                cursorIndex: number;
                ghostTextIndex: number;
            }>;
            commandStartX: number;
            lastPromptLine: any;
            continuationPrompt: any;
            lastUserInput: string;
        };
        deserialize(t: any): void;
        H(t: any): void;
        f: any;
        I(): void;
        J(): void;
        L(): void;
        M(): void;
        N(t: any): void;
        O(t: any, i: any, h: any): number;
        P(t: any, i: any, h: any): number;
        Q(t: any): string;
        R(t: any, i: any): boolean;
        S(t: any): any;
        U(t: any): boolean;
        W(t: any, i: any): number;
        X(t: any, i: any, h: any): any;
        Y(t: any): boolean;
        Z(): Readonly<{
            value: string;
            prefix: string;
            suffix: string;
            cursorIndex: number;
            ghostTextIndex: number;
        }>;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=promptInputModel.d.ts.map