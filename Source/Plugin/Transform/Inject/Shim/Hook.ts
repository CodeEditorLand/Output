/**
 * @module Output/Transform/Inject/Shim/Hook
 * @description
 * Injects Land's deep-shim interception layer into the VS Code workbench
 * at the earliest possible point — immediately after `IInstantiationService`
 * is created but before any contribution runs.
 *
 * Two injection sites (same pattern as ExposeWorkbenchAccessor):
 *
 *   1. `vs/workbench/browser/web.main.js` — `LandShimInit(is)` right after
 *      `const instantiationService = workbench.startup();`
 *
 *   2. `vs/workbench/electron-browser/desktop.main.js` — same, with
 *      `../browser/` import path.
 *
 * The shim module (`CEL/Land/Shim/Init.js`) is compiled by Output's esbuild
 * step and copied into Target/Microsoft/VSCode/vs/workbench/browser/ by
 * ApplyPipeline.ts BEFORE this transform runs.
 *
 * TierShim gating (compile-time):
 *   - TierShim=None → this transform is a NO-OP (no injection)
 *   - TierShim=Proxy → injects audit proxy (ServiceCollection logging)
 *   - TierShim=Replace → injects service replacement shim
 *   - TierShim=Own → injects container ownership shim
 *   - TierShim=Preempt → injects BrowserMain preemption
 *
 * Idempotent via `__LAND_SHIM_HOOK__` marker. Re-running the transform
 * on an already-patched tree is a no-op.
 */

import type { TransformPlugin } from "../../../../Type.js";

const Marker = "/* __LAND_SHIM_HOOK__ */";

const WebMainImportMarker =
	"import { mark } from '../../base/common/performance.js';";

const WebMainImportInjection =
	"\n" +
	Marker +
	"\n" +
	"import { LandShimInit } from './CEL/Land/Shim/Init.js';";

const DesktopMainImportMarker = "import { localize } from '../../nls.js';";

const DesktopMainImportInjection =
	"\n" +
	Marker +
	"\n" +
	"import { LandShimInit } from '../browser/CEL/Land/Shim/Init.js';";

const StartupMarker = "const instantiationService = workbench.startup();";

const StartupInjection =
	StartupMarker +
	"\n        " +
	Marker +
	"\n" +
	"        LandShimInit(instantiationService);";

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "InjectShimHook",

	/**
	 * Only active when TierShim is NOT None. When disabled, esbuild
	 * tree-shakes the entire Shim module — but this transform itself
	 * still needs to NOT inject anything. We check the env var here.
	 */
	Enabled: () => {
		const tier = (
			(
				globalThis as {
					process?: { env?: Record<string, string | undefined> };
				}
			).process?.env?.["TierShim"] ?? "None"
		).toLowerCase();

		return tier !== "none";
	},

	Match: ({ Path }) =>
		/\/vs\/workbench\/browser\/web\.main\.js$/.test(Path) ||
		/\/vs\/workbench\/electron-browser\/desktop\.main\.js$/.test(Path),

	Transform({ Path, Source }) {
		// Idempotency check
		if (Source.includes("__LAND_SHIM_HOOK__")) {
			return { Kind: "Unchanged" };
		}

		const IsDesktopMain =
			/\/vs\/workbench\/electron-browser\/desktop\.main\.js$/.test(Path);

		const IsWebMain = /\/vs\/workbench\/browser\/web\.main\.js$/.test(Path);

		if (!IsWebMain && !IsDesktopMain) {
			return { Kind: "Unchanged" };
		}

		// Guard: these markers must be present in the upstream source
		if (!Source.includes(StartupMarker)) {
			return { Kind: "Unchanged" };
		}

		const ImportMarker = IsDesktopMain
			? DesktopMainImportMarker
			: WebMainImportMarker;

		if (!Source.includes(ImportMarker)) {
			return { Kind: "Unchanged" };
		}

		const ImportInjection = IsDesktopMain
			? DesktopMainImportInjection
			: WebMainImportInjection;

		// Inject the import statement at the top of the module
		const Next = Source.replace(
			ImportMarker,

			ImportMarker + ImportInjection,
		).replace(StartupMarker, StartupInjection);

		return Next === Source
			? { Kind: "Unchanged" }

			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
