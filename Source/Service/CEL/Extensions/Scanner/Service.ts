// @ts-nocheck
/**
 * @module CELExtensionsScannerService
 *
 * IPC-backed replacement for VS Code's electron-browser/browser
 * `extensionsScannerService.js`. The browser-side scanner expects a
 * filesystem it doesn't have - Tauri's webview is sandboxed and the
 * `builtinExtensionsPath` resolves to a fictional `/extensions` URI.
 * Mountain already scans the bundled extension tree on boot; this shim
 * pipes those results into the workbench DI container so the `@builtin`
 * sidebar, extension activation, and `workspaceContains` checks all see
 * the real set.
 *
 * Authored as a real TypeScript module that Output's esbuild step compiles
 * to `Configuration/Service/CELExtensionsScannerService.js` and
 * `ApplyPipeline.ts` drops at
 * `Target/Microsoft/VSCode/vs/workbench/services/extensions/common/
 * CELExtensionsScannerService.js`. Both the electron-browser and browser
 * variants of `extensionsScannerService.js` are reduced by the
 * `ExtensionScannerIPC` transform to one-line re-exports pointing at this
 * canonical sibling so call sites that import from either location keep
 * working.
 *
 * `// @ts-nocheck` because the relative imports below resolve at the FINAL
 * on-disk location (depth 4 inside the bundled VS Code tree), not at this
 * file's source location. esbuild with `bundle: false` emits them
 * unchanged.
 */

import { Emitter } from "../../../../base/common/event.js";
import { URI } from "../../../../base/common/uri.js";
import { IExtensionsScannerService } from "../../../../platform/extensionManagement/common/extensionsScannerService.js";
import {
	InstantiationType,
	registerSingleton,
} from "../../../../platform/instantiation/common/extensions.js";

const Trace = (Tag: string, Detail?: object): void => {
	try {
		performance.mark(
			"land:exthost:" + Tag,

			Detail ? { detail: Detail } : undefined,
		);
	} catch {
		/* noop */
	}
};

const Warn = (...Args: unknown[]): void => {
	try {
		// Forward to Mountain's dev-log via diagnostic:log so the warning
		// appears in `tail -f Mountain.dev.log` alongside Rust-side events.
		const Invoke =
			(window as any).__TAURI__?.core?.invoke ??
			(window as any).__TAURI__?.invoke;
		if (typeof Invoke === "function") {
			const Message = Args.map(String).join(" ");
			Invoke("MountainIPCInvoke", {
				method: "diagnostic:log",
				params: ["land-scanner", Message],
			}).catch(() => {});
		}
	} catch {
		/* noop */
	}
};

const FetchFromMountain = async (
	Method: string,

	ForceBuiltin: boolean,
): Promise<unknown[]> => {
	Trace("scanner:fetch:start", { method: Method });

	try {
		const Tauri = (globalThis as any).__TAURI__;

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

		let Extensions: any[] = Array.isArray(RawResult) ? RawResult : [];

		Trace("scanner:fetch:result", {
			method: Method,
			count: Extensions.length,
			type: typeof RawResult,
			isArray: Array.isArray(RawResult),
		});

		Warn("IPC", Method, "returned", Extensions.length, "extensions");

		// Both scan paths (system + user) need retry parity. Mountain
		// runs the disk scan asynchronously - the workbench's
		// IExtensionService calls scanAllExtensions = Promise.all([
		// scanSystemExtensions, scanUserExtensions]) at boot. Without
		// the retry on the user-side path, an empty initial response
		// silently passes 0 user extensions through to
		// viewsExtensionPoint and ExtensionsRegistry, which means
		// every user-extension contribution (gitlens panes, clangd
		// views, dependencies trees, contributes.{commands,
		// configuration,languages}) stays unregistered for the rest
		// of the session. The system path was retried; mirror that.
		//
		// 5 retries * exponential backoff capped at 1500 ms - tighter
		// than the original 5 * 1000 ms because Mountain's scan
		// usually finishes in ~500 ms; long retries were padding boot.
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

		const Mapped: unknown[] = [];

		let Errors = 0;

		for (let I = 0; I < Extensions.length; I++) {
			const Extension = Extensions[I];

			try {
				// Mountain scanSystem/UserExtensions return an
				// ILocalExtension-WRAPPED shape with identifier.id,
				// manifest.{name,publisher,version,...}, location,
				// isBuiltin, type. The older extensions:getAll path
				// returned a FLAT manifest (name/publisher/version at
				// top level with extensionLocation). Read nested first,
				// fall back to flat so a future backend shape swap does
				// not silently collapse every extension to id='unknown'
				// / name='' / publisher=''.
				const Manifest =
					Extension.manifest && typeof Extension.manifest === "object"
						? Extension.manifest
						: Extension;

				const RawLocation =
					Extension.location ?? Extension.extensionLocation;

				const Location = RawLocation
					? typeof RawLocation === "string"
						? URI.parse(RawLocation)
						: URI.revive(RawLocation)
					: URI.file("/extensions/" + (Manifest.name || "unknown"));

				const Identifier =
					Extension.identifier?.id ||
					Extension.identifier?.value ||
					(Manifest.publisher && Manifest.name
						? Manifest.publisher + "." + Manifest.name
						: Manifest.name) ||
					"unknown";

				// Mountain's ILocalExtension envelope includes per-path
				// isBuiltin + type + source. Honour the server-side
				// classification so @installed / @builtin split correctly.
				// Fall back to ForceBuiltin when Mountain didn't stamp a
				// value (older envelopes, or the unified getAll path).
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
						main: Manifest.main || undefined,
						browser: Manifest.browser || undefined,
						activationEvents: Manifest.activationEvents || [],
						contributes: Manifest.contributes || {},
						extensionDependencies:
							Manifest.extensionDependencies || [],
						extensionPack: Manifest.extensionPack || [],
						enabledApiProposals: Manifest.enabledApiProposals || [],
					},
					location: Location,
					isBuiltin: IsBuiltin,
					targetPlatform: Extension.targetPlatform || "undefined",
					isValid: Extension.isValid !== false,
					validationMessages: Extension.validationMessages || [],
				});
			} catch (Error) {
				Errors++;

				if (Errors <= 3) {
					Warn(
						"Map error for ext",

						I,

						":",

						String(Error).slice(0, 100),
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
			const First: any = Mapped[0];

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
	} catch (Error) {
		Trace("scanner:fetch:error", {
			method: Method,
			message: String(Error).slice(0, 200),
		});

		Warn("Fetch error:", String(Error).slice(0, 200));

		return [];
	}
};

class ExtensionsScannerService {
	private readonly _onDidChangeCache = new Emitter<void>();

	readonly onDidChangeCache = this._onDidChangeCache.event;

	readonly userExtensionsLocation = URI.file("/extensions");

	constructor() {
		Trace("scanner:construct");

		Warn("Constructed");
	}

	async scanAllExtensions(
		_SystemScanOptions: unknown,

		_UserScanOptions: unknown,
	): Promise<unknown[]> {
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

	async scanSystemExtensions(_ScanOptions: unknown): Promise<unknown[]> {
		Trace("scanner:scanSystem:start");

		const Result = await FetchFromMountain(
			"extensions:scanSystemExtensions",

			true,
		);

		Trace("scanner:scanSystem:done", { count: Result.length });

		Warn("scanSystemExtensions returning", Result.length);

		return Result;
	}

	async scanUserExtensions(_ScanOptions: unknown): Promise<unknown[]> {
		Trace("scanner:scanUser:start");

		const Result = await FetchFromMountain(
			"extensions:scanUserExtensions",

			false,
		);

		Trace("scanner:scanUser:done", { count: Result.length });

		Warn("scanUserExtensions returning", Result.length);

		return Result;
	}

	async scanAllUserExtensions(ScanOptions: unknown): Promise<unknown[]> {
		return await this.scanUserExtensions(ScanOptions);
	}

	getTargetPlatform(): Promise<string> {
		return Promise.resolve("undefined");
	}

	getProductVersion(): { version: string; date: undefined } {
		return { version: "0.0.1", date: undefined };
	}

	async scanExtensionsUnderDevelopment(
		_ExistingExtensions: unknown,

		_ScanOptions: unknown,
	): Promise<unknown[]> {
		Trace("scanner:scanDev");

		return [];
	}

	async scanExistingExtension(
		_ExtensionLocation: unknown,

		_ExtensionType: unknown,

		_ScanOptions: unknown,
	): Promise<null> {
		return null;
	}

	async scanOneOrMultipleExtensions(
		_ExtensionLocation: unknown,

		_ExtensionType: unknown,

		_ScanOptions: unknown,
	): Promise<unknown[]> {
		return [];
	}

	async scanMetadata(_ExtensionLocation: unknown): Promise<undefined> {
		return undefined;
	}

	async updateMetadata(
		_ExtensionLocation: unknown,

		_Metadata: unknown,
	): Promise<undefined> {
		return undefined;
	}

	async initializeDefaultProfileExtensions(): Promise<void> {
		Trace("scanner:initDefaults");
	}
}

registerSingleton(
	IExtensionsScannerService,

	ExtensionsScannerService,

	InstantiationType.Delayed,
);

export { ExtensionsScannerService, IExtensionsScannerService };
