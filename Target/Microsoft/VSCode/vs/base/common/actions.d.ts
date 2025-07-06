declare class u extends c {
    constructor(t: any, s: string | undefined, i: string | undefined, h: boolean | undefined, a: any);
    j: any;
    onDidChange: any;
    z: boolean;
    m: any;
    n: string;
    w: string;
    D: any;
    get id(): any;
    set label(t: string);
    get label(): string;
    F(t: any): void;
    set tooltip(t: any);
    get tooltip(): any;
    G(t: any): void;
    u: any;
    set class(t: string);
    get class(): string;
    H(t: any): void;
    set enabled(t: boolean);
    get enabled(): boolean;
    I(t: any): void;
    set checked(t: any);
    get checked(): any;
    J(t: any): void;
    C: any;
    run(t: any, s: any): Promise<void>;
}
declare class b extends c {
    constructor(...args: any[]);
    f: any;
    onWillRun: any;
    m: any;
    onDidRun: any;
    run(t: any, s: any): Promise<void>;
    u(t: any, s: any): Promise<void>;
}
declare class r {
    static join(...t: any[]): any;
    id: string | undefined;
    label: string;
    tooltip: string;
    class: string;
    enabled: boolean;
    checked: boolean;
    run(): Promise<void>;
}
declare class m {
    constructor(t: any, s: any, i: any, h: any);
    get actions(): any;
    tooltip: string;
    enabled: boolean;
    id: any;
    label: any;
    class: any;
    a: any;
    run(): Promise<void>;
}
declare class l extends u {
    constructor();
}
declare function g(e: any): {
    id: any;
    label: any;
    tooltip: any;
    class: any;
    enabled: any;
    checked: any;
    run: (...t: any[]) => Promise<any>;
};
import { $vd as c } from "./lifecycle.js";
export { u as $bm, b as $cm, r as $dm, m as $em, l as $fm, g as $gm };
//# sourceMappingURL=actions.d.ts.map