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
const Source = resolve(
	process.cwd(),
	"Configuration/Service/TauriMainProcessService.js",
);
const Destination = resolve(
	process.cwd(),
	"Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/TauriMainProcessService.js",
);
await mkdir(dirname(Destination), { recursive: true });
await copyFile(Source, Destination);
console.log(
	`[Output/Pipeline] Copied TauriMainProcessService.js -> ${Destination}`,
);

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
