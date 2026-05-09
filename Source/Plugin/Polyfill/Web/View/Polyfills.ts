/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # WebViewPolyfills polyfill
 *
 * Provides three browser-API polyfills + a `Blob` rewriter for Tauri's
 * macOS WKWebView, prepended to
 * `vs/code/electron-browser/workbench/workbench.js`:
 *
 *   - `window.requestIdleCallback` / `window.cancelIdleCallback` -
 *     stock VS Code reads them at module-eval time and crashes before the
 *     workbench IIFE reaches its `resolveConfiguration` step. We supply a
 *     `setTimeout`-backed shim with a `timeRemaining()` callback the
 *     workbench callers expect.
 *   - `window.queryLocalFonts` - a no-op `Promise.resolve([])` so callers
 *     that probe for installed fonts (e.g. terminal font picker) get an
 *     empty list instead of a `TypeError`.
 *   - `globalThis.__name` - esbuild's name-preservation helper, needed
 *     because the workbench bundle assumes the helper exists at evaluation
 *     time.
 *   - `Blob` constructor wrapper - rewrites `vscode-file://vscode-app/...`
 *     URLs inside JavaScript blobs to same-origin paths the dev-server
 *     (or Mountain's bundled resource scheme handler) can serve, AND
 *     prepends a `__defProp` / `__name` shim so workers that load via
 *     `URL.createObjectURL(blob)` don't crash on `__name is not defined`.
 *
 * Idempotent via the `__LAND_WEBVIEW_POLYFILLS__` marker.
 */

export const Marker = "__LAND_WEBVIEW_POLYFILLS__";

interface IdleCallbackOptions {

	timeout?: number;
}

interface IdleDeadline {

	didTimeout: boolean;

	timeRemaining: () => number;
}

type IdleCallback = (Deadline: IdleDeadline) => void;

declare global {

	interface Window {

		requestIdleCallback?: (
			Callback: IdleCallback,

			Options?: IdleCallbackOptions,
		) => number;

		cancelIdleCallback?: (Id: number) => void;

		queryLocalFonts?: () => Promise<unknown[]>;
	}
}

export default function WebViewPolyfills(): void {

	if (typeof window === "undefined") return;

	if (typeof window.requestIdleCallback !== "function") {

		window.requestIdleCallback = (
			Callback: IdleCallback,

			Options?: IdleCallbackOptions,
		): number => {

			const Timeout = (Options && Options.timeout) || 1;

			const Start = Date.now();

			return setTimeout(() => {
				Callback({
					didTimeout: Timeout <= 0,
					timeRemaining: () =>
						Math.max(0, Timeout - (Date.now() - Start)),
				});
			}, Timeout) as unknown as number;
		};
	}

	if (typeof window.cancelIdleCallback !== "function") {

		window.cancelIdleCallback = (Id: number): void => {

			clearTimeout(Id);
		};
	}

	if (typeof window.queryLocalFonts !== "function") {

		window.queryLocalFonts = (): Promise<unknown[]> => Promise.resolve([]);
	}

	const Land = globalThis as Record<string, unknown>;

	if (typeof Land["__name"] !== "function") {

		Land["__name"] = (Target: object, Value: string): object => {

			Object.defineProperty(Target, "name", {
				value: Value,
				configurable: true,
			});

			return Target;
		};
	}

	const OriginalBlob = globalThis.Blob;

	const NameShim =
		"var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,'name',{value:v,configurable:true});\n";

	const Origin = window.location.origin;

	const PatchedBlob = function PatchedBlob(
		Parts: BlobPart[],

		Options?: BlobPropertyBag,
	): Blob {

		let RewrittenParts: BlobPart[] = Parts;

		if (
			Options &&
			Options.type === "application/javascript" &&
			Parts &&
			Parts.length &&
			typeof Parts[0] === "string"
		) {

			RewrittenParts = Parts.map((Part) => {
				if (typeof Part !== "string") return Part;
				return Part.replace(
					/vscode-file:\/\/vscode-app\/Static\/Application\/out\//g,

					Origin + "/Static/Application/",
				).replace(/vscode-file:\/\/vscode-app\//g, Origin + "/");
			});

			RewrittenParts = [NameShim, ...RewrittenParts];
		}

		return new OriginalBlob(RewrittenParts, Options);
	} as unknown as typeof Blob;

	(PatchedBlob as unknown as { prototype: unknown }).prototype =
		OriginalBlob.prototype;

	globalThis.Blob = PatchedBlob;
}
