import type { BuildOptions, LogLevel } from "esbuild";

export const Browser = process.env["Browser"] === "true";

export const Clean = process.env["Clean"] === "true";

export const Dependency = process.env["Dependency"] ?? "CodeEditorLand/Editor";

export const Level = (process.env["Level"] as LogLevel) ?? "debug";

export const Meta = process.env["Meta"] === "true";

export const On =
	process.env["NODE_ENV"] === "development" ||
	process.env["TAURI_ENV_DEBUG"] === "true";

/**
 * @module ESBuild
 *
 */
export default {
	color: true,

	format: "esm",

	logLevel: Level,

	metafile: Meta,

	minify: !On,

	outdir: "Configuration",

	platform: "node",

	target: "esnext",

	tsconfig: "tsconfig.json",

	write: true,

	legalComments: On ? "inline" : "none",

	bundle: false,

	assetNames: "Asset/[name]-[hash]",

	sourcemap: On,

	drop: On ? [] : ["debugger"],

	ignoreAnnotations: !On,

	keepNames: On,

	plugins: [
		{
			name: "Target",

			// @ts-ignore
			setup({ onStart, initialOptions: { outdir } }) {
				switch (true) {
					case Clean === true:
						onStart(async () => {
							try {
								outdir
									? await (
											await import("node:fs/promises")
										).rm(outdir, {
											recursive: true,
										})
									: {};
							} catch (_Error) {
								console.log(_Error);
							}
						});

						break;

					default:
						break;
				}
			},
		},
	],

	loader: {
		".css": "css",

		".fish": "copy",

		".html": "copy",

		".json": "copy",

		".md": "copy",

		".mp3": "copy",

		".png": "copy",

		".ps1": "copy",

		".psm1": "copy",

		".scm": "copy",

		".scpt": "copy",

		".sh": "copy",

		".svg": "copy",

		".ttf": "copy",

		".txt": "copy",

		".zsh": "copy",
	},
} satisfies BuildOptions as BuildOptions;

export const { sep, posix } = await import("node:path");
