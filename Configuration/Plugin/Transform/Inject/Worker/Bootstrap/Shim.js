var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

const Marker = "/* __LAND_WORKER_NAME_SHIM__ */";

const ShimLine = '`var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,"name",{value:v,configurable:true});`,';

const AnchorRegex = /(`\/\*\$\{label\}\*\/`,)([ 	]*\n[ 	]*)(`globalThis\._VSCODE_NLS_MESSAGES = )/;
const Plugin = {
  Kind: "Transform",
  Name: "InjectWorkerBootstrapShim",
  Match: /* @__PURE__ */ __name(({ Path }) => /\/vs\/platform\/webWorker\/browser\/webWorkerServiceImpl\.js$/.test(
    Path
  ), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    if (!AnchorRegex.test(Source)) return { Kind: "Unchanged" };
    const Next = Source.replace(
      AnchorRegex,
      (_M, Head, Indent, NlsHead) => `${Head}${Indent}${ShimLine}${Indent}${NlsHead}`
    );
    if (Next === Source) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Marker + "\n" + Next };
  }
};
var Shim_default = Plugin;
export {
  Shim_default as default
};
//# sourceMappingURL=Shim.js.map
