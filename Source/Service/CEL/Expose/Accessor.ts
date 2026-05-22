// @ts-nocheck
/**
 * @module CELExposeAccessor
 *
 * Sky-bridge accessor for the live workbench `IInstantiationService` and a
 * directly-callable services facade. Authored as a real TypeScript module that
 * Output's esbuild step compiles to `Configuration/Service/CELExposeAccessor.js`
 * and `ApplyPipeline.ts` then drops in-place at
 * `Target/Microsoft/VSCode/vs/workbench/browser/CELExposeAccessor.js` (sibling
 * of `web.main.js` / `web.factory.js`; the electron-browser
 * `desktop.main.js` reaches it via `../browser/CELExposeAccessor.js`).
 *
 * The companion transform (`Plugin/Transform/ExposeWorkbenchAccessor.ts`)
 * injects two narrow patches:
 *
 *   1. `vs/workbench/browser/web.main.js`              (and its
 *      `vs/workbench/electron-browser/desktop.main.js` twin) - an
 *      `import { ExposeAccessor }` line at the top of file plus
 *      `ExposeAccessor(instantiationService)` immediately after
 *      `const instantiationService = workbench.startup();` so Sky's
 *      bridges can synchronously reach any workbench service.
 *
 *   2. `vs/workbench/browser/web.factory.js` - an `import { OnWorkbenchReady }`
 *      line plus `OnWorkbenchReady(workbench)` after
 *      `workbenchPromise.complete(workbench);` so Astro components can wait on
 *      a single `cel:workbench-ready` DOM event.
 *
 * Why a sibling module and not inline string injection:
 *   • Authoring the shim as a real `.ts` file gives us tsc/esbuild source maps,
 *     IDE assistance, and a single place to evolve the surface.
 *   • `bundle: false` in `Source/ESBuild.ts` means esbuild emits the import
 *     specifiers verbatim; the relative paths below are written as if this
 *     file already lives at depth 3 under `vs/` (which it does, post-copy),
 *     so `'../services/statusbar/browser/statusbar.js'` resolves at runtime
 *     in every consumer (`web.main.js`, `desktop.main.js`, `web.factory.js`).
 *   • Idempotent re-runs: the transform short-circuits when its marker is
 *     already in place, and re-copying the same compiled `.js` is a no-op.
 *
 * `// @ts-nocheck` is required because the relative imports below resolve at
 * the FINAL on-disk location (inside the bundled VS Code tree), not at this
 * file's source location. esbuild with `bundle: false` emits them unchanged.
 */

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

const ViewsRegistryId = "workbench.registry.view";

const ViewContainersRegistryId = "workbench.registry.view.containers";

const Resolve = (Service, Decorator) => {
	try {
		return Service.invokeFunction((Accessor) => Accessor.get(Decorator));
	} catch {
		return null;
	}
};

const Diagnostic = (Tag, Message) => {
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
	} catch {
		/* renderer may have torn down; never throw out of a diagnostic */
	}
};

const SnapshotViewRegistry = () => {
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
		} catch {
			/* swallow per-container failure - sample what we have */
		}

		return {
			containers: ContainerIds.length,

			views: ViewIds.length,

			containerSample: ContainerIds,

			viewSample: ViewIds,
		};
	} catch (Error) {
		return {
			containers: -1,

			views: -1,

			error: String(Error?.message ?? Error),
		};
	}
};

/**
 * Patch site #1: invoked from `BrowserMain.open()` (and its desktop twin)
 * immediately after `const instantiationService = workbench.startup();`.
 *
 * Stashes the live `IInstantiationService` plus a flat `__CEL_SERVICES__`
 * facade so Sky's bridges can resolve any workbench service synchronously
 * without re-implementing a parallel UI surface.
 */
export const ExposeAccessor = (InstantiationService) => {
	globalThis.__CEL_INSTANTIATION_SERVICE__ = InstantiationService;

	try {
		globalThis.__CEL_SERVICES__ = {
			Statusbar: Resolve(InstantiationService, IStatusbarService),

			Commands: Resolve(InstantiationService, ICommandService),

			CommandRegistry: CommandsRegistry,

			Search: Resolve(InstantiationService, ISearchService),

			Views: Resolve(InstantiationService, IViewsService),

			URI: URI,

			TreeViewByViewId: (ViewId) => {
				try {
					const Reg = Registry.as(ViewsRegistryId);

					const Descriptor = Reg?.getView?.(ViewId);

					return Descriptor?.treeView ?? null;
				} catch {
					return null;
				}
			},

			ViewRegistrySnapshot: SnapshotViewRegistry,

			SCM: Resolve(InstantiationService, ISCMService),

			Debug: Resolve(InstantiationService, IDebugService),

			CustomEditor: Resolve(InstantiationService, ICustomEditorService),

			Emitter: Emitter,

			Disposable: Disposable,

			ToDisposable: toDisposable,

			Models: Resolve(InstantiationService, IModelService),

			Languages: Resolve(InstantiationService, ILanguageService),

			ResourceTree: ResourceTree,

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

		// Defensive monkey-patch: short-circuit `IExtensionService.activateByEvent`
		// for `onView:<viewId>` events. WebviewViewPane.activate() awaits
		// `await this.extensionService.activateByEvent("onView:" + this.id)`
		// BEFORE it calls `webviewViewService.resolve(...)`; under Land the
		// `*` activation already runs every extension at boot, so per-view
		// events are redundant - and Cocoon's RequestRoutingHandler doesn't
		// short-circuit them, so the workbench's standard codepath can hang
		// the pane forever waiting on a Cocoon round-trip that never settles.
		// Returning a resolved promise immediately is safe because Land does
		// NOT rely on per-event activation: every contribution that could
		// match `onView:X` was already pulled in by the `*` activation pass.
		// Without this patch, every extension sidebar stalls at the bare
		// `pre/index.html` chrome because resolve() never runs.
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

				ExtensionSvc.activateByEvent = function (Event) {
					if (
						typeof Event === "string" &&
						Event.indexOf("onView:") === 0
					) {
						return Promise.resolve();
					}

					return Original(Event);
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

		// Window-level webview-ready interceptor. The workbench's
		// `WebviewElement._registerMessageHandler` listens for
		// `e.data.channel === "webview-ready"` and captures `e.ports[0]`
		// as the iframe's MessagePort. Under WKWebView the port-transfer
		// can occasionally drop, leaving `_messagePort` undefined and
		// every `setHtml(html)` call enqueued forever. Mirror the iframe
		// ID -> port association in a globalThis side-map keyed by the
		// `target` field (which is the workbench-supplied iframe ID) so
		// SkyBridge or any future recovery path can replay content via a
		// stored port if the official handler missed it.
		try {
			if (typeof window !== "undefined" && window.addEventListener) {
				const Land = globalThis;

				if (!Land.__CEL_WEBVIEW_PORT_MAP__) {
					Land.__CEL_WEBVIEW_PORT_MAP__ = new Map();
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
							} catch {
								/* swallow - never throw out of a message
								   listener; the workbench has its own
								   listener that handles the same event */
							}
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
		} catch {
			/* renderer may not have a window in headless tests */
		}

		Diagnostic("cel-services", "ready (sync via static import)");
	} catch (Error) {
		Diagnostic(
			"cel-services",

			`resolve-failed: ${String(Error?.message ?? Error)}`,
		);
	}
};

/**
 * Patch site #2: invoked from `web.factory.js`'s `create().then(...)` callback
 * right after `workbenchPromise.complete(workbench);`. Stashes the IWorkbench
 * facade and signals readiness so Sky-side listeners that were waiting on
 * the workbench being fully attached to the DOM can fire synchronously.
 */
export const OnWorkbenchReady = (Workbench) => {
	globalThis.__CEL_WORKBENCH__ = Workbench;

	try {
		window.dispatchEvent(new Event("cel:workbench-ready"));
	} catch {
		/* renderer may not have a window in headless tests */
	}
};
