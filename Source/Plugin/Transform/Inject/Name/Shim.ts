/**
 * Step 6: Inject `__name` / `__defProp` shim into the extension host iframe.
 *
 * The blob-backed web-worker the iframe spawns doesn't inherit the esbuild
 * helpers that `Dependency/out/**` expects. Without the shim the worker dies
 * with `ReferenceError: __name is not defined` before a single extension
 * activation fires.
 *
 * The shim is baked into the HTML blob literal next to the
 * `/*extensionHostWorker*\/` marker so it runs before any code the worker
 * itself imports.
 *
 * Side effect: modifying the inline `<script>` invalidates the
 * SHA256 hash baked into the iframe's `script-src` Content-Security-
 * Policy directive (`sha256-cl8ijlOzEe+0GRCQNJQu2k6nUQ0fAYNYIuuKEm72JDs=`),
 * so WKWebView refuses to execute the modified script with
 *   `Refused to execute a script because its hash, its nonce, or
 *    'unsafe-inline' does not appear in the script-src directive`.
 *
 * Recomputing the hash is brittle (it would need to track every char
 * of the post-shim script body, including future shim changes). Add
 * `'unsafe-inline'` to the iframe's `script-src` instead - Land's
 * threat model already permits inline scripts in the parent webview
 * (CSP `script-src 'unsafe-inline'` in `Source/pages/index.astro`)
 * so widening the same allowance for the extension-host iframe does
 * not change the security posture.
 */

import type { TransformPlugin } from "../../../Type.js";

const NameShim = `var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,"name",{value:v,configurable:true});`;

const IframeMarker = "`/*extensionHostWorker*/`,";

const IframeReplacement = "`/*extensionHostWorker*/${NameShim}`,";

const CSPScriptSrcMatcher = /script-src ([^;]+);/;

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "InjectNameShim",

	Match: ({ Path }) => /webWorkerExtensionHostIframe\.html$/.test(Path),

	Transform({ Source }) {
		if (!Source.includes(IframeMarker)) return { Kind: "Unchanged" };

		let Next = Source.replace(
			IframeMarker,

			IframeReplacement.replace("${NameShim}", NameShim),
		);

		// Add 'unsafe-inline' to script-src if not already present.
		const CSPMatch = Next.match(CSPScriptSrcMatcher);

		if (CSPMatch?.[1] && !CSPMatch[1].includes("'unsafe-inline'")) {
			Next = Next.replace(
				CSPScriptSrcMatcher,

				`script-src 'unsafe-inline' $1;`,
			);
		}

		return Next === Source
			? { Kind: "Unchanged" }

			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
