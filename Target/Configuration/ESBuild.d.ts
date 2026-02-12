export const Browser: boolean;
export const Bundle: boolean;
export const Clean: boolean;
export const Dependency: string;
export const Meta: boolean;
export const On: boolean;
declare namespace ESBuild_default {
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
        ".css": string;
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
export const posix: typeof import("node:path");
export const sep: "\\" | "/";
export { ESBuild_default as default };
//# sourceMappingURL=ESBuild.d.ts.map