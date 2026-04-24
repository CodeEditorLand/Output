/**
 * Plugin/Index - single entry point for consumers.
 *
 * Re-exports every plugin and the types / runner needed to invoke them.
 * Copy plugins are factories (they take paths from the consumer) and
 * transform plugins are data objects (no wiring needed). The `Build()`
 * factory assembles the default ordered pipeline Sky uses in
 * `astro:build:done`.
 *
 * Ordering rule for the pipeline:
 *   1. CopyVSOutput             (Step 1)
 *   2. CopyVSRootFiles          (Step 1b)
 *   3. SupplementFromDependency (Step 2)
 *   4. CopyWorker               (Step 3)
 *   5. CopyNodeModules          (Step 11)
 *   6. StubUnpublishedAddons    (Step 12)
 *   -- transforms run after every copy settles --
 *   7. StripCSSImport           (Step 4)
 *   8. InjectNameShim           (Step 6)
 *   9. ReplaceElectronIPCService(Step 7)
 *  10. ReplaceSharedProcess     (Step 7b)
 *  11. StaticToDynamicImport    (Step 10)
 *  12. StripDanglingSourceMap   (Step 11b)
 *  13. ExtensionScannerIPC      (Step 14)
 *  14. CatchOutputFolderRejection (Step 15)
 *  15. StripWebviewIframeSandbox (Step 16 - WKWebView custom-protocol fix)
 *  16. ExposeWorkbenchAccessor (Step 17 - globalThis.__CEL_SERVICES__ +
 *      __CEL_WORKBENCH__ + __CEL_INSTANTIATION_SERVICE__ + the
 *      `cel:workbench-ready` DOM event consumed by SkyBridge)
 *
 * CopyNodeModules → StripDanglingSourceMap is a logically-paired duo
 * (copy freshly shipped JS; strip any now-dangling sourcemap comments),
 * but **the pair is expressed via role-scoped transforms, not
 * `CopyPlugin.AfterCopy`**. StripDanglingSourceMap's `Match` is scoped
 * to `Role === "app"` and CopyNodeModules writes into the app root, so
 * the transform pass naturally covers every file the copy emits. The
 * `AfterCopy` hook on `CopyPlugin` is intentionally unused here -
 * leaving it plumbed means a future sibling (e.g. a copy that produces
 * files outside the app root and still needs strip) can opt in without
 * a runner change.
 */

export * from "./Type.js";
export { default as ApplyPlugins } from "./Apply.js";
export type { ApplyInput, ApplyOutcome } from "./Apply.js";

export { default as StripCSSImport } from "./Transform/StripCSSImport.js";
export { default as InjectNameShim } from "./Transform/InjectNameShim.js";
export { default as ReplaceElectronIPCService } from "./Transform/ReplaceElectronIPCService.js";
export { default as ReplaceSharedProcess } from "./Transform/ReplaceSharedProcess.js";
export { default as StaticToDynamicImport } from "./Transform/StaticToDynamicImport.js";
export { default as StripDanglingSourceMap } from "./Transform/StripDanglingSourceMap.js";
export { default as ExtensionScannerIPC } from "./Transform/ExtensionScannerIPC.js";
export { default as CatchOutputFolderRejection } from "./Transform/CatchOutputFolderRejection.js";
export { default as StripWebviewIframeSandbox } from "./Transform/StripWebviewIframeSandbox.js";
export { default as ExposeWorkbenchAccessor } from "./Transform/ExposeWorkbenchAccessor.js";
export { default as DisableUnusedServices } from "./Transform/DisableUnusedServices.js";

export {
	CopyVSOutput,
	default as CopyVSOutputDefault,
} from "./Copy/CopyVSOutput.js";
export type { CopyVSOutputInput } from "./Copy/CopyVSOutput.js";
export {
	CopyVSRootFiles,
	default as CopyVSRootFilesDefault,
} from "./Copy/CopyVSRootFiles.js";
export type { CopyVSRootFilesInput } from "./Copy/CopyVSRootFiles.js";
export {
	SupplementFromDependency,
	default as SupplementFromDependencyDefault,
} from "./Copy/SupplementFromDependency.js";
export type { SupplementFromDependencyInput } from "./Copy/SupplementFromDependency.js";
export {
	CopyWorker,
	default as CopyWorkerDefault,
} from "./Copy/CopyWorker.js";
export type { CopyWorkerInput } from "./Copy/CopyWorker.js";
export {
	CopyNodeModules,
	DefaultPackages as DefaultNodeModulePackages,
	default as CopyNodeModulesDefault,
} from "./Copy/CopyNodeModules.js";
export type { CopyNodeModulesInput } from "./Copy/CopyNodeModules.js";
export {
	StubUnpublishedAddons,
	DefaultStubs,
	StubDataPrefix,
	default as StubUnpublishedAddonsDefault,
} from "./Copy/StubUnpublishedAddons.js";
export type { StubUnpublishedAddonsInput } from "./Copy/StubUnpublishedAddons.js";
export {
	CopyTauriMainProcessService,
	default as CopyTauriMainProcessServiceDefault,
} from "./Copy/CopyTauriMainProcessService.js";
export type { CopyTauriMainProcessServiceInput } from "./Copy/CopyTauriMainProcessService.js";

import type { Plugin } from "./Type.js";

import StripCSSImport from "./Transform/StripCSSImport.js";
import InjectNameShim from "./Transform/InjectNameShim.js";
import ReplaceElectronIPCService from "./Transform/ReplaceElectronIPCService.js";
import ReplaceSharedProcess from "./Transform/ReplaceSharedProcess.js";
import StaticToDynamicImport from "./Transform/StaticToDynamicImport.js";
import StripDanglingSourceMap from "./Transform/StripDanglingSourceMap.js";
import ExtensionScannerIPC from "./Transform/ExtensionScannerIPC.js";
import CatchOutputFolderRejection from "./Transform/CatchOutputFolderRejection.js";
import StripWebviewIframeSandbox from "./Transform/StripWebviewIframeSandbox.js";
import ExposeWorkbenchAccessor from "./Transform/ExposeWorkbenchAccessor.js";
import DisableUnusedServices from "./Transform/DisableUnusedServices.js";

import {
	CopyVSOutput as CopyVSOutputFactory,
	type CopyVSOutputInput,
} from "./Copy/CopyVSOutput.js";
import {
	CopyVSRootFiles as CopyVSRootFilesFactory,
	type CopyVSRootFilesInput,
} from "./Copy/CopyVSRootFiles.js";
import {
	SupplementFromDependency as SupplementFromDependencyFactory,
	type SupplementFromDependencyInput,
} from "./Copy/SupplementFromDependency.js";
import {
	CopyWorker as CopyWorkerFactory,
	type CopyWorkerInput,
} from "./Copy/CopyWorker.js";
import {
	CopyNodeModules as CopyNodeModulesFactory,
	type CopyNodeModulesInput,
} from "./Copy/CopyNodeModules.js";
import {
	StubUnpublishedAddons as StubUnpublishedAddonsFactory,
	type StubUnpublishedAddonsInput,
} from "./Copy/StubUnpublishedAddons.js";
import {
	CopyTauriMainProcessService as CopyTauriMainProcessServiceFactory,
	type CopyTauriMainProcessServiceInput,
} from "./Copy/CopyTauriMainProcessService.js";

export interface BuildPipelineInput {
	readonly VSOutput: CopyVSOutputInput;
	readonly VSRootFiles: CopyVSRootFilesInput;
	readonly Supplement: SupplementFromDependencyInput;
	readonly Worker: CopyWorkerInput;
	readonly NodeModules: CopyNodeModulesInput;
	readonly Addons: StubUnpublishedAddonsInput;
	readonly TauriMainProcessService: CopyTauriMainProcessServiceInput;
}

/**
 * Compose the full default pipeline in the canonical order. Consumers can
 * still hand-assemble their own arrays if they want to skip / reorder.
 */
export const BuildPipeline = (Input: BuildPipelineInput): Array<Plugin> => [
	CopyVSOutputFactory(Input.VSOutput),
	CopyVSRootFilesFactory(Input.VSRootFiles),
	SupplementFromDependencyFactory(Input.Supplement),
	CopyWorkerFactory(Input.Worker),
	CopyNodeModulesFactory(Input.NodeModules),
	StubUnpublishedAddonsFactory(Input.Addons),
	CopyTauriMainProcessServiceFactory(Input.TauriMainProcessService),
	StripCSSImport,
	InjectNameShim,
	ReplaceElectronIPCService,
	ReplaceSharedProcess,
	StaticToDynamicImport,
	StripDanglingSourceMap,
	ExtensionScannerIPC,
	CatchOutputFolderRejection,
	StripWebviewIframeSandbox,
	// Expose the IWorkbench facade + IInstantiationService on
	// `globalThis` as `__CEL_WORKBENCH__` / `__CEL_INSTANTIATION_SERVICE__`
	// / `__CEL_SERVICES__` so Sky's bridge code (SkyBridge,
	// tree-view attachment, command forwarding, status-bar sync) can
	// call into the live workbench without re-implementing a parallel
	// UI. Without this patch, every tree view an extension registers
	// surfaces as `attach-give-up (no workbench tree descriptor)` on
	// the renderer and the entire Sky→workbench integration is dead.
	ExposeWorkbenchAccessor,
	// Replace upstream contribution barrels for features Land
	// intentionally does not back (auto-update, issue reporter, MS
	// account / settings sync, welcome walkthrough, process explorer,
	// experiments) with an empty default export. Removes broken UI,
	// silences the "service not registered" warnings, and shortens
	// boot. List lives in the transform itself.
	DisableUnusedServices,
];

export default BuildPipeline;
