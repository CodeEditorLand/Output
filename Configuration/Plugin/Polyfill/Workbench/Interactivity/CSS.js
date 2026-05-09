const e = "__LAND_WORKBENCH_INTERACTIVITY_CSS_V2__";

function a() {
	if (typeof window > "u") return;

	const n = window;

	if (n[e]) return;

	n[e] = !0;

	function t() {
		const o = document.createElement("style");

		(o.setAttribute("data-land-workbench-interactivity", "1"),
			(o.textContent = [
				".monaco-workbench .part,",

				".monaco-workbench .part > .content,",

				".monaco-workbench .part > .title,",

				".monaco-workbench .activitybar,",

				".monaco-workbench .statusbar,",

				".monaco-workbench .titlebar {",

				"  pointer-events: auto !important;",

				"}",

				".monaco-workbench .part.hidden,",

				".monaco-workbench .part.empty,",

				".monaco-workbench .composite.hidden,",

				".monaco-workbench .panel.hidden,",

				".monaco-workbench .pane.hidden,",

				".monaco-workbench .viewlet.hidden {",

				"  display: none !important;",

				"}",

				".monaco-workbench .part,",

				".monaco-workbench .activitybar,",

				".monaco-workbench .statusbar,",

				".monaco-workbench .titlebar {",

				"  transition-duration: 0s !important;",

				"  animation-duration: 0s !important;",

				"}",

				".monaco-workbench .monaco-inputbox,",

				".monaco-workbench .monaco-inputbox > .ibwrapper,",

				".monaco-workbench .monaco-inputbox input,",

				".monaco-workbench .monaco-inputbox textarea,",

				".monaco-workbench .monaco-findInput,",

				".monaco-workbench .monaco-action-bar,",

				".monaco-workbench .action-item,",

				".monaco-workbench .action-label,",

				".monaco-workbench .codicon {",

				"  pointer-events: auto !important;",

				"  visibility: visible !important;",

				"  opacity: 1 !important;",

				"}",

				".monaco-workbench .monaco-editor,",

				".monaco-workbench .monaco-editor .overflow-guard,",

				".monaco-workbench .monaco-editor .monaco-scrollable-element,",

				".monaco-workbench .monaco-editor .lines-content,",

				".monaco-workbench .monaco-editor .view-lines,",

				".monaco-workbench .monaco-editor .inputarea {",

				"  pointer-events: auto !important;",

				"}",

				".monaco-workbench .monaco-editor textarea.inputarea {",

				"  pointer-events: auto !important;",

				"}",
			].join(`
`)),
			(document.head ?? document.documentElement).appendChild(o));
	}
	document.readyState === "loading"
		? document.addEventListener("DOMContentLoaded", t, { once: !0 })
		: t();
}
export { e as Marker, a as default };
