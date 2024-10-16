/**
 * Provides safe access to the `cwd` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `/`.
 *
 * @skipMangle
 */
export declare const cwd: () => string;
/**
 * Provides safe access to the `env` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `{}`.
 */
export declare const env: import("./platform.js").IProcessEnvironment;
/**
 * Provides safe access to the `platform` property in node.js, sandboxed or web
 * environments.
 */
export declare const platform: string;
/**
 * Provides safe access to the `arch` method in node.js, sandboxed or web
 * environments.
 * Note: `arch` is `undefined` in web
 */
export declare const arch: string | undefined;
