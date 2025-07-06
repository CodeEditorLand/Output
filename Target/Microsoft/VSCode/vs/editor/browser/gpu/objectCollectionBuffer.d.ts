export { m as $pcb };
declare function m(r: any, t: any): w;
declare class w extends c {
    constructor(t: any, i: any);
    get bufferUsedSize(): number;
    get viewUsedSize(): number;
    get entryCount(): number;
    get dirtyTracker(): g;
    propertySpecs: any;
    capacity: any;
    a: g;
    b: Map<any, any>;
    f: u;
    g: any;
    onDidChange: any;
    h: any;
    onDidChangeBuffer: any;
    view: Float32Array<ArrayBuffer>;
    buffer: ArrayBuffer;
    c: any;
    createEntry(t: any): d;
    j(): void;
}
import { $vd as c } from "../../../base/common/lifecycle.js";
import { $ocb as g } from "./bufferDirtyTracker.js";
import { $Gd as u } from "../../../base/common/linkedList.js";
declare class d extends c {
    constructor(t: any, i: any, s: any, e: any, h: any);
    c: any;
    f: any;
    g: any;
    i: any;
    a: any;
    onDidChange: any;
    b: any;
    onWillDispose: any;
    set(t: any, i: any): void;
    get(t: any): any;
    setRaw(t: any): void;
}
//# sourceMappingURL=objectCollectionBuffer.d.ts.map