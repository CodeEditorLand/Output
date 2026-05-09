import { Emitter as g } from "../../base/common/event.js";
import {
	Disposable as E,
	toDisposable as w,
} from "../../base/common/lifecycle.js";
import { ResourceTree as y } from "../../base/common/resourceTree.js";
import { URI as h } from "../../base/common/uri.js";
import { ILanguageService as a } from "../../editor/common/languages/language.js";
import { IModelService as u } from "../../editor/common/services/model.js";
import { IClipboardService as v } from "../../platform/clipboard/common/clipboardService.js";
import {
	CommandsRegistry as C,
	ICommandService as n,
} from "../../platform/commands/common/commands.js";
import { IConfigurationService as b } from "../../platform/configuration/common/configuration.js";
import { IContextKeyService as V } from "../../platform/contextkey/common/contextkey.js";
import {
	IFileDialogService as I,
	IDialogService as T,
} from "../../platform/dialogs/common/dialogs.js";
import { IFileService as R } from "../../platform/files/common/files.js";
import { IKeybindingService as W } from "../../platform/keybinding/common/keybinding.js";
import { IMarkerService as D } from "../../platform/markers/common/markers.js";
import { INotificationService as S } from "../../platform/notification/common/notification.js";
import { IProductService as L } from "../../platform/product/common/productService.js";
import { IProgressService as P } from "../../platform/progress/common/progress.js";
import { Registry as p } from "../../platform/registry/common/platform.js";
import { IStorageService as k } from "../../platform/storage/common/storage.js";
import { IThemeService as O } from "../../platform/theme/common/themeService.js";
import { IUriIdentityService as A } from "../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService as x } from "../../platform/workspace/common/workspace.js";
import { IViewDescriptorService as B } from "../common/views.js";
import { ICustomEditorService as N } from "../contrib/customEditor/common/customEditor.js";
import { IDebugService as F } from "../contrib/debug/common/debug.js";
import { ISCMService as H } from "../contrib/scm/common/scm.js";
import { IWebviewWorkbenchService as K } from "../contrib/webviewPanel/browser/webviewWorkbenchService.js";
import { IWebviewViewService as M } from "../contrib/webviewView/browser/webviewViewService.js";
import { IActivityService as U } from "../services/activity/common/activity.js";
import { IEditorGroupsService as $ } from "../services/editor/common/editorGroupsService.js";
import { IEditorService as G } from "../services/editor/common/editorService.js";
import { IExtensionService as f } from "../services/extensions/common/extensions.js";
import { IHostService as Y } from "../services/host/browser/host.js";
import { IWorkbenchLayoutService as j } from "../services/layout/browser/layoutService.js";
import { ILifecycleService as q } from "../services/lifecycle/common/lifecycle.js";
import { IPaneCompositePartService as z } from "../services/panecomposite/browser/panecomposite.js";
import { ISearchService as J } from "../services/search/common/search.js";
import { IStatusbarService as Q } from "../services/statusbar/browser/statusbar.js";
import { ITextFileService as X } from "../services/textfile/common/textfiles.js";
import { IWorkbenchThemeService as Z } from "../services/themes/common/workbenchThemeService.js";
import { ITitleService as rr } from "../services/title/browser/titleService.js";
import { IViewsService as er } from "../services/views/common/viewsService.js";

const _ = "workbench.registry.view",
	or = "workbench.registry.view.containers",
	e = (r, o) => {
		try {
			return r.invokeFunction((i) => i.get(o));
		} catch {
			return null;
		}
	},
	c = (r, o) => {
		try {
			const i = globalThis.__TAURI__,
				t = i?.core?.invoke ?? i?.invoke;

			if (typeof t != "function") return;

			t("MountainIPCInvoke", {
				method: "diagnostic:log",
				params: [r, o],
			});
		} catch {}
	},
	ir = () => {
		try {
			const r = p.as(or),
				o = p.as(_),
				i = r?.all ?? [],
				t = i.map((s) => String(s?.id ?? "<no-id>")),
				m = [];

			try {
				for (const s of i) {
					const l = o?.getViews?.(s) ?? [];

					for (const d of l) m.push(String(d?.id ?? "<no-id>"));
				}
			} catch {}

			return {
				containers: t.length,

				views: m.length,

				containerSample: t,

				viewSample: m,
			};
		} catch (r) {
			return {
				containers: -1,

				views: -1,

				error: String(r?.message ?? r),
			};
		}
	},
	Yr = (r) => {
		globalThis.__CEL_INSTANTIATION_SERVICE__ = r;

		try {
			globalThis.__CEL_SERVICES__ = {
				Statusbar: e(r, Q),

				Commands: e(r, n),

				CommandRegistry: C,

				Search: e(r, J),

				Views: e(r, er),

				URI: h,

				TreeViewByViewId: (o) => {
					try {
						return p.as(_)?.getView?.(o)?.treeView ?? null;
					} catch {
						return null;
					}
				},

				ViewRegistrySnapshot: ir,

				SCM: e(r, H),

				Debug: e(r, F),

				CustomEditor: e(r, N),

				Emitter: g,

				Disposable: E,

				ToDisposable: w,

				Models: e(r, u),

				Languages: e(r, a),

				ResourceTree: y,

				UriIdentity: e(r, A),

				WebviewViews: e(r, M),

				WebviewPanels: e(r, K),

				Markers: e(r, D),

				Configuration: e(r, b),

				Storage: e(r, k),

				Lifecycle: e(r, q),

				Theme: e(r, O),

				WorkbenchTheme: e(r, Z),

				Keybinding: e(r, W),

				Notification: e(r, S),

				File: e(r, R),

				Dialog: e(r, T),

				FileDialog: e(r, I),

				Clipboard: e(r, v),

				ContextKey: e(r, V),

				Host: e(r, Y),

				Extension: e(r, f),

				Workspace: e(r, x),

				Product: e(r, L),

				Progress: e(r, P),

				Editor: e(r, G),

				EditorGroups: e(r, $),

				TextFile: e(r, X),

				Activity: e(r, U),

				Title: e(r, rr),

				PaneComposite: e(r, z),

				ViewDescriptor: e(r, B),

				Layout: e(r, j),
			};

			try {
				const o = e(r, f);

				if (
					o &&
					typeof o.activateByEvent == "function" &&
					!o.__CEL_PATCHED_ONVIEW__
				) {
					const i = o.activateByEvent.bind(o);

					((o.activateByEvent = function (t) {
						return typeof t == "string" &&
							t.indexOf("onView:") === 0
							? Promise.resolve()
							: i(t);
					}),
						(o.__CEL_PATCHED_ONVIEW__ = !0),
						c(
							"cel-services",

							"activateByEvent onView:* short-circuit installed",
						));
				}
			} catch (o) {
				c(
					"cel-services",

					`activateByEvent patch failed: ${String(o?.message ?? o)}`,
				);
			}

			try {
				if (typeof window < "u" && window.addEventListener) {
					const o = globalThis;

					(o.__CEL_WEBVIEW_PORT_MAP__ ||
						(o.__CEL_WEBVIEW_PORT_MAP__ = new Map()),
						o.__CEL_WEBVIEW_READY_HOOKED__ ||
							((o.__CEL_WEBVIEW_READY_HOOKED__ = !0),
							window.addEventListener(
								"message",

								(i) => {
									try {
										const t = i?.data;
										t &&
											t.channel === "webview-ready" &&
											typeof t.target == "string" &&
											i.ports &&
											i.ports.length > 0 &&
											(o.__CEL_WEBVIEW_PORT_MAP__.set(
												t.target,

												i.ports[0],
											),
											c(
												"webview-port",

												`captured webview-ready target=${t.target} origin=${i.origin}`,
											));
									} catch {}
								},

								!0,
							)));
				}
			} catch (o) {
				c("webview-port", `hook failed: ${String(o?.message ?? o)}`);
			}

			try {
				window.dispatchEvent(new Event("cel:services-ready"));
			} catch {}

			c("cel-services", "ready (sync via static import)");
		} catch (o) {
			c("cel-services", `resolve-failed: ${String(o?.message ?? o)}`);
		}
	},
	jr = (r) => {
		globalThis.__CEL_WORKBENCH__ = r;

		try {
			window.dispatchEvent(new Event("cel:workbench-ready"));
		} catch {}
	};

export { Yr as ExposeAccessor, jr as OnWorkbenchReady };
