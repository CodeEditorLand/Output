export { k as $Vpc };
declare class k extends p {
    constructor(e: any);
    f: any;
    a: number;
    b: Map<any, any>;
    c: w;
    onDidChangeCapabilities: any;
    onDidChangeFile: any;
    capabilities: number;
    watch(e: any, t: any): any;
    stat(e: any): Promise<{
        type: any;
        mtime: number;
        ctime: number;
        size: number;
        permissions: any;
    }>;
    mkdir(): void;
    readdir(): void;
    delete(): void;
    rename(): void;
    open(e: any, t: any): Promise<number>;
    close(e: any): Promise<void>;
    writeFile(e: any, t: any): Promise<void>;
    readFile(e: any): Promise<Uint8Array<ArrayBuffer>>;
    read(e: any, t: any, s: any, o: any, i: any): Promise<number>;
    write(e: any, t: any, s: any, o: any, i: any): any;
    g(e: any): {
        session: any;
        offset: {
            fromOffset: number;
            toOffset: number;
        } | undefined;
        readOnly: boolean;
        sessionId: any;
        memoryReference: string;
    };
}
import { $vd as p } from "../../../../base/common/lifecycle.js";
import { $ef as w } from "../../../../base/common/event.js";
//# sourceMappingURL=debugMemory.d.ts.map