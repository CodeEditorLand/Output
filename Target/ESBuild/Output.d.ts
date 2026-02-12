import type { BuildOptions } from "esbuild";
export declare const On: boolean;
export declare const Clean: boolean;
/**
 * @module ESBuild
 *
 */
declare const _default: (Current: BuildOptions) => Promise<BuildOptions>;
export default _default;
export declare const sep: "\\" | "/", posix: typeof import("node:path");
