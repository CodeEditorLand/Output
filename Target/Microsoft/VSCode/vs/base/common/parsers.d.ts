declare class h {
    a: number;
    set state(s: number);
    get state(): number;
    isOK(): boolean;
    isFatal(): boolean;
}
declare class e {
    constructor(s: any);
    a: any;
    reset(): void;
    get problemReporter(): any;
    info(s: any): void;
    warn(s: any): void;
    error(s: any): void;
    fatal(s: any): void;
}
declare var t: any;
export { h as $gU, e as $hU, t as ValidationState };
//# sourceMappingURL=parsers.d.ts.map