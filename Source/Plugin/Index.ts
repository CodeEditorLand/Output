import {
	CopyNodeModules as CopyNodeModulesFactory,
	type CopyNodeModulesInput,
} from "./Copy/Copy/Node/Modules.js";

import {
	CopyTauriMainProcessService as CopyTauriMainProcessServiceFactory,
	type CopyTauriMainProcessServiceInput,
} from "./Copy/Copy/Tauri/Main/Process/Service.js";

import {
	CopyVSOutput as CopyVSOutputFactory,
	type CopyVSOutputInput,
} from "./Copy/Copy/VS/Output.js";

import {
	CopyVSRootFiles as CopyVSRootFilesFactory,
	type CopyVSRootFilesInput,
} from "./Copy/Copy/VS/Root/Files.js";

import {
	CopyWorker as CopyWorkerFactory,
	type CopyWorkerInput,
} from "./Copy/Copy/Worker.js";

import {
	StubUnpublishedAddons as StubUnpublishedAddonsFactory,
	type StubUnpublishedAddonsInput,
} from "./Copy/Stub/Unpublished/Addons.js";

import {
	SupplementFromDependency as SupplementFromDependencyFactory,
	type SupplementFromDependencyInput,
} from "./Copy/Supplement/From/Dependency.js";

import CatchOutputFolderRejection from "./Transform/Catch/Output/Folder/Rejection.js";

import DisableUnusedServices from "./Transform/Disable/Unused/Services.js";

import ExposeWorkbenchAccessor from "./Transform/Expose/Workbench/Accessor.js";

import ExtensionScannerIPC from "./Transform/Extension/Scanner/IPC.js";

import ForceTextAreaInput from "./Transform/Force/Text/Area/Input.js";

// HoistFunctionDeclarations re-exported below
import InjectConfigurationOverlay from "./Transform/Inject/Configuration/Overlay.js";

import InjectDisableLazyPaint from "./Transform/Inject/Disable/Lazy/Paint.js";

import InjectEagerExtensionActivation from "./Transform/Inject/Eager/Extension/Activation.js";

import InjectEagerIdleValue from "./Transform/Inject/Eager/Idle/Value.js";

import InjectEagerLifecyclePhase from "./Transform/Inject/Eager/Lifecycle/Phase.js";

import InjectEditorGPULayerCSS from "./Transform/Inject/Editor/GPU/Layer/CSS.js";

import InjectMacTitlebarOffsetCSS from "./Transform/Inject/Mac/Titlebar/Offset/CSS.js";

import InjectNameShim from "./Transform/Inject/Name/Shim.js";

import InjectPartZIndexCSS from "./Transform/Inject/Part/Z/Index/CSS.js";

import InjectStorageOverlay from "./Transform/Inject/Storage/Overlay.js";

import InjectStripBackgroundPolling from "./Transform/Inject/Strip/Background/Polling.js";

import InjectTauriDragRegion from "./Transform/Inject/Tauri/Drag/Region.js";

import InjectTelemetryConsentOff from "./Transform/Inject/Telemetry/Consent/Off.js";

import InjectTerminalGPULayerCSS from "./Transform/Inject/Terminal/GPU/Layer/CSS.js";

import InjectWebViewPolyfills from "./Transform/Inject/Web/View/Polyfills.js";

import InjectWebviewBlobUrlRewrite from "./Transform/Inject/Webview/Blob/Url/Rewrite.js";

import InjectWebviewDebugLogging from "./Transform/Inject/Webview/Debug/Logging.js";

import InjectWebviewRuntimeDiagnostics from "./Transform/Inject/Webview/Debug/RuntimeDiagnostics.js";

import InjectWebviewRuntimeDiagnosticsInner from "./Transform/Inject/Webview/Debug/RuntimeDiagnosticsInner.js";

import InjectWorkbenchInteractivityCSS from "./Transform/Inject/Workbench/Interactivity/CSS.js";

import InjectWorkbenchPaintPrime from "./Transform/Inject/Workbench/Paint/Prime.js";

import InjectWorkerBootstrapShim from "./Transform/Inject/Worker/Bootstrap/Shim.js";

import InlineCSSImport from "./Transform/Inline/CSS/Import.js";

import InstrumentVscodeGit from "./Transform/Instrument/Vscode/Git.js";

import PatchLocalTerminalBackend from "./Transform/Patch/Local/Terminal/Backend.js";

// PatchTerminalGpuAcceleration re-exported below
import PatchWebviewIframeServiceWorker from "./Transform/Patch/Webview/Iframe/Service/Worker.js";

import ReplaceElectronIPCService from "./Transform/Replace/Electron/IPC/Service.js";

import ReplaceExtensionGalleryService from "./Transform/Replace/Extension/Gallery/Service.js";

import ReplaceProductIdentity from "./Transform/Replace/Product/Identity.js";

import ReplaceSearchService from "./Transform/Replace/Search/Service.js";

import ReplaceSharedProcess from "./Transform/Replace/Shared/Process.js";

import ReplaceTelemetryService from "./Transform/Replace/Telemetry/Service.js";

import ReplaceUpdateService from "./Transform/Replace/Update/Service.js";

import RewriteIconsStyleSheetURLs from "./Transform/Rewrite/Icons/Style/Sheet/URLs.js";

import RewriteNestedWorkerBootstrap from "./Transform/Rewrite/Nested/Worker/Bootstrap.js";

import RewriteNodeModulesPath from "./Transform/Rewrite/Node/Modules/Path.js";

import RewritePerfBaselineWorker from "./Transform/Rewrite/Perf/Baseline/Worker.js";

// RewriteStaticBlockSelfRef re-exported below
import RewriteWebviewShellCSP from "./Transform/Rewrite/Webview/Shell/CSP.js";

import RewriteWorkbenchBaseURL from "./Transform/Rewrite/Workbench/Base/URL.js";

import RewriteWorkerURLs from "./Transform/Rewrite/Worker/URLs.js";

import StaticToDynamicImport from "./Transform/Static/To/Dynamic/Import.js";

import StripCSSImport from "./Transform/Strip/CSS/Import.js";

import StripDanglingSourceMap from "./Transform/Strip/Dangling/Source/Map.js";

import StripWebviewIframeSandbox from "./Transform/Strip/Webview/Iframe/Sandbox.js";

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

export { default as StripCSSImport } from "./Transform/Strip/CSS/Import.js";

export { default as InlineCSSImport } from "./Transform/Inline/CSS/Import.js";

export { default as InjectNameShim } from "./Transform/Inject/Name/Shim.js";

export { default as InjectDisableLazyPaint } from "./Transform/Inject/Disable/Lazy/Paint.js";

export { default as InjectEagerExtensionActivation } from "./Transform/Inject/Eager/Extension/Activation.js";

export { default as InjectEagerIdleValue } from "./Transform/Inject/Eager/Idle/Value.js";

export { default as InjectEagerLifecyclePhase } from "./Transform/Inject/Eager/Lifecycle/Phase.js";

export { default as InjectStripBackgroundPolling } from "./Transform/Inject/Strip/Background/Polling.js";

export { default as InjectTelemetryConsentOff } from "./Transform/Inject/Telemetry/Consent/Off.js";

export { default as InjectWebViewPolyfills } from "./Transform/Inject/Web/View/Polyfills.js";

export { default as InjectMacTitlebarOffsetCSS } from "./Transform/Inject/Mac/Titlebar/Offset/CSS.js";

export { default as InjectPartZIndexCSS } from "./Transform/Inject/Part/Z/Index/CSS.js";

export { default as InjectTauriDragRegion } from "./Transform/Inject/Tauri/Drag/Region.js";

export { default as InjectWorkbenchInteractivityCSS } from "./Transform/Inject/Workbench/Interactivity/CSS.js";

export { default as InjectWorkbenchPaintPrime } from "./Transform/Inject/Workbench/Paint/Prime.js";

export { default as InjectWorkerBootstrapShim } from "./Transform/Inject/Worker/Bootstrap/Shim.js";

export { default as InjectConfigurationOverlay } from "./Transform/Inject/Configuration/Overlay.js";

export { default as InjectStorageOverlay } from "./Transform/Inject/Storage/Overlay.js";

export { default as ForceTextAreaInput } from "./Transform/Force/Text/Area/Input.js";

export { default as RewriteIconsStyleSheetURLs } from "./Transform/Rewrite/Icons/Style/Sheet/URLs.js";

export { default as RewriteWebviewShellCSP } from "./Transform/Rewrite/Webview/Shell/CSP.js";

export { default as RewriteNestedWorkerBootstrap } from "./Transform/Rewrite/Nested/Worker/Bootstrap.js";

export { default as RewriteNodeModulesPath } from "./Transform/Rewrite/Node/Modules/Path.js";

export { default as RewritePerfBaselineWorker } from "./Transform/Rewrite/Perf/Baseline/Worker.js";

export { default as RewriteWorkerURLs } from "./Transform/Rewrite/Worker/URLs.js";

export { default as RewriteWorkbenchBaseURL } from "./Transform/Rewrite/Workbench/Base/URL.js";

export { default as RewriteStaticBlockSelfRef } from "./Transform/Rewrite/Static/Block/Self/Ref.js";

export { default as HoistFunctionDeclarations } from "./Transform/Hoist/Function/Declarations.js";

export { default as ReplaceElectronIPCService } from "./Transform/Replace/Electron/IPC/Service.js";

export { default as ReplaceExtensionGalleryService } from "./Transform/Replace/Extension/Gallery/Service.js";

export { default as ReplaceSharedProcess } from "./Transform/Replace/Shared/Process.js";

export { default as ReplaceTelemetryService } from "./Transform/Replace/Telemetry/Service.js";

export { default as ReplaceUpdateService } from "./Transform/Replace/Update/Service.js";

export { default as StaticToDynamicImport } from "./Transform/Static/To/Dynamic/Import.js";

export { default as StripDanglingSourceMap } from "./Transform/Strip/Dangling/Source/Map.js";

export { default as ExtensionScannerIPC } from "./Transform/Extension/Scanner/IPC.js";

export { default as CatchOutputFolderRejection } from "./Transform/Catch/Output/Folder/Rejection.js";

export { default as StripWebviewIframeSandbox } from "./Transform/Strip/Webview/Iframe/Sandbox.js";

export { default as ExposeWorkbenchAccessor } from "./Transform/Expose/Workbench/Accessor.js";

export { default as InstrumentVscodeGit } from "./Transform/Instrument/Vscode/Git.js";

export { default as DisableUnusedServices } from "./Transform/Disable/Unused/Services.js";

export { default as ReplaceProductIdentity } from "./Transform/Replace/Product/Identity.js";

export { default as ReplaceSearchService } from "./Transform/Replace/Search/Service.js";

export { default as InjectEditorGPULayerCSS } from "./Transform/Inject/Editor/GPU/Layer/CSS.js";

export { default as InjectTerminalGPULayerCSS } from "./Transform/Inject/Terminal/GPU/Layer/CSS.js";

export { default as PatchLocalTerminalBackend } from "./Transform/Patch/Local/Terminal/Backend.js";

export { default as PatchTerminalGpuAcceleration } from "./Transform/Patch/Terminal/GPU/Acceleration.js";

export { default as PatchWebviewIframeServiceWorker } from "./Transform/Patch/Webview/Iframe/Service/Worker.js";

export { default as InjectWebviewBlobUrlRewrite } from "./Transform/Inject/Webview/Blob/Url/Rewrite.js";

export {
	CopyVSOutput,
	default as CopyVSOutputDefault,
} from "./Copy/Copy/VS/Output.js";

export type { CopyVSOutputInput } from "./Copy/Copy/VS/Output.js";

export {
	CopyVSRootFiles,
	default as CopyVSRootFilesDefault,
} from "./Copy/Copy/VS/Root/Files.js";

export type { CopyVSRootFilesInput } from "./Copy/Copy/VS/Root/Files.js";

export {
	SupplementFromDependency,
	default as SupplementFromDependencyDefault,
} from "./Copy/Supplement/From/Dependency.js";

export type { SupplementFromDependencyInput } from "./Copy/Supplement/From/Dependency.js";

export {
	CopyWorker,
	default as CopyWorkerDefault,
} from "./Copy/Copy/Worker.js";

export type { CopyWorkerInput } from "./Copy/Copy/Worker.js";

export {
	CopyNodeModules,
	DefaultPackages as DefaultNodeModulePackages,
	default as CopyNodeModulesDefault,
} from "./Copy/Copy/Node/Modules.js";

export type { CopyNodeModulesInput } from "./Copy/Copy/Node/Modules.js";

export {
	StubUnpublishedAddons,
	DefaultStubs,
	StubDataPrefix,
	default as StubUnpublishedAddonsDefault,
} from "./Copy/Stub/Unpublished/Addons.js";

export type { StubUnpublishedAddonsInput } from "./Copy/Stub/Unpublished/Addons.js";

export {
	CopyTauriMainProcessService,
	default as CopyTauriMainProcessServiceDefault,
} from "./Copy/Copy/Tauri/Main/Process/Service.js";

export type { CopyTauriMainProcessServiceInput } from "./Copy/Copy/Tauri/Main/Process/Service.js";

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
const LandDisableAll =
	(
		(
			globalThis as {
				process?: { env?: Record<string, string | undefined> };
			}
		).process?.env?.["Disable"] ?? ""
	).toLowerCase() === "true";

/**
 * Targeted "disable UI/rendering/CSS customisations" gate. When
 * `process.env.DisableUIFixes` is `true`, every transform that alters
 * CSS rules, overrides JavaScript rendering APIs (rAF, IdleValue,
 * IntersectionObserver), injects layout hints (z-index, isolation,
 * GPU-layer promotion, paint-prime offsetHeight reads), or applies
 * WKWebView compositor workarounds is skipped. All wire-level patches
 * (Replace*, StripWebviewIframe, PatchWebviewIframe, ExposeWorkbench,
 * Rewrite* URLs/CSP, DisableUnusedServices, EagerActivation, Storage
 * + Configuration overlays, Telemetry, Polling, IPC, etc.) remain
 * active. This restores stock VS Code CSS and rendering behaviour
 * while keeping every non-visual Land integration wired up.
 *
 * Code is NOT removed - the transforms are simply spliced out of the
 * pipeline array so flipping the env var back to `false` re-enables
 * them in one rebuild.
 */
const LandDisableUIFixes =
	(
		(
			globalThis as {
				process?: { env?: Record<string, string | undefined> };
			}
		).process?.env?.["DisableUIFixes"] ?? ""
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

	const Pipeline: Array<Plugin> = [
		CopyVSOutputFactory(Input.VSOutput),

		CopyVSRootFilesFactory(Input.VSRootFiles),

		SupplementFromDependencyFactory(Input.Supplement),

		CopyWorkerFactory(Input.Worker),

		CopyNodeModulesFactory(Input.NodeModules),

		StubUnpublishedAddonsFactory(Input.Addons),

		CopyTauriMainProcessServiceFactory(Input.TauriMainProcessService),

		CSSStrategy,

		InjectNameShim,

		// LAND-PATCH: replace VS Code product identity strings with Land's
		// values from Element/Sky/Public/product.json. Targets "Code - OSS",
		// "code-oss", ".vscode-oss", darwinBundleIdentifier, urlProtocol,
		// applicationName, and similar identity substrings embedded by VS
		// Code's build scripts in compiled JS output. Runs on every JS file
		// after copy; single-replacement per call so files are fully
		// patched after one pass. Idempotent.
		ReplaceProductIdentity,

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
		// before any contribution touches them. Always-on - the
		// workbench crashes at module-eval time without these.
		// Idempotent.
		InjectWebViewPolyfills,

		// Disable WKWebView lazy-paint mechanisms so workbench panels
		// render on `display:flex` rather than waiting for a hover or
		// scroll. Replaces `requestAnimationFrame` with a coalesced
		// `setTimeout(0)` queue, `IntersectionObserver` with a
		// fire-on-observe stub, and strips `content-visibility:auto`
		// + `contain:paint` from workbench-level CSS rules.
		// Idempotent. Runs after the polyfill injector so its
		// rAF/IO overrides land on top of any earlier shim.
		...(LandDisableUIFixes ? [] : [InjectDisableLazyPaint]),

		// Force workbench parts/panels/composites to be interactive
		// on `display:flex`. Strips `pointer-events:none`,
		// `visibility:hidden`, `opacity:0` cascades and zeros panel
		// transition durations so panels appear instantly.
		// Companion to InjectDisableLazyPaint: that one fixed paint;
		// this fixes interactivity. Idempotent.
		...(LandDisableUIFixes ? [] : [InjectWorkbenchInteractivityCSS]),

		// Force WKWebView's compositor to commit pending layout for
		// each workbench part layer at boot and on the first
		// interaction with each part. One synchronous
		// `void offsetHeight` read per part suffices to commit the
		// layer to the compositor; without it, panels may stay in
		// a "first paint pending" state until something else
		// triggers a forced layout. Idempotent.
		...(LandDisableUIFixes ? [] : [InjectWorkbenchPaintPrime]),

		// Reserve the macOS traffic-light cluster width on the
		// titlebar's left edge so the in-window menubar
		// (`File / Edit / View / ...`) and the command-center
		// quick-pick stop colliding with the OS-painted close /
		// minimize / maximize buttons. Targets `.monaco-workbench.mac`
		// only; non-macOS builds keep their stock layout. Includes a
		// fullscreen detector that toggles `body.land-fullscreen` so
		// the 80px reservation reclaims to 0 when traffic lights are
		// hidden (macOS native fullscreen). Right side is left
		// untouched - traffic lights only sit on the left on macOS,
		// so no right-edge padding is applied.
		// Always active - structural fix; not gated by DisableUIFixes.
		// Idempotent (marker `__LAND_MAC_TITLEBAR_OFFSET__`).
		InjectMacTitlebarOffsetCSS,

		// Stamp `data-tauri-drag-region` on workbench titlebar drag
		// regions so click-and-drag on those areas moves the Tauri 2
		// window. Stock VS Code relies on Chromium's
		// `-webkit-app-region: drag`, which Tauri's overlay-titlebar
		// hit-test ignores - the equivalent attribute is the explicit
		// `data-tauri-drag-region`. Stamps every match on first scan
		// and observes `<body>` for late-mounted drag regions (titlebar
		// repaints on profile switch / window-mode toggle). Interactive
		// children (menubar items, command-center button, window
		// controls) get `data-tauri-drag-region="false"` so click
		// events still land on them. Cross-OS (drag handle wiring is
		// needed everywhere, not just macOS).
		// Always active - not a perf optimisation; not gated by
		// DisableUIFixes. Idempotent (marker `__LAND_TAURI_DRAG_REGION__`).
		InjectTauriDragRegion,

		// Establish a deterministic z-index hierarchy across the
		// workbench parts so a sibling that picked up an implicit
		// stacking context (transform, opacity, isolation) can't
		// hide the activity bar, sidebar, panel resize handle,
		// status bar progress badges, or the command-center
		// quick-pick dropdown. Hardens stock CSS without changing
		// its intent. Idempotent.
		// Gated behind `DisableUIFixes`: the `.monaco-workbench .part
		// { isolation: isolate }` rule this transform emits has been
		// observed to hide the in-window menubar under specific
		// configurations, so operators running with the env var set
		// (e.g. when diagnosing menubar / dropdown clipping) need this
		// transform OFF. Skipping it returns workbench parts to stock
		// CSS stacking-context behaviour.
		...(LandDisableUIFixes ? [] : [InjectPartZIndexCSS]),

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
		...(LandDisableUIFixes ? [] : [InjectEagerIdleValue]),

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
		// ~/.fiddee/extensions/ - no marketplace traffic.
		ReplaceExtensionGalleryService,

		StaticToDynamicImport,

		StripDanglingSourceMap,

		ExtensionScannerIPC,

		CatchOutputFolderRejection,

		StripWebviewIframeSandbox,

		// Inject verbose console logging into the webview iframe
		// preloader for diagnosing extension webview loading failures
		// on WKWebView / Tauri. Logs every lifecycle stage: INDEX_BOOT,
		// SW_REGISTER, SIGNAL_START, SIGNAL_OK, SIGNAL_FAIL,
		// CONTENT_EVENT, INNER_FRAME_FAKE, INNER_FRAME_LOADED,
		// INNER_WRITE. Idempotent via __LAND_WEBVIEW_DEBUG_INJECT__ marker.
		InjectWebviewDebugLogging,

		InjectWebviewRuntimeDiagnostics,

		InjectWebviewRuntimeDiagnosticsInner,

		// Default `disableServiceWorker = true` inside the webview iframe
		// shell so the bootstrap script's `await workerReady` resolves
		// immediately under WKWebView (which rejects ServiceWorker
		// registration on the `vscode-webview://` custom protocol). Without
		// this every extension webview hangs at the bare `pre/index.html`
		// chrome because the `content` message handler awaits the rejected
		// `workerReady` promise and bails on `fatal-error` before rendering
		// the extension HTML. Idempotent. Marker `__LAND_DISABLE_WEBVIEW_SW__`.
		PatchWebviewIframeServiceWorker,

		// Rewrite `vscode-file://` and `vscode-webview-resource://` URLs in
		// the extension webview's inner-iframe HTML to `blob:` URLs fetched
		// from the outer shell's privileged context. WKWebView silently
		// blocks cross-protocol-scheme `<script src>` / `<link href>` loads
		// when the inner frame is sandboxed under `vscode-webview://`, so
		// without this rewrite the extension's React bundle never executes
		// and the panel stays blank. Wraps `Document.prototype.write` on the
		// inner frame's `contentDocument` at the `onFrameLoaded` call site
		// and rewrites attributes via DOMParser + fetch + createObjectURL
		// before forwarding to the original write. Blob URLs are cached per
		// original URL for the outer shell's lifetime. Must run after
		// `PatchWebviewIframeServiceWorker` (SW disabled, hash soft-fail)
		// and before `RewriteWebviewShellCSP` (CSP `blob:` directive covers
		// the rewritten URLs). Idempotent via
		// `__LAND_WEBVIEW_BLOB_URL_REWRITE__` marker.
		InjectWebviewBlobUrlRewrite,

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
		...(LandDisableUIFixes ? [] : [InjectTerminalGPULayerCSS]),

		// Same GPU-layer hint applied to Monaco's editor canvases.
		// Targets the "underscore/cursor at a different place" symptom
		// where WKWebView's compositor lifts the cursor onto a layer
		// whose baseline diverges from the text layer during reflow.
		...(LandDisableUIFixes ? [] : [InjectEditorGPULayerCSS]),

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

	if (LandDisableUIFixes) {
		// UI/rendering transforms were spliced out above. Every wire
		// patch (Replace*, StripWebviewIframe, PatchWebviewIframe,
		// ExposeWorkbench, Rewrite* URLs/CSP, DisableUnusedServices,
		// EagerActivation, Storage + Configuration overlays, Telemetry,
		// Polling, IPC, etc.) remains active.
		return Pipeline;
	}

	return Pipeline;
};

export default BuildPipeline;
