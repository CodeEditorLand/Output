export { G as $OAc };
declare class G extends E {
    constructor(t: any, e: any, i: any, r: any);
    scheme: any;
    m: any;
    n: any;
    capabilities: number;
    onDidChangeCapabilities: any;
    a: S;
    f: any;
    onDidChangeFile: any;
    g: Map<any, any>;
    w: any[];
    j: $;
    b: any;
    watch(t: any, e: any): Readonly<{
        dispose(): void;
    }> | undefined;
    mkdir(t: any): Promise<void>;
    stat(t: any): Promise<{
        type: any;
        ctime: number;
        mtime: any;
        size: any;
    }>;
    readdir(t: any): Promise<any[][]>;
    readFile(t: any): Promise<any>;
    writeFile(t: any, e: any, i: any): Promise<void>;
    rename(t: any, e: any, i: any): Promise<void>;
    delete(t: any, e: any): Promise<void>;
    r(t: any): Promise<any[][]>;
    s(t: any): void;
    t(): Promise<w>;
    h: Promise<w> | undefined;
    u(t: any): Promise<void>;
    y(): Promise<void>;
    z(t: any): Promise<void>;
    reset(): Promise<void>;
}
import { $vd as E } from "../../../base/common/lifecycle.js";
import { $ah as S } from "../../../base/common/resources.js";
import { $Gh as $ } from "../../../base/common/async.js";
declare class w {
    constructor(t: any);
    a: any;
    type: any;
    read(t: any): any;
    b(t: any): any;
    delete(t: any): void;
    d(t: any, e: any): void;
    add(t: any, e: any): void;
    f(t: any, e: any, i: any): void;
    print(t?: string): void;
}
//# sourceMappingURL=indexedDBFileSystemProvider.d.ts.map