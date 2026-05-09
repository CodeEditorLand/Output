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
 *
 *   import esbuildConfig from './Output';
 *
 *
 *   esbuildConfig.plugins?.push(RestPlugin());
 *
 *
 * Environment Variables:
 * Compiler - Set to "Rest" to enable the Rest compiler
 *   REST_BINARY_PATH - Override the path to the Rest binary
 *   REST_OPTIONS - Additional command-line options for Rest
 *
 * @module ESBuild/RestPlugin
 */

import { spawnSync } from "node:child_process";

import { existsSync, mkdtempSync, readFileSync } from "node:fs";

import { tmpdir } from "node:os";

import { basename, dirname, extname, join } from "node:path";

import { fileURLToPath } from "node:url";

import type { OnLoadResult, Plugin } from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Enable verbose logging if REST_VERBOSE is set
const REST_VERBOSE = process.env["REST_VERBOSE"] === "true";

// Check if Rest compiler should be used
const USE_REST_COMPILER = process.env["Compiler"]?.toLowerCase() === "rest";

// Rest binary path resolution
const REST_BINARY_PATH =
	process.env["REST_BINARY_PATH"] ||
	(() => {
		// Try to find the Rest binary in various locations
		const possiblePaths = [
			// From @codeeditorland/rest package
			join(
				__dirname,

				"..",

				"..",

				"node_modules",

				"@codeeditorland/rest",

				"bin",

				"rest",
			),

			join(
				__dirname,

				"..",

				"..",

				"node_modules",

				"@codeeditorland/rest",

				"bin",

				"rest.exe",
			),

			// From Element/Rest directory (cargo install --bin=rest location)
			join(__dirname, "..", "..", "..", "Rest", "bin", "rest"),

			join(__dirname, "..", "..", "..", "Rest", "bin", "Rest"),

			join(__dirname, "..", "..", "..", "Rest", "bin", "rest.exe"),

			join(__dirname, "..", "..", "..", "Rest", "bin", "Rest.exe"),

			// From Target/release (local cargo build)
			join(
				__dirname,

				"..",

				"..",

				"..",

				"Rest",

				"Target",

				"release",

				"rest",
			),

			join(
				__dirname,

				"..",

				"..",

				"..",

				"Rest",

				"Target",

				"release",

				"Rest",
			),

			join(
				__dirname,

				"..",

				"..",

				"..",

				"Rest",

				"Target",

				"release",

				"rest.exe",
			),

			join(
				__dirname,

				"..",

				"..",

				"..",

				"Rest",

				"Target",

				"release",

				"Rest.exe",
			),

			// Also check debug build (debug directory)
			join(
				__dirname,

				"..",

				"..",

				"..",

				"Rest",

				"Target",

				"debug",

				"rest",
			),

			join(
				__dirname,

				"..",

				"..",

				"..",

				"Rest",

				"Target",

				"debug",

				"Rest",
			),

			// Global installation
			"rest",
		];

		// Debug: log all paths if REST_VERBOSE
		if (REST_VERBOSE) {
			console.log("[Rest] Checking binary paths:");

			for (const p of possiblePaths) {
				console.log(
					`  ${p} -> ${existsSync(p) ? "FOUND" : "not found"}`,
				);
			}
		}

		for (const path of possiblePaths) {
			if (existsSync(path)) {
				console.log(`[Rest] Found binary at: ${path}`);

				return path;
			}
		}

		// Default fallback
		console.log("[Rest] Falling back to 'rest' from PATH");

		return "rest";
	})();

// Rest compiler options
const REST_OPTIONS =
	process.env["REST_OPTIONS"]?.split(" ").filter(Boolean) || [];

// Enable source maps if NODE_ENV is development or Sourcemap env is set
const ENABLE_SOURCE_MAPS =
	process.env["NODE_ENV"] === "development" ||
	process.env["TAURI_ENV_DEBUG"] === "true" ||
	process.env["RestSourcemap"] === "true";

/**
 * Creates the Rest esbuild plugin
 *
 * @returns {Plugin} The esbuild plugin configuration
 */
export default function RestPlugin(): Plugin {

	return {

		name: "rest",

		setup(build) {

			// Only enable if Compiler=Rest is set
			if (!USE_REST_COMPILER) {

				return;
			}

			// Log plugin activation with full details
			const log = (...args: unknown[]) => {

				if (
					build.initialOptions.logLevel !== "silent" ||
					REST_VERBOSE
				) {

					console.log("[Rest]", ...args);
				}
			};

			log("Plugin activated - Using Rest compiler");

			log("Binary path:", REST_BINARY_PATH);

			// Always log debug info when REST_VERBOSE is true
			console.log("[Rest] REST_VERBOSE is:", REST_VERBOSE);

			console.log("[Rest] __dirname:", __dirname);

			console.log(
				"[Rest] Checking for binary at resolved path:",

				REST_BINARY_PATH,
			);

			const explicitlyCheck = [
				join(
					__dirname,

					"..",

					"..",

					"..",

					"Rest",

					"Target",

					"release",

					"Rest",
				),

				join(
					__dirname,

					"..",

					"..",

					"..",

					"Rest",

					"Target",

					"release",

					"rest",
				),

				join(__dirname, "..", "..", "..", "Rest", "bin", "Rest"),

				join(__dirname, "..", "..", "..", "Rest", "bin", "rest"),
			];

			for (const p of explicitlyCheck) {

				console.log(`  Candidate: ${p} exists: ${existsSync(p)}`);
			}

			if (ENABLE_SOURCE_MAPS) {

				log("Source maps: enabled");
			}

			// Check if Rest binary is available
			try {

				if (
					!existsSync(REST_BINARY_PATH) &&
					REST_BINARY_PATH !== "rest"
				) {

					console.warn(
						`[Rest] Binary not found at: ${REST_BINARY_PATH}`,
					);

					console.warn(
						"[Rest] Falling back to global installation or esbuild default",
					);
				}
			} catch (_error) {

				// Ignore errors during binary check
			}

			// Helper function to compile a single file with Rest
			const compileWithRest = async (
				filePath: string,

				ext: string,
			): Promise<OnLoadResult | null> => {

				const fs = await import("node:fs/promises");

				// Rest CLI uses directory-based compilation, so we need to create temp dirs
				const tempInputDir = mkdtempSync(join(tmpdir(), "rest-input-"));

				const tempOutputDir = mkdtempSync(
					join(tmpdir(), "rest-output-"),
				);

				try {

					// Copy input file to temp input directory with same name
					const inputFileName = basename(filePath);

					const tempInputPath = join(tempInputDir, inputFileName);

					await fs.copyFile(filePath, tempInputPath);

					// Build Rest compiler command arguments
					const args: string[] = [
						"compile",

						"--input",

						tempInputDir,

						"--output",

						tempOutputDir,
					];

					// Add source map flag if enabled
					if (ENABLE_SOURCE_MAPS) {

						args.push("--sourcemap");
					}

					// Add custom REST_OPTIONS
					args.push(...REST_OPTIONS);

					if (REST_VERBOSE) {

						console.log(
							"[Rest] Executing:",

							REST_BINARY_PATH,

							args.join(" "),
						);
					}

					// Execute Rest compiler using spawnSync for better error capture
					const result = spawnSync(REST_BINARY_PATH, args, {
						encoding: "utf8",

						stdio: ["pipe", "pipe", "pipe"],

						env: { ...process.env },
					});

					if (result.status !== 0) {

						const stderr = result.stderr || "";

						const stdout = result.stdout || "";

						throw new Error(
							`Rest compilation failed (exit code ${result.status}):\n${stdout}\n${stderr}`,
						);
					}

					// Read the compiled output file
					const outputExt =
						ext === ".ts" || ext === ".tsx" ? ".js" : ext;

					const tempOutputPath = join(
						tempOutputDir,

						inputFileName.replace(
							extname(inputFileName),

							outputExt,
						),
					);

					if (!existsSync(tempOutputPath)) {

						throw new Error(
							`Rest compiler did not produce output file: ${tempOutputPath}`,
						);
					}

					const contents = readFileSync(tempOutputPath, "utf8");

					// Handle source maps if generated
					let mapContents: string | undefined;

					const mapPath = tempOutputPath + ".map";

					if (ENABLE_SOURCE_MAPS && existsSync(mapPath)) {

						mapContents = readFileSync(mapPath, "utf8");
					}

					return {

						contents,

						loader: "js",

						watchFiles: [filePath],

						...(mapContents && {
							pluginData: { map: mapContents },
						}),
					};
				} finally {

					// Clean up temp directories (best effort)
					try {

						const { rmSync } = await import("node:fs");

						rmSync(tempInputDir, { recursive: true, force: true });

						rmSync(tempOutputDir, { recursive: true, force: true });
					} catch (_error) {

						// Ignore cleanup errors
					}
				}
			};

			// Intercept TypeScript files
			build.onLoad(
				{ filter: /\.tsx?$/, namespace: "file" },

				async ({ path: filePath }) => {
					try {
						const ext = extname(filePath);

						const result = await compileWithRest(filePath, ext);

						if (result) {
							return result;
						}
					} catch (error) {
						// On error, fall back to esbuild's default TypeScript handling
						const errorMsg = (error as Error).message;

						console.warn(
							`[Rest] Failed to compile ${filePath} with Rest:`,

							errorMsg,
						);

						console.warn(
							`[Rest] Falling back to esbuild TypeScript loader`,
						);
					}

					// Return null to let esbuild handle it
					return null;
				},
			);

			// Handle JavaScript files (pass through or compile if needed)
			build.onLoad(
				{ filter: /\.jsx?$/, namespace: "file" },

				async ({ path: filePath }) => {
					if (!USE_REST_COMPILER) {
						return null;
					}

					try {
						const ext = extname(filePath);

						const result = await compileWithRest(filePath, ext);

						if (result) {
							return result;
						}
					} catch (error) {
						console.warn(
							`[Rest] Failed to compile ${filePath} with Rest:`,

							(error as Error).message,
						);
					}

					return null;
				},
			);
		},
	};
}

/**
 * Check if Rest compiler is available and configured
 *
 * @returns {boolean} True if Rest compiler is enabled
 */
export function isRestEnabled(): boolean {

	return USE_REST_COMPILER;
}

/**
 * Get the Rest binary path
 *
 * @returns {string} The resolved binary path
 */
export function getRestBinaryPath(): string {

	return REST_BINARY_PATH;
}

/**
 * Create Rest plugin conditionally based on COMPILER environment variable
 *
 * @returns {Plugin | null} Rest plugin if enabled, null otherwise
 */
export function createRestPluginIfEnabled(): Plugin | null {

	return USE_REST_COMPILER ? RestPlugin() : null;
}
