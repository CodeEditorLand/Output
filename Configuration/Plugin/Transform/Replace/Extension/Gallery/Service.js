const r =
		/vs\/platform\/extensionManagement\/common\/extensionGalleryService\.js$/,
	n = `export { ExtensionGalleryService, AbstractExtensionGalleryService, ExtensionGalleryService_default } from './CELNullExtensionGalleryService.js';
export { default } from './CELNullExtensionGalleryService.js';

`,
	t = {
		Kind: "Transform",

		Name: "ReplaceExtensionGalleryService",

		Match: ({ Path: e }) => r.test(e),

		Transform() {
			return { Kind: "Rewrite", Source: n };
		},
	};

var o = t;

export { o as default };
