const s = "/* __LAND_NESTED_WORKER_BOOTSTRAP_INLINED__ */",
	i = "const _bootstrapFnSource = (function _bootstrapFn(workerUrl) {",
	c = `const _bootstrapFnSource = ${JSON.stringify(
		[
			"function _bootstrapFn(workerUrl) {",

			"  const listener = function(event) {",

			"    globalThis.removeEventListener('message', listener);",

			"    const port = event.data;",

			"    Object.defineProperties(globalThis, {",

			"      'postMessage': {",

			"        value: function(data, transferOrOptions) {",

			"          port.postMessage(data, transferOrOptions);",

			"        }",

			"      },",

			"      'onmessage': {",

			"        get: function() { return port.onmessage; },",

			"        set: function(value) { port.onmessage = value; }",

			"      }",

			"    });",

			"    port.addEventListener('message', function(msg) {",

			"      globalThis.dispatchEvent(new MessageEvent('message', {",

			"        data: msg.data,",

			"        ports: msg.ports ? [...msg.ports] : void 0",

			"      }));",

			"    });",

			"    port.start();",

			"    globalThis.Worker = class {",

			"      constructor() {",

			"        throw new TypeError('Nested workers from within nested worker are NOT supported.');",

			"      }",

			"    };",

			"    importScripts(workerUrl);",

			"  };",

			"  globalThis.addEventListener('message', listener);",

			"}",
		].join(`
`),
	)};`,
	l = {
		Kind: "Transform",

		Name: "RewriteNestedWorkerBootstrap",

		Match: ({ Path: e }) =>
			/\/vs\/workbench\/services\/extensions\/worker\/polyfillNestedWorker\.js$/.test(
				e,
			),

		Transform({ Source: e }) {
			if (e.includes(s)) return { Kind: "Unchanged" };
			const t = e.indexOf(i);
			if (t < 0) return { Kind: "Unchanged" };
			const n = "}).toString();",
				r = e.indexOf(n, t);
			if (r < 0) return { Kind: "Unchanged" };
			const o = r + n.length,
				a = e.slice(0, t) + c + e.slice(o);
			return {
				Kind: "Rewrite",
				Source:
					s +
					`
` +
					a,
			};
		},
	};
var d = l;
export { d as default };
