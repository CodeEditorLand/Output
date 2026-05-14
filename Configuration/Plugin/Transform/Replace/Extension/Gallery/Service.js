var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const PathRegex =
	/vs\/platform\/extensionManagement\/common\/extensionGalleryService\.js$/;
const ReExport =
	"export { ExtensionGalleryService, AbstractExtensionGalleryService, ExtensionGalleryService_default } from './CELNullExtensionGalleryService.js';\nexport { default } from './CELNullExtensionGalleryService.js';\n";
const Plugin = {
	Kind: "Transform",
	Name: "ReplaceExtensionGalleryService",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};
var Service_default = Plugin;
export { Service_default as default };
//# sourceMappingURL=Service.js.map
