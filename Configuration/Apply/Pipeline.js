var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import ApplyPlugins from "../Plugin/Apply.js";
const Configuration = await import("../Plugin/Index.js");
const ServiceCopies = [
  {
    From: "Configuration/Service/Tauri/Main/Process/Service.js",
    To: "Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/TauriMainProcessService.js",
    Why: "Source authored at Source/Service/Tauri/Main/Process/Service.ts (split reverse-hierarchically: every leaf is a single word). ReplaceElectronIPCService rewrites VS Code's mainProcessService.js to `import './TauriMainProcessService.js'` so the destination filename keeps the legacy compound name the workbench expects."
  },
  {
    From: "Configuration/Service/CEL/Expose/Accessor.js",
    To: "Target/Microsoft/VSCode/vs/workbench/browser/CELExposeAccessor.js",
    Why: "ExposeWorkbenchAccessor injects `import './CELExposeAccessor.js'` into web.main.js + web.factory.js (and `'../browser/CELExposeAccessor.js'` into desktop.main.js). Source split into CEL/Expose/Accessor.ts; destination filename retains the compound to match the runtime import strings."
  },
  {
    From: "Configuration/Service/CEL/Shared/Process/Service.js",
    To: "Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/CELSharedProcessService.js",
    Why: "ReplaceSharedProcess reduces sharedProcessService.js to a one-line re-export pointing at this canonical sibling of TauriMainProcessService. Drop colocated so the `import './TauriMainProcessService.js'` inside the shim resolves directly."
  },
  {
    From: "Configuration/Service/CEL/Extensions/Scanner/Service.js",
    To: "Target/Microsoft/VSCode/vs/workbench/services/extensions/common/CELExtensionsScannerService.js",
    Why: "ExtensionScannerIPC reduces both electron-browser/ and browser/ variants of extensionsScannerService.js to one-line re-exports pointing at this `common/` sibling. Single canonical drop avoids divergence between the two variants."
  },
  {
    From: "Configuration/Service/CEL/Search/Service.js",
    To: "Target/Microsoft/VSCode/vs/workbench/services/search/common/CELSearchService.js",
    Why: "ReplaceSearchService reduces both electron-browser/ and browser/ variants of searchService.js to one-line re-exports pointing at this `common/` sibling so the Mountain-IPC-backed RemoteSearchService is a single source of truth."
  },
  {
    From: "Configuration/Service/CEL/Null/Telemetry/Service.js",
    To: "Target/Microsoft/VSCode/vs/platform/telemetry/common/CELNullTelemetryService.js",
    Why: "ReplaceTelemetryService reduces telemetryService.js to a one-line re-export pointing at this no-op sibling. Telemetry is neutralised in three layers (consent off + service no-op + appender absent); this is the second layer."
  },
  {
    From: "Configuration/Service/CEL/Null/Update/Service.js",
    To: "Target/Microsoft/VSCode/vs/platform/update/common/CELNullUpdateService.js",
    Why: "ReplaceUpdateService reduces both abstractUpdateService.js and updateService.js to one-line re-exports pointing at this never-update stub. Auto-update goes through Air's signed-binary path, not update.code.visualstudio.com."
  },
  {
    From: "Configuration/Service/CEL/Null/Extension/Gallery/Service.js",
    To: "Target/Microsoft/VSCode/vs/platform/extensionManagement/common/CELNullExtensionGalleryService.js",
    Why: "ReplaceExtensionGalleryService reduces extensionGalleryService.js to a one-line re-export pointing at this no-op stub. User extensions are sideloaded from ~/.land/extensions/ - no marketplace traffic."
  }
];
for (const Entry of ServiceCopies) {
  const From = resolve(process.cwd(), Entry.From);
  const To = resolve(process.cwd(), Entry.To);
  await mkdir(dirname(To), { recursive: true });
  await copyFile(From, To);
  console.log(`[Output/Pipeline] Copied ${Entry.From} -> ${To}`);
}
const Pipeline = [
  Configuration.InjectNameShim,
  Configuration.InjectWorkerBootstrapShim,
  Configuration.RewriteNestedWorkerBootstrap,
  Configuration.RewritePerfBaselineWorker,
  Configuration.RewriteNodeModulesPath,
  Configuration.InjectWebViewPolyfills,
  Configuration.RewriteWorkerURLs,
  Configuration.RewriteWorkbenchBaseURL,
  Configuration.RewriteStaticBlockSelfRef,
  Configuration.HoistFunctionDeclarations,
  Configuration.ReplaceElectronIPCService,
  Configuration.ReplaceSharedProcess,
  Configuration.StripDanglingSourceMap,
  Configuration.ExtensionScannerIPC,
  Configuration.CatchOutputFolderRejection,
  Configuration.StripWebviewIframeSandbox,
  // Default `disableServiceWorker = true` in the webview iframe shell
  // so the bootstrap `await workerReady` resolves immediately on
  // WKWebView - SW registration on the `vscode-webview://` custom
  // protocol rejects, and the iframe's `content` handler bails on the
  // rejection without rendering. Without this every extension webview
  // hangs at the empty pre/index.html chrome.
  Configuration.PatchWebviewIframeServiceWorker,
  Configuration.ExposeWorkbenchAccessor,
  Configuration.InstrumentVscodeGit,
  Configuration.DisableUnusedServices,
  Configuration.ReplaceSearchService,
  Configuration.PatchLocalTerminalBackend,
  // `globalThis.__CEL_OVERRIDE_CONFIG__` consult before upstream's
  // default→user→workspace→folder→override chain. Opt-in; empty bag
  // preserves upstream behaviour.
  Configuration.InjectConfigurationOverlay,
  // `globalThis.__CEL_OVERRIDE_STORAGE__` consult on every typed
  // read of `AbstractStorageService`. Composite key `<scope>:<key>`.
  Configuration.InjectStorageOverlay,
  // Wrap `iconsStyleSheet.js`'s `getCSS()` to rewrite emitted
  // `@font-face` `vscode-file://vscode-app` URLs to same-origin
  // paths the WKWebView can fetch. Fixes blank-glyph activity-bar
  // icons for every extension-contributed codicon font.
  Configuration.RewriteIconsStyleSheetURLs
];
const Target = resolve(process.cwd(), "Target/Microsoft/VSCode");
const Outcome = await ApplyPlugins({
  Plugins: Pipeline,
  Roots: [{ Path: Target, Role: "app" }],
  Log: /* @__PURE__ */ __name((Message) => console.log(`[Output/Pipeline] ${Message}`), "Log")
});
const RewrittenTotal = Outcome.Transform.reduce(
  (Sum, Item) => Sum + Item.Rewritten,
  0
);
console.log(
  `[Output/Pipeline] Done: ${Outcome.Transform.length} transforms, ${RewrittenTotal} files rewritten.`
);
var Pipeline_default = {};
export {
  Pipeline_default as default
};
//# sourceMappingURL=Pipeline.js.map
