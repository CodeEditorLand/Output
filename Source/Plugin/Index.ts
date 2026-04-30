import {
	CopyNodeModules as CopyNodeModulesFactory,
	type CopyNodeModulesInput,
} from "./Copy/CopyNodeModules.js";
import {
	CopyTauriMainProcessService as CopyTauriMainProcessServiceFactory,
	type CopyTauriMainProcessServiceInput,
} from "./Copy/CopyTauriMainProcessService.js";
import {
	CopyVSOutput as CopyVSOutputFactory,
	type CopyVSOutputInput,
} from "./Copy/CopyVSOutput.js";
import {
	CopyVSRootFiles as CopyVSRootFilesFactory,
	type CopyVSRootFilesInput,
} from "./Copy/CopyVSRootFiles.js";
import {
	CopyWorker as CopyWorkerFactory,
	type CopyWorkerInput,
} from "./Copy/CopyWorker.js";
import {
	StubUnpublishedAddons as StubUnpublishedAddonsFactory,
	type StubUnpublishedAddonsInput,
} from "./Copy/StubUnpublishedAddons.js";
import {
	SupplementFromDependency as SupplementFromDependencyFactory,
	type SupplementFromDependencyInput,
} from "./Copy/SupplementFromDependency.js";
import CatchOutputFolderRejection from "./Transform/CatchOutputFolderRejection.js";
import DisableUnusedServices from "./Transform/DisableUnusedServices.js";
import ExposeWorkbenchAccessor from "./Transform/ExposeWorkbenchAccessor.js";
import ExtensionScannerIPC from "./Transform/ExtensionScannerIPC.js";
import InjectNameShim from "./Transform/InjectNameShim.js";
import InjectDisableLazyPaint from "./Transform/InjectDisableLazyPaint.js";
import InjectEagerExtensionActivation from "./Transform/InjectEagerExtensionActivation.js";
import InjectEagerIdleValue from "./Transform/InjectEagerIdleValue.js";
import InjectEagerLifecyclePhase from "./Transform/InjectEagerLifecyclePhase.js";
import InjectStripBackgroundPolling from "./Transform/InjectStripBackgroundPolling.js";
import InjectTelemetryConsentOff from "./Transform/InjectTelemetryConsentOff.js";
import InjectWebViewPolyfills from "./Transform/InjectWebViewPolyfills.js";
import InjectMacTitlebarOffsetCSS from "./Transform/InjectMacTitlebarOffsetCSS.js";
import InjectPartZIndexCSS from "./Transform/InjectPartZIndexCSS.js";
import InjectWorkbenchInteractivityCSS from "./Transform/InjectWorkbenchInteractivityCSS.js";
import InjectWorkbenchPaintPrime from "./Transform/InjectWorkbenchPaintPrime.js";
import InjectWorkerBootstrapShim from "./Transform/InjectWorkerBootstrapShim.js";
import InjectConfigurationOverlay from "./Transform/InjectConfigurationOverlay.js";
import InjectStorageOverlay from "./Transform/InjectStorageOverlay.js";
import ForceTextAreaInput from "./Transform/ForceTextAreaInput.js";
import RewriteIconsStyleSheetURLs from "./Transform/RewriteIconsStyleSheetURLs.js";
import RewriteWebviewShellCSP from "./Transform/RewriteWebviewShellCSP.js";
import RewriteNestedWorkerBootstrap from "./Transform/RewriteNestedWorkerBootstrap.js";
import RewriteNodeModulesPath from "./Transform/RewriteNodeModulesPath.js";
import RewritePerfBaselineWorker from "./Transform/RewritePerfBaselineWorker.js";
import InlineCSSImport from "./Transform/InlineCSSImport.js";
import InstrumentVscodeGit from "./Transform/InstrumentVscodeGit.js";
import InjectEditorGPULayerCSS from "./Transform/InjectEditorGPULayerCSS.js";
import InjectTerminalGPULayerCSS from "./Transform/InjectTerminalGPULayerCSS.js";
import PatchLocalTerminalBackend from "./Transform/PatchLocalTerminalBackend.js";
import PatchTerminalGpuAcceleration from "./Transform/PatchTerminalGpuAcceleration.js";
import ReplaceElectronIPCService from "./Transform/ReplaceElectronIPCService.js";
import ReplaceExtensionGalleryService from "./Transform/ReplaceExtensionGalleryService.js";
import ReplaceSearchService from "./Transform/ReplaceSearchService.js";
import ReplaceSharedProcess from "./Transform/ReplaceSharedProcess.js";
import ReplaceTelemetryService from "./Transform/ReplaceTelemetryService.js";
import ReplaceUpdateService from "./Transform/ReplaceUpdateService.js";
import HoistFunctionDeclarations from "./Transform/HoistFunctionDeclarations.js";
import RewriteStaticBlockSelfRef from "./Transform/RewriteStaticBlockSelfRef.js";
import RewriteWorkbenchBaseURL from "./Transform/RewriteWorkbenchBaseURL.js";
import RewriteWorkerURLs from "./Transform/RewriteWorkerURLs.js";
import StaticToDynamicImport from "./Transform/StaticToDynamicImport.js";
import StripCSSImport from "./Transform/StripCSSImport.js";
import StripDanglingSourceMap from "./Transform/StripDanglingSourceMap.js";
import StripWebviewIframeSandbox from "./Transform/StripWebviewIframeSandbox.js";
import type { Plugin } from "./Type.js";

/**
 * Plugin/Index - single entry point for consumers.
 *
 * Re-exports every plugin and the types / runner needed to invoke them.
 * Copy plugins are factories (they take paths from the consumer) and
 * transform plugins are data objects (no wiring needed). The `Build()`
 * factory assembles the default ordered pipeline Sky uses in
 * `astro:build:done`.
 *
 * Ordering rule for the pipeline:
 *   1. CopyVSOutput             (Step 1)
 *   2. CopyVSRootFiles          (Step 1b)
 *   3. SupplementFromDependency (Step 2)
 *   4. CopyWorker               (Step 3)
 *   5. CopyNodeModules          (Step 11)
 *   6. StubUnpublishedAddons    (Step 12)
 *   -- transforms run after every copy settles --
 *   7. StripCSSImport / InlineCSSImport (Step 4 - profile-gated:
 *      `release-*` inlines CSS bytes, others delegate to Worker SW)
 *   8. InjectNameShim           (Step 6)
 *   9. ReplaceElectronIPCService(Step 7)
 *  10. ReplaceSharedProcess     (Step 7b)
 *  11. StaticToDynamicImport    (Step 10)
 *  12. StripDanglingSourceMap   (Step 11b)
 *  13. ExtensionScannerIPC      (Step 14)
 *  14. CatchOutputFolderRejection (Step 15)
 *  15. StripWebviewIframeSandbox (Step 16 - WKWebView custom-protocol fix)
 *  16. ExposeWorkbenchAccessor (Step 17 - globalThis.__CEL_SERVICES__ +
 *      __CEL_WORKBENCH__ + __CEL_INSTANTIATION_SERVICE__ + the
 *      `cel:workbench-ready` DOM event consumed by SkyBridge)
 *
 * CopyNodeModules → StripDanglingSourceMap is a logically-paired duo
 * (copy freshly shipped JS; strip any now-dangling sourcemap comments),
 * but **the pair is expressed via role-scoped transforms, not
 * `CopyPlugin.AfterCopy`**. StripDanglingSourceMap's `Match` is scoped
 * to `Role === "app"` and CopyNodeModules writes into the app root, so
 * the transform pass naturally covers every file the copy emits. The
 * `AfterCopy` hook on `CopyPlugin` is intentionally unused here -
 * leaving it plumbed means a future sibling (e.g. a copy that produces
 * files outside the app root and still needs strip) can opt in without
 * a runner change.
 */

export * from "./Type.js";
export { default as ApplyPlugins } from "./Apply.js";
export type { ApplyInput, ApplyOutcome } from "./Apply.js";

export { default as StripCSSImport } from "./Transform/StripCSSImport.js";
export { default as InlineCSSImport } from "./Transform/InlineCSSImport.js";
export { default as InjectNameShim } from "./Transform/InjectNameShim.js";
export { default as InjectDisableLazyPaint } from "./Transform/InjectDisableLazyPaint.js";
export { default as InjectEagerExtensionActivation } from "./Transform/InjectEagerExtensionActivation.js";
export { default as InjectEagerIdleValue } from "./Transform/InjectEagerIdleValue.js";
export { default as InjectEagerLifecyclePhase } from "./Transform/InjectEagerLifecyclePhase.js";
export { default as InjectStripBackgroundPolling } from "./Transform/InjectStripBackgroundPolling.js";
export { default as InjectTelemetryConsentOff } from "./Transform/InjectTelemetryConsentOff.js";
export { default as InjectWebViewPolyfills } from "./Transform/InjectWebViewPolyfills.js";
export { default as InjectMacTitlebarOffsetCSS } from "./Transform/InjectMacTitlebarOffsetCSS.js";
export { default as InjectPartZIndexCSS } from "./Transform/InjectPartZIndexCSS.js";
export { default as InjectWorkbenchInteractivityCSS } from "./Transform/InjectWorkbenchInteractivityCSS.js";
export { default as InjectWorkbenchPaintPrime } from "./Transform/InjectWorkbenchPaintPrime.js";
export { default as InjectWorkerBootstrapShim } from "./Transform/InjectWorkerBootstrapShim.js";
export { default as InjectConfigurationOverlay } from "./Transform/InjectConfigurationOverlay.js";
export { default as InjectStorageOverlay } from "./Transform/InjectStorageOverlay.js";
export { default as ForceTextAreaInput } from "./Transform/ForceTextAreaInput.js";
export { default as RewriteIconsStyleSheetURLs } from "./Transform/RewriteIconsStyleSheetURLs.js";
export { default as RewriteWebviewShellCSP } from "./Transform/RewriteWebviewShellCSP.js";
export { default as RewriteNestedWorkerBootstrap } from "./Transform/RewriteNestedWorkerBootstrap.js";
export { default as RewriteNodeModulesPath } from "./Transform/RewriteNodeModulesPath.js";
export { default as RewritePerfBaselineWorker } from "./Transform/RewritePerfBaselineWorker.js";
export { default as RewriteWorkerURLs } from "./Transform/RewriteWorkerURLs.js";
export { default as RewriteWorkbenchBaseURL } from "./Transform/RewriteWorkbenchBaseURL.js";
export { default as RewriteStaticBlockSelfRef } from "./Transform/RewriteStaticBlockSelfRef.js";
export { default as HoistFunctionDeclarations } from "./Transform/HoistFunctionDeclarations.js";
export { default as ReplaceElectronIPCService } from "./Transform/ReplaceElectronIPCService.js";
export { default as ReplaceExtensionGalleryService } from "./Transform/ReplaceExtensionGalleryService.js";
export { default as ReplaceSharedProcess } from "./Transform/ReplaceSharedProcess.js";
export { default as ReplaceTelemetryService } from "./Transform/ReplaceTelemetryService.js";
export { default as ReplaceUpdateService } from "./Transform/ReplaceUpdateService.js";
export { default as StaticToDynamicImport } from "./Transform/StaticToDynamicImport.js";
export { default as StripDanglingSourceMap } from "./Transform/StripDanglingSourceMap.js";
export { default as ExtensionScannerIPC } from "./Transform/ExtensionScannerIPC.js";
export { default as CatchOutputFolderRejection } from "./Transform/CatchOutputFolderRejection.js";
export { default as StripWebviewIframeSandbox } from "./Transform/StripWebviewIframeSandbox.js";
export { default as ExposeWorkbenchAccessor } from "./Transform/ExposeWorkbenchAccessor.js";
export { default as InstrumentVscodeGit } from "./Transform/InstrumentVscodeGit.js";
export { default as DisableUnusedServices } from "./Transform/DisableUnusedServices.js";
export { default as ReplaceSearchService } from "./Transform/ReplaceSearchService.js";
export { default as InjectEditorGPULayerCSS } from "./Transform/InjectEditorGPULayerCSS.js";
export { default as InjectTerminalGPULayerCSS } from "./Transform/InjectTerminalGPULayerCSS.js";
export { default as PatchLocalTerminalBackend } from "./Transform/PatchLocalTerminalBackend.js";
export { default as PatchTerminalGpuAcceleration } from "./Transform/PatchTerminalGpuAcceleration.js";

export {
	CopyVSOutput,
	default as CopyVSOutputDefault,
} from "./Copy/CopyVSOutput.js";
export type { CopyVSOutputInput } from "./Copy/CopyVSOutput.js";
export {
	CopyVSRootFiles,
	default as CopyVSRootFilesDefault,
} from "./Copy/CopyVSRootFiles.js";
export type { CopyVSRootFilesInput } from "./Copy/CopyVSRootFiles.js";
export {
	SupplementFromDependency,
	default as SupplementFromDependencyDefault,
} from "./Copy/SupplementFromDependency.js";
export type { SupplementFromDependencyInput } from "./Copy/SupplementFromDependency.js";
export { CopyWorker, default as CopyWorkerDefault } from "./Copy/CopyWorker.js";
export type { CopyWorkerInput } from "./Copy/CopyWorker.js";
export {
	CopyNodeModules,
	DefaultPackages as DefaultNodeModulePackages,
	default as CopyNodeModulesDefault,
} from "./Copy/CopyNodeModules.js";
export type { CopyNodeModulesInput } from "./Copy/CopyNodeModules.js";
export {
	StubUnpublishedAddons,
	DefaultStubs,
	StubDataPrefix,
	default as StubUnpublishedAddonsDefault,
} from "./Copy/StubUnpublishedAddons.js";
export type { StubUnpublishedAddonsInput } from "./Copy/StubUnpublishedAddons.js";
export {
	CopyTauriMainProcessService,
	default as CopyTauriMainProcessServiceDefault,
} from "./Copy/CopyTauriMainProcessService.js";
export type { CopyTauriMainProcessServiceInput } from "./Copy/CopyTauriMainProcessService.js";

export interface BuildPipelineInput {
	readonly VSOutput: CopyVSOutputInput;
	readonly VSRootFiles: CopyVSRootFilesInput;
	readonly Supplement: SupplementFromDependencyInput;
	readonly Worker: CopyWorkerInput;
	readonly NodeModules: CopyNodeModulesInput;
	readonly Addons: StubUnpublishedAddonsInput;
	readonly TauriMainProcessService: CopyTauriMainProcessServiceInput;
	/**
	 * Build profile name (e.g. "release-electron"). Controls the CSS-handling
	 * strategy: `release-*` profiles inline CSS at build time via
	 * `InlineCSSImport` (bytes embedded as `<style>` inserts, zero runtime
	 * dependency on the Worker SW or `vscode-file://` scheme handler);
	 * everything else falls back to runtime `_LOAD_CSS_WORKER` injection via
	 * `StripCSSImport`. The original `.css` files are left on disk regardless,
	 * so `vscode-file://` requests still resolve through Mountain's scheme
	 * handler if anything bypasses the inlined version.
	 */
	readonly Profile?: string;
}

/**
 * Master "disable Land customisations" gate. When `process.env.Disable`
 * is `true` (PascalCase, single-word - Land env-var convention), every
 * `Inject*` / `Replace*` / `Rewrite*` / `Strip*` / `Patch*` /
 * `ForceTextAreaInput` / `Hoist*` / `StaticToDynamic*` / `Catch*` /
 * `Instrument*` / `Disable*` Output transform is skipped. Only the
 * Copy plugins (which physically populate `Target/Microsoft/VSCode/`
 * with upstream bytes) still run. The result is "vanilla VS Code on
 * Tauri" - useful when bisecting whether a regression is in our
 * polyfills or in upstream / Tauri / WKWebView.
 *
 * Code is NOT removed - the imports + the const polyfill list still
 * exist so flipping the env var back to `false` re-enables every
 * customisation in one rebuild.
 */
const LandDisableAll = (
	(globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.Disable ?? ""
).toLowerCase() === "true";

/**
 * Compose the full default pipeline in the canonical order. Consumers can
 * still hand-assemble their own arrays if they want to skip / reorder.
 */
export const BuildPipeline = (Input: BuildPipelineInput): Array<Plugin> => {
	const IsRelease = (Input.Profile ?? "").startsWith("release");
	const CSSStrategy = IsRelease ? InlineCSSImport : StripCSSImport;
	if (LandDisableAll) {
		// Copy stage only. Vanilla VS Code lands in `Target/`; no
		// patches are applied. The bundled-Electron entry imports the
		// upstream `workbench.js` unmodified - if input still doesn't
		// work in this mode, the regression is upstream / Tauri /
		// WKWebView, not Land.
		return [
			CopyVSOutputFactory(Input.VSOutput),
			CopyVSRootFilesFactory(Input.VSRootFiles),
			SupplementFromDependencyFactory(Input.Supplement),
			CopyWorkerFactory(Input.Worker),
			CopyNodeModulesFactory(Input.NodeModules),
			StubUnpublishedAddonsFactory(Input.Addons),
			CopyTauriMainProcessServiceFactory(Input.TauriMainProcessService),
		];
	}
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
		// Replace `timerService.js`'s `(function() { ... __name(fib,
		// "fib"); ... }).toString()` perfBaseline worker source with a
		// literal-string equivalent that omits the cosmetic `__name(...)`
		// decoration. Same OXC-mangling-truth fix as
		// `RewriteNestedWorkerBootstrap` - the IIFE source captured by
		// `.toString()` carried the mangled `$4e` reference; the worker
		// scope had no `$4e` defined and crashed at line 7 of the blob URL.
		RewritePerfBaselineWorker,
		// Patch `vs/base/common/network.js`'s `nodeModulesPath` from
		// `vs/../../node_modules` (over-resolves to `Static/node_modules`)
		// to `vs/../node_modules` (resolves to `Static/Application/
		// node_modules` where files actually exist after the build's
		// CopyNodeModules step). Without this, every textmate / oniguruma
		// / language-detection import returns the SPA `index.html`
		// fallback, the browser parses HTML as JS, and ALL grammar /
		// tokenization / syntax-highlighting silently breaks across
		// every extension. Idempotent.
		RewriteNodeModulesPath,
		// Inject WKWebView polyfills + Blob worker URL rewrite into VS
		// Code's Electron workbench entry. Runs at module-eval time so
		// `window.requestIdleCallback` / `queryLocalFonts` are present
		// before any contribution touches them. Idempotent.
		InjectWebViewPolyfills,
		// Disable WKWebView lazy-paint mechanisms so workbench panels
		// render on `display:flex` rather than waiting for a hover or
		// scroll. Replaces `requestAnimationFrame` with a coalesced
		// `setTimeout(0)` queue, `IntersectionObserver` with a
		// fire-on-observe stub, and strips `content-visibility:auto`
		// + `contain:paint` from workbench-level CSS rules.
		// Idempotent. Runs after the polyfill injector so its
		// rAF/IO overrides land on top of any earlier shim.
		InjectDisableLazyPaint,
		// Force workbench parts/panels/composites to be interactive
		// on `display:flex`. Strips `pointer-events:none`,
		// `visibility:hidden`, `opacity:0` cascades and zeros panel
		// transition durations so panels appear instantly.
		// Companion to InjectDisableLazyPaint: that one fixed paint;
		// this fixes interactivity. Idempotent.
		InjectWorkbenchInteractivityCSS,
		// Force WKWebView's compositor to commit pending layout for
		// each workbench part layer at boot and on the first
		// interaction with each part. One synchronous
		// `void offsetHeight` read per part suffices to commit the
		// layer to the compositor; without it, panels may stay in
		// a "first paint pending" state until something else
		// triggers a forced layout. Idempotent.
		InjectWorkbenchPaintPrime,
		// Reserve the macOS traffic-light cluster width on the
		// titlebar's left edge so the in-window menubar
		// (`File / Edit / View / ...`) and the command-center
		// quick-pick stop colliding with the OS-painted close /
		// minimize / maximize buttons. Targets `.monaco-workbench.mac`
		// only; non-macOS builds keep their stock layout. Idempotent.
		InjectMacTitlebarOffsetCSS,
		// Establish a deterministic z-index hierarchy across the
		// workbench parts so a sibling that picked up an implicit
		// stacking context (transform, opacity, isolation) can't
		// hide the activity bar, sidebar, panel resize handle,
		// status bar progress badges, or the command-center
		// quick-pick dropdown. Hardens stock CSS without changing
		// its intent. Idempotent.
		InjectPartZIndexCSS,
		// Pre-bake telemetry consent OFF so VS Code's TelemetryService
		// starts in already-disabled state. Network.ts excludes the
		// wire-level appenders; this transform makes the consumers
		// take the disabled branches at module-eval time so even
		// straggler appenders never get fed an event. Idempotent.
		InjectTelemetryConsentOff,
		// Strip VS Code's background polls (telemetry flush, settings
		// sync, update check, marketplace recommendations, etc.) at
		// the setInterval / long setTimeout level. Stack-trace deny
		// match; non-matching timers run as normal. Idempotent.
		InjectStripBackgroundPolling,
		// Add a `globalThis.__CEL_OVERRIDE_CONFIG__` consult to every
		// `IConfigurationService.getValue(arg1, arg2)` so Wind / Sky can
		// inject settings live without writing to disk or going through
		// Mountain's `configuration:setValue` IPC. Bag is opt-in; when
		// unset the upstream behaviour is preserved verbatim.
		InjectConfigurationOverlay,
		// Add a `globalThis.__CEL_OVERRIDE_STORAGE__` consult to
		// `AbstractStorageService.{get,getBoolean,getNumber,getObject}`
		// so Wind / Sky can seed in-memory storage state without going
		// through IndexedDB. Composite key is `<scope>:<key>` to
		// disambiguate across APPLICATION / PROFILE / WORKSPACE scopes.
		InjectStorageOverlay,
		// Wrap `iconsStyleSheet.js`'s `getCSS()` so the emitted
		// `@font-face` URLs are rewritten from `vscode-file://vscode-app`
		// to same-origin paths the WKWebView can actually fetch. Without
		// this, every extension-contributed codicon font (GitLens,
		// dart-code, etc.) lands as a missing-glyph blank box because
		// WKWebView has no `vscode-file://` handler.
		RewriteIconsStyleSheetURLs,
		// Force the workbench's ILifecycleService to advance through
		// Starting -> Ready -> Restored -> Eventually as fast as
		// possible at boot, rather than waiting on the stock 2-5 s
		// timer. Unblocks every `lifecycle.when(phase)` Promise that
		// extension activations + service init wait on. Idempotent.
		InjectEagerLifecyclePhase,
		// Fire `IExtensionService.activateByEvent("onStartupFinished")`
		// + `("*")` directly at workbench-loaded so extension panels
		// (Roo, Claude, gitlens, dart-code, etc.) populate immediately
		// rather than waiting for the stock 2-5 s scheduler. Compounds
		// with InjectEagerLifecyclePhase. Idempotent.
		InjectEagerExtensionActivation,
		// Collapse `requestIdleCallback` to `setTimeout(0)` with a
		// generous synthetic IdleDeadline so VS Code's pervasive
		// `IdleValue<T>` lazy-init pattern resolves eagerly. Trades
		// tiny boot-time spike for predictable warm state. Idempotent.
		InjectEagerIdleValue,
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
		// LAND-PATCH: replace VS Code's TelemetryService body with a
		// no-op stub. Static `import` references in workbench.*
		// resolve cleanly; consumers that DO call publicLog/etc.
		// hit no-op methods. Compounds with Network.ts (excludes
		// wire-level appenders) + InjectTelemetryConsentOff
		// (pre-bakes consent off at boot).
		ReplaceTelemetryService,
		// LAND-PATCH: replace UpdateService + AbstractUpdateService
		// bodies. State.Idle forever; checkForUpdates / downloadUpdate
		// / quitAndInstall are no-ops. Auto-update goes through Air's
		// signed-binary path (Mountain.key.pub verified), not
		// update.code.visualstudio.com.
		ReplaceUpdateService,
		// LAND-PATCH: replace ExtensionGalleryService body. query()
		// returns an empty pager; download/install reject with a
		// helpful error. User extensions are sideloaded from
		// ~/.land/extensions/ - no marketplace traffic.
		ReplaceExtensionGalleryService,
		StaticToDynamicImport,
		StripDanglingSourceMap,
		ExtensionScannerIPC,
		CatchOutputFolderRejection,
		StripWebviewIframeSandbox,
		// Loosen the webview shell's `<meta http-equiv="Content-Security-Policy">`
		// from a stale sha256 hash on the inline bootstrap script to
		// `'unsafe-inline'`. Stock VS Code pins the hash; WKWebView
		// computes it differently from Chromium, and any later
		// transform that touches the inline script body invalidates
		// it silently. Loosening matches Land's single-user desktop
		// threat model and lets every extension webview boot.
		// Idempotent. Marker `__LAND_WEBVIEW_SHELL_CSP__`.
		RewriteWebviewShellCSP,
		// Flip Monaco's `editor.editContext` default from `true` to
		// `false` so keyboard input flows through the legacy
		// `<textarea class="inputarea">` rather than the modern
		// EditContext-API `<div class="native-edit-context">`. The
		// textarea path predates EditContext and is the codebase's
		// battle-tested input route; WKWebView's EditContext support
		// is flaky enough that focused divs swallow keystrokes
		// silently. Idempotent. Marker `__LAND_FORCE_TEXTAREA_INPUT__`.
		ForceTextAreaInput,
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
		PatchLocalTerminalBackend,
		// Pin the xterm canvas to its own GPU compositor layer so
		// WKWebView's compositor flush between `xterm.refresh()` cycles
		// doesn't expose the cleared canvas (the "terminal flashes on
		// every click" symptom). CSS-only - degrades to inert hints if
		// WebKit ever fixes the underlying compositor behaviour.
		InjectTerminalGPULayerCSS,
		// Same GPU-layer hint applied to Monaco's editor canvases.
		// Targets the "underscore/cursor at a different place" symptom
		// where WKWebView's compositor lifts the cursor onto a layer
		// whose baseline diverges from the text layer during reflow.
		InjectEditorGPULayerCSS,
		// `PatchTerminalGpuAcceleration` is intentionally NOT registered
		// here. Forcing the DOM renderer fixed the WebGL atlas font
		// glitches but introduced a "black shadow over text" visual
		// artifact (xterm's DOM-renderer cursor / accessibility layer
		// in WKWebView). Keep the transform file on disk so it can be
		// re-enabled if we settle on DOM, but default-on it makes the
		// terminal worse, not better. Re-evaluate after the input race
		// fix lands and we know whether the original "broken fonts"
		// symptom was actually WebGL atlas drift or a deferred-create
		// race side-effect.
	];
};

export default BuildPipeline;
