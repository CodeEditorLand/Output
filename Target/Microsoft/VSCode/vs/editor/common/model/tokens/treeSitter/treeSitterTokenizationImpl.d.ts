declare namespace Q {
    let css: string;
    let typescript: string;
    let ini: string;
    let regex: string;
}
declare let y: {
    new (e: any, t: any, n: any, i: any, o: any): {
        readonly m: any;
        n: any;
        s: any;
        t: any;
        u: any;
        w: any;
        f: any;
        onDidChangeTokens: any;
        g: any;
        onDidChangeBackgroundTokenization: any;
        h: any;
        a: any;
        b: any;
        c: any;
        handleContentChanged(e: any): void;
        getLineTokens(e: any): E;
        y(): {
            token: any;
            length: any;
            startOffsetInclusive: number;
        }[];
        z(): any;
        C(e: any, t: any, n: any): {
            token: any;
            length: any;
            startOffsetInclusive: number;
        };
        hasAccurateTokensForLine(e: any): boolean;
        tokenizeLinesAt(e: any, t: any): E[] | null;
        D(e: any, t: any): any;
        hasTokens(e: any): boolean;
        getTokens(e: any): Uint32Array<ArrayBuffer>;
        getTokensInRange(e: any, t: any, n: any, i: any): {
            startOffsetInclusive: any;
            length: number;
            token: any;
        }[] | undefined;
        F(e: any, t: any, n: any): void;
        G(e: any): void;
        H(): any;
        I(e: any): void;
        J(e: any, t: any): any[] | undefined;
        L(e: any, t: any, n: any, i: any, o: any): any[] | undefined;
        M(e: any): Promise<void>;
        N(e: any): Promise<void>;
        O(e: any, t: any): Promise<void>;
        P(e: any, t: any, n: any): Promise<void>;
        Q(e: any): void;
        R(e: any, t: any, n: any): {
            startOffsetInclusive: any;
            length: number;
            token: any;
        }[];
        S(): void;
        captureAtPosition(e: any, t: any): any;
        captureAtRangeTree(e: any): any;
        U(e: any): any;
        W(e: any): any;
        tokenizeEncoded(e: any): void;
        tokenizeEncodedInstrumented(e: any): {
            result: Uint32Array<ArrayBuffer>;
            captureTime: number;
            metadataTime: number;
        } | undefined;
        X(e: any): any;
        Y(e: any, t: any, n: any): {
            versionId: any;
            endOffsetsAndMetadata: any[];
            captureTime: number;
            metadataTime: number;
        } | undefined;
        Z(e: any, t: any, n: any): {
            endOffsets: any[];
            captureTime: number;
        } | undefined;
        $(e: any, t: any): never[];
        ab(e: any, t: any, n: any): {
            endOffsetsAndMetadata: any[];
            captureTime: number;
            metadataTime: number;
        } | undefined;
        bb(e: any): {
            result: any[];
            captureTime: number;
            metadataTime: number;
            versionId: any;
        } | undefined;
        cb(e: any): Uint32Array<ArrayBuffer>;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $gD as E } from "../../../tokens/lineTokens.js";
export { Q as $0H, y as $9H };
//# sourceMappingURL=treeSitterTokenizationImpl.d.ts.map