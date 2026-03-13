import type { BuildOptions } from "esbuild";

export const On = (await import("../../ESBuild.js")).On;

// When compiling from source, output goes directly to Target/Microsoft/VSCode/vs
// No intermediate "out" or "out-build" directory
export const Prefix = "";

export const Dependency = (await import("../../ESBuild.js")).Dependency;

/**
 * @module ESBuild
 *
 */
export default async (Current: BuildOptions): Promise<BuildOptions> =>
	(await import("deepmerge-ts")).deepmerge<[BuildOptions, BuildOptions]>(
		(await import("../../ESBuild.js")).default,

		{
			outdir: `Target/${Dependency}`,

			tsconfig: `tsconfig/${Dependency}.json`,

			drop: On ? [] : ["debugger", "console"],

			define: {
				__DEV__: On ? "true" : "false",

				__INCREMENT__: `"${`${On ? "DEVELOPMENT" : "PRODUCTION"}-${(await import("ulid")).ulid()}`}"`,
			},

			treeShaking: !On,

			target: ((Browser: string[]) => {
				const Target = new Set<string>();

				const Supported = new Set([
					"chrome",

					"edge",

					"firefox",

					"ios",

					"safari",

					"opera",
				]);

				const _Map: Record<string, string> = {
					ios_saf: "ios",
				};

				for (const _Browser of Browser) {
					const Part = _Browser.split(" ");

					if (Part.length !== 2) {
						continue;
					}

					let [Name, Version] = Part;

					Name = Name?.toLowerCase();

					const NameMap = (_Map[Name ?? 0] || Name) ?? "";

					if (!Supported.has(NameMap)) {
						continue;
					}

					if (Version?.includes("-")) {
						Version = Version.split("-")[0];
					}

					if (Version?.includes(".")) {
						Version = Version.split(".")[0];
					}

					if (!/^\d+$/.test(Version ?? "")) {
						continue;
					}

					Target.add(`${NameMap}${Version}`);
				}

				return Array.from(Target).sort();
			})((await import("browserslist")).default("defaults")),

			entryPoints: (
				await import("@playform/build/Target/Function/Entry.js")
			).default(
				Current,

				[
					...(await import("../Exclude/Test.js")).default(Prefix),

					...(await import("../Exclude/Electron.js")).default(Prefix),

					...(await import("../Exclude/Server.js")).default(Prefix),

					...(await import("../Exclude/WebWorker.js")).default(
						Prefix,
					),

					...(await import("../Exclude/Standalone.js")).default(
						Prefix,
					),

					...(await import("../Exclude/Workbench.js")).default(
						Prefix,
					),

					...(await import("../Exclude/BuiltIn.js")).default(Prefix),

					...(await import("../Exclude/NLS.js")).default(Prefix),

					...(await import("../Exclude/Potential.js")).default(
						Prefix,
					),

					...(await import("../Exclude/Types.js")).default(),

					...(await import("../Exclude/Bootstrap.js")).default(
						Prefix,
					),

					...(await import("../Exclude/Node.js")).default(Prefix),

					// ...(await import("../Exclude/Telemetry.js")).default(
					// 	Prefix,
					// ),

					"tsec.exemptions.json",

					"cgmanifest.json",
				],
			),

			platform: "browser",

			plugins: [
				{
					name: "Declaration",
					setup({ onEnd }) {
						switch (true) {
							case On === true:
								onEnd(async () => {
									await (
										await import("@playform/build/Target/Function/Exec.js")
									).default(
										`Build '../../Dependency/Microsoft/Dependency/Editor/src/**/*.d.ts' \
											--ESBuild Configuration/ESBuild/${Dependency}/Declaration.js \
											--TypeScript Configuration/tsconfig/${Dependency}/tsconfig.Declaration.json`,
									);
								});

								break;

							default:
								break;
						}
					},
				},
			],
		},
	);
