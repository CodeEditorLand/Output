var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
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
const Plugin = {
	Kind: "Transform",
	Name: "ExposeWorkbenchAccessor",
	Match: /* @__PURE__ */ __name(
		({ Path }) =>
			/\/vs\/workbench\/browser\/web\.main\.js$/.test(Path) ||
			/\/vs\/workbench\/browser\/web\.factory\.js$/.test(Path) ||
			/\/vs\/workbench\/electron-browser\/desktop\.main\.js$/.test(Path),
		"Match",
	),
	Transform({ Path, Source }) {
		if (Source.includes("CELExposeAccessor")) {
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
var Accessor_default = Plugin;
export { Accessor_default as default };
//# sourceMappingURL=Accessor.js.map
