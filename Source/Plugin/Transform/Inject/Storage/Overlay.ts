/**
 * Inject a `globalThis.__CEL_OVERRIDE_STORAGE__` consult into
 * `AbstractStorageService.{get,getBoolean,getNumber,getObject}` so
 * Wind / Sky can seed in-memory storage state without writing to
 * IndexedDB.
 *
 * Anchor file: `vs/platform/storage/common/storage.js`. The class
 * `AbstractStorageService` is the base type; both
 * `BrowserStorageService` (workbench tier) and the platform-tier
 * variants extend it without overriding the typed read methods, so
 * patching the base catches every consumer.
 *
 * The composite key is `<scope>:<key>` where `scope` is the numeric
 * `StorageScope` enum value (0 = APPLICATION, 1 = PROFILE,
 * 2 = WORKSPACE). Sky / Wind populates the bag with these composite
 * keys before any `storageService.get()` runs.
 *
 * Each typed method gets the same overlay prefix; the bag's value
 * is the already-parsed type that the upstream method would return
 * (string for `get`, boolean for `getBoolean`, etc.). No re-parse on
 * read.
 *
 * Idempotent via `__LAND_STORAGE_OVERLAY__` marker.
 *
 * Why per-method instead of wrapping the underlying `IStorage`:
 * `getStorage(scope)` returns a different `IStorage` instance per
 * scope, lazily initialised after the IndexedDB connection settles.
 * Wrapping at the typed-method level skips the lazy init for cached
 * reads entirely.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "/* __LAND_STORAGE_OVERLAY__ */";

const PathRegex = /\/vs\/platform\/storage\/common\/storage\.js$/;

interface MethodPatch {
	readonly Method: "get" | "getBoolean" | "getNumber" | "getObject";
	readonly Pattern: RegExp;
}

const Patches: ReadonlyArray<MethodPatch> = [
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

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectStorageOverlay",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		let Next = Source;
		let Changed = false;
		for (const Patch of Patches) {
			if (!Patch.Pattern.test(Next)) continue;
			Next = Next.replace(
				Patch.Pattern,
				`$1$2${Marker}\n` +
					`$2const __CEL_O = globalThis.__CEL_OVERRIDE_STORAGE__;\n` +
					`$2if (__CEL_O) {\n` +
					`$2\tconst __CEL_K = scope + ':' + key;\n` +
					`$2\tif (Object.prototype.hasOwnProperty.call(__CEL_O, __CEL_K)) {\n` +
					`$2\t\treturn __CEL_O[__CEL_K];\n` +
					`$2\t}\n` +
					`$2}\n` +
					`$2$3`,
			);
			Changed = true;
		}

		if (!Changed) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
