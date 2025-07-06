declare let m: {
    new (e: any, t: any): {
        a: any;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let c: {
    new (e: any, t: any): {
        b: any;
        c: any;
        capabilities: number;
        onDidChangeCapabilities: any;
        onDidChangeFile: any;
        watch(e: any, t: any): Readonly<{
            dispose(): void;
        }> | undefined;
        stat(e: any): Promise<{
            type: any;
            ctime: number;
            mtime: number;
            size: number;
        }>;
        mkdir(e: any): void;
        readdir(e: any): void;
        delete(e: any, t: any): void;
        rename(e: any, t: any, o: any): void;
        copy(e: any, t: any, o: any): void;
        readFile(e: any): Promise<any>;
        writeFile(e: any, t: any, o: any): void;
        readFileStream(e: any, t: any, o: any): void;
        open(e: any, t: any): void;
        close(e: any): void;
        read(e: any, t: any, o: any, n: any, r: any): void;
        write(e: any, t: any, o: any, n: any, r: any): void;
        cloneFile(e: any, t: any): void;
    };
    a: w | undefined;
    registerFile(e: any, t: any): {
        dispose(): void;
    };
};
import { $Ic as w } from "../../../../../../base/common/map.js";
export { m as $2gc, c as $3gc };
//# sourceMappingURL=chatEditingNotebookFileSystemProvider.d.ts.map