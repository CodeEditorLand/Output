export class BidirectionalMap {
    constructor(entries: any);
    _m1: Map<any, any>;
    _m2: Map<any, any>;
    clear(): void;
    set(key: any, value: any): void;
    get(key: any): any;
    getKey(value: any): any;
    delete(key: any): boolean;
    forEach(callbackfn: any, thisArg: any): void;
    keys(): MapIterator<any>;
    values(): MapIterator<any>;
}
export class CounterSet {
    map: Map<any, any>;
    add(value: any): this;
    delete(value: any): boolean;
    has(value: any): boolean;
}
export class LRUCache extends Cache {
    trim(newSize: any): void;
    set(key: any, value: any): this;
}
export class LinkedMap {
    _map: Map<any, any>;
    _size: number;
    _state: number;
    clear(): void;
    isEmpty(): boolean;
    get size(): number;
    get first(): any;
    get last(): any;
    has(key: any): boolean;
    get(key: any, touch?: number): any;
    set(key: any, value: any, touch?: number): this;
    delete(key: any): boolean;
    remove(key: any): any;
    shift(): any;
    forEach(callbackfn: any, thisArg: any): void;
    keys(): {
        [Symbol.iterator](): /*elided*/ any;
        next(): {
            value: any;
            done: boolean;
        };
    };
    values(): {
        [Symbol.iterator](): /*elided*/ any;
        next(): {
            value: any;
            done: boolean;
        };
    };
    entries(): {
        [Symbol.iterator](): /*elided*/ any;
        next(): {
            value: any[];
            done: boolean;
        } | {
            value: undefined;
            done: boolean;
        };
    };
    trimOld(newSize: any): void;
    _head: any;
    trimNew(newSize: any): void;
    _tail: any;
    addItemFirst(item: any): void;
    addItemLast(item: any): void;
    removeItem(item: any): void;
    touch(item: any, touch: any): void;
    toJSON(): any[];
    fromJSON(data: any): void;
}
export class MRUCache extends Cache {
    trim(newSize: any): void;
    set(key: any, value: any): this;
}
export class NKeyMap {
    _data: Map<any, any>;
    /**
     * Sets a value on the map. Note that unlike a standard `Map`, the first argument is the value.
     * This is because the spread operator is used for the keys and must be last..
     * @param value The value to set.
     * @param keys The keys for the value.
     */
    set(value: any, ...keys: any[]): void;
    get(...keys: any[]): any;
    clear(): void;
    values(): Generator<any, void, any>;
    /**
     * Get a textual representation of the map for debugging purposes.
     */
    toString(): any;
}
export class ResourceMap {
    constructor(arg: any, toKey: any);
    map: Map<any, any>;
    toKey: any;
    set(resource: any, value: any): this;
    get(resource: any): any;
    has(resource: any): boolean;
    get size(): number;
    clear(): void;
    delete(resource: any): boolean;
    forEach(clb: any, thisArg: any): void;
    values(): Generator<any, void, unknown>;
    keys(): Generator<any, void, unknown>;
    entries(): Generator<any[], void, unknown>;
}
export class ResourceSet {
    constructor(entriesOrKey: any, toKey: any);
    _map: ResourceMap;
    get size(): number;
    add(value: any): this;
    clear(): void;
    delete(value: any): boolean;
    forEach(callbackfn: any, thisArg: any): void;
    has(value: any): boolean;
    entries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
}
export class SetMap {
    map: Map<any, any>;
    add(key: any, value: any): void;
    delete(key: any, value: any): void;
    forEach(key: any, fn: any): void;
    get(key: any): any;
}
export var Touch: any;
export function getOrSet(map: any, key: any, value: any): any;
export function mapToString(map: any): string;
export function mapsStrictEqualIgnoreOrder(a: any, b: any): boolean;
export function setToString(set: any): string;
declare class Cache extends LinkedMap {
    constructor(limit: any, ratio?: number);
    _limit: any;
    _ratio: number;
    set limit(limit: any);
    get limit(): any;
    set ratio(ratio: number);
    get ratio(): number;
    peek(key: any): any;
    set(key: any, value: any): this;
    checkTrim(): void;
}
export {};
//# sourceMappingURL=map.d.ts.map