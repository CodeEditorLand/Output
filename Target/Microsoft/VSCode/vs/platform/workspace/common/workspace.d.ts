declare function O(i: any, t: any): boolean;
declare function R(i: any): boolean;
declare const U: "4064f6ec-cb38-4ad0-af64-ee6467e63c82";
declare function H(i: any): boolean;
declare function W(i: any, t: any): boolean;
declare function _(i: any): boolean;
declare const q: any;
declare function y(i: any): boolean;
declare function z(i: any): boolean;
declare namespace P {
    let id: string;
}
declare namespace E {
    let id_1: string;
    export { id_1 as id };
}
declare function J(i: any, t: any): {
    id: any;
    configPath?: never;
    uri?: never;
} | {
    id: any;
    configPath: any;
    uri?: never;
} | {
    id: any;
    uri: any;
    configPath?: never;
};
declare function j(i: any): boolean;
declare function K(i: any): {
    id: any;
    uri: any;
    configPath?: never;
} | {
    id: any;
    configPath: any;
    uri?: never;
} | {
    id: any;
    uri?: never;
    configPath?: never;
} | undefined;
declare function L(i: any): boolean;
declare function M(i: any): boolean;
declare class N {
    constructor(t: any, r: any, u: any, f: any, c: any);
    set folders(t: any);
    get folders(): any;
    g: any;
    h: any;
    j: any;
    k: any;
    l: any;
    c: n;
    update(t: any): void;
    get id(): any;
    get transient(): any;
    set configuration(t: any);
    get configuration(): any;
    getFolder(t: any): any;
    n(): void;
    toJSON(): {
        id: any;
        folders: any;
        transient: any;
        configuration: any;
    };
}
declare class v {
    constructor(t: any, r: any);
    raw: any;
    uri: any;
    index: any;
    name: any;
    toResource(t: any): any;
    toJSON(): {
        uri: any;
        name: any;
        index: any;
    };
}
declare function T(i: any): v;
declare const s: "code-workspace";
declare const I: ".code-workspace";
declare const Y: {
    name: any;
    extensions: string[];
}[];
declare const B: "workspace.json";
declare var o: any;
import { $kj as n } from "../../../base/common/ternarySearchTree.js";
export { O as $Al, R as $Bl, U as $Cl, H as $Dl, W as $El, _ as $Fl, q as $jl, y as $kl, z as $ll, P as $ml, E as $nl, J as $ol, j as $pl, K as $ql, L as $rl, M as $sl, N as $tl, v as $ul, T as $vl, s as $wl, I as $xl, Y as $yl, B as $zl, o as WorkbenchState };
//# sourceMappingURL=workspace.d.ts.map