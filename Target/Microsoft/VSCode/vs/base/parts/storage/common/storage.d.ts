declare class C {
    onDidChangeItemsExternal: any;
    a: Map<any, any>;
    getItems(): Promise<Map<any, any>>;
    updateItems(t: any): Promise<void>;
    optimize(): Promise<void>;
    close(): Promise<void>;
}
declare function z(i: any): boolean;
declare class c extends l {
    constructor(t: any, e?: any);
    r: any;
    s: any;
    b: any;
    onDidChangeStorage: any;
    c: any;
    f: Map<any, any>;
    g: any;
    h: Set<any>;
    j: Map<any, any>;
    n: any[];
    t(): void;
    u(t: any): void;
    w(t: any, e: any): void;
    get items(): Map<any, any>;
    get size(): number;
    init(): Promise<void>;
    get(t: any, e: any): any;
    getBoolean(t: any, e: any): any;
    getNumber(t: any, e: any): any;
    getObject(t: any, e: any): any;
    set(t: any, e: any, s?: boolean): Promise<any>;
    delete(t: any, e?: boolean): Promise<any>;
    optimize(): Promise<any>;
    close(): Promise<void>;
    m: Promise<void> | undefined;
    y(): Promise<void>;
    get z(): boolean;
    C(): Promise<any>;
    flush(t: any): Promise<any>;
    D(t: any): Promise<any>;
    whenFlushed(): Promise<any>;
    isInMemory(): boolean;
}
declare var h: any;
declare var r: any;
import { $vd as l } from "../../../common/lifecycle.js";
export { C as $Ao, z as $yo, c as $zo, h as StorageHint, r as StorageState };
//# sourceMappingURL=storage.d.ts.map