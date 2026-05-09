/**
 * Step 14: Replace the electron-browser + browser `extensionsScannerService.js`
 * with an IPC-backed override that fetches the scanned extensions from
 * Mountain via `MountainIPCInvoke("extensions:scan*")`.
 *
 * The browser-side scanner expects a filesystem it doesn't have - Tauri's
 * webview is sandboxed and the `builtinExtensionsPath` resolves to a
 * fictional `/extensions` URI. Mountain already scans the bundled extension
 * tree on boot; the canonical replacement (authored as a real TS module at
 * `Element/Output/Source/Service/CELExtensionsScannerService.ts` and dropped
 * by `ApplyPipeline.ts` at `vs/workbench/services/extensions/common/
 * CELExtensionsScannerService.js`) pipes those results into the workbench
 * DI container so the `@builtin` sidebar, extension activation, and
 * `workspaceContains` checks all see the real set.
 *
 * This transform reduces both `electron-browser/extensionsScannerService.js`
 * AND `browser/extensionsScannerService.js` to one-line re-exports pointing
 * at the canonical `common/` sibling so existing call sites keep working.
 */

import type { TransformPlugin } from "../../../Type.js";

// Match BOTH the electron-browser and browser variants. Stock VS Code
// ships parallel implementations of the scanner service - the
// electron-browser one is loaded by `desktop.main.js`, the browser
// one by `web.main.js`. Both file paths sit at the same depth under
// `vs/workbench/services/extensions/<variant>/` so the same relative
// path back up to `common/` works for both.
const PathRegex =
	/workbench\/services\/extensions\/(?:electron-browser|browser)\/extensionsScannerService\.js$/;

const ReExport =
	"export { ExtensionsScannerService, IExtensionsScannerService } from '../common/CELExtensionsScannerService.js';\n";

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "ExtensionScannerIPC",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};

export default Plugin;
