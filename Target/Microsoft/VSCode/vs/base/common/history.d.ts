declare class a {
    constructor(t?: Set<any>, s?: number);
    d: Set<any>;
    a: number;
    c: any;
    getHistory(): any[];
    add(t: any): void;
    next(): any;
    previous(): any;
    current(): any;
    first(): any;
    last(): any;
    isFirst(): boolean;
    isLast(): boolean;
    isNowhere(): boolean;
    has(t: any): boolean;
    clear(): void;
    f(): void;
    b: n | undefined;
    g(): void;
    h(): number;
    get j(): any[];
    dispose(): void;
}
declare class o {
    constructor(t: any, s?: number, e?: (i: any) => any);
    get size(): number;
    g: number;
    h: (i: any) => any;
    f: number;
    b: {
        value: any;
        previous: undefined;
        next: undefined;
    };
    c: {
        value: any;
        previous: undefined;
        next: undefined;
    };
    d: {
        value: any;
        previous: undefined;
        next: undefined;
    };
    a: r;
    add(t: any): void;
    replaceLast(t: any): any;
    prepend(t: any): void;
    isAtEnd(): boolean;
    current(): any;
    previous(): any;
    next(): any;
    has(t: any): boolean;
    resetCursor(): any;
    j(t: any): void;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
import { $_9 as n } from "./navigator.js";
import { $f as r } from "./collections.js";
export { a as $a0, o as $b0 };
//# sourceMappingURL=history.d.ts.map