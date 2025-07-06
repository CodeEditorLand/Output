declare class k {
    static g(t: any, e: any): any;
    constructor(t: any, e: any);
    c: any;
    d: any;
    pushStackElement(): void;
    popStackElement(): void;
    clear(): void;
    f(t: any, e: any): any;
    pushEOL(t: any): void;
    pushEditOperation(t: any, e: any, i: any, s: any, o?: import("../textModelEditReason.js").$ME): any;
}
declare class n {
    static create(t: any, e: any): n;
    static c(t: any): number;
    static d(t: any, e: any, i: any): any;
    static f(t: any, e: any, i: any): any;
    static deserialize(t: any): n;
    constructor(t: any, e: any, i: any, s: any, o: any, a: any, h: any);
    beforeVersionId: any;
    afterVersionId: any;
    beforeEOL: any;
    afterEOL: any;
    beforeCursorState: any;
    afterCursorState: any;
    changes: any;
    append(t: any, e: any, i: any, s: any, o: any): void;
    serialize(): ArrayBuffer;
}
declare class C {
    constructor(t: any, e: any, i: any, s: any);
    get type(): number;
    get resource(): any;
    label: any;
    code: any;
    model: any;
    c: n;
    toString(): any;
    matchesResource(t: any): boolean;
    setModel(t: any): void;
    canAppend(t: any): boolean;
    append(t: any, e: any, i: any, s: any, o: any): void;
    close(): void;
    open(): void;
    undo(): void;
    redo(): void;
    heapSize(): any;
}
declare class w {
    constructor(t: any, e: any, i: any);
    get resources(): any;
    label: any;
    code: any;
    type: number;
    c: boolean;
    d: any;
    f: Map<any, any>;
    g: any;
    setDelegate(t: any): void;
    prepareUndoRedo(): any;
    getMissingModels(): any[];
    matchesResource(t: any): boolean;
    setModel(t: any): void;
    canAppend(t: any): any;
    append(t: any, e: any, i: any, s: any, o: any): void;
    close(): void;
    open(): void;
    undo(): void;
    redo(): void;
    heapSize(t: any): any;
    split(): any;
    toString(): string;
}
declare function g(c: any): boolean;
export { k as $0G, n as $6G, C as $7G, w as $8G, g as $9G };
//# sourceMappingURL=editStack.d.ts.map