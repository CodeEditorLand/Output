/**
 * Replace VS Code's `UpdateService` body with a no-op stub.
 *
 * Same body-rewrite rationale as `ReplaceTelemetryService.ts`: static
 * `import` references inside the bundled workbench reach the
 * update-service module; we keep the file present so the imports resolve,
 * but rewrite the body to a one-line re-export pointing at a canonical
 * never-update sibling that reports `State.Idle` forever and rejects
 * every check.
 *
 * The sibling is authored at
 * `Element/Output/Source/Service/CELNullUpdateService.ts` and dropped by
 * `ApplyPipeline.ts` at `vs/platform/update/common/CELNullUpdateService.js`
 * BEFORE this transform runs.
 *
 * Land does NOT talk to `update.code.visualstudio.com`. Auto-update is
 * delivered through Air's signed-binary download path (separate codepath;
 * integrity-verified via Mountain.key.pub).
 */

import type { TransformPlugin } from "../../../Type.js";

const PathRegex =
	/vs\/platform\/update\/common\/(?:abstractUpdateService|updateService)\.js$/;

const ReExport =
	"export { UpdateService, AbstractUpdateService, UpdateService_default } from './CELNullUpdateService.js';\n" +
	"export { default } from './CELNullUpdateService.js';\n";

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "ReplaceUpdateService",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform() {

		return { Kind: "Rewrite", Source: ReExport };
	},
};

export default Plugin;
