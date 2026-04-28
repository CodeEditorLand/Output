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
import InjectWebViewPolyfills from "./Transform/InjectWebViewPolyfills.js";
import InlineCSSImport from "./Transform/InlineCSSImport.js";
import InstrumentVscodeGit from "./Transform/InstrumentVscodeGit.js";
import PatchLocalTerminalBackend from "./Transform/PatchLocalTerminalBackend.js";
import ReplaceElectronIPCService from "./Transform/ReplaceElectronIPCService.js";
import ReplaceSearchService from "./Transform/ReplaceSearchService.js";
import ReplaceSharedProcess from "./Transform/ReplaceSharedProcess.js";
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
export { default as InjectWebViewPolyfills } from "./Transform/InjectWebViewPolyfills.js";
export { default as RewriteWorkerURLs } from "./Transform/RewriteWorkerURLs.js";
export { default as RewriteWorkbenchBaseURL } from "./Transform/RewriteWorkbenchBaseURL.js";
export { default as ReplaceElectronIPCService } from "./Transform/ReplaceElectronIPCService.js";
export { default as ReplaceSharedProcess } from "./Transform/ReplaceSharedProcess.js";
export { default as StaticToDynamicImport } from "./Transform/StaticToDynamicImport.js";
export { default as StripDanglingSourceMap } from "./Transform/StripDanglingSourceMap.js";
export { default as ExtensionScannerIPC } from "./Transform/ExtensionScannerIPC.js";
export { default as CatchOutputFolderRejection } from "./Transform/CatchOutputFolderRejection.js";
export { default as StripWebviewIframeSandbox } from "./Transform/StripWebviewIframeSandbox.js";
export { default as ExposeWorkbenchAccessor } from "./Transform/ExposeWorkbenchAccessor.js";
export { default as InstrumentVscodeGit } from "./Transform/InstrumentVscodeGit.js";
export { default as DisableUnusedServices } from "./Transform/DisableUnusedServices.js";
export { default as ReplaceSearchService } from "./Transform/ReplaceSearchService.js";
export { default as PatchLocalTerminalBackend } from "./Transform/PatchLocalTerminalBackend.js";

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
 * Compose the full default pipeline in the canonical order. Consumers can
 * still hand-assemble their own arrays if they want to skip / reorder.
 */
export const BuildPipeline = (Input: BuildPipelineInput): Array<Plugin> => {
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
		PatchLocalTerminalBackend,
	];
};

export default BuildPipeline;
