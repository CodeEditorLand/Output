/**
 * Inject CSS that pins the xterm canvas to its own GPU compositor layer
 * so WKWebView doesn't expose the cleared-canvas frame between
 * `xterm.refresh()` cycles.
 *
 * # Why this exists
 *
 * Stock VS Code's terminal panel calls `xterm.refresh()` from
 * `terminalInstance.attachToElement` whenever the panel is hidden then
 * shown again (tab-switch, pane resize, etc.). `refresh()` with the
 * WebGL renderer clears the canvas framebuffer and repaints every
 * visible cell from the glyph atlas. Under Chromium the compositor
 * double-buffers tightly enough that the clear-state is invisible -
 * it lands within one paint frame. Under Tauri's WKWebView the
 * compositor flushes the parent layer between the clear and the
 * repaint, so the user briefly sees the pre-paint background colour
 * (looks like a flash on every click).
 *
 * Hinting `will-change: transform` on the xterm host elements puts
 * the canvas on its own composited layer that survives parent flushes,
 * so the clear/repaint cycle stays inside the layer and never shows
 * on screen. `contain: paint` doubles up the hint by telling the
 * browser the descendants will not paint outside the host's box, so
 * the compositor doesn't need to coordinate with siblings during the
 * refresh.
 *
 * # Why CSS, not a workbench patch
 *
 * The flash is a compositor behaviour, not a logic bug. Patching
 * `xterm.refresh` or `attachToElement` would deviate from upstream and
 * break re-attach correctness. CSS hints are non-load-bearing - they
 * only change which compositor strategy WebKit uses. If WKWebView
 * fixes its compositor in the future the hints become no-ops.
 *
 * The injected stylesheet body lives in
 * `Element/Output/Source/Asset/Style/TerminalGPULayer.css` and is read
 * at apply-time via a path relative to this module's compiled location.
 *
 * Idempotent via the `__LAND_TERMINAL_GPU_LAYER__` marker.
 */

import { readFile } from "node:fs/promises";

import { fileURLToPath } from "node:url";

import type { TransformPlugin } from "../../../../../Type.js";

const Marker = "__LAND_TERMINAL_GPU_LAYER__";

const StylesheetPath = fileURLToPath(
	new URL(
		"../../../../../../../Source/Asset/Style/Terminal/GPU/Layer.css",

		import.meta.url,
	),
);

const InjectedCSS = "\n" + (await readFile(StylesheetPath, "utf8"));

const PathRegex = /workbench\/contrib\/terminal\/browser\/media\/[^/]+\.css$/;

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "InjectTerminalGPULayerCSS",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}

		// Append the GPU-layer hints to the matched terminal stylesheet.
		// Multiple terminal CSS files exist (terminal.css, terminalTabs.css,
		// etc.) - applying to each one is safe because the marker check
		// above prevents double-injection on already-patched files.
		return {
			Kind: "Rewrite",

			Source: Source + InjectedCSS,
		};
	},
};

export default Plugin;
