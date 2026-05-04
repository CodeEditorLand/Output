var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_STORAGE_OVERLAY__ */";
const PathRegex = /\/vs\/platform\/storage\/common\/storage\.js$/;
const Patches = [
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
];
const Plugin = {
	Kind: "Transform",
	Name: "InjectStorageOverlay",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		let Next = Source;
		let Changed = false;
		for (const Patch of Patches) {
			if (!Patch.Pattern.test(Next)) continue;
			Next = Next.replace(
				Patch.Pattern,
				`$1$2${Marker}
$2const __CEL_O = globalThis.__CEL_OVERRIDE_STORAGE__;
$2if (__CEL_O) {
$2	const __CEL_K = scope + ':' + key;
$2	if (Object.prototype.hasOwnProperty.call(__CEL_O, __CEL_K)) {
$2		return __CEL_O[__CEL_K];
$2	}
$2}
$2$3`,
			);
			Changed = true;
		}
		if (!Changed) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Next };
	},
};
var InjectStorageOverlay_default = Plugin;
export { InjectStorageOverlay_default as default };
//# sourceMappingURL=InjectStorageOverlay.js.map
