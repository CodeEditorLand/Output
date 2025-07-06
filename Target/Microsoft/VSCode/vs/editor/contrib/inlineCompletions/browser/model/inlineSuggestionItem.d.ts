declare class R {
    b: {
        readonly debugName: any;
        toString(): any;
        a: any;
        c: any;
        trigger(t: any, r: any): void;
        get(): void;
        f: Set<any>;
        addObserver(e: any): void;
        removeObserver(e: any): void;
        g(): void;
        h(): void;
        log(): /*elided*/ any;
        debugGetObservers(): Set<any>;
        readonly TChange: null;
        reportChanges(): void;
        read(e: any): any;
        map(e: any, t: any): any;
        flatten(): any;
        recomputeInitiallyAndOnChange(e: any, t: any): /*elided*/ any;
        keepObserved(e: any): /*elided*/ any;
        readonly b: any;
    };
    onDispose: {
        readonly debugName: any;
        toString(): any;
        a: any;
        c: any;
        trigger(t: any, r: any): void;
        get(): void;
        f: Set<any>;
        addObserver(e: any): void;
        removeObserver(e: any): void;
        g(): void;
        h(): void;
        log(): /*elided*/ any;
        debugGetObservers(): Set<any>;
        readonly TChange: null;
        reportChanges(): void;
        read(e: any): any;
        map(e: any, t: any): any;
        flatten(): any;
        recomputeInitiallyAndOnChange(e: any, t: any): /*elided*/ any;
        keepObserved(e: any): /*elided*/ any;
        readonly b: any;
    };
    d: number;
    id: string;
    addRef(): void;
    removeRef(): void;
}
declare class p extends A {
    static create(t: any, e: any): p;
    constructor(t: any, e: any, n: any, i: any, r: any, o: any, h: any, g: any, a: any);
    d: any;
    e: any;
    f: any;
    g: any;
    snippetInfo: any;
    additionalTextEdits: any;
    isInlineEdit: boolean;
    getSingleTextEdit(): any;
    withIdentity(t: any): p;
    withEdit(t: any, e: any): p | undefined;
    canBeReused(t: any, e: any): any;
    isVisible(t: any, e: any): any;
}
declare function z(s: any, t: any, e: any, n: any): any;
declare class m extends A {
    static create(t: any, e: any): m;
    constructor(t: any, e: any, n: any, i: any, r: any, o: any, h: boolean | undefined, g: any);
    d: any;
    e: any;
    f: any;
    g: boolean;
    h: any;
    additionalTextEdits: any[];
    isInlineEdit: boolean;
    get updatedEditModelVersion(): any;
    get updatedEdit(): any;
    getSingleTextEdit(): any;
    withIdentity(t: any): m;
    canBeReused(t: any, e: any): boolean;
    withEdit(t: any, e: any): m | undefined;
    j(t: any, e: any, n: any): m | undefined;
}
declare var L: any;
declare class A {
    constructor(t: any, e: any, n: any);
    a: any;
    identity: any;
    displayLocation: any;
    get source(): any;
    get isFromExplicitRequest(): boolean;
    get forwardStable(): any;
    get editRange(): any;
    get targetRange(): any;
    get insertText(): any;
    get semanticId(): string;
    get action(): any;
    get command(): any;
    get warning(): any;
    get showInlineEditMenu(): boolean;
    get hash(): string;
    get shownCommand(): any;
    get requestUuid(): any;
    get b(): any;
    addRef(): void;
    removeRef(): void;
    reportInlineEditShown(t: any, e: any, n: any): void;
    reportPartialAccept(t: any, e: any): void;
    reportEndOfLife(t: any): void;
    setEndOfLifeReason(t: any): void;
    reportInlineEditError(t: any): void;
    getSourceCompletion(): any;
}
export { R as $hlb, p as $ilb, z as $jlb, m as $klb, L as InlineSuggestionItem };
//# sourceMappingURL=inlineSuggestionItem.d.ts.map