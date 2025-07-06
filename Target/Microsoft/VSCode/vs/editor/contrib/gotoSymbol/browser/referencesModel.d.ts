declare class D {
    constructor(r: any, n: any, t: any, e: any);
    isProviderFirst: any;
    parent: any;
    link: any;
    d: any;
    id: any;
    get uri(): any;
    set range(r: any);
    get range(): any;
    c: any;
    get ariaMessage(): any;
}
declare class L {
    constructor(r: any);
    c: any;
    dispose(): void;
    preview(r: any, n?: number): {
        value: any;
        highlight: {
            start: any;
            end: any;
        };
    } | undefined;
}
declare class M {
    constructor(r: any, n: any);
    parent: any;
    uri: any;
    children: any[];
    c: P;
    dispose(): void;
    getPreview(r: any): any;
    get ariaMessage(): any;
    resolve(r: any): Promise<this>;
}
declare class h {
    static e(r: any, n: any): number;
    constructor(r: any, n: any);
    groups: M[];
    references: D[];
    _onDidChangeReferenceRange: x;
    onDidChangeReferenceRange: any;
    c: any;
    d: any;
    dispose(): void;
    clone(): h;
    get title(): any;
    get isEmpty(): boolean;
    get ariaMessage(): any;
    nextOrPreviousReference(r: any, n: any): any;
    nearestReference(r: any, n: any): D | undefined;
    referenceAt(r: any, n: any): D | undefined;
    firstReference(): D | undefined;
}
import { $Ic as P } from "../../../../base/common/map.js";
import { $ef as x } from "../../../../base/common/event.js";
export { D as $gnb, L as $hnb, M as $inb, h as $jnb };
//# sourceMappingURL=referencesModel.d.ts.map