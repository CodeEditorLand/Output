var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
const Plugin = {
  Kind: "Transform",
  Name: "InjectWebViewPolyfills",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfills + Source };
  }
};
var InjectWebViewPolyfills_default = Plugin;
export {
  InjectWebViewPolyfills_default as default
};
//# sourceMappingURL=InjectWebViewPolyfills.js.map
