/**
 * Force `terminal.integrated.gpuAcceleration` default to `'off'`.
 *
 * Stock VS Code defaults this setting to `'auto'`, which on macOS resolves
 * to xterm.js's WebGL renderer (see
 * `vs/workbench/contrib/terminal/browser/xterm/xtermTerminal.ts:597`).
 *
 * The WebGL renderer pre-rasterises every glyph into a texture atlas at
 * panel mount. Under Tauri's WKWebView the atlas pipeline mis-renders:
 *
 *   - The first-render font measurement frequently lands before the
 *     `Menlo` system face has resolved, so the atlas is built using a
 *     proportional fallback face's metrics. Subsequent renders use the
 *     correct face but the cell grid is locked to the wrong widths -
 *     visible as overlapping characters, "two-letters-in-one-cell" and
 *     gaps where double-width glyphs sit.
 *   - WKWebView's WebGL `texImage2D` upload for canvas-rendered glyph
 *     bitmaps applies different premultiplication than Chromium's, so
 *     anti-aliased edges render with ghosting/halos around every char.
 *
 * Stock VS Code never hits these because it runs in Electron's Chromium.
 * The DOM renderer (selected when `gpuAcceleration === 'off'`) draws each
 * cell as a real `<span>` styled with the font-family CSS, which uses the
 * platform's native CoreText path. Slower per-frame, reliably correct.
 *
 * The patch flips the schema's `default: 'auto'` to `default: 'off'` in
 * `vs/workbench/contrib/terminal/common/terminalConfiguration.js`. Users
 * who want WebGL can still opt in via `terminal.integrated.gpuAcceleration:
 * "on"` in `settings.json` - the schema's enum is unchanged.
 *
 * Idempotent via the `[Land] gpuAcceleration default` marker comment.
 */

import type { TransformPlugin } from "../../../../Type.js";

const Marker = "[Land] gpuAcceleration default";

const PathRegex =
	/workbench\/contrib\/terminal\/common\/terminalConfiguration\.js$/;

// Match the GpuAcceleration schema entry's `default: 'auto'`. Anchor on
// the surrounding `enum: ['auto', 'on', 'off']` line which is unique to
// this schema entry across the file (other settings use different enum
// shapes), so a stray `default: 'auto'` elsewhere in the file isn't
// touched. Allow either single or double quotes - esbuild rewrites stock
// VS Code's single quotes to double quotes during bundling.
const Anchor =
	/(enum:\s*\[\s*["']auto["']\s*,\s*["']on["']\s*,\s*["']off["']\s*\][\s\S]*?default:\s*)["']auto["']/;

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "PatchTerminalGpuAcceleration",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform({ Source }) {

		if (Source.includes(Marker)) {

			return { Kind: "Unchanged" };
		}

		if (!Anchor.test(Source)) {

			return { Kind: "Unchanged" };
		}

		return {

			Kind: "Rewrite",

			Source: Source.replace(Anchor, `$1"off" /* ${Marker} */`),
		};
	},
};

export default Plugin;
