declare let d: {
    new (t: any): {
        a: any;
        open(t: any): Promise<void>;
    };
};
declare let w: {
    new (t: any): {
        a: any;
        open(t: any): Promise<void>;
    };
};
declare let $: {
    new (t: any): {
        a: any;
        open(t: any): Promise<void>;
    };
};
declare let x: {
    new (t: any, r: any, s: any, e: any, i: any, n: any, o: any, f: any, h: any, l: any, b: any, y: any): {
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        a: any;
        open(t: any): Promise<any>;
        n(t: any): Promise<{
            uri: any;
            isDirectory?: never;
        } | {
            uri: {
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
            };
            isDirectory: any;
        } | undefined>;
        o(t: any, r: any): Promise<boolean>;
    };
};
declare let g: {
    new (t: any, r: any, s: any): {
        a: any;
        b: any;
        c: any;
        open(t: any): Promise<void>;
    };
};
export { d as $Dtc, w as $Etc, $ as $Ftc, x as $Gtc, g as $Htc };
//# sourceMappingURL=terminalLinkOpeners.d.ts.map