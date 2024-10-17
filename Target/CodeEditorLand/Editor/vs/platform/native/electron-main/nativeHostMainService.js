var U=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var C=(y,m,e,i)=>{for(var n=i>1?void 0:i?L(m,e):m,o=y.length-1,r;o>=0;o--)(r=y[o])&&(n=(i?r(m,e,n):r(n))||n);return i&&n&&U(m,e,n),n},d=(y,m)=>(e,i)=>m(e,i,y);import*as O from"fs";import{exec as N}from"child_process";import{app as S,BrowserWindow as B,clipboard as w,Menu as W,powerMonitor as z,screen as b,shell as u,webContents as $}from"electron";import{arch as V,cpus as _,freemem as K,loadavg as q,platform as G,release as j,totalmem as Y,type as J}from"os";import{promisify as T}from"util";import{memoize as Q}from"../../../base/common/decorators.js";import{Emitter as X,Event as t}from"../../../base/common/event.js";import{Disposable as Z}from"../../../base/common/lifecycle.js";import{matchesSomeScheme as ee,Schemas as A}from"../../../base/common/network.js";import{dirname as D,join as l,posix as ie,resolve as ne,win32 as oe}from"../../../base/common/path.js";import{isLinux as R,isMacintosh as re,isWindows as h}from"../../../base/common/platform.js";import"../../../base/common/types.js";import{URI as P}from"../../../base/common/uri.js";import{realpath as te}from"../../../base/node/extpath.js";import{virtualMachineHint as de}from"../../../base/node/id.js";import{Promises as k,SymlinkSupport as F}from"../../../base/node/pfs.js";import{findFreePort as se}from"../../../base/node/ports.js";import{localize as c}from"../../../nls.js";import"../../action/common/action.js";import"../../dialogs/common/dialogs.js";import{IDialogMainService as ae}from"../../dialogs/electron-main/dialogMainService.js";import{IEnvironmentMainService as ce}from"../../environment/electron-main/environmentMainService.js";import{createDecorator as we,IInstantiationService as me}from"../../instantiation/common/instantiation.js";import{ILifecycleMainService as ue}from"../../lifecycle/electron-main/lifecycleMainService.js";import{ILogService as le}from"../../log/common/log.js";import"../common/native.js";import{IProductService as pe}from"../../product/common/productService.js";import"../../theme/common/themeService.js";import{IThemeMainService as fe}from"../../theme/electron-main/themeMainService.js";import{defaultWindowState as ve}from"../../window/electron-main/window.js";import"../../window/common/window.js";import{defaultBrowserWindowOptions as he,IWindowsMainService as ye,OpenContext as x}from"../../windows/electron-main/windows.js";import{isWorkspaceIdentifier as ge,toWorkspaceIdentifier as Ie}from"../../workspace/common/workspace.js";import{IWorkspacesManagementMainService as Se}from"../../workspaces/electron-main/workspacesManagementMainService.js";import{VSBuffer as We}from"../../../base/common/buffer.js";import{hasWSLFeatureInstalled as be}from"../../remote/node/wsl.js";import{WindowProfiler as Pe}from"../../profiling/electron-main/windowProfiling.js";import"../../profiling/common/profiling.js";import{IAuxiliaryWindowsMainService as Me}from"../../auxiliaryWindow/electron-main/auxiliaryWindows.js";import"../../auxiliaryWindow/electron-main/auxiliaryWindow.js";import{CancellationError as H}from"../../../base/common/errors.js";import{IConfigurationService as Oe}from"../../configuration/common/configuration.js";import{IProxyAuthService as xe}from"./auth.js";import{IRequestService as Ee}from"../../request/common/request.js";import{randomPath as Ce}from"../../../base/common/extpath.js";const Qi=we("nativeHostMainService");let M=class extends Z{constructor(e,i,n,o,r,s,g,I,a,p,f,v,E){super();this.windowsMainService=e;this.auxiliaryWindowsMainService=i;this.dialogMainService=n;this.lifecycleMainService=o;this.environmentMainService=r;this.logService=s;this.productService=g;this.themeMainService=I;this.workspacesManagementMainService=a;this.configurationService=p;this.requestService=f;this.proxyAuthService=v;this.instantiationService=E}get windowId(){throw new Error("Not implemented in electron-main")}onDidOpenMainWindow=t.map(this.windowsMainService.onDidOpenWindow,e=>e.id);onDidTriggerWindowSystemContextMenu=t.any(t.map(this.windowsMainService.onDidTriggerSystemContextMenu,({window:e,x:i,y:n})=>({windowId:e.id,x:i,y:n})),t.map(this.auxiliaryWindowsMainService.onDidTriggerSystemContextMenu,({window:e,x:i,y:n})=>({windowId:e.id,x:i,y:n})));onDidMaximizeWindow=t.any(t.map(this.windowsMainService.onDidMaximizeWindow,e=>e.id),t.map(this.auxiliaryWindowsMainService.onDidMaximizeWindow,e=>e.id));onDidUnmaximizeWindow=t.any(t.map(this.windowsMainService.onDidUnmaximizeWindow,e=>e.id),t.map(this.auxiliaryWindowsMainService.onDidUnmaximizeWindow,e=>e.id));onDidChangeWindowFullScreen=t.any(t.map(this.windowsMainService.onDidChangeFullScreen,e=>({windowId:e.window.id,fullscreen:e.fullscreen})),t.map(this.auxiliaryWindowsMainService.onDidChangeFullScreen,e=>({windowId:e.window.id,fullscreen:e.fullscreen})));onDidBlurMainWindow=t.filter(t.fromNodeEventEmitter(S,"browser-window-blur",(e,i)=>i.id),e=>!!this.windowsMainService.getWindowById(e));onDidFocusMainWindow=t.any(t.map(t.filter(t.map(this.windowsMainService.onDidChangeWindowsCount,()=>this.windowsMainService.getLastActiveWindow()),e=>!!e),e=>e.id),t.filter(t.fromNodeEventEmitter(S,"browser-window-focus",(e,i)=>i.id),e=>!!this.windowsMainService.getWindowById(e)));onDidBlurMainOrAuxiliaryWindow=t.any(this.onDidBlurMainWindow,t.map(t.filter(t.fromNodeEventEmitter(S,"browser-window-blur",(e,i)=>this.auxiliaryWindowsMainService.getWindowByWebContents(i.webContents)),e=>!!e),e=>e.id));onDidFocusMainOrAuxiliaryWindow=t.any(this.onDidFocusMainWindow,t.map(t.filter(t.fromNodeEventEmitter(S,"browser-window-focus",(e,i)=>this.auxiliaryWindowsMainService.getWindowByWebContents(i.webContents)),e=>!!e),e=>e.id));onDidResumeOS=t.fromNodeEventEmitter(z,"resume");onDidChangeColorScheme=this.themeMainService.onDidChangeColorScheme;_onDidChangePassword=this._register(new X);onDidChangePassword=this._onDidChangePassword.event;onDidChangeDisplay=t.debounce(t.any(t.filter(t.fromNodeEventEmitter(b,"display-metrics-changed",(e,i,n)=>n),e=>!(Array.isArray(e)&&e.length===1&&e[0]==="workArea")),t.fromNodeEventEmitter(b,"display-added"),t.fromNodeEventEmitter(b,"display-removed")),()=>{},100);async getWindows(e,i){const n=this.windowsMainService.getWindows().map(r=>({id:r.id,workspace:r.openedWorkspace??Ie(r.backupPath,r.isExtensionDevelopmentHost),title:r.win?.getTitle()??"",filename:r.getRepresentedFilename(),dirty:r.isDocumentEdited()})),o=[];return i.includeAuxiliaryWindows&&o.push(...this.auxiliaryWindowsMainService.getWindows().map(r=>({id:r.id,parentId:r.parentId,title:r.win?.getTitle()??"",filename:r.getRepresentedFilename()}))),[...n,...o]}async getWindowCount(e){return this.windowsMainService.getWindowCount()}async getActiveWindowId(e){const i=this.windowsMainService.getFocusedWindow()||this.windowsMainService.getLastActiveWindow();if(i)return i.id}async getActiveWindowPosition(){const e=this.windowsMainService.getFocusedWindow()||this.windowsMainService.getLastActiveWindow();if(e)return e.getBounds()}openWindow(e,i,n){return Array.isArray(i)?this.doOpenWindow(e,i,n):this.doOpenEmptyWindow(e,i)}async doOpenWindow(e,i,n=Object.create(null)){i.length>0&&await this.windowsMainService.open({context:x.API,contextWindowId:e,urisToOpen:i,cli:this.environmentMainService.args,forceNewWindow:n.forceNewWindow,forceReuseWindow:n.forceReuseWindow,preferNewWindow:n.preferNewWindow,diffMode:n.diffMode,mergeMode:n.mergeMode,addMode:n.addMode,gotoLineMode:n.gotoLineMode,noRecentEntry:n.noRecentEntry,waitMarkerFileURI:n.waitMarkerFileURI,remoteAuthority:n.remoteAuthority||void 0,forceProfile:n.forceProfile,forceTempProfile:n.forceTempProfile})}async doOpenEmptyWindow(e,i){await this.windowsMainService.openEmptyWindow({context:x.API,contextWindowId:e},i)}async isFullScreen(e,i){return this.windowById(i?.targetWindowId,e)?.isFullScreen??!1}async toggleFullScreen(e,i){this.windowById(i?.targetWindowId,e)?.toggleFullScreen()}async handleTitleDoubleClick(e,i){this.windowById(i?.targetWindowId,e)?.handleTitleDoubleClick()}async getCursorScreenPoint(e){const i=b.getCursorScreenPoint(),n=b.getDisplayNearestPoint(i);return{point:i,display:n.bounds}}async isMaximized(e,i){return this.windowById(i?.targetWindowId,e)?.win?.isMaximized()??!1}async maximizeWindow(e,i){this.windowById(i?.targetWindowId,e)?.win?.maximize()}async unmaximizeWindow(e,i){this.windowById(i?.targetWindowId,e)?.win?.unmaximize()}async minimizeWindow(e,i){this.windowById(i?.targetWindowId,e)?.win?.minimize()}async moveWindowTop(e,i){this.windowById(i?.targetWindowId,e)?.win?.moveTop()}async positionWindow(e,i,n){const o=this.windowById(n?.targetWindowId,e);if(o?.win){if(o.win.isFullScreen()){const r=t.toPromise(t.once(t.fromNodeEventEmitter(o.win,"leave-full-screen")));o.win.setFullScreen(!1),await r}o.win.setBounds(i)}}async updateWindowControls(e,i){this.windowById(i?.targetWindowId,e)?.updateWindowControls(i)}async focusWindow(e,i){this.windowById(i?.targetWindowId,e)?.focus({force:i?.force??!1})}async setMinimumSize(e,i,n){const o=this.codeWindowById(e);if(o?.win){const[r,s]=o.win.getSize(),[g,I]=o.win.getMinimumSize(),[a,p]=[i??g,n??I],[f,v]=[Math.max(r,a),Math.max(s,p)];(g!==a||I!==p)&&o.win.setMinimumSize(a,p),(r!==f||s!==v)&&o.win.setSize(f,v)}}async saveWindowSplash(e,i){this.themeMainService.saveWindowSplash(e,i)}async installShellCommand(e){const{source:i,target:n}=await this.getShellCommandLink();try{const{symbolicLink:o}=await F.stat(i);if(o&&!o.dangling){const r=await te(i);if(n===r)return}await O.promises.unlink(i)}catch(o){if(o.code!=="ENOENT")throw o}try{await O.promises.symlink(n,i)}catch(o){if(o.code!=="EACCES"&&o.code!=="ENOENT")throw o;const{response:r}=await this.showMessageBox(e,{type:"info",message:c("warnEscalation","{0} will now prompt with 'osascript' for Administrator privileges to install the shell command.",this.productService.nameShort),buttons:[c({key:"ok",comment:["&& denotes a mnemonic"]},"&&OK"),c("cancel","Cancel")]});if(r===1)throw new H;try{const s=`osascript -e "do shell script \\"mkdir -p /usr/local/bin && ln -sf '${n}' '${i}'\\" with administrator privileges"`;await T(N)(s)}catch{throw new Error(c("cantCreateBinFolder","Unable to install the shell command '{0}'.",i))}}}async uninstallShellCommand(e){const{source:i}=await this.getShellCommandLink();try{await O.promises.unlink(i)}catch(n){switch(n.code){case"EACCES":{const{response:o}=await this.showMessageBox(e,{type:"info",message:c("warnEscalationUninstall","{0} will now prompt with 'osascript' for Administrator privileges to uninstall the shell command.",this.productService.nameShort),buttons:[c({key:"ok",comment:["&& denotes a mnemonic"]},"&&OK"),c("cancel","Cancel")]});if(o===1)throw new H;try{const r=`osascript -e "do shell script \\"rm '${i}'\\" with administrator privileges"`;await T(N)(r)}catch{throw new Error(c("cantUninstall","Unable to uninstall the shell command '{0}'.",i))}break}case"ENOENT":break;default:throw n}}}async getShellCommandLink(){const e=ne(this.environmentMainService.appRoot,"bin","code"),i=`/usr/local/bin/${this.productService.applicationName}`;if(!await k.exists(e))throw new Error(c("sourceMissing","Unable to find shell script in '{0}'",e));return{source:i,target:e}}async showMessageBox(e,i){const n=this.windowById(i?.targetWindowId,e);return this.dialogMainService.showMessageBox(i,n?.win??void 0)}async showSaveDialog(e,i){const n=this.windowById(i?.targetWindowId,e);return this.dialogMainService.showSaveDialog(i,n?.win??void 0)}async showOpenDialog(e,i){const n=this.windowById(i?.targetWindowId,e);return this.dialogMainService.showOpenDialog(i,n?.win??void 0)}async pickFileFolderAndOpen(e,i){const n=await this.dialogMainService.pickFileFolder(i);n&&await this.doOpenPicked(await Promise.all(n.map(async o=>await F.existsDirectory(o)?{folderUri:P.file(o)}:{fileUri:P.file(o)})),i,e)}async pickFolderAndOpen(e,i){const n=await this.dialogMainService.pickFolder(i);n&&await this.doOpenPicked(n.map(o=>({folderUri:P.file(o)})),i,e)}async pickFileAndOpen(e,i){const n=await this.dialogMainService.pickFile(i);n&&await this.doOpenPicked(n.map(o=>({fileUri:P.file(o)})),i,e)}async pickWorkspaceAndOpen(e,i){const n=await this.dialogMainService.pickWorkspace(i);n&&await this.doOpenPicked(n.map(o=>({workspaceUri:P.file(o)})),i,e)}async doOpenPicked(e,i,n){await this.windowsMainService.open({context:x.DIALOG,contextWindowId:n,cli:this.environmentMainService.args,urisToOpen:e,forceNewWindow:i.forceNewWindow})}async showItemInFolder(e,i){u.showItemInFolder(i)}async setRepresentedFilename(e,i,n){this.windowById(n?.targetWindowId,e)?.setRepresentedFilename(i)}async setDocumentEdited(e,i,n){this.windowById(n?.targetWindowId,e)?.setDocumentEdited(i)}async openExternal(e,i,n){this.environmentMainService.unsetSnapExportedVariables();try{ee(i,A.http,A.https)?this.openExternalBrowser(i,n):u.openExternal(i)}finally{this.environmentMainService.restoreSnapExportedVariables()}return!0}async openExternalBrowser(e,i){const n=i??this.configurationService.getValue("workbench.externalBrowser");if(!n)return u.openExternal(e);if((n.includes(ie.sep)||n.includes(oe.sep))&&!await k.exists(n))return this.logService.error(`Configured external browser path does not exist: ${n}`),u.openExternal(e);try{const{default:o}=await import("open"),r=await o(e,{app:{name:Object.hasOwn(o.apps,n)?o.apps[n]:n}});h||r.stderr?.once("data",s=>(this.logService.error(`Error openening external URL '${e}' using browser '${n}': ${s.toString()}`),u.openExternal(e)))}catch(o){return this.logService.error(`Unable to open external URL '${e}' using browser '${n}' due to ${o}.`),u.openExternal(e)}}moveItemToTrash(e,i){return u.trashItem(i)}async isAdmin(){let e;return h?e=(await import("native-is-elevated")).default():e=process.getuid?.()===0,e}async writeElevated(e,i,n,o){const r=await import("@vscode/sudo-prompt"),s=Ce(this.environmentMainService.userDataPath,"code-elevated");await k.writeFile(s,JSON.stringify({source:i.fsPath,target:n.fsPath}));try{await new Promise((g,I)=>{const a=[`"${this.cliPath}"`];o?.unlock&&a.push("--file-chmod"),a.push("--file-write",`"${s}"`);const p={name:this.productService.nameLong.replace("-",""),icns:re&&this.environmentMainService.isBuilt?l(D(this.environmentMainService.appRoot),`${this.productService.nameShort}.icns`):void 0};this.logService.trace(`[sudo-prompt] running command: ${a.join(" ")}`),r.exec(a.join(" "),p,(f,v,E)=>{v&&this.logService.trace(`[sudo-prompt] received stdout: ${v}`),E&&this.logService.error(`[sudo-prompt] received stderr: ${E}`),f?I(f):g(void 0)})})}finally{await O.promises.unlink(s)}}async isRunningUnderARM64Translation(){return R||h?!1:S.runningUnderARM64Translation}get cliPath(){return h?this.environmentMainService.isBuilt?l(D(process.execPath),"bin",`${this.productService.applicationName}.cmd`):l(this.environmentMainService.appRoot,"scripts","code-cli.bat"):R?this.environmentMainService.isBuilt?l(D(process.execPath),"bin",`${this.productService.applicationName}`):l(this.environmentMainService.appRoot,"scripts","code-cli.sh"):this.environmentMainService.isBuilt?l(this.environmentMainService.appRoot,"bin","code"):l(this.environmentMainService.appRoot,"scripts","code-cli.sh")}async getOSStatistics(){return{totalmem:Y(),freemem:K(),loadavg:q()}}async getOSProperties(){return{arch:V(),platform:G(),release:j(),type:J(),cpus:_()}}async getOSVirtualMachineHint(){return de.value()}async getOSColorScheme(){return this.themeMainService.getColorScheme()}async hasWSLFeatureInstalled(){return h&&be()}async getScreenshot(e,i){return(await this.windowById(i?.targetWindowId,e)?.win?.webContents.capturePage())?.toJPEG(95)}async getProcessId(e){return this.windowById(void 0,e)?.win?.webContents.getOSProcessId()}async killProcess(e,i,n){process.kill(i,n)}async readClipboardText(e,i){return w.readText(i)}async readImage(){return w.readImage().toPNG()}async writeClipboardText(e,i,n){return w.writeText(i,n)}async readClipboardFindText(e){return w.readFindText()}async writeClipboardFindText(e,i){return w.writeFindText(i)}async writeClipboardBuffer(e,i,n,o){return w.writeBuffer(i,Buffer.from(n.buffer),o)}async readClipboardBuffer(e,i){return We.wrap(w.readBuffer(i))}async hasClipboard(e,i,n){return w.has(i,n)}async newWindowTab(){await this.windowsMainService.open({context:x.API,cli:this.environmentMainService.args,forceNewTabbedWindow:!0,forceEmpty:!0,remoteAuthority:this.environmentMainService.args.remote||void 0})}async showPreviousWindowTab(){W.sendActionToFirstResponder("selectPreviousTab:")}async showNextWindowTab(){W.sendActionToFirstResponder("selectNextTab:")}async moveWindowTabToNewWindow(){W.sendActionToFirstResponder("moveTabToNewWindow:")}async mergeAllWindowTabs(){W.sendActionToFirstResponder("mergeAllWindows:")}async toggleWindowTabsBar(){W.sendActionToFirstResponder("toggleTabBar:")}async updateTouchBar(e,i){this.codeWindowById(e)?.updateTouchBar(i)}async notifyReady(e){this.codeWindowById(e)?.setReady()}async relaunch(e,i){return this.lifecycleMainService.relaunch(i)}async reload(e,i){const n=this.codeWindowById(e);if(n){if(ge(n.openedWorkspace)){const o=n.openedWorkspace.configPath;if(o.scheme===A.file&&(await this.workspacesManagementMainService.resolveLocalWorkspace(o))?.transient)return this.openWindow(n.id,{forceReuseWindow:!0})}return this.lifecycleMainService.reload(n,i?.disableExtensions!==void 0?{_:[],"disable-extensions":i.disableExtensions}:void 0)}}async closeWindow(e,i){return this.windowById(i?.targetWindowId,e)?.win?.close()}async quit(e){const i=this.windowsMainService.getLastActiveWindow();i?.isExtensionDevelopmentHost&&this.windowsMainService.getWindowCount()>1&&i.win?i.win.close():this.lifecycleMainService.quit()}async exit(e,i){await this.lifecycleMainService.kill(i)}async resolveProxy(e,i){if(this.environmentMainService.extensionTestsLocationURI){const r=this.configurationService.getValue("integration-test.http.proxy");if(r)return r}return this.codeWindowById(e)?.win?.webContents?.session?.resolveProxy(i)}async lookupAuthorization(e,i){return this.proxyAuthService.lookupAuthorization(i)}async lookupKerberosAuthorization(e,i){return this.requestService.lookupKerberosAuthorization(i)}async loadCertificates(e){return this.requestService.loadCertificates()}findFreePort(e,i,n,o,r=1){return se(i,n,o,r)}gpuInfoWindowId;async openDevTools(e,i){this.windowById(i?.targetWindowId,e)?.win?.webContents.openDevTools(i?.mode?{mode:i.mode,activate:i.activate}:void 0)}async toggleDevTools(e,i){this.windowById(i?.targetWindowId,e)?.win?.webContents.toggleDevTools()}async openGPUInfoWindow(e){const i=this.codeWindowById(e);if(i){if(typeof this.gpuInfoWindowId!="number"){const n=this.instantiationService.invokeFunction(he,ve(),{forceNativeTitlebar:!0});n.backgroundColor=void 0;const o=new B(n);o.setMenuBarVisibility(!1),o.loadURL("chrome://gpu"),o.once("ready-to-show",()=>o.show()),o.once("close",()=>this.gpuInfoWindowId=void 0),i.win?.on("close",()=>{this.gpuInfoWindowId&&(B.fromId(this.gpuInfoWindowId)?.close(),this.gpuInfoWindowId=void 0)}),this.gpuInfoWindowId=o.id}if(typeof this.gpuInfoWindowId=="number"){const n=B.fromId(this.gpuInfoWindowId);n?.isMinimized()&&n?.restore(),n?.focus()}}}async profileRenderer(e,i,n){const o=this.codeWindowById(e);if(!o||!o.win)throw new Error;return await new Pe(o.win,i,this.logService).inspect(n)}async windowsGetStringRegKey(e,i,n,o){if(!h)return;const r=await import("@vscode/windows-registry");try{return r.GetStringRegKey(i,n,o)}catch{return}}windowById(e,i){return this.codeWindowById(e)??this.auxiliaryWindowById(e)??this.codeWindowById(i)}codeWindowById(e){if(typeof e=="number")return this.windowsMainService.getWindowById(e)}auxiliaryWindowById(e){if(typeof e!="number")return;const i=$.fromId(e);if(i)return this.auxiliaryWindowsMainService.getWindowByWebContents(i)}};C([Q],M.prototype,"cliPath",1),M=C([d(0,ye),d(1,Me),d(2,ae),d(3,ue),d(4,ce),d(5,le),d(6,pe),d(7,fe),d(8,Se),d(9,Oe),d(10,Ee),d(11,xe),d(12,me)],M);export{Qi as INativeHostMainService,M as NativeHostMainService};
