declare let X: {
    new (e: any, t: any, r: any, n: boolean | undefined, i: number | undefined, c: any, l: any, x: any, b: any, I: any, w: any, f: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        codeblocksPartId: string;
        b: any[];
        c: any;
        onDidChangeHeight: any;
        codeblocks: any[];
        domNode: any;
        s(e: any, t: any, r: any, n: any, i: any): {
            object: any;
            isStale: () => boolean;
            dispose: () => any;
        };
        t(e: any, t: any, r: any, n: any): any;
        hasSameContent(e: any): boolean;
        layout(e: any): void;
        addDisposable(e: any): void;
        q: ce;
        dispose(): void;
        B(t: any): any;
    };
    a: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let J: {
    new (e: any, t: any, r: any, n: any): {
        inUse(): any;
        a: any;
        get(): {
            object: any;
            isStale: () => boolean;
            dispose: () => void;
        };
        q: ce;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as ce } from "../../../../../base/common/lifecycle.js";
export { X as $2Qb, J as $3Qb };
//# sourceMappingURL=chatMarkdownContentPart.d.ts.map