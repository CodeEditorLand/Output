declare function B(r: any): boolean;
declare function x(r: any, e: any, t: any): any;
declare function ue(r: any, e: any): Z | H;
declare class A extends I {
    parse(e: any): {
        regexp: RegExp;
    } | {
        regexp: RegExp;
    }[] | {
        name: any;
        label: any;
        patterns: {
            regexp: RegExp;
        }[];
    } | null;
    b(e: any): {
        regexp: RegExp;
    } | null;
    c(e: any): {
        name: any;
        label: any;
        patterns: {
            regexp: RegExp;
        }[];
    } | null;
    d(e: any): {
        regexp: RegExp;
    }[] | null;
    e(e: any, t: any): {
        regexp: RegExp;
    } | undefined;
    f(e: any): boolean;
    g(e: any): RegExp | undefined;
}
declare class E {
    constructor(e: any, t?: S);
    a: any;
    b: S;
    info(e: any): void;
    warn(e: any): void;
    error(e: any): void;
    fatal(e: any): void;
    get status(): S;
}
declare const P: q;
declare class G extends I {
    parse(e: any): any;
    b(e: any, t: any): boolean;
    c(e: any): any;
    d(e: any): any;
    e(e: any, t: any): void;
    f(e: any): {
        regexp: RegExp;
        file: any;
    } | null;
    g(e: any): RegExp | null;
}
declare const _: X;
declare var g: any;
declare var $: any;
declare var d: any;
declare var m: any;
declare var w: any;
declare class Z extends j {
    m: any;
    get matchLength(): any;
    handle(e: any, t?: number): {
        match: {
            description: any;
            resource: any;
            marker: {
                severity: any;
                startLineNumber: any;
                startColumn: any;
                endLineNumber: any;
                endColumn: any;
                message: any;
            };
        } | null;
        continue: boolean;
    };
    n: any;
    next(e: any): {
        description: any;
        resource: any;
        marker: {
            severity: any;
            startLineNumber: any;
            startColumn: any;
            endLineNumber: any;
            endColumn: any;
            message: any;
        };
    } | null;
}
declare class H extends j {
    m: any;
    get matchLength(): number;
    handle(e: any, t?: number): {
        match: {
            description: any;
            resource: any;
            marker: {
                severity: any;
                startLineNumber: any;
                startColumn: any;
                endLineNumber: any;
                endColumn: any;
                message: any;
            };
        };
        continue: boolean;
    } | {
        match: null;
        continue: boolean;
    };
}
import { $hU as I } from "../../../../base/common/parsers.js";
import { $gU as S } from "../../../../base/common/parsers.js";
declare class q {
    a: any;
    b: Promise<any>;
    onReady(): Promise<any>;
    add(e: any, t: any): void;
    get(e: any): any;
    c(): void;
}
declare class X {
    c: J;
    onMatcherChanged: any;
    a: any;
    b: Promise<any>;
    onReady(): Promise<any>;
    add(e: any): void;
    get(e: any): any;
    keys(): string[];
    d(): void;
}
declare class j {
    constructor(e: any, t: any);
    a: any;
    b: any;
    handle(e: any, t?: number): {
        match: null;
        continue: boolean;
    };
    next(e: any): null;
    c(e: any, t: any, i: any): boolean;
    d(e: any, t: any, i: any, n: any, s?: boolean): void;
    e(e: any, t: any, i: any, n: any, s?: boolean): void;
    f(e: any): {
        description: any;
        resource: any;
        marker: {
            severity: any;
            startLineNumber: any;
            startColumn: any;
            endLineNumber: any;
            endColumn: any;
            message: any;
        };
    } | undefined;
    g(e: any): any;
    h(e: any): {
        startLineNumber: any;
        startCharacter: any;
        endLineNumber: any;
        endCharacter: any;
    } | null;
    j(e: any): {
        startLineNumber: any;
        startCharacter: any;
        endLineNumber: any;
        endCharacter: any;
    } | null;
    k(e: any, t: any, i: any, n: any): {
        startLineNumber: any;
        startCharacter: any;
        endLineNumber: any;
        endCharacter: any;
    };
    l(e: any): any;
}
import { $ef as J } from "../../../../base/common/event.js";
export { B as $iU, x as $jU, ue as $kU, A as $lU, E as $mU, P as $nU, G as $oU, _ as $pU, g as ApplyToKind, $ as Config, d as FileLocationKind, m as ProblemLocationKind, w as Schemas };
//# sourceMappingURL=problemMatcher.d.ts.map