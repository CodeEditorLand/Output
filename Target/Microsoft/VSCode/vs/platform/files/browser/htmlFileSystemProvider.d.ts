export { _ as $hhb };
declare class _ extends b {
    constructor(e: any, t: any, i: any);
    get capabilities(): number;
    b: number | undefined;
    c: any;
    f: any;
    g: any;
    onDidChangeCapabilities: any;
    a: import("../../../base/common/resources.js").$ah;
    h: any;
    onDidChangeFile: any;
    m: Map<any, any>;
    n: Map<any, any>;
    stat(e: any): Promise<{
        type: any;
        mtime: any;
        ctime: number;
        size: any;
    }>;
    readdir(e: any): Promise<any[][]>;
    readFileStream(e: any, t: any, i: any): {
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
    readFile(e: any): Promise<Uint8Array<any>>;
    writeFile(e: any, t: any, i: any): Promise<void>;
    mkdir(e: any): Promise<void>;
    delete(e: any, t: any): Promise<any>;
    rename(e: any, t: any, i: any): Promise<void>;
    watch(e: any, t: any): v;
    j(e: any, t: any, i: any): Promise<void>;
    registerFileHandle(e: any): Promise<{
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    }>;
    registerDirectoryHandle(e: any): Promise<{
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    }>;
    get directories(): MapIterator<any>;
    r(e: any, t: any): Promise<{
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    }>;
    getHandle(e: any): Promise<any>;
    s(e: any): Promise<any>;
    t(e: any): any;
    u(e: any): Promise<any>;
    w(e: any): C;
    y(e: any, t: any, i: any): C;
}
import { $vd as b } from "../../../base/common/lifecycle.js";
import { $ud as v } from "../../../base/common/lifecycle.js";
import { $gk as C } from "../common/files.js";
//# sourceMappingURL=htmlFileSystemProvider.d.ts.map