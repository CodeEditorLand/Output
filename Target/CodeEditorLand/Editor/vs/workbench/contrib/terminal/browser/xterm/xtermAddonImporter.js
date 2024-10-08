var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { importAMDNodeModule } from "../../../../../amdX.js";
const importedAddons = /* @__PURE__ */ new Map();
class XtermAddonImporter {
  static {
    __name(this, "XtermAddonImporter");
  }
  async importAddon(name) {
    let addon = importedAddons.get(name);
    if (!addon) {
      switch (name) {
        case "clipboard":
          addon = (await importAMDNodeModule("@xterm/addon-clipboard", "lib/addon-clipboard.js")).ClipboardAddon;
          break;
        case "image":
          addon = (await importAMDNodeModule("@xterm/addon-image", "lib/addon-image.js")).ImageAddon;
          break;
        case "search":
          addon = (await importAMDNodeModule("@xterm/addon-search", "lib/addon-search.js")).SearchAddon;
          break;
        case "serialize":
          addon = (await importAMDNodeModule("@xterm/addon-serialize", "lib/addon-serialize.js")).SerializeAddon;
          break;
        case "unicode11":
          addon = (await importAMDNodeModule("@xterm/addon-unicode11", "lib/addon-unicode11.js")).Unicode11Addon;
          break;
        case "webgl":
          addon = (await importAMDNodeModule("@xterm/addon-webgl", "lib/addon-webgl.js")).WebglAddon;
          break;
      }
      if (!addon) {
        throw new Error(`Could not load addon ${name}`);
      }
      importedAddons.set(name, addon);
    }
    return addon;
  }
}
export {
  XtermAddonImporter
};
//# sourceMappingURL=xtermAddonImporter.js.map
