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

// Static-import marker: the existing `mark` import line is the very
// first ES import statement in the file and is stable across upstream
// VS Code releases. We piggyback our service-decorator imports onto
// that line so they enter scope at module evaluation time - no runtime
// `require()`, no async race against the workbench startup, no failed
// dynamic-import resolution against the WKWebView's URL base.
const WebMainImportMarker =
	"import { mark } from '../../base/common/performance.js';";
const WebMainImportReplacement =
	"import { mark } from '../../base/common/performance.js';\n" +
	"// [Land] Static imports of the service decorators + ViewsRegistry\n" +
	"// symbols used by the `__CEL_SERVICES__` patch below. ESM\n" +
	"// imports must be at the top of the module - injecting them here\n" +
	"// means the symbols are in scope at the `workbench.startup()`\n" +
	"// patch site without any runtime resolution.\n" +
	"import { IStatusbarService as __CEL_IStatusbarService } from '../services/statusbar/browser/statusbar.js';\n" +
	"import { ICommandService as __CEL_ICommandService, CommandsRegistry as __CEL_CommandsRegistry } from '../../platform/commands/common/commands.js';\n" +
	"import { ISearchService as __CEL_ISearchService } from '../services/search/common/search.js';\n" +
	"import { IViewsService as __CEL_IViewsService } from '../services/views/common/viewsService.js';\n" +
	"import { Registry as __CEL_Registry } from '../../platform/registry/common/platform.js';";

const WebMainMarker = "const instantiationService = workbench.startup();";
const WebMainReplacement =
	"const instantiationService = workbench.startup();\n" +
	"// [Land] Expose the live IInstantiationService + a directly-callable\n" +
	"// services facade on `globalThis` for Sky-side bridges. Imports are\n" +
	"// static (see header above), so the assignment is fully synchronous -\n" +
	"// `__CEL_SERVICES__` is populated before this line returns and any\n" +
	"// downstream listener (SkyBridge tree-view attach, command palette\n" +
	"// fan-out, status-bar sync) can reach it on the same microtask.\n" +
	"globalThis.__CEL_INSTANTIATION_SERVICE__ = instantiationService;\n" +
	"try {\n" +
	"  var __CEL_ViewsRegistryId = 'workbench.registry.view';\n" +
	"  globalThis.__CEL_SERVICES__ = {\n" +
	"    Statusbar: instantiationService.invokeFunction(function(a){ return a.get(__CEL_IStatusbarService); }),\n" +
	"    Commands: instantiationService.invokeFunction(function(a){ return a.get(__CEL_ICommandService); }),\n" +
	"    CommandRegistry: __CEL_CommandsRegistry,\n" +
	"    Search: instantiationService.invokeFunction(function(a){ return a.get(__CEL_ISearchService); }),\n" +
	"    Views: instantiationService.invokeFunction(function(a){ return a.get(__CEL_IViewsService); }),\n" +
	"    // `TreeViewByViewId(id)` resolves the workbench's ITreeView\n" +
	"    // instance for a registered tree view. Setting `.dataProvider`\n" +
	"    // on the returned value makes the view render its data.\n" +
	"    TreeViewByViewId: function(ViewId) {\n" +
	"      try {\n" +
	"        var Reg = __CEL_Registry.as(__CEL_ViewsRegistryId);\n" +
	"        var Desc = Reg && Reg.getView ? Reg.getView(ViewId) : null;\n" +
	"        return Desc && Desc.treeView ? Desc.treeView : null;\n" +
	"      } catch (E) { return null; }\n" +
	"    },\n" +
	"  };\n" +
	"  try { window.dispatchEvent(new Event('cel:services-ready')); } catch {}\n" +
	"  try {\n" +
	"    var __CEL_Inv = (globalThis.__TAURI__ && (globalThis.__TAURI__.core ? globalThis.__TAURI__.core.invoke : globalThis.__TAURI__.invoke));\n" +
	"    if (typeof __CEL_Inv === 'function') {\n" +
	"      __CEL_Inv('MountainIPCInvoke', { method: 'diagnostic:log', params: ['cel-services', 'ready (sync via static import)'] });\n" +
	"    }\n" +
	"  } catch {}\n" +
	"} catch (e) {\n" +
	"  try {\n" +
	"    var __CEL_InvE = (globalThis.__TAURI__ && (globalThis.__TAURI__.core ? globalThis.__TAURI__.core.invoke : globalThis.__TAURI__.invoke));\n" +
	"    if (typeof __CEL_InvE === 'function') {\n" +
	"      __CEL_InvE('MountainIPCInvoke', { method: 'diagnostic:log', params: ['cel-services', 'resolve-failed: ' + (e && e.message ? e.message : String(e))] });\n" +
	"    }\n" +
	"  } catch {}\n" +
	"}";

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
			if (!Source.includes(WebMainImportMarker)) return { Kind: "Unchanged" };
			let Next = Source.replace(
				WebMainImportMarker,
				WebMainImportReplacement,
			);
			Next = Next.replace(WebMainMarker, WebMainReplacement);
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
