var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker =
	"workbench/contrib/terminal/electron-browser/localTerminalBackend.js".replaceAll(
		"/",
		"\\/",
	);
const PathRegex = new RegExp(`${Marker}$`);
const FunctionRegex =
	/async\s+_connectToDirectProxy\s*\(\s*\)\s*\{[\s\S]*?\n\s*\}\)\;\s*\n\s*\}/;
const LandBody = `async _connectToDirectProxy() {
		// [Land] Bypass acquirePort('vscode:createPtyHostMessageChannel');
		// Tauri has no Electron utility-process MessagePort. Route every
		// pty operation through the existing _localPtyService channel
		// proxy (mainProcessService.getChannel('localPty') \u2192 Mountain's
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
const Plugin = {
	Kind: "Transform",
	Name: "PatchLocalTerminalBackend",
	Enabled: /* @__PURE__ */ __name(
		() => process.env["Electron"] === "true",
		"Enabled",
	),
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform({ Source }) {
		if (Source.includes("[Land] Bypass acquirePort")) {
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
var PatchLocalTerminalBackend_default = Plugin;
export { PatchLocalTerminalBackend_default as default };
//# sourceMappingURL=PatchLocalTerminalBackend.js.map
