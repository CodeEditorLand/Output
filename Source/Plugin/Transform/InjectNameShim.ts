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
 */

import type { TransformPlugin } from "../Type.js";

const NameShim = `var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,"name",{value:v,configurable:true});`;

const IframeMarker = "`/*extensionHostWorker*/`,";
const IframeReplacement = "`/*extensionHostWorker*/${NameShim}`,";

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectNameShim",
	Match: ({ Path }) => /webWorkerExtensionHostIframe\.html$/.test(Path),
	Transform({ Source }) {
		if (!Source.includes(IframeMarker)) return { Kind: "Unchanged" };
		const Next = Source.replace(
			IframeMarker,
			IframeReplacement.replace("${NameShim}", NameShim),
		);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
