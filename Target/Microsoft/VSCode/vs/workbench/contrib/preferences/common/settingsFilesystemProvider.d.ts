export { b as $I9b };
declare let b: {
    new (t: any, e: any): {
        c: any;
        f: any;
        a: any;
        onDidChangeFile: any;
        capabilities: number;
        onDidChangeCapabilities: any;
        readFile(t: any): Promise<any>;
        stat(t: any): Promise<{
            type: any;
            permissions: any;
            mtime: number;
            ctime: number;
            size: number;
        }>;
        watch(t: any, e: any): Readonly<{
            dispose(): void;
        }> | undefined;
        mkdir(t: any): Promise<void>;
        readdir(t: any): Promise<never[]>;
        rename(t: any, e: any, i: any): Promise<void>;
        delete(t: any, e: any): Promise<void>;
        writeFile(): Promise<void>;
        g(t: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    SCHEMA: any;
    b: {
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
    } | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=settingsFilesystemProvider.d.ts.map