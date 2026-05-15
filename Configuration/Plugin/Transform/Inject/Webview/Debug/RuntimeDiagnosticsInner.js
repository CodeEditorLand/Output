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
(function() {
	'use strict';
	// Capture parent before the vscode-api polyfill overwrites it
	const _landParent = window.parent;
	function DI(msg, data) {
		if (_landParent && _landParent.DEBUG_WV) {
			_landParent.DEBUG_WV('INNER_' + msg, data);
		} else if (_landParent) {
			console.log('[WebviewDebug][INNER_no_parent_DEBUG_WV]', msg, data);
		}
	}
	DI('BOOT', 'inner iframe diagnostics loaded (captured real parent)');

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

	// Body-level mutation observer (catches Shadow DOM host insertions, alternate mount points)
	const bodyRo = new MutationObserver(muts => {
		DI('BODY_MUTATION', {
			type: 'batch',
			count: muts.length,
			addedTotal: muts.reduce((s, m) => s + m.addedNodes.length, 0),
			removedTotal: muts.reduce((s, m) => s + m.removedNodes.length, 0)
		});
		// Snapshot body every 5 mutations to avoid spam
		if (Math.random() < 0.2) {
			var bodyHTML = document.body ? document.body.innerHTML.slice(0, 2000) : 'NO_BODY';
			DI('BODY_SNAPSHOT', { htmlLen: bodyHTML.length, snippet: bodyHTML.slice(0, 300) });
		}
	});
	const startBodyObserving = () => {
		if (document.body) {
			bodyRo.observe(document.body, { childList: true, subtree: true });
			DI('BODY_OBSERVER_STARTED', {});
		} else {
			setTimeout(startBodyObserving, 30);
		}
	};
	startBodyObserving();

	// Always log INIT_COMPLETE BEFORE any potentially-throwing code
	DI('INIT_COMPLETE', { ua: navigator.userAgent.slice(0, 80) });

	// ReactDOM hooks - poll continuously until page unload
	const waitRender = () => {
		try {
			// Safely check for ReactDOM (handle null/undefined)
			if (window.ReactDOM && typeof window.ReactDOM === 'object') {
				DI('REACTDOM_EXISTS', {
					hasCreateRoot: !!(window.ReactDOM && window.ReactDOM.createRoot),
					hasRender: !!(window.ReactDOM && window.ReactDOM.render)
				});
			}
			// Intercept createRoot
			if (window.ReactDOM && window.ReactDOM.createRoot) {
				DI('REACTDOM_CREATEROOT_FOUND', {});
				const origCreateRoot = window.ReactDOM.createRoot;
				window.ReactDOM.createRoot = function(container, options) {
					var containerId = (container && container.id) || (container && container.tagName) || String(container);
					DI('REACT_CREATE_ROOT', { containerId: containerId, containerType: container ? container.constructor.name : 'null' });
					try {
						const root = origCreateRoot.call(this, container, options);
						DI('REACT_CREATE_ROOT_OK', {});
						// Wrap render
						const origRender = root.render.bind(root);
						root.render = function(element, callback) {
							DI('REACT_RENDER_CALL', { elementType: element?.type?.name || String(element?.type) || 'string' });
							try {
								const result = origRender(element, callback);
								DI('REACT_RENDER_OK', {});
								return result;
							} catch (err) {
								DI('REACT_RENDER_ERR', { error: String(err) });
								throw err;
							}
						};
						return root;
					} catch (err) {
						DI('REACT_CREATE_ROOT_ERR', { error: String(err) });
						throw err;
					}
				};
			}

			// Intercept legacy ReactDOM.render (for older React versions)
			if (window.ReactDOM && window.ReactDOM.render) {
				DI('REACTDOM_RENDER_FOUND', {});
				const origRender = window.ReactDOM.render;
				window.ReactDOM.render = function(element, container, callback) {
					var containerId = (container && container.id) || (container && container.tagName) || String(container);
					DI('REACT_RENDER_LEGACY', { containerId: containerId, elementType: element?.type?.name || String(element?.type) });
					try {
						const result = origRender(element, container, callback);
						DI('REACT_RENDER_LEGACY_OK', {});
						return result;
					} catch (err) {
						DI('REACT_RENDER_LEGACY_ERR', { error: String(err) });
						throw err;
					}
				};
			}

			// Dump window React-related keys once
			if (!window.__landDiagDumped && typeof window !== 'undefined') {
				try {
					var wKeys = Object.keys(window).filter(k => k.includes('React') || k.includes('react')).slice(0, 20);
					DI('WINDOW_REACT_KEYS', { keys: wKeys });
					window.__landDiagDumped = true;
				} catch (e) {
					console.error('[WebviewDebug] key dump error', e);
				}
			}
		} catch (e) {
			// Suppress any error in diagnostics to avoid aborting IIFE
			console.error('[WebviewDebug] waitRender exception', e);
			try { DI('WAITRENDER_EXCEPTION', { error: String(e) }); } catch (_) {}
		}
		setTimeout(waitRender, 100);
	};
	waitRender();

	DI('INIT_COMPLETE', { ua: navigator.userAgent.slice(0, 80) });
})();
`.trim();
		const markerRegex = /^(\s*)\/\/\s*Inject default styles/m;
		const match = Source.match(markerRegex);
		if (!match) {
			return { Kind: "Unchanged" };
		}
		const indent = match[1] || "";
		const injectedLines = `${indent}// --- DIAGNOSTIC INJECTION ---
${indent}// ${Marker}
${indent}{
${indent}	const _diScript = document.createElement('script');
${indent}	_diScript.textContent = ${JSON.stringify(diagnosticScript)};
${indent}	// Insert before the VSCode API script so it runs first
${indent}	if (newDocument.head.firstChild) {
${indent}		newDocument.head.insertBefore(_diScript, newDocument.head.firstChild);
${indent}	} else {
${indent}		newDocument.head.appendChild(_diScript);
${indent}	}
${indent}}
${indent}// --- END DIAGNOSTIC ---
${match[0]}`;
		const nextSource = Source.replace(markerRegex, injectedLines);
		return { Kind: "Rewrite", Source: nextSource };
	},
};
var RuntimeDiagnosticsInner_default = Plugin;
export { RuntimeDiagnosticsInner_default as default };
//# sourceMappingURL=RuntimeDiagnosticsInner.js.map
