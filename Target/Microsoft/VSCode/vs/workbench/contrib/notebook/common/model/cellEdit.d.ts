declare class a {
    constructor(e: any, t: any, s: any, l: any, h: any, o: any, r: any);
    get label(): "Move Cell" | "Move Cells";
    resource: any;
    a: any;
    b: any;
    c: any;
    d: any;
    e: any;
    f: any;
    type: number;
    code: string;
    undo(): void;
    redo(): void;
}
declare class d {
    constructor(e: any, t: any, s: any, l: any, h: any);
    get label(): "Insert Cells" | "Insert Cell" | "Delete Cells" | "Delete Cell";
    resource: any;
    a: any;
    b: any;
    c: any;
    d: any;
    type: number;
    code: string;
    undo(): void;
    redo(): void;
}
declare class n {
    constructor(e: any, t: any, s: any, l: any, h: any);
    resource: any;
    index: any;
    oldMetadata: any;
    newMetadata: any;
    a: any;
    type: number;
    label: string;
    code: string;
    undo(): void;
    redo(): void;
}
export { a as $7K, d as $8K, n as $9K };
//# sourceMappingURL=cellEdit.d.ts.map