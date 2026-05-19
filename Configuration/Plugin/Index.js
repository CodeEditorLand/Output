import { default as default2 } from "./Apply.js";
import {
	CopyNodeModules,
	CopyNodeModules as CopyNodeModulesFactory,
	default as default55,
	DefaultPackages,
} from "./Copy/Copy/Node/Modules.js";
import {
	CopyTauriMainProcessService,
	CopyTauriMainProcessService as CopyTauriMainProcessServiceFactory,
	default as default57,
} from "./Copy/Copy/Tauri/Main/Process/Service.js";
import {
	CopyVSOutput,
	CopyVSOutput as CopyVSOutputFactory,
	default as default51,
} from "./Copy/Copy/VS/Output.js";
import {
	CopyVSRootFiles,
	CopyVSRootFiles as CopyVSRootFilesFactory,
	default as default52,
} from "./Copy/Copy/VS/Root/Files.js";
import {
	CopyWorker,
	CopyWorker as CopyWorkerFactory,
	default as default54,
} from "./Copy/Copy/Worker.js";
import {
	default as default56,
	DefaultStubs,
	StubDataPrefix,
	StubUnpublishedAddons,
	StubUnpublishedAddons as StubUnpublishedAddonsFactory,
} from "./Copy/Stub/Unpublished/Addons.js";
import {
	default as default53,
	SupplementFromDependency,
	SupplementFromDependency as SupplementFromDependencyFactory,
} from "./Copy/Supplement/From/Dependency.js";
import CatchOutputFolderRejection, {
	default as default38,
} from "./Transform/Catch/Output/Folder/Rejection.js";
import DisableUnusedServices, {
	default as default42,
} from "./Transform/Disable/Unused/Services.js";
import ExposeWorkbenchAccessor, {
	default as default40,
} from "./Transform/Expose/Workbench/Accessor.js";
import ExtensionScannerIPC, {
	default as default37,
} from "./Transform/Extension/Scanner/IPC.js";
import ForceTextAreaInput, {
	default as default20,
} from "./Transform/Force/Text/Area/Input.js";
import HoistFunctionDeclarations, {
	default as default29,
} from "./Transform/Hoist/Function/Declarations.js";
import InjectConfigurationOverlay, {
	default as default18,
} from "./Transform/Inject/Configuration/Overlay.js";
import InjectDisableLazyPaint, {
	default as default6,
} from "./Transform/Inject/Disable/Lazy/Paint.js";
import InjectEagerExtensionActivation, {
	default as default7,
} from "./Transform/Inject/Eager/Extension/Activation.js";
import InjectEagerIdleValue, {
	default as default8,
} from "./Transform/Inject/Eager/Idle/Value.js";
import InjectEagerLifecyclePhase, {
	default as default9,
} from "./Transform/Inject/Eager/Lifecycle/Phase.js";
import InjectEditorGPULayerCSS, {
	default as default45,
} from "./Transform/Inject/Editor/GPU/Layer/CSS.js";
import InjectMacTitlebarOffsetCSS, {
	default as default13,
} from "./Transform/Inject/Mac/Titlebar/Offset/CSS.js";
import InjectNameShim, {
	default as default5,
} from "./Transform/Inject/Name/Shim.js";
import InjectPartZIndexCSS, {
	default as default14,
} from "./Transform/Inject/Part/Z/Index/CSS.js";
import InjectStorageOverlay, {
	default as default19,
} from "./Transform/Inject/Storage/Overlay.js";
import InjectStripBackgroundPolling, {
	default as default10,
} from "./Transform/Inject/Strip/Background/Polling.js";
import InjectTelemetryConsentOff, {
	default as default11,
} from "./Transform/Inject/Telemetry/Consent/Off.js";
import InjectTerminalGPULayerCSS, {
	default as default46,
} from "./Transform/Inject/Terminal/GPU/Layer/CSS.js";
import InjectWebViewPolyfills, {
	default as default12,
} from "./Transform/Inject/Web/View/Polyfills.js";
import InjectWebviewBlobUrlRewrite, {
	default as default50,
} from "./Transform/Inject/Webview/Blob/Url/Rewrite.js";
import InjectWebviewDebugLogging from "./Transform/Inject/Webview/Debug/Logging.js";
import InjectWebviewRuntimeDiagnostics from "./Transform/Inject/Webview/Debug/RuntimeDiagnostics.js";
import InjectWebviewRuntimeDiagnosticsInner from "./Transform/Inject/Webview/Debug/RuntimeDiagnosticsInner.js";
import InjectWorkbenchInteractivityCSS, {
	default as default15,
} from "./Transform/Inject/Workbench/Interactivity/CSS.js";
import InjectWorkbenchPaintPrime, {
	default as default16,
} from "./Transform/Inject/Workbench/Paint/Prime.js";
import InjectWorkerBootstrapShim, {
	default as default17,
} from "./Transform/Inject/Worker/Bootstrap/Shim.js";
import InlineCSSImport, {
	default as default4,
} from "./Transform/Inline/CSS/Import.js";
import InstrumentVscodeGit, {
	default as default41,
} from "./Transform/Instrument/Vscode/Git.js";
import PatchLocalTerminalBackend, {
	default as default47,
} from "./Transform/Patch/Local/Terminal/Backend.js";
import PatchTerminalGpuAcceleration, {
	default as default48,
} from "./Transform/Patch/Terminal/GPU/Acceleration.js";
import PatchWebviewIframeServiceWorker, {
	default as default49,
} from "./Transform/Patch/Webview/Iframe/Service/Worker.js";
import ReplaceElectronIPCService, {
	default as default30,
} from "./Transform/Replace/Electron/IPC/Service.js";
import ReplaceExtensionGalleryService, {
	default as default31,
} from "./Transform/Replace/Extension/Gallery/Service.js";
import ReplaceProductIdentity, {
	default as default43,
} from "./Transform/Replace/Product/Identity.js";
import ReplaceSearchService, {
	default as default44,
} from "./Transform/Replace/Search/Service.js";
import ReplaceSharedProcess, {
	default as default32,
} from "./Transform/Replace/Shared/Process.js";
import ReplaceTelemetryService, {
	default as default33,
} from "./Transform/Replace/Telemetry/Service.js";
import ReplaceUpdateService, {
	default as default34,
} from "./Transform/Replace/Update/Service.js";
import RewriteIconsStyleSheetURLs, {
	default as default21,
} from "./Transform/Rewrite/Icons/Style/Sheet/URLs.js";
import RewriteNestedWorkerBootstrap, {
	default as default23,
} from "./Transform/Rewrite/Nested/Worker/Bootstrap.js";
import RewriteNodeModulesPath, {
	default as default24,
} from "./Transform/Rewrite/Node/Modules/Path.js";
import RewritePerfBaselineWorker, {
	default as default25,
} from "./Transform/Rewrite/Perf/Baseline/Worker.js";
import RewriteStaticBlockSelfRef, {
	default as default28,
} from "./Transform/Rewrite/Static/Block/Self/Ref.js";
import RewriteWebviewShellCSP, {
	default as default22,
} from "./Transform/Rewrite/Webview/Shell/CSP.js";
import RewriteWorkbenchBaseURL, {
	default as default27,
} from "./Transform/Rewrite/Workbench/Base/URL.js";
import RewriteWorkerURLs, {
	default as default26,
} from "./Transform/Rewrite/Worker/URLs.js";
import StaticToDynamicImport, {
	default as default35,
} from "./Transform/Static/To/Dynamic/Import.js";
import StripCSSImport, {
	default as default3,
} from "./Transform/Strip/CSS/Import.js";
import StripDanglingSourceMap, {
	default as default36,
} from "./Transform/Strip/Dangling/Source/Map.js";
import StripWebviewIframeSandbox, {
	default as default39,
} from "./Transform/Strip/Webview/Iframe/Sandbox.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

export * from "./Type.js";

const LandDisableAll =
	(globalThis.process?.env?.["Disable"] ?? "").toLowerCase() === "true";
const LandDisableUIFixes =
	(globalThis.process?.env?.["DisableUIFixes"] ?? "").toLowerCase() ===
	"true";
const BuildPipeline = /* @__PURE__ */ __name((Input) => {
	const IsRelease = (Input.Profile ?? "").startsWith("release");
	const CSSStrategy = IsRelease ? InlineCSSImport : StripCSSImport;
	if (LandDisableAll) {
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
	const Pipeline = [
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
		// only; non-macOS builds keep their stock layout. Idempotent.
		...(LandDisableUIFixes ? [] : [InjectMacTitlebarOffsetCSS]),
		// Establish a deterministic z-index hierarchy across the
		// workbench parts so a sibling that picked up an implicit
		// stacking context (transform, opacity, isolation) can't
		// hide the activity bar, sidebar, panel resize handle,
		// status bar progress badges, or the command-center
		// quick-pick dropdown. Hardens stock CSS without changing
		// its intent. Idempotent.
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
		// ~/.land/extensions/ - no marketplace traffic.
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
		return Pipeline;
	}
	return Pipeline;
}, "BuildPipeline");
var Index_default = BuildPipeline;
export {
	default2 as ApplyPlugins,
	BuildPipeline,
	default38 as CatchOutputFolderRejection,
	CopyNodeModules,
	default55 as CopyNodeModulesDefault,
	CopyTauriMainProcessService,
	default57 as CopyTauriMainProcessServiceDefault,
	CopyVSOutput,
	default51 as CopyVSOutputDefault,
	CopyVSRootFiles,
	default52 as CopyVSRootFilesDefault,
	CopyWorker,
	default54 as CopyWorkerDefault,
	DefaultPackages as DefaultNodeModulePackages,
	DefaultStubs,
	default42 as DisableUnusedServices,
	default40 as ExposeWorkbenchAccessor,
	default37 as ExtensionScannerIPC,
	default20 as ForceTextAreaInput,
	default29 as HoistFunctionDeclarations,
	default18 as InjectConfigurationOverlay,
	default6 as InjectDisableLazyPaint,
	default7 as InjectEagerExtensionActivation,
	default8 as InjectEagerIdleValue,
	default9 as InjectEagerLifecyclePhase,
	default45 as InjectEditorGPULayerCSS,
	default13 as InjectMacTitlebarOffsetCSS,
	default5 as InjectNameShim,
	default14 as InjectPartZIndexCSS,
	default19 as InjectStorageOverlay,
	default10 as InjectStripBackgroundPolling,
	default11 as InjectTelemetryConsentOff,
	default46 as InjectTerminalGPULayerCSS,
	default12 as InjectWebViewPolyfills,
	default50 as InjectWebviewBlobUrlRewrite,
	default15 as InjectWorkbenchInteractivityCSS,
	default16 as InjectWorkbenchPaintPrime,
	default17 as InjectWorkerBootstrapShim,
	default4 as InlineCSSImport,
	default41 as InstrumentVscodeGit,
	default47 as PatchLocalTerminalBackend,
	default48 as PatchTerminalGpuAcceleration,
	default49 as PatchWebviewIframeServiceWorker,
	default30 as ReplaceElectronIPCService,
	default31 as ReplaceExtensionGalleryService,
	default43 as ReplaceProductIdentity,
	default44 as ReplaceSearchService,
	default32 as ReplaceSharedProcess,
	default33 as ReplaceTelemetryService,
	default34 as ReplaceUpdateService,
	default21 as RewriteIconsStyleSheetURLs,
	default23 as RewriteNestedWorkerBootstrap,
	default24 as RewriteNodeModulesPath,
	default25 as RewritePerfBaselineWorker,
	default28 as RewriteStaticBlockSelfRef,
	default22 as RewriteWebviewShellCSP,
	default27 as RewriteWorkbenchBaseURL,
	default26 as RewriteWorkerURLs,
	default35 as StaticToDynamicImport,
	default3 as StripCSSImport,
	default36 as StripDanglingSourceMap,
	default39 as StripWebviewIframeSandbox,
	StubDataPrefix,
	StubUnpublishedAddons,
	default56 as StubUnpublishedAddonsDefault,
	SupplementFromDependency,
	default53 as SupplementFromDependencyDefault,
	Index_default as default,
};
//# sourceMappingURL=Index.js.map
