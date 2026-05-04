var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_MAC_TITLEBAR_OFFSET__";
function MacTitlebarOffsetCSS() {
	if (typeof window === "undefined") return;
	const Land = window;
	if (Land[Marker]) return;
	Land[Marker] = true;
	function InstallStylesheet() {
		const Style = document.createElement("style");
		Style.setAttribute("data-land-mac-titlebar-offset", "1");
		Style.textContent = [
			// Reserve the traffic-light cluster width on the left of the
			// titlebar container. Targets `.mac` so non-macOS builds keep
			// their stock layout.
			".monaco-workbench.mac .part.titlebar > .titlebar-container {",
			"	padding-left: 80px;",
			"}",
			// `flex-direction: row-reverse` on `.part.titlebar` (stock
			// VS Code rule) inverts visual ordering when extra siblings
			// exist. With Tauri's overlay titlebar the sibling
			// `.window-controls-container` is empty, so `row-reverse`
			// has no visible effect - but explicitly switching to plain
			// `row` makes the layout robust to future churn.
			".monaco-workbench.mac .part.titlebar {",
			"	flex-direction: row !important;",
			"}",
			// Ensure the drag region also leaves the traffic-light area
			// non-draggable. macOS already owns the buttons; making the
			// drag region cover them still works (clicks pass through to
			// the OS hit-test) but produces a 1-frame focus flash on
			// hover. Inset the drag region so the buttons are
			// pixel-clean.
			".monaco-workbench.mac .part.titlebar > .titlebar-container > .titlebar-drag-region {",
			"	left: 80px;",
			"	width: calc(100% - 80px);",
			"}",
			// The macOS compact menubar (`.activitybar .menubar.compact`)
			// is unaffected; the inline menubar lives at
			// `.titlebar-left > .menubar` and inherits the container's
			// `padding-left` automatically.
			//
			// Command-center quick-pick (`Select pickers` in the user's
			// vocabulary) is centered on the titlebar via
			// `.titlebar-center` and unaffected by the left padding -
			// but its `min-width: 0` allows it to flex into the
			// reserved area on narrow windows. Lock a sensible
			// `margin-inline-start` so it doesn't drift back under the
			// traffic lights on a 1024px-wide split.
			".monaco-workbench.mac .part.titlebar > .titlebar-container.has-center > .titlebar-center {",
			"	margin-inline-start: 16px;",
			"}",
		].join("\n");
		(document.head ?? document.documentElement).appendChild(Style);
	}
	__name(InstallStylesheet, "InstallStylesheet");
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallStylesheet, {
			once: true,
		});
	} else {
		InstallStylesheet();
	}
}
__name(MacTitlebarOffsetCSS, "MacTitlebarOffsetCSS");
export { Marker, MacTitlebarOffsetCSS as default };
//# sourceMappingURL=MacTitlebarOffsetCSS.js.map
