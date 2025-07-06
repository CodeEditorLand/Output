declare function P(i: any, e: any): 0 | 1 | -1;
declare class m {
    static f(e: any, t: any): any;
    constructor(e: any, t: any);
    id: any;
    resource: any;
    c: S;
    e: number;
    path: any;
    name: any;
    get markers(): any[];
    d: any[] | undefined;
    has(e: any): boolean;
    set(e: any, t: any): void;
    delete(e: any): void;
    get total(): number;
}
declare class $ {
    constructor(e: any, t: any, s?: any[]);
    get resource(): any;
    get range(): any;
    get lines(): any;
    c: any;
    id: any;
    marker: any;
    relatedInformation: any[];
    toString(): string;
}
declare class Q extends $ {
    constructor(e: any, t: any, s: any, o: any, h: any);
    sourceMatches: any;
    codeMatches: any;
    messageMatches: any;
    fileMatches: any;
}
declare class z {
    constructor(e: any, t: any, s: any);
    id: any;
    marker: any;
    raw: any;
}
declare class U {
    get resourceMarkers(): any[];
    d: any[] | undefined;
    e: w;
    onDidChange: any;
    g: number;
    f: Map<any, any>;
    reset(): void;
    get total(): number;
    getResourceMarkers(e: any): any;
    setResourceMarkers(e: any): void;
    h(...e: any[]): string;
    dispose(): void;
}
import { $Ic as S } from "../../../../base/common/map.js";
import { $ef as w } from "../../../../base/common/event.js";
export { P as $kqc, m as $lqc, $ as $mqc, Q as $nqc, z as $oqc, U as $pqc };
//# sourceMappingURL=markersModel.d.ts.map