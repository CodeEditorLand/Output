/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # TauriDragRegion polyfill
 *
 * Bridges VS Code's existing `-webkit-app-region` CSS classification to
 * Tauri 2's `data-tauri-drag-region` HTML attribute so the workbench
 * titlebar drag system works under WKWebView.
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
 * `"false"` opts out.
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

	function Initialise(): void {
		StampAll();

		// Re-stamp after `load` to catch elements that mount after
		// `DOMContentLoaded` (lazy-rendered titlebar repaints during
		// boot, e.g. when the command-center widget swaps in).
		if (document.readyState !== "complete") {
			window.addEventListener("load", () => StampAll(), { once: true });
		}

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
