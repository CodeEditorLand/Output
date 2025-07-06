export { b as $WP };
declare class b {
    static getRoot(t: any): any;
    static collect(t: any): any;
    static isResourceNode(t: any): t is l;
    constructor(t: any, e?: {
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
    }, r?: import("./resources.js").$ah);
    a: import("./resources.js").$ah;
    root: l;
    add(t: any, e: any): void;
    delete(t: any): any;
    b(t: any, e: any): any;
    clear(): void;
    getNode(t: any): any;
}
declare class l {
    constructor(t: any, e: any, r: any, i?: undefined, n?: undefined);
    get childrenCount(): number;
    get children(): MapIterator<any>;
    get name(): any;
    uri: any;
    relativePath: any;
    context: any;
    element: any;
    parent: any;
    a: Map<any, any>;
    get(t: any): any;
    set(t: any, e: any): void;
    delete(t: any): void;
    clear(): void;
}
//# sourceMappingURL=resourceTree.d.ts.map