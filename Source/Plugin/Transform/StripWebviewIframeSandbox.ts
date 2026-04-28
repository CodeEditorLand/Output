/**
 * Strip the `sandbox` attribute from VS Code's webview iframe on
 * WKWebView (Tauri on macOS). WebKit enforces a strict security rule:
 * sandboxed iframes can never perform a main-resource load over a
 * custom protocol (`vscode-webview://`, `land://`, etc.), even with
 * `allow-same-origin` set. This fires as:
 *
 *     [Error] Ignoring request to load this main resource because it
 *     has a custom protocol and comes from a sandboxed iframe (x12)
 *
 * every time an extension (claude-code, roo-cline, gitlens, getting-
 * started) opens a webview panel. Electron whitelists custom protocols
 * and therefore this block never hit upstream VS Code; WKWebView does
 * not, so Land sees it on every launch.
 *
 * Land runs as a single-user desktop editor - the threat model that
 * motivates the upstream sandbox (untrusted extension HTML in a browser
 * tab that also holds the workbench) does not apply. Dropping the
 * `setAttribute('sandbox', ...)` line lets WKWebView serve the
 * webview's pre/index.html normally.
 *
 * Patches `Dependency/.../src/vs/workbench/contrib/webview/browser/pre/index.html`
 * which the Rest bundler copies verbatim into
 * `Output/Target/Microsoft/VSCode/vs/workbench/contrib/webview/browser/pre/index.html`.
 */

import type { TransformPlugin } from "../Type.js";

const PathRegex = /\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;

// The upstream line (index.html:1054):
//   newFrame.setAttribute('sandbox', Array.from(sandboxRules).join(' '));
// Replace the value argument with a no-op string so the attribute has
// no effect - `sandbox=""` would be MORE restrictive, so drop the call
// entirely via a comment. Preserve line numbering for sourcemap debug.
const SandboxSetCall =
	/newFrame\.setAttribute\(\s*['"]sandbox['"]\s*,\s*Array\.from\(sandboxRules\)\.join\(\s*['"] ['"]\s*\)\s*\);/;

const SandboxReplacement = `/* Land: sandbox attribute stripped - WKWebView blocks custom-protocol main-resource loads from sandboxed iframes. */`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "StripWebviewIframeSandbox",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		if (!SandboxSetCall.test(Source)) {
			return { Kind: "Unchanged" };
		}
		const Next = Source.replace(SandboxSetCall, SandboxReplacement);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
