export { m as $31b };
declare let m: {
    new (e: any, i: any, t: any, r: any, s: any, o: any, a: any, h: any): {
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        a: B;
        c: _;
        f: any;
        g: {
            c: {
                c: import("../../common/memento.js").$Dub;
                d: any;
                getOrigin(e: any, t: any): string;
                e(e: any, t: any): string;
            };
            getOrigin(e: any, t: any): string;
        };
        b: any;
        readonly webviewInputs: _;
        addWebviewInput(e: any, i: any, t: any): void;
        $createWebviewPanel(e: any, i: any, t: any, r: any, s: any): void;
        $disposeWebview(e: any): void;
        $setTitle(e: any, i: any): void;
        $setIconPath(e: any, i: any): void;
        $reveal(e: any, i: any): void;
        s(e: any): any;
        $registerSerializer(e: any, i: any): void;
        $unregisterSerializer(e: any): void;
        t(e: any): void;
        u(e: any): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class B {
    constructor(e: any);
    prefix: any;
    fromExternal(e: any): any;
    toExternal(e: any): any;
}
declare class _ {
    a: Map<any, any>;
    b: Map<any, any>;
    add(e: any, i: any): void;
    getHandleForInput(e: any): any;
    getInputForHandle(e: any): any;
    delete(e: any): void;
    get size(): number;
    [Symbol.iterator](): MapIterator<any>;
}
//# sourceMappingURL=mainThreadWebviewPanels.d.ts.map