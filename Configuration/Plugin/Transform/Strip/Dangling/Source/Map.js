var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { stat } from "node:fs/promises";
const SourceMapComment = /\n?\/\/[#@][ 	]*sourceMappingURL=[^\n]*\n?$/;
const HasSibling = /* @__PURE__ */ __name(async (Path) => {
  try {
    await stat(`${Path}.map`);
    return true;
  } catch {
    return false;
  }
}, "HasSibling");
const Plugin = {
  Kind: "Transform",
  Name: "StripDanglingSourceMap",
  Match: /* @__PURE__ */ __name(({ Path, Role }) => Role === "app" && /\.js$/.test(Path), "Match"),
  async Transform({ Path, Source }) {
    if (!SourceMapComment.test(Source)) return { Kind: "Unchanged" };
    if (await HasSibling(Path)) return { Kind: "Unchanged" };
    SourceMapComment.lastIndex = 0;
    const Next = Source.replace(SourceMapComment, "\n");
    return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
  }
};
var Map_default = Plugin;
export {
  Map_default as default
};
//# sourceMappingURL=Map.js.map
