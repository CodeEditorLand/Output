declare let C: {
    new (e: any, t: any, i: any, n: any, s: any, r: any, o: any, f: any, w: any, l: any, c: any, u: any, E: any, v: any, F: any, b: any, k: any, W: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        files: any;
        untitled: any;
        I(): void;
        readonly encoding: any;
        J: any;
        read(e: any, t: any): Promise<any>;
        readStream(e: any, t: any): Promise<any>;
        L(e: any, t: any): Promise<any[]>;
        create(e: any, t: any): Promise<any>;
        write(e: any, t: any, i: any): Promise<any>;
        getEncodedReadable(e: any, t: any, i: any): Promise<import("../../../../base/common/buffer.js").$Ki | {
            read: () => import("../../../../base/common/buffer.js").$Ki | null;
        } | undefined>;
        getDecodedStream(e: any, t: any, i: any): Promise<any>;
        M(e: any, t: any, i: any): Promise<any>;
        getEncoding(e: any): any;
        resolveDecoding(e: any, t: any): Promise<{
            preferredEncoding: any;
            guessEncoding: any;
            candidateGuessEncodings: any;
        }>;
        validateDetectedEncoding(e: any, t: any, i: any): Promise<any>;
        resolveEncoding(e: any, t: any): any;
        save(e: any, t: any): any;
        saveAs(e: any, t: any, i: any): any;
        N(e: any, t: any, i: any): Promise<any>;
        O(e: any, t: any, i: any, n: any): any;
        P(e: any): Promise<any>;
        Q(e: any): Promise<any>;
        R(e: any): Promise<any>;
        suggestFilename(e: any, t: any): any;
        revert(e: any, t: any): Promise<any>;
        isDirty(e: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: any;
    b: any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let P: {
    new (e: any, t: any, i: any, n: any): {
        b: ({
            parent: any;
            encoding: string;
            extension?: never;
        } | {
            extension: string;
            encoding: string;
            parent?: never;
        })[];
        a: ({
            parent: any;
            encoding: string;
            extension?: never;
        } | {
            extension: string;
            encoding: string;
            parent?: never;
        })[];
        f: any;
        g: any;
        h: any;
        j: any;
        m(): void;
        n(): ({
            parent: any;
            encoding: string;
            extension?: never;
        } | {
            extension: string;
            encoding: string;
            parent?: never;
        })[];
        getWriteEncoding(e: any, t: any): Promise<{
            encoding: any;
            addBOM: boolean;
        }>;
        getPreferredWriteEncoding(e: any, t: any): Promise<{
            encoding: any;
            hasBOM: boolean;
        }>;
        getPreferredReadEncoding(e: any, t: any, i: any): Promise<{
            encoding: any;
            hasBOM: boolean;
        }>;
        getUnvalidatedEncodingForResource(e: any, t: any): any;
        r(e: any, t: any): Promise<any>;
        s(e: any): string | undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { C as $sBc, P as $tBc };
//# sourceMappingURL=textFileService.d.ts.map