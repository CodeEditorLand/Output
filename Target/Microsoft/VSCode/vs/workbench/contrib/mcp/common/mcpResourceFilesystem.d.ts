export { U as $oic };
declare let U: {
    new (t: any, r: any): {
        readonly g: any;
        j: any;
        m: any;
        f: L;
        onDidChangeCapabilities: any;
        h: any;
        onDidChangeFile: any;
        capabilities: number;
        readFile(t: any): Promise<any>;
        readFileStream(t: any, r: any, e: any): {
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
        watch(t: any, r: any): Readonly<{
            dispose(): void;
        }> | undefined;
        stat(t: any): Promise<{
            ctime: number;
            mtime: number;
            size: any;
            type: any;
        }>;
        readdir(t: any): Promise<[any, any][]>;
        mkdir(t: any): void;
        writeFile(t: any, r: any, e: any): void;
        delete(t: any, r: any): void;
        rename(t: any, r: any, e: any): void;
        n(t: any, r: any): Promise<any>;
        t(t: any): {
            definitionId: any;
            resourceURI: any;
            server: any;
        };
        u(t: any, r: any): Promise<{
            contents: any;
            resourceURI: any;
            forSameURI: any;
        }>;
        q: O;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $wf as L } from "../../../../base/common/lazy.js";
import { $ud as O } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=mcpResourceFilesystem.d.ts.map