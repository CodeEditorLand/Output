const r = "/* __LAND_STORAGE_OVERLAY__ */",
	o = /\/vs\/platform\/storage\/common\/storage\.js$/,
	l = [
		{
			Method: "get",

			Pattern:
				/(get\(key, scope, fallbackValue\) \{\n)(\s+)(return this\.getStorage\(scope\)\?\.get\(key, fallbackValue\);)/,
		},

		{
			Method: "getBoolean",

			Pattern:
				/(getBoolean\(key, scope, fallbackValue\) \{\n)(\s+)(return this\.getStorage\(scope\)\?\.getBoolean\(key, fallbackValue\);)/,
		},

		{
			Method: "getNumber",

			Pattern:
				/(getNumber\(key, scope, fallbackValue\) \{\n)(\s+)(return this\.getStorage\(scope\)\?\.getNumber\(key, fallbackValue\);)/,
		},

		{
			Method: "getObject",

			Pattern:
				/(getObject\(key, scope, fallbackValue\) \{\n)(\s+)(return this\.getStorage\(scope\)\?\.getObject\(key, fallbackValue\);)/,
		},
	],
	c = {
		Kind: "Transform",

		Name: "InjectStorageOverlay",

		Match: ({ Path: e }) => o.test(e),

		Transform({ Source: e }) {
			if (e.includes(r)) return { Kind: "Unchanged" };

			let t = e,
				a = !1;

			for (const n of l)
				n.Pattern.test(t) &&
					((t = t.replace(
						n.Pattern,

						`$1$2${r}
$2const __CEL_O = globalThis.__CEL_OVERRIDE_STORAGE__;
$2if (__CEL_O) {
$2	const __CEL_K = scope + ':' + key;
$2	if (Object.prototype.hasOwnProperty.call(__CEL_O, __CEL_K)) {
$2		return __CEL_O[__CEL_K];
$2	}
$2}
$2$3`,
					)),
					(a = !0));
			return a ? { Kind: "Rewrite", Source: t } : { Kind: "Unchanged" };
		},
	};
var s = c;
export { s as default };
