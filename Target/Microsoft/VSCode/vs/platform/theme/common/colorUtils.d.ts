declare function Z(e: any, t: any, n: any): {
    op: number;
    if: any;
    then: any;
    else: any;
};
declare function G(e: any, t: any, n: any, r: any): {
    op: number;
    value: any;
    background: any;
    factor: any;
    transparency: any;
};
declare function i(e: any, t: any): any;
declare const g: "vscode://schemas/workbench-colors";
declare function d(e: any): string;
declare function z(e: any): string;
declare function B(e: any, t: any): string;
declare function C(e: any): boolean;
declare namespace D {
    let ColorContribution: string;
}
declare const y: "default";
declare function H(e: any, t: any, n: any, r: any, o: any): any;
declare function I(): w;
declare function j(e: any, t: any): any;
declare function J(e: any, t: any): {
    op: number;
    value: any;
    factor: any;
};
declare function M(e: any, t: any): {
    op: number;
    value: any;
    factor: any;
};
declare function N(e: any, t: any): {
    op: number;
    value: any;
    factor: any;
};
declare function P(e: any, t: any): {
    op: number;
    value: any;
    background: any;
};
declare function U(...e: any[]): {
    op: number;
    values: any[];
};
declare var f: any;
declare class w extends k {
    c: any;
    onDidChangeSchema: any;
    g: {
        type: string;
        properties: {};
    };
    h: {
        type: string;
        enum: never[];
        enumDescriptions: never[];
    };
    f: {};
    notifyThemeUpdate(t: any): void;
    registerColor(t: any, n: any, r: any, o: boolean | undefined, c: any): any;
    deregisterColor(t: any): void;
    getColors(): any[];
    resolveDefaultColor(t: any, n: any): any;
    getColorSchema(): {
        type: string;
        properties: {};
    };
    getColorReferenceSchema(): {
        type: string;
        enum: never[];
        enumDescriptions: never[];
    };
}
import { $vd as k } from "../../../base/common/lifecycle.js";
export { Z as $Ap, G as $Bp, i as $Cp, g as $Dp, d as $mp, z as $np, B as $op, C as $pp, D as $qp, y as $rp, H as $sp, I as $tp, j as $up, J as $vp, M as $wp, N as $xp, P as $yp, U as $zp, f as ColorTransformType };
//# sourceMappingURL=colorUtils.d.ts.map