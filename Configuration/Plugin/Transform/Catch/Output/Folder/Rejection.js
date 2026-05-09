const o = /\/workbench\/contrib\/output\/browser\/outputServices\.js$/,
	t = /(createFolder\([^)]*\)\.then\(\(\)\s*=>\s*(?:undefined|void\s+0)\))/g,
	a = {
		Kind: "Transform",

		Name: "CatchOutputFolderRejection",

		Match: ({ Path: e, Role: n }) => n === "app" && o.test(e),

		Transform({ Source: e }) {
			return (
				(t.lastIndex = 0),
				t.test(e)
					? ((t.lastIndex = 0),
						{
							Kind: "Rewrite",
							Source: e.replace(
								t,

								(n, r) => `${r}.catch(() => void 0)`,
							),
						})
					: { Kind: "Unchanged" }
			);
		},
	};

var s = a;

export { s as default };
