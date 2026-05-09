async function T(t, n = {}) {

	try {

		const e =
			window.__TAURI__?.core?.invoke ??
			window.__TAURI__?.invoke ??
			window.TAURI?.invoke;

		if (typeof e == "function")
			return t.includes(":")
				? await e("MountainIPCInvoke", { method: t, params: n })
				: await e(t, n);

		throw new Error(`Tauri invoke not available for command: ${t}`);
	} catch (e) {

		throw e;
	}
}

function P(t, n = {}) {

	try {

		const e =
			window.__TAURI__?.core?.invoke ??
			window.__TAURI__?.invoke ??
			window.TAURI?.invoke;

		typeof e == "function" &&
			(t.includes(":")
				? e("MountainIPCInvoke", { method: t, params: n })
				: e(t, n)
			).catch((r) => {
				globalThis.__LAND_POLYFILL_TELEMETRY__?.On(
					"ipc.fire-and-forget",

					r,

					{ Command: t },
				);
			});
	} catch (e) {

		globalThis.__LAND_POLYFILL_TELEMETRY__?.On("ipc.fire-and-forget", e, {
			Command: t,
			Phase: "invoke-resolve",
		});
	}
}

const y = [
	{

		electronPattern: /^logger:(log|warn|error|info|debug|trace|critical)$/,

		tauriCommand: "logger:log",

		transform: (t) => ({ level: t[0], message: t[1], context: t[2] }),
	},

	{

		electronPattern: /^policy:(get|set|validate|enforce|check)$/,

		tauriCommand: "policy:handle",

		transform: (t) => ({ action: t[0], data: t[1] }),
	},

	{

		electronPattern: /^sign:(sign|verify|generate|validate)$/,

		tauriCommand: "sign:handle",

		transform: (t) => ({ action: t[0], data: t[1], options: t[2] }),
	},

	{

		electronPattern: /^userDataProfiles:(create|delete|update|get|list)$/,

		tauriCommand: "user_data:handle_profile",

		transform: (t) => ({ action: t[0], profileId: t[1], data: t[2] }),
	},

	{

		electronPattern:
			/^localFileSystem:(read|write|delete|exists|stat|readdir)$/,

		tauriCommand: "file:handle",

		transform: (t) => ({ action: t[0], path: t[1], data: t[2] }),
	},
];

function m(t) {

	for (const n of y)
		if (n.electronPattern.test(t)) {

			const e = n.transform?.([]) ?? {};

			return { command: n.tauriCommand, args: e };
		}

	return null;
}

function h(t, n) {

	for (const e of y)
		if (e.electronPattern.test(t) && e.transform) return e.transform(n);

	return { args: n };
}

function v(t) {

	const n = [];

	function e(s) {

		if (s == null) n.push(new Uint8Array([0]));

		else if (typeof s == "string") {

			const i = new TextEncoder().encode(s);

			(n.push(new Uint8Array([1])), o(i.length), n.push(i));
		} else if (Array.isArray(s)) {

			(n.push(new Uint8Array([4])), o(s.length));

			for (const i of s) e(i);
		} else if (typeof s == "number" && (s | 0) === s)
			(n.push(new Uint8Array([6])), o(s));

		else {

			const i = new TextEncoder().encode(JSON.stringify(s));

			(n.push(new Uint8Array([5])), o(i.length), n.push(i));
		}
	}

	function o(s) {

		const i = [];

		let u = s >>> 0;

		for (; u > 127; ) (i.push((u & 127) | 128), (u >>>= 7));

		(i.push(u & 127), n.push(new Uint8Array(i)));
	}

	e(t);

	let r = 0;

	for (const s of n) r += s.length;

	const c = new Uint8Array(r);

	let a = 0;

	for (const s of n) (c.set(s, a), (a += s.length));

	return c;
}

function S(t) {

	const n = new Uint8Array(t);

	let e = 0;

	function o() {

		let c = 0;

		for (let a = 0; ; a += 7) {

			const s = n[e++];

			if (((c |= (s & 127) << a), !(s & 128))) return c;
		}
	}

	function r() {

		switch (n[e++]) {

			case 0:
				return;

			case 1: {

				const a = o(),

					s = new TextDecoder().decode(n.slice(e, e + a));

				return ((e += a), s);
			}

			case 2:
			case 3: {

				const a = o(),

					s = n.slice(e, e + a);

				return ((e += a), s);
			}

			case 4: {

				const a = o(),

					s = [];

				for (let i = 0; i < a; i++) s.push(r());

				return s;
			}

			case 5: {

				const a = o(),

					s = new TextDecoder().decode(n.slice(e, e + a));

				return ((e += a), JSON.parse(s));
			}

			case 6:
				return o();
		}
	}

	return r();
}

function p(t, n) {

	const e = v(t),

		o = v(n),

		r = new Uint8Array(e.length + o.length);

	return (r.set(e, 0), r.set(o, e.length), r);
}

function C(t) {

	const n = new Uint8Array(t);

	let e = 0;

	function o() {

		let s = 0;

		for (let i = 0; ; i += 7) {

			const u = n[e++];

			if (((s |= (u & 127) << i), !(u & 128))) return s;
		}
	}

	function r() {

		switch (n[e++]) {

			case 0:
				return;

			case 1: {

				const i = o(),

					u = new TextDecoder().decode(n.slice(e, e + i));

				return ((e += i), u);
			}

			case 2:
			case 3: {

				const i = o();

				return ((e += i), n.slice(e - i, e));
			}

			case 4: {

				const i = o(),

					u = [];

				for (let l = 0; l < i; l++) u.push(r());

				return u;
			}

			case 5: {

				const i = o(),

					u = new TextDecoder().decode(n.slice(e, e + i));

				return ((e += i), JSON.parse(u));
			}

			case 6:
				return o();
		}
	}

	const c = r(),

		a = r();

	return { Header: c, Body: a };
}

function A(t, n) {

	const e = E(t);

	return e ? `${e}:${n}` : null;
}

function E(t) {

	switch (t) {

		case "localFilesystem":
		case "localFileSystem":
			return "file";

		case "storage":
			return "storage";

		case "configuration":
			return "configuration";

		case "commands":
			return "commands";

		case "search":
			return "search";

		case "workspaces":
			return "workspaces";

		case "terminal":
			return "terminal";

		case "textFile":
			return "textFile";

		case "output":
			return "output";

		case "notification":
			return "notification";

		case "progress":
			return "progress";

		case "quickInput":
			return "quickInput";

		case "environment":
			return "environment";

		case "decorations":
			return "decorations";

		case "workingCopy":
			return "workingCopy";

		case "label":
			return "label";

		case "model":
			return "model";

		case "extensions":
		case "extensionManagement":
		case "extensionGallery":
			return "extensions";

		case "extensionHostStarter":
			return "extensionHostStarter";

		case "localPty":
			return "localPty";

		case "nativeHost":
			return "nativeHost";

		case "themes":
			return "themes";

		case "keybinding":
			return "keybinding";

		case "lifecycle":
			return "lifecycle";

		case "url":
			return "url";

		case "menubar":
			return "menubar";

		case "encryption":
			return "encryption";

		case "localGit":
			return "git";

		default:
			return null;
	}
}

function L(t, n, e) {

	return e == null ? [] : Array.isArray(e) ? e : [e];
}

async function b(t, n) {

	const e =
		window.__TAURI__?.core?.invoke ??
		window.__TAURI__?.invoke ??
		window.TAURI?.invoke;

	if (typeof e != "function")
		throw new Error(`Tauri invoke not available for method: ${t}`);

	return await e("MountainIPCInvoke", { method: t, params: n });
}

class R {

	listeners = new Map();

	replyHandlers = new Map();

	replyCounter = 0;

	onceListeners = new Map();

	emitMessage(n) {

		const e = { sender: {}, senderId: 0, senderIsMainFrame: !0, ports: [] },

			o = this.listeners.get("vscode:message");

		if (o)
			for (const r of o)
				try {

					r(e, n);
				} catch {}
	}

	handleBinaryIPC(n) {

		try {

			const { Header: e, Body: o } = C(n),

				r = e;

			if (!Array.isArray(r)) return;

			const c = r[0];

			if (c === 100) {

				const a = r[1],

					s = r[2],

					i = r[3],

					u = A(s, i);

				if (u !== null) {

					const f = L(s, i, o);

					b(u, f)
						.then((d) => {
							const g = p([201, a], d);
							this.emitMessage(g);
						})
						.catch((d) => {
							const g = d instanceof d ? d.message : String(d),
								_ = p([202, a], g);
							this.emitMessage(_);
						});

					return;
				}

				const l = this.getStubResponse(s, i, o);

				if (typeof l == "string" && l.startsWith("__IPC_ERROR__")) {

					const f = l.slice(13),

						d = p([202, a], f);

					setTimeout(() => this.emitMessage(d), 0);
				} else {

					const f = p([201, a], l);

					setTimeout(() => this.emitMessage(f), 0);
				}
			} else if (c === 102) {

				const a = r[1],

					s = r[2],

					i = r[3];
			}
		} catch {}
	}

	getStubResponse(n, e, o) {

		switch (n) {

			case "logger":
				return;

			case "policy":
				return e === "serialize" ? {} : void 0;

			case "sign":
				return "";

			case "userDataProfiles":
				return;

			case "keyboardLayout":
				return e === "getKeyboardLayoutData"
					? {

							keyboardLayoutInfo: {

								model: "pc105",

								layout: "us",

								variant: "",

								options: "",

								rules: "",
							},

							keyboardMapping: {},
						}

					: void 0;

			case "sharedProcess":
				return;

			default:
				return;
		}
	}

	send(n, ...e) {

		if (n === "vscode:hello") {

			setTimeout(() => {
				const r = p([200], void 0);
				this.emitMessage(r);
			}, 0);

			return;
		}

		if (n === "vscode:message") {

			const r = e[0];

			if (r instanceof ArrayBuffer || ArrayBuffer.isView(r)) {

				const c = r instanceof ArrayBuffer ? r : r.buffer;

				this.handleBinaryIPC(c);
			}

			return;
		}

		if (
			n === "vscode:createSharedProcessChannelConnection" ||
			n === "vscode:toggleDevTools" ||
			n === "vscode:reloadWindow" ||
			n === "vscode:reportUnresponsive" ||
			n === "vscode:openDevTools" ||
			n.startsWith("vscode:")
		)
			return;

		const o = m(n);

		if (o) {

			const r = h(n, e);

			P(o.command, r);
		}
	}

	sendSync(n, ...e) {}

	async invoke(n, ...e) {

		const o = m(n);

		if (o) {

			const r = h(n, e);

			return await T(o.command, r);
		}
	}

	on(n, e) {

		return (
			this.listeners.has(n) || this.listeners.set(n, new Set()),

			this.listeners.get(n).add(e),

			this.registerTauriListener(n, e),

			this
		);
	}

	once(n, e) {

		(this.onceListeners.has(n) || this.onceListeners.set(n, new Set()),

			this.onceListeners.get(n).add(new WeakRef(e)));

		const o = (r, ...c) => {

			(e(r, ...c), this.removeListener(n, o));
		};

		return (this.on(n, o), this);
	}

	removeListener(n, e) {

		const o = this.listeners.get(n);

		return (
			o && (o.delete(e), o.size === 0 && this.listeners.delete(n)),

			this
		);
	}

	removeAllListeners(n) {

		return (n ? this.listeners.delete(n) : this.listeners.clear(), this);
	}

	sendTo(n, e, o) {

		const r = ++this.replyCounter,

			c = { channel: n, args: e, callback: o, timestamp: Date.now() };

		(this.replyHandlers.set(r, c),

			this.invoke(n, ...e)
				.then((a) => {
					const s = this.replyHandlers.get(r);
					s && (s.callback(a), this.replyHandlers.delete(r));
				})
				.catch((a) => {
					const s = this.replyHandlers.get(r);
					s &&
						(s.callback({ error: a.message }),

						this.replyHandlers.delete(r));
				}));
	}

	onReply(n, e) {

		this.on(n, (o, ...r) => {
			e(r[0]);
		});
	}

	registerTauriListener(n, e) {}

	cleanup() {

		(this.listeners.clear(),

			this.onceListeners.clear(),

			this.replyHandlers.clear());
	}
}

let w = null;

function k() {

	return (w || (w = new R()), w);
}

function I() {

	if (typeof window > "u" || window.__IPC_RENDERER_SHIM_INSTALLED__) return;

	window.__IPC_RENDERER_SHIM_INSTALLED__ = !0;

	const t = k();

	(typeof window.vscode < "u" && (window.vscode.ipcRenderer = t),

		(window.__IPC_RENDERER__ = t));
}

var M = { install: I, get: k };

typeof window < "u" && I();

export {
	R as IPCRendererClass,
	M as default,
	k as getIPCRenderer,
	I as installIPCRendererShim,
};
