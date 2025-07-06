declare class e {
    static fromExtHostTestItem(t: any, r: any, n?: any): e;
    static isRoot(t: any): boolean;
    static root(t: any): any;
    static fromString(t: any): e;
    static join(t: any, r: any): e;
    static split(t: any): any;
    static joinToString(t: any, r: any): string;
    static parentId(t: any): any;
    static localId(t: any): any;
    static isChild(t: any, r: any): any;
    static compare(t: any, r: any): 0 | 1 | 2 | 3;
    static getLengthOfCommonPrefix(t: any, r: any): number;
    constructor(t: any, r?: any);
    path: any;
    d: any;
    get rootId(): e;
    get parentId(): any;
    get localId(): any;
    get controllerId(): any;
    get isRoot(): boolean;
    idsFromRoot(): Generator<e, void, unknown>;
    idsToRoot(): Generator<e, void, unknown>;
    compare(t: any): 0 | 1 | 2 | 3;
    toJSON(): any;
    toString(): any;
    c: any;
}
declare var a: any;
declare var c: any;
export { e as $GU, a as TestIdPathParts, c as TestPosition };
//# sourceMappingURL=testId.d.ts.map