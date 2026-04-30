/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # WorkbenchPaintPrime polyfill
 *
 * Forces a synchronous forced-layout (`void offsetHeight`) on the
 * eight workbench part containers at boot and on the first user
 * interaction with each part. Commits the layer to WKWebView's
 * Core Animation compositor.
 */

export const Marker = "__LAND_WORKBENCH_PAINT_PRIME__";

export default function WorkbenchPaintPrime(): void {
	if (typeof window === "undefined") return;

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	const PartSelectors: Array<string> = [
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

	const Primed = new WeakSet<Element>();

	function PrimeElement(Element: Element | null | undefined): void {
		if (!Element || Primed.has(Element)) return;

		Primed.add(Element);

		void (Element as HTMLElement).offsetHeight;

		try {
			Element.getBoundingClientRect();
		} catch {
			/* ignore */
		}
	}

	function PrimeAllParts(): void {
		for (const Selector of PartSelectors) {
			const Nodes = document.querySelectorAll(Selector);

			for (const Node of Array.from(Nodes)) {
				PrimeElement(Node);
			}
		}
	}

	function FindPartAncestor(Target: EventTarget | null): Element | null {
		let Cursor = Target as Element | null;

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

	function HandleEvent(Event: Event): void {
		const Part = FindPartAncestor(Event.target);

		if (Part) PrimeElement(Part);
	}

	function Install(): void {
		PrimeAllParts();

		setTimeout(PrimeAllParts, 200);

		setTimeout(PrimeAllParts, 800);

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
}
