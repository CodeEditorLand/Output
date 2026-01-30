export class LinkedList {
    _first: Node | undefined;
    _last: Node | undefined;
    _size: number;
    get size(): number;
    isEmpty(): boolean;
    clear(): void;
    unshift(element: any): () => void;
    push(element: any): () => void;
    _insert(element: any, atTheEnd: any): () => void;
    shift(): any;
    pop(): any;
    peek(): any;
    _remove(node: any): void;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
declare class Node {
    constructor(element: any);
    element: any;
    next: Node | undefined;
    prev: Node | undefined;
}
export {};
//# sourceMappingURL=linkedList.d.ts.map