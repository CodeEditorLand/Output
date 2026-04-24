/**
 * Step: expose the workbench `IWorkbench` facade + its `IInstantiationService`
 * on `globalThis` so Land's Sky-side bridge code can call into the workbench's
 * internal services (`IStatusbarService`, `ISCMService`, `ICommandService`, …)
 * without re-implementing a parallel UI surface.
 *
 * Why a transform and not a runtime hook:
 *   Stock VS Code's `web.factory.js::create()` awaits `BrowserMain.open()`
 *   internally and completes `workbenchPromise` with the resulting IWorkbench.
 *   The IIFE in `workbench.js` never awaits that promise - it registers a
 *   disposable and returns. There is no public API to obtain the live
 *   `IInstantiationService` from outside the workbench once it boots, and the
 *   `IWorkbench` facade intentionally omits direct service access. Patching
 *   the compiled output files with two narrow additive rewrites is the least
 *   invasive path that preserves stock behaviour for every call site that
 *   does not use Land's bridge.
 *
 * Two files are patched:
 *
 *   1. `vs/workbench/browser/web.main.js` (BrowserMain.open) - right after
 *      `const instantiationService = workbench.startup();` we stash the live
 *      service so Sky can do
 *        `__CEL_INSTANTIATION_SERVICE__.invokeFunction(a => a.get(I…))`
 *      to resolve any workbench service at call time.
 *
 *   2. `vs/workbench/browser/web.factory.js` (`create()` .then callback) -
 *      after `instantiatedWorkbench = workbench; workbenchPromise.complete(…);`
 *      we also stash the IWorkbench facade and fire a `cel:workbench-ready`
 *      DOM event so Sky-side listeners that were waiting on the workbench
 *      being fully attached to the DOM can fire synchronously.
 *
 * Both injections are idempotent (`indexOf('__CEL_INSTANTIATION_SERVICE__')`
 * short-circuits) so re-running the transform on an already-patched tree is
 * a no-op. The transform only touches the two files above - every other
 * module in `vs/workbench/browser` is passed through untouched.
 */

import type { TransformPlugin } from "../Type.js";

const WebMainMarker = "const instantiationService = workbench.startup();";
const WebMainReplacement =
	"const instantiationService = workbench.startup();\n" +
	"// [Land] Expose the live workbench IInstantiationService so Sky-side\n" +
	"// bridges can resolve internal services (IStatusbarService, ISCMService,\n" +
	"// ICommandService, …) via\n" +
	"//   __CEL_INSTANTIATION_SERVICE__.invokeFunction(a => a.get(I…))\n" +
	"globalThis.__CEL_INSTANTIATION_SERVICE__ = instantiationService;";

const WebFactoryMarker = "workbenchPromise.complete(workbench);";
const WebFactoryReplacement =
	"workbenchPromise.complete(workbench);\n" +
	"        // [Land] Expose the IWorkbench facade + signal readiness so Sky's\n" +
	"        // SkyBridge + any Astro component can synchronously call\n" +
	"        // `__CEL_WORKBENCH__.commands.executeCommand(…)`.\n" +
	"        globalThis.__CEL_WORKBENCH__ = workbench;\n" +
	'        try { window.dispatchEvent(new Event("cel:workbench-ready")); } catch {}';

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ExposeWorkbenchAccessor",
	Match: ({ Path }) =>
		/\/vs\/workbench\/browser\/web\.main\.js$/.test(Path) ||
		/\/vs\/workbench\/browser\/web\.factory\.js$/.test(Path),
	Transform({ Path, Source }) {
		if (Source.includes("__CEL_INSTANTIATION_SERVICE__")) {
			// Already patched in a previous build pass.
			return { Kind: "Unchanged" };
		}
		if (/web\.main\.js$/.test(Path)) {
			if (!Source.includes(WebMainMarker)) return { Kind: "Unchanged" };
			const Next = Source.replace(WebMainMarker, WebMainReplacement);
			return Next === Source
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: Next };
		}
		if (/web\.factory\.js$/.test(Path)) {
			if (!Source.includes(WebFactoryMarker)) return { Kind: "Unchanged" };
			const Next = Source.replace(WebFactoryMarker, WebFactoryReplacement);
			return Next === Source
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: Next };
		}
		return { Kind: "Unchanged" };
	},
};

export default Plugin;
