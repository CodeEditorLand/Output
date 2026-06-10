// Mountain diagnostic bridge - used instead of console.* in browser context.
const _CELLog = (Message: string): void => {
	try {
		const Invoke =
			(window as any).__TAURI__?.core?.invoke ??
			(window as any).__TAURI__?.invoke;

		if (typeof Invoke === "function") {
			Invoke("MountainIPCInvoke", {
				method: "diagnostic:log",
				params: ["cel-polyfill", Message],
			}).catch(() => {});
		}
	} catch {}
};

/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # EagerExtensionActivation polyfill
 *
 * Fires `IExtensionService.activateByEvent("onStartupFinished")`
 * and `activateByEvent("*")` directly at workbench-loaded so
 * extension panels (Roo, Claude, gitlens, dart-code, etc.) populate
 * immediately rather than after the stock 2-5 s scheduler.
 */

interface ServicesAccessor {
	get<T = unknown>(Identifier: unknown): T;
}

interface ExtensionService {
	activateByEvent: (Event: string) => Promise<unknown>;
}

interface CelServices {
	invokeFunction: (Callback: (Accessor: ServicesAccessor) => void) => void;
}

export default function EagerExtensionActivation(): void {
	if (typeof window === "undefined") return;

	const Marker = "__LAND_EAGER_EXTENSION_ACTIVATION__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	function FireActivationEvents(): boolean {
		try {
			const Services = Land["__CEL_SERVICES__"] as
				| CelServices
				| undefined;

			if (!Services || typeof Services.invokeFunction !== "function") {
				return false;
			}

			let ExtSvc: ExtensionService | null = null;

			Services.invokeFunction((Accessor: ServicesAccessor) => {
				try {
					const Brands = Land["__CEL_BRANDS__"] as
						| Record<string, unknown>
						| undefined;

					if (Brands && Brands["IExtensionService"]) {
						ExtSvc = Accessor.get<ExtensionService>(
							Brands["IExtensionService"],
						);
					}
				} catch {
					/* ignore */
				}
			});

			if (
				!ExtSvc ||
				typeof (ExtSvc as ExtensionService).activateByEvent !==
					"function"
			) {
				return false;
			}

			let FireCount = 0;

			for (const EventName of ["onStartupFinished", "*"]) {
				try {
					const Result = (ExtSvc as ExtensionService).activateByEvent(
						EventName,
					);

					if (
						Result &&
						typeof (Result as Promise<unknown>).then === "function"
					) {
						(Result as Promise<unknown>).catch((_Error: unknown) => {
							_CELLog(
								"[LandFix:EagerActivation] activateByEvent ${EventName} rejected: ${String(_Error)}",
							);
						});
					}

					FireCount++;
				} catch (Error) {
					_CELLog(
						"[LandFix:EagerActivation] activateByEvent ${EventName} threw: ${String(Error)}",
					);
				}
			}

			if (FireCount > 0) {
				_CELLog(
					"[LandFix:EagerActivation] fired ${FireCount} activation event(s) eagerly",
				);

				return true;
			}

			return false;
		} catch (Error) {
			_CELLog(
				"[LandFix:EagerActivation] FireActivationEvents failed: ${String(Error)}",
			);

			return false;
		}
	}

	function ScheduleFire(): void {
		setTimeout(() => {
			if (!FireActivationEvents()) {
				let Attempts = 0;

				const Interval = setInterval(() => {
					Attempts++;

					if (FireActivationEvents() || Attempts > 24) {
						clearInterval(Interval);
					}
				}, 200);
			}
		}, 50);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", ScheduleFire, {
			once: true,
		});
	} else {
		ScheduleFire();
	}
}
