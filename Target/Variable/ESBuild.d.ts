export const On: boolean;
export const Dependency: string;
export const Clean: boolean;
declare namespace _default {
    export let color: boolean;
    export let format: string;
    export let logLevel: string;
    export let metafile: boolean;
    export let minify: boolean;
    export let outdir: string;
    export let platform: string;
    export let target: string;
    export let tsconfig: string;
    export let write: boolean;
    export let legalComments: string;
    export let bundle: boolean;
    export let assetNames: string;
    export { On as sourcemap };
    export let drop: string[];
    export let ignoreAnnotations: boolean;
    export { On as keepNames };
    export let plugins: {
        name: string;
        setup({ onStart, initialOptions: { outdir } }: {
            onStart: any;
            initialOptions: {
                outdir: any;
            };
        }): void;
    }[];
    export let loader: {
        ".css,": string;
        ".fish": string;
        ".html": string;
        ".json": string;
        ".md": string;
        ".mp3": string;
        ".png": string;
        ".ps1": string;
        ".psm1": string;
        ".scm": string;
        ".scpt": string;
        ".sh": string;
        ".svg": string;
        ".ttf": string;
        ".txt": string;
        ".zsh": string;
    };
}
export default _default;
export const sep: "\\" | "/";
export const posix: import("path").PlatformPath;
