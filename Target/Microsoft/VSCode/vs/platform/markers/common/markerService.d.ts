declare const F: Set<any>;
declare class u {
    static e(e: any, t: any, s: any): {
        resource: any;
        owner: any;
        code: any;
        severity: any;
        message: any;
        source: any;
        startLineNumber: any;
        startColumn: any;
        endLineNumber: any;
        endColumn: any;
        relatedInformation: any;
        tags: any;
        origin: any;
    } | undefined;
    static g(e: any, t: any): boolean;
    static h(e: any): any[];
    a: C;
    onMarkerChanged: any;
    b: L;
    c: N;
    d: d;
    dispose(): void;
    getStatistics(): N;
    remove(e: any, t: any): void;
    changeOne(e: any, t: any, s: any): void;
    installResourceFilter(e: any, t: any): any;
    changeAll(e: any, t: any): void;
    f(e: any, t: any): {
        owner: string;
        resource: any;
        severity: any;
        message: any;
        startLineNumber: number;
        startColumn: number;
        endLineNumber: number;
        endColumn: number;
    };
    read(e?: any): any[];
}
import { $if as C } from "../../../base/common/event.js";
declare class L {
    a: d;
    b: Map<any, any>;
    set(e: any, t: any, s: any): void;
    get(e: any, t: any): any;
    delete(e: any, t: any): boolean;
    values(e: any): any;
}
declare class N {
    constructor(e: any);
    errors: number;
    infos: number;
    warnings: number;
    unknowns: number;
    a: d;
    b: any;
    c: any;
    dispose(): void;
    d(e: any): void;
    e(e: any): {
        errors: number;
        warnings: number;
        infos: number;
        unknowns: number;
    };
    f(e: any): void;
    g(e: any): void;
}
import { $Ic as d } from "../../../base/common/map.js";
export { F as $H8b, u as $I8b };
//# sourceMappingURL=markerService.d.ts.map