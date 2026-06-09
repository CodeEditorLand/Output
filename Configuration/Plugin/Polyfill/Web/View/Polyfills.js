var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

const Marker = "__LAND_WEBVIEW_POLYFILLS__";

function WebViewPolyfills() {

  if (typeof window === "undefined") return;

  if (typeof window.requestIdleCallback !== "function") {
    window.requestIdleCallback = (Callback, Options) => {
      const Timeout = Options && Options.timeout || 1;

      const Start = Date.now();

      return setTimeout(() => {
        Callback({
          didTimeout: Timeout <= 0,
          timeRemaining: /* @__PURE__ */ __name(() => Math.max(0, Timeout - (Date.now() - Start)), "timeRemaining")
        });
      }, Timeout);
    };
  }

  if (typeof window.cancelIdleCallback !== "function") {
    window.cancelIdleCallback = (Id) => {
      clearTimeout(Id);
    };
  }

  if (typeof window.queryLocalFonts !== "function") {
    window.queryLocalFonts = () => Promise.resolve([]);
  }

  const Land = globalThis;

  if (typeof Land["__name"] !== "function") {
    Land["__name"] = (Target, Value) => {
      Object.defineProperty(Target, "name", {
        value: Value,
        configurable: true
      });

      return Target;
    };
  }

  const OriginalBlob = globalThis.Blob;

  const NameShim = "var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,'name',{value:v,configurable:true});\n";

  const Origin = window.location.origin;

  const PatchedBlob = /* @__PURE__ */ __name(function PatchedBlob2(Parts, Options) {
    let RewrittenParts = Parts;

    if (Options && Options.type === "application/javascript" && Parts && Parts.length && typeof Parts[0] === "string") {
      RewrittenParts = Parts.map((Part) => {
        if (typeof Part !== "string") return Part;

        return Part.replace(
          /vscode-file:\/\/vscode-app\/Static\/Application\/out\//g,
          Origin + "/Static/Application/"
        ).replace(/vscode-file:\/\/vscode-app\//g, Origin + "/");
      });
      RewrittenParts = [NameShim, ...RewrittenParts];
    }
    return new OriginalBlob(RewrittenParts, Options);
  }, "PatchedBlob");
  PatchedBlob.prototype = OriginalBlob.prototype;
  globalThis.Blob = PatchedBlob;
}
__name(WebViewPolyfills, "WebViewPolyfills");
export {
  Marker,
  WebViewPolyfills as default
};
//# sourceMappingURL=Polyfills.js.map
