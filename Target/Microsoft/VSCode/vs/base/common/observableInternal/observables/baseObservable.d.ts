declare function m(n: any): void;
declare function $(n: any): void;
declare function v(n: any): void;
declare class l {
    get TChange(): null;
    reportChanges(): void;
    read(e: any): any;
    map(e: any, t: any): any;
    flatten(): any;
    recomputeInitiallyAndOnChange(e: any, t: any): this;
    keepObserved(e: any): this;
    get b(): any;
}
declare class C extends l {
    f: Set<any>;
    addObserver(e: any): void;
    removeObserver(e: any): void;
    g(): void;
    h(): void;
    log(): this;
    debugGetObservers(): Set<any>;
}
export { m as $me, $ as $ne, v as $oe, l as $pe, C as $qe };
//# sourceMappingURL=baseObservable.d.ts.map