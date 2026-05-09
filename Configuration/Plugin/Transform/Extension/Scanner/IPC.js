const n =
		/workbench\/services\/extensions\/(?:electron-browser|browser)\/extensionsScannerService\.js$/,
	r = `export { ExtensionsScannerService, IExtensionsScannerService } from '../common/CELExtensionsScannerService.js';
`,
	o = {
		Kind: "Transform",

		Name: "ExtensionScannerIPC",

		Match: ({ Path: e }) => n.test(e),

		Transform() {
			return { Kind: "Rewrite", Source: r };
		},
	};

var s = o;

export { s as default };
