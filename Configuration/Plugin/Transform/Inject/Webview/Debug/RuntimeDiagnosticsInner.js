var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const PathRegex =
	/\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;
const Marker = "__LAND_WEBVIEW_INNER_DIAG_INJECT__";
const Plugin = {
	Kind: "Transform",
	Name: "InjectWebviewRuntimeDiagnosticsInner",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		const diagnosticScript = `
// --- LAND WEBVIEW INNER DIAGNOSTICS INJECTION ---
(function() {
	'use strict';
	const LAND_INNER_DEBUG = true;

	function DI(msg, data) {
		if (window.parent && window.parent.DEBUG_WV) {
			window.parent.DEBUG_WV('INNER_' + msg, data);
		}
	}
	DI('BOOT', 'inner iframe diagnostics loaded');

	// Intercept console early
	const origError = console.error;
	const origWarn = console.warn;
	console.error = (...args) => {
		DI('CONSOLE_ERROR', { msg: args[0], args: args.slice(1).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join('|') });
		origError.apply(console, args);
	};
	console.warn = (...args) => {
		DI('CONSOLE_WARN', { msg: args[0], args: args.slice(1) });
		origWarn.apply(console, args);
	};

	window.addEventListener('error', e => {
		DI('GLOBAL_ERROR', { message: e.message, filename: e.filename, lineno: e.lineno, colno: e.colno });
	});
	window.addEventListener('unhandledrejection', e => {
		DI('UNHANDLED_REJECTION', { reason: String(e.reason) });
	});

	// Watch for module script element
	const watchModuleScript = () => {
		const scripts = document.querySelectorAll('script[type="module"]');
		if (scripts.length > 0) {
			DI('MODULE_SCRIPT_FOUND', { src: scripts[0].src, readyState: document.readyState });
		} else {
			setTimeout(watchModuleScript, 50);
		}
	};
	watchModuleScript();

	// ReactDOM hooks
	const waitReactDOM = () => {
		if (typeof window.ReactDOM === 'object' && window.ReactDOM.createRoot) {
			DI('REACTDOM_READY', {});
			const origCreateRoot = window.ReactDOM.createRoot;
			window.ReactDOM.createRoot = function(container, options) {
				DI('REACT_CREATE_ROOT', { containerId: container?.id || String(container) });
				try {
					const root = origCreateRoot.call(this, container, options);
					DI('REACT_CREATE_ROOT_OK', {});
					return root;
				} catch (err) {
					DI('REACT_CREATE_ROOT_ERR', { error: String(err) });
					throw err;
				}
			};
		} else {
			setTimeout(waitReactDOM, 50);
		}
	};
	waitReactDOM();

	// Observe #root
	const ro = new MutationObserver(muts => {
		for (const m of muts) {
			DI('ROOT_MUTATION', { type: m.type, added: m.addedNodes.length, removed: m.removedNodes.length });
			if (m.type === 'childList' && m.addedNodes.length > 0) {
				DI('ROOT_CHILD_ADDED', Array.from(m.addedNodes).map(n => n.nodeName).join(','));
			}
		}
	});
	const startObserving = () => {
		const root = document.getElementById('root');
		if (root) {
			DI('ROOT_ELEMENT_FOUND', { exists: true, children: root.childNodes.length });
			ro.observe(root, { childList: true, subtree: true });
		} else {
			setTimeout(startObserving, 30);
		}
	};
	startObserving();

	DI('INIT_COMPLETE', { ua: navigator.userAgent.slice(0, 80) });
})();
// --- END LAND WEBVIEW INNER DIAGNOSTICS ---
`.trim();
		const markerRegex =
			/^(\s*)newDocument\.head\.prepend\(defaultStyles\.cloneNode\(true\)\);/m;
		const match = Source.match(markerRegex);
		if (!match) {
			return { Kind: "Unchanged" };
		}
		const indent = match[1] || "";
		const injectedLines = `${match[0]}
${indent}	// --- DIAGNOSTIC INJECTION ---
${indent}	// ${Marker}
${indent}	{
${indent}		const diScript = document.createElement('script');
${indent}		diScript.textContent = ${JSON.stringify(diagnosticScript)};
${indent}		newDocument.head.appendChild(diScript);
${indent}	}
${indent}	// --- END DIAGNOSTIC ---`;
		const nextSource = Source.replace(markerRegex, injectedLines);
		return { Kind: "Rewrite", Source: nextSource };
	},
};
var RuntimeDiagnosticsInner_default = Plugin;
export { RuntimeDiagnosticsInner_default as default };
//# sourceMappingURL=RuntimeDiagnosticsInner.js.map
