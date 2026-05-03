const e = "/* __LAND_FORCE_TEXTAREA_INPUT__ */",
	o = /\/vs\/editor\/common\/config\/editorOptions\.js$/,
	r =
		/(register\(new EditorBooleanOption\(\s*44\s*\/\* EditorOption\.editContext \*\/\s*,\s*'editContext'\s*,\s*)true(\s*,)/,
	s = {
		Kind: "Transform",
		Name: "ForceTextAreaInput",
		Match: ({ Path: t }) => o.test(t),
		Transform({ Source: t }) {
			if (t.includes(e)) return { Kind: "Unchanged" };
			if (!r.test(t)) return { Kind: "Unchanged" };
			const n = t.replace(r, `${e} $1false$2`);
			return n === t
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: n };
		},
	};
var i = s;
export { i as default };
