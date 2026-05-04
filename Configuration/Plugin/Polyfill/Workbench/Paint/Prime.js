var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_WORKBENCH_PAINT_PRIME_V2__";
function WorkbenchPaintPrime() {
	if (typeof window === "undefined") return;
	const Land = window;
	if (Land[Marker]) return;
	Land[Marker] = true;
	const PartSelectors = [
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
	const Primed = /* @__PURE__ */ new WeakSet();
	function PrimeElement(Element) {
		if (!Element || Primed.has(Element)) return;
		Primed.add(Element);
		void Element.offsetHeight;
		try {
			Element.getBoundingClientRect();
		} catch {}
	}
	__name(PrimeElement, "PrimeElement");
	function PrimeAllParts() {
		for (const Selector of PartSelectors) {
			const Nodes = document.querySelectorAll(Selector);
			for (const Node of Array.from(Nodes)) {
				PrimeElement(Node);
			}
		}
	}
	__name(PrimeAllParts, "PrimeAllParts");
	function FindPartAncestor(Target) {
		let Cursor = Target;
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
	__name(FindPartAncestor, "FindPartAncestor");
	function HandleEvent(Event) {
		const Part = FindPartAncestor(Event.target);
		if (Part) PrimeElement(Part);
	}
	__name(HandleEvent, "HandleEvent");
	function Install() {
		PrimeAllParts();
		setTimeout(PrimeAllParts, 200);
		setTimeout(PrimeAllParts, 800);
		document.addEventListener("pointerdown", HandleEvent, {
			capture: true,
			once: false,
			passive: true,
		});
	}
	__name(Install, "Install");
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", Install, { once: true });
	} else {
		Install();
	}
}
__name(WorkbenchPaintPrime, "WorkbenchPaintPrime");
export { Marker, WorkbenchPaintPrime as default };
//# sourceMappingURL=Prime.js.map
