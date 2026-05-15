/**
 * Inject WebviewDebug: adds verbose console logging to the webview preloader
 * (vs/workbench/contrib/webview/browser/pre/index.html) for diagnosing
 * extension webview loading failures on WKWebView / Tauri.
 *
 * Adds a DEBUG_WV() helper and logs at every critical stage:
 *   - INDEX_BOOT     (page load, navigator.userAgent, protocols)
 *   - WORKER_READY   (service worker state)
 *   - SIGNAL_START   (signalReady entry, crypto.subtle, origin info)
 *   - SIGNAL_OK      (webview-ready message sent)
 *   - SIGNAL_FAIL    (any rejection during signalReady)
 *   - CONTENT_EVENT  (content/message/postMessage channels)
 *   - INNER_FRAME    (inner iframe lifecycle: fake.html load, write, ready)
 *
 * Idempotent via the __LAND_WEBVIEW_DEBUG_INJECT__ marker.
 */

import type { TransformPlugin } from "../../../../../Type.js";

const Marker = "/* __LAND_WEBVIEW_DEBUG_INJECT__ */";

const InjectPoint = "		const isSafari = (";

const DebugHelper = `/* __LAND_WEBVIEW_DEBUG_INJECT__ */
const WV_ID = (() => {
try {
return new URL(location.toString()).searchParams.get('id') || '';
} catch (_) { return ''; }
})();
const WV_T = () => \`[\${WV_ID}][\${(Date.now() - performance.timeOrigin).toFixed(0)}ms]\`;
const DEBUG_WV = (...A) => console.log('[WebviewDebug]', WV_T(), ...A.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)));
DEBUG_WV('INDEX_BOOT', { ua: navigator.userAgent.slice(0, 120), origin: location.origin, hostname: location.hostname, protocol: location.protocol, cryptoSubtle: !!globalThis.crypto?.subtle, crossOriginIsolated: globalThis.crossOriginIsolated, referrer: document.referrer });

`;

const PathRegex =
	/\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectWebviewDebugLogging",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}

		const Idx = Source.indexOf(InjectPoint);
		if (Idx < 0) {
			return { Kind: "Unchanged" };
		}

		let Next = Source.slice(0, Idx) + DebugHelper + Source.slice(Idx);

		// Patch the workerReady promise chain
		const SwRegister = "navigator.serviceWorker.register(swPath";
		if (Next.includes(SwRegister)) {
			Next = Next.replace(
				SwRegister,
				"DEBUG_WV('SW_REGISTER_ATTEMPT', { path: swPath }); navigator.serviceWorker.register(swPath",
			);
		}

		// Patch the .then after SW registration
		const SwThen = ".then(async registration => {";
		if (Next.includes(SwThen)) {
			const SwThenLog =
				".then(async registration => { DEBUG_WV('SW_REGISTER_OK', { controller: !!navigator.serviceWorker.controller });";
			Next = Next.replace(SwThen, SwThenLog);
		}

		// Patch the .catch after SW registration
		const SwCatch = ".catch(error => {";
		if (Next.includes(SwCatch)) {
			const SwCatchLog =
				".catch(error => { DEBUG_WV('SW_REGISTER_FAIL', error.message || String(error));";
			Next = Next.replace(SwCatch, SwCatchLog);
		}

		// Patch signalReady entry
		const SignalReady =
			"const start = (/** @type {string} */ parentOrigin) => {";
		if (Next.includes(SignalReady)) {
			const SignalStartLog = `const start = (/** @type {string} */ parentOrigin) => { DEBUG_WV('SIGNAL_START', { parentOrigin, hostname: location.hostname, origin: location.origin });`;
			Next = Next.replace(SignalReady, SignalStartLog);
		}

		// Patch post webview-ready
		const PostReady =
			"window.parent.postMessage({ target: ID, channel: 'webview-ready'";
		if (Next.includes(PostReady)) {
			const PostReadyLog =
				"DEBUG_WV('SIGNAL_OK', 'posting webview-ready'); window.parent.postMessage({ target: ID, channel: 'webview-ready'";
			Next = Next.replace(PostReady, PostReadyLog);
		}

		// Patch the throw at end of signalReady
		const ThrowMismatch =
			"throw new Error(\`Expected '\${parentOriginHash}' as hostname or subdomain!\`);";
		if (Next.includes(ThrowMismatch)) {
			const LogMismatch = `DEBUG_WV('SIGNAL_FAIL', { hashMismatch: true, hostname, parentOriginHash }); throw new Error(\`Expected '\${parentOriginHash}' as hostname or subdomain!\`);`;
			Next = Next.replace(ThrowMismatch, LogMismatch);
		}

		// Patch content/event handlers
		// Patch the REAL content handler (line ~958 — the async one that
		// actually processes extension HTML, NOT the unloadMonitor at ~375).
		const RealContentHandler = "hostMessaging.onMessage('content', async";
		if (Next.includes(RealContentHandler)) {
			const LogRealContent =
				"DEBUG_WV('REAL_CONTENT', 'content handler fired'); hostMessaging.onMessage('content', async";
			Next = Next.replace(RealContentHandler, LogRealContent);
		}

		// Patch after toContentHtml(data) returns — log processed HTML
		// characteristics so we can verify the content has a root element
		// and module script reference.
		const ContentProcessed = "const newDocument = toContentHtml(data);";
		if (Next.includes(ContentProcessed)) {
			const LogContentProcessed =
				"const newDocument = toContentHtml(data); DEBUG_WV('CONTENT_PROCESSED', { docLen: newDocument.length, hasRoot: newDocument.includes('id=\\\"root\\\"'), hasModuleScript: newDocument.includes('type=\\\"module\\\"'), snippet: newDocument.slice(0, 400) });";
			Next = Next.replace(ContentProcessed, LogContentProcessed);
		}

		// Also keep the old unloadMonitor log — it's harmless and the
		// data it receives (confirmBeforeClose) is still useful context.
		const OnMessageContent = "hostMessaging.onMessage('content'";
		if (Next.includes(OnMessageContent)) {
			const LogContent =
				"DEBUG_WV('CONTENT_EVENT', 'content handler invoked (unloadMonitor)'); hostMessaging.onMessage('content'";
			Next = Next.replace(OnMessageContent, LogContent);
		}

		// Patch inner frame fake.html load
		const FakeHtml = "newFrame.src = \`./fake.html";
		if (Next.includes(FakeHtml)) {
			const LogFake =
				"DEBUG_WV('INNER_FRAME_FAKE', 'setting src to fake.html'); newFrame.src = \`./fake.html";
			Next = Next.replace(FakeHtml, LogFake);
		}

		// Patch onFrameLoaded
		const OnFrameLoaded = "function onFrameLoaded(contentDocument) {";
		if (Next.includes(OnFrameLoaded)) {
			const LogFrameLoaded =
				"function onFrameLoaded(contentDocument) { DEBUG_WV('INNER_FRAME_LOADED', { readyState: contentDocument.readyState });";
			Next = Next.replace(OnFrameLoaded, LogFrameLoaded);
		}

		// Patch the contentDocument.write
		const WriteHtml = "contentDocument.write(newDocument);";
		if (Next.includes(WriteHtml)) {
			const LogWrite =
				"DEBUG_WV('INNER_WRITE', { htmlLen: newDocument.length }); contentDocument.write(newDocument);";
			Next = Next.replace(WriteHtml, LogWrite);
		}

		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
