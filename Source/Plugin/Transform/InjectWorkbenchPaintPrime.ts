/**
 * Force WKWebView's compositor to commit pending layout for the
 * eight workbench part layers at boot and on each first
 * interaction with a fresh part.
 *
 * # Why a "paint prime"
 *
 * Even after `InjectDisableLazyPaint` clears `requestAnimationFrame`
 * and `IntersectionObserver`, WKWebView still sometimes holds a
 * layer in pre-paint state if no explicit layout-read has occurred
 * on it. The fix is a single `void element.offsetHeight` per part
 * - that read is a synchronous forced-layout that commits the
 * layer to the compositor.
 *
 * The workbench has eight relevant part containers:
 *
 *   .activitybar
 *   .sidebar / .composite (panel host)
 *   .panel / .pane
 *   .editor (group container)
 *   .titlebar / .title
 *   .statusbar
 *   .auxiliarybar (right sidebar)
 *   .banner
 *
 * Each one is read once at `DOMContentLoaded`, then again on each
 * `click` / `keydown` / `pointerdown` event whose target is inside
 * a part not yet primed in the current session. The cost is
 * negligible (~0.1 ms per read) and the gain is that no part ever
 * stays in the "first paint pending" state.
 *
 * # Why not just always read everything
 *
 * Reading every workbench element on every event would force
 * thousands of layouts per click, dominating frame budget. Reading
 * only the eight part containers, and only the first time each is
 * touched in a session, keeps the cost flat.
 *
 * Idempotent. Marker `__LAND_WORKBENCH_PAINT_PRIME__`.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "__LAND_WORKBENCH_PAINT_PRIME__";

const Polyfill = `
/* ${Marker} */
(function(){
	if (typeof window === "undefined") return;
	if (window.${Marker}) return;
	window.${Marker} = true;

	var PartSelectors = [
		".monaco-workbench .activitybar",
		".monaco-workbench .sidebar",
		".monaco-workbench .auxiliarybar",
		".monaco-workbench .panel",
		".monaco-workbench .editor",
		".monaco-workbench .titlebar",
		".monaco-workbench .statusbar",
		".monaco-workbench .banner",
		".monaco-workbench .part",
		".monaco-workbench .composite",
	];

	var Primed = new WeakSet();

	function PrimeElement(Element) {
		if (!Element || Primed.has(Element)) return;
		Primed.add(Element);
		// One synchronous forced layout commits the layer.
		// Reading offsetHeight + getBoundingClientRect together
		// covers two different WKWebView code paths that have
		// each been observed to skip the commit individually.
		void Element.offsetHeight;
		try { Element.getBoundingClientRect(); } catch (E) {}
	}

	function PrimeAllParts() {
		for (var Index = 0; Index < PartSelectors.length; Index++) {
			var Nodes = document.querySelectorAll(PartSelectors[Index]);
			for (var Inner = 0; Inner < Nodes.length; Inner++) {
				PrimeElement(Nodes[Inner]);
			}
		}
	}

	function FindPartAncestor(Target) {
		var Cursor = Target;
		while (Cursor && Cursor !== document.body) {
			if (Cursor.classList) {
				if (
					Cursor.classList.contains("part") ||
					Cursor.classList.contains("composite") ||
					Cursor.classList.contains("activitybar") ||
					Cursor.classList.contains("sidebar") ||
					Cursor.classList.contains("auxiliarybar") ||
					Cursor.classList.contains("panel") ||
					Cursor.classList.contains("pane") ||
					Cursor.classList.contains("editor")
				) {
					return Cursor;
				}
			}
			Cursor = Cursor.parentElement;
		}
		return null;
	}

	function HandleEvent(Event) {
		var Part = FindPartAncestor(Event.target);
		if (Part) PrimeElement(Part);
	}

	function Install() {
		PrimeAllParts();
		// Run again after the workbench layout settles. The 200ms
		// mark is when extension contributions finish wiring up
		// their views; running once more catches anything that
		// mounted into a part after the initial DOMContentLoaded
		// pass.
		setTimeout(PrimeAllParts, 200);
		setTimeout(PrimeAllParts, 800);

		// Per-event prime for parts that mount post-startup
		// (extension panels, command palette, suggest widgets).
		document.addEventListener("click", HandleEvent, true);
		document.addEventListener("keydown", HandleEvent, true);
		document.addEventListener("pointerdown", HandleEvent, true);
		document.addEventListener("focus", HandleEvent, true);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", Install, { once: true });
	} else {
		Install();
	}
})();
`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectWorkbenchPaintPrime",
	Match: ({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
