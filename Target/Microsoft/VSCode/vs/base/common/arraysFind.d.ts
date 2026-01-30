export class MonotonousArray {
    constructor(_array: any);
    _array: any;
    _findLastMonotonousLastIdx: number;
    /**
     * The predicate must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
     * For subsequent calls, current predicate must be weaker than (or equal to) the previous predicate, i.e. more entries must be `true`.
     */
    findLastMonotonous(predicate: any): any;
    _prevFindLastPredicate: any;
}
export function findFirst(array: any, predicate: any, fromIndex?: number): any;
export function findFirstIdx(array: any, predicate: any, fromIndex?: number): number;
export function findFirstIdxMonotonous(array: any, predicate: any, startIdx?: number, endIdxEx?: any): number;
export function findFirstIdxMonotonousOrArrLen(array: any, predicate: any, startIdx?: number, endIdxEx?: any): number;
export function findFirstMax(array: any, comparator: any): any;
export function findFirstMin(array: any, comparator: any): any;
export function findFirstMonotonous(array: any, predicate: any): any;
export function findLast(array: any, predicate: any, fromIndex?: number): any;
export function findLastIdx(array: any, predicate: any, fromIndex?: number): number;
export function findLastIdxMonotonous(array: any, predicate: any, startIdx?: number, endIdxEx?: any): number;
export function findLastMax(array: any, comparator: any): any;
export function findLastMonotonous(array: any, predicate: any): any;
export function findMaxIdx(array: any, comparator: any): number;
export function mapFindFirst(items: any, mapFn: any): any;
//# sourceMappingURL=arraysFind.d.ts.map