declare class zt {
    constructor(e: any);
    identifier: any;
}
declare class Yt {
    constructor(e: any);
    identifier: any;
}
declare function Zt(f: any): Promise<{
    resource: any;
    options: {
        selection: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number | undefined;
            endColumn: number | undefined;
        } | undefined;
    };
}[]>;
declare let _: {
    new (e: any, t: any, i: any, o: any, r: any, s: any, c: any, D: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        handleDrop(e: any, t: any, i: any, o: any, r: any): Promise<void>;
        j(e: any): Promise<boolean>;
    };
};
declare function $t(f: any, e: any, t: any, i: any): void;
declare class St {
    constructor(e: any, t: any);
    a: any;
    b: any;
    update(e: any): void;
    getData(): {
        type: any;
        id: any;
    };
}
declare class v {
    constructor(e: any);
    a: any;
    get id(): any;
}
declare class w {
    constructor(e: any);
    a: any;
    get id(): any;
}
declare class l extends K {
    static get INSTANCE(): any;
    b: et | undefined;
    c: any;
    f: any;
    g(e: any): St | undefined;
    h(e: any, t: any): void;
    registerTarget(e: any, t: any): any;
    registerDraggable(e: any, t: any, i: any): any;
}
declare function te(f: any, e: any, t: any): void;
declare let N: {
    new (e: any, t: any): {
        a: any;
        b: any;
        getDragURI(e: any): any;
        getDragLabel(e: any): any;
        onDragStart(e: any, t: any): void;
        c(e: any, t: any): void;
        onDragOver(e: any, t: any, i: any, o: any, r: any): boolean;
        drop(e: any, t: any, i: any, o: any, r: any): void;
        dispose(): void;
    };
};
declare function re(): boolean;
import { $vd as K } from "../../base/common/lifecycle.js";
import { $phb as et } from "../../platform/dnd/browser/dnd.js";
export { zt as $mxb, Yt as $nxb, Zt as $oxb, _ as $pxb, $t as $qxb, St as $rxb, v as $sxb, w as $txb, l as $uxb, te as $vxb, N as $wxb, re as $xxb };
//# sourceMappingURL=dnd.d.ts.map