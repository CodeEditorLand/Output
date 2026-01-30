export class AsyncReferenceCollection {
    constructor(referenceCollection: any);
    referenceCollection: any;
    acquire(key: any, ...args: any[]): Promise<{
        object: any;
        dispose: any;
    }>;
}
export class Disposable {
    _store: DisposableStore;
    dispose(): void;
    /**
     * Adds `o` to the collection of disposables managed by this object.
     */
    _register(o: any): any;
}
export class DisposableMap {
    constructor(store?: Map<any, any>);
    _isDisposed: boolean;
    _store: Map<any, any>;
    /**
     * Disposes of all stored values and mark this object as disposed.
     *
     * Trying to use this object after it has been disposed of is an error.
     */
    dispose(): void;
    /**
     * Disposes of all stored values and clear the map, but DO NOT mark this object as disposed.
     */
    clearAndDisposeAll(): void;
    has(key: any): boolean;
    get size(): number;
    get(key: any): any;
    set(key: any, value: any, skipDisposeOnOverwrite?: boolean): void;
    /**
     * Delete the value stored for `key` from this map and also dispose of it.
     */
    deleteAndDispose(key: any): void;
    /**
     * Delete the value stored for `key` from this map but return it. The caller is
     * responsible for disposing of the value.
     */
    deleteAndLeak(key: any): any;
    keys(): MapIterator<any>;
    values(): MapIterator<any>;
    [Symbol.iterator](): MapIterator<[any, any]>;
}
export class DisposableResourceMap extends DisposableMap {
    constructor();
}
export class DisposableStore {
    _toDispose: Set<any>;
    _isDisposed: boolean;
    /**
     * Dispose of all registered disposables and mark this object as disposed.
     *
     * Any future disposables added to this object will be disposed of on `add`.
     */
    dispose(): void;
    /**
     * @return `true` if this object has been disposed of.
     */
    get isDisposed(): boolean;
    /**
     * Dispose of all registered disposables but do not mark this object as disposed.
     */
    clear(): void;
    /**
     * Add a new {@link IDisposable disposable} to the collection.
     */
    add(o: any): any;
    /**
     * Deletes a disposable from store and disposes of it. This will not throw or warn and proceed to dispose the
     * disposable even when the disposable is not part in the store.
     */
    delete(o: any): void;
    /**
     * Deletes the value from the store, but does not dispose it.
     */
    deleteAndLeak(o: any): void;
    assertNotDisposed(): void;
}
export class DisposableTracker {
    livingDisposables: Map<any, any>;
    getDisposableData(d: any): any;
    trackDisposable(d: any): void;
    setParent(child: any, parent: any): void;
    markAsDisposed(x: any): void;
    markAsSingleton(disposable: any): void;
    getRootParent(data: any, cache: any): any;
    getTrackedDisposables(): any[];
    computeLeakingDisposables(maxReported: number | undefined, preComputedLeaks: any): {
        leaks: any;
        details: string;
    } | undefined;
}
export class GCBasedDisposableTracker {
    _registry: FinalizationRegistry<any>;
    trackDisposable(disposable: any): void;
    setParent(child: any, parent: any): void;
    markAsDisposed(disposable: any): void;
    markAsSingleton(disposable: any): void;
}
export class ImmortalReference {
    constructor(object: any);
    object: any;
    dispose(): void;
}
export class MandatoryMutableDisposable {
    constructor(initialValue: any);
    _disposable: MutableDisposable;
    _isDisposed: boolean;
    set value(value: any);
    get value(): any;
    dispose(): void;
}
export class MutableDisposable {
    _isDisposed: boolean;
    /**
     * Set a new disposable value.
     *
     * Behaviour:
     * - If the MutableDisposable has been disposed, the setter is a no-op.
     * - If the new value is strictly equal to the current value, the setter is a no-op.
     * - Otherwise the previous value (if any) is disposed and the new value is stored.
     *
     * Related helpers:
     * - clear() resets the value to `undefined` (and disposes the previous value).
     * - clearAndLeak() returns the old value without disposing it and removes its parent.
     */
    set value(value: any);
    /**
     * Get the currently held disposable value, or `undefined` if this MutableDisposable has been disposed
     */
    get value(): any;
    _value: any;
    /**
     * Resets the stored value and disposed of the previously stored value.
     */
    clear(): void;
    dispose(): void;
    /**
     * Clears the value, but does not dispose it.
     * The old value is returned.
    */
    clearAndLeak(): any;
}
export class RefCountedDisposable {
    constructor(_disposable: any);
    _disposable: any;
    _counter: number;
    acquire(): this;
    release(): this;
}
export class ReferenceCollection {
    references: Map<any, any>;
    acquire(key: any, ...args: any[]): {
        object: any;
        dispose: (...args: any[]) => any;
    };
}
export function combinedDisposable(...disposables: any[]): FunctionDisposable;
export function dispose(arg: any): any;
export function disposeIfDisposable(disposables: any): never[];
export function disposeOnReturn(fn: any): void;
export function isDisposable(thing: any): boolean;
export function markAsDisposed(disposable: any): void;
export function markAsSingleton(singleton: any): any;
export function setDisposableTracker(tracker: any): void;
export function thenIfNotDisposed(promise: any, then: any): FunctionDisposable;
export function thenRegisterOrDispose(promise: any, store: any): any;
export function toDisposable(fn: any): FunctionDisposable;
export function trackDisposable(x: any): any;
declare class FunctionDisposable {
    constructor(fn: any);
    _isDisposed: boolean;
    _fn: any;
    dispose(): void;
}
export {};
//# sourceMappingURL=lifecycle.d.ts.map