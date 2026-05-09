const o = "/* __LAND_NODE_MODULES_PATH_PATCHED__ */",

	d = [
		["'vs/../../extensions'", "'vs/../extensions'"],

		["'vs/../../node_modules'", "'vs/../node_modules'"],

		["'vs/../../node_modules.asar'", "'vs/../node_modules.asar'"],

		[
			"'vs/../../node_modules.asar.unpacked'",

			"'vs/../node_modules.asar.unpacked'",
		],
	],

	t = {

		Kind: "Transform",

		Name: "RewriteNodeModulesPath",

		Match: ({ Path: e }) => /\/vs\/base\/common\/network\.js$/.test(e),

		Transform({ Source: e }) {

			if (e.includes(o)) return { Kind: "Unchanged" };

			let n = e,

				s = !1;

			for (const [r, a] of d)
				n.includes(r) && ((n = n.replace(r, a)), (s = !0));

			return s
				? {

						Kind: "Rewrite",

						Source:
							o +
							`
` +
							n,
					}

				: { Kind: "Unchanged" };
		},
	};

var i = t;

export { i as default };
