/**
 * Inject WKWebView polyfills + Blob worker URL rewrite into VS Code's
 * Electron workbench entry.
 *
 * VS Code's `vs/code/electron-browser/workbench/workbench.js` reads
 * `window.requestIdleCallback`, `window.cancelIdleCallback`, and
 * `window.queryLocalFonts` at module-eval time. WKWebView (Tauri's
 * macOS webview) does not implement any of them - the workbench
 * crashes before its `(async () => { ... })()` IIFE even reaches
 * the resolveConfiguration step.
 *
 * Worker blobs assembled inside the workbench reference
 * `vscode-file://vscode-app/...` URLs which the WKWebView resolver
 * does not honour for blob-loaded scripts. The same patch rewrites
 * those to `${origin}/...` so the dev-server (or Mountain's bundled
 * resource scheme handler in production) serves them.
 *
 * Idempotent - skip if the marker `__LAND_WEBVIEW_POLYFILLS__` is
 * already present.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "__LAND_WEBVIEW_POLYFILLS__";

const Polyfills = `
/* ${Marker} */
(function(){
	if (typeof window === "undefined") return;
	if (typeof window.requestIdleCallback !== "function") {
		window.requestIdleCallback = function(Callback, Options){
			var Timeout = (Options && Options.timeout) || 1;
			var Start = Date.now();
			return setTimeout(function(){
				Callback({
					didTimeout: Timeout <= 0,
					timeRemaining: function(){
						return Math.max(0, Timeout - (Date.now() - Start));
					},
				});
			}, Timeout);
		};
	}
	if (typeof window.cancelIdleCallback !== "function") {
		window.cancelIdleCallback = function(Id){ clearTimeout(Id); };
	}
	if (typeof window.queryLocalFonts !== "function") {
		window.queryLocalFonts = function(){ return Promise.resolve([]); };
	}
	if (typeof globalThis.__name !== "function") {
		globalThis.__name = function(Target, Value){
			Object.defineProperty(Target, "name", { value: Value, configurable: true });
			return Target;
		};
	}
	var OriginalBlob = globalThis.Blob;
	var NameShim = "var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,'name',{value:v,configurable:true});\\n";
	var Origin = window.location.origin;
	globalThis.Blob = function PatchedBlob(Parts, Options){
		if (Options && Options.type === "application/javascript" && Parts && Parts.length && typeof Parts[0] === "string") {
			Parts = Parts.map(function(Part){
				if (typeof Part !== "string") return Part;
				var Rewritten = Part
					.replace(/vscode-file:\\/\\/vscode-app\\/Static\\/Application\\/out\\//g, Origin + "/Static/Application/")
					.replace(/vscode-file:\\/\\/vscode-app\\//g, Origin + "/");
				return Rewritten;
			});
			Parts = [NameShim].concat(Parts);
		}
		return new OriginalBlob(Parts, Options);
	};
	globalThis.Blob.prototype = OriginalBlob.prototype;
})();
`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectWebViewPolyfills",
	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfills + Source };
	},
};

export default Plugin;
