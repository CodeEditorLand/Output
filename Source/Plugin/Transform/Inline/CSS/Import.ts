/**
 * Step 4 (release): Inline CSS imports directly into the JS bundle.
 *
 * The release-tier counterpart to `StripCSSImport`. Instead of rewriting
 * `import "./foo.css"` into a runtime `_LOAD_CSS_WORKER` call (which
 * depends on the Worker SW being active and the request reaching it via
 * a same-origin HTTP fetch), this transform reads the CSS file off disk
 * at build time and embeds its contents into the JS as a `<style>` tag
 * insertion. No runtime fetch, no SW required, no scheme dependency -
 * which matters because `workbench.js` switches `_VSCODE_FILE_ROOT` to
 * `vscode-file://` after Sky's bootstrap, and SWs cannot intercept
 * custom-scheme requests.
 *
 * Falls back to the `_LOAD_CSS_WORKER` form when the CSS file isn't
 * resolvable on disk, so a partial copy doesn't break the build.
 */

import { readFile } from "node:fs/promises";

import { dirname, resolve } from "node:path";

import type { TransformPlugin } from "../../../Type.js";

const CSSImport = /import\s*(['"])([^'"]+\.css)\1\s*;?/g;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InlineCSSImport",
	Match: ({ Path, Role }) =>
		(Role === "app" || Role === "out" || Role === "out-build") &&
		/\.js$/.test(Path),
	async Transform({ Path: FilePath, Source }) {
		CSSImport.lastIndex = 0;
		if (!CSSImport.test(Source)) return { Kind: "Unchanged" };
		CSSImport.lastIndex = 0;

		const Directory = dirname(FilePath);
		const Tasks: Array<Promise<{ From: string; To: string }>> = [];

		Source.replace(CSSImport, (Match, _Quote, Specifier) => {
			Tasks.push(
				(async () => {
					const Resolved = resolve(Directory, Specifier);
					try {
						const CSS = await readFile(Resolved, "utf8");
						const Encoded = JSON.stringify(CSS);
						const Tag = JSON.stringify(Specifier);
						return {
							From: Match,
							To:
								`((c)=>{const s=document.createElement("style");` +
								`s.setAttribute("data-css",${Tag});` +
								`s.textContent=c;document.head.appendChild(s);})(${Encoded});`,
						};
					} catch {
						return {
							From: Match,
							To: `window._LOAD_CSS_WORKER?.(new URL(${JSON.stringify(
								Specifier,
							)},import.meta.url).pathname);`,
						};
					}
				})(),
			);

			return Match;
		});

		const Resolved = await Promise.all(Tasks);

		let Rewritten = Source;

		for (const { From, To } of Resolved) {

			Rewritten = Rewritten.replace(From, () => To);
		}

		return { Kind: "Rewrite", Source: Rewritten };
	},
};

export default Plugin;
