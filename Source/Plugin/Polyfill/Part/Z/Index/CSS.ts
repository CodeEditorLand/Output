/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # PartZIndexCSS polyfill
 *
 * Establishes a deterministic z-index hierarchy across the workbench
 * parts. Stock VS Code relies on Electron's compositor + the implicit
 * stacking-context order of `display:flex` siblings to keep the
 * activity bar, sidebar, panel, editor, status bar, and titlebar from
 * stepping on each other. Under WKWebView the stacking-context
 * resolution is more sensitive: any one part picking up an implicit
 * `transform: translate3d(...)` (which our other polyfills sometimes
 * apply for compositor commit hints) promotes it into its own stacking
 * context and hides the next sibling that legitimately sits above.
 *
 * The fix is to give every part an explicit `z-index` + `isolation:
 * isolate` so no sibling can ever obscure a higher-priority surface
 * (titlebar's hover menus, the command-center quick-pick dropdown,
 * notification toasts, dialog modals, status-bar progress badges).
 *
 * Order picked to match stock VS Code's intent:
 *
 *   activity bar    (`activitybar`)        : 10
 *   sidebar         (`sidebar`)            : 11
 *   auxiliary bar   (`auxiliarybar`)       : 11
 *   panel           (`panel`, bottom)      : 11
 *   banner          (`banner`)             : 12
 *   editor          (`editor`)             : 1   (sits below sticky parts)
 *   status bar      (`statusbar`)          : 20
 *   titlebar        (`titlebar`)           : 2500 (existing rule kept)
 *
 * The titlebar / quick-pick / dialog ladder is left untouched - those
 * already have explicit z-indexes set in stock CSS.
 *
 * Idempotent. Marker `__LAND_PART_ZINDEX__`.
 */

export const Marker = "__LAND_PART_ZINDEX__";

export default function PartZIndexCSS(): void {
	if (typeof window === "undefined") return;

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	function InstallStylesheet(): void {
		const Style = document.createElement("style");

		Style.setAttribute("data-land-part-zindex", "1");

		Style.textContent = [
			// Make every part a stacking context so its descendants
			// don't escape upwards into a sibling part. `isolation:
			// isolate` is cheaper than `transform: translateZ(0)` and
			// doesn't nudge subpixel rendering.
			".monaco-workbench .part {",

			"\tisolation: isolate;",

			"}",

			// Editor sits at the bottom of the workbench's z-stack so
			// floating UI (panel resize handles, sidebar shadows)
			// renders on top.
			".monaco-workbench .part.editor {",

			"\tz-index: 1;",

			"}",

			// Activity bar lives left/right of the workbench and must
			// render above the editor's overlay layers (drop targets,
			// minimap shadow). 10 keeps it well below the titlebar
			// (2500) and quick-pick (2550) ladder.
			".monaco-workbench .part.activitybar {",

			"\tz-index: 10;",

			"}",

			// Sidebar / auxiliary bar / bottom panel share a tier just
			// above the activity bar so resize handles draw correctly
			// against the editor's content.
			".monaco-workbench .part.sidebar,",

			".monaco-workbench .part.auxiliarybar,",

			".monaco-workbench .part.panel {",

			"\tz-index: 11;",

			"}",

			// Banner (workspace trust banner, update notifications)
			// sits above panels but below the status bar.
			".monaco-workbench .part.banner {",

			"\tz-index: 12;",

			"}",

			// Status bar must always be visible at the bottom even when
			// a maximized panel is in front. Stock has no explicit
			// z-index so a maximized panel (`.part.panel.maximized`)
			// occasionally clips the right-edge progress badges.
			".monaco-workbench .part.statusbar {",

			"\tz-index: 20;",

			"}",

			// When the panel is maximized the workbench gives it a
			// `display:flex` row that fills the editor area; without an
			// explicit z-index the panel viewlet header can hide under
			// the floating editor toolbar. Pin it.
			".monaco-workbench .part.panel.maximized {",

			"\tz-index: 13;",

			"}",

			// Drop-target overlays the editor uses for drag-and-drop of
			// tabs need to stay above the editor (z 1) but below all
			// panels. 5 fits cleanly between editor and activity bar.
			".monaco-workbench .editor-drop-target,",

			".monaco-workbench .editor-group-watermark {",

			"\tz-index: 5;",

			"}",

			// Make sure the command-center quick-pick (`.quick-input-widget`)
			// keeps its 2550 layer even when an extension's webview
			// inside the editor sets a higher z-index. Stock CSS doesn't
			// guard against this and an offending extension can hide the
			// picker entirely. We hoist explicitly to defeat shenanigans.
			".monaco-workbench .quick-input-widget {",

			"\tz-index: 2550 !important;",

			"}",

			// Notification toasts likewise - extensions occasionally
			// inject `position:fixed; z-index:9999999` into their
			// webview, which under our scheme bleeds into the host
			// stacking context. Stock CSS sets toasts at 2000; bump
			// just above quick-pick so they remain visible during a
			// command-palette session.
			".monaco-workbench .notifications-toasts {",

			"\tz-index: 2575 !important;",

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
