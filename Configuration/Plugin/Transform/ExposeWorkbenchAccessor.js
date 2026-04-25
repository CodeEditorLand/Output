const s=`// [Land] Static imports of the service decorators + ViewsRegistry
// symbols used by the \`__CEL_SERVICES__\` patch below. ESM
// imports must be at the top of the module - injecting them here
// means the symbols are in scope at the \`workbench.startup()\`
// patch site without any runtime resolution.
import { IStatusbarService as __CEL_IStatusbarService } from '../services/statusbar/browser/statusbar.js';
import { ICommandService as __CEL_ICommandService, CommandsRegistry as __CEL_CommandsRegistry } from '../../platform/commands/common/commands.js';
import { ISearchService as __CEL_ISearchService } from '../services/search/common/search.js';
import { IViewsService as __CEL_IViewsService } from '../services/views/common/viewsService.js';
import { Registry as __CEL_Registry } from '../../platform/registry/common/platform.js';`,i="import { mark } from '../../base/common/performance.js';",m=i+`
`+s,a="import { localize } from '../../nls.js';",l=a+`
`+s,o="const instantiationService = workbench.startup();",d=`const instantiationService = workbench.startup();
// [Land] Expose the live IInstantiationService + a directly-callable
// services facade on \`globalThis\` for Sky-side bridges. Imports are
// static (see header above), so the assignment is fully synchronous -
// \`__CEL_SERVICES__\` is populated before this line returns and any
// downstream listener (SkyBridge tree-view attach, command palette
// fan-out, status-bar sync) can reach it on the same microtask.
globalThis.__CEL_INSTANTIATION_SERVICE__ = instantiationService;
try {
  var __CEL_ViewsRegistryId = 'workbench.registry.view';
  globalThis.__CEL_SERVICES__ = {
    Statusbar: instantiationService.invokeFunction(function(a){ return a.get(__CEL_IStatusbarService); }),
    Commands: instantiationService.invokeFunction(function(a){ return a.get(__CEL_ICommandService); }),
    CommandRegistry: __CEL_CommandsRegistry,
    Search: instantiationService.invokeFunction(function(a){ return a.get(__CEL_ISearchService); }),
    Views: instantiationService.invokeFunction(function(a){ return a.get(__CEL_IViewsService); }),
    // \`TreeViewByViewId(id)\` resolves the workbench's ITreeView
    // instance for a registered tree view. Setting \`.dataProvider\`
    // on the returned value makes the view render its data.
    TreeViewByViewId: function(ViewId) {
      try {
        var Reg = __CEL_Registry.as(__CEL_ViewsRegistryId);
        var Desc = Reg && Reg.getView ? Reg.getView(ViewId) : null;
        return Desc && Desc.treeView ? Desc.treeView : null;
      } catch (E) { return null; }
    },
  };
  try { window.dispatchEvent(new Event('cel:services-ready')); } catch {}
  try {
    var __CEL_Inv = (globalThis.__TAURI__ && (globalThis.__TAURI__.core ? globalThis.__TAURI__.core.invoke : globalThis.__TAURI__.invoke));
    if (typeof __CEL_Inv === 'function') {
      __CEL_Inv('MountainIPCInvoke', { method: 'diagnostic:log', params: ['cel-services', 'ready (sync via static import)'] });
    }
  } catch {}
} catch (e) {
  try {
    var __CEL_InvE = (globalThis.__TAURI__ && (globalThis.__TAURI__.core ? globalThis.__TAURI__.core.invoke : globalThis.__TAURI__.invoke));
    if (typeof __CEL_InvE === 'function') {
      __CEL_InvE('MountainIPCInvoke', { method: 'diagnostic:log', params: ['cel-services', 'resolve-failed: ' + (e && e.message ? e.message : String(e))] });
    }
  } catch {}
}`,c="workbenchPromise.complete(workbench);",h=`workbenchPromise.complete(workbench);
        // [Land] Expose the IWorkbench facade + signal readiness so Sky's
        // SkyBridge + any Astro component can synchronously call
        // \`__CEL_WORKBENCH__.commands.executeCommand(\u2026)\`.
        globalThis.__CEL_WORKBENCH__ = workbench;
        try { window.dispatchEvent(new Event("cel:workbench-ready")); } catch {}`,v={Kind:"Transform",Name:"ExposeWorkbenchAccessor",Match:({Path:e})=>/\/vs\/workbench\/browser\/web\.main\.js$/.test(e)||/\/vs\/workbench\/browser\/web\.factory\.js$/.test(e)||/\/vs\/workbench\/electron-browser\/desktop\.main\.js$/.test(e),Transform({Path:e,Source:n}){if(n.includes("__CEL_INSTANTIATION_SERVICE__"))return{Kind:"Unchanged"};if(/web\.main\.js$/.test(e)||/desktop\.main\.js$/.test(e)){if(!n.includes(o))return{Kind:"Unchanged"};const t=/desktop\.main\.js$/.test(e)?a:i,_=/desktop\.main\.js$/.test(e)?l:m;if(!n.includes(t))return{Kind:"Unchanged"};let r=n.replace(t,_);return r=r.replace(o,d),r===n?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:r}}if(/web\.factory\.js$/.test(e)){if(!n.includes(c))return{Kind:"Unchanged"};const t=n.replace(c,h);return t===n?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:t}}return{Kind:"Unchanged"}}};var p=v;export{p as default};
