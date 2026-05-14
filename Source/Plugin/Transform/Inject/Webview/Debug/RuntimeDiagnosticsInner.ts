import type { TransformPlugin } from "../../../../../Type.js";

const PathRegex = /\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;

const Marker = "__LAND_WEBVIEW_INNER_DIAG_INJECT__";

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectWebviewRuntimeDiagnosticsInner",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		// The diagnostic script to be injected into the toContentHtml function.
		// It will be injected as a JS expression that creates an IIFE and
		// inserts it into the HTML document before </head> or at start of <body>.
		// We inject directly after `newDocument.head.prepend(defaultStyles.cloneNode(true));`
		// inside toContentHtml, so it runs as the inner iframe document is built.
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

		// Find the marker line inside toContentHtml and inject after it.
		// We match the line: `newDocument.head.prepend(defaultStyles.cloneNode(true));`
		// using a regex that captures leading whitespace so we can preserve it.
		const markerRegex = /^(\s*)newDocument\.head\.prepend\(defaultStyles\.cloneNode\(true\)\);/m;
		const match = Source.match(markerRegex);
		if (!match) {
			// Can't find injection point; skip to avoid breaking the file.
			return { Kind: "Unchanged" };
		}
		const indent = match[1] || '';

		// Build the injected lines: original line + diagnostic block
		// that appends a <script> element into newDocument.head.
		const injectedLines = `${match[0]}\n${indent}\t// --- DIAGNOSTIC INJECTION ---\n${indent}\t// ${Marker}\n${indent}\t{\n${indent}\t\tconst diScript = document.createElement('script');\n${indent}\t\tdiScript.textContent = ${JSON.stringify(diagnosticScript)};\n${indent}\t\tnewDocument.head.appendChild(diScript);\n${indent}\t}\n${indent}\t// --- END DIAGNOSTIC ---`;

		const nextSource = Source.replace(markerRegex, injectedLines);
		return { Kind: "Rewrite", Source: nextSource };
	},
};

export default Plugin;
