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

export const Marker = "__LAND_WORKBENCH_INTERACTIVITY_CSS__";

export default function WorkbenchInteractivityCSS(): void {
	if (typeof window === "undefined") return;

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	function InstallStylesheet(): void {
		const Style = document.createElement("style");

		Style.setAttribute("data-land-workbench-interactivity", "1");

		Style.textContent = [
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
			".monaco-workbench .part:not(.hidden),",
			".monaco-workbench .composite:not(.hidden),",
			".monaco-workbench .viewlet:not(.hidden),",
			".monaco-workbench .panel:not(.hidden),",
			".monaco-workbench .pane:not(.hidden) {",
			"  transform: none !important;",
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
		].join("\n");

		(document.head ?? document.documentElement).appendChild(Style);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallStylesheet, { once: true });
	} else {
		InstallStylesheet();
	}
}
