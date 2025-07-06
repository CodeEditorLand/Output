declare class $ {
    constructor(s: any, t?: null);
    test: any;
    parent: any;
    e: d;
    onChange: any;
    children: Set<any>;
    treeId: string;
    retired: boolean;
    state: number;
    depth: any;
    toJSON(): {
        $mid: number;
        tests: any[];
    } | {
        controllerId: any;
    };
}
declare class p {
    constructor(s: any, t: any);
    get description(): any;
    message: any;
    parent: any;
    treeId: string;
    children: Set<any>;
}
declare namespace O {
    function getId(r: any): string;
}
declare function h(r: any, s: any, t: any): any;
import { $ef as d } from "../../../../../base/common/event.js";
export { $ as $Omc, p as $Pmc, O as $Qmc, h as $Rmc };
//# sourceMappingURL=index.d.ts.map