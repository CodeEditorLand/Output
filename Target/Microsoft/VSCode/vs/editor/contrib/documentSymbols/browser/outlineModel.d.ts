declare class d {
    static findId(e: any, t: any): string;
    static getElementById(e: any, t: any): any;
    static size(e: any): number;
    static empty(e: any): boolean;
    remove(): void;
}
declare class I extends d {
    constructor(e: any, t: any, r: any);
    id: any;
    parent: any;
    symbol: any;
    children: Map<any, any>;
}
declare class w extends d {
    constructor(e: any, t: any, r: any, n: any);
    id: any;
    parent: any;
    label: any;
    order: any;
    children: Map<any, any>;
    getItemEnclosingPosition(e: any): any;
    c(e: any, t: any): any;
    updateMarker(e: any): void;
    d(e: any, t: any): void;
}
declare class l extends d {
    static create(e: any, t: any, r: any): any;
    static c(e: any, t: any): void;
    static get(e: any): l | undefined;
    static g(e: any, t: any, r: any): void;
    constructor(e: any);
    uri: any;
    id: string;
    e: Map<any, any>;
    children: Map<any, any>;
    f(): this;
    merge(e: any): boolean;
    getItemEnclosingPosition(e: any, t: any): any;
    getItemById(e: any): any;
    updateMarker(e: any): void;
    getTopLevelSymbols(): any[];
    asListOfDocumentSymbols(): any[];
}
declare const F: any;
declare let y: {
    new (e: any, t: any, r: any): {
        f: any;
        c: T;
        e: B;
        d: any;
        dispose(): void;
        getOrCreate(e: any, t: any): Promise<any>;
        getDebounceValue(e: any): any;
        getCachedModels(): any;
    };
};
import { $ud as T } from "../../../../base/common/lifecycle.js";
import { $Lc as B } from "../../../../base/common/map.js";
export { d as $Apb, I as $Bpb, w as $Cpb, l as $Dpb, F as $Epb, y as $Fpb };
//# sourceMappingURL=outlineModel.d.ts.map