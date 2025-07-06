declare function It(a: any): boolean;
declare class N {
    providedPasteEditKinds: any[];
    copyMimeTypes: string[];
    pasteMimeTypes: any[];
    prepareDocumentPaste(t: any, n: any, i: any, o: any): Promise<S | undefined>;
}
declare class at {
    constructor(t: any, n: any);
    a: any;
    d: any;
    kind: E;
    providedPasteEditKinds: E[];
    copyMimeTypes: any[];
    pasteMimeTypes: string[];
    provideDocumentPasteEdits(t: any, n: any, i: any, o: any, e: any): Promise<{
        edits: any[];
        dispose: () => void;
    } | undefined>;
}
declare let W: {
    new (t: any, n: any, i: any, o: any, e: any, r: any, s: any, d: any): {
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let v: {
    new (t: any, n: any, i: any, o: any, e: any): {
        d: any;
        e: any;
        f: any;
        g: any;
        h: any;
        kind: E;
        providedPasteEditKinds: E[];
        copyMimeTypes: any[];
        pasteMimeTypes: string[];
        a: any;
        provideDocumentPasteEdits(t: any, n: any, i: any, o: any, e: any): Promise<{
            edits: any[];
            dispose: () => void;
        } | undefined>;
    };
};
declare function rt(a: any): Promise<string>;
import { $8C as S } from "../../../../base/common/dataTransfer.js";
import { $$C as E } from "../../../../base/common/hierarchicalKind.js";
export { It as $1Wb, N as $2Wb, at as $3Wb, W as $4Wb, v as $YWb, rt as $ZWb };
//# sourceMappingURL=chatPasteProviders.d.ts.map