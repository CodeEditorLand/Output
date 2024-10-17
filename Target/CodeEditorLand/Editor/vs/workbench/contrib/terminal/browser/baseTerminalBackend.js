import{Emitter as o}from"../../../../base/common/event.js";import{Disposable as m}from"../../../../base/common/lifecycle.js";import{Schemas as u}from"../../../../base/common/network.js";import{localize as r}from"../../../../nls.js";import"../../../../platform/terminal/common/terminal.js";import"../../../../platform/workspace/common/workspace.js";import"../../../services/configurationResolver/common/configurationResolver.js";import"../../../services/history/common/history.js";import{StatusbarAlignment as S}from"../../../services/statusbar/browser/statusbar.js";import{TerminalContribCommandId as _}from"../terminalContribExports.js";class J extends m{constructor(i,t,e,c,y,f){super();this._ptyHostController=i;this._logService=t;this._workspaceContextService=f;let n,s,l=!1;this._register(this._ptyHostController.onPtyHostExit(()=>{this._logService.error("The terminal's pty host process exited, the connection to all terminal processes was lost")})),this._register(this.onPtyHostConnected(()=>l=!0)),this._register(this._ptyHostController.onPtyHostStart(()=>{this._logService.debug("The terminal's pty host process is starting"),l&&(this._logService.trace("IPtyHostController#onPtyHostRestart"),this._onPtyHostRestart.fire()),s?.dispose(),this._isPtyHostUnresponsive=!1})),this._register(this._ptyHostController.onPtyHostUnresponsive(()=>{s?.dispose(),n||(n={name:r("ptyHostStatus","Pty Host Status"),text:`$(debug-disconnect) ${r("ptyHostStatus.short","Pty Host")}`,tooltip:r("nonResponsivePtyHost","The connection to the terminal's pty host process is unresponsive, terminals may stop working. Click to manually restart the pty host."),ariaLabel:r("ptyHostStatus.ariaLabel","Pty Host is unresponsive"),command:_.DeveloperRestartPtyHost,kind:"warning"}),s=y.addEntry(n,"ptyHostStatus",S.LEFT),this._isPtyHostUnresponsive=!0,this._onPtyHostUnresponsive.fire()})),this._register(this._ptyHostController.onPtyHostResponsive(()=>{this._isPtyHostUnresponsive&&(this._logService.info("The pty host became responsive again"),s?.dispose(),this._isPtyHostUnresponsive=!1,this._onPtyHostResponsive.fire())})),this._register(this._ptyHostController.onPtyHostRequestResolveVariables(async a=>{if(a.workspaceId!==this._workspaceContextService.getWorkspace().id)return;const p=e.getLastActiveWorkspaceRoot(u.file),d=p?this._workspaceContextService.getWorkspaceFolder(p)??void 0:void 0,v=a.originalText.map(H=>c.resolveAsync(d,H)),h=await Promise.all(v);this._ptyHostController.acceptPtyHostResolvedVariables(a.requestId,h)}))}_isPtyHostUnresponsive=!1;get isResponsive(){return!this._isPtyHostUnresponsive}_onPtyHostConnected=this._register(new o);onPtyHostConnected=this._onPtyHostConnected.event;_onPtyHostRestart=this._register(new o);onPtyHostRestart=this._onPtyHostRestart.event;_onPtyHostUnresponsive=this._register(new o);onPtyHostUnresponsive=this._onPtyHostUnresponsive.event;_onPtyHostResponsive=this._register(new o);onPtyHostResponsive=this._onPtyHostResponsive.event;restartPtyHost(){this._ptyHostController.restartPtyHost()}_deserializeTerminalState(i){if(i===void 0)return;const t=JSON.parse(i);if(!("version"in t)||!("state"in t)||!Array.isArray(t.state)){this._logService.warn("Could not revive serialized processes, wrong format",t);return}const e=t;if(e.version!==1){this._logService.warn(`Could not revive serialized processes, wrong version "${e.version}"`,e);return}return e.state}_getWorkspaceId(){return this._workspaceContextService.getWorkspace().id}}export{J as BaseTerminalBackend};
