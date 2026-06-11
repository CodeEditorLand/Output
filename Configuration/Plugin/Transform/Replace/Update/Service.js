var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

const PathRegex = /vs\/platform\/update\/common\/(?:abstractUpdateService|updateService)\.js$/;

const ReExport = "export { UpdateService, AbstractUpdateService, UpdateService_default } from './CELNullUpdateService.js';\nexport { default } from './CELNullUpdateService.js';\n";

const Plugin = {

  Kind: "Transform",

  Name: "ReplaceUpdateService",

  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),

  Transform() {
    return { Kind: "Rewrite", Source: ReExport };
  }
};

var Service_default = Plugin;

export {
  Service_default as default
};

//# sourceMappingURL=Service.js.map
