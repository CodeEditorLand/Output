export { m as $uCc };
declare let m: {
    new (r: any, t: any, o: any, i: any, e: any): {
        u: any;
        w: any;
        y: any;
        writeText(r: any, t: any): Promise<any>;
        readText(r: any): Promise<any>;
        a: any;
        b: any;
        g: Map<any, any>;
        j: string;
        m: any[];
        triggerPaste(): void;
        readImage(): Promise<Uint8Array<ArrayBuffer>>;
        f(): void;
        c: import("../../../../base/common/async.js").$$h | undefined;
        h(t: any): void;
        readFindText(): Promise<string>;
        writeFindText(t: any): Promise<void>;
        writeResources(t: any): Promise<void>;
        n: any;
        readResources(): Promise<any>;
        s(): Promise<any>;
        hasResources(): Promise<boolean>;
        clearInternalState(): void;
        t(): void;
        q: b;
        dispose(): void;
        B(t: any): any;
    };
    r: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as b } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=clipboardService.d.ts.map