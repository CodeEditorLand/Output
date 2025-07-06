declare class B extends l {
    constructor(s: any, e: any);
    f: any;
    g: any;
    a: any;
    onDidClose: any;
    b: any;
    onDidChangeVisibility: any;
    h(): void;
    get progress(): any;
    updateSeverity(s: any): void;
    updateMessage(s: any): void;
    updateActions(s: any): void;
    close(): void;
}
declare class w extends l {
    constructor(...args: any[]);
    b: any;
    onDidChangeNotification: any;
    f: any;
    onDidChangeStatusMessage: any;
    g: any;
    onDidChangeFilter: any;
    h: any[];
    m: {
        global: any;
        sources: Map<any, any>;
    };
    get notifications(): any[];
    get statusMessage(): {
        message: any;
        options: any;
    } | undefined;
    setFilter(s: any): void;
    addNotification(s: any): A | B | undefined;
    n(s: any): void;
    r(s: any): any;
    s(s: any): d | undefined;
    showStatusMessage(s: any, e: any): {
        close: () => void;
    };
    j: {
        message: any;
        options: any;
    } | undefined;
}
declare function N(i: any): i is d;
declare class $ extends l {
    b: any;
    onDidChange: any;
    a: any;
    get state(): any;
    infinite(): void;
    done(): void;
    total(s: any): void;
    worked(s: any): void;
}
declare class d extends l {
    static create(s: any, e: any): d | undefined;
    static s(s: any): {
        raw: any;
        linkedText: import("../../base/common/linkedText.js").$p$;
        original: any;
    } | undefined;
    constructor(s: any, e: any, t: any, r: any, a: any, n: any, f: any, o: any);
    id: any;
    t: any;
    u: any;
    w: any;
    y: any;
    z: any;
    f: boolean;
    j: any;
    onDidChangeExpansion: any;
    m: any;
    onDidClose: any;
    n: any;
    onDidChangeContent: any;
    r: any;
    onDidChangeVisibility: any;
    C(s: any): void;
    D(s?: {
        primary: never[];
        secondary: never[];
    }): void;
    g: {
        primary: never[];
        secondary: never[];
    } | undefined;
    b: boolean | undefined;
    get canCollapse(): boolean;
    get expanded(): boolean;
    get severity(): any;
    get sticky(): boolean;
    get priority(): any;
    get F(): boolean;
    get hasProgress(): boolean;
    get progress(): any;
    h: any;
    get message(): any;
    get source(): any;
    get sourceId(): any;
    get actions(): {
        primary: never[];
        secondary: never[];
    } | undefined;
    get visible(): boolean;
    updateSeverity(s: any): void;
    updateMessage(s: any): void;
    updateActions(s: any): void;
    updateVisibility(s: any): void;
    expand(): void;
    collapse(s: any): void;
    toggle(): void;
    close(): void;
    equals(s: any): boolean;
}
declare class x extends v {
    constructor(s: any, e: any);
    a: any;
    onDidRun: any;
    b: boolean;
    f: any;
    get menu(): any;
    get keepOpen(): boolean;
}
declare var c: any;
declare var b: any;
declare var m: any;
import { $vd as l } from "../../base/common/lifecycle.js";
import { $jJ as A } from "../../platform/notification/common/notification.js";
import { $bm as v } from "../../base/common/actions.js";
export { B as $K6b, w as $L6b, N as $M6b, $ as $N6b, d as $O6b, x as $P6b, c as NotificationChangeType, b as NotificationViewItemContentChangeKind, m as StatusMessageChangeType };
//# sourceMappingURL=notifications.d.ts.map