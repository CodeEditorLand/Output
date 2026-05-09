/**
 * Rewrite the `vscode-file://vscode-app/...` URLs that VS Code's
 * runtime stylesheet emitters bake into `@font-face { src: url(...) }`
 * and `background-image: url(...)` rules. WKWebView under Tauri
 * has no handler for the `vscode-file://` scheme, so any
 * extension-contributed font / icon image fails to fetch.
 *
 * Two emit points to patch:
 *
 *   1. `vs/platform/theme/browser/iconsStyleSheet.js`
 *      - `getCSS()` aggregates every contributed product icon
 *        (codicons + every extension that ships its own font:
 *        GitLens, gitlens-inspect, dart-code, codeicons, ...).
 *        Last statement returns `rules.join('\n')`.
 *
 *   2. `vs/workbench/services/themes/browser/fileIconThemeData.js`
 *      - File-icon-theme emitter (Seti, Material Icon Theme, etc.).
 *        Final statement assigns `result.content = cssRules.join('\n')`.
 *        Same `vscode-file://...` URLs in `@font-face src` and in
 *        `background-image` rules for image-based icons.
 *
 * Both fan out to a single replace chain:
 *
 *   - `vscode-file://vscode-app/Static/Application/out/<...>`
 *     → `<origin>/Static/Application/<...>` (matches the existing
 *       `InjectWebViewPolyfills` Blob-shim rewrite for built-in
 *       extensions copied into Sky's `Static/Application/`).
 *   - `vscode-file://vscode-app/<abs-fs-path>`
 *     → `<origin>/Extension/<abs-fs-path>` so Mountain's vendored
 *       `tauri-plugin-localhost` `/Extension/<...>` route serves
 *       the file from disk (allowlist:
 *       `~/.land/extensions/`, `~/.vscode/extensions/`).
 *
 * Per-file marker so the second build pass over an already-patched
 * tree is a no-op:
 *   - iconsStyleSheet:    `__LAND_ICONS_STYLESHEET_URL_REWRITE__`
 *   - fileIconThemeData:  `__LAND_FILE_ICON_THEME_URL_REWRITE__`
 */

import type { TransformPlugin } from "../../../../../Type.js";

interface AnchorSpec {
	readonly Marker: string;

	readonly PathRegex: RegExp;

	readonly Search: RegExp;
}

// Replacement chain. Three rewrites, applied in order:
//
//   1. `vscode-file://vscode-app/Static/Application/out/<…>` →
//      `<origin>/Static/Application/<…>`
//      Built-in extensions copied into Sky's `Static/Application/`.
//   2. `vscode-file://vscode-app/<abs>` →
//      `<origin>/Extension/<abs>`
//      Sideloaded extensions under `~/.land/extensions/` etc.
//      Mountain's `/Extension/<abs>` route serves these from disk.
//   3. `file:///<abs>` →
//      `<origin>/Extension/<abs>`
//      Stock VS Code's `FileAccess.uriToBrowserUri` only converts
//      `file:` → `vscode-file:` when `platform.isNative` is true,
//      which depends on a `process.versions.node` shim. Under
//      Tauri/WKWebView the shim isn't always installed before
//      `iconsStyleSheet.getCSS()` first runs, so the URL leaks
//      through as `file:///<home>/.land/extensions/<id>/<font>.woff2`.
//      WKWebView refuses to load `file:` from an `http:` origin
//      (mixed-scheme), so the @font-face rule fetches a 0-byte
//      response and codicons render as missing-glyph boxes. This
//      third replace catches the leak.
const ReplacementSuffix =
	`.replace(/vscode-file:\\/\\/vscode-app\\/Static\\/Application\\/out\\//g, ` +
	`(globalThis).location.origin + '/Static/Application/').` +
	`replace(/vscode-file:\\/\\/vscode-app\\//g, ` +
	`(globalThis).location.origin + '/Extension/').` +
	`replace(/file:\\/\\/\\//g, ` +
	`(globalThis).location.origin + '/Extension/')`;

// `getCSS()` in iconsStyleSheet.js - last statement is
// `return rules.join('\n');`. Capture that join expression and
// suffix the replace chain before the trailing `;}`.
//
// Marker is suffixed `_V2` so an Output target tree from a prior
// build (which had the previous two-replace chain) gets replaced
// rather than skipped. Bump the suffix again whenever the chain
// changes.
// Optional trailing `.replace(...).replace(...)…` chain that a
// previous version of this transform may have left behind. The
// non-capturing group consumes any number of `.replace(...)` calls
// (zero, two, three, future five) so the search succeeds whether
// the file is fresh, V1-patched, or V2-patched, and the new
// chain replaces the old one cleanly.
const TrailingReplaceChain = "(?:(?:\\.replace\\([^)]*\\))*)";

// iconsStyleSheet.js stock shape:
//
//   getCSS() {
//       …
//       return rules.join('\n');
//   }
//
// The semicolon after `rules.join('\n')` is REQUIRED in the actual
// file - we need to consume it (along with any optional injected
// replace chain) before reaching the closing `}`. The `(?:;)?` keeps
// the regex tolerant of either form (esbuild minifiers occasionally
// drop the trailing `;` before a `}`).
const IconsStyleSheetAnchor: AnchorSpec = {
	Marker: "/* __LAND_ICONS_STYLESHEET_URL_REWRITE_V2__ */",

	PathRegex: /\/vs\/platform\/theme\/browser\/iconsStyleSheet\.js$/,

	Search: new RegExp(
		`(getCSS\\(\\)\\s*\\{\\s*[\\s\\S]*?return\\s+rules\\.join\\('\\\\n'\\))${TrailingReplaceChain}(?:;)?(\\s*\\})`,
	),
};

// `_processIconThemeDocument` (or its successor) in
// fileIconThemeData.js - final body line is
// `result.content = cssRules.join('\n');`. Capture the join
// expression and the trailing `;`.
const FileIconThemeAnchor: AnchorSpec = {
	Marker: "/* __LAND_FILE_ICON_THEME_URL_REWRITE_V2__ */",

	PathRegex:
		/\/vs\/workbench\/services\/themes\/browser\/fileIconThemeData\.js$/,

	Search: new RegExp(
		`(result\\.content\\s*=\\s*cssRules\\.join\\('\\\\n'\\))${TrailingReplaceChain}(\\s*;)`,
	),
};

const Anchors: ReadonlyArray<AnchorSpec> = [
	IconsStyleSheetAnchor,

	FileIconThemeAnchor,
];

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "RewriteIconsStyleSheetURLs",

	Match: ({ Path }) => Anchors.some((Anchor) => Anchor.PathRegex.test(Path)),

	Transform({ Path, Source }) {
		const Anchor = Anchors.find((Candidate) =>
			Candidate.PathRegex.test(Path),
		);

		if (!Anchor) return { Kind: "Unchanged" };

		if (Source.includes(Anchor.Marker)) return { Kind: "Unchanged" };

		if (!Anchor.Search.test(Source)) return { Kind: "Unchanged" };

		// Trailing `;` keeps the rewritten join-chain a complete
		// statement under either anchor. iconsStyleSheet's regex
		// consumes the original `;` (it lives between `rules.join`
		// and the closing `}`); fileIconTheme's regex captures the
		// `;` as $2 - prepending another one here is a benign double
		// (`;;` is two empty statements, JS-legal).
		const Next = Source.replace(
			Anchor.Search,

			`${Anchor.Marker} $1${ReplacementSuffix};$2`,
		);

		if (Next === Source) return { Kind: "Unchanged" };

		return { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
