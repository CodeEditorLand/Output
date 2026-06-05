var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

const Marker = "workbench/services/sharedProcess/electron-browser/sharedProcessService.js".replaceAll(
  "/",

  "\\/"
);

const PathRegex = new RegExp(`${Marker}$`);

const ReExport = "export { SharedProcessService } from '../../../../platform/ipc/electron-browser/CELSharedProcessService.js';\nexport { default } from '../../../../platform/ipc/electron-browser/CELSharedProcessService.js';\n";

const Plugin = {

  Kind: "Transform",

  Name: "ReplaceSharedProcess",

  Enabled: /* @__PURE__ */ __name(() => process.env["Electron"] === "true", "Enabled"),

  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),

  Transform() {
    return { Kind: "Rewrite", Source: ReExport };
  }
};

var Process_default = Plugin;

export {
  Process_default as default
};

//# sourceMappingURL=Process.js.map
