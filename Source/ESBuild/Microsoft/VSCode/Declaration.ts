import type { BuildOptions } from "esbuild";

export const Dependency = (await import("../../../ESBuild.js")).Dependency;

export const Merge = (await import("deepmerge-ts")).deepmergeCustom({
	mergeArrays: false,
});

/**
 * @module ESBuild
 *
 */
export default async (Current: BuildOptions): Promise<BuildOptions> =>
	Merge<[BuildOptions, BuildOptions]>(
		await (await import("../VSCode.js")).default(Current),

		{
			bundle: false,

			outbase: "../../Dependency/Microsoft/Dependency/Editor/src",

			tsconfig: `Configuration/tsconfig/${Dependency}/tsconfig.Declaration.json`,

			plugins: [],

			allowOverwrite: true,

			entryPoints: Current.entryPoints ?? [],

			loader: {
				".d.ts": "copy",
			},
		},
	);
