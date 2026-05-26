/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # TauriDragRegion polyfill
 *
 * Bridges VS Code's existing `-webkit-app-region` CSS classification to
 * Tauri 2's `data-tauri-drag-region` HTML attribute so the workbench
 * titlebar drag system works under WKWebView, AND ships the matching
 * `mousedown` listener that calls `startDragging()` - Tauri's runtime
 * only injects that listener when the webview loads via its custom
 * `tauri://` protocol; Land's webview loads from the Astro dev server
 * (`http://localhost:21100`), so the attribute alone does nothing.
 *
 * ## Why this is needed
 *
 * VS Code declares the canonical drag classification in CSS
 * (`vs/workbench/browser/parts/titlebar/media/titlebarpart.css` +
 * `vs/sessions/browser/parts/media/sidebarPart.css` + others). Every
 * draggable element has `-webkit-app-region: drag`; every interactive
 * child that must not move the window has `-webkit-app-region: no-drag`.
 * Chromium (Electron) implements this property natively.
 *
 * WKWebView (Tauri 2 on macOS) does not. The CSS parser silently drops
 * `-webkit-app-region` declarations at parse time, so runtime
 * inspection of `CSSStyleRule.style` returns nothing. Tauri 2 instead
 * reads the `data-tauri-drag-region` HTML attribute - `""` opts in,
 * `"false"` opts out - but only when its own runtime drag listener is
 * present, which it is NOT in the HTTP-loaded path. We install the
 * listener ourselves: capture-phase `mousedown` on the document, walk
 * the ancestor chain looking for an enabled drag region, and route
 * single-click to `startDragging` / double-click to the toggle-maximise
 * window command. Behaviour matches stock Tauri.
 *
 * ## Build-time extraction, runtime stamping
 *
 * The selector lists are extracted at BUILD TIME by
 * `Plugin/Transform/Inject/Tauri/Drag/Region.ts` from the copied VS Code
 * CSS source (where `-webkit-app-region` is still plain text) and
 * baked into `globalThis.__LAND_DRAG_SELECTORS__` /
 * `globalThis.__LAND_NO_DRAG_SELECTORS__` immediately before this
 * polyfill function runs. At runtime we simply iterate the prepared
 * selector lists and stamp matching elements.
 *
 * No invented selectors, no duplication of VS Code's intent: the
 * selectors come from VS Code's own stylesheets at build time. Future
 * VS Code additions (new agent-sessions parts, new titlebar widgets)
 * are picked up automatically on every rebuild.
 *
 * ## Lifecycle
 *
 *   1. After DOM ready, stamp every element matching a baked-in drag
 *      selector with `data-tauri-drag-region=""`.
 *   2. Stamp every element matching a baked-in no-drag selector with
 *      `data-tauri-drag-region="false"`.
 *   3. `MutationObserver` re-stamps newly-added DOM (titlebar repaints
 *      on profile switch, sidebar drag-region rebuilds, etc.).
 *
 * ## Always active
 *
 * Drag-region wiring is needed on every OS, not a "fix". Runs
 * unconditionally - even with `DisableUIFixes=true`. Idempotent.
 * Marker `__LAND_TAURI_DRAG_REGION__`.
 */

export default function TauriDragRegion(): void {
	if (typeof window === "undefined") return;

	if (typeof document === "undefined") return;

	const Marker = "__LAND_TAURI_DRAG_REGION__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	const Attribute = "data-tauri-drag-region";

	const Global = globalThis as unknown as {
		__LAND_DRAG_SELECTORS__?: string[];
		__LAND_NO_DRAG_SELECTORS__?: string[];
	};

	const Drag = Global.__LAND_DRAG_SELECTORS__ ?? [];

	const NoDrag = Global.__LAND_NO_DRAG_SELECTORS__ ?? [];

	if (Drag.length === 0 && NoDrag.length === 0) {
		// Selectors weren't injected (transform not run / disabled).
		// Nothing to do; bail quietly so the polyfill is a no-op rather
		// than installing an idle MutationObserver.
		return;
	}

	function StampMatching(
		Selectors: string[],
		Value: string,
		Root: ParentNode,
	): void {
		for (const Selector of Selectors) {
			let Matches: NodeListOf<Element>;

			try {
				Matches = Root.querySelectorAll(Selector);
			} catch {
				// Defensive: some VS Code rules contain `:has()` /
				// `:where()` selectors that older WebKit builds reject.
				// Skip rather than abort the whole pass.
				continue;
			}

			Matches.forEach((Element) => {
				if (Element.getAttribute(Attribute) !== Value) {
					Element.setAttribute(Attribute, Value);
				}
			});
		}
	}

	function StampAll(Root: ParentNode = document): void {
		StampMatching(Drag, "", Root);

		StampMatching(NoDrag, "false", Root);
	}

	// Mirror Tauri's own drag-region runtime: walk from the mousedown
	// target up the ancestor chain looking for the data-attribute, and
	// if a draggable ancestor is found, dispatch `start_dragging` (single
	// click) or `internal_toggle_maximize` (double click). We attach in
	// CAPTURE phase so workbench-level mousedown listeners cannot
	// `stopPropagation` away the event before we see it; we DO NOT call
	// `preventDefault` because the workbench's own focus / pointer-capture
	// logic still needs to receive the event for non-drag targets.
	function IsDragTarget(El: Element | null): boolean {
		while (El) {
			if (
				El.nodeType === 1 &&
				El.hasAttribute &&
				El.hasAttribute(Attribute)
			) {
				const Value = El.getAttribute(Attribute);
				// `data-tauri-drag-region="false"` opts out; any other
				// value (including empty string, which is the canonical
				// "present" form) opts in.
				return Value !== "false";
			}
			El = El.parentElement;
		}
		return false;
	}

	function InvokeWindowCommand(Command: string): void {
		try {
			const Tauri = (globalThis as any).__TAURI__;
			const Invoke =
				Tauri?.core?.invoke ??
				(globalThis as any).__TAURI_INTERNALS__?.invoke;
			if (typeof Invoke === "function") {
				Invoke(Command).catch?.(() => {
					/* ignore - Mountain may have torn down */
				});
				return;
			}
			// Fallback to the typed JS API if the raw invoke is gone.
			const Win = Tauri?.window?.getCurrentWindow?.();
			if (Command === "plugin:window|start_dragging") {
				Win?.startDragging?.().catch?.(() => {});
			} else if (Command === "plugin:window|internal_toggle_maximize") {
				const Already = Win?.isMaximized?.();
				if (typeof Already?.then === "function") {
					Already.then((Yes: boolean) => {
						(Yes ? Win.unmaximize?.() : Win.maximize?.())?.catch?.(
							() => {},
						);
					}).catch?.(() => {});
				} else {
					Win?.toggleMaximize?.()?.catch?.(() => {});
				}
			}
		} catch {
			/* swallow - the mousedown listener must never throw */
		}
	}

	function HandleMouseDown(Event: MouseEvent): void {
		// Only the primary button starts a drag. Right-click context menus
		// and middle-click paste must not trigger window-move.
		if (Event.button !== 0) return;
		const Target = Event.target as Element | null;
		if (!IsDragTarget(Target)) return;
		// Two consecutive primary clicks on a drag region = toggle
		// maximise, matching native macOS / Windows titlebar behaviour.
		if (Event.detail === 2) {
			InvokeWindowCommand("plugin:window|internal_toggle_maximize");
		} else {
			InvokeWindowCommand("plugin:window|start_dragging");
		}
	}

	function Initialise(): void {
		StampAll();

		// Re-stamp after `load` to catch elements that mount after
		// `DOMContentLoaded` (lazy-rendered titlebar repaints during
		// boot, e.g. when the command-center widget swaps in).
		if (document.readyState !== "complete") {
			window.addEventListener("load", () => StampAll(), { once: true });
		}

		document.addEventListener("mousedown", HandleMouseDown, {
			capture: true,
			passive: true,
		});

		const Root = document.body ?? document.documentElement;

		if (!Root) return;

		const Observer = new MutationObserver((Mutations) => {
			for (const Mutation of Mutations) {
				Mutation.addedNodes.forEach((Node) => {
					if (Node.nodeType !== 1) return;

					// Stamp the new subtree using the baked-in selector
					// lists - this handles late-added drag handles
					// (sidebar repaint, profile switch, etc.).
					StampAll(Node as Element);
				});
			}
		});

		Observer.observe(Root, { childList: true, subtree: true });
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", Initialise, {
			once: true,
		});
	} else {
		Initialise();
	}
}
