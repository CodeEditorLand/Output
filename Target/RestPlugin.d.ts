/**
 * RestPlugin.ts - esbuild plugin that invokes the Rest compiler
 *
 * This plugin integrates the Rest compiler (a Rust-based TypeScript compiler)
 * into the esbuild build pipeline. When enabled, it intercepts TypeScript
 * files and delegates compilation to the Rest CLI instead of esbuild's
 * built-in TypeScript loader.
 *
 * Usage:
 *   import RestPlugin from './RestPlugin';
 *   import esbuildConfig from './Output';
 *
 *   esbuildConfig.plugins?.push(RestPlugin());
 *
 * Environment Variables:
 * Compiler - Set to "Rest" to enable the Rest compiler
 *   REST_BINARY_PATH - Override the path to the Rest binary
 *   REST_OPTIONS - Additional command-line options for Rest
 *
 * @module ESBuild/RestPlugin
 */
import type { Plugin } from "esbuild";
/**
 * Creates the Rest esbuild plugin
 *
 * @returns {Plugin} The esbuild plugin configuration
 */
export default function RestPlugin(): Plugin;
/**
 * Check if Rest compiler is available and configured
 *
 * @returns {boolean} True if Rest compiler is enabled
 */
export declare function isRestEnabled(): boolean;
/**
 * Get the Rest binary path
 *
 * @returns {string} The resolved binary path
 */
export declare function getRestBinaryPath(): string;
/**
 * Create Rest plugin conditionally based on COMPILER environment variable
 *
 * @returns {Plugin | null} Rest plugin if enabled, null otherwise
 */
export declare function createRestPluginIfEnabled(): Plugin | null;
