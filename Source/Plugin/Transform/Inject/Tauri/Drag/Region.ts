/**
 * Stamp `data-tauri-drag-region` on workbench titlebar drag regions so
 * Tauri 2's overlay-titlebar window-drag hit-test picks them up.
 *
 * Body lives in `Polyfill/Tauri/Drag/Region.ts` (type-checked source).
 * This transform extracts VS Code's `-webkit-app-region: drag|no-drag`
 * selectors at BUILD TIME (when the CSS source is still plain text) and
 * embeds them as `globalThis.__LAND_DRAG_SELECTORS__` /
 * `globalThis.__LAND_NO_DRAG_SELECTORS__` constants before the polyfill
 * runs.
 *
 * ## Why build-time extraction
 *
 * WebKit (Tauri 2 on macOS) silently drops the Chromium-only
 * `-webkit-app-region` declaration at CSS parse time. By the time the
 * runtime polyfill reads `CSSStyleRule.style`, the value is gone -
 * empirically `style.getPropertyValue("-webkit-app-region")` returns
 * `""` for every rule, and `rule.cssText` does not include the
 * declaration. Building the selector list at runtime is therefore
 * impossible under WebKit.
 *
 * The Output pipeline runs after the VS Code source has been copied to
 * `Element/Output/Target/Microsoft/VSCode/`, where the CSS files are
 * still on disk and still contain `-webkit-app-region: drag|no-drag`
 * declarations verbatim. This transform scans those files at module-
 * load time, parses each rule's selector list, and bakes a JSON array
 * of selectors into the workbench bundle. The runtime polyfill reads
 * the globals via `querySelectorAll`.
 *
 * Always active - drag wiring is needed on every OS. Idempotent.
 * Marker `__LAND_TAURI_DRAG_REGION__`.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

import TauriDragRegion from "../../../../Polyfill/Tauri/Drag/Region.js";
import type { TransformPlugin } from "../../../../Type.js";

const Marker = "__LAND_TAURI_DRAG_REGION__";

// Pipeline `cwd` is `Element/Output`; the copied VS Code source tree
// lives under `Target/Microsoft/VSCode/`.
const VSCodeRoot = resolve(process.cwd(), "Target/Microsoft/VSCode");

/**
 * Walk a directory tree under VSCodeRoot, collecting paths to every
 * `.css` file. Skip `node_modules` defensively; the copied tree should
 * not contain it, but the safeguard is cheap.
 */
function CollectCSSFiles(Root: string): string[] {
	const Out: string[] = [];

	const Walk = (Dir: string): void => {
		let Entries: string[];

		try {
			Entries = readdirSync(Dir);
		} catch {
			return;
		}

		for (const Entry of Entries) {
			if (Entry === "node_modules") continue;

			const Full = join(Dir, Entry);

			let Stat: ReturnType<typeof statSync>;

			try {
				Stat = statSync(Full);
			} catch {
				continue;
			}

			if (Stat.isDirectory()) {
				Walk(Full);
			} else if (Entry.endsWith(".css")) {
				Out.push(Full);
			}
		}
	};

	Walk(Root);

	return Out;
}

/**
 * Match every CSS rule whose declaration block contains
 * `-webkit-app-region: drag|no-drag`. Capture the selector list
 * (everything between the previous `}` and the opening `{`) plus the
 * drag-value.
 *
 * Greedy negation in the character classes prevents matches from
 * crossing rule boundaries:
 *   - Selector text: `[^{}]+` stops before the next `{` or `}`.
 *   - Block body:    `[^{}]*` stops before the next `}`.
 *
 * `@media` / `@supports` wrappers are not a problem - the inner
 * `CSSStyleRule` is matched independently of its enclosing at-rule.
 *
 * Matches both `drag` and `no-drag`; the value is captured for routing.
 */
const RuleRegex =
	/([^{}]+)\{[^{}]*-webkit-app-region\s*:\s*(no-drag|drag)\b[^{}]*\}/g;

interface Extracted {
	Drag: string[];

	NoDrag: string[];
}

function ExtractSelectors(): Extracted {
	const Drag = new Set<string>();

	const NoDrag = new Set<string>();

	const Files = CollectCSSFiles(VSCodeRoot);

	for (const File of Files) {
		let Text: string;

		try {
			Text = readFileSync(File, "utf8");
		} catch {
			continue;
		}

		// Fast pre-check: skip files that don't contain the declaration
		// at all (the vast majority). Avoids the heavier regex pass on
		// thousands of irrelevant CSS files.
		if (!Text.includes("-webkit-app-region")) continue;

		let Match: RegExpExecArray | null;

		// Reset the regex's lastIndex per file (the regex is global so
		// it shares state across exec calls).
		RuleRegex.lastIndex = 0;

		while ((Match = RuleRegex.exec(Text)) !== null) {
			// CSS `/* … */` comments are legal in a selector list (CSS Syntax
			// L3 strips them at tokenisation), but WebKit's `querySelectorAll`
			// rejects a string that begins with one and the upstream CSS
			// frequently prefixes the rule with a banner comment or a
			// per-selector explanation. Strip every comment span - including
			// multi-line ones - before splitting on commas so the baked-in
			// arrays are pure selectors.
			const Cleaned = (Match[1] ?? "").replace(/\/\*[\s\S]*?\*\//g, " ");

			const Selectors = Cleaned.split(",")
				.map((Segment) => Segment.replace(/\s+/g, " ").trim())
				.filter(Boolean);

			const Bucket = Match[2] === "drag" ? Drag : NoDrag;

			for (const Selector of Selectors) {
				Bucket.add(Selector);
			}
		}
	}

	return { Drag: Array.from(Drag), NoDrag: Array.from(NoDrag) };
}

// Extract once at module load. The transform body re-uses the cached
// arrays for every workbench bundle that passes through.
const { Drag, NoDrag } = ExtractSelectors();

console.log(
	`[InjectTauriDragRegion] Extracted ${Drag.length} drag + ${NoDrag.length} no-drag selectors from VS Code CSS`,
);

const Bootstrap = `
/* ${Marker} */
globalThis.__LAND_DRAG_SELECTORS__ = ${JSON.stringify(Drag)};
globalThis.__LAND_NO_DRAG_SELECTORS__ = ${JSON.stringify(NoDrag)};
(${TauriDragRegion.toString()})();
`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectTauriDragRegion",

	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),

	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		return { Kind: "Rewrite", Source: Bootstrap + Source };
	},
};

export default Plugin;
