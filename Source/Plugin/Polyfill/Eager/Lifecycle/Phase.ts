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
 * # EagerLifecyclePhase polyfill
 *
 * Drives `ILifecycleService.phase` from Starting (1) directly to
 * Eventually (4) at workbench-loaded + 100 ms (with retry every
 * 200 ms up to 3 s). The setter walks intermediate phases and
 * broadcasts the `_onDidChangePhase` event for each, unblocking
 * every `lifecycle.when(phase)` Promise.
 */

interface ServicesAccessor {

	get<T = unknown>(Identifier: unknown): T;
}

interface LifecycleService {

	phase: number;
}

interface CelServices {

	invokeFunction: (Callback: (Accessor: ServicesAccessor) => void) => void;
}

export default function EagerLifecyclePhase(): void {

	if (typeof window === "undefined") return;

	const Marker = "__LAND_EAGER_LIFECYCLE_PHASE__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	function AdvancePhase(): boolean {
		try {
			const Services = Land["__CEL_SERVICES__"] as
				| CelServices
				| undefined;

			if (!Services || typeof Services.invokeFunction !== "function") {
				return false;
			}

			let Lifecycle: LifecycleService | null = null;

			Services.invokeFunction((Accessor: ServicesAccessor) => {
				try {
					const Brands = Land["__CEL_BRANDS__"] as
						| Record<string, unknown>
						| undefined;

					if (Brands && Brands["ILifecycleService"]) {
						Lifecycle = Accessor.get<LifecycleService>(
							Brands["ILifecycleService"],
						);
					}
				} catch {
					/* ignore */
				}
			});

			if (!Lifecycle) return false;

			try {
				const ServiceReference = Lifecycle as LifecycleService;

				if (
					typeof ServiceReference.phase !== "undefined" &&
					ServiceReference.phase < 4
				) {
					ServiceReference.phase = 4;

					_CELLog(
						"[LandFix:Lifecycle] phase advanced eagerly to Eventually",
					);

					return true;
				}
			} catch (Error) {
				_CELLog(
					"[LandFix:Lifecycle] phase setter rejected: ${String(Error)}",
				);
			}

			return false;
		} catch (Error) {
			_CELLog("[LandFix:Lifecycle] advance failed: ${String(Error)}");

			return false;
		}
	}

	function ScheduleAdvance(): void {
		setTimeout(() => {
			if (!AdvancePhase()) {
				let Attempts = 0;

				const Interval = setInterval(() => {
					Attempts++;

					if (AdvancePhase() || Attempts > 14) {
						clearInterval(Interval);
					}
				}, 200);
			}
		}, 100);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", ScheduleAdvance, {
			once: true,
		});
	} else {
		ScheduleAdvance();
	}
}
