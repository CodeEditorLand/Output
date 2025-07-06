export { m as $4sc };
declare let m: {
    new (e: any, t: any, r: any, n: any, o: any, c: any): {
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        f: any;
        onWillPaste: any;
        g: any;
        onDidPaste: any;
        xtermReady(e: any): void;
        a: any;
        copySelection(e: any, t: any): Promise<void>;
        paste(): Promise<void>;
        pasteSelection(): Promise<void>;
        t(e: any): Promise<void>;
        handleMouseEvent(e: any): Promise<{
            handled: boolean;
        } | undefined>;
        overrideCopyOnSelection(e: any): any;
        b: any;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    get(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=terminal.clipboard.contribution.d.ts.map