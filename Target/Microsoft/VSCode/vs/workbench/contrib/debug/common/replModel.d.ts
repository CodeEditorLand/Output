declare class w {
    constructor(t: any, e: any, s: any, i: any);
    b: any;
    expression: any;
    severity: any;
    sourceData: any;
    a: string;
    hasChildren: any;
    getSession(): any;
    getChildren(): any;
    toString(): any;
    getId(): string;
}
declare class l {
    constructor(t: any, e: any, s: any, i: any, n: any);
    b: any;
    name: any;
    valueObj: any;
    sourceData: any;
    annotation: any;
    getId(): any;
    getSession(): void;
    get value(): string;
    get hasChildren(): boolean;
    evaluateLazy(): void;
    getChildren(): Promise<any[]>;
    toString(): string;
}
declare class S {
    constructor(t: any);
    value: any;
    a: string;
    toString(): any;
    getId(): string;
}
declare class $ extends j {
    constructor(t: any);
    get available(): boolean;
    originalExpression: any;
    t: boolean;
    evaluateExpression(t: any, e: any, s: any, i: any): Promise<boolean>;
}
declare class h {
    constructor(t: any, e: any, s: any, i: any);
    session: any;
    name: any;
    autoExpand: any;
    sourceData: any;
    a: any[];
    c: boolean;
    b: string;
    get hasChildren(): boolean;
    getId(): string;
    toString(t?: boolean): string;
    addChild(t: any): void;
    getChildren(): any[];
    end(): void;
    get hasEnded(): boolean;
}
declare class m {
    constructor(t: any);
    c: any;
    a: any[];
    b: f;
    onDidChangeElements: any;
    getReplElements(): any[];
    addReplExpression(t: any, e: any, s: any): Promise<void>;
    appendToRepl(t: any, { output: e, expression: s, sev: i, source: n }: {
        output: any;
        expression: any;
        sev: any;
        source: any;
    }): void;
    startGroup(t: any, e: any, s: any, i: any): void;
    endGroup(): void;
    d(t: any): void;
    removeReplExpressions(): void;
    clone(): m;
}
declare class o {
    constructor(t: any, e: any, s: any, i: any, n: any, u: any);
    session: any;
    c: any;
    value: any;
    severity: any;
    sourceData: any;
    expression: any;
    a: number;
    b: f;
    toString(t?: boolean): string;
    getId(): any;
    getChildren(): any;
    set count(t: number);
    get count(): number;
    get onDidChangeCount(): any;
    get hasChildren(): boolean;
}
import { $ZT as j } from "./debugModel.js";
import { $ef as f } from "../../../../base/common/event.js";
export { w as $A_b, l as $B_b, S as $C_b, $ as $D_b, h as $E_b, m as $F_b, o as $z_b };
//# sourceMappingURL=replModel.d.ts.map