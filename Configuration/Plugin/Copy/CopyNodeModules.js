var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { join } from "node:path";
const DefaultPackages = [
  "@xterm/xterm",
  "@xterm/addon-clipboard",
  "@xterm/addon-image",
  "@xterm/addon-ligatures",
  "@xterm/addon-search",
  "@xterm/addon-serialize",
  "@xterm/addon-unicode11",
  "@xterm/addon-webgl",
  "@vscode/vscode-languagedetection",
  "vscode-textmate",
  "vscode-oniguruma"
];
const CopyNodeModules = /* @__PURE__ */ __name(({
  LocalRoot,
  DependencyRoot,
  Destination,
  Packages = DefaultPackages
}) => ({
  Kind: "Copy",
  Name: "CopyNodeModules",
  Entries: Packages.map((Pkg) => ({
    From: [join(LocalRoot, Pkg), join(DependencyRoot, Pkg)],
    To: join(Destination, Pkg),
    Recursive: true,
    Force: true
  }))
}), "CopyNodeModules");
var CopyNodeModules_default = CopyNodeModules;
export {
  CopyNodeModules,
  DefaultPackages,
  CopyNodeModules_default as default
};
//# sourceMappingURL=CopyNodeModules.js.map
