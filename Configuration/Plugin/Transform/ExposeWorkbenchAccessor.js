var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const SharedImportLines = "// [Land] Static imports of the service decorators + ViewsRegistry\n// symbols used by the `__CEL_SERVICES__` patch below. ESM\n// imports must be at the top of the module - injecting them here\n// means the symbols are in scope at the `workbench.startup()`\n// patch site without any runtime resolution.\nimport { IStatusbarService as __CEL_IStatusbarService } from '../services/statusbar/browser/statusbar.js';\nimport { ICommandService as __CEL_ICommandService, CommandsRegistry as __CEL_CommandsRegistry } from '../../platform/commands/common/commands.js';\nimport { ISearchService as __CEL_ISearchService } from '../services/search/common/search.js';\nimport { IViewsService as __CEL_IViewsService } from '../services/views/common/viewsService.js';\nimport { Registry as __CEL_Registry } from '../../platform/registry/common/platform.js';\n// [Land] `URI` (`vscode-uri` flavour as bundled by VS Code) is needed\n// by SkyBridge's search provider so result rows carry real URI\n// instances - the workbench's SearchService dedups results by\n// `getComparisonKey(uri)` which calls `uri.with(...)`. Returning\n// raw `URIComponents` POJOs throws `uri.with is not a function`.\nimport { URI as __CEL_URI } from '../../base/common/uri.js';";
const WebMainImportMarker = "import { mark } from '../../base/common/performance.js';";
const WebMainImportReplacement = WebMainImportMarker + "\n" + SharedImportLines;
const DesktopMainImportMarker = "import { localize } from '../../nls.js';";
const DesktopMainImportReplacement = DesktopMainImportMarker + "\n" + SharedImportLines;
const WebMainMarker = "const instantiationService = workbench.startup();";
const WebMainReplacement = "const instantiationService = workbench.startup();\n// [Land] Expose the live IInstantiationService + a directly-callable\n// services facade on `globalThis` for Sky-side bridges. Imports are\n// static (see header above), so the assignment is fully synchronous -\n// `__CEL_SERVICES__` is populated before this line returns and any\n// downstream listener (SkyBridge tree-view attach, command palette\n// fan-out, status-bar sync) can reach it on the same microtask.\nglobalThis.__CEL_INSTANTIATION_SERVICE__ = instantiationService;\ntry {\n  var __CEL_ViewsRegistryId = 'workbench.registry.view';\n  globalThis.__CEL_SERVICES__ = {\n    Statusbar: instantiationService.invokeFunction(function(a){ return a.get(__CEL_IStatusbarService); }),\n    Commands: instantiationService.invokeFunction(function(a){ return a.get(__CEL_ICommandService); }),\n    CommandRegistry: __CEL_CommandsRegistry,\n    Search: instantiationService.invokeFunction(function(a){ return a.get(__CEL_ISearchService); }),\n    Views: instantiationService.invokeFunction(function(a){ return a.get(__CEL_IViewsService); }),\n    // `URI` (real class with `.with()`, `.fsPath`, `.toString()`)\n    // exposed so Sky-side bridges can build resource objects the\n    // workbench accepts directly (no `URI.revive` round-trip).\n    URI: __CEL_URI,\n    // `TreeViewByViewId(id)` resolves the workbench's ITreeView\n    // instance for a registered tree view. Setting `.dataProvider`\n    // on the returned value makes the view render its data.\n    TreeViewByViewId: function(ViewId) {\n      try {\n        var Reg = __CEL_Registry.as(__CEL_ViewsRegistryId);\n        var Desc = Reg && Reg.getView ? Reg.getView(ViewId) : null;\n        return Desc && Desc.treeView ? Desc.treeView : null;\n      } catch (E) { return null; }\n    },\n  };\n  try { window.dispatchEvent(new Event('cel:services-ready')); } catch {}\n  try {\n    var __CEL_Inv = (globalThis.__TAURI__ && (globalThis.__TAURI__.core ? globalThis.__TAURI__.core.invoke : globalThis.__TAURI__.invoke));\n    if (typeof __CEL_Inv === 'function') {\n      __CEL_Inv('MountainIPCInvoke', { method: 'diagnostic:log', params: ['cel-services', 'ready (sync via static import)'] });\n    }\n  } catch {}\n} catch (e) {\n  try {\n    var __CEL_InvE = (globalThis.__TAURI__ && (globalThis.__TAURI__.core ? globalThis.__TAURI__.core.invoke : globalThis.__TAURI__.invoke));\n    if (typeof __CEL_InvE === 'function') {\n      __CEL_InvE('MountainIPCInvoke', { method: 'diagnostic:log', params: ['cel-services', 'resolve-failed: ' + (e && e.message ? e.message : String(e))] });\n    }\n  } catch {}\n}";
const WebFactoryMarker = "workbenchPromise.complete(workbench);";
const WebFactoryReplacement = 'workbenchPromise.complete(workbench);\n        // [Land] Expose the IWorkbench facade + signal readiness so Sky\'s\n        // SkyBridge + any Astro component can synchronously call\n        // `__CEL_WORKBENCH__.commands.executeCommand(\u2026)`.\n        globalThis.__CEL_WORKBENCH__ = workbench;\n        try { window.dispatchEvent(new Event("cel:workbench-ready")); } catch {}';
const Plugin = {
  Kind: "Transform",
  Name: "ExposeWorkbenchAccessor",
  Match: /* @__PURE__ */ __name(({ Path }) => /\/vs\/workbench\/browser\/web\.main\.js$/.test(Path) || /\/vs\/workbench\/browser\/web\.factory\.js$/.test(Path) || /\/vs\/workbench\/electron-browser\/desktop\.main\.js$/.test(Path), "Match"),
  Transform({ Path, Source }) {
    if (Source.includes("__CEL_INSTANTIATION_SERVICE__")) {
      return { Kind: "Unchanged" };
    }
    if (/web\.main\.js$/.test(Path) || /desktop\.main\.js$/.test(Path)) {
      if (!Source.includes(WebMainMarker)) return { Kind: "Unchanged" };
      const ImportMarker = /desktop\.main\.js$/.test(Path) ? DesktopMainImportMarker : WebMainImportMarker;
      const ImportReplacement = /desktop\.main\.js$/.test(Path) ? DesktopMainImportReplacement : WebMainImportReplacement;
      if (!Source.includes(ImportMarker)) return { Kind: "Unchanged" };
      let Next = Source.replace(ImportMarker, ImportReplacement);
      Next = Next.replace(WebMainMarker, WebMainReplacement);
      return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
    }
    if (/web\.factory\.js$/.test(Path)) {
      if (!Source.includes(WebFactoryMarker)) return { Kind: "Unchanged" };
      const Next = Source.replace(WebFactoryMarker, WebFactoryReplacement);
      return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
    }
    return { Kind: "Unchanged" };
  }
};
var ExposeWorkbenchAccessor_default = Plugin;
export {
  ExposeWorkbenchAccessor_default as default
};
//# sourceMappingURL=ExposeWorkbenchAccessor.js.map
