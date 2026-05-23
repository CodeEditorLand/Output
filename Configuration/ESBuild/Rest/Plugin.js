import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const __dirname = dirname(fileURLToPath(import.meta.url));
const REST_VERBOSE = process.env["REST_VERBOSE"] === "true";
const USE_REST_COMPILER = process.env["Compiler"]?.toLowerCase() === "rest";
const REST_BINARY_PATH =
	process.env["REST_BINARY_PATH"] ||
	(() => {
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
		console.log("[Rest] Falling back to 'rest' from PATH");
		return "rest";
	})();
const REST_OPTIONS =
	process.env["REST_OPTIONS"]?.split(" ").filter(Boolean) || [];
const ENABLE_SOURCE_MAPS =
	process.env["NODE_ENV"] === "development" ||
	process.env["TAURI_ENV_DEBUG"] === "true" ||
	process.env["RestSourcemap"] === "true";
function RestPlugin() {
	return {
		name: "rest",
		setup(build) {
			if (!USE_REST_COMPILER) {
				return;
			}
			const log = /* @__PURE__ */ __name((...args) => {
				if (
					build.initialOptions.logLevel !== "silent" ||
					REST_VERBOSE
				) {
					console.log("[Rest]", ...args);
				}
			}, "log");
			log("Plugin activated - Using Rest compiler");
			log("Binary path:", REST_BINARY_PATH);
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
			} catch (_error) {}
			const compileWithRest = /* @__PURE__ */ __name(
				async (filePath, ext) => {
					const fs = await import("node:fs/promises");
					const tempInputDir = mkdtempSync(
						join(tmpdir(), "rest-input-"),
					);
					const tempOutputDir = mkdtempSync(
						join(tmpdir(), "rest-output-"),
					);
					try {
						const inputFileName = basename(filePath);
						const tempInputPath = join(tempInputDir, inputFileName);
						await fs.copyFile(filePath, tempInputPath);
						const args = [
							"compile",
							"--input",
							tempInputDir,
							"--output",
							tempOutputDir,
						];
						if (ENABLE_SOURCE_MAPS) {
							args.push("--sourcemap");
						}
						args.push(...REST_OPTIONS);
						if (REST_VERBOSE) {
							console.log(
								"[Rest] Executing:",
								REST_BINARY_PATH,
								args.join(" "),
							);
						}
						const result = spawnSync(REST_BINARY_PATH, args, {
							encoding: "utf8",
							stdio: ["pipe", "pipe", "pipe"],
							env: { ...process.env },
						});
						if (result.status !== 0) {
							const stderr = result.stderr || "";
							const stdout = result.stdout || "";
							throw new Error(
								`Rest compilation failed (exit code ${result.status}):
${stdout}
${stderr}`,
							);
						}
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
						let mapContents;
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
						try {
							const { rmSync } = await import("node:fs");
							rmSync(tempInputDir, {
								recursive: true,
								force: true,
							});
							rmSync(tempOutputDir, {
								recursive: true,
								force: true,
							});
						} catch (_error) {}
					}
				},
				"compileWithRest",
			);
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
						const errorMsg = error.message;
						console.warn(
							`[Rest] Failed to compile ${filePath} with Rest:`,
							errorMsg,
						);
						console.warn(
							`[Rest] Falling back to esbuild TypeScript loader`,
						);
					}
					return null;
				},
			);
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
							error.message,
						);
					}
					return null;
				},
			);
		},
	};
}
__name(RestPlugin, "RestPlugin");
function isRestEnabled() {
	return USE_REST_COMPILER;
}
__name(isRestEnabled, "isRestEnabled");
function getRestBinaryPath() {
	return REST_BINARY_PATH;
}
__name(getRestBinaryPath, "getRestBinaryPath");
function createRestPluginIfEnabled() {
	return USE_REST_COMPILER ? RestPlugin() : null;
}
__name(createRestPluginIfEnabled, "createRestPluginIfEnabled");
export {
	createRestPluginIfEnabled,
	RestPlugin as default,
	getRestBinaryPath,
	isRestEnabled,
};
//# sourceMappingURL=Plugin.js.map
