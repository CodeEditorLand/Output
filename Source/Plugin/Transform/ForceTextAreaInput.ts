/**
 * Flip the default of `editor.editContext` from `true` to `false` so
 * Monaco's keyboard input flows through the legacy `<textarea
 * class="inputarea">` rather than the modern EditContext-API
 * `<div class="native-edit-context">`.
 *
 * Why:
 *   Stock Monaco picks the EditContext code path whenever
 *   `globalThis.EditContext === 'function'`. WKWebView under Tauri
 *   advertises support but its implementation is flaky enough in
 *   practice that *focused* div-based EditContext inputs swallow
 *   keystrokes silently - the user clicks into the editor, sees the
 *   blinking cursor, types, and nothing appears. The `.native-edit-
 *   context` div is positioned with `z-index: -10` and gets the
 *   EditContext attached via `domNode.editContext = …`; a stacking-
 *   context interaction with our `InjectPartZIndexCSS` `isolation:
 *   isolate` rule, combined with WKWebView's incomplete EditContext
 *   implementation, leaves the div focusable but eventless.
 *
 *   The textarea path predates EditContext and is the codebase's
 *   battle-tested input route. Forcing it for our build trades the
 *   slight EditContext perf win for "input actually works".
 *
 * How:
 *   `vs/editor/common/config/editorOptions.js` registers the option as
 *
 *     editContext: register(new EditorBooleanOption(
 *         44 // EditorOption.editContext,
 *         'editContext',
 *         true,             // ← DEFAULT
 *         { description: ... }
 *     ))
 *
 *   Flip the third argument from `true` to `false`. User settings can
 *   still opt back in via `"editor.editContext": true` if WKWebView's
 *   EditContext implementation matures.
 *
 * Idempotent. Marker `__LAND_FORCE_TEXTAREA_INPUT__`.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "/* __LAND_FORCE_TEXTAREA_INPUT__ */";

const PathRegex = /\/vs\/editor\/common\/config\/editorOptions\.js$/;

// Capture: the registration call up to and including the `'editContext',`
// string literal, then the boolean default. Only flip when the literal
// is the upstream `true`; if a future upstream change moves the
// default elsewhere we no-op rather than corrupt the file.
const Pattern =
	/(register\(new EditorBooleanOption\(\s*44\s*\/\* EditorOption\.editContext \*\/\s*,\s*'editContext'\s*,\s*)true(\s*,)/;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ForceTextAreaInput",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!Pattern.test(Source)) return { Kind: "Unchanged" };
		const Next = Source.replace(Pattern, `${Marker} $1false$2`);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
