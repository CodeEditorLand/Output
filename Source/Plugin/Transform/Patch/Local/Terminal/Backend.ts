/**
 * Patch `LocalTerminalBackend._connectToDirectProxy` to bypass Electron's
 * MessagePort-based pty-host connection.
 *
 * Stock VS Code's terminal backend does this on every `createProcess` /
 * `attachToProcess` / `listProcesses` call:
 *
 * ```js
 * await this._connectToDirectProxy();
 * ```
 *
 * `_connectToDirectProxy` calls
 * `acquirePort('vscode:createPtyHostMessageChannel', ...)`. That helper
 * negotiates a MessagePort between the renderer and the Electron main
 * process so the renderer can talk to the pty-host utility process
 * directly (bypassing the shared-process IPC for high-frequency data).
 *
 * Tauri/WKWebView has no Electron utility process and no MessagePort
 * channel of that name. `acquirePort(...)` returns a Promise that NEVER
 * resolves, so every `_connectToDirectProxy()` await hangs forever. The
 * user clicks "open terminal" → `createProcess` waits → no PTY ever
 * spawns → terminal panel sits idle.
 *
 * This patch replaces `_connectToDirectProxy`'s body with a Land-specific
 * implementation that:
 *
 *   1. Uses `this._localPtyService` (the existing `mainProcessService.
 *      getChannel('localPty')` proxy that already routes correctly to
 *      Mountain's `localPty:*` IPC handlers) as the `_directProxy`.
 *   2. Subscribes to data/ready/exit/etc. process events on that same
 *      service so `LocalPty.handleData(...)` etc. fire as upstream
 *      expects.
 *   3. Resolves `_directProxyClientEventually` immediately so subsequent
 *      `_connectToDirectProxy()` awaits short-circuit.
 *
 * Functionally equivalent to upstream when the message-port path is
 * unavailable. Slightly slower per-data-event (one extra IPC hop) but
 * the alternative is "doesn't work at all".
 *
 * The IPC contract on Mountain side already exists - see
 * `Mountain/Source/IPC/WindServiceHandlers/mod.rs:1503` for
 * `localPty:spawn|createProcess|start` and the `localPty:*` family. The
 * pty data path emits via Tauri events to Sky too (see
 * `sky://terminal/*`); that's parallel and unaffected.
 */

import type { TransformPlugin } from "../../../../Type.js";

const Marker =
	"workbench/contrib/terminal/electron-browser/localTerminalBackend.js".replaceAll(
		"/",

		"\\/",
	);

const PathRegex = new RegExp(`${Marker}$`);

// Match the upstream `_connectToDirectProxy` method body. The method is
// compiled as `async _connectToDirectProxy() { ... }` with a single
// trailing `})` from the `acquirePort(...).then(port => { ... })` block.
// Anchor on the opening signature and the matching `})` that closes the
// `.then(port => { ... })` arrow, then the method's outer `}`.
const FunctionRegex =
	/async\s+_connectToDirectProxy\s*\(\s*\)\s*\{[\s\S]*?\n\s*\}\)\;\s*\n\s*\}/;

const LandBody = `async _connectToDirectProxy() {
		// [Land] Bypass acquirePort('vscode:createPtyHostMessageChannel');
		// Tauri has no Electron utility-process MessagePort. Route every
		// pty operation through the existing _localPtyService channel
		// proxy (mainProcessService.getChannel('localPty') → Mountain's
		// localPty:* IPC). See Output/Source/Plugin/Transform/
		// PatchLocalTerminalBackend.ts for rationale.
		if (this._directProxyClientEventually) {
			await this._directProxyClientEventually.p;
			return;
		}
		this._logService.debug('[Land] Starting pty host (localPtyService direct)');
		const directProxyClientEventually = new DeferredPromise();
		this._directProxyClientEventually = directProxyClientEventually;
		// Use _localPtyService AS the directProxy. Same interface, same
		// methods, same events - just one extra IPC hop per data frame.
		this._directProxy = this._localPtyService;
		this._directProxyDisposables.clear();
		const store = new DisposableStore();
		this._directProxyDisposables.value = store;
		// Forward process events from _localPtyService into the pty
		// instances. Mirrors the upstream attachments inside the
		// acquirePort then-callback.
		store.add(this._localPtyService.onProcessData(e => this._ptys.get(e.id)?.handleData(e.event)));
		store.add(this._localPtyService.onDidChangeProperty(e => this._ptys.get(e.id)?.handleDidChangeProperty(e.property)));
		store.add(this._localPtyService.onProcessExit(e => {
			const pty = this._ptys.get(e.id);
			if (pty) {
				pty.handleExit(e.event);
				pty.dispose();
				this._ptys.delete(e.id);
			}
		}));
		store.add(this._localPtyService.onProcessReady(e => this._ptys.get(e.id)?.handleReady(e.event)));
		store.add(this._localPtyService.onProcessReplay(e => this._ptys.get(e.id)?.handleReplay(e.event)));
		store.add(this._localPtyService.onProcessOrphanQuestion(e => this._ptys.get(e.id)?.handleOrphanQuestion()));
		store.add(this._localPtyService.onDidRequestDetach(e => this._onDidRequestDetach.fire(e)));
		// Resolve the deferred. Future _connectToDirectProxy() callers see
		// the resolved promise and return immediately. The 'client' value
		// we pass is unused by the rest of the codebase (only the
		// deferred's resolution state matters).
		directProxyClientEventually.complete(this._localPtyService);
		this._onPtyHostConnected.fire();
		// Eagerly fetch the backend's environment for memoization
		this.getEnvironment();
	}`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "PatchLocalTerminalBackend",

	Enabled: () => process.env["Electron"] === "true",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform({ Source }) {
		if (Source.includes("[Land] Bypass acquirePort")) {
			// Already patched (idempotent guard).
			return { Kind: "Unchanged" };
		}

		if (!FunctionRegex.test(Source)) {
			return { Kind: "Unchanged" };
		}

		return {
			Kind: "Rewrite",

			Source: Source.replace(FunctionRegex, LandBody),
		};
	},
};

export default Plugin;
