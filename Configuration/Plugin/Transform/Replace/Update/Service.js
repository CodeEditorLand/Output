const t =
		/vs\/platform\/update\/common\/(?:abstractUpdateService|updateService)\.js$/,

	r = `export { UpdateService, AbstractUpdateService, UpdateService_default } from './CELNullUpdateService.js';
export { default } from './CELNullUpdateService.js';

`,
	a = {

		Kind: "Transform",

		Name: "ReplaceUpdateService",

		Match: ({ Path: e }) => t.test(e),

		Transform() {

			return { Kind: "Rewrite", Source: r };
		},
	};

var o = a;

export { o as default };
