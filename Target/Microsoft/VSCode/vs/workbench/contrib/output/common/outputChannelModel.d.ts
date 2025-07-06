declare function Z(r: any, t: any): {
    range: C;
    timestamp: number;
    timestampRange: C;
    logLevel: any;
    logLevelRange: C;
    category: string | undefined;
} | null;
declare let O: {
    new (t: any, e: any, s: any, n: any, i: any): {
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        f: any;
        onDispose: any;
        g: any;
        h: any;
        j: any;
        m: boolean;
        n: any;
        r: any;
        loadModel(): Promise<any>;
        getLogEntries(): any;
        C(t: any, e: any): void;
        D(t: any, e: any): void;
        s: any;
        F(t: any): void;
        G(t: any, e: any, s: any): void;
        H(t: any, e: any): void;
        I(t: any, e: any): Promise<void>;
        J(t: any, e: any): Promise<any>;
        L(): void;
        M(): boolean;
        dispose(): void;
        append(t: any): void;
        replace(t: any): void;
        q: X;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let q: {
    new (t: any, e: any, s: any, n: any, i: any, o: any, a: any, d: any): {
        source: any;
        N: any;
        clear(): void;
        update(t: any, e: any, s: any): void;
        updateChannelSources(t: any): void;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        f: any;
        onDispose: any;
        g: any;
        h: any;
        j: any;
        m: boolean;
        n: any;
        r: any;
        loadModel(): Promise<any>;
        getLogEntries(): any;
        C(t: any, e: any): void;
        D(t: any, e: any): void;
        s: any;
        F(t: any): void;
        G(t: any, e: any, s: any): void;
        H(t: any, e: any): void;
        I(t: any, e: any): Promise<void>;
        J(t: any, e: any): Promise<any>;
        L(): void;
        M(): boolean;
        dispose(): void;
        append(t: any): void;
        replace(t: any): void;
        q: X;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let V: {
    new (t: any, e: any, s: any, n: any, i: any, o: any, a: any, d: any): {
        source: any;
        N: any;
        updateChannelSources(t: any): void;
        clear(): void;
        update(t: any, e: any, s: any): void;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        f: any;
        onDispose: any;
        g: any;
        h: any;
        j: any;
        m: boolean;
        n: any;
        r: any;
        loadModel(): Promise<any>;
        getLogEntries(): any;
        C(t: any, e: any): void;
        D(t: any, e: any): void;
        s: any;
        F(t: any): void;
        G(t: any, e: any, s: any): void;
        H(t: any, e: any): void;
        I(t: any, e: any): Promise<void>;
        J(t: any, e: any): Promise<any>;
        L(): void;
        M(): boolean;
        dispose(): void;
        append(t: any): void;
        replace(t: any): void;
        q: X;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let W: {
    new (t: any, e: any, s: any, n: any, i: any, o: any, a: any): {
        h: any;
        j: any;
        f: any;
        onDispose: any;
        g: Promise<any>;
        source: {
            resource: any;
        };
        m(t: any, e: any, s: any, n: any, i: any): Promise<any>;
        getLogEntries(): never[];
        append(t: any): void;
        update(t: any, e: any, s: any): void;
        loadModel(): Promise<any>;
        clear(): void;
        replace(t: any): void;
        updateChannelSources(t: any): void;
        q: X;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $eC as C } from "../../../../editor/common/core/range.js";
import { $ud as X } from "../../../../base/common/lifecycle.js";
export { Z as $Frc, O as $Grc, q as $Hrc, V as $Irc, W as $Jrc };
//# sourceMappingURL=outputChannelModel.d.ts.map