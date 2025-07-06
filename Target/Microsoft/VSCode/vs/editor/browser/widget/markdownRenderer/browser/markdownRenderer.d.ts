declare let m: {
    new (e: any, t: any, r: any): {
        b: any;
        c: any;
        d: any;
        render(e: any, t: any, r: any): {
            element: any;
            dispose: () => void;
        };
        f(e: any, t: any): {
            codeBlockRenderer: (r: any, i: any) => Promise<HTMLSpanElement>;
            actionHandler: {
                callback: (r: any) => Promise<void>;
                disposables: any;
            };
        };
        g(e: any, t: any): Promise<void>;
    };
    a: any;
};
declare function w(o: any, e: any, t: any, r: any): Promise<any>;
export { m as $Hhb, w as $Ihb };
//# sourceMappingURL=markdownRenderer.d.ts.map