var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const NameShim = `var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,"name",{value:v,configurable:true});`;
const IframeMarker = "`/*extensionHostWorker*/`,";
const IframeReplacement = "`/*extensionHostWorker*/${NameShim}`,";
const Plugin = {
  Kind: "Transform",
  Name: "InjectNameShim",
  Match: /* @__PURE__ */ __name(({ Path }) => /webWorkerExtensionHostIframe\.html$/.test(Path), "Match"),
  Transform({ Source }) {
    if (!Source.includes(IframeMarker)) return { Kind: "Unchanged" };
    const Next = Source.replace(
      IframeMarker,
      IframeReplacement.replace("${NameShim}", NameShim)
    );
    return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
  }
};
var InjectNameShim_default = Plugin;
export {
  InjectNameShim_default as default
};
//# sourceMappingURL=InjectNameShim.js.map
