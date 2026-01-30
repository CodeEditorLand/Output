export class ConfigKeysIterator {
    constructor(_caseSensitive?: boolean);
    _caseSensitive: boolean;
    reset(key: any): this;
    _value: any;
    _from: number | undefined;
    _to: number | undefined;
    hasNext(): boolean;
    next(): this;
    cmp(a: any): number;
    value(): any;
}
export class PathIterator {
    constructor(_splitOnBackslash?: boolean, _caseSensitive?: boolean);
    _splitOnBackslash: boolean;
    _caseSensitive: boolean;
    reset(key: any): this;
    _from: number | undefined;
    _to: number | undefined;
    _value: any;
    _valueLen: any;
    hasNext(): boolean;
    next(): this;
    cmp(a: any): number;
    value(): any;
}
export class StringIterator {
    _value: string;
    _pos: number;
    reset(key: any): this;
    next(): this;
    hasNext(): boolean;
    cmp(a: any): number;
    value(): string | undefined;
}
export class TernarySearchTree {
    static forUris(ignorePathCasing?: () => boolean, ignoreQueryAndFragment?: () => boolean): TernarySearchTree;
    static forPaths(ignorePathCasing?: boolean): TernarySearchTree;
    static forStrings(): TernarySearchTree;
    static forConfigKeys(): TernarySearchTree;
    constructor(segments: any);
    _iter: any;
    clear(): void;
    fill(values: any, keys: any): void;
    set(key: any, element: any): any;
    _root: any;
    get(key: any): any;
    _getNode(key: any): any;
    has(key: any): boolean;
    delete(key: any): void;
    deleteSuperstr(key: any): void;
    _delete(key: any, superStr: any): void;
    _min(node: any, stack: any): any;
    _balanceByStack(stack: any): any;
    findSubstr(key: any): any;
    findSuperstr(key: any): any;
    _findSuperstrOrElement(key: any, allowValue: any): any;
    hasElementOrSubtree(key: any): boolean;
    forEach(callback: any): void;
    _entries(node: any): ArrayIterator<any>;
    _dfsEntries(node: any, bucket: any): void;
    _isBalanced(): any;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
export class UriIterator {
    constructor(_ignorePathCasing: any, _ignoreQueryAndFragment: any);
    _ignorePathCasing: any;
    _ignoreQueryAndFragment: any;
    _states: any[];
    _stateIdx: number;
    reset(key: any): this;
    _value: any;
    _pathIterator: PathIterator | undefined;
    next(): this;
    hasNext(): boolean;
    cmp(a: any): number;
    value(): any;
}
//# sourceMappingURL=ternarySearchTree.d.ts.map