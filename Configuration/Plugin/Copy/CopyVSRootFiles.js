var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { join } from "node:path";
const DefaultFiles = [
  "nls.keys.json",
  "nls.messages.js",
  "nls.messages.json",
  "nls.metadata.json",
  "bootstrap-esm.js",
  "bootstrap-import.js",
  "bootstrap-meta.js"
];
const CopyVSRootFiles = /* @__PURE__ */ __name(({
  OutputRoot,
  DependencyOutBuild,
  DependencyOut,
  Destination,
  Files = DefaultFiles
}) => ({
  Kind: "Copy",
  Name: "CopyVSRootFiles",
  Entries: Files.map((File) => ({
    From: [
      join(OutputRoot, File),
      join(DependencyOutBuild, File),
      join(DependencyOut, File)
    ],
    To: join(Destination, File)
  }))
}), "CopyVSRootFiles");
var CopyVSRootFiles_default = CopyVSRootFiles;
export {
  CopyVSRootFiles,
  CopyVSRootFiles_default as default
};
//# sourceMappingURL=CopyVSRootFiles.js.map
