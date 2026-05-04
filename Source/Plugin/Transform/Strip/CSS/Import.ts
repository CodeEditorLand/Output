/**
 * Step 4: Strip CSS imports from VS Code JS.
 *
 * Tauri's WKWebView has no service-worker interception path for embedded
 * assets, so `import './foo.css'` resolves to a `text/css` module and the
 * browser refuses to evaluate it. Rewrite the import as a `_LOAD_CSS_WORKER`
 * call that injects the CSS via `<link>` instead; the helper lives in the
 * Worker Element and is attached to `window` at boot.
 */

import type { TransformPlugin } from "../../../Type.js";

const CSSImport = /import\s*(['"])([^'"]+\.css)\1\s*;?/g;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "StripCSSImport",
	Match: ({ Path, Role }) =>
		// All VS Code JS in the app tier (post-copy) is fair game. Running
		// against `out` / `out-build` directly is also valid - Rest can apply
		// this transform during its compile pass.
		(Role === "app" || Role === "out" || Role === "out-build") &&
		/\.js$/.test(Path),
	Transform({ Source }) {
		CSSImport.lastIndex = 0;
		if (!CSSImport.test(Source)) return { Kind: "Unchanged" };
		CSSImport.lastIndex = 0;
		return {
			Kind: "Rewrite",
			Source: Source.replace(
				CSSImport,
				(_Match, _Quote, Path) =>
					`window._LOAD_CSS_WORKER?.(new URL("${Path}",import.meta.url).pathname);`,
			),
		};
	},
};

export default Plugin;
