export { m as $X1b };
declare let m: {
    new (e: any, t: any, r: any, i: any, o: any, n: any): {
        f: any;
        g: any;
        h: any;
        b: Map<any, any>;
        a: any;
        c: any;
        getOpeners(e: any): AsyncGenerator<{
            id: any;
            label: any;
            canOpen: (r: any, i: any) => any;
            openExternalUri: (r: any, i: any, o: any) => Promise<boolean>;
        }, void, unknown>;
        j(e: any, t: any): {
            id: any;
            label: any;
            canOpen: (r: any, i: any) => any;
            openExternalUri: (r: any, i: any, o: any) => Promise<boolean>;
        };
        $registerUriOpener(e: any, t: any, r: any, i: any): Promise<void>;
        $unregisterUriOpener(e: any): Promise<void>;
        dispose(): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=mainThreadUriOpeners.d.ts.map