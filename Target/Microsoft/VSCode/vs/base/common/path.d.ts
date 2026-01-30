export function basename(path: any, suffix: any): any;
export const delimiter: string;
export function dirname(path: any): any;
export function extname(path: any): any;
export const format: (pathObject?: any) => any;
export function isAbsolute(path: any): boolean;
export function join(...paths: any[]): any;
export function normalize(path: any): any;
export function parse(path: any): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
};
export namespace posix {
    export namespace win32 {
        export function resolve(...pathSegments: any[]): string;
        export function normalize(path: any): any;
        export function isAbsolute(path: any): boolean;
        export function join(...paths: any[]): any;
        export function relative(from: any, to: any): string;
        export function toNamespacedPath(path: any): any;
        export function dirname(path: any): any;
        export function basename(path: any, suffix: any): any;
        export function extname(path: any): any;
        export let format: (pathObject?: any) => any;
        export function parse(path: any): {
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
        export function resolve(...pathSegments: any[]): string;
        export function normalize(path: any): any;
        export function isAbsolute(path: any): boolean;
        export function join(...paths: any[]): any;
        export function relative(from: any, to: any): any;
        export function toNamespacedPath(path: any): any;
        export function dirname(path: any): any;
        export function basename(path: any, suffix: any): any;
        export function extname(path: any): any;
        let format_1: (pathObject?: any) => any;
        export { format_1 as format };
        export function parse(path: any): {
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
export function relative(from: any, to: any): any;
export function resolve(...pathSegments: any[]): string;
export const sep: string;
export function toNamespacedPath(path: any): any;
export namespace win32 {
    export { win32 };
    export { posix };
}
//# sourceMappingURL=path.d.ts.map