export { f as $V2b };
declare let f: {
    new (t: any, i: any, e: any, r: any, s: any, o: any, n: any, c: any, u: any, d: any, p: any): {
        readonly model: any;
        typeId: any;
        resource: any;
        name: any;
        hasAssociatedFilePath: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        b: any;
        onDidChangeContent: any;
        c: any;
        onDidChangeDirty: any;
        f: any;
        onDidSave: any;
        g: any;
        onDidRevert: any;
        h: any;
        onWillDispose: any;
        capabilities: number;
        u: any;
        isDirty(): any;
        isModified(): any;
        w(t: any): void;
        resolve(): Promise<void>;
        y(t: any): Promise<void>;
        a: any;
        z(t: any): void;
        C(t: any): void;
        isResolved(): boolean;
        readonly backupDelay: any;
        backup(t: any): Promise<{
            content: any;
        }>;
        save(t: any): Promise<any>;
        revert(): Promise<void>;
        dispose(): void;
        D(t: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=untitledFileWorkingCopy.d.ts.map