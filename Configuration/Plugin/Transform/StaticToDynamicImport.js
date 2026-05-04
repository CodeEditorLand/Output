var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "workbench/workbench.desktop.main.js".replaceAll("/", "\\/");
const PathRegex = new RegExp(`${Marker}$`);
const SideEffectRE = /^import\s+['"]([^'"]+)['"]\s*;?\s*$/gm;
const Plugin = {
	Kind: "Transform",
	Name: "StaticToDynamicImport",
	Enabled: /* @__PURE__ */ __name(
		() =>
			process.env["Electron"] === "true" && // `Pack` is the space-separated list of bundled-workbench variants
			// (`electron`, `browser`, `sessions`, `workbench`) - set by every
			// `*-bundled` profile in `Maintain/{Release,Debug}/Build.sh`. When
			// any variant is selected, Sky's Vite handles the import graph;
			// rewriting here would defeat that.
			!(process.env["Pack"] ?? "").trim(),
		"Enabled",
	),
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform({ Source }) {
		const Imports = [];
		let MatchResult;
		SideEffectRE.lastIndex = 0;
		while ((MatchResult = SideEffectRE.exec(Source)) !== null) {
			Imports.push(MatchResult[1]);
		}
		if (Imports.length === 0) return { Kind: "Unchanged" };
		const Lines = [
			`// Sequential dynamic import loader (Plugin/StaticToDynamicImport)`,
			`import { registerSingleton } from '../platform/instantiation/common/extensions.js';`,
			`import { IUserDataInitializationService, UserDataInitializationService } from './services/userData/browser/userDataInit.js';`,
			`import { SyncDescriptor } from '../platform/instantiation/common/descriptors.js';`,
			``,
			`console.log("[workbench.desktop.main] Loading ${Imports.length} modules sequentially...");`,
			`const _t0 = performance.now();`,
			`let _n = 0;`,
			...Imports.map(
				(Path, Index) =>
					`try{await import('${Path}');_n++;${Index % 10 === 0 ? `console.log("[workbench.desktop.main] "+_n+"/${Imports.length}: ${Path}");` : ""}}catch(_e){console.error("[workbench.desktop.main] FAILED #${Index}: ${Path}",_e)}`,
			),
			`console.log("[workbench.desktop.main] Done: "+_n+"/${Imports.length} in "+(performance.now()-_t0).toFixed(0)+"ms");`,
			``,
			`registerSingleton(IUserDataInitializationService, new SyncDescriptor(UserDataInitializationService, [[]], true));`,
			`export { main } from './electron-browser/desktop.main.js';`,
		];
		return { Kind: "Rewrite", Source: Lines.join("\n") };
	},
};
var StaticToDynamicImport_default = Plugin;
export { StaticToDynamicImport_default as default };
//# sourceMappingURL=StaticToDynamicImport.js.map
