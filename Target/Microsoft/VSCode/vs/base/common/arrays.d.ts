export class ArrayQueue {
    /**
     * Constructs a queue that is backed by the given array. Runtime is O(1).
    */
    constructor(items: any);
    firstIdx: number;
    items: any;
    lastIdx: number;
    get length(): number;
    /**
     * Consumes elements from the beginning of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned. Has a runtime of O(result.length).
    */
    takeWhile(predicate: any): any;
    /**
     * Consumes elements from the end of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned.
     * The result has the same order as the underlying array!
    */
    takeFromEndWhile(predicate: any): any;
    peek(): any;
    peekLast(): any;
    dequeue(): any;
    removeLast(): any;
    takeCount(count: any): any;
}
export class CallbackIterable {
    constructor(iterate: any);
    iterate: any;
    forEach(handler: any): void;
    toArray(): any[];
    filter(predicate: any): CallbackIterable;
    map(mapFn: any): CallbackIterable;
    some(predicate: any): boolean;
    findFirst(predicate: any): undefined;
    findLast(predicate: any): undefined;
    findLastMaxBy(comparator: any): undefined;
}
export var CompareResult: any;
export class Permutation {
    /**
     * Returns a permutation that sorts the given array according to the given compare function.
     */
    static createSortPermutation(arr: any, compareFn: any): Permutation;
    constructor(_indexMap: any);
    _indexMap: any;
    /**
     * Returns a new array with the elements of the given array re-arranged according to this permutation.
     */
    apply(arr: any): any;
    /**
     * Returns a new permutation that undoes the re-arrangement of this permutation.
    */
    inverse(): Permutation;
}
export function arrayInsert(target: any, insertIndex: any, insertArr: any): any;
export function asArray(x: any): any[];
export function binarySearch(array: any, key: any, comparator: any): number;
export function binarySearch2(length: any, compareToKey: any): number;
export const booleanComparator: any;
export function coalesce(array: any): any;
export function coalesceInPlace(array: any): void;
export function commonPrefixLength(one: any, other: any, equals2?: (a: any, b: any) => boolean): number;
export function compareBy(selector: any, comparator: any): (a: any, b: any) => any;
export function compareUndefinedSmallest(comparator: any): (a: any, b: any) => any;
export function concatArrays(...arrays: any[]): never[];
export function delta(before: any, after: any, compare: any): {
    removed: any[];
    added: any[];
};
export function distinct(array: any, keyFn?: (value: any) => any): any;
export function equals(one: any, other: any, itemEquals?: (a: any, b: any) => boolean): boolean;
export function findAsync(array: any, predicate: any): Promise<any>;
export function forEachAdjacent(arr: any, f: any): void;
export function forEachWithNeighbors(arr: any, f: any): void;
export function getRandomElement(arr: any): any;
export function groupAdjacentBy(items: any, shouldBeGrouped: any): Generator<any[], void, unknown>;
export function groupBy(data: any, compare: any): undefined[];
export function index(array: any, indexer: any, mapper: any): any;
export function insert(array: any, element: any): () => any;
export function insertInto(array: any, start: any, newItems: any): void;
export function isFalsyOrEmpty(obj: any): boolean;
export function isNonEmptyArray(obj: any): boolean;
export function mapArrayOrNot(items: any, fn: any): any;
export function mapFilter(array: any, fn: any): any[];
export function move(array: any, from: any, to: any): void;
export const numberComparator: any;
export function pushMany(arr: any, items: any): void;
export function pushToEnd(arr: any, value: any): void;
export function pushToStart(arr: any, value: any): void;
export function quickSelect(nth: any, data: any, compare: any): any;
export function range(arg: any, to: any): any[];
export function remove(array: any, element: any): any;
export function removeFastWithoutKeepingOrder(array: any, index2: any): void;
export function reverseOrder(comparator: any): (a: any, b: any) => number;
export function shuffle(array: any, _seed: any): void;
export function sortedDiff(before: any, after: any, compare: any): any[];
export function splice(array: any, start: any, deleteCount: any, newItems: any): any;
export function sum(array: any): any;
export function sumBy(array: any, selector: any): any;
export function tail(arr: any): any[];
export function tieBreakComparators(...comparators: any[]): (item1: any, item2: any) => any;
export function top(array: any, compare: any, n: any): any;
export function topAsync(array: any, compare: any, n: any, batch: any, token: any): Promise<any>;
export function uniqueFilter(keyFn: any): (element: any) => boolean;
export function withoutDuplicates(array: any): any[];
//# sourceMappingURL=arrays.d.ts.map