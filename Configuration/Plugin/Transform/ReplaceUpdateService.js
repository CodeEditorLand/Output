var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const PathRegex =
	/vs\/platform\/update\/common\/(?:abstractUpdateService|updateService)\.js$/;
const ReExport =
	"export { UpdateService, AbstractUpdateService, UpdateService_default } from './CELNullUpdateService.js';\nexport { default } from './CELNullUpdateService.js';\n";
const Plugin = {
	Kind: "Transform",
	Name: "ReplaceUpdateService",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};
var ReplaceUpdateService_default = Plugin;
export { ReplaceUpdateService_default as default };
//# sourceMappingURL=ReplaceUpdateService.js.map
