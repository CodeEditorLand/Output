async function i(e, n = {}) {
	try {
		const r =
			window.__TAURI__?.core?.invoke ??
			window.__TAURI__?.invoke ??
			window.TAURI?.invoke;
		if (typeof r == "function")
			return e.includes(":")
				? await r("MountainIPCInvoke", { method: e, params: n })
				: await r(e, n);
		throw new Error(`Tauri invoke not available for command: ${e}`);
	} catch (r) {
		throw r;
	}
}
function m(e, n) {
	if (typeof window.__TAURI__?.event?.listen == "function") {
		const r = window.__TAURI__.event
			.listen(e, ({ payload: a }) => {
				n(a);
			})
			.catch(() => {});
		return () => {
			r.then((a) => a?.());
		};
	}
	if (typeof window.TAURI?.event?.listen == "function") {
		const r = window.TAURI.event
			.listen(e, ({ payload: a }) => {
				n(a);
			})
			.catch(() => {});
		return () => {
			r.then((a) => a?.());
		};
	}
	return () => {};
}
function l(e) {
	const n = new Map(),
		r = new Map();
	let a = !1;
	const I = m(`shared_process:response:${e}`, (s) => {
			const t = s;
			if (t.correlationId && r.has(t.correlationId)) {
				const o = r.get(t.correlationId);
				(t.success
					? o.resolve(t.data)
					: o.reject(new Error(t.error ?? "Unknown error")),
					r.delete(t.correlationId));
			}
		}),
		x = m(`shared_process:event:${e}`, (s) => {
			const t = s;
			p(t.event, ...t.args);
		});
	function p(s, ...t) {
		const o = n.get(s);
		o &&
			o.forEach((c) => {
				try {
					c(...t);
				} catch {}
			});
	}
	function f() {
		return `${e}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
	}
	return {
		service: e,
		get ready() {
			return a;
		},
		set ready(s) {
			a = s;
		},
		async healthCheck() {
			try {
				return e === "extension-host"
					? await i("cocoon_extension_host_health", {})
					: e === "search"
						? await i("cocoon_search_service_health", {})
						: e === "debug"
							? await i("cocoon_debug_service_health", {})
							: await i("shared_process_service_health", {
									service: e,
								});
			} catch {
				return !1;
			}
		},
		async invoke(s, ...t) {
			const o = f(),
				c = { service: e, method: s, args: t, correlationId: o };
			return new Promise((y, P) => {
				(r.set(o, { resolve: y, reject: P }),
					i("shared_process:invoke", c).catch((b) => {
						(r.delete(o), P(b));
					}));
			});
		},
		on(s, t) {
			(n.has(s) || n.set(s, new Set()), n.get(s).add(t));
		},
		once(s, t) {
			const o = (...c) => {
				(t(...c), this.removeListener(s, o));
			};
			this.on(s, o);
		},
		removeListener(s, t) {
			const o = n.get(s);
			o && (o.delete(t), o.size === 0 && n.delete(s));
		},
		removeAllListeners(s) {
			s ? n.delete(s) : n.clear();
		},
	};
}
const d = Object.assign(l("extension-host"), {
		async start(e) {
			return await this.invoke("start", e);
		},
		async stop(e) {
			return await this.invoke("stop", e);
		},
		async restart(e) {
			return await this.invoke("restart", e);
		},
		async callExtensionAPI(e, n, ...r) {
			return await this.invoke("callAPI", e, n, ...r);
		},
		async getStatus() {
			return await this.invoke("getStatus");
		},
	}),
	u = Object.assign(l("search"), {
		async search(e, n) {
			return await this.invoke("search", e, n);
		},
		async getIndexStatus() {
			return await this.invoke("getIndexStatus");
		},
		async clearIndex() {
			return await this.invoke("clearIndex");
		},
	}),
	h = Object.assign(l("debug"), {
		async startSession(e) {
			return await this.invoke("startSession", e);
		},
		async stopSession(e) {
			return await this.invoke("stopSession", e);
		},
		async sendCommand(e, n, ...r) {
			return await this.invoke("sendCommand", e, n, ...r);
		},
		async getActiveSessions() {
			return await this.invoke("getActiveSessions");
		},
	}),
	v = Object.assign(l("storage"), {
		async getItem(e) {
			return await i("storage:get_item", { key: e });
		},
		async setItem(e, n) {
			return await i("storage:set_item", { key: e, value: n });
		},
		async removeItem(e) {
			return await i("storage:remove_item", { key: e });
		},
		async getAllItems() {
			return await i("storage:get_all_items", {});
		},
		async clear() {
			return await i("storage:clear", {});
		},
	}),
	g = Object.assign(l("update"), {
		async checkForUpdates() {
			return await i("update:check", {});
		},
		async downloadUpdate() {
			return await i("update:download", {});
		},
		async installUpdate() {
			return await i("update:install", {});
		},
		async getStatus() {
			return await i("update:get_status", {});
		},
	});
class S {
	services = new Map();
	healthCheckInterval = null;
	constructor() {
		(this.registerService(d),
			this.registerService(u),
			this.registerService(h),
			this.registerService(v),
			this.registerService(g));
	}
	registerService(n) {
		this.services.set(n.service, n);
	}
	getService(n) {
		return this.services.get(n);
	}
	getAllServices() {
		return new Map(this.services);
	}
	startHealthChecks(n = 3e4) {
		this.healthCheckInterval === null &&
			(this.healthCheckInterval = window.setInterval(async () => {
				for (const [, r] of this.services.entries())
					try {
						r.ready = await r.healthCheck();
					} catch {
						r.ready = !1;
					}
			}, n));
	}
	stopHealthChecks() {
		this.healthCheckInterval !== null &&
			(clearInterval(this.healthCheckInterval),
			(this.healthCheckInterval = null));
	}
	async initialize() {
		for (const [n, r] of this.services.entries())
			try {
				const a = await r.healthCheck();
				r.ready = a;
			} catch {
				r.ready = !1;
			}
		this.startHealthChecks();
	}
	async shutdown() {
		this.stopHealthChecks();
		for (const n of this.services.values()) n.removeAllListeners();
	}
}
let w = null;
function k() {
	return (w || (w = new S()), w);
}
async function _() {
	if (typeof window > "u" || window.__SHARED_PROCESS_PROXY_INSTALLED__)
		return;
	window.__SHARED_PROCESS_PROXY_INSTALLED__ = !0;
	const e = k();
	(await e.initialize(),
		typeof window.vscode < "u" &&
			(window.vscode.sharedProcess = {
				manager: e,
				ExtensionHostService: d,
				SearchService: u,
				DebugService: h,
				StorageService: v,
				UpdateService: g,
			}),
		(window.__SHARED_PROCESS__ = {
			manager: e,
			ExtensionHostService: d,
			SearchService: u,
			DebugService: h,
			StorageService: v,
			UpdateService: g,
		}));
}
var A = {
	install: _,
	getManager: k,
	ExtensionHostService: d,
	SearchService: u,
	DebugService: h,
	StorageService: v,
	UpdateService: g,
	SharedProcessManager: S,
};
typeof window < "u" &&
	_().catch((e) => {
		globalThis.__LAND_POLYFILL_TELEMETRY__?.On("polyfill.install", e, {
			Polyfill: "SharedProcessProxy",
		});
	});
export {
	h as DebugService,
	d as ExtensionHostService,
	u as SearchService,
	v as StorageService,
	g as UpdateService,
	A as default,
	k as getSharedProcessManager,
	_ as installSharedProcessProxy,
};
