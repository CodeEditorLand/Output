export { c as $LCc };
declare let c: {
    new (r: any, t: any, e: any, n: any, o: any, i: any, p: any): {
        H(): {
            flushOnChange: boolean;
        };
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        c: any;
        onDidAddEntry: any;
        f: any;
        onDidChangeEntry: any;
        g: any;
        onDidReplaceEntry: any;
        h: any;
        onDidMoveEntries: any;
        j: any;
        onDidRemoveEntry: any;
        m: any;
        onDidRemoveEntries: any;
        n: import("../../../../base/common/async.js").$$h;
        r: import("../../../../base/common/map.js").$Ic;
        D(): Promise<void>;
        moveEntries(t: any, i: any): Promise<any[]>;
        F(t: any, i: any, e: any, s: any): Promise<any>;
        addEntry({ resource: t, source: i, timestamp: e }: {
            resource: any;
            source: any;
            timestamp: any;
        }, s: any): Promise<any>;
        updateEntry(t: any, i: any, e: any): Promise<any>;
        removeEntry(t: any, i: any): Promise<any>;
        removeAll(t: any): Promise<void>;
        getEntries(t: any, i: any): Promise<any>;
        getAll(t: any): Promise<any[]>;
        G(t: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: any;
    b: any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=workingCopyHistoryService.d.ts.map