export { v as $k7b };
declare class v extends p {
    constructor(...args: any[]);
    a: number;
    b: Map<any, any>;
    f: any;
    onDidChangeCapabilities: any;
    g: number;
    root: c;
    r: any;
    onDidChangeFile: any;
    s: any[];
    get capabilities(): number;
    setReadOnly(t: any): void;
    stat(t: any): Promise<c | undefined>;
    readdir(t: any): Promise<any[]>;
    readFile(t: any): Promise<any>;
    readFileStream(t: any): {
        e: any;
        f: any;
        a: {
            flowing: boolean;
            ended: boolean;
            destroyed: boolean;
        };
        b: {
            data: never[];
            error: never[];
        };
        c: {
            data: never[];
            error: never[];
            end: never[];
        };
        d: any[];
        pause(): void;
        resume(): void;
        write(e: any): Promise<any> | undefined;
        error(e: any): void;
        end(e: any): void;
        g(e: any): void;
        h(e: any): void;
        i(): void;
        on(e: any, t: any): void;
        removeListener(e: any, t: any): void;
        j(): void;
        k(): void;
        l(): boolean;
        destroy(): void;
    };
    writeFile(t: any, e: any, i: any): Promise<void>;
    open(t: any, e: any): Promise<number>;
    close(t: any): Promise<void>;
    read(t: any, e: any, i: any, s: any, r: any): Promise<any>;
    write(t: any, e: any, i: any, s: any, r: any): Promise<any>;
    rename(t: any, e: any, i: any): Promise<void>;
    delete(t: any, e: any): Promise<void>;
    mkdir(t: any): Promise<void>;
    h(t: any, e: any): c | undefined;
    j(t: any, e: any): c;
    m(t: any, e: any): c & u;
    n(t: any): c;
    watch(t: any, e: any): Readonly<{
        dispose(): void;
    }> | undefined;
    u(...t: any[]): void;
    t: NodeJS.Timeout | undefined;
}
import { $vd as p } from "../../../base/common/lifecycle.js";
declare class c {
    constructor(t: any);
    type: any;
    ctime: number;
    mtime: number;
    size: number;
    name: any;
    entries: Map<any, any>;
}
declare class u {
    constructor(t: any);
    type: any;
    ctime: number;
    mtime: number;
    size: number;
    name: any;
}
//# sourceMappingURL=inMemoryFilesystemProvider.d.ts.map