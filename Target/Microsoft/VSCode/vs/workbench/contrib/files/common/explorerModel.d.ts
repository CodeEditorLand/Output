declare class K {
    constructor(e: any, t: any, s: any, i: any, r: any);
    f: any;
    g: any;
    d: E;
    a: any;
    b: any;
    get roots(): any;
    get onDidChangeRoots(): any;
    findAll(e: any): any;
    findClosest(e: any): any;
    dispose(): void;
}
declare class d {
    static create(e: any, t: any, s: any, i: any, r: any, n: any): d;
    static mergeLocalWithDisk(e: any, t: any): void;
    constructor(e: any, t: any, s: any, i: any, r: any, n: any, h: any, o: any, l: any, f: any, u: any, p?: boolean);
    resource: any;
    b: any;
    f: any;
    g: any;
    h: any;
    j: any;
    k: any;
    l: any;
    m: any;
    n: any;
    o: any;
    q: boolean;
    a: boolean;
    z: boolean;
    _isDirectoryResolved: boolean;
    set isExcluded(e: any);
    get isExcluded(): any;
    hasChildren(e: any): any;
    get hasNests(): boolean;
    get isDirectoryResolved(): boolean;
    get isSymbolicLink(): boolean;
    get isDirectory(): boolean;
    get isReadonly(): any;
    get mtime(): any;
    get name(): any;
    get isUnknown(): boolean;
    get parent(): any;
    get root(): any;
    get children(): Map<any, any>;
    t(e: any): void;
    getId(): string;
    toString(): string;
    get isRoot(): boolean;
    addChild(e: any): void;
    getChild(e: any): any;
    fetchChildren(e: any): any;
    error: unknown;
    get v(): any;
    removeChild(e: any): void;
    forgetChildren(): void;
    w(e: any): any;
    move(e: any): void;
    x(e: any): void;
    rename(e: any): void;
    find(e: any): any;
    y(e: any, t: any, s: any): any;
    isMarkedAsFiltered(): boolean;
    markItemAndParentsAsFiltered(): void;
    unmarkItemAndChildren(): void;
}
declare class j extends d {
    constructor(e: any, t: any, s: any, i: any, r: any);
}
import { $ef as E } from "../../../../base/common/event.js";
export { K as $fIb, d as $gIb, j as $hIb };
//# sourceMappingURL=explorerModel.d.ts.map