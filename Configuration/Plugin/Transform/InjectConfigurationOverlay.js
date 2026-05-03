const t = "/* __LAND_CONFIG_OVERLAY__ */",
	o =
		/\/vs\/(?:platform\/configuration\/common|workbench\/services\/configuration\/browser)\/configurationService\.js$/,
	e =
		/(getValue\(arg1, arg2\) \{\n)(\s+)(const section = typeof arg1 === 'string')/,
	a = `$1$2${t}
$2const __CEL_O = globalThis.__CEL_OVERRIDE_CONFIG__;
$2if (__CEL_O && typeof arg1 === 'string'
$2	&& Object.prototype.hasOwnProperty.call(__CEL_O, arg1)) {
$2	return __CEL_O[arg1];
$2}
$2$3`,
	i = {
		Kind: "Transform",
		Name: "InjectConfigurationOverlay",
		Match: ({ Path: n }) => o.test(n),
		Transform({ Source: n }) {
			if (n.includes(t)) return { Kind: "Unchanged" };
			if (!e.test(n)) return { Kind: "Unchanged" };
			const r = n.replace(e, a);
			return r === n
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: r };
		},
	};
var s = i;
export { s as default };
