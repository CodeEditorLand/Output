export { m as $wCc };
declare let m: {
    new (o: any, r: any, t: any): {
        d: any;
        e: any;
        f: any;
        g: any;
        a: Promise<any>;
        b: Promise<any>;
        c: any;
        hasValidBasename(e: any, t: any, r: any): boolean | Promise<boolean>;
        h(e: any, t: any, r: any): boolean;
        readonly defaultUriScheme: any;
        userHome(e: any): any;
        readonly resolvedUserHome: any;
        readonly path: Promise<{
            resolve(...e: any[]): string;
            normalize(e: any): any;
            isAbsolute(e: any): boolean;
            join(...e: any[]): any;
            relative(e: any, t: any): any;
            toNamespacedPath(e: any): any;
            dirname(e: any): any;
            basename(e: any, t: any): any;
            extname(e: any): any;
            format: (t?: any) => any;
            parse(e: any): {
                root: string;
                dir: string;
                base: string;
                ext: string;
                name: string;
            };
            sep: string;
            delimiter: string;
            win32: null;
            posix: null;
        }>;
        fileURI(e: any): Promise<{
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
        }>;
    };
    findDefaultUriScheme(e: any, t: any): any;
};
//# sourceMappingURL=pathService.d.ts.map