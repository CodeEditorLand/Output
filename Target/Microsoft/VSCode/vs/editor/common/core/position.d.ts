export { u as $dC };
declare class u {
    static equals(e: any, r: any): boolean;
    static isBefore(e: any, r: any): boolean;
    static isBeforeOrEqual(e: any, r: any): boolean;
    static compare(e: any, r: any): number;
    static lift(e: any): u;
    static isIPosition(e: any): any;
    constructor(e: any, r: any);
    lineNumber: any;
    column: any;
    with(e?: any, r?: any): u;
    delta(e?: number, r?: number): u;
    equals(e: any): boolean;
    isBefore(e: any): boolean;
    isBeforeOrEqual(e: any): boolean;
    clone(): u;
    toString(): string;
    toJSON(): {
        lineNumber: any;
        column: any;
    };
}
//# sourceMappingURL=position.d.ts.map