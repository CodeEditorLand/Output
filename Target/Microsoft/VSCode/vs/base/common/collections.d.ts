export class SetWithKey {
    constructor(values: any, toKey: any);
    toKey: any;
    _map: Map<any, any>;
    get size(): number;
    add(value: any): this;
    delete(value: any): boolean;
    has(value: any): boolean;
    entries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    clear(): void;
    forEach(callbackfn: any, thisArg: any): void;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
export function diffMaps(before: any, after: any): {
    removed: any[];
    added: any[];
};
export function diffSets(before: any, after: any): {
    removed: any[];
    added: any[];
};
export function groupBy(data: any, groupFn: any): any;
export function groupByMap(data: any, groupFn: any): Map<any, any>;
export function intersection(setA: any, setB: any): Set<any>;
//# sourceMappingURL=collections.d.ts.map