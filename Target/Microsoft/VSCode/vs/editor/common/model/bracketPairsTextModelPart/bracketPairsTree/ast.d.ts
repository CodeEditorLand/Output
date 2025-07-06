declare class d extends p {
    static create(t: any, e: any, n: any): d;
    constructor(t: any, e: any, n: any, i: any, s: any);
    get kind(): number;
    get listHeight(): number;
    get childrenLength(): number;
    getChild(t: any): any;
    get children(): any[];
    openingBracket: any;
    child: any;
    closingBracket: any;
    missingOpeningBracketIds: any;
    canBeReused(t: any): boolean;
    flattenLists(): d;
    deepClone(): d;
    computeMinIndentation(t: any, e: any): any;
}
declare class u extends p {
    static create23(t: any, e: any, n: any, i?: boolean): a;
    static create(t: any, e?: boolean): any;
    static getEmpty(): C;
    constructor(t: any, e: any, n: any);
    get kind(): number;
    get missingOpeningBracketIds(): any;
    listHeight: any;
    d: any;
    b: number;
    e(): void;
    makeLastElementMutable(): any;
    makeFirstElementMutable(): any;
    canBeReused(t: any): any;
    handleChildrenChanged(): void;
    flattenLists(): any;
    computeMinIndentation(t: any, e: any): number;
}
declare class y extends f {
    get kind(): number;
    get missingOpeningBracketIds(): any;
    canBeReused(t: any): boolean;
    computeMinIndentation(t: any, e: any): number;
}
declare class I extends f {
    static create(t: any, e: any, n: any): I;
    constructor(t: any, e: any, n: any);
    get kind(): number;
    get missingOpeningBracketIds(): any;
    bracketInfo: any;
    bracketIds: any;
    get text(): any;
    get languageId(): any;
    canBeReused(t: any): boolean;
    computeMinIndentation(t: any, e: any): number;
}
declare class S extends f {
    constructor(t: any, e: any);
    get kind(): number;
    missingOpeningBracketIds: any;
    canBeReused(t: any): boolean;
    computeMinIndentation(t: any, e: any): number;
}
declare var m: any;
declare class p {
    constructor(t: any);
    get length(): any;
    a: any;
}
declare class a extends u {
    constructor(t: any, e: any, n: any, i: any, s: any, h: any);
    get childrenLength(): 2 | 3;
    getChild(t: any): any;
    f(t: any, e: any): void;
    h: any;
    j: any;
    k: any;
    get children(): any[];
    get item1(): any;
    get item2(): any;
    get item3(): any;
    deepClone(): a;
    appendChildOfSameHeight(t: any): void;
    unappendChild(): any;
    prependChildOfSameHeight(t: any): void;
    unprependChild(): any;
    toMutable(): this;
}
declare class C extends c {
}
declare class f extends p {
    get listHeight(): number;
    get childrenLength(): number;
    getChild(t: any): null;
    get children(): any[];
    flattenLists(): this;
    deepClone(): this;
}
declare class c extends u {
    constructor(t: any, e: any, n: any, i: any);
    get childrenLength(): any;
    getChild(t: any): any;
    f(t: any, e: any): void;
    get children(): any;
    h: any;
    deepClone(): c;
    appendChildOfSameHeight(t: any): void;
    unappendChild(): any;
    prependChildOfSameHeight(t: any): void;
    unprependChild(): any;
    toMutable(): this;
}
export { d as $EE, u as $FE, y as $GE, I as $HE, S as $IE, m as AstNodeKind };
//# sourceMappingURL=ast.d.ts.map