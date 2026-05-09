const r="workbench/contrib/terminal/electron-browser/localTerminalBackend.js".replaceAll("/","\\/"),s=new RegExp(`${r}$`),t=/async\s+_connectToDirectProxy\s*\(\s*\)\s*\{[\s\S]*?\n\s*\}\)\;\s*\n\s*\}/,n=`async _connectToDirectProxy() {
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
	}`,o={Kind:"Transform",Name:"PatchLocalTerminalBackend",Enabled:()=>process.env.Electron==="true",Match:({Path:e})=>s.test(e),Transform({Source:e}){return e.includes("[Land] Bypass acquirePort")?{Kind:"Unchanged"}:t.test(e)?{Kind:"Rewrite",Source:e.replace(t,n)}:{Kind:"Unchanged"}}};var i=o;export{i as default};
