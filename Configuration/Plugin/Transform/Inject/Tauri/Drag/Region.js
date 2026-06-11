var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import { readdirSync, readFileSync, statSync } from "node:fs";

import { join, resolve } from "node:path";

import TauriDragRegion from "../../../../Polyfill/Tauri/Drag/Region.js";

const Marker = "__LAND_TAURI_DRAG_REGION__";

const VSCodeRoot = resolve(process.cwd(), "Target/Microsoft/VSCode");

function CollectCSSFiles(Root) {

  const Out = [];

  const Walk = /* @__PURE__ */ __name((Dir) => {
    let Entries;

    try {
      Entries = readdirSync(Dir);
    } catch {
      return;
    }

    for (const Entry of Entries) {
      if (Entry === "node_modules") continue;

      const Full = join(Dir, Entry);

      let Stat;

      try {
        Stat = statSync(Full);
      } catch {
        continue;
      }

      if (Stat.isDirectory()) {
        Walk(Full);
      } else if (Entry.endsWith(".css")) {
        Out.push(Full);
      }
    }
  }, "Walk");

  Walk(Root);

  return Out;
}

__name(CollectCSSFiles, "CollectCSSFiles");

const RuleRegex = /([^{}]+)\{[^{}]*-webkit-app-region\s*:\s*(no-drag|drag)\b[^{}]*\}/g;

function ExtractSelectors() {

  const Drag2 = /* @__PURE__ */ new Set();

  const NoDrag2 = /* @__PURE__ */ new Set();

  const Files = CollectCSSFiles(VSCodeRoot);

  for (const File of Files) {
    let Text;

    try {
      Text = readFileSync(File, "utf8");
    } catch {
      continue;
    }

    if (!Text.includes("-webkit-app-region")) continue;

    let Match;

    RuleRegex.lastIndex = 0;

    while ((Match = RuleRegex.exec(Text)) !== null) {
      const Cleaned = (Match[1] ?? "").replace(/\/\*[\s\S]*?\*\//g, " ");
      const Selectors = Cleaned.split(",").map((Segment) => Segment.replace(/\s+/g, " ").trim()).filter(Boolean);
      const Bucket = Match[2] === "drag" ? Drag2 : NoDrag2;
      for (const Selector of Selectors) {
        Bucket.add(Selector);
      }
    }
  }
  return { Drag: Array.from(Drag2), NoDrag: Array.from(NoDrag2) };
}
__name(ExtractSelectors, "ExtractSelectors");
const { Drag, NoDrag } = ExtractSelectors();
console.log(
  `[InjectTauriDragRegion] Extracted ${Drag.length} drag + ${NoDrag.length} no-drag selectors from VS Code CSS`
);
const Bootstrap = `
/* ${Marker} */
globalThis.__LAND_DRAG_SELECTORS__ = ${JSON.stringify(Drag)};
globalThis.__LAND_NO_DRAG_SELECTORS__ = ${JSON.stringify(NoDrag)};
(${TauriDragRegion.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectTauriDragRegion",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Bootstrap + Source };
  }
};
var Region_default = Plugin;
export {
  Region_default as default
};
//# sourceMappingURL=Region.js.map
