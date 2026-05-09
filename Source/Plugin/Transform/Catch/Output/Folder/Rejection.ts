/**
 * Step 15: Catch the unhandled rejection from `outputServices`
 * `createFolder`.
 *
 * `vs/workbench/contrib/output/browser/outputServices.ts::instantiateChannel`
 * writes, in the upstream VS Code build:
 *
 * ```js
 * this.outputFolderCreationPromise = this.fileService.createFolder(
 *     this.outputLocation,
 * ).then(() => undefined);
 * ```
 *
 * `createFolder` internally calls `stat(outputLocation)` to decide whether
 * to mkdir. In Land the VFS-IPC stat rejects with a wrapped `FileNotFound`
 * before the fileService gets to swallow it, so the rejection propagates
 * past this `.then()` (which has no `.catch()`) and surfaces as an
 * `unhandledrejection` in the webview - flagged by PostHog as
 * `Failed to stat file: No such file or directory (os error 2) (path:
 * …/window1/output_<TIMESTAMP>)`.
 *
 * The output folder is lazily created on first channel write anyway, so
 * swallowing this particular rejection has no functional impact: on the
 * happy path the folder is created by mkdir, on the unhappy path the
 * later write creates it. Only the telemetry noise disappears.
 *
 * We cannot edit VS Code source (see the `feedback_no_vscode_source_edits`
 * memory), so the fix is a post-copy string-rewrite against the compiled
 * `outputServices.js` under `Static/Application/vs/workbench/contrib/output/
 * browser/`.
 *
 * The regex is pinned to the EXACT `.then(() => undefined)` shape that the
 * VS Code build emits today; if the upstream builds shifts (e.g.,
 * `.then(_ => undefined)` or `.then(() => {})` with a body), `Match()`
 * will return `{ Kind: "Unchanged" }` and a LOG line will surface in the
 * Output build step - use that as a regression tripwire.
 */

import type { TransformPlugin } from "../../../../Type.js";

const PathRegex = /\/workbench\/contrib\/output\/browser\/outputServices\.js$/;

// Capture the `createFolder(<target>).then(() => undefined)` chain so we can
// append a `.catch(() => undefined)` after it. The target expression is
// non-greedy to avoid spilling into whatever statement follows. The full
// match must end with `)` so we know we've consumed the `.then(...)` call.
//
// Note: esbuild / the Rest bundler minifies `() => undefined` into
// `() => void 0`, so the arrow body must accept either form. A trailing
// `.catch(() => void 0)` works identically (returns undefined), so the
// appended catch also uses `void 0` for symmetry with the surrounding code.
const ChainRegex =
	/(createFolder\([^)]*\)\.then\(\(\)\s*=>\s*(?:undefined|void\s+0)\))/g;

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "CatchOutputFolderRejection",

	Match: ({ Path, Role }) => Role === "app" && PathRegex.test(Path),

	Transform({ Source }) {

		ChainRegex.lastIndex = 0;

		if (!ChainRegex.test(Source)) {

			return { Kind: "Unchanged" };
		}

		ChainRegex.lastIndex = 0;

		return {

			Kind: "Rewrite",

			Source: Source.replace(
				ChainRegex,

				(_Match, Chain) => `${Chain}.catch(() => void 0)`,
			),
		};
	},
};

export default Plugin;
