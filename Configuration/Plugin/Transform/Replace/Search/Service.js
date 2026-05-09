const r = [
		"workbench/services/search/electron-browser/searchService.js",

		"workbench/services/search/browser/searchService.js",
	],

	c = new RegExp(`(?:${r.map((e) => e.replaceAll("/", "\\/")).join("|")})$`),

	o = `export { RemoteSearchService, LocalFileSearchWorkerClient } from '../common/CELSearchService.js';
`,
	s = {

		Kind: "Transform",

		Name: "ReplaceSearchService",

		Enabled: () => process.env.Electron === "true",

		Match: ({ Path: e }) => c.test(e),

		Transform() {

			return { Kind: "Rewrite", Source: o };
		},
	};

var n = s;

export { n as default };
