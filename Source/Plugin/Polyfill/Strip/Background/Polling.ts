/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # StripBackgroundPolling polyfill
 *
 * Overrides `window.setInterval` and long-delay `window.setTimeout`
 * (≥30 s) with a wrapper that walks `Error().stack` for known dead-
 * poll module names. Suppressed timers return id `0` so callers can
 * still call `clearInterval` safely.
 */

export default function StripBackgroundPolling(): void {
	if (typeof window === "undefined") return;

	const Marker = "__LAND_STRIP_BACKGROUND_POLLING__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	const DenyFragments: Array<string> = [
		"telemetryService",

		"telemetryUtils",

		"telemetryLogAppender",

		"1dsAppender",

		"oneDataSystemAppender",

		"errorTelemetry",

		"userDataSyncService",

		"userDataAutoSyncService",

		"userDataSyncMachinesService",

		"settingsSync",

		"updateService",

		"abstractUpdateService",

		"extensionGalleryService",

		"extensionsTipsService",

		"extensionRecommendationsService",

		"exeBasedRecommendations",

		"keymapRecommendations",

		"configBasedRecommendations",

		"remoteAgentService",

		"remoteTunnelService",

		"liveShare",

		"issueService",

		"surveyService",

		"experimentService",

		"assignmentService",

		"mcpGalleryService",

		"welcomeBanner",

		"walkthroughs",
	];

	function CallerMatchesDeny(): boolean {
		try {
			const Stack = new Error().stack ?? "";

			for (const Fragment of DenyFragments) {
				if (Stack.indexOf(Fragment) >= 0) {
					return true;
				}
			}

			return false;
		} catch {
			return false;
		}
	}

	const OriginalSetInterval = window.setInterval.bind(window);

	const OriginalSetTimeout = window.setTimeout.bind(window);

	let Suppressed = 0;

	const SuppressedRingBuffer: Array<string> = [];

	const PatchedSetInterval = function (this: Window): number {
		if (CallerMatchesDeny()) {
			Suppressed++;

			if (SuppressedRingBuffer.length < 32) {
				try {
					const Stack = new Error().stack ?? "";

					const FirstNonAnonymous = Stack.split("\n").find(
						(Line) =>
							Line.indexOf("anonymous") < 0 && Line.length > 0,
					);

					SuppressedRingBuffer.push(FirstNonAnonymous ?? "(unknown)");
				} catch {
					/* ignore */
				}
			}

			return 0;
		}

		const Args = Array.prototype.slice.call(arguments) as Array<unknown>;

		return (
			OriginalSetInterval as unknown as (
				...Argv: Array<unknown>
			) => number
		).apply(window, Args);
	};

	(
		window as unknown as { setInterval: typeof PatchedSetInterval }
	).setInterval = PatchedSetInterval;

	const PatchedSetTimeout = function (
		this: Window,

		_Callback: TimerHandler,

		Delay?: number,
	): number {
		if (
			typeof Delay === "number" &&
			Delay >= 30000 &&
			CallerMatchesDeny()
		) {
			Suppressed++;

			return 0;
		}

		const Args = Array.prototype.slice.call(arguments) as Array<unknown>;

		return (
			OriginalSetTimeout as unknown as (...Argv: Array<unknown>) => number
		).apply(window, Args);
	};

	(window as unknown as { setTimeout: typeof PatchedSetTimeout }).setTimeout =
		PatchedSetTimeout;

	Land["__LAND_BACKGROUND_POLL_STATS__"] = (): {
		suppressedCount: number;

		recentlySuppressed: Array<string>;
	} => {
		return {
			suppressedCount: Suppressed,

			recentlySuppressed: SuppressedRingBuffer.slice(),
		};
	};
}
