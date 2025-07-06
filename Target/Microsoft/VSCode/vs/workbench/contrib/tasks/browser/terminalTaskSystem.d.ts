export { M as $pvc };
declare class M extends ue {
    constructor(e: any, t: any, i: any, s: any, n: any, a: any, o: any, c: any, r: any, h: any, g: any, w: any, p: any, d: any, l: any, S: any, m: any, u: any, f: any, b: any);
    taskShellIntegrationStartSequence(e: any): string;
    get taskShellIntegrationOutputSequence(): string;
    P: any;
    Q: any;
    R: any;
    S: any;
    U: any;
    W: any;
    X: any;
    Y: any;
    Z: any;
    $: any;
    ab: any;
    bb: any;
    cb: any;
    db: any;
    eb: any;
    fb: any;
    gb: any;
    D: boolean;
    I: Promise<void>;
    J: boolean;
    N: {
        id: string;
        label: any;
        icon: any;
    }[];
    g: any;
    h: any;
    j: any;
    m: any;
    n: any;
    u: de;
    w: any;
    L: he;
    y: any;
    H: any;
    O: any;
    get onDidStateChange(): any;
    hb(e: any): void;
    ib(): void;
    reconnect(e: any, t: any): {
        kind: number;
        task: any;
        started: {};
        promise: any;
    } | {
        kind: number;
        task: any;
        active: {
            same: boolean;
            background: any;
        };
        promise: any;
    };
    run(e: any, t: any, i?: any): {
        kind: number;
        task: any;
        started: {};
        promise: any;
    } | {
        kind: number;
        task: any;
        active: {
            same: boolean;
            background: any;
        };
        promise: any;
    };
    C: Se | undefined;
    z: any;
    rerun(): {
        kind: number;
        task: any;
        started: {};
        promise: any;
    } | {
        kind: number;
        task: any;
        active: {
            same: boolean;
            background: any;
        };
        promise: any;
    } | undefined;
    set lastTask(e: any);
    get lastTask(): any;
    jb(e: any): void;
    isTaskVisible(e: any): boolean;
    revealTask(e: any): boolean;
    F: any;
    G: any;
    isActive(): Promise<boolean>;
    isActiveSync(): boolean;
    canAutoTerminate(): boolean;
    getActiveTasks(): any[];
    getLastInstance(e: any): any;
    getFirstInstance(e: any): any;
    getBusyTasks(): any[];
    customExecutionComplete(e: any, t: any): Promise<any>;
    kb(e: any): any[];
    lb(e: any): void;
    mb(e: any): void;
    terminate(e: any): Promise<any>;
    terminateAll(): Promise<any[]>;
    nb(e: any): void;
    ob(e: any, t: any, i: any, s: any, n: any, a: any): any;
    pb(e: any): Promise<any>;
    qb(e: any): boolean;
    rb(e: any): void;
    sb(e: any, t: any): void;
    tb(e: any): Promise<any>;
    ub(e: any, t: any, i: any, s: any, n: any, a: any): any;
    vb(e: any, t: any, i: any, s: any, n: any): Promise<any>;
    wb(e: any, t: any): any;
    xb(e: any, t: any): void;
    yb(e: any, t: any, i: any, s: any, n: any): Promise<any>;
    zb(e: any, t: any, i: any, s: any, n: any): any;
    Ab(e: any, t: any, i: any): Promise<any>;
    Bb(e: any): boolean;
    Cb(e: any, t: any, i: any): Promise<any>;
    Db(e: any, t: any, i: any, s: any): Promise<any>;
    Eb(e: any): any;
    Fb(e: any, t: any, i: any, s: any, n: any, a: any, o: any, c: any): Promise<{
        name: any;
        type: string;
        executable: any;
        args: any;
        env: any;
        icon: any;
        color: any;
        waitOnExit: any;
    } | {
        name: any;
        type: string;
        icon: any;
        color: any;
        executable: any;
        args: any;
        waitOnExit: any;
        env?: never;
    } | undefined>;
    Gb(e: any, t: any): any;
    Hb(e: any): Promise<any>;
    Ib(e: any, t: any, i: any): Promise<any>;
    Jb(): void;
    M: any;
    Kb(e: any, t: any): void;
    Lb(e: any, t: any, i: any): Promise<any[]>;
    Mb(e: any, t: any, i: any, s: any, n: any, a: any): string;
    Nb(e: any, t: any, i: any): any;
    Ob(e: any, t: any): void;
    Pb(e: any, t: any): void;
    Qb(e: any, t: any, i: any): void;
    Rb(e: any, t: any): void;
    Sb(e: any, t: any): void;
    Tb(e: any, t: any): Promise<{
        command: any;
        args: any;
    }>;
    Ub(e: any, t: any): Promise<any[]>;
    Vb(e: any, t: any): Promise<any[]>;
    Wb(e: any, t: any): Promise<any>;
    Xb(e: any, t: any): Promise<{
        cwd: any;
    }>;
    getSanitizedCommand(e: any): any;
    getTaskForTerminal(e: any): any;
    Yb(e: any): void;
}
import { $vd as ue } from "../../../../base/common/lifecycle.js";
import { $Kc as de } from "../../../../base/common/map.js";
import { $ef as he } from "../../../../base/common/event.js";
import { $42b as Se } from "../common/taskSystem.js";
//# sourceMappingURL=terminalTaskSystem.d.ts.map