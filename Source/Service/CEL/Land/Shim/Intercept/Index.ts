// @ts-nocheck
/**
 * @module CEL/Land/Shim/Intercept/Index
 * @description
 * Barrel file re-exporting all Intercept proxies for unified import.
 *
 * Each proxy is a default-exported async function returning Promise<void>.
 * Callers should await each proxy in the desired activation order:
 *
 *   import { ErrorHandlerProxy, EmitterFireProxy } from "./Intercept/Index.js";
 *   await ErrorHandlerProxy();
 *   await EmitterFireProxy();
 */

export { default as ErrorHandlerProxy } from "./ErrorHandlerProxy.js";
export { default as EmitterFireProxy } from "./EmitterFireProxy.js";
export { default as CancellationProxy } from "./CancellationProxy.js";
export { default as DisposableProxy } from "./DisposableProxy.js";
export { default as AsyncProxy } from "./AsyncProxy.js";
export { default as TimingProxy } from "./TimingProxy.js";
