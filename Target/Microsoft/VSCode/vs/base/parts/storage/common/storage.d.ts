export class InMemoryStorageDatabase {
    onDidChangeItemsExternal: any;
    items: Map<any, any>;
    getItems(): Promise<Map<any, any>>;
    updateItems(request: any): Promise<void>;
    optimize(): Promise<void>;
    close(): Promise<void>;
}
export class Storage extends Disposable {
    constructor(database: any, options?: any);
    database: any;
    options: any;
    _onDidChangeStorage: any;
    onDidChangeStorage: any;
    state: any;
    cache: Map<any, any>;
    flushDelayer: any;
    pendingDeletes: Set<any>;
    pendingInserts: Map<any, any>;
    whenFlushedCallbacks: any[];
    registerListeners(): void;
    onDidChangeItemsExternal(e: any): void;
    acceptExternal(key: any, value: any): void;
    get items(): Map<any, any>;
    get size(): number;
    init(): Promise<void>;
    get(key: any, fallbackValue: any): any;
    getBoolean(key: any, fallbackValue: any): any;
    getNumber(key: any, fallbackValue: any): any;
    getObject(key: any, fallbackValue: any): any;
    set(key: any, value: any, external?: boolean): Promise<any>;
    delete(key: any, external?: boolean): Promise<any>;
    optimize(): Promise<any>;
    close(): Promise<void>;
    pendingClose: Promise<void> | undefined;
    doClose(): Promise<void>;
    get hasPending(): boolean;
    flushPending(): Promise<any>;
    flush(delay: any): Promise<any>;
    doFlush(delay: any): Promise<any>;
    whenFlushed(): Promise<any>;
    isInMemory(): boolean;
}
export var StorageHint: any;
export var StorageState: any;
export function isStorageItemsChangeEvent(thing: any): boolean;
import { Disposable } from "../../../common/lifecycle.js";
//# sourceMappingURL=storage.d.ts.map