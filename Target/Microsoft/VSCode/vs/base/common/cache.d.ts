export class Cache {
    constructor(task: any);
    task: any;
    result: any;
    get(): any;
}
export class CachedFunction {
    constructor(arg1: any, arg2: any);
    get cachedValues(): Map<any, any>;
    _map: Map<any, any>;
    _map2: Map<any, any>;
    _fn: any;
    _computeKey: any;
    get(arg: any): any;
}
export class LRUCachedFunction {
    constructor(arg1: any, arg2: any);
    _fn: any;
    _computeKey: any;
    get(arg: any): any;
    lastArgKey: any;
    lastCache: any;
}
export class WeakCachedFunction {
    constructor(arg1: any, arg2: any);
    _map: WeakMap<WeakKey, any>;
    _fn: any;
    _computeKey: any;
    get(arg: any): any;
}
export function identity(t: any): any;
//# sourceMappingURL=cache.d.ts.map