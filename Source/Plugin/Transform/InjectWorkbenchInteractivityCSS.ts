/**
 * Force workbench parts/panels/composites to be interactive on
 * `display:flex` rather than waiting for a paint or focus to clear
 * inherited `pointer-events:none`, `visibility:hidden`, fade
 * transitions, etc.
 *
 * # Companion to InjectDisableLazyPaint
 *
 * `InjectDisableLazyPaint` killed the lazy compositor-paint path so
 * panels render on show. This patch closes the second class of
 * "panel not interactive until hover" symptoms: even after the
 * panel paints, child elements may stay non-interactive because:
 *
 *   - A parent hidden state cascaded `pointer-events:none` and the
 *     show transition forgot to clear it.
 *   - A `visibility:hidden -> visibility:visible` transition is
 *     mid-flight and clicks fall through.
 *   - An `opacity:0 -> opacity:1` transition is animating; clicks
 *     during the transition are eaten by the parent.
 *   - A `transform:translateY(...)` slide-in animation is mid-
 *     flight; the layer is positioned offscreen during the first
 *     frame of the transition.
 *
 * VS Code's panel-show CSS uses these mechanisms to do soft
 * fades that mostly work in Chromium but stutter or stall under
 * WKWebView. The user has loaded the workbench directly and does
 * not need fade-in animations - we want panels to be fully
 * interactive the moment they have `display:flex`.
 *
 * # What this strips
 *
 *   1. `pointer-events:none` on workbench-level containers - any
 *      part of `.monaco-workbench .part`, `.composite`, `.viewlet`,
 *      `.panel`, `.pane`, `.pane-body`, `.activitybar`, `.sidebar`,
 *      `.editor-instance`, `.title`, `.content`. Each gets
 *      `pointer-events:auto !important`.
 *   2. `visibility:hidden` and `opacity:0` cascade resets on the
 *      same containers - flipped to `visible` / `1` !important.
 *   3. Transition durations zeroed on the show path so panels
 *      appear instantly rather than fading.
 *
 * # What this does NOT touch
 *
 *   - Modal dialog overlays - they legitimately use opacity to
 *     drive the fade-in, but they sit at a higher selector that
 *     doesn't match here.
 *   - Hover-state elevations (button hover, list-item highlight) -
 *     those are :hover-scoped, not :not(:hover) defaults.
 *   - Focus rings - they use box-shadow / outline, not pointer-
 *     events.
 *
 * Idempotent. Marker `__LAND_WORKBENCH_INTERACTIVITY_CSS__`.
 */

import type { TransformPlugin } from "../Type.js";

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

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectWorkbenchInteractivityCSS",
	Match: ({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
