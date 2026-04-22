/**
 * Step 7: Replace `ElectronIPCMainProcessService` with a TauriMainProcess-
 * backed re-export when the Electron tier is active.
 *
 * The compiled service module from Output is copied in-place next to the VS
 * Code source, then `mainProcessService.js` is reduced to a one-line ESM
 * re-export. This avoids inlining esbuild helpers (`__defProp` / `__name`)
 * or regex-stripping imports - the compiled TauriMainProcessService already
 * carries its own helpers.
 *
 * Unlike the inline Sky version, the source file lookup (Output first, Wind
 * fallback) happens **outside** the transform. The caller (Sky's config)
 * does the lookup once, copies the service, then runs this transform.
 */

import type { TransformPlugin } from "../Type.js";

const Marker =
	"platform/ipc/electron-browser/mainProcessService.js".replaceAll(
		"/",
		"\\/",
	);
const PathRegex = new RegExp(`${Marker}$`);

const ReExport =
	"export { TauriMainProcessService as ElectronIPCMainProcessService } from './TauriMainProcessService.js';\n";

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ReplaceElectronIPCService",
	Enabled: () => process.env["Electron"] === "true",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform() {
		// Always overwrite - the upstream body is not reusable under Tauri.
		return { Kind: "Rewrite", Source: ReExport };
	},
};

export default Plugin;
