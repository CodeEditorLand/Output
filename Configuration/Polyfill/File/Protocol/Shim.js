async function i(e, t = {}) {

	try {

		const n =
			window.__TAURI__?.core?.invoke ??
			window.__TAURI__?.invoke ??
			window.TAURI?.invoke;

		if (typeof n == "function")
			return e.includes(":")
				? await n("MountainIPCInvoke", { method: e, params: t })
				: await n(e, t);

		throw new Error(`Tauri invoke not available for command: ${e}`);
	} catch (n) {

		throw n;
	}
}

const p = {

	matches(e) {

		return e.protocol === "vscode-file";
	},

	async handle(e) {

		try {

			const t = decodeURIComponent(e.path),

				n = e.headers?.get("X-Http-Method") || "GET";

			if (n === "GET" || !n) {

				const r = await i("file:read", [t]);

				return {

					content: d(r),

					metadata: {

						mime: s(t),

						lastModified: new Date().toISOString(),
					},
				};
			} else if (n === "PUT" || n === "POST")
				throw new Error("File write not implemented via GET handler");

			throw new Error(`Unsupported method: ${n}`);
		} catch (t) {

			return {

				content: null,

				error: t instanceof Error ? t : new Error(String(t)),
			};
		}
	},
};

function d(e) {

	if (e == null) return new Uint8Array(0);

	if (typeof e == "string" || e instanceof Uint8Array) return e;

	if (Array.isArray(e)) return new Uint8Array(e);

	const t = e.buffer;

	return t instanceof Uint8Array
		? t
		: Array.isArray(t)
			? new Uint8Array(t)
			: new Uint8Array(0);
}

const h = {

		matches(e) {

			return e.protocol === "vscode-userdata";
		},

		async handle(e) {

			try {

				const n = `${await i("file:user_data_path", {})}/${e.path.replace(/^\//, "")}`,

					r = await i("file:read", [n]);

				return {

					content: d(r),

					metadata: {

						mime: s(e.path),

						lastModified: new Date().toISOString(),
					},
				};
			} catch {

				return { content: "", error: void 0 };
			}
		},
	},

	y = {

		matches(e) {

			return e.protocol === "vscode-resource";
		},

		async handle(e) {

			try {

				const [t, ...n] = e.path.split("/").filter(Boolean),

					r = n.join("/");

				return {

					content: await i("cocoon:get_extension_resource", {
						extension_id: t,
						resource_path: r,
					}),

					metadata: { mime: s(r) },
				};
			} catch (t) {

				return {

					content: null,

					error: t instanceof Error ? t : new Error(String(t)),
				};
			}
		},
	},

	w = {

		matches(e) {

			return e.protocol === "vscode-remote";
		},

		async handle(e) {

			try {

				const [t, ...n] = e.path.split("/").filter(Boolean),

					r = n.join("/");

				return {

					content: await i("cocoon:read_remote_file", {
						host: t,
						path: r,
					}),

					metadata: { mime: s(r) },
				};
			} catch (t) {

				return {

					content: null,

					error: t instanceof Error ? t : new Error(String(t)),
				};
			}
		},
	},

	g = {

		matches(e) {

			return e.protocol === "file";
		},

		async handle(e) {

			try {

				const t = decodeURIComponent(e.path),

					n = await i("file:read", [t]);

				return {

					content: d(n),

					metadata: {

						mime: s(t),

						lastModified: new Date().toISOString(),
					},
				};
			} catch (t) {

				return {

					content: null,

					error: t instanceof Error ? t : new Error(String(t)),
				};
			}
		},
	},

	u = [p, h, y, w, g];

function S(e) {

	return u.find((t) => t.matches(e)) ?? null;
}

function m(e) {

	try {

		const t = new URL(e),

			n = t.protocol.replace(/:$/, ""),

			r = t.pathname.replace(/^\//, ""),

			o = {};

		return (
			t.searchParams.forEach((c, l) => {
				o[l] = c;
			}),

			{ protocol: n, path: r, query: o }
		);
	} catch {

		throw new Error(`Invalid protocol URL: ${e}`);
	}
}

function s(e) {

	const t = e.split(".").pop()?.toLowerCase();

	return (
		{
			js: "application/javascript",
			json: "application/json",
			ts: "application/typescript",
			html: "text/html",
			htm: "text/html",
			css: "text/css",
			md: "text/markdown",
			txt: "text/plain",
			xml: "application/xml",
			png: "image/png",
			jpg: "image/jpeg",
			jpeg: "image/jpeg",
			gif: "image/gif",
			svg: "image/svg+xml",
			wasm: "application/wasm",
		}[t ?? ""] ?? "application/octet-stream"
	);
}

function R() {

	const e = window.fetch;

	window.fetch = async function (n, r) {

		try {

			const o =
				typeof n == "string"
					? n
					: n instanceof URL
						? n.toString()
						: n.url;

			if (P(o)) {

				const c = m(o),

					l = S(c);

				if (l) {

					const a = await l.handle({
						...c,
						headers: new Headers(r?.headers),
					});

					if (a.error) throw a.error;

					return new Response(a.content, {
						status: 200,
						headers: {
							"Content-Type":
								a.metadata?.mime ?? "application/octet-stream",
							"Cache-Control": "public, max-age=3600",
							...(a.metadata?.lastModified && {
								"Last-Modified": a.metadata.lastModified,
							}),
						},
					});
				}
			}

			return e(n, r);
		} catch {

			return e(n, r);
		}
	};
}

function P(e) {

	const t = e.split(":")[0];

	return [
		"vscode-file",

		"vscode-userdata",

		"vscode-resource",

		"vscode-remote",
	].includes(t);
}

function _() {

	typeof window.__createImport < "u";
}

function f() {

	typeof window > "u" ||
		window.__FILE_PROTOCOL_SHIM_INSTALLED__ ||
		((window.__FILE_PROTOCOL_SHIM_INSTALLED__ = !0), R(), _());
}

const F = { install: f, handlers: u, parseProtocolURL: m, inferMimeType: s };

typeof window < "u" && f();

export { F as FileProtocolShim, f as installFileProtocolShim };
