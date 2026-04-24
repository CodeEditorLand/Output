var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
export * from "./Type.js";
import { default as default2 } from "./Apply.js";
import { default as default3 } from "./Transform/StripCSSImport.js";
import { default as default4 } from "./Transform/InjectNameShim.js";
import { default as default5 } from "./Transform/ReplaceElectronIPCService.js";
import { default as default6 } from "./Transform/ReplaceSharedProcess.js";
import { default as default7 } from "./Transform/StaticToDynamicImport.js";
import { default as default8 } from "./Transform/StripDanglingSourceMap.js";
import { default as default9 } from "./Transform/ExtensionScannerIPC.js";
import { default as default10 } from "./Transform/CatchOutputFolderRejection.js";
import { default as default11 } from "./Transform/StripWebviewIframeSandbox.js";
import { default as default12 } from "./Transform/ExposeWorkbenchAccessor.js";
import {
  CopyVSOutput,
  default as default13
} from "./Copy/CopyVSOutput.js";
import {
  CopyVSRootFiles,
  default as default14
} from "./Copy/CopyVSRootFiles.js";
import {
  SupplementFromDependency,
  default as default15
} from "./Copy/SupplementFromDependency.js";
import {
  CopyWorker,
  default as default16
} from "./Copy/CopyWorker.js";
import {
  CopyNodeModules,
  DefaultPackages,
  default as default17
} from "./Copy/CopyNodeModules.js";
import {
  StubUnpublishedAddons,
  DefaultStubs,
  StubDataPrefix,
  default as default18
} from "./Copy/StubUnpublishedAddons.js";
import {
  CopyTauriMainProcessService,
  default as default19
} from "./Copy/CopyTauriMainProcessService.js";
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
import {
  CopyVSOutput as CopyVSOutputFactory
} from "./Copy/CopyVSOutput.js";
import {
  CopyVSRootFiles as CopyVSRootFilesFactory
} from "./Copy/CopyVSRootFiles.js";
import {
  SupplementFromDependency as SupplementFromDependencyFactory
} from "./Copy/SupplementFromDependency.js";
import {
  CopyWorker as CopyWorkerFactory
} from "./Copy/CopyWorker.js";
import {
  CopyNodeModules as CopyNodeModulesFactory
} from "./Copy/CopyNodeModules.js";
import {
  StubUnpublishedAddons as StubUnpublishedAddonsFactory
} from "./Copy/StubUnpublishedAddons.js";
import {
  CopyTauriMainProcessService as CopyTauriMainProcessServiceFactory
} from "./Copy/CopyTauriMainProcessService.js";
const BuildPipeline = /* @__PURE__ */ __name((Input) => [
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
  ExposeWorkbenchAccessor
], "BuildPipeline");
var Index_default = BuildPipeline;
export {
  default2 as ApplyPlugins,
  BuildPipeline,
  default10 as CatchOutputFolderRejection,
  CopyNodeModules,
  default17 as CopyNodeModulesDefault,
  CopyTauriMainProcessService,
  default19 as CopyTauriMainProcessServiceDefault,
  CopyVSOutput,
  default13 as CopyVSOutputDefault,
  CopyVSRootFiles,
  default14 as CopyVSRootFilesDefault,
  CopyWorker,
  default16 as CopyWorkerDefault,
  DefaultPackages as DefaultNodeModulePackages,
  DefaultStubs,
  default12 as ExposeWorkbenchAccessor,
  default9 as ExtensionScannerIPC,
  default4 as InjectNameShim,
  default5 as ReplaceElectronIPCService,
  default6 as ReplaceSharedProcess,
  default7 as StaticToDynamicImport,
  default3 as StripCSSImport,
  default8 as StripDanglingSourceMap,
  default11 as StripWebviewIframeSandbox,
  StubDataPrefix,
  StubUnpublishedAddons,
  default18 as StubUnpublishedAddonsDefault,
  SupplementFromDependency,
  default15 as SupplementFromDependencyDefault,
  Index_default as default
};
//# sourceMappingURL=Index.js.map
