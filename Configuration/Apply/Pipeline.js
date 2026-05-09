import { mkdir as c, copyFile as n } from "node:fs/promises";

import { dirname as a, resolve as t } from "node:path";

import l from "../Plugin/Apply.js";

const e = await import("../Plugin/Index.js"),

	p = [
		{

			From: "Configuration/Service/Tauri/Main/Process/Service.js",

			To: "Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/TauriMainProcessService.js",

			Why: "Source authored at Source/Service/Tauri/Main/Process/Service.ts (split reverse-hierarchically: every leaf is a single word). ReplaceElectronIPCService rewrites VS Code's mainProcessService.js to `import './TauriMainProcessService.js'` so the destination filename keeps the legacy compound name the workbench expects.",
		},

		{

			From: "Configuration/Service/CEL/Expose/Accessor.js",

			To: "Target/Microsoft/VSCode/vs/workbench/browser/CELExposeAccessor.js",

			Why: "ExposeWorkbenchAccessor injects `import './CELExposeAccessor.js'` into web.main.js + web.factory.js (and `'../browser/CELExposeAccessor.js'` into desktop.main.js). Source split into CEL/Expose/Accessor.ts; destination filename retains the compound to match the runtime import strings.",
		},

		{

			From: "Configuration/Service/CEL/Shared/Process/Service.js",

			To: "Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/CELSharedProcessService.js",

			Why: "ReplaceSharedProcess reduces sharedProcessService.js to a one-line re-export pointing at this canonical sibling of TauriMainProcessService. Drop colocated so the `import './TauriMainProcessService.js'` inside the shim resolves directly.",
		},

		{

			From: "Configuration/Service/CEL/Extensions/Scanner/Service.js",

			To: "Target/Microsoft/VSCode/vs/workbench/services/extensions/common/CELExtensionsScannerService.js",

			Why: "ExtensionScannerIPC reduces both electron-browser/ and browser/ variants of extensionsScannerService.js to one-line re-exports pointing at this `common/` sibling. Single canonical drop avoids divergence between the two variants.",
		},

		{

			From: "Configuration/Service/CEL/Search/Service.js",

			To: "Target/Microsoft/VSCode/vs/workbench/services/search/common/CELSearchService.js",

			Why: "ReplaceSearchService reduces both electron-browser/ and browser/ variants of searchService.js to one-line re-exports pointing at this `common/` sibling so the Mountain-IPC-backed RemoteSearchService is a single source of truth.",
		},

		{

			From: "Configuration/Service/CEL/Null/Telemetry/Service.js",

			To: "Target/Microsoft/VSCode/vs/platform/telemetry/common/CELNullTelemetryService.js",

			Why: "ReplaceTelemetryService reduces telemetryService.js to a one-line re-export pointing at this no-op sibling. Telemetry is neutralised in three layers (consent off + service no-op + appender absent); this is the second layer.",
		},

		{

			From: "Configuration/Service/CEL/Null/Update/Service.js",

			To: "Target/Microsoft/VSCode/vs/platform/update/common/CELNullUpdateService.js",

			Why: "ReplaceUpdateService reduces both abstractUpdateService.js and updateService.js to one-line re-exports pointing at this never-update stub. Auto-update goes through Air's signed-binary path, not update.code.visualstudio.com.",
		},

		{

			From: "Configuration/Service/CEL/Null/Extension/Gallery/Service.js",

			To: "Target/Microsoft/VSCode/vs/platform/extensionManagement/common/CELNullExtensionGalleryService.js",

			Why: "ReplaceExtensionGalleryService reduces extensionGalleryService.js to a one-line re-export pointing at this no-op stub. User extensions are sideloaded from ~/.land/extensions/ - no marketplace traffic.",
		},
	];

for (const o of p) {

	const r = t(process.cwd(), o.From),

		i = t(process.cwd(), o.To);

	(await c(a(i), { recursive: !0 }),

		await n(r, i),

		console.log(`[Output/Pipeline] Copied ${o.From} -> ${i}`));
}

const S = [
		e.InjectNameShim,

		e.InjectWorkerBootstrapShim,

		e.RewriteNestedWorkerBootstrap,

		e.RewritePerfBaselineWorker,

		e.RewriteNodeModulesPath,

		e.InjectWebViewPolyfills,

		e.RewriteWorkerURLs,

		e.RewriteWorkbenchBaseURL,

		e.RewriteStaticBlockSelfRef,

		e.HoistFunctionDeclarations,

		e.ReplaceElectronIPCService,

		e.ReplaceSharedProcess,

		e.StripDanglingSourceMap,

		e.ExtensionScannerIPC,

		e.CatchOutputFolderRejection,

		e.StripWebviewIframeSandbox,

		e.PatchWebviewIframeServiceWorker,

		e.ExposeWorkbenchAccessor,

		e.InstrumentVscodeGit,

		e.DisableUnusedServices,

		e.ReplaceSearchService,

		e.PatchLocalTerminalBackend,

		e.InjectConfigurationOverlay,

		e.InjectStorageOverlay,

		e.RewriteIconsStyleSheetURLs,
	],

	m = t(process.cwd(), "Target/Microsoft/VSCode"),

	s = await l({
		Plugins: S,
		Roots: [{ Path: m, Role: "app" }],
		Log: (o) => console.log(`[Output/Pipeline] ${o}`),
	}),

	d = s.Transform.reduce((o, r) => o + r.Rewritten, 0);

console.log(
	`[Output/Pipeline] Done: ${s.Transform.length} transforms, ${d} files rewritten.`,
);

var g = {};

export { g as default };
