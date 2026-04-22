/**
 * Step 10: Rewrite `workbench.desktop.main.js` from 3385 static side-effect
 * imports into a sequential dynamic-import loop.
 *
 * WKWebView's module loader serialises all static imports on the main thread
 * and throttles hard past ~1k. Sequential `await import()` with try/catch
 * keeps every module on its own microtask, surfaces per-module failures,
 * and lets the webview paint between loads. The preamble also re-registers
 * the `IUserDataInitializationService` singleton that the upstream barrel
 * registers as a side-effect of its own top-level statements.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "workbench/workbench.desktop.main.js".replaceAll("/", "\\/");
const PathRegex = new RegExp(`${Marker}$`);
const SideEffectRE = /^import\s+['"]([^'"]+)['"]\s*;?\s*$/gm;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "StaticToDynamicImport",
	Enabled: () => process.env["Electron"] === "true",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		const Imports: string[] = [];
		let MatchResult: RegExpExecArray | null;
		SideEffectRE.lastIndex = 0;
		while ((MatchResult = SideEffectRE.exec(Source)) !== null) {
			Imports.push(MatchResult[1]!);
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
					`try{await import('${Path}');_n++;${
						Index % 10 === 0
							? `console.log("[workbench.desktop.main] "+_n+"/${Imports.length}: ${Path}");`
							: ""
					}}catch(_e){console.error("[workbench.desktop.main] FAILED #${Index}: ${Path}",_e)}`,
			),
			`console.log("[workbench.desktop.main] Done: "+_n+"/${Imports.length} in "+(performance.now()-_t0).toFixed(0)+"ms");`,
			``,
			`registerSingleton(IUserDataInitializationService, new SyncDescriptor(UserDataInitializationService, [[]], true));`,
			`export { main } from './electron-browser/desktop.main.js';`,
		];
		return { Kind: "Rewrite", Source: Lines.join("\n") };
	},
};

export default Plugin;
