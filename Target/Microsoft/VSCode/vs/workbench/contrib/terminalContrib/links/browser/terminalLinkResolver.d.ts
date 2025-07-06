export { b as $Qtc };
declare let b: {
    new (t: any): {
        b: any;
        a: Map<any, any>;
        resolveLink(t: any, e: any, r: any): Promise<any>;
        c(t: any, e: any, r: any, o: any): any;
        d(t: any): {
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
        };
    };
};
//# sourceMappingURL=terminalLinkResolver.d.ts.map