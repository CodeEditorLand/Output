/**
 * Step: expose the workbench `IWorkbench` facade + its `IInstantiationService`
 * on `globalThis` so Land's Sky-side bridge code can call into the workbench's
 * internal services (`IStatusbarService`, `ISCMService`, `ICommandService`, …)
 * without re-implementing a parallel UI surface.
 *
 * Why a transform and not a runtime hook:
 *   Stock VS Code's `web.factory.js::create()` awaits `BrowserMain.open()`
 *   internally and completes `workbenchPromise` with the resulting IWorkbench.
 *   The IIFE in `workbench.js` never awaits that promise - it registers a
 *   disposable and returns. There is no public API to obtain the live
 *   `IInstantiationService` from outside the workbench once it boots, and the
 *   `IWorkbench` facade intentionally omits direct service access. Patching
 *   the compiled output files with two narrow additive rewrites is the least
 *   invasive path that preserves stock behaviour for every call site that
 *   does not use Land's bridge.
 *
 * Two files are patched:
 *
 *   1. `vs/workbench/browser/web.main.js` (BrowserMain.open) - plus its
 *      `vs/workbench/electron-browser/desktop.main.js` twin - insert
 *      `import { ExposeAccessor } from './CELExposeAccessor.js'` (or
 *      `'../browser/CELExposeAccessor.js'` for the electron file) at the
 *      top of the module, and call `ExposeAccessor(instantiationService)`
 *      immediately after `const instantiationService = workbench.startup();`.
 *
 *   2. `vs/workbench/browser/web.factory.js` (`create()` .then callback) -
 *      insert `import { OnWorkbenchReady } from './CELExposeAccessor.js'`
 *      and call `OnWorkbenchReady(workbench)` after
 *      `workbenchPromise.complete(workbench);`.
 *
 * The shim itself lives in `Element/Output/Source/Service/CELExposeAccessor.ts`
 * and is compiled by Output's esbuild step to
 * `Configuration/Service/CELExposeAccessor.js`. `ApplyPipeline.ts` copies
 * the compiled artefact into `Target/Microsoft/VSCode/vs/workbench/browser/
 * CELExposeAccessor.js` BEFORE this transform runs, so the injected import
 * resolves immediately.
 *
 * Both injections are idempotent (`indexOf('CELExposeAccessor')`
 * short-circuits) so re-running the transform on an already-patched tree is
 * a no-op. The transform only touches the three files above.
 */

import type { TransformPlugin } from "../../../Type.js";

// VS Code's `out/` tree uses single-quoted module specifiers (the original
// `tsc` emit), and Output now byte-copies those files instead of running them
// through esbuild's quote-normalising transform. Match what's actually on disk.
const WebMainImportMarker =
	"import { mark } from '../../base/common/performance.js';";
const WebMainImportInjection =
	"\nimport { ExposeAccessor as __CEL_ExposeAccessor } from './CELExposeAccessor.js';";

const DesktopMainImportMarker = "import { localize } from '../../nls.js';";
const DesktopMainImportInjection =
	"\nimport { ExposeAccessor as __CEL_ExposeAccessor } from '../browser/CELExposeAccessor.js';";

const WebFactoryImportMarker =
	"import { mark } from '../../base/common/performance.js';";
const WebFactoryImportInjection =
	"\nimport { OnWorkbenchReady as __CEL_OnWorkbenchReady } from './CELExposeAccessor.js';";

const StartupMarker = "const instantiationService = workbench.startup();";
const StartupInjection =
	StartupMarker + "\n        __CEL_ExposeAccessor(instantiationService);";

const WorkbenchReadyMarker = "workbenchPromise.complete(workbench);";
const WorkbenchReadyInjection =
	WorkbenchReadyMarker + "\n        __CEL_OnWorkbenchReady(workbench);";

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ExposeWorkbenchAccessor",
	Match: ({ Path }) =>
		/\/vs\/workbench\/browser\/web\.main\.js$/.test(Path) ||
		/\/vs\/workbench\/browser\/web\.factory\.js$/.test(Path) ||
		/\/vs\/workbench\/electron-browser\/desktop\.main\.js$/.test(Path),
	Transform({ Path, Source }) {
		if (Source.includes("CELExposeAccessor")) {
			// Already patched in a previous build pass.
			return { Kind: "Unchanged" };
		}
		const IsWebMain = /\/web\.main\.js$/.test(Path);
		const IsDesktopMain = /\/desktop\.main\.js$/.test(Path);
		const IsWebFactory = /\/web\.factory\.js$/.test(Path);

		if (IsWebMain || IsDesktopMain) {
			if (!Source.includes(StartupMarker)) {
				return { Kind: "Unchanged" };
			}
			const ImportMarker = IsDesktopMain
				? DesktopMainImportMarker
				: WebMainImportMarker;
			const ImportInjection = IsDesktopMain
				? DesktopMainImportInjection
				: WebMainImportInjection;
			if (!Source.includes(ImportMarker)) {
				return { Kind: "Unchanged" };
			}
			const Next = Source.replace(
				ImportMarker,
				ImportMarker + ImportInjection,
			).replace(StartupMarker, StartupInjection);
			return Next === Source
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: Next };
		}

		if (IsWebFactory) {
			if (!Source.includes(WorkbenchReadyMarker)) {
				return { Kind: "Unchanged" };
			}
			if (!Source.includes(WebFactoryImportMarker)) {
				return { Kind: "Unchanged" };
			}
			const Next = Source.replace(
				WebFactoryImportMarker,
				WebFactoryImportMarker + WebFactoryImportInjection,
			).replace(WorkbenchReadyMarker, WorkbenchReadyInjection);
			return Next === Source
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: Next };
		}

		return { Kind: "Unchanged" };
	},
};

export default Plugin;
