declare class l {
    constructor(t: any, i: any, e: any);
    get debugName(): any;
    _debugNameData: any;
    _runFn: any;
    j: any;
    a: number;
    b: number;
    c: boolean;
    f: Set<any>;
    g: Set<any>;
    i: boolean;
    h: any;
    dispose(): void;
    k(): void;
    toString(): string;
    beginUpdate(t: any): void;
    endUpdate(t: any): void;
    handlePossibleChange(t: any): void;
    handleChange(t: any, i: any): void;
    l(t: any): boolean;
    m(): void;
    readObservable(t: any): any;
    get store(): d;
    n: d | undefined;
    get delayedStore(): d;
    p: d | undefined;
    debugGetState(): {
        isRunning: boolean;
        updateCount: number;
        dependencies: Set<any>;
        state: number;
    };
    debugRerun(): void;
}
declare var o: any;
import { DisposableStore as d } from "../commonFacade/deps.js";
export { l as $Vd, o as AutorunState };
//# sourceMappingURL=autorunImpl.d.ts.map