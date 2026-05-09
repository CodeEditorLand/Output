async function f(e, r = {}) {

	try {

		const n =
			window.__TAURI__?.core?.invoke ??
			window.__TAURI__?.invoke ??
			window.TAURI?.invoke;

		if (typeof n == "function")
			return e.includes(":")
				? await n("MountainIPCInvoke", { method: e, params: r })
				: await n(e, r);

		throw new Error(`Tauri invoke not available for command: ${e}`);
	} catch (n) {

		throw n;
	}
}

const a = new Map();

function i(e, r) {

	if (a.has(e)) return a.get(e);

	const n = r();

	return (a.set(e, n), n);
}

function s() {

	return {

		setZoomLevel(e) {},

		setZoomFactor(e) {},

		getZoomFactor() {

			return 1;
		},

		getZoomLevel() {

			return 0;
		},

		insertCSS(e) {

			const r = document.createElement("style");

			((r.textContent = e), document.head.appendChild(r));
		},

		insertText(e) {

			document.execCommand("insertText", !1, e);
		},
	};
}

function d() {

	return {

		getName() {

			return "CodeEditorLand";
		},

		getVersion() {

			return "0.0.1";
		},

		getLocale() {

			return navigator.language;
		},

		isReady() {

			return !0;
		},

		whenReady() {

			return Promise.resolve();
		},
	};
}

function c() {

	return {

		getDisplayNearestPoint(e) {

			return {

				id: 1,

				bounds: {

					x: 0,

					y: 0,

					width: window.screen.width,

					height: window.screen.height,
				},
			};
		},

		getPrimaryDisplay() {

			return {

				id: 1,

				bounds: {

					x: window.screen.availLeft,

					y: window.screen.availTop,

					width: window.screen.width,

					height: window.screen.height,
				},
			};
		},

		getAllDisplays() {

			return [
				{

					id: 1,

					bounds: {

						x: window.screen.availLeft,

						y: window.screen.availTop,

						width: window.screen.width,

						height: window.screen.height,
					},
				},
			];
		},
	};
}

function u() {

	return {

		async openExternal(e) {

			try {

				const r = window.__TAURI__?.shell ?? window.TAURI?.shell;

				typeof r?.open == "function"
					? await r.open(e)
					: window.open(e, "_blank");
			} catch (r) {

				throw r;
			}
		},

		async openPath(e) {

			throw new Error(
				"Shell.openPath is not supported in browser environment",
			);
		},

		async showItemInFolder(e) {

			throw new Error(
				"Shell.showItemInFolder is not supported in browser environment",
			);
		},

		async trashItem(e) {

			await f("file:delete", { path: e });
		},

		beep() {

			if (typeof AudioContext < "u") {

				const e = new AudioContext(),

					r = e.createOscillator(),

					n = e.createGain();

				(r.connect(n),

					n.connect(e.destination),

					r.start(),

					r.stop(e.currentTime + 0.1));
			}
		},
	};
}

function l() {

	return {

		async showOpenDialog(e) {

			try {

				const r = window.__TAURI__?.dialog ?? window.TAURI?.dialog;

				if (typeof r?.open == "function") {

					const n = await r.open(e);

					return {

						filePaths: Array.isArray(n) ? n : n ? [n] : [],

						canceled: !n,
					};
				}
			} catch {}

			return { filePaths: [], canceled: !0 };
		},

		async showSaveDialog(e) {

			try {

				const r = window.__TAURI__?.dialog ?? window.TAURI?.dialog;

				if (typeof r?.save == "function") {

					const n = await r.save(e);

					return { filePath: n ?? void 0, canceled: !n };
				}
			} catch {}

			return { filePath: void 0, canceled: !0 };
		},

		showMessage(e) {

			window.__TAURI__?.dialog?.message &&
				window.__TAURI__.dialog.message(e);
		},

		showError(e) {

			window.__TAURI__?.dialog?.message &&
				window.__TAURI__.dialog.message("Error: " + e);
		},
	};
}

function w() {

	return {

		async writeText(e) {

			try {

				const r =
					window.__TAURI__?.clipboard ?? window.TAURI?.clipboard;

				typeof r?.writeText == "function"
					? await r.writeText(e)
					: await navigator.clipboard.writeText(e);
			} catch (r) {

				throw r;
			}
		},

		async readText() {

			try {

				const e =
					window.__TAURI__?.clipboard ?? window.TAURI?.clipboard;

				if (typeof e?.readText == "function") return await e.readText();
			} catch {}

			return await navigator.clipboard.readText();
		},

		async writeBuffer(e, r) {

			throw new Error("Clipboard.writeBuffer is not fully supported");
		},

		async readBuffer(e) {},

		clear() {},
	};
}

function m() {

	return {

		get shouldUseDarkColors() {

			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		},

		get shouldUseInvertedColorScheme() {

			return !1;
		},

		get theme() {

			const e = window.__TAURI__ ?? window.TAURI;

			return e?.window?.appWindow?.theme
				? e.window.appWindow.theme
				: "system";
		},
	};
}

function h() {

	return {

		id: 1,

		isFocused() {

			return document.hasFocus();
		},

		focus() {

			window.focus();
		},

		show() {},

		hide() {},

		close() {

			window.close();
		},

		isMaximizable() {

			return !0;
		},

		isMinimizable() {

			return !0;
		},

		getBounds() {

			return {

				x: window.screenX,

				y: window.screenY,

				width: window.innerWidth,

				height: window.innerHeight,
			};
		},
	};
}

function t() {

	return {

		ipcRenderer: i("ipcRenderer", () => {
			const e = window.__IPC_RENDERER__;
			return (
				e || {
					send: () => {},
					invoke: async () => ({}),
					on: () => ({}),
					once: () => ({}),
					removeListener: () => ({}),
					removeAllListeners: () => ({}),
				}
			);
		}),

		webFrame: i("webFrame", s),

		app: i("app", d),

		screen: i("screen", c),

		shell: i("shell", u),

		dialog: i("dialog", l),

		clipboard: i("clipboard", w),

		nativeTheme: i("nativeTheme", m),

		BrowserWindow: h(),
	};
}

function b() {

	if (typeof window > "u" || typeof require != "function") return;

	const e = window.require;

	((window.require = function (r) {
		if (r === "electron") return t();
		if (r.startsWith("electron/")) {
			const n = r.replace("electron/", ""),
				o = t();
			switch (n) {
				case "ipcRenderer":
					return o.ipcRenderer;
				case "webFrame":
					return o.webFrame;
				case "app":
					return o.app;
				case "screen":
					return o.screen;
				case "shell":
					return o.shell;
				case "dialog":
					return o.dialog;
				case "clipboard":
					return o.clipboard;
				case "nativeTheme":
					return o.nativeTheme;
				case "browserWindow":
				case "BrowserWindow":
					return o.BrowserWindow;
				case "remote":
					throw new Error(
						"electron.remote is not supported in Tauri environment",
					);
				default:
					return {};
			}
		}
		return e(r);
	}),

		Object.keys(e).forEach((r) => {
			Object.defineProperty(window.require, r, {
				...Object.getOwnPropertyDescriptor(e, r),
			});
		}));
}

window.__electron_require__ = (e) => {

	if (e === "electron") return t();

	if (e.startsWith("electron/")) {

		const r = e.replace("electron/", ""),

			n = t();

		switch (r) {

			case "ipcRenderer":
				return n.ipcRenderer;

			case "webFrame":
				return n.webFrame;

			case "app":
				return n.app;

			case "screen":
				return n.screen;

			case "shell":
				return n.shell;

			case "dialog":
				return n.dialog;

			case "clipboard":
				return n.clipboard;

			case "nativeTheme":
				return n.nativeTheme;

			case "BrowserWindow":
				return n.BrowserWindow;

			default:
				return {};
		}
	}
};

function p() {

	if (typeof window > "u" || window.__NATIVE_MODULE_POLYFILL_INSTALLED__)
		return;

	((window.__NATIVE_MODULE_POLYFILL_INSTALLED__ = !0), b());

	const e = t();

	((window.electron = e),

		typeof window.vscode < "u" && (window.vscode.electron = e));
}

var g = {

	install: p,

	createElectronModule: t,

	createWebFrame: s,

	createApp: d,

	createScreen: c,

	createShell: u,

	createDialog: l,

	createClipboard: w,

	createNativeTheme: m,

	createBrowserWindow: h,
};

typeof window < "u" && p();

export { g as default, p as installNativeModulePolyfill };
