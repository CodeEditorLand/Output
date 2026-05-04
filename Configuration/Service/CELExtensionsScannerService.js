import { Emitter } from "../../../../base/common/event.js";
import { URI } from "../../../../base/common/uri.js";
import { IExtensionsScannerService } from "../../../../platform/extensionManagement/common/extensionsScannerService.js";
import {
	InstantiationType,
	registerSingleton,
} from "../../../../platform/instantiation/common/extensions.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Trace = /* @__PURE__ */ __name((Tag, Detail) => {
	try {
		performance.mark(
			"land:exthost:" + Tag,
			Detail ? { detail: Detail } : void 0,
		);
	} catch {}
}, "Trace");
const Warn = /* @__PURE__ */ __name((...Args) => {
	try {
		console.warn("[Land Scanner]", ...Args);
	} catch {}
}, "Warn");
const FetchFromMountain = /* @__PURE__ */ __name(
	async (Method, ForceBuiltin) => {
		Trace("scanner:fetch:start", { method: Method });
		try {
			const Tauri = globalThis.__TAURI__;
			const Invoke = Tauri?.core?.invoke ?? Tauri?.invoke;
			if (typeof Invoke !== "function") {
				Trace("scanner:fetch:no-tauri");
				Warn("No Tauri invoke available");
				return [];
			}
			const RawResult = await Invoke("MountainIPCInvoke", {
				method: Method,
				params: [],
			});
			let Extensions = Array.isArray(RawResult) ? RawResult : [];
			Trace("scanner:fetch:result", {
				method: Method,
				count: Extensions.length,
				type: typeof RawResult,
				isArray: Array.isArray(RawResult),
			});
			Warn("IPC", Method, "returned", Extensions.length, "extensions");
			if (
				Extensions.length === 0 &&
				(Method === "extensions:scanSystemExtensions" ||
					Method === "extensions:scanUserExtensions")
			) {
				const Schedule = [100, 200, 400, 800, 1500];
				for (let Retry = 0; Retry < Schedule.length; Retry++) {
					Warn(
						"0 extensions for",
						Method,
						"- retry",
						Retry + 1,
						"/" + Schedule.length,
						"in",
						Schedule[Retry],
						"ms",
					);
					await new Promise((Resolve) =>
						setTimeout(Resolve, Schedule[Retry]),
					);
					const RetryResult = await Invoke("MountainIPCInvoke", {
						method: Method,
						params: [],
					});
					Extensions = Array.isArray(RetryResult) ? RetryResult : [];
					Trace("scanner:fetch:retry", {
						method: Method,
						retry: Retry + 1,
						count: Extensions.length,
					});
					Warn(
						"Retry",
						Retry + 1,
						"returned",
						Extensions.length,
						"extensions for",
						Method,
					);
					if (Extensions.length > 0) break;
				}
			}
			if (Extensions.length === 0) return [];
			const Mapped = [];
			let Errors = 0;
			for (let I = 0; I < Extensions.length; I++) {
				const Extension = Extensions[I];
				try {
					const Manifest =
						Extension.manifest &&
						typeof Extension.manifest === "object"
							? Extension.manifest
							: Extension;
					const RawLocation =
						Extension.location ?? Extension.extensionLocation;
					const Location = RawLocation
						? typeof RawLocation === "string"
							? URI.parse(RawLocation)
							: URI.revive(RawLocation)
						: URI.file(
								"/extensions/" + (Manifest.name || "unknown"),
							);
					const Identifier =
						Extension.identifier?.id ||
						Extension.identifier?.value ||
						(Manifest.publisher && Manifest.name
							? Manifest.publisher + "." + Manifest.name
							: Manifest.name) ||
						"unknown";
					const ExtType =
						typeof Extension.type === "number"
							? Extension.type
							: ForceBuiltin
								? 0
								: 1;
					const IsBuiltin =
						typeof Extension.isBuiltin === "boolean"
							? Extension.isBuiltin
							: ForceBuiltin;
					Mapped.push({
						type: ExtType,
						identifier: { id: Identifier },
						manifest: {
							name: Manifest.name || "",
							publisher: Manifest.publisher || "",
							version: Manifest.version || "0.0.0",
							engines: Manifest.engines || { vscode: "*" },
							main: Manifest.main || void 0,
							browser: Manifest.browser || void 0,
							activationEvents: Manifest.activationEvents || [],
							contributes: Manifest.contributes || {},
							extensionDependencies:
								Manifest.extensionDependencies || [],
							extensionPack: Manifest.extensionPack || [],
							enabledApiProposals:
								Manifest.enabledApiProposals || [],
						},
						location: Location,
						isBuiltin: IsBuiltin,
						targetPlatform: Extension.targetPlatform || "undefined",
						isValid: Extension.isValid !== false,
						validationMessages: Extension.validationMessages || [],
					});
				} catch (Error2) {
					Errors++;
					if (Errors <= 3) {
						Warn(
							"Map error for ext",
							I,
							":",
							String(Error2).slice(0, 100),
						);
					}
				}
			}
			Trace("scanner:fetch:mapped", {
				method: Method,
				mapped: Mapped.length,
				errors: Errors,
			});
			Warn("Mapped", Mapped.length, "extensions,", Errors, "errors");
			if (Mapped.length > 0) {
				const First = Mapped[0];
				Warn(
					"First:",
					First.identifier.id,
					"name:",
					First.manifest.name,
					"pub:",
					First.manifest.publisher,
					"loc:",
					First.location?.toString?.()?.slice(0, 80),
				);
			}
			return Mapped;
		} catch (Error2) {
			Trace("scanner:fetch:error", {
				method: Method,
				message: String(Error2).slice(0, 200),
			});
			Warn("Fetch error:", String(Error2).slice(0, 200));
			return [];
		}
	},
	"FetchFromMountain",
);
class ExtensionsScannerService {
	static {
		__name(this, "ExtensionsScannerService");
	}
	_onDidChangeCache = new Emitter();
	onDidChangeCache = this._onDidChangeCache.event;
	userExtensionsLocation = URI.file("/extensions");
	constructor() {
		Trace("scanner:construct");
		Warn("Constructed");
	}
	async scanAllExtensions(_SystemScanOptions, _UserScanOptions) {
		Trace("scanner:scanAll:start");
		const System = await this.scanSystemExtensions(_SystemScanOptions);
		const User = await this.scanUserExtensions(_UserScanOptions);
		const All = [...System, ...User];
		Trace("scanner:scanAll:done", {
			system: System.length,
			user: User.length,
			total: All.length,
		});
		Warn(
			"scanAll:",
			System.length,
			"system +",
			User.length,
			"user =",
			All.length,
		);
		return All;
	}
	async scanSystemExtensions(_ScanOptions) {
		Trace("scanner:scanSystem:start");
		const Result = await FetchFromMountain(
			"extensions:scanSystemExtensions",
			true,
		);
		Trace("scanner:scanSystem:done", { count: Result.length });
		Warn("scanSystemExtensions returning", Result.length);
		return Result;
	}
	async scanUserExtensions(_ScanOptions) {
		Trace("scanner:scanUser:start");
		const Result = await FetchFromMountain(
			"extensions:scanUserExtensions",
			false,
		);
		Trace("scanner:scanUser:done", { count: Result.length });
		Warn("scanUserExtensions returning", Result.length);
		return Result;
	}
	async scanAllUserExtensions(ScanOptions) {
		return await this.scanUserExtensions(ScanOptions);
	}
	getTargetPlatform() {
		return Promise.resolve("undefined");
	}
	getProductVersion() {
		return { version: "0.0.1", date: void 0 };
	}
	async scanExtensionsUnderDevelopment(_ExistingExtensions, _ScanOptions) {
		Trace("scanner:scanDev");
		return [];
	}
	async scanExistingExtension(
		_ExtensionLocation,
		_ExtensionType,
		_ScanOptions,
	) {
		return null;
	}
	async scanOneOrMultipleExtensions(
		_ExtensionLocation,
		_ExtensionType,
		_ScanOptions,
	) {
		return [];
	}
	async scanMetadata(_ExtensionLocation) {
		return void 0;
	}
	async updateMetadata(_ExtensionLocation, _Metadata) {
		return void 0;
	}
	async initializeDefaultProfileExtensions() {
		Trace("scanner:initDefaults");
	}
}
registerSingleton(
	IExtensionsScannerService,
	ExtensionsScannerService,
	InstantiationType.Delayed,
);
export { ExtensionsScannerService, IExtensionsScannerService };
//# sourceMappingURL=CELExtensionsScannerService.js.map
