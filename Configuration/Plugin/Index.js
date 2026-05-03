import { CopyNodeModules as o } from "./Copy/CopyNodeModules.js";
import { CopyTauriMainProcessService as r } from "./Copy/CopyTauriMainProcessService.js";
import { CopyVSOutput as t } from "./Copy/CopyVSOutput.js";
import { CopyVSRootFiles as a } from "./Copy/CopyVSRootFiles.js";
import { CopyWorker as p } from "./Copy/CopyWorker.js";
import { StubUnpublishedAddons as i } from "./Copy/StubUnpublishedAddons.js";
import { SupplementFromDependency as n } from "./Copy/SupplementFromDependency.js";
import m from "./Transform/CatchOutputFolderRejection.js";
import s from "./Transform/DisableUnusedServices.js";
import f from "./Transform/ExposeWorkbenchAccessor.js";
import u from "./Transform/ExtensionScannerIPC.js";
import F from "./Transform/ForceTextAreaInput.js";
import k from "./Transform/InjectConfigurationOverlay.js";
import d from "./Transform/InjectDisableLazyPaint.js";
import S from "./Transform/InjectEagerExtensionActivation.js";
import y from "./Transform/InjectEagerIdleValue.js";
import x from "./Transform/InjectEagerLifecyclePhase.js";
import O from "./Transform/InjectEditorGPULayerCSS.js";
import R from "./Transform/InjectMacTitlebarOffsetCSS.js";
import c from "./Transform/InjectNameShim.js";
import j from "./Transform/InjectPartZIndexCSS.js";
import W from "./Transform/InjectStorageOverlay.js";
import C from "./Transform/InjectStripBackgroundPolling.js";
import I from "./Transform/InjectTelemetryConsentOff.js";
import U from "./Transform/InjectTerminalGPULayerCSS.js";
import P from "./Transform/InjectWebViewPolyfills.js";
import b from "./Transform/InjectWorkbenchInteractivityCSS.js";
import h from "./Transform/InjectWorkbenchPaintPrime.js";
import v from "./Transform/InjectWorkerBootstrapShim.js";
import A from "./Transform/InlineCSSImport.js";
import w from "./Transform/InstrumentVscodeGit.js";
import E from "./Transform/PatchLocalTerminalBackend.js";
import D from "./Transform/RewriteIconsStyleSheetURLs.js";
import T from "./Transform/RewriteNestedWorkerBootstrap.js";
import g from "./Transform/RewriteNodeModulesPath.js";
import V from "./Transform/RewritePerfBaselineWorker.js";
import M from "./Transform/RewriteWebviewShellCSP.js";

import "./Transform/PatchTerminalGpuAcceleration.js";

import L from "./Transform/ReplaceElectronIPCService.js";
import N from "./Transform/ReplaceExtensionGalleryService.js";
import B from "./Transform/ReplaceSearchService.js";
import G from "./Transform/ReplaceSharedProcess.js";
import z from "./Transform/ReplaceTelemetryService.js";
import H from "./Transform/ReplaceUpdateService.js";

import "./Transform/HoistFunctionDeclarations.js";
import "./Transform/RewriteStaticBlockSelfRef.js";

import { default as po } from "./Apply.js";
import {
	default as at,
	CopyNodeModules as rt,
	DefaultPackages as tt,
} from "./Copy/CopyNodeModules.js";
import {
	CopyTauriMainProcessService as ft,
	default as ut,
} from "./Copy/CopyTauriMainProcessService.js";
import { CopyVSOutput as Hr, default as Zr } from "./Copy/CopyVSOutput.js";
import {
	CopyVSRootFiles as Jr,
	default as Kr,
} from "./Copy/CopyVSRootFiles.js";
import { CopyWorker as $r, default as et } from "./Copy/CopyWorker.js";
import {
	StubUnpublishedAddons as it,
	StubDataPrefix as lt,
	default as mt,
	DefaultStubs as nt,
} from "./Copy/StubUnpublishedAddons.js";
import {
	SupplementFromDependency as Xr,
	default as Yr,
} from "./Copy/SupplementFromDependency.js";
import { default as hr } from "./Transform/CatchOutputFolderRejection.js";
import { default as gr } from "./Transform/DisableUnusedServices.js";
import { default as Fr } from "./Transform/ExposeWorkbenchAccessor.js";
import { default as jr } from "./Transform/ExtensionScannerIPC.js";
import { default as Go } from "./Transform/ForceTextAreaInput.js";
import { default as ir } from "./Transform/HoistFunctionDeclarations.js";
import { default as Eo } from "./Transform/InjectConfigurationOverlay.js";
import { default as co } from "./Transform/InjectDisableLazyPaint.js";
import { default as yo } from "./Transform/InjectEagerExtensionActivation.js";
import { default as Co } from "./Transform/InjectEagerIdleValue.js";
import { default as Po } from "./Transform/InjectEagerLifecyclePhase.js";
import { default as Or } from "./Transform/InjectEditorGPULayerCSS.js";
import { default as Fo } from "./Transform/InjectMacTitlebarOffsetCSS.js";
import { default as fo } from "./Transform/InjectNameShim.js";
import { default as Mo } from "./Transform/InjectPartZIndexCSS.js";
import { default as No } from "./Transform/InjectStorageOverlay.js";
import { default as jo } from "./Transform/InjectStripBackgroundPolling.js";
import { default as ho } from "./Transform/InjectTelemetryConsentOff.js";
import { default as Er } from "./Transform/InjectTerminalGPULayerCSS.js";
import { default as ko } from "./Transform/InjectWebViewPolyfills.js";
import { default as go } from "./Transform/InjectWorkbenchInteractivityCSS.js";
import { default as Ao } from "./Transform/InjectWorkbenchPaintPrime.js";
import { default as Oo } from "./Transform/InjectWorkerBootstrapShim.js";
import { default as mo } from "./Transform/InlineCSSImport.js";
import { default as Mr } from "./Transform/InstrumentVscodeGit.js";
import { default as Nr } from "./Transform/PatchLocalTerminalBackend.js";
import { default as Gr } from "./Transform/PatchTerminalGpuAcceleration.js";
import { default as lr } from "./Transform/ReplaceElectronIPCService.js";
import { default as sr } from "./Transform/ReplaceExtensionGalleryService.js";
import { default as Ar } from "./Transform/ReplaceSearchService.js";
import { default as ur } from "./Transform/ReplaceSharedProcess.js";
import { default as dr } from "./Transform/ReplaceTelemetryService.js";
import { default as yr } from "./Transform/ReplaceUpdateService.js";
import { default as Ho } from "./Transform/RewriteIconsStyleSheetURLs.js";
import { default as Ko } from "./Transform/RewriteNestedWorkerBootstrap.js";
import { default as Xo } from "./Transform/RewriteNodeModulesPath.js";
import { default as _o } from "./Transform/RewritePerfBaselineWorker.js";
import { default as ar } from "./Transform/RewriteStaticBlockSelfRef.js";
import { default as qo } from "./Transform/RewriteWebviewShellCSP.js";
import Z, { default as rr } from "./Transform/RewriteWorkbenchBaseURL.js";
import q, { default as er } from "./Transform/RewriteWorkerURLs.js";
import J, { default as Cr } from "./Transform/StaticToDynamicImport.js";
import K, { default as no } from "./Transform/StripCSSImport.js";
import Q, { default as Pr } from "./Transform/StripDanglingSourceMap.js";
import X, { default as kr } from "./Transform/StripWebviewIframeSandbox.js";

export * from "./Type.js";
const Y = (globalThis.process?.env?.Disable ?? "").toLowerCase() === "true",
	_ = (e) => {
		const l = (e.Profile ?? "").startsWith("release") ? A : K;
		return Y
			? [
					t(e.VSOutput),
					a(e.VSRootFiles),
					n(e.Supplement),
					p(e.Worker),
					o(e.NodeModules),
					i(e.Addons),
					r(e.TauriMainProcessService),
				]
			: [
					t(e.VSOutput),
					a(e.VSRootFiles),
					n(e.Supplement),
					p(e.Worker),
					o(e.NodeModules),
					i(e.Addons),
					r(e.TauriMainProcessService),
					l,
					c,
					v,
					T,
					V,
					g,
					P,
					d,
					b,
					h,
					R,
					j,
					I,
					C,
					k,
					W,
					D,
					x,
					S,
					y,
					q,
					Z,
					L,
					G,
					z,
					H,
					N,
					J,
					Q,
					u,
					m,
					X,
					M,
					F,
					f,
					w,
					s,
					B,
					E,
					U,
					O,
				];
	};
var oo = _;
export {
	po as ApplyPlugins,
	_ as BuildPipeline,
	hr as CatchOutputFolderRejection,
	rt as CopyNodeModules,
	at as CopyNodeModulesDefault,
	ft as CopyTauriMainProcessService,
	ut as CopyTauriMainProcessServiceDefault,
	Hr as CopyVSOutput,
	Zr as CopyVSOutputDefault,
	Jr as CopyVSRootFiles,
	Kr as CopyVSRootFilesDefault,
	$r as CopyWorker,
	et as CopyWorkerDefault,
	tt as DefaultNodeModulePackages,
	nt as DefaultStubs,
	gr as DisableUnusedServices,
	Fr as ExposeWorkbenchAccessor,
	jr as ExtensionScannerIPC,
	Go as ForceTextAreaInput,
	ir as HoistFunctionDeclarations,
	Eo as InjectConfigurationOverlay,
	co as InjectDisableLazyPaint,
	yo as InjectEagerExtensionActivation,
	Co as InjectEagerIdleValue,
	Po as InjectEagerLifecyclePhase,
	Or as InjectEditorGPULayerCSS,
	Fo as InjectMacTitlebarOffsetCSS,
	fo as InjectNameShim,
	Mo as InjectPartZIndexCSS,
	No as InjectStorageOverlay,
	jo as InjectStripBackgroundPolling,
	ho as InjectTelemetryConsentOff,
	Er as InjectTerminalGPULayerCSS,
	ko as InjectWebViewPolyfills,
	go as InjectWorkbenchInteractivityCSS,
	Ao as InjectWorkbenchPaintPrime,
	Oo as InjectWorkerBootstrapShim,
	mo as InlineCSSImport,
	Mr as InstrumentVscodeGit,
	Nr as PatchLocalTerminalBackend,
	Gr as PatchTerminalGpuAcceleration,
	lr as ReplaceElectronIPCService,
	sr as ReplaceExtensionGalleryService,
	Ar as ReplaceSearchService,
	ur as ReplaceSharedProcess,
	dr as ReplaceTelemetryService,
	yr as ReplaceUpdateService,
	Ho as RewriteIconsStyleSheetURLs,
	Ko as RewriteNestedWorkerBootstrap,
	Xo as RewriteNodeModulesPath,
	_o as RewritePerfBaselineWorker,
	ar as RewriteStaticBlockSelfRef,
	qo as RewriteWebviewShellCSP,
	rr as RewriteWorkbenchBaseURL,
	er as RewriteWorkerURLs,
	Cr as StaticToDynamicImport,
	no as StripCSSImport,
	Pr as StripDanglingSourceMap,
	kr as StripWebviewIframeSandbox,
	lt as StubDataPrefix,
	it as StubUnpublishedAddons,
	mt as StubUnpublishedAddonsDefault,
	Xr as SupplementFromDependency,
	Yr as SupplementFromDependencyDefault,
	oo as default,
};
