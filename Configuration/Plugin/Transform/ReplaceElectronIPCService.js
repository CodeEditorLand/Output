const r = "platform/ipc/electron-browser/mainProcessService.js".replaceAll(
		"/",
		"\\/",
	),
	n = new RegExp(`${r}$`),
	o = `export { TauriMainProcessService as ElectronIPCMainProcessService } from './TauriMainProcessService.js';
`,
	s = {
		Kind: "Transform",
		Name: "ReplaceElectronIPCService",
		Enabled: () => process.env.Electron === "true",
		Match: ({ Path: e }) => n.test(e),
		Transform() {
			return { Kind: "Rewrite", Source: o };
		},
	};
var c = s;
export { c as default };
