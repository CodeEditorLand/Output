declare class r {
    static join(t: any): any;
    constructor(t: any, n: any);
    inputRange: any;
    outputRange: any;
    extendInputRange(t: any): r;
    join(t: any): r;
    get resultingDeltaFromOriginalToModified(): number;
    toString(): string;
    addOutputLineDelta(t: any): r;
    addInputLineDelta(t: any): r;
    reverse(): r;
}
declare class d {
    static betweenOutputs(t: any, n: any, e: any): d;
    constructor(t: any, n: any);
    lineRangeMappings: any;
    inputLineCount: any;
    project(t: any): any;
    get outputLineCount(): any;
    reverse(): d;
}
declare class m {
    static compute(t: any, n: any): any[];
    constructor(t: any, n: any, e: any, u: any, s: any);
    inputRange: any;
    output1Range: any;
    output1LineMappings: any;
    output2Range: any;
    output2LineMappings: any;
    toString(): string;
}
declare class c extends r {
    constructor(t: any, n: any, e: any, u: any, s: any);
    inputTextModel: any;
    outputTextModel: any;
    rangeMappings: any;
    addOutputLineDelta(t: any): c;
    addInputLineDelta(t: any): c;
    join(t: any): c;
    getLineEdit(): w;
    getReverseLineEdit(): w;
    a(): any;
    b(): any;
}
declare class a {
    constructor(t: any, n: any);
    inputRange: any;
    outputRange: any;
    toString(): string;
    addOutputLineDelta(t: any): a;
    addInputLineDelta(t: any): a;
    reverse(): a;
}
declare class v {
    constructor(t: any, n: any);
    rangeMappings: any;
    inputLineCount: any;
    project(t: any): any;
    projectRange(t: any): a;
    get outputLineCount(): any;
    reverse(): v;
}
import { $GRb as w } from "./editing.js";
export { r as $ORb, d as $PRb, m as $QRb, c as $RRb, a as $SRb, v as $TRb };
//# sourceMappingURL=mapping.d.ts.map