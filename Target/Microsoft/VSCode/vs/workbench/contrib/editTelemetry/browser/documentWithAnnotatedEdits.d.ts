declare let x: {
    new (t: any, e: any): {
        g: any;
        h: any;
        b: any;
        f: Promise<void>;
        value: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        a: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        _restart(): Promise<void>;
        j(t: any): Promise<void>;
        waitForQueue(): Promise<void>;
        q: O;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class W extends p {
    constructor(t: any);
    a: any;
    value: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    waitForQueue(): Promise<void>;
}
declare const u: unique symbol;
declare class P {
    constructor(t: any);
    get endOfStream(): boolean;
    d: any;
    a: any[];
    b: boolean;
    f(): Promise<void>;
    peek(): Promise<any>;
    peekSyncOrThrow(): any;
    readSyncOrThrow(): any;
    peekNextTimeout(t: any): Promise<any>;
    waitForBufferTimeout(t: any): Promise<boolean>;
    read(): Promise<any>;
    readWhile(t: any, e: any): Promise<void>;
    consumeToEnd(): Promise<void>;
}
declare class M extends p {
    constructor(t: any);
    a: any;
    value: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    waitForQueue(): Promise<void>;
}
declare class z {
    constructor(t: any);
    editReason: any;
    key: any;
    source: any;
    join(t: any): this | undefined;
    toEditSourceData(): T;
}
declare class T {
    constructor(t: any, e: any);
    key: any;
    source: any;
    join(t: any): this | undefined;
}
declare class h {
    static create(t: any): any;
}
declare class y extends h {
    constructor(t: any, e: any, r: any);
    kind: any;
    extensionId: any;
    type: any;
    category: string;
    feature: string;
    getColor(): string;
}
import { $ud as O } from "../../../../base/common/lifecycle.js";
import { $vd as p } from "../../../../base/common/lifecycle.js";
export { x as $Azc, W as $Bzc, u as $Czc, P as $Dzc, M as $vzc, z as $wzc, T as $xzc, h as $yzc, y as $zzc };
//# sourceMappingURL=documentWithAnnotatedEdits.d.ts.map