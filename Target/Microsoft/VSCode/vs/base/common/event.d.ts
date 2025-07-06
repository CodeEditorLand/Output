declare class F {
    constructor(e: any);
    listenerCount: number;
    invocationCount: number;
    elapsedOverall: number;
    durations: any[];
    name: string;
    start(e: any): void;
    g: le | undefined;
    stop(): void;
}
declare function xe(o: any): {
    dispose(): void;
};
declare class de extends Error {
    constructor(e: any, i: any);
    stack: any;
}
declare class pe extends Error {
    constructor(e: any, i: any);
    stack: any;
}
declare class b {
    constructor(e: any);
    A: number;
    g: any;
    j: E | undefined;
    m: F | undefined;
    z: any;
    dispose(): void;
    q: boolean | undefined;
    get event(): any;
    w: any;
    B(e: any): void;
    C(e: any, i: any): void;
    D(e: any): void;
    fire(e: any): void;
    hasListeners(): boolean;
}
declare function je(): H;
declare class ye extends b {
    fireAsync(e: any, i: any, f: any): Promise<void>;
    f: _ | undefined;
}
declare class we extends b {
    get isPaused(): boolean;
    f: number;
    h: _;
    s: any;
    pause(): void;
    resume(): void;
}
declare class Se extends we {
    k: any;
    o: any;
}
declare class Oe extends b {
    f: any[];
    h: any;
}
declare class Le {
    g: boolean;
    h: any[];
    f: b;
    get event(): any;
    add(e: any): any;
    j(): void;
    k(): void;
    m(e: any): void;
    o(e: any): void;
    dispose(): void;
}
declare class Re {
    constructor(e: any, i: any, f: any, c: any);
    f: z;
    event: any;
    dispose(): void;
}
declare class Fe {
    f: any[];
    wrapEvent(e: any, i: any, f: any): (c: any, d: any, p: any) => any;
    bufferEvents(e: any): any;
}
declare class ze {
    f: boolean;
    g: any;
    h: Readonly<{
        dispose(): void;
    }> | undefined;
    j: b;
    event: any;
    set input(e: any);
    dispose(): void;
}
declare class We {
    static const(e: any): be;
    constructor(e: any);
    g: any;
    f: b;
    onDidChange: any;
    set value(e: any);
    get value(): any;
}
declare function Ee(o: any, e: any, i: any): z;
declare var R: any;
import { $$e as le } from "./stopwatch.js";
declare class E {
    constructor(e: any, i: any, f?: string);
    j: any;
    threshold: any;
    name: string;
    h: number;
    dispose(): void;
    check(e: any, i: any): (() => void) | undefined;
    g: Map<any, any> | undefined;
    getMostFrequentStack(): any[] | undefined;
}
declare class H {
    i: number;
    end: number;
    enqueue(e: any, i: any, f: any): void;
    current: any;
    value: any;
    reset(): void;
}
import { $Gd as _ } from "./linkedList.js";
import { $ud as z } from "./lifecycle.js";
declare class be {
    constructor(e: any);
    value: any;
    onDidChange: any;
}
export { F as $af, xe as $bf, de as $cf, pe as $df, b as $ef, je as $ff, ye as $gf, we as $hf, Se as $if, Oe as $jf, Le as $kf, Re as $lf, Fe as $mf, ze as $nf, We as $of, Ee as $pf, R as Event };
//# sourceMappingURL=event.d.ts.map