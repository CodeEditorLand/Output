var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_DISABLE_WEBVIEW_SW__";
const ServiceWorkerExpression =
	"const disableServiceWorker = searchParams.has('disableServiceWorker');";
const ServiceWorkerReplacement = `/* ${Marker} */ const disableServiceWorker = true; void searchParams;`;
const HashThrowExpression =
	"throw new Error(`Expected '${parentOriginHash}' as hostname or subdomain!`);";
const HashThrowReplacement = `/* ${Marker} hash-soft */ console.warn(\`[Land] Webview parentOrigin hash mismatch (\${hostname} vs \${parentOriginHash}); proceeding anyway under Tauri\`); return start(parentOrigin);`;
const CryptoCheckExpression =
	"throw new Error(`'crypto.subtle' is not available so webviews will not work. This is likely because the editor is not running in a secure context (https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).`);";
const CryptoCheckReplacement = `/* ${Marker} crypto-soft */ console.warn(\`[Land] crypto.subtle unavailable; skipping parentOrigin hash check\`); return start(parentOrigin);`;
const PathRegex =
	/\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;
const Plugin = {
	Kind: "Transform",
	Name: "PatchWebviewIframeServiceWorker",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}
		let Next = Source;
		if (Next.includes(ServiceWorkerExpression)) {
			Next = Next.replace(
				ServiceWorkerExpression,
				ServiceWorkerReplacement,
			);
		}
		if (Next.includes(HashThrowExpression)) {
			Next = Next.replace(HashThrowExpression, HashThrowReplacement);
		}
		if (Next.includes(CryptoCheckExpression)) {
			Next = Next.replace(CryptoCheckExpression, CryptoCheckReplacement);
		}
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};
var PatchWebviewIframeServiceWorker_default = Plugin;
export { PatchWebviewIframeServiceWorker_default as default };
//# sourceMappingURL=PatchWebviewIframeServiceWorker.js.map
