import type Interface from "@playform/build/Target/Interface/Build/Set.js";
import type { BuildOptions } from "esbuild";

const Prefix = "out/vs";

/**
 * @module ESBuild
 *
 */
export default (async (Current: BuildOptions): Promise<BuildOptions> =>
	(await import("deepmerge-ts")).deepmerge<[BuildOptions, BuildOptions]>(
		(await import("../../ESBuild.js")).default,
		{
			entryPoints: (await import("../Exclude/Entry.js")).default(
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

					"tsec.exemptions.json",
					"cgmanifest.json",
				],
			),
		},
	)) satisfies Interface as Interface;
