/**
 * Step 11b: Strip dangling `//# sourceMappingURL=…` comments from copied JS
 * files whose sibling `.map` is not present.
 *
 * Without the strip, Safari fetches the missing map, gets a 404 HTML page
 * back, and surfaces
 *
 *   Source Map "…main.js.map" has SyntaxError:
 *   Unrecognized token '<'
 *
 * for every offending file on every page load. The helper used to live in
 * `Element/Sky/astro.config.ts:906` as a directory walker; re-expressed here
 * as a per-file transform so the runner walks once for all transforms.
 *
 * NOTE: this transform needs synchronous access to "does `${Path}.map`
 * exist?" which would normally be an async `stat`. The plugin keeps that
 * check inside `Transform()` - runners that can't do async stat (some future
 * Rest integration) can skip the plugin.
 */

import { stat } from "node:fs/promises";

import type { TransformPlugin } from "../../../../Type.js";

const SourceMapComment = /\n?\/\/[#@][ 	]*sourceMappingURL=[^\n]*\n?$/;

const HasSibling = async (Path: string): Promise<boolean> => {

	try {
		await stat(`${Path}.map`);

		return true;
	} catch {
		return false;
	}
};

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "StripDanglingSourceMap",

	Match: ({ Path, Role }) => Role === "app" && /\.js$/.test(Path),

	async Transform({ Path, Source }) {
		if (!SourceMapComment.test(Source)) return { Kind: "Unchanged" };

		if (await HasSibling(Path)) return { Kind: "Unchanged" };

		SourceMapComment.lastIndex = 0;

		const Next = Source.replace(SourceMapComment, "\n");

		return Next === Source
			? { Kind: "Unchanged" }

			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
