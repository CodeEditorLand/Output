/**
 * Step 7b: Replace `SharedProcessService` with a TauriMainProcessService-
 * backed shim.
 *
 * The Extensions sidebar queries
 * `sharedProcessService.getChannel('extensions')` via
 * ExtensionManagementChannelClient. Land has no Electron shared process, so
 * the shipped SharedProcessService hangs on `acquirePort(…)` forever and the
 * `@builtin` sidebar stays empty even when Mountain has scanned 94
 * extensions. Routing `getChannel` through TauriMainProcessService hits the
 * same ChannelRouteMap that backs the main process so `extensions` resolves
 * to Mountain's `extensions:*` handlers directly.
 *
 * The replacement class lives in `Element/Output/Source/Service/
 * CELSharedProcessService.ts` and is dropped next to TauriMainProcessService
 * at `vs/platform/ipc/electron-browser/CELSharedProcessService.js` by
 * `ApplyPipeline.ts` BEFORE this transform runs. The original module body
 * is reduced to a one-line re-export so every call site that imported
 * `SharedProcessService` from the workbench services path keeps working.
 */

import type { TransformPlugin } from "../../../Type.js";

const Marker =
	"workbench/services/sharedProcess/electron-browser/sharedProcessService.js".replaceAll(
		"/",

		"\\/",
	);

const PathRegex = new RegExp(`${Marker}$`);

const ReExport =
	"export { SharedProcessService } from '../../../../platform/ipc/electron-browser/CELSharedProcessService.js';\n" +
	"export { default } from '../../../../platform/ipc/electron-browser/CELSharedProcessService.js';\n";

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "ReplaceSharedProcess",

	Enabled: () => process.env["Electron"] === "true",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform() {

		// Always overwrite - the upstream body is not reusable under Tauri.
		return { Kind: "Rewrite", Source: ReExport };
	},
};

export default Plugin;
