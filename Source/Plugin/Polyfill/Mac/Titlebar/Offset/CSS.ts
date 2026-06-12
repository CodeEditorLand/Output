/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # MacTitlebarOffsetCSS polyfill
 *
 * Pushes the workbench titlebar content right on macOS so the in-window
 * `File / Edit / View / ...` menubar and the command-center quick-pick
 * stop colliding with the OS traffic lights.
 *
 * Stock VS Code Electron solves this via `titleBarStyle: hiddenInset` +
 * a Chromium `app-region: drag` strip whose padding is set in main-
 * process code. We are running under Tauri 2 with `TitleBarStyle::Overlay`
 * + `hidden_title(true)`, which leaves the WKWebView content at `0,0`
 * with the OS-painted traffic lights drawn on top of the workbench DOM.
 * The result the user sees: the close / minimize / maximize buttons sit
 * on top of the `File`, `New`, and the command-center "Select pickers"
 * dropdown trigger.
 *
 * Reservation width matches the macOS traffic-light cluster (`~78px`
 * including the inter-button gaps) plus a `2px` cushion so a hover ring
 * around the leftmost menubar item doesn't bleed under the buttons.
 *
 * ## Always active
 *
 * Runs unconditionally - even with `DisableUIFixes=true`. Without it,
 * the macOS title-bar overlap is severe enough that menubar and
 * command-center are unusable. The matching CSS only applies under
 * `.monaco-workbench.mac` so non-macOS builds keep stock layout.
 *
 * ## Fullscreen toggle
 *
 * macOS native fullscreen (green-button or Cmd+Ctrl+F) slides the
 * traffic-light cluster off-screen and gives the webview the full
 * display area. The left-side reservation becomes wasted space. We
 * detect fullscreen via three signals (HTML5 fullscreen API,
 * `matchMedia('(display-mode: fullscreen)')`, window-vs-screen size
 * heuristic) and toggle `body.land-fullscreen` so the CSS below
 * reclaims the area. Re-applies on every `resize` /
 * `fullscreenchange` event.
 *
 * ## Right side
 *
 * Traffic lights only sit on the left on macOS. Right side gets
 * `padding-right: 0` asserted so a stock CSS regression cannot
 * introduce drift later.
 *
 * Idempotent. Marker `__LAND_MAC_TITLEBAR_OFFSET__`.
 */

export default function MacTitlebarOffsetCSS(): void {
	if (typeof window === "undefined") return;

	const Marker = "__LAND_MAC_TITLEBAR_OFFSET__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	function InstallStylesheet(): void {
		const Style = document.createElement("style");

		Style.setAttribute("data-land-mac-titlebar-offset", "1");

		Style.textContent = [
			// Reserve the traffic-light cluster width on the left of the
			// titlebar container. Targets `.mac` so non-macOS builds keep
			// their stock layout.
			".monaco-workbench.mac .part.titlebar > .titlebar-container {",

			"	padding-left: 80px;",

			// Traffic lights live on the LEFT on macOS. No right padding
			// is needed; asserted explicitly so a future stock rule
			// cannot introduce drift on the right edge.
			"	padding-right: 0;",

			"}",

			// Stock VS Code declares `flex-direction: row-reverse` on
			// `.monaco-workbench.mac .part.titlebar` (titlebarpart.css
			// line 14) so the OS-painted Windows-style controls would
			// flow at the visual left of the flex row. Under Tauri's
			// overlay titlebar there are no Windows controls; the macOS
			// traffic lights live on the left and our padding-left:80px
			// (above) reserves space for them. Force plain `row` so
			// titlebar-left / titlebar-center / titlebar-right render in
			// document order LTR. `.titlebar-drag-region` is
			// `position: absolute` per stock CSS, so it doesn't
			// participate in flex layout either way.
			".monaco-workbench.mac .part.titlebar {",

			"	flex-direction: row !important;",

			"}",

			// `.titlebar-drag-region` keeps its stock geometry
			// (`left: 0; width: 100%`). macOS owns the traffic-light
			// hit-test at the OS level so clicks on the buttons never
			// reach the webview; everywhere else in the titlebar drags
			// the window. The `data-tauri-drag-region` attribute the
			// TauriDragRegion polyfill stamps on this element is what
			// Tauri's hit-test actually reads. No CSS override of the
			// drag-region geometry is needed.
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

			// --- Fullscreen reclaim ----------------------------------
			// Toggled by the detector below via `body.land-fullscreen`.
			// macOS native fullscreen hides the traffic-light cluster
			// entirely; reclaim the 80px container reservation so the
			// menubar + command-center expand to the left edge.
			// Overrides the rule above by virtue of being more specific
			// (extra `.land-fullscreen` class on `body`).
			"body.land-fullscreen .monaco-workbench.mac .part.titlebar > .titlebar-container {",

			"	padding-left: 0;",

			"}",
		].join("\n");

		(document.head ?? document.documentElement).appendChild(Style);
	}

	function InstallFullscreenDetector(): void {
		// True when the window is in any flavour of fullscreen:
		//   - HTML5 fullscreen API (Element.requestFullscreen).
		//   - CSS display-mode media query (browser-level chromeless).
		//   - macOS native fullscreen: WKWebView fills the entire
		//     screen including the area normally occupied by the menu
		//     bar. A 1-pixel slack accounts for sub-pixel rounding.
		const IsFullscreen = (): boolean => {
			if (document.fullscreenElement) return true;

			try {
				if (
					window.matchMedia?.("(display-mode: fullscreen)")?.matches
				) {
					return true;
				}
			} catch {
				// matchMedia not supported - fall through to dimension
				// heuristic.
			}

			const ScreenWidth =
				window.screen?.width ?? Number.POSITIVE_INFINITY;

			const ScreenHeight =
				window.screen?.height ?? Number.POSITIVE_INFINITY;

			return (
				window.outerHeight >= ScreenHeight - 1 &&
				window.outerWidth >= ScreenWidth - 1
			);
		};

		const Apply = (): void => {
			const Active = IsFullscreen();

			document.body?.classList.toggle("land-fullscreen", Active);
		};

		// Initial pass once `<body>` is mountable.
		Apply();

		// Resize covers macOS native fullscreen toggle (green button or
		// Cmd+Ctrl+F system-wide) - the window dimensions change as the
		// transition completes. Cheap: two int reads + compare.
		window.addEventListener("resize", Apply);

		// Fullscreen API event (e.g. `Element.requestFullscreen()` from
		// an extension webview or built-in find-widget pop-out).
		document.addEventListener("fullscreenchange", Apply);

		// `display-mode` media-query change covers the standalone PWA
		// transition path on environments that support it. Safe no-op
		// where unsupported.
		try {
			const MediaQuery = window.matchMedia?.(
				"(display-mode: fullscreen)",
			);

			if (
				MediaQuery &&
				typeof MediaQuery.addEventListener === "function"
			) {
				MediaQuery.addEventListener("change", Apply);
			} else if (
				MediaQuery &&
				typeof MediaQuery.addListener === "function"
			) {
				// Older WebKit fallback.
				MediaQuery.addListener(Apply);
			}
		} catch {
			// matchMedia listener attach can throw on very old WebViews -
			// initial Apply() plus resize listener are sufficient.
		}
	}

	function Initialise(): void {
		InstallStylesheet();

		InstallFullscreenDetector();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", Initialise, {
			once: true,
		});
	} else {
		Initialise();
	}
}
