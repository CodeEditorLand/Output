/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # WorkbenchInteractivityCSS polyfill
 *
 * Type-checked source for the IIFE that injects a high-specificity
 * stylesheet forcing workbench parts/panels/composites to be
 * interactive on `display:flex`. Companion to DisableLazyPaint.
 */

// Marker bumped to V2 so an already-injected V1 body in
// workbench.js doesn't trip `InjectWorkbenchInteractivityCSS`'s
// idempotency check and skip re-applying the new (less-aggressive)
// rules. Older `__LAND_WORKBENCH_INTERACTIVITY_CSS__` strings still
// exist as dead comments in patched bundles - harmless.
export const Marker = "__LAND_WORKBENCH_INTERACTIVITY_CSS_V2__";

export default function WorkbenchInteractivityCSS(): void {
	if (typeof window === "undefined") return;

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	function InstallStylesheet(): void {
		const Style = document.createElement("style");

		Style.setAttribute("data-land-workbench-interactivity", "1");

		Style.textContent = [
			// CRITICAL: do NOT blanket-force `visibility: visible` or
			// `opacity: 1` on workbench parts. Suggest widgets, hover
			// popups, the inactive editor groups, and a dozen other
			// `.monaco-list` / `.editor-instance` overlays are
			// intentionally `visibility: hidden` until the user
			// triggers them. Forcing them visible AND `pointer-events:
			// auto` plants invisible event-capturing rectangles over
			// the editor that absorb clicks before Monaco's
			// `mousedown` handler fires - which presents to the user
			// as "I clicked the editor, the cursor blinks, but typing
			// doesn't work" because the click never reached the
			// editor in the first place.
			//
			// The minimum-viable rule is `pointer-events: auto` on the
			// SHELLS the workbench draws inside (parts + their content
			// containers + the visible-by-default activity / status
			// bars). That alone defends against an inherited
			// `pointer-events: none` cascade without poisoning the
			// pop-over event chain. Visibility / opacity are left
			// alone - the workbench manages those itself.
			".monaco-workbench .part,",

			".monaco-workbench .part > .content,",

			".monaco-workbench .part > .title,",

			".monaco-workbench .activitybar,",

			".monaco-workbench .statusbar,",

			".monaco-workbench .titlebar {",

			"  pointer-events: auto !important;",

			"}",

			// `display: none` for `.hidden` parts: stock VS Code uses
			// CSS class toggles to hide parts; if a different polyfill
			// or the bundled-electron entry leaks `display: flex` onto
			// a `.hidden` part, this rule re-asserts the intent.
			".monaco-workbench .part.hidden,",

			".monaco-workbench .part.empty,",

			".monaco-workbench .composite.hidden,",

			".monaco-workbench .panel.hidden,",

			".monaco-workbench .pane.hidden,",

			".monaco-workbench .viewlet.hidden {",

			"  display: none !important;",

			"}",

			// Zero-duration transitions on the visible part shells so
			// panel resize / sidebar toggle finishes in one frame
			// rather than animating through a half-painted state. We
			// scope this to the SHELLS (`.part`, `.activitybar`,
			// `.statusbar`, `.titlebar`); leaving inner widgets
			// (suggest, hover) free to animate with their own timing
			// avoids a perceived "snap" mid-popup.
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

			// Monaco's keyboard input target. The hidden `<textarea
			// class="inputarea">` lives inside `.monaco-editor >
			// .overflow-guard > .inputarea` and receives every
			// keystroke once the editor is focused. WKWebView under
			// Tauri sometimes inherits a `pointer-events:none` from
			// an ancestor stacking-context container (the `.editor`
			// part picks up `isolation:isolate` from
			// `InjectPartZIndexCSS`, and the chain of nested overflow
			// guards each have `position:absolute; pointer-events:
			// auto/none` toggles). Pin the textarea + the immediate
			// containers so the chain stays interactive regardless of
			// what stacking context lives above. Use the *most*
			// specific selectors so we don't blanket-fix unrelated
			// `<textarea>` elements outside Monaco.
			".monaco-workbench .monaco-editor,",

			".monaco-workbench .monaco-editor .overflow-guard,",

			".monaco-workbench .monaco-editor .monaco-scrollable-element,",

			".monaco-workbench .monaco-editor .lines-content,",

			".monaco-workbench .monaco-editor .view-lines,",

			".monaco-workbench .monaco-editor .inputarea {",

			"  pointer-events: auto !important;",

			"}",

			// The textarea itself is intentionally semi-transparent
			// (Monaco paints the cursor + selection on a separate
			// layer) so we can NOT force `opacity:1` here - that
			// would paint the textarea ON TOP of the rendered text.
			// We DO need `position` to stay sane and `disabled` /
			// `readonly` to NOT be set: Monaco controls those at
			// runtime; resetting them via CSS would lock the
			// textarea out of input. Limit ourselves to
			// `pointer-events`.
			".monaco-workbench .monaco-editor textarea.inputarea {",

			"  pointer-events: auto !important;",

			"}",
		].join("\n");

		(document.head ?? document.documentElement).appendChild(Style);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallStylesheet, {
			once: true,
		});
	} else {
		InstallStylesheet();
	}
}
