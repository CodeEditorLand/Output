import { Emitter } from "../../base/common/event.js";
import { Disposable, toDisposable } from "../../base/common/lifecycle.js";
import { ResourceTree } from "../../base/common/resourceTree.js";
import { URI } from "../../base/common/uri.js";
import { ILanguageService } from "../../editor/common/languages/language.js";
import { IModelService } from "../../editor/common/services/model.js";
import { IClipboardService } from "../../platform/clipboard/common/clipboardService.js";
import {
	CommandsRegistry,
	ICommandService,
} from "../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../platform/contextkey/common/contextkey.js";
import {
	IDialogService,
	IFileDialogService,
} from "../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../platform/files/common/files.js";
import { IKeybindingService } from "../../platform/keybinding/common/keybinding.js";
import { IMarkerService } from "../../platform/markers/common/markers.js";
import { INotificationService } from "../../platform/notification/common/notification.js";
import { IProductService } from "../../platform/product/common/productService.js";
import { IProgressService } from "../../platform/progress/common/progress.js";
import { IQuickInputService } from "../../platform/quickinput/common/quickInput.js";
import { Registry } from "../../platform/registry/common/platform.js";
import { IStorageService } from "../../platform/storage/common/storage.js";
import { IThemeService } from "../../platform/theme/common/themeService.js";
import { IUriIdentityService } from "../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../platform/workspace/common/workspace.js";
import { IViewDescriptorService } from "../common/views.js";
import { ICustomEditorService } from "../contrib/customEditor/common/customEditor.js";
import { IDebugService } from "../contrib/debug/common/debug.js";
import { ISCMService } from "../contrib/scm/common/scm.js";
import { IWebviewWorkbenchService } from "../contrib/webviewPanel/browser/webviewWorkbenchService.js";
import { IWebviewViewService } from "../contrib/webviewView/browser/webviewViewService.js";
import { IActivityService } from "../services/activity/common/activity.js";
import { IEditorGroupsService } from "../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../services/editor/common/editorService.js";
import { IExtensionService } from "../services/extensions/common/extensions.js";
import { IHostService } from "../services/host/browser/host.js";
import { IWorkbenchLayoutService } from "../services/layout/browser/layoutService.js";
import { ILifecycleService } from "../services/lifecycle/common/lifecycle.js";
import { IPaneCompositePartService } from "../services/panecomposite/browser/panecomposite.js";
import { ISearchService } from "../services/search/common/search.js";
import { IStatusbarService } from "../services/statusbar/browser/statusbar.js";
import { ITextFileService } from "../services/textfile/common/textfiles.js";
import { IWorkbenchThemeService } from "../services/themes/common/workbenchThemeService.js";
import { ITitleService } from "../services/title/browser/titleService.js";
import { IViewsService } from "../services/views/common/viewsService.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const ViewsRegistryId = "workbench.registry.view";
const ViewContainersRegistryId = "workbench.registry.view.containers";
const Resolve = /* @__PURE__ */ __name((Service, Decorator) => {
	try {
		return Service.invokeFunction((Accessor) => Accessor.get(Decorator));
	} catch {
		return null;
	}
}, "Resolve");
const Diagnostic = /* @__PURE__ */ __name((Tag, Message) => {
	try {
		const Tauri = globalThis.__TAURI__;
		const Invoke = Tauri?.core?.invoke ?? Tauri?.invoke;
		if (typeof Invoke !== "function") {
			return;
		}
		Invoke("MountainIPCInvoke", {
			method: "diagnostic:log",
			params: [Tag, Message],
		});
	} catch {}
}, "Diagnostic");
const SnapshotViewRegistry = /* @__PURE__ */ __name(() => {
	try {
		const Containers = Registry.as(ViewContainersRegistryId);
		const Views = Registry.as(ViewsRegistryId);
		const Locations = Containers?.all ?? [];
		const ContainerIds = Locations.map((Location) =>
			String(Location?.id ?? "<no-id>"),
		);
		const ViewIds = [];
		try {
			for (const Location of Locations) {
				const Children = Views?.getViews?.(Location) ?? [];
				for (const View of Children) {
					ViewIds.push(String(View?.id ?? "<no-id>"));
				}
			}
		} catch {}
		return {
			containers: ContainerIds.length,
			views: ViewIds.length,
			containerSample: ContainerIds,
			viewSample: ViewIds,
		};
	} catch (Error2) {
		return {
			containers: -1,
			views: -1,
			error: String(Error2?.message ?? Error2),
		};
	}
}, "SnapshotViewRegistry");
const ExposeAccessor = /* @__PURE__ */ __name((InstantiationService) => {
	globalThis.__CEL_INSTANTIATION_SERVICE__ = InstantiationService;
	try {
		globalThis.__CEL_SERVICES__ = {
			Statusbar: Resolve(InstantiationService, IStatusbarService),
			Commands: Resolve(InstantiationService, ICommandService),
			CommandRegistry: CommandsRegistry,
			Search: Resolve(InstantiationService, ISearchService),
			Views: Resolve(InstantiationService, IViewsService),
			URI,
			TreeViewByViewId: /* @__PURE__ */ __name((ViewId) => {
				try {
					const Reg = Registry.as(ViewsRegistryId);
					const Descriptor = Reg?.getView?.(ViewId);
					return Descriptor?.treeView ?? null;
				} catch {
					return null;
				}
			}, "TreeViewByViewId"),
			ViewRegistrySnapshot: SnapshotViewRegistry,
			SCM: Resolve(InstantiationService, ISCMService),
			Debug: Resolve(InstantiationService, IDebugService),
			CustomEditor: Resolve(InstantiationService, ICustomEditorService),
			Emitter,
			Disposable,
			ToDisposable: toDisposable,
			Models: Resolve(InstantiationService, IModelService),
			Languages: Resolve(InstantiationService, ILanguageService),
			ResourceTree,
			UriIdentity: Resolve(InstantiationService, IUriIdentityService),
			WebviewViews: Resolve(InstantiationService, IWebviewViewService),
			WebviewPanels: Resolve(
				InstantiationService,
				IWebviewWorkbenchService,
			),
			Markers: Resolve(InstantiationService, IMarkerService),
			Configuration: Resolve(InstantiationService, IConfigurationService),
			Storage: Resolve(InstantiationService, IStorageService),
			Lifecycle: Resolve(InstantiationService, ILifecycleService),
			Theme: Resolve(InstantiationService, IThemeService),
			WorkbenchTheme: Resolve(
				InstantiationService,
				IWorkbenchThemeService,
			),
			Keybinding: Resolve(InstantiationService, IKeybindingService),
			QuickInput: Resolve(InstantiationService, IQuickInputService),
			Notification: Resolve(InstantiationService, INotificationService),
			File: Resolve(InstantiationService, IFileService),
			Dialog: Resolve(InstantiationService, IDialogService),
			FileDialog: Resolve(InstantiationService, IFileDialogService),
			Clipboard: Resolve(InstantiationService, IClipboardService),
			ContextKey: Resolve(InstantiationService, IContextKeyService),
			Host: Resolve(InstantiationService, IHostService),
			Extension: Resolve(InstantiationService, IExtensionService),
			Workspace: Resolve(InstantiationService, IWorkspaceContextService),
			Product: Resolve(InstantiationService, IProductService),
			Progress: Resolve(InstantiationService, IProgressService),
			Editor: Resolve(InstantiationService, IEditorService),
			EditorGroups: Resolve(InstantiationService, IEditorGroupsService),
			TextFile: Resolve(InstantiationService, ITextFileService),
			Activity: Resolve(InstantiationService, IActivityService),
			Title: Resolve(InstantiationService, ITitleService),
			PaneComposite: Resolve(
				InstantiationService,
				IPaneCompositePartService,
			),
			ViewDescriptor: Resolve(
				InstantiationService,
				IViewDescriptorService,
			),
			Layout: Resolve(InstantiationService, IWorkbenchLayoutService),
		};
		try {
			const ExtensionSvc = Resolve(
				InstantiationService,
				IExtensionService,
			);
			if (
				ExtensionSvc &&
				typeof ExtensionSvc.activateByEvent === "function" &&
				!ExtensionSvc.__CEL_PATCHED_ONVIEW__
			) {
				const Original =
					ExtensionSvc.activateByEvent.bind(ExtensionSvc);
				ExtensionSvc.activateByEvent = function (Event2) {
					if (
						typeof Event2 === "string" &&
						Event2.indexOf("onView:") === 0
					) {
						return Promise.resolve();
					}
					return Original(Event2);
				};
				ExtensionSvc.__CEL_PATCHED_ONVIEW__ = true;
				Diagnostic(
					"cel-services",
					"activateByEvent onView:* short-circuit installed",
				);
			}
		} catch (PatchError) {
			Diagnostic(
				"cel-services",
				`activateByEvent patch failed: ${String(PatchError?.message ?? PatchError)}`,
			);
		}
		try {
			if (typeof window !== "undefined" && window.addEventListener) {
				const Land = globalThis;
				if (!Land.__CEL_WEBVIEW_PORT_MAP__) {
					Land.__CEL_WEBVIEW_PORT_MAP__ = /* @__PURE__ */ new Map();
				}
				if (!Land.__CEL_WEBVIEW_READY_HOOKED__) {
					Land.__CEL_WEBVIEW_READY_HOOKED__ = true;
					window.addEventListener(
						"message",
						(MessageEvent) => {
							try {
								const Data = MessageEvent?.data;
								if (
									Data &&
									Data.channel === "webview-ready" &&
									typeof Data.target === "string" &&
									MessageEvent.ports &&
									MessageEvent.ports.length > 0
								) {
									Land.__CEL_WEBVIEW_PORT_MAP__.set(
										Data.target,
										MessageEvent.ports[0],
									);
									Diagnostic(
										"webview-port",
										`captured webview-ready target=${Data.target} origin=${MessageEvent.origin}`,
									);
								}
							} catch {}
						},
						true,
					);
				}
			}
		} catch (PortError) {
			Diagnostic(
				"webview-port",
				`hook failed: ${String(PortError?.message ?? PortError)}`,
			);
		}
		try {
			window.dispatchEvent(new Event("cel:services-ready"));
		} catch {}
		Diagnostic("cel-services", "ready (sync via static import)");
	} catch (Error2) {
		Diagnostic(
			"cel-services",
			`resolve-failed: ${String(Error2?.message ?? Error2)}`,
		);
	}
}, "ExposeAccessor");
const OnWorkbenchReady = /* @__PURE__ */ __name((Workbench) => {
	globalThis.__CEL_WORKBENCH__ = Workbench;
	try {
		window.dispatchEvent(new Event("cel:workbench-ready"));
	} catch {}
}, "OnWorkbenchReady");
export { ExposeAccessor, OnWorkbenchReady };
//# sourceMappingURL=Accessor.js.map
