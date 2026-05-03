const r = `// [Land] disabled by DisableUnusedServices transform.
export default {};
`,
	n = [
		"workbench/contrib/update/browser/update.contribution.js",
		"workbench/contrib/update/electron-browser/update.contribution.js",
		"workbench/contrib/issue/browser/issue.contribution.js",
		"workbench/contrib/issue/electron-browser/issue.contribution.js",
		"workbench/contrib/userDataSync/browser/userDataSync.contribution.js",
		"workbench/contrib/processExplorer/electron-browser/processExplorer.contribution.js",
	],
	o = new RegExp(
		`(?:${n.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})$`,
	),
	s = {
		Kind: "Transform",
		Name: "DisableUnusedServices",
		Match: ({ Path: e }) => o.test(e),
		Transform({ Source: e }) {
			return e.includes("[Land] disabled by DisableUnusedServices")
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: r };
		},
	};
var t = s;
export { t as default };
