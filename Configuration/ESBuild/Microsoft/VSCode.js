var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const On = (await import("../../ESBuild.js")).On;
const Prefix = "vs";
const Dependency = (await import("../../ESBuild.js")).Dependency;
var VSCode_default = /* @__PURE__ */ __name(
	async (Current) =>
		(await import("deepmerge-ts")).deepmerge(
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
				target: ((Browser) => {
					const Target = /* @__PURE__ */ new Set();
					const Supported = /* @__PURE__ */ new Set([
						"chrome",
						"edge",
						"firefox",
						"ios",
						"safari",
						"opera",
					]);
					const _Map = {
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
				).default(Current, [
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
				]),
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
											`Build '../../Dependency/Microsoft/Dependency/Editor/src/**/*.d.ts' 											--ESBuild Configuration/ESBuild/${Dependency}/Declaration.js 											--TypeScript Configuration/tsconfig/${Dependency}/tsconfig.Declaration.json`,
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
		),
	"default",
);
export { Dependency, On, Prefix, VSCode_default as default };
//# sourceMappingURL=VSCode.js.map
