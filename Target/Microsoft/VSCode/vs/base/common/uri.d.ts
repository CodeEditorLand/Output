declare function F(t: any): boolean;
declare function g(t: any, e: any): any;
declare class l {
    static isUri(e: any): boolean;
    static parse(e: any, r?: boolean): u;
    static file(e: any): u;
    static from(e: any, r: any): u;
    static joinPath(e: any, ...r: any[]): any;
    static revive(e: any): any;
    constructor(e: any, r: any, s: any, o: any, i: any, n?: boolean);
    scheme: any;
    authority: any;
    path: any;
    query: any;
    fragment: any;
    get fsPath(): any;
    with(e: any): this | u;
    toString(e?: boolean): string;
    toJSON(): this;
}
declare class u extends l {
    constructor(...args: any[]);
    _formatted: string | null;
    _fsPath: any;
    toJSON(): {
        $mid: number;
    };
}
export { F as $Dc, g as $Ec, l as URI };
//# sourceMappingURL=uri.d.ts.map