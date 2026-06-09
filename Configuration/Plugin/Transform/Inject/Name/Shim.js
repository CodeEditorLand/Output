var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const NameShim = `var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,"name",{value:v,configurable:true});`;
const IframeMarker = "`/*extensionHostWorker*/`,";
const IframeReplacement = "`/*extensionHostWorker*/${NameShim}`,";
const CSPScriptSrcMatcher = /script-src ([^;]+);/;
const Plugin = {
  Kind: "Transform",
  Name: "InjectNameShim",
  Match: /* @__PURE__ */ __name(({ Path }) => /webWorkerExtensionHostIframe\.html$/.test(Path), "Match"),
  Transform({ Source }) {
    if (!Source.includes(IframeMarker)) return { Kind: "Unchanged" };
    let Next = Source.replace(
      IframeMarker,
      IframeReplacement.replace("${NameShim}", NameShim)
    );
    const CSPMatch = Next.match(CSPScriptSrcMatcher);
    if (CSPMatch && !CSPMatch[1].includes("'unsafe-inline'")) {
      Next = Next.replace(
        CSPScriptSrcMatcher,
        `script-src 'unsafe-inline' $1;`
      );
    }
    return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
  }
};
var Shim_default = Plugin;
export {
  Shim_default as default
};
//# sourceMappingURL=Shim.js.map
