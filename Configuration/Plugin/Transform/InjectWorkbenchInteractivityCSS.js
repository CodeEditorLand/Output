var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_WORKBENCH_INTERACTIVITY_CSS__";
const Polyfill = `
/* ${Marker} */
(function(){
	if (typeof window === "undefined") return;
	if (window.${Marker}) return;
	window.${Marker} = true;

	function InstallStylesheet() {
		var Style = document.createElement("style");
		Style.setAttribute("data-land-workbench-interactivity", "1");
		Style.textContent = [
			// 1. Force pointer-events:auto on workbench containers so
			// inherited :none from a parent never leaks into a child
			// after a show transition.
			".monaco-workbench .part,",
			".monaco-workbench .part > .content,",
			".monaco-workbench .part > .title,",
			".monaco-workbench .composite,",
			".monaco-workbench .viewlet,",
			".monaco-workbench .panel,",
			".monaco-workbench .pane,",
			".monaco-workbench .pane-body,",
			".monaco-workbench .pane-header,",
			".monaco-workbench .activitybar,",
			".monaco-workbench .sidebar,",
			".monaco-workbench .editor-instance,",
			".monaco-workbench .editor-group-container,",
			".monaco-workbench .monaco-list,",
			".monaco-workbench .monaco-list-rows,",
			".monaco-workbench .monaco-tree {",
			"  pointer-events: auto !important;",
			"  visibility: visible !important;",
			"  opacity: 1 !important;",
			"}",

			// 2. Zero the show-transition durations so panels appear
			// instantly. WKWebView occasionally drops the first frame
			// of a 0->1 opacity transition, leaving the panel
			// invisible until the next interaction. With duration:0
			// the end-state lands on the same frame as the show.
			".monaco-workbench .part.hidden,",
			".monaco-workbench .part.empty,",
			".monaco-workbench .composite.hidden,",
			".monaco-workbench .panel.hidden,",
			".monaco-workbench .pane.hidden,",
			".monaco-workbench .viewlet.hidden {",
			"  display: none !important;",
			"}",
			".monaco-workbench .part,",
			".monaco-workbench .composite,",
			".monaco-workbench .panel,",
			".monaco-workbench .pane,",
			".monaco-workbench .viewlet {",
			"  transition-duration: 0s !important;",
			"  animation-duration: 0s !important;",
			"}",

			// 3. Strip transform-based slide-in animations that
			// position panels offscreen during the first frame.
			".monaco-workbench .part:not(.hidden),",
			".monaco-workbench .composite:not(.hidden),",
			".monaco-workbench .viewlet:not(.hidden),",
			".monaco-workbench .panel:not(.hidden),",
			".monaco-workbench .pane:not(.hidden) {",
			"  transform: none !important;",
			"}",

			// 4. Force input fields and the controls inside them to
			// be interactive immediately. The reported symptom
			// "input box only renders on hover" specifically targets
			// .monaco-inputbox.
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
		].join("\\n");
		(document.head || document.documentElement).appendChild(Style);
	}
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallStylesheet, { once: true });
	} else {
		InstallStylesheet();
	}
})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectWorkbenchInteractivityCSS",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectWorkbenchInteractivityCSS_default = Plugin;
export {
  InjectWorkbenchInteractivityCSS_default as default
};
//# sourceMappingURL=InjectWorkbenchInteractivityCSS.js.map
