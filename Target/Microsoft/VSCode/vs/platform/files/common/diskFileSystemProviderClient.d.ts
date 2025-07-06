declare const q: "localFilesystem";
declare class A extends p {
    constructor(e: any, t: any);
    a: any;
    b: any;
    onDidChangeCapabilities: any;
    f: any;
    onDidChangeFile: any;
    g: any;
    onDidWatchError: any;
    h: string;
    get capabilities(): number;
    c: number | undefined;
    stat(e: any): any;
    realpath(e: any): any;
    readdir(e: any): any;
    readFile(e: any, t: any): Promise<any>;
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
    writeFile(e: any, t: any, i: any): any;
    open(e: any, t: any): any;
    close(e: any): any;
    read(e: any, t: any, i: any, s: any, a: any): Promise<any>;
    write(e: any, t: any, i: any, s: any, a: any): any;
    mkdir(e: any): any;
    delete(e: any, t: any): any;
    rename(e: any, t: any, i: any): any;
    copy(e: any, t: any, i: any): any;
    cloneFile(e: any, t: any): any;
    j(): void;
    watch(e: any, t: any): any;
}
import { $vd as p } from "../../../base/common/lifecycle.js";
export { q as $Rw, A as $Sw };
//# sourceMappingURL=diskFileSystemProviderClient.d.ts.map