export { r as $Gd };
declare class r {
    a: t | undefined;
    b: t | undefined;
    c: number;
    get size(): number;
    isEmpty(): boolean;
    clear(): void;
    unshift(e: any): () => void;
    push(e: any): () => void;
    d(e: any, i: any): () => void;
    shift(): any;
    pop(): any;
    e(e: any): void;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
declare class t {
    constructor(e: any);
    element: any;
    next: t | undefined;
    prev: t | undefined;
}
//# sourceMappingURL=linkedList.d.ts.map