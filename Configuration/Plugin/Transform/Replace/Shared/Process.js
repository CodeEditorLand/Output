const r =
		"workbench/services/sharedProcess/electron-browser/sharedProcessService.js".replaceAll(
			"/",

			"\\/",
		),

	o = new RegExp(`${r}$`),

	s = `export { SharedProcessService } from '../../../../platform/ipc/electron-browser/CELSharedProcessService.js';
export { default } from '../../../../platform/ipc/electron-browser/CELSharedProcessService.js';

`,
	c = {

		Kind: "Transform",

		Name: "ReplaceSharedProcess",

		Enabled: () => process.env.Electron === "true",

		Match: ({ Path: e }) => o.test(e),

		Transform() {

			return { Kind: "Rewrite", Source: s };
		},
	};

var t = c;

export { t as default };
