var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import { readFile } from "node:fs/promises";

import { dirname, resolve } from "node:path";

const CSSImport = /import\s*(['"])([^'"]+\.css)\1\s*;?/g;
const Plugin = {
  Kind: "Transform",
  Name: "InlineCSSImport",
  Match: /* @__PURE__ */ __name(({ Path, Role }) => (Role === "app" || Role === "out" || Role === "out-build") && /\.js$/.test(Path), "Match"),
  async Transform({ Path: FilePath, Source }) {
    CSSImport.lastIndex = 0;
    if (!CSSImport.test(Source)) return { Kind: "Unchanged" };
    CSSImport.lastIndex = 0;
    const Directory = dirname(FilePath);
    const Tasks = [];
    Source.replace(CSSImport, (Match, _Quote, Specifier) => {
      Tasks.push(
        (async () => {
          const Resolved2 = resolve(Directory, Specifier);
          try {
            const CSS = await readFile(Resolved2, "utf8");
            const Encoded = JSON.stringify(CSS);
            const Tag = JSON.stringify(Specifier);
            return {
              From: Match,
              To: `((c)=>{const s=document.createElement("style");s.setAttribute("data-css",${Tag});s.textContent=c;document.head.appendChild(s);})(${Encoded});`
            };
          } catch {
            return {
              From: Match,
              To: `window._LOAD_CSS_WORKER?.(new URL(${JSON.stringify(
                Specifier
              )},import.meta.url).pathname);`
            };
          }
        })()
      );
      return Match;
    });
    const Resolved = await Promise.all(Tasks);
    let Rewritten = Source;
    for (const { From, To } of Resolved) {
      Rewritten = Rewritten.replace(From, () => To);
    }
    return { Kind: "Rewrite", Source: Rewritten };
  }
};
var Import_default = Plugin;
export {
  Import_default as default
};
//# sourceMappingURL=Import.js.map
