/**
 * Inject a `globalThis.__CEL_OVERRIDE_CONFIG__` consult into the
 * `getValue(arg1, arg2)` method of every `IConfigurationService`
 * implementation under `vs/`.
 *
 * Two implementations exist in stock VS Code's `out/`:
 *
 *   1. `vs/platform/configuration/common/configurationService.js`
 *      (`class ConfigurationService extends Disposable`) - the
 *      platform-tier service used by tests and the headless server.
 *   2. `vs/workbench/services/configuration/browser/
 *      configurationService.js` (`class WorkspaceService extends
 *      Disposable`) - the workbench-tier service that adds workspace
 *      / folder layers on top of the platform tier; this is the one
 *      registered as `IConfigurationService` in the live workbench.
 *
 * Both classes have the same `getValue(arg1, arg2)` signature shape:
 *
 *   getValue(arg1, arg2) {
 *       const section = typeof arg1 === 'string' ? arg1 : undefined;
 *       const overrides = isConfigurationOverrides(arg1) ? arg1
 *           : isConfigurationOverrides(arg2) ? arg2 : {};
 *       return this.<configuration>.getValue(section, overrides[, undefined]);
 *   }
 *
 * The transform inserts a single conditional at the top of the
 * method body:
 *
 *   const __CEL_O = globalThis.__CEL_OVERRIDE_CONFIG__;
 *   if (__CEL_O && typeof arg1 === 'string'
 *       && Object.prototype.hasOwnProperty.call(__CEL_O, arg1)) {
 *       return __CEL_O[arg1];
 *   }
 *
 * Bag is opt-in. Empty / unset bag preserves upstream behaviour
 * verbatim. Wind populates the bag before any `getValue` runs (Wind's
 * `Layer.effect` for `IConfigurationService` writes its initial state
 * to the bag during boot, ahead of the workbench `startup()` call
 * `__CEL_SERVICES__` injection sits on).
 *
 * Idempotent via the `__LAND_CONFIG_OVERLAY__` marker.
 *
 * Why a guard on `typeof arg1 === 'string'`: VS Code calls
 * `getValue({ overrideIdentifier: 'jsonc' })` etc. with a sole
 * IConfigurationOverrides argument; the overlay path needs a string
 * key to look up. Non-string `arg1` falls through to upstream.
 */

import type { TransformPlugin } from "../../../Type.js";

const Marker = "/* __LAND_CONFIG_OVERLAY__ */";

const PathRegex =
	/\/vs\/(?:platform\/configuration\/common|workbench\/services\/configuration\/browser)\/configurationService\.js$/;

// Match the method header + the existing `const section = ...` line,
// since both occur unchanged across the two service variants. The
// overlay block is inserted between the opening `{` and the existing
// `const section` line. Capturing the indent (`(\s+)`) lets the
// inserted lines line up with `tsc`'s 4-space indent.
const Pattern =
	/(getValue\(arg1, arg2\) \{\n)(\s+)(const section = typeof arg1 === 'string')/;

const Replacement =
	`$1$2${Marker}\n` +
	`$2const __CEL_O = globalThis.__CEL_OVERRIDE_CONFIG__;\n` +
	`$2if (__CEL_O && typeof arg1 === 'string'\n` +
	`$2\t&& Object.prototype.hasOwnProperty.call(__CEL_O, arg1)) {\n` +
	`$2\treturn __CEL_O[arg1];\n` +
	`$2}\n` +
	`$2$3`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectConfigurationOverlay",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!Pattern.test(Source)) return { Kind: "Unchanged" };
		const Next = Source.replace(Pattern, Replacement);
		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
