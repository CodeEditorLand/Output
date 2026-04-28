var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import {
  CopyNodeModules as CopyNodeModulesFactory
} from "./Copy/CopyNodeModules.js";
import {
  CopyTauriMainProcessService as CopyTauriMainProcessServiceFactory
} from "./Copy/CopyTauriMainProcessService.js";
import {
  CopyVSOutput as CopyVSOutputFactory
} from "./Copy/CopyVSOutput.js";
import {
  CopyVSRootFiles as CopyVSRootFilesFactory
} from "./Copy/CopyVSRootFiles.js";
import {
  CopyWorker as CopyWorkerFactory
} from "./Copy/CopyWorker.js";
import {
  StubUnpublishedAddons as StubUnpublishedAddonsFactory
} from "./Copy/StubUnpublishedAddons.js";
import {
  SupplementFromDependency as SupplementFromDependencyFactory
} from "./Copy/SupplementFromDependency.js";
import CatchOutputFolderRejection from "./Transform/CatchOutputFolderRejection.js";
import DisableUnusedServices from "./Transform/DisableUnusedServices.js";
import ExposeWorkbenchAccessor from "./Transform/ExposeWorkbenchAccessor.js";
import ExtensionScannerIPC from "./Transform/ExtensionScannerIPC.js";
import InjectNameShim from "./Transform/InjectNameShim.js";
import InjectWebViewPolyfills from "./Transform/InjectWebViewPolyfills.js";
import InjectWorkerBootstrapShim from "./Transform/InjectWorkerBootstrapShim.js";
import RewriteNestedWorkerBootstrap from "./Transform/RewriteNestedWorkerBootstrap.js";
import InlineCSSImport from "./Transform/InlineCSSImport.js";
import InstrumentVscodeGit from "./Transform/InstrumentVscodeGit.js";
import PatchLocalTerminalBackend from "./Transform/PatchLocalTerminalBackend.js";
import ReplaceElectronIPCService from "./Transform/ReplaceElectronIPCService.js";
import ReplaceSearchService from "./Transform/ReplaceSearchService.js";
import ReplaceSharedProcess from "./Transform/ReplaceSharedProcess.js";
import HoistFunctionDeclarations from "./Transform/HoistFunctionDeclarations.js";
import RewriteStaticBlockSelfRef from "./Transform/RewriteStaticBlockSelfRef.js";
import RewriteWorkbenchBaseURL from "./Transform/RewriteWorkbenchBaseURL.js";
import RewriteWorkerURLs from "./Transform/RewriteWorkerURLs.js";
import StaticToDynamicImport from "./Transform/StaticToDynamicImport.js";
import StripCSSImport from "./Transform/StripCSSImport.js";
import StripDanglingSourceMap from "./Transform/StripDanglingSourceMap.js";
import StripWebviewIframeSandbox from "./Transform/StripWebviewIframeSandbox.js";
export * from "./Type.js";
import { default as default2 } from "./Apply.js";
import { default as default3 } from "./Transform/StripCSSImport.js";
import { default as default4 } from "./Transform/InlineCSSImport.js";
import { default as default5 } from "./Transform/InjectNameShim.js";
import { default as default6 } from "./Transform/InjectWebViewPolyfills.js";
import { default as default7 } from "./Transform/InjectWorkerBootstrapShim.js";
import { default as default8 } from "./Transform/RewriteNestedWorkerBootstrap.js";
import { default as default9 } from "./Transform/RewriteWorkerURLs.js";
import { default as default10 } from "./Transform/RewriteWorkbenchBaseURL.js";
import { default as default11 } from "./Transform/RewriteStaticBlockSelfRef.js";
import { default as default12 } from "./Transform/HoistFunctionDeclarations.js";
import { default as default13 } from "./Transform/ReplaceElectronIPCService.js";
import { default as default14 } from "./Transform/ReplaceSharedProcess.js";
import { default as default15 } from "./Transform/StaticToDynamicImport.js";
import { default as default16 } from "./Transform/StripDanglingSourceMap.js";
import { default as default17 } from "./Transform/ExtensionScannerIPC.js";
import { default as default18 } from "./Transform/CatchOutputFolderRejection.js";
import { default as default19 } from "./Transform/StripWebviewIframeSandbox.js";
import { default as default20 } from "./Transform/ExposeWorkbenchAccessor.js";
import { default as default21 } from "./Transform/InstrumentVscodeGit.js";
import { default as default22 } from "./Transform/DisableUnusedServices.js";
import { default as default23 } from "./Transform/ReplaceSearchService.js";
import { default as default24 } from "./Transform/PatchLocalTerminalBackend.js";
import {
  CopyVSOutput,
  default as default25
} from "./Copy/CopyVSOutput.js";
import {
  CopyVSRootFiles,
  default as default26
} from "./Copy/CopyVSRootFiles.js";
import {
  SupplementFromDependency,
  default as default27
} from "./Copy/SupplementFromDependency.js";
import { CopyWorker, default as default28 } from "./Copy/CopyWorker.js";
import {
  CopyNodeModules,
  DefaultPackages,
  default as default29
} from "./Copy/CopyNodeModules.js";
import {
  StubUnpublishedAddons,
  DefaultStubs,
  StubDataPrefix,
  default as default30
} from "./Copy/StubUnpublishedAddons.js";
import {
  CopyTauriMainProcessService,
  default as default31
} from "./Copy/CopyTauriMainProcessService.js";
const BuildPipeline = /* @__PURE__ */ __name((Input) => {
  const IsRelease = (Input.Profile ?? "").startsWith("release");
  const CSSStrategy = IsRelease ? InlineCSSImport : StripCSSImport;
  return [
    CopyVSOutputFactory(Input.VSOutput),
    CopyVSRootFilesFactory(Input.VSRootFiles),
    SupplementFromDependencyFactory(Input.Supplement),
    CopyWorkerFactory(Input.Worker),
    CopyNodeModulesFactory(Input.NodeModules),
    StubUnpublishedAddonsFactory(Input.Addons),
    CopyTauriMainProcessServiceFactory(Input.TauriMainProcessService),
    CSSStrategy,
    InjectNameShim,
    // Inject the same `__name` / `__defProp` shim into the
    // `webWorkerServiceImpl.js::getWorkerBootstrapUrl` blob factory
    // so Monaco's editor language workers (TS/CSS/HTML/JSON
    // services), semantic-token workers, and any other worker spawned
    // via `defaultWorkerFactory` inherit the helpers in their module
    // scope. Without this the workers crash at module-eval time with
    // `ReferenceError: Can't find variable: $4e` (the mangled name
    // for `__name`) the moment they reach a `__name(fn, "label")`
    // call site - typically before the first language feature ever
    // activates.
    InjectWorkerBootstrapShim,
    // Rewrite `polyfillNestedWorker.js`'s `_bootstrapFnSource =
    // (function _bootstrapFn(...)).toString()` pattern with a literal
    // string equivalent that omits the cosmetic `__name(...)`
    // decorations. Without this, after Vite/OXC mangling the parent
    // chunk's `__name` becomes (e.g.) `$4e`; `_bootstrapFn.toString()`
    // returns the mangled source as a string; the resulting blob
    // worker has no `$4e` defined in its scope and crashes at module
    // eval with `ReferenceError: Can't find variable: $4e`. The
    // literal-string replacement is mangler-immune.
    RewriteNestedWorkerBootstrap,
    // Inject WKWebView polyfills + Blob worker URL rewrite into VS
    // Code's Electron workbench entry. Runs at module-eval time so
    // `window.requestIdleCallback` / `queryLocalFonts` are present
    // before any contribution touches them. Idempotent.
    InjectWebViewPolyfills,
    // Rewrite `new URL("./worker.html", import.meta.url)` patterns
    // to absolute origin-pinned `/Static/Application/...` URLs so
    // they resolve regardless of where the bundled chunk lives.
    // Without this, Vite-bundled chunks resolve worker scripts
    // relative to `_astro/` and the dev server returns 404 HTML
    // (browser parses it as JS, crashes with "Unexpected token <").
    RewriteWorkerURLs,
    // Rewrite the workbench loader's base URL from `vscode-file://`
    // (which only resolves when Mountain's custom scheme handler is
    // registered with the webview - not the case in dev profiles)
    // to a plain `${location.origin}/Static/Application/` URL that
    // resolves through the normal HTTP path Sky's pipeline serves.
    RewriteWorkbenchBaseURL,
    ReplaceElectronIPCService,
    ReplaceSharedProcess,
    StaticToDynamicImport,
    StripDanglingSourceMap,
    ExtensionScannerIPC,
    CatchOutputFolderRejection,
    StripWebviewIframeSandbox,
    // Expose the IWorkbench facade + IInstantiationService on
    // `globalThis` as `__CEL_WORKBENCH__` / `__CEL_INSTANTIATION_SERVICE__`
    // / `__CEL_SERVICES__` so Sky's bridge code (SkyBridge,
    // tree-view attachment, command forwarding, status-bar sync) can
    // call into the live workbench without re-implementing a parallel
    // UI. Without this patch, every tree view an extension registers
    // surfaces as `attach-give-up (no workbench tree descriptor)` on
    // the renderer and the entire Sky→workbench integration is dead.
    ExposeWorkbenchAccessor,
    // Instrument the bundled vscode.git extension's `out/main.js` +
    // `out/model.js` with `process.stdout.write('[GIT-MARK-X] ...')`
    // markers at strategic activation-pipeline points. Bypasses the
    // outputChannel routing entirely so progress is visible even when
    // the channel-name dev_log filter is muted. Drives the F6
    // diagnostic - whichever marker is the LAST visible one identifies
    // the exact bail point in vscode.git's silent activation. Self-
    // idempotent (skips the inject if marker already present).
    InstrumentVscodeGit,
    // Replace upstream contribution barrels for features Land
    // intentionally does not back (auto-update, issue reporter, MS
    // account / settings sync, welcome walkthrough, process explorer,
    // experiments) with an empty default export. Removes broken UI,
    // silences the "service not registered" warnings, and shortens
    // boot. List lives in the transform itself.
    DisableUnusedServices,
    // Replace `RemoteSearchService`'s web-worker-backed file/text
    // search provider with a Tauri-IPC client that delegates to
    // Mountain's `search:findFiles` / `search:findInFiles` (Rust
    // `ignore::WalkBuilder` + `grep-searcher`, `.gitignore`-aware by
    // default). Without this, the workbench search panel shows files
    // in the explorer pane but the match counter stays at 0 because
    // no text-search backend ever runs, AND the file walker doesn't
    // honour `.gitignore` so `Target/` / `node_modules/` appear in
    // results.
    ReplaceSearchService,
    // Patch `LocalTerminalBackend._connectToDirectProxy` so it stops
    // calling `acquirePort('vscode:createPtyHostMessageChannel', ...)`,
    // which never resolves under Tauri (no Electron utility-process
    // MessagePort). Without this, every `createTerminal` /
    // `attachToProcess` / `listProcesses` call hangs forever because
    // `_connectToDirectProxy()` never resolves; the user clicks
    // "open terminal" and the panel sits empty with no PTY ever
    // spawning. The patched body routes everything through the
    // already-functional `_localPtyService` channel proxy
    // (`mainProcessService.getChannel('localPty')` →
    // Mountain's `localPty:*` handlers).
    PatchLocalTerminalBackend
  ];
}, "BuildPipeline");
var Index_default = BuildPipeline;
export {
  default2 as ApplyPlugins,
  BuildPipeline,
  default18 as CatchOutputFolderRejection,
  CopyNodeModules,
  default29 as CopyNodeModulesDefault,
  CopyTauriMainProcessService,
  default31 as CopyTauriMainProcessServiceDefault,
  CopyVSOutput,
  default25 as CopyVSOutputDefault,
  CopyVSRootFiles,
  default26 as CopyVSRootFilesDefault,
  CopyWorker,
  default28 as CopyWorkerDefault,
  DefaultPackages as DefaultNodeModulePackages,
  DefaultStubs,
  default22 as DisableUnusedServices,
  default20 as ExposeWorkbenchAccessor,
  default17 as ExtensionScannerIPC,
  default12 as HoistFunctionDeclarations,
  default5 as InjectNameShim,
  default6 as InjectWebViewPolyfills,
  default7 as InjectWorkerBootstrapShim,
  default4 as InlineCSSImport,
  default21 as InstrumentVscodeGit,
  default24 as PatchLocalTerminalBackend,
  default13 as ReplaceElectronIPCService,
  default23 as ReplaceSearchService,
  default14 as ReplaceSharedProcess,
  default8 as RewriteNestedWorkerBootstrap,
  default11 as RewriteStaticBlockSelfRef,
  default10 as RewriteWorkbenchBaseURL,
  default9 as RewriteWorkerURLs,
  default15 as StaticToDynamicImport,
  default3 as StripCSSImport,
  default16 as StripDanglingSourceMap,
  default19 as StripWebviewIframeSandbox,
  StubDataPrefix,
  StubUnpublishedAddons,
  default30 as StubUnpublishedAddonsDefault,
  SupplementFromDependency,
  default27 as SupplementFromDependencyDefault,
  Index_default as default
};
//# sourceMappingURL=Index.js.map
