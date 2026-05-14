/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # DisableLazyPaint polyfill
 *
 * Type-checked source of the IIFE that the matching `Inject*`
 * transform injects into VS Code's workbench bootstrap.
 *
 * The transform calls `DisableLazyPaint.toString()` on the compiled
 * `.js` and prepends the result wrapped in an IIFE. Behaviour:
 * identical to the previous string-literal embedded body; the win is
 * that this file is now type-checked + tree-shake-clean, and any
 * future refactor of the polyfill catches typos at compile time.
 *
 * Backwards-compat constraints:
 * - Function body must be self-contained (no closure references to
 *   imports - those would be lost in `.toString()`).
 * - No top-level statements; everything inside the function.
 * - Use `(window as any)` casts for Land-specific globals.
 */

interface RAFEntry {
	Id: number;

	Callback: FrameRequestCallback;
}

interface FastIntersectionObserverInit {
	root?: Element | Document | null;

	rootMargin?: string;

	threshold?: number | Array<number>;
}

interface FastIntersectionEntry {
	target: Element;

	isIntersecting: boolean;

	intersectionRatio: number;

	time: number;

	boundingClientRect: DOMRectReadOnly;

	intersectionRect: DOMRectReadOnly;

	rootBounds: DOMRectReadOnly | null;
}

export default function DisableLazyPaint(): void {
	if (typeof window === "undefined") return;

	const Marker = "__LAND_DISABLE_LAZY_PAINT__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	// ----- requestAnimationFrame + IntersectionObserver overrides -----
	// Why these overrides exist: WKWebView under Tauri does not always
	// fire native `rAF` callbacks on hidden / freshly-mounted webview
	// surfaces, and its `IntersectionObserver` callbacks are gated
	// behind viewport intersection that the editor element never
	// reaches until the user clicks (the editor stays unmounted until
	// interaction). Replacing both forces eager paint + render.
	//
	// We initially suspected this polyfill of starving keystroke
	// delivery via the macrotask queue (rAF→setTimeout(0)) and gated
	// it behind `__LAND_AGGRESSIVE_LAZY_PAINT__`. The actual culprit
	// turned out to be a Vim extension activating into Normal mode;
	// gating this polyfill regressed editor mount behaviour ("editor
	// doesn't load until click"). Restored unconditional.
	{
		let RAFCounter = 0;

		let RAFQueue: Array<RAFEntry> = [];

		let RAFFlushScheduled = false;

		const RAFCancelled = new Set<number>();

		function FlushRAF(): void {
			RAFFlushScheduled = false;

			const Drain = RAFQueue;

			RAFQueue = [];

			const Timestamp = performance.now();

			for (const Entry of Drain) {
				if (RAFCancelled.has(Entry.Id)) {
					RAFCancelled.delete(Entry.Id);

					continue;
				}

				try {
					Entry.Callback(Timestamp);
				} catch (Error) {
					console.error(Error);
				}
			}
		}

		window.requestAnimationFrame = (
			Callback: FrameRequestCallback,
		): number => {
			const Identifier = ++RAFCounter;

			RAFQueue.push({ Id: Identifier, Callback });

			if (!RAFFlushScheduled) {
				RAFFlushScheduled = true;

				setTimeout(FlushRAF, 0);
			}

			return Identifier;
		};

		window.cancelAnimationFrame = (Identifier: number): void => {
			RAFCancelled.add(Identifier);
		};

		const OriginalIO = window.IntersectionObserver;

		class FastIntersectionObserver {
			private Callback: IntersectionObserverCallback;

			private Disconnected = false;

			private Observed = new Set<Element>();

			constructor(
				Callback: IntersectionObserverCallback,

				_Options?: FastIntersectionObserverInit,
			) {
				this.Callback = Callback;
			}

			observe(Target: Element): void {
				if (this.Disconnected) return;

				if (this.Observed.has(Target)) return;

				this.Observed.add(Target);

				const Self = this;

				queueMicrotask(() => {
					if (Self.Disconnected || !Self.Observed.has(Target)) return;

					let Rectangle: DOMRectReadOnly;

					try {
						Rectangle = Target.getBoundingClientRect();
					} catch {
						Rectangle = {
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							width: 0,
							height: 0,
							x: 0,
							y: 0,
							toJSON(): Record<string, unknown> {
								return {};
							},
						} as DOMRectReadOnly;
					}

					const Entry: FastIntersectionEntry = {
						target: Target,
						isIntersecting: true,
						intersectionRatio: 1,
						time: performance.now(),
						boundingClientRect: Rectangle,
						intersectionRect: Rectangle,
						rootBounds: null,
					};

					try {
						Self.Callback(
							[Entry as unknown as IntersectionObserverEntry],

							Self as unknown as IntersectionObserver,
						);
					} catch (Error) {
						console.error(Error);
					}
				});
			}

			unobserve(Target: Element): void {
				this.Observed.delete(Target);
			}

			disconnect(): void {
				this.Disconnected = true;

				this.Observed.clear();
			}

			takeRecords(): Array<IntersectionObserverEntry> {
				return [];
			}
		}

		if (OriginalIO) {
			Land["__OriginalIntersectionObserver__"] = OriginalIO;
		}

		(window as unknown as Record<string, unknown>)["IntersectionObserver"] =
			FastIntersectionObserver;
	}

	// ----- CSS lazy-paint kill -----
	function InstallStylesheet(): void {
		const Style = document.createElement("style");

		Style.setAttribute("data-land-disable-lazy-paint", "1");

		Style.textContent = [
			"*, ::before, ::after { content-visibility: visible !important; }",

			".monaco-workbench .part > .content,",

			".monaco-workbench .panel,",

			".monaco-workbench .viewlet,",

			".monaco-workbench .pane,",

			".monaco-workbench .pane-body,",

			".monaco-workbench .composite,",

			".monaco-workbench .activitybar,",

			".monaco-workbench .sidebar {",

			"  contain: none !important;",

			"  content-visibility: visible !important;",

			"}",
		].join("\n");

		(document.head ?? document.documentElement).appendChild(Style);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallStylesheet, {
			once: true,
		});
	} else {
		InstallStylesheet();
	}
}
