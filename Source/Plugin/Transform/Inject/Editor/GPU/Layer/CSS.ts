/**
 * Pin Monaco's editor canvases to their own GPU compositor layer so
 * WKWebView's compositor flushes don't expose interim paint state.
 *
 * Same rationale as `InjectTerminalGPULayerCSS.ts` but applied to the
 * Monaco editor surface. Without these hints WKWebView occasionally:
 *
 *   - Shows the cursor / underscore at a position offset from where it
 *     belongs (the compositor lifts the cursor layer onto a different
 *     baseline than the text layer during reflow).
 *   - Flashes the editor area on tab-switch / panel resize - the
 *     editor's wrapper element gets re-attached, Monaco runs its own
 *     `view.refresh`, and the canvas is briefly cleared while the
 *     parent layer is mid-flush.
 *
 * `will-change: transform` + `contain: paint` + `transform: translateZ(0)`
 * forces the canvas onto a self-contained composited layer so the clear/
 * paint cycle stays inside the layer. `isolation: isolate` adds a stacking
 * context so focus transitions don't bleed across editor groups.
 *
 * The injected stylesheet body lives in
 * `Element/Output/Source/Asset/Style/EditorGPULayer.css` and is read at
 * apply-time via a path relative to this module's compiled location -
 * keeping the CSS in its own file gives proper editor highlighting and
 * lets future tweaks live as a real `.css` diff instead of an embedded
 * string.
 *
 * Idempotent via the `__LAND_EDITOR_GPU_LAYER__` marker.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import type { TransformPlugin } from "../../../../../Type.js";

const Marker = "__LAND_EDITOR_GPU_LAYER__";

// `import.meta.url` resolves to this file at runtime regardless of where
// the build root lives. Ascending from `Configuration/Plugin/Transform/`
// to the package root and into `Source/Asset/Style/` keeps the CSS source
// alongside its sibling stylesheets without forcing an esbuild copy step.
const StylesheetPath = fileURLToPath(
	new URL(
		"../../../../../../../Source/Asset/Style/Editor/GPU/Layer.css",

		import.meta.url,
	),
);

const InjectedCSS = "\n" + (await readFile(StylesheetPath, "utf8"));

const PathRegex = /editor\/browser\/(?:[^/]+\/)*[^/]+\.css$/;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectEditorGPULayerCSS",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}

		return {
			Kind: "Rewrite",

			Source: Source + InjectedCSS,
		};
	},
};

export default Plugin;
