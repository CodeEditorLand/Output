/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # EagerIdleValue polyfill
 *
 * Collapses `requestIdleCallback` to `setTimeout(0)` with a synthetic
 * `IdleDeadline` reporting `timeRemaining: 50 ms` so VS Code's
 * pervasive `IdleValue<T>` lazy-init pattern resolves eagerly.
 */

interface SyntheticIdleDeadline {
	didTimeout: boolean;

	timeRemaining(): number;
}

export default function EagerIdleValue(): void {
	if (typeof window === "undefined") return;

	const Marker = "__LAND_EAGER_IDLE_VALUE__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	const EagerDeadline: SyntheticIdleDeadline = {
		didTimeout: false,

		timeRemaining: (): number => 50,
	};

	const EagerRequestIdleCallback = (
		Callback: (Deadline: IdleDeadline) => void,
	): number => {
		return window.setTimeout(() => {
			try {
				Callback(EagerDeadline as unknown as IdleDeadline);
			} catch (Error) {
				console.error("[LandFix:EagerIdle]", Error);
			}
		}, 0) as unknown as number;
	};

	const EagerCancelIdleCallback = (Identifier: number): void => {
		window.clearTimeout(Identifier);
	};

	(
		window as unknown as {
			requestIdleCallback: typeof EagerRequestIdleCallback;
		}
	).requestIdleCallback = EagerRequestIdleCallback;

	(
		window as unknown as {
			cancelIdleCallback: typeof EagerCancelIdleCallback;
		}
	).cancelIdleCallback = EagerCancelIdleCallback;

	if (typeof globalThis !== "undefined") {
		(globalThis as unknown as Record<string, unknown>)[
			"requestIdleCallback"
		] = EagerRequestIdleCallback;

		(globalThis as unknown as Record<string, unknown>)[
			"cancelIdleCallback"
		] = EagerCancelIdleCallback;
	}

	if (
		typeof self !== "undefined" &&
		(self as unknown) !== (window as unknown)
	) {
		(self as unknown as Record<string, unknown>)["requestIdleCallback"] =
			EagerRequestIdleCallback;

		(self as unknown as Record<string, unknown>)["cancelIdleCallback"] =
			EagerCancelIdleCallback;
	}

	console.log(
		"[LandFix:EagerIdleValue] requestIdleCallback collapsed to setTimeout(0); IdleValue executors run eagerly",
	);
}
