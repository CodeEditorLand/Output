/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # TauriDragRegion polyfill
 *
 * Bridges VS Code's existing `-webkit-app-region` CSS classification to
 * Tauri 2's `data-tauri-drag-region` HTML attribute so the workbench
 * titlebar drag system Just Works under WKWebView.
 *
 * ## Why this is needed
 *
 * VS Code already has a complete drag classification baked into its
 * own stylesheets (`vs/workbench/browser/parts/titlebar/media/titlebarpart.css`
 * + `vs/sessions/browser/parts/media/sidebarPart.css` + others). Every
 * draggable element has `-webkit-app-region: drag`; every interactive
 * child that must not move the window has `-webkit-app-region: no-drag`.
 * Chromium (Electron) implements this property natively, so stock VS Code
 * runs unmodified.
 *
 * WKWebView (Tauri 2 on macOS) does not implement `-webkit-app-region`.
 * Tauri 2 instead reads the `data-tauri-drag-region` HTML attribute -
 * `""` opts in, `"false"` opts out. This polyfill walks VS Code's own
 * stylesheets, extracts the selectors that already declare
 * `-webkit-app-region: drag` / `no-drag`, and applies the equivalent
 * attribute to every matching element. No new selectors. No new CSS.
 * No new mechanism. Just a translator between two equivalent abstractions.
 *
 * ## Always active
 *
 * Drag-region wiring is needed on every OS the editor runs on, not a
 * "fix". Runs unconditionally - even with `DisableUIFixes=true`.
 *
 * ## Lifecycle
 *
 *   1. On install, walk every accessible stylesheet rule, collect the
 *      selectors whose `-webkit-app-region` declaration is `drag` or
 *      `no-drag`. WebKit's CSS parser preserves vendor-prefixed
 *      declarations in `CSSStyleDeclaration` even when the engine does
 *      not apply them, so `rule.style.getPropertyValue('-webkit-app-region')`
 *      returns the declared value reliably.
 *   2. Stamp every currently-matching element.
 *   3. `MutationObserver` re-stamps on newly-added DOM (titlebar
 *      repaints on profile switch, sidebar drag-region rebuilds, etc.).
 *
 * Stylesheet collection is opportunistic: cross-origin sheets throw on
 * `cssRules` access and are skipped silently. The bundled workbench
 * stylesheets are same-origin under both `tauri://localhost/` and the
 * `vscode-file://` paths Land serves, so VS Code's own rules are always
 * reachable.
 *
 * Idempotent. Marker `__LAND_TAURI_DRAG_REGION__`.
 */

export default function TauriDragRegion(): void {
	if (typeof window === "undefined") return;

	if (typeof document === "undefined") return;

	const Marker = "__LAND_TAURI_DRAG_REGION__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	const Attribute = "data-tauri-drag-region";

	type Selectors = { Drag: string[]; NoDrag: string[] };

	// Walk every CSSRule list and collect the selectors that declare
	// `-webkit-app-region: drag` / `no-drag`. CSSMediaRule and
	// CSSSupportsRule are recursed so OS-scoped (`@media (-webkit-min...)`
	// etc.) rules are picked up.
	function Walk(Rules: CSSRuleList, Out: Selectors): void {
		for (let Index = 0; Index < Rules.length; Index += 1) {
			const Rule = Rules.item(Index);

			if (!Rule) continue;

			if (Rule instanceof CSSStyleRule) {
				const Value = Rule.style.getPropertyValue("-webkit-app-region");

				if (Value === "drag") {
					Out.Drag.push(Rule.selectorText);
				} else if (Value === "no-drag") {
					Out.NoDrag.push(Rule.selectorText);
				}
			} else if (
				Rule instanceof CSSMediaRule ||
				Rule instanceof CSSSupportsRule
			) {
				Walk(Rule.cssRules, Out);
			}
		}
	}

	function Collect(): Selectors {
		const Out: Selectors = { Drag: [], NoDrag: [] };

		for (let Index = 0; Index < document.styleSheets.length; Index += 1) {
			const Sheet = document.styleSheets.item(Index);

			if (!Sheet) continue;

			let Rules: CSSRuleList;

			try {
				Rules = Sheet.cssRules;
			} catch {
				// Cross-origin sheets throw on `cssRules` access. Skip.
				continue;
			}

			Walk(Rules, Out);
		}

		return Out;
	}

	function StampMatching(Selectors: string[], Value: string): void {
		for (const Selector of Selectors) {
			let Matches: NodeListOf<Element>;

			try {
				Matches = document.querySelectorAll(Selector);
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

	// State shared between the initial scan and the observer: selector
	// lists are extracted once after the workbench's stylesheets settle,
	// then reused on every mutation. A second collection runs after
	// `window.onload` to pick up late-loaded stylesheets (lazy-loaded
	// extension CSS).
	let Cached: Selectors = { Drag: [], NoDrag: [] };

	function Refresh(): void {
		Cached = Collect();

		StampMatching(Cached.Drag, "");

		StampMatching(Cached.NoDrag, "false");
	}

	function ApplyToSubtree(Root: ParentNode): void {
		// Cheap path: only check the cached selectors on the new subtree.
		for (const Selector of Cached.Drag) {
			try {
				Root.querySelectorAll(Selector).forEach((Element) => {
					if (Element.getAttribute(Attribute) !== "") {
						Element.setAttribute(Attribute, "");
					}
				});
			} catch {
				continue;
			}
		}

		for (const Selector of Cached.NoDrag) {
			try {
				Root.querySelectorAll(Selector).forEach((Element) => {
					if (Element.getAttribute(Attribute) !== "false") {
						Element.setAttribute(Attribute, "false");
					}
				});
			} catch {
				continue;
			}
		}
	}

	function Initialise(): void {
		// First pass: stylesheets may not all be parsed yet during early
		// `DOMContentLoaded`. Refresh once now and once after `load` so
		// late-loaded sheets get scanned too.
		Refresh();

		if (document.readyState !== "complete") {
			window.addEventListener("load", Refresh, { once: true });
		}

		const Root = document.body ?? document.documentElement;

		if (!Root) return;

		const Observer = new MutationObserver((Mutations) => {
			for (const Mutation of Mutations) {
				Mutation.addedNodes.forEach((Node) => {
					if (Node.nodeType !== 1) return;

					ApplyToSubtree(Node as Element);
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
