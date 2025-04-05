import type { BuildOptions, Plugin } from "esbuild";

export const Base = "../../ESBuild.js";

export const { posix, sep } = await import(Base);

/**
 * @module ESBuild
 *
 */
export default (await import("deepmerge-ts")).deepmerge<
	[BuildOptions, BuildOptions]
>((await import(Base)).default, {
	plugins: [
		{
			name: "Exclude",
			setup({ onLoad }) {
				// biome-ignore lint/nursery/useTopLevelRegex:
				onLoad({ filter: /.*/ }, ({ path }) => {
					const VS = "src/vs";

					if (
						[
							`${VS}/base/test/common/filters.perf.data.d.ts`,

							`${VS}/platform/files/test/node/fixtures/resolver/examples`,
							`${VS}/platform/files/test/node/fixtures/resolver/other/deep`,
							`${VS}/platform/files/test/node/fixtures/resolver/other/deep/employee`,
							`${VS}/platform/files/test/node/fixtures/service`,
							`${VS}/platform/files/test/node/fixtures/service/deep`,
							`${VS}/workbench/contrib/codeEditor/test/node`,
							`${VS}/workbench/services/search/test/node/fixtures`,
							`${VS}/workbench/services/search/test/node/fixtures/examples`,
							`${VS}/workbench/services/textfile/test/node/encoding/fixtures`,
							`${VS}/base/test/common/filters.perf.data.d.ts`,

							".d.ts",
						].some((Search) =>
							path.split(sep).join(posix.sep).includes(Search),
						)
					) {
						return {
							contents: "",
							loader: "empty",
						};
					}

					return null;
				});
			},
		} as Plugin,
	],
});
