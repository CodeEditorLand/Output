declare function V(e: any, t: any): any;
declare function Q(e: any): any;
declare namespace h {
    export { h as win32 };
    export { g as posix };
}
declare namespace g {
    export namespace win32 {
        export function resolve(...e: any[]): string;
        export function normalize(e: any): any;
        export function isAbsolute(e: any): boolean;
        export function join(...e: any[]): any;
        export function relative(e: any, t: any): string;
        export function toNamespacedPath(e: any): any;
        export function dirname(e: any): any;
        export function basename(e: any, t: any): any;
        export function extname(e: any): any;
        export let format: (t?: any) => any;
        export function parse(e: any): {
            root: string;
            dir: string;
            base: string;
            ext: string;
            name: string;
        };
        export let sep: string;
        export let delimiter: string;
        let win32_1: null;
        export { win32_1 as win32 };
        export let posix: null;
    }
    export namespace posix_1 {
        export function resolve(...e: any[]): string;
        export function normalize(e: any): any;
        export function isAbsolute(e: any): boolean;
        export function join(...e: any[]): any;
        export function relative(e: any, t: any): any;
        export function toNamespacedPath(e: any): any;
        export function dirname(e: any): any;
        export function basename(e: any, t: any): any;
        export function extname(e: any): any;
        let format_1: (t?: any) => any;
        export { format_1 as format };
        export function parse(e: any): {
            root: string;
            dir: string;
            base: string;
            ext: string;
            name: string;
        };
        let sep_1: string;
        export { sep_1 as sep };
        let delimiter_1: string;
        export { delimiter_1 as delimiter };
        let win32_2: null;
        export { win32_2 as win32 };
        let posix_2: null;
        export { posix_2 as posix };
    }
    export { posix_1 as posix };
}
declare function K(e: any): any;
declare function B(e: any): boolean;
declare function F(...e: any[]): any;
declare function G(...e: any[]): string;
declare function M(e: any, t: any): any;
declare function q(e: any): any;
declare const J: (t?: any) => any;
declare function X(e: any): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
};
declare function p(e: any): any;
declare const te: string;
declare const ee: string;
export { V as $$, Q as $0, h as $3, g as $4, K as $5, B as $6, F as $7, G as $8, M as $9, q as $_, J as $ab, X as $bb, p as $cb, te as $eb, ee as sep };
//# sourceMappingURL=path.d.ts.map