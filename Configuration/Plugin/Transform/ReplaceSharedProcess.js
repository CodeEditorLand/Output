var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker =
	"workbench/services/sharedProcess/electron-browser/sharedProcessService.js".replaceAll(
		"/",
		"\\/",
	);
const PathRegex = new RegExp(`${Marker}$`);
const Body = [
	`import { TauriMainProcessService } from '../../../../platform/ipc/electron-browser/TauriMainProcessService.js';`,
	``,
	`class SharedProcessService extends TauriMainProcessService {`,
	`  constructor(windowId, _logService) { super(windowId); }`,
	`  notifyRestored() { /* Land has no shared process; channels go direct to Mountain */ }`,
	`  async getConnection() { return this; /* self-satisfy the IPC Client shape */ }`,
	`}`,
	``,
	`export { SharedProcessService };`,
	`export default SharedProcessService;`,
	``,
].join("\n");
const Plugin = {
	Kind: "Transform",
	Name: "ReplaceSharedProcess",
	Enabled: /* @__PURE__ */ __name(
		() => process.env["Electron"] === "true",
		"Enabled",
	),
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: Body };
	},
};
var ReplaceSharedProcess_default = Plugin;
export { ReplaceSharedProcess_default as default };
//# sourceMappingURL=ReplaceSharedProcess.js.map
