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

import type { TransformPlugin } from "../Type.js";

interface AnchorSpec {
	readonly Marker: string;
	readonly PathRegex: RegExp;
	readonly Search: RegExp;
}

const ReplacementSuffix =
	`.replace(/vscode-file:\\/\\/vscode-app\\/Static\\/Application\\/out\\//g, ` +
	`(globalThis).location.origin + '/Static/Application/').` +
	`replace(/vscode-file:\\/\\/vscode-app\\//g, ` +
	`(globalThis).location.origin + '/Extension/')`;

// `getCSS()` in iconsStyleSheet.js - last statement is
// `return rules.join('\n');`. Capture that join expression and
// suffix the replace chain before the trailing `;}`.
const IconsStyleSheetAnchor: AnchorSpec = {
	Marker: "/* __LAND_ICONS_STYLESHEET_URL_REWRITE__ */",
	PathRegex: /\/vs\/platform\/theme\/browser\/iconsStyleSheet\.js$/,
	Search:
		/(getCSS\(\)\s*\{\s*[\s\S]*?return\s+rules\.join\('\\n'\));(\s*\})/,
};

// `_processIconThemeDocument` (or its successor) in
// fileIconThemeData.js - final body line is
// `result.content = cssRules.join('\n');`. Capture the join
// expression and suffix the replace chain before the trailing
// semicolon.
const FileIconThemeAnchor: AnchorSpec = {
	Marker: "/* __LAND_FILE_ICON_THEME_URL_REWRITE__ */",
	PathRegex: /\/vs\/workbench\/services\/themes\/browser\/fileIconThemeData\.js$/,
	Search: /(result\.content\s*=\s*cssRules\.join\('\\n'\))(\s*;)/,
};

const Anchors: ReadonlyArray<AnchorSpec> = [
	IconsStyleSheetAnchor,
	FileIconThemeAnchor,
];

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "RewriteIconsStyleSheetURLs",
	Match: ({ Path }) =>
		Anchors.some((Anchor) => Anchor.PathRegex.test(Path)),
	Transform({ Path, Source }) {
		const Anchor = Anchors.find((Candidate) =>
			Candidate.PathRegex.test(Path),
		);
		if (!Anchor) return { Kind: "Unchanged" };
		if (Source.includes(Anchor.Marker)) return { Kind: "Unchanged" };
		if (!Anchor.Search.test(Source)) return { Kind: "Unchanged" };

		const Next = Source.replace(
			Anchor.Search,
			`${Anchor.Marker} $1${ReplacementSuffix}$2`,
		);
		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
