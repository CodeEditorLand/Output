const i=`// [Land] Static imports of the service decorators + ViewsRegistry
// symbols used by the \`__CEL_SERVICES__\` patch below. ESM
// imports must be at the top of the module - injecting them here
// means the symbols are in scope at the \`workbench.startup()\`
// patch site without any runtime resolution.
import { IStatusbarService as __CEL_IStatusbarService } from '../services/statusbar/browser/statusbar.js';
import { ICommandService as __CEL_ICommandService, CommandsRegistry as __CEL_CommandsRegistry } from '../../platform/commands/common/commands.js';
import { ISearchService as __CEL_ISearchService } from '../services/search/common/search.js';
import { IViewsService as __CEL_IViewsService } from '../services/views/common/viewsService.js';
import { Registry as __CEL_Registry } from '../../platform/registry/common/platform.js';
// [Land] \`URI\` (\`vscode-uri\` flavour as bundled by VS Code) is needed
// by SkyBridge's search provider so result rows carry real URI
// instances - the workbench's SearchService dedups results by
// \`getComparisonKey(uri)\` which calls \`uri.with(...)\`. Returning
// raw \`URIComponents\` POJOs throws \`uri.with is not a function\`.
import { URI as __CEL_URI } from '../../base/common/uri.js';
// [Land] SCM, Debug, CustomEditor service decorators - exposed so
// SkyBridge can register in-process providers that mirror the
// extension-host registrations Cocoon emits via \`sky://scm/*\`,
// \`sky://debug/*\`, \`sky://customEditor/*\` events. Without this,
// the workbench's MainThread* class never sees the extension
// registration and the corresponding viewlet (SCM panel, debug
// configurations dropdown, custom editor type) stays empty.
import { ISCMService as __CEL_ISCMService } from '../contrib/scm/common/scm.js';
import { IDebugService as __CEL_IDebugService } from '../contrib/debug/common/debug.js';
import { ICustomEditorService as __CEL_ICustomEditorService } from '../contrib/customEditor/common/customEditor.js';
import { Emitter as __CEL_Emitter } from '../../base/common/event.js';
import { Disposable as __CEL_Disposable, toDisposable as __CEL_toDisposable } from '../../base/common/lifecycle.js';
// [Land] IModelService + ILanguageService - needed by the SkyBridge
// SCM provider shim's \`inputBoxTextModel\`. Workbench's
// MainThreadSCMProvider requires a real \`ITextModel\` (constructed
// here via \`modelService.createModel('', langSelection, uri)\`).
// Without these, the shim's \`inputBoxTextModel: null\` makes
// \`__CEL_SERVICES__.SCM.registerSCMProvider(...)\` throw and the
// bridge silently falls back to CustomEvent dispatch.
import { IModelService as __CEL_IModelService } from '../../editor/common/services/model.js';
import { ILanguageService as __CEL_ILanguageService } from '../../editor/common/languages/language.js';
// [Land] ResourceTree class - needed by the SkyBridge SCM provider
// shim's \`group.resourceTree\` getter. Workbench's SCM repository
// pane reads this to render hierarchical group children. Without
// a real instance the panel crashes on grouped-tree mode; a fresh
// empty ResourceTree per group renders cleanly.
import { ResourceTree as __CEL_ResourceTree } from '../../base/common/resourceTree.js';
import { IUriIdentityService as __CEL_IUriIdentityService } from '../../platform/uriIdentity/common/uriIdentity.js';
// [Land] IWebviewViewService - the workbench's resolver registry
// for sidebar/panel webview content. Exposing this lets
// \`SkyBridge.ts:Register('sky://webview/registerView', ...)\`
// register a resolver per Cocoon-registered view; when the user
// reveals an extension's sidebar panel the workbench invokes
// the resolver, the resolver fires \`webview.resolveView\`
// reverse-RPC into Cocoon, and the extension's
// \`resolveWebviewView(view, ctx)\` callback paints the panel.
import { IWebviewViewService as __CEL_IWebviewViewService } from '../contrib/webviewView/browser/webviewViewService.js';
// [Land] IMarkerService - the workbench's diagnostic store. Mountain
// emits \`sky://diagnostics/changed\` after each \`Diagnostic.Set\` from
// Cocoon; SkyBridge needs to call \`Markers.changeOne(owner, uri,
// markers)\` to push into this service so red squiggles paint in the
// editor and the Problems panel populates. Without this exposure,
// every diagnostic from every language extension (rust-analyzer,
// TypeScript, ESLint, ...) is invisible.
import { IMarkerService as __CEL_IMarkerService } from '../../platform/markers/common/markers.js';`,s="import { mark } from '../../base/common/performance.js';",u=s+`
`+i,o="import { localize } from '../../nls.js';",d=o+`
`+i,a="const instantiationService = workbench.startup();",h=`const instantiationService = workbench.startup();
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
    Statusbar: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_IStatusbarService); }); } catch (E) { return null; } })(),
    Commands: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_ICommandService); }); } catch (E) { return null; } })(),
    CommandRegistry: __CEL_CommandsRegistry,
    Search: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_ISearchService); }); } catch (E) { return null; } })(),
    Views: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_IViewsService); }); } catch (E) { return null; } })(),
    // \`URI\` (real class with \`.with()\`, \`.fsPath\`, \`.toString()\`)
    // exposed so Sky-side bridges can build resource objects the
    // workbench accepts directly (no \`URI.revive\` round-trip).
    URI: __CEL_URI,
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
    // \`ViewRegistrySnapshot()\` returns counts + sample IDs for the
    // workbench's ViewContainersRegistry and ViewsRegistry. Used by
    // SkyBridge's diagnostic probe to confirm extension manifests
    // (Roo, Claude, gitlens, ...) reached \`viewsExtensionPoint\`'s
    // setHandler - if extension panels don't open, the most common
    // cause is that contributions never made it through
    // \`IExtensionService\` to the registry, so the activity bar has
    // no clickable entry point. This accessor lives where
    // \`__CEL_Registry\` is in scope; SkyBridge can't reach the same
    // Registry instance from its own module graph.
    ViewRegistrySnapshot: function() {
      try {
        // Stock VS Code's registry IDs (see
        // \`vs/workbench/common/views.ts:35\` -
        // \`'workbench.registry.view.containers'\` /
        // \`'workbench.registry.view'\`). The previous attempt at
        // \`'workbench.view.containersRegistry'\` was a guessed
        // dotted name; \`Registry.as\` returned null and the probe
        // reported \`containers=0\` even though the workbench had
        // dozens of contributions.
        var ContainersReg = __CEL_Registry.as('workbench.registry.view.containers');
        var ViewsReg = __CEL_Registry.as(__CEL_ViewsRegistryId);
        var Locations = (ContainersReg && ContainersReg.all) ? ContainersReg.all : [];
        var ContainerIds = [];
        for (var I = 0; I < Locations.length; I++) {
          ContainerIds.push(String((Locations[I] && Locations[I].id) || '<no-id>'));
        }
        var ViewIds = [];
        try {
          for (var J = 0; J < Locations.length; J++) {
            var Views = (ViewsReg && ViewsReg.getViews) ? ViewsReg.getViews(Locations[J]) : [];
            for (var K = 0; K < Views.length; K++) {
              ViewIds.push(String((Views[K] && Views[K].id) || '<no-id>'));
            }
          }
        } catch (E2) { /* swallow per-container failure */ }
        return {
          containers: ContainerIds.length,
          views: ViewIds.length,
          // Bumped from 16 to all - 35 containers / 79 views
          // is small enough to log in full, and sampling at 16
          // hid Roo / other extension contributions past the
          // first chunk so triage couldn't tell whether they
          // were registered or missing.
          containerSample: ContainerIds,
          viewSample: ViewIds,
        };
      } catch (E) {
        return { containers: -1, views: -1, error: String(E && E.message ? E.message : E) };
      }
    },
    // SCM/Debug/CustomEditor service handles. Each may be \`null\`
    // if the contrib failed to load (e.g. headless web profile).
    // SkyBridge null-checks before each call so missing services
    // degrade silently instead of crashing the bridge.
    SCM: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_ISCMService); }); } catch (E) { return null; } })(),
    Debug: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_IDebugService); }); } catch (E) { return null; } })(),
    CustomEditor: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_ICustomEditorService); }); } catch (E) { return null; } })(),
    // \`Emitter\` + \`Disposable\`/\`toDisposable\` are needed by the
    // SCM provider shim in SkyBridge - the workbench's ISCMService
    // expects providers to expose \`onDidChange*: Event<T>\` whose
    // shape matches \`vs/base/common/event.js::Emitter\`'s \`event\`
    // property. Re-creating those classes outside the bundled
    // module would not interop because instanceof checks fail.
    Emitter: __CEL_Emitter,
    Disposable: __CEL_Disposable,
    ToDisposable: __CEL_toDisposable,
    // Model + language services - the SCM provider shim uses these
    // to build a real \`ITextModel\` for the inputBox before calling
    // \`SCM.registerSCMProvider\`. \`Languages\` may be \`null\` if the
    // language registry hasn't booted; SkyBridge falls back to
    // plaintext (\`null\` languageSelection) in that case.
    Models: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_IModelService); }); } catch (E) { return null; } })(),
    Languages: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_ILanguageService); }); } catch (E) { return null; } })(),
    // ResourceTree class + UriIdentity for the SCM shim's group
    // resourceTree getter. ResourceTree's constructor signature is
    // \`new ResourceTree(context, rootUri, extUri)\` where extUri is
    // \`IUriIdentityService.extUri\`. We expose both so SkyBridge
    // can construct an instance without re-resolving the service.
    ResourceTree: __CEL_ResourceTree,
    UriIdentity: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_IUriIdentityService); }); } catch (E) { return null; } })(),
    // WebviewViews resolver registry - SkyBridge's
    // \`sky://webview/registerView\` listener calls
    // \`WebviewViews.register(viewType, resolver)\` so the workbench
    // knows how to populate the panel when the user reveals it.
    WebviewViews: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_IWebviewViewService); }); } catch (E) { return null; } })(),
    // IMarkerService - SkyBridge wires \`cel:diagnostics:changed\` ->
    // \`Markers.changeOne(owner, uri, markers)\` so extension-supplied
    // diagnostics paint in the editor + Problems panel. Null-safe
    // because the marker contrib may not have loaded in headless
    // profiles.
    Markers: (function(){ try { return instantiationService.invokeFunction(function(a){ return a.get(__CEL_IMarkerService); }); } catch (E) { return null; } })(),
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
}`,c="workbenchPromise.complete(workbench);",m=`workbenchPromise.complete(workbench);
        // [Land] Expose the IWorkbench facade + signal readiness so Sky's
        // SkyBridge + any Astro component can synchronously call
        // \`__CEL_WORKBENCH__.commands.executeCommand(\u2026)\`.
        globalThis.__CEL_WORKBENCH__ = workbench;
        try { window.dispatchEvent(new Event("cel:workbench-ready")); } catch {}`,_={Kind:"Transform",Name:"ExposeWorkbenchAccessor",Match:({Path:e})=>/\/vs\/workbench\/browser\/web\.main\.js$/.test(e)||/\/vs\/workbench\/browser\/web\.factory\.js$/.test(e)||/\/vs\/workbench\/electron-browser\/desktop\.main\.js$/.test(e),Transform({Path:e,Source:n}){if(n.includes("__CEL_INSTANTIATION_SERVICE__"))return{Kind:"Unchanged"};if(/web\.main\.js$/.test(e)||/desktop\.main\.js$/.test(e)){if(!n.includes(a))return{Kind:"Unchanged"};const r=/desktop\.main\.js$/.test(e)?o:s,l=/desktop\.main\.js$/.test(e)?d:u;if(!n.includes(r))return{Kind:"Unchanged"};let t=n.replace(r,l);return t=t.replace(a,h),t===n?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:t}}if(/web\.factory\.js$/.test(e)){if(!n.includes(c))return{Kind:"Unchanged"};const r=n.replace(c,m);return r===n?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:r}}return{Kind:"Unchanged"}}};var g=_;export{g as default};
