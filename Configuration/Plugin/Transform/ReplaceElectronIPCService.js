var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "platform/ipc/electron-browser/mainProcessService.js".replaceAll(
	"/",
	"\\/",
);
const PathRegex = new RegExp(`${Marker}$`);
const ReExport =
	"export { TauriMainProcessService as ElectronIPCMainProcessService } from './TauriMainProcessService.js';\n";
const Plugin = {
	Kind: "Transform",
	Name: "ReplaceElectronIPCService",
	Enabled: /* @__PURE__ */ __name(
		() => process.env["Electron"] === "true",
		"Enabled",
	),
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};
var ReplaceElectronIPCService_default = Plugin;
export { ReplaceElectronIPCService_default as default };
//# sourceMappingURL=ReplaceElectronIPCService.js.map
