var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const PathRegex =
	/workbench\/services\/extensions\/(?:electron-browser|browser)\/extensionsScannerService\.js$/;
const ReExport =
	"export { ExtensionsScannerService, IExtensionsScannerService } from '../common/CELExtensionsScannerService.js';\n";
const Plugin = {
	Kind: "Transform",
	Name: "ExtensionScannerIPC",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};
var ExtensionScannerIPC_default = Plugin;
export { ExtensionScannerIPC_default as default };
//# sourceMappingURL=ExtensionScannerIPC.js.map
