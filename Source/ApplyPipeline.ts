/**
 * Output-side transform runner.
 *
 * Runs at the tail of `Source/prepublishOnly.sh`, AFTER `Build` has
 * populated `Target/Microsoft/VSCode/` from the upstream VS Code
 * source. Applies the transform plugins from `Plugin/Index.ts` to
 * Output's own Target so every consumer (Sky's `/Static/Application/`
 * copy AND Sky's bundled Vite walk) sees pre-transformed files.
 *
 * Why here and not in Sky's `astro:build:done`:
 *   • Sky's bundled tree (Vite) walks `@codeeditorland/output/Target/...`
 *     BEFORE astro:build:done fires. Running transforms in Sky leaves
 *     the bundled output un-shimmed.
 *   • Putting transforms here means Output ships a single canonical
 *     pre-transformed tree. Both consumers benefit, no duplication.
 *
 * Only TRANSFORM plugins run here - copy plugins (CopyVSOutput,
 * CopyWorker, etc.) belong in Sky because they target Sky's output
 * dir, not Output's. The Mountain-coupled inline patches (workbench.js
 * error surfacing, desktop.main.js perf marks, built-in extension
 * copy + npm install) stay in Sky for the same reason.
 *
 * Idempotent: every transform's `Match` filter narrows to specific
 * paths and most check for a marker before patching, so re-running
 * the script (or re-running Sky's pipeline on top of these changes)
 * is safe.
 */

import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import ApplyPlugins from "./Plugin/Apply.js";
import type { Plugin } from "./Plugin/Type.js";

const Configuration = await import("./Plugin/Index.js");

// -----------------------------------------------------------------------------
// COPY STEP: TauriMainProcessService.js into Target tree
// -----------------------------------------------------------------------------
// `ReplaceElectronIPCService` transform rewrites VS Code's
// `vs/platform/ipc/electron-browser/mainProcessService.js` to
// `import "./TauriMainProcessService.js"`. Sky's astro:build:done
// pipeline copies the file into Sky/Target/Static/Application/ AFTER
// Vite has finished walking modules - so the bundled tree (Vite) finds
// the rewritten import but no sibling file, and fails with
// `Could not resolve "./TauriMainProcessService.js"`.
//
// Fix: copy the compiled service into Output's own Target as the
// canonical source, BEFORE transforms run. Both Sky paths (the
// `/Static/Application/` copy and the bundled Vite walk) consume
// Output's Target, so the file is available everywhere.
// Each entry copies one compiled service module from `Configuration/Service/`
// into the in-place VS Code tree at the location its companion transform
// expects to import. The entries below are processed serially before the
// transform pipeline runs so every transform's injected `import './Foo.js'`
// already has its sibling on disk.
const ServiceCopies: ReadonlyArray<{
	From: string;
	To: string;
	Why: string;
}> = [
	{
		From: "Configuration/Service/TauriMainProcessService.js",
		To: "Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/TauriMainProcessService.js",
		Why: "ReplaceElectronIPCService rewrites VS Code's mainProcessService.js to `import './TauriMainProcessService.js'`; Sky's astro:build:done copy fires AFTER Vite has walked modules, so the bundled tree fails to resolve the sibling. Copying into Output's own Target makes the file available to both Sky paths.",
	},
	{
		From: "Configuration/Service/CELExposeAccessor.js",
		To: "Target/Microsoft/VSCode/vs/workbench/browser/CELExposeAccessor.js",
		Why: "ExposeWorkbenchAccessor injects `import './CELExposeAccessor.js'` into web.main.js + web.factory.js (and `'../browser/CELExposeAccessor.js'` into desktop.main.js). The shim is authored in Source/Service/CELExposeAccessor.ts, compiled by Output's esbuild step, and dropped here so the imports resolve at runtime.",
	},
	{
		From: "Configuration/Service/CELSharedProcessService.js",
		To: "Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/CELSharedProcessService.js",
		Why: "ReplaceSharedProcess reduces `vs/workbench/services/sharedProcess/electron-browser/sharedProcessService.js` to a one-line re-export pointing at this canonical sibling of TauriMainProcessService. Drop colocated with TauriMainProcessService so the `import './TauriMainProcessService.js'` inside the shim resolves directly.",
	},
	{
		From: "Configuration/Service/CELExtensionsScannerService.js",
		To: "Target/Microsoft/VSCode/vs/workbench/services/extensions/common/CELExtensionsScannerService.js",
		Why: "ExtensionScannerIPC reduces both `electron-browser/extensionsScannerService.js` and `browser/extensionsScannerService.js` to one-line re-exports pointing at this `common/` sibling. Single canonical drop avoids divergence between the two variants.",
	},
	{
		From: "Configuration/Service/CELSearchService.js",
		To: "Target/Microsoft/VSCode/vs/workbench/services/search/common/CELSearchService.js",
		Why: "ReplaceSearchService reduces both `electron-browser/searchService.js` and `browser/searchService.js` to one-line re-exports pointing at this `common/` sibling so the Mountain-IPC-backed RemoteSearchService is a single source of truth.",
	},
	{
		From: "Configuration/Service/CELNullTelemetryService.js",
		To: "Target/Microsoft/VSCode/vs/platform/telemetry/common/CELNullTelemetryService.js",
		Why: "ReplaceTelemetryService reduces `telemetryService.js` to a one-line re-export pointing at this no-op sibling. Telemetry is neutralised in three layers (consent off + service no-op + appender absent); this is the second layer.",
	},
	{
		From: "Configuration/Service/CELNullUpdateService.js",
		To: "Target/Microsoft/VSCode/vs/platform/update/common/CELNullUpdateService.js",
		Why: "ReplaceUpdateService reduces both `abstractUpdateService.js` and `updateService.js` to one-line re-exports pointing at this never-update stub. Auto-update goes through Air's signed-binary path, not update.code.visualstudio.com.",
	},
	{
		From: "Configuration/Service/CELNullExtensionGalleryService.js",
		To: "Target/Microsoft/VSCode/vs/platform/extensionManagement/common/CELNullExtensionGalleryService.js",
		Why: "ReplaceExtensionGalleryService reduces `extensionGalleryService.js` to a one-line re-export pointing at this no-op stub. User extensions are sideloaded from ~/.land/extensions/ - no marketplace traffic.",
	},
];

for (const Entry of ServiceCopies) {
	const From = resolve(process.cwd(), Entry.From);
	const To = resolve(process.cwd(), Entry.To);
	await mkdir(dirname(To), { recursive: true });
	await copyFile(From, To);
	console.log(`[Output/Pipeline] Copied ${Entry.From} -> ${To}`);
}

// `StaticToDynamicImport` and `StripCSSImport` / `InlineCSSImport` are
// INTENTIONALLY excluded from this Output-side pipeline.
//
// They both rewrite static `import "./foo.{js,css}"` statements into
// runtime forms (`await import(...)` for JS, `_LOAD_CSS_WORKER(...)`
// for CSS). Those forms suit the existing `/Static/Application/` path
// where every file is served as a separate HTTP asset and loaded
// individually via the Worker SW.
//
// For the bundled tree (Vite walks Output's Target), we WANT static
// imports so Rollup can follow the module graph and emit a single
// hashed chunk. Same for CSS - Vite's native pipeline extracts and
// hashes CSS assets into `_astro/`, with `cssCodeSplit: false` set
// in `astro.config.ts` to fold every CSS module into one file.
//
// Sky's `astro:build:done` hook still runs the full `BuildPipeline`
// (which DOES include StaticToDynamicImport + CSSStrategy) over
// Sky/Target/Static/Application/, so the existing path keeps its
// runtime-load behaviour. The two output trees diverge here on
// purpose.
const Pipeline: Array<Plugin> = [
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
	Configuration.RewriteIconsStyleSheetURLs,
];

const Target = resolve(process.cwd(), "Target/Microsoft/VSCode");

const Outcome = await ApplyPlugins({
	Plugins: Pipeline,
	Roots: [{ Path: Target, Role: "app" }],
	Log: (Message) => console.log(`[Output/Pipeline] ${Message}`),
});

const RewrittenTotal = Outcome.Transform.reduce(
	(Sum, Item) => Sum + Item.Rewritten,
	0,
);

console.log(
	`[Output/Pipeline] Done: ${Outcome.Transform.length} transforms, ${RewrittenTotal} files rewritten.`,
);

export default {} as const;
