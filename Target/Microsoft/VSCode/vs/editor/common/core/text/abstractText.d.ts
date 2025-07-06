declare class u {
    get endPositionExclusive(): any;
    get lineRange(): any;
    getValue(): any;
    getLineLength(t: any): any;
    getTransformer(): i;
    a: i | undefined;
    getLineAt(t: any): any;
    getLines(): any;
    getLinesOfRange(t: any): any;
    equals(t: any): boolean;
}
declare class l extends u {
    constructor(t: any, e: any);
    b: any;
    c: any;
    getValueOfRange(t: any): any;
    get length(): a;
}
declare class p extends l {
    constructor(t: any);
}
declare class R extends u {
    constructor(t: any);
    value: any;
    b: i;
    getValueOfRange(t: any): any;
    get length(): any;
}
import { $aF as i } from "./positionToOffsetImpl.js";
import { $UD as a } from "../text/textLength.js";
export { u as $bF, l as $cF, p as $dF, R as $eF };
//# sourceMappingURL=abstractText.d.ts.map