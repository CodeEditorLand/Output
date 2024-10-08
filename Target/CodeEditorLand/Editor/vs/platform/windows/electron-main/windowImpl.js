var H=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var D=(f,m,e,i)=>{for(var t=i>1?void 0:i?z(m,e):m,n=f.length-1,o;n>=0;n--)(o=f[n])&&(t=(i?o(m,e,t):o(t))||t);return i&&t&&H(m,e,t),t},r=(f,m)=>(e,i)=>m(e,i,f);import d from"electron";import{DeferredPromise as U,RunOnceScheduler as V,timeout as G}from"../../../base/common/async.js";import{CancellationToken as S}from"../../../base/common/cancellation.js";import{toErrorMessage as j}from"../../../base/common/errorMessage.js";import{Emitter as u,Event as c}from"../../../base/common/event.js";import{Disposable as $}from"../../../base/common/lifecycle.js";import{FileAccess as k,Schemas as _}from"../../../base/common/network.js";import{getMarks as Z,mark as v}from"../../../base/common/performance.js";import{isBigSurOrNewer as Y,isMacintosh as s,isWindows as P}from"../../../base/common/platform.js";import{URI as T}from"../../../base/common/uri.js";import{localize as a}from"../../../nls.js";import{release as q}from"os";import"../../action/common/action.js";import{IBackupMainService as K}from"../../backup/electron-main/backup.js";import{IConfigurationService as X}from"../../configuration/common/configuration.js";import{IDialogMainService as J}from"../../dialogs/electron-main/dialogMainService.js";import"../../environment/common/argv.js";import{IEnvironmentMainService as Q}from"../../environment/electron-main/environmentMainService.js";import{isLaunchedFromCli as N}from"../../environment/node/argvHelper.js";import{IFileService as ee}from"../../files/common/files.js";import{ILifecycleMainService as ie}from"../../lifecycle/electron-main/lifecycleMainService.js";import{ILogService as te}from"../../log/common/log.js";import{IProductService as ne}from"../../product/common/productService.js";import{IProtocolMainService as oe}from"../../protocol/electron-main/protocol.js";import{resolveMarketplaceHeaders as re}from"../../externalServices/common/marketplace.js";import{IApplicationStorageMainService as se,IStorageMainService as ae}from"../../storage/electron-main/storageMainService.js";import{ITelemetryService as de}from"../../telemetry/common/telemetry.js";import{ThemeIcon as le}from"../../../base/common/themables.js";import{IThemeMainService as ce}from"../../theme/electron-main/themeMainService.js";import{getMenuBarVisibility as he,hasNativeTitlebar as ue,useNativeFullScreen as me,useWindowControlsOverlay as F,DEFAULT_CUSTOM_TITLEBAR_HEIGHT as fe,TitlebarStyle as pe}from"../../window/common/window.js";import{defaultBrowserWindowOptions as ve,IWindowsMainService as we,OpenContext as ge,WindowStateValidator as Se}from"./windows.js";import{isSingleFolderWorkspaceIdentifier as B,isWorkspaceIdentifier as L,toWorkspaceIdentifier as ye}from"../../workspace/common/workspace.js";import{IWorkspacesManagementMainService as be}from"../../workspaces/electron-main/workspacesManagementMainService.js";import{WindowMode as l,WindowError as h,LoadReason as I,defaultWindowState as C}from"../../window/electron-main/window.js";import{IPolicyService as _e}from"../../policy/common/policy.js";import"../../userDataProfile/common/userDataProfile.js";import{IStateService as Ie}from"../../state/node/state.js";import{IUserDataProfilesMainService as Ce}from"../../userDataProfile/electron-main/userDataProfile.js";import{ILoggerMainService as Ee}from"../../log/electron-main/loggerService.js";import{IInstantiationService as Me}from"../../instantiation/common/instantiation.js";var xe=(i=>(i[i.NONE=0]="NONE",i[i.NAVIGATING=1]="NAVIGATING",i[i.READY=2]="READY",i))(xe||{});class E extends ${constructor(e,i,t,n){super();this.configurationService=e;this.stateService=i;this.environmentMainService=t;this.logService=n}_onDidClose=this._register(new u);onDidClose=this._onDidClose.event;_onDidMaximize=this._register(new u);onDidMaximize=this._onDidMaximize.event;_onDidUnmaximize=this._register(new u);onDidUnmaximize=this._onDidUnmaximize.event;_onDidTriggerSystemContextMenu=this._register(new u);onDidTriggerSystemContextMenu=this._onDidTriggerSystemContextMenu.event;_onDidEnterFullScreen=this._register(new u);onDidEnterFullScreen=this._onDidEnterFullScreen.event;_onDidLeaveFullScreen=this._register(new u);onDidLeaveFullScreen=this._onDidLeaveFullScreen.event;_lastFocusTime=Date.now();get lastFocusTime(){return this._lastFocusTime}_win=null;get win(){return this._win}setWin(e,i){this._win=e,this._register(c.fromNodeEventEmitter(e,"maximize")(()=>this._onDidMaximize.fire())),this._register(c.fromNodeEventEmitter(e,"unmaximize")(()=>this._onDidUnmaximize.fire())),this._register(c.fromNodeEventEmitter(e,"closed")(()=>{this._onDidClose.fire(),this.dispose()})),this._register(c.fromNodeEventEmitter(e,"focus")(()=>{this._lastFocusTime=Date.now()})),this._register(c.fromNodeEventEmitter(this._win,"enter-full-screen")(()=>this._onDidEnterFullScreen.fire())),this._register(c.fromNodeEventEmitter(this._win,"leave-full-screen")(()=>this._onDidLeaveFullScreen.fire()));const t=!ue(this.configurationService,i?.titleBarStyle==="hidden"?pe.CUSTOM:void 0);if(s&&t&&e.setSheetOffset(Y(q())?28:22),t&&(F(this.configurationService)||s)){const n=this.stateService.getItem(E.windowControlHeightStateStorageKey);n?this.updateWindowControls({height:n}):this.updateWindowControls({height:fe})}P&&t&&e.hookWindowMessage(278,()=>{const[o,p]=e.getPosition(),y=d.screen.getCursorScreenPoint(),b=y.x-o,g=y.y-p;return!(b>30&&g>=0&&g<=Math.max(e.getBounds().height*.15,35))||(e.setEnabled(!1),e.setEnabled(!0),this._onDidTriggerSystemContextMenu.fire({x:b,y:g})),0}),this.environmentMainService.args["open-devtools"]===!0&&e.webContents.openDevTools(),s&&(this._register(this.onDidEnterFullScreen(()=>{this.joinNativeFullScreenTransition?.complete(!0)})),this._register(this.onDidLeaveFullScreen(()=>{this.joinNativeFullScreenTransition?.complete(!0)})))}applyState(e,i=d.screen.getAllDisplays().length>0){const t=this.configurationService.getValue("window"),n=s&&t?.nativeTabs===!0;(s||P)&&i&&(!n||d.BrowserWindow.getAllWindows().length===1)&&[e.width,e.height,e.x,e.y].every(o=>typeof o=="number")&&this._win?.setBounds({width:e.width,height:e.height,x:e.x,y:e.y}),(e.mode===l.Maximized||e.mode===l.Fullscreen)&&(this._win?.maximize(),e.mode===l.Fullscreen&&this.setFullScreen(!0,!0),this._win?.show())}representedFilename;setRepresentedFilename(e){s?this.win?.setRepresentedFilename(e):this.representedFilename=e}getRepresentedFilename(){return s?this.win?.getRepresentedFilename():this.representedFilename}documentEdited;setDocumentEdited(e){s&&this.win?.setDocumentEdited(e),this.documentEdited=e}isDocumentEdited(){return s?!!this.win?.isDocumentEdited():!!this.documentEdited}focus(e){s&&e?.force&&d.app.focus({steal:!0});const i=this.win;i&&(i.isMinimized()&&i.restore(),i.focus())}handleTitleDoubleClick(){const e=this.win;if(e)if(s)switch(d.systemPreferences.getUserDefault("AppleActionOnDoubleClick","string")){case"Minimize":e.minimize();break;case"None":break;case"Maximize":default:e.isMaximized()?e.unmaximize():e.maximize()}else e.isMaximized()?e.unmaximize():e.maximize()}static windowControlHeightStateStorageKey="windowControlHeight";hasWindowControlOverlay=F(this.configurationService);updateWindowControls(e){const i=this.win;if(i){if(e.height&&this.stateService.setItem(w.windowControlHeightStateStorageKey,e.height),this.hasWindowControlOverlay)i.setTitleBarOverlay({color:e.backgroundColor?.trim()===""?void 0:e.backgroundColor,symbolColor:e.foregroundColor?.trim()===""?void 0:e.foregroundColor,height:e.height?e.height-1:void 0});else if(s&&e.height!==void 0){const t=(e.height-15)/2;t?i.setWindowButtonPosition({x:t,y:t}):i.setWindowButtonPosition(null)}}}transientIsNativeFullScreen=void 0;joinNativeFullScreenTransition=void 0;toggleFullScreen(){this.setFullScreen(!this.isFullScreen,!1)}setFullScreen(e,i){me(this.configurationService)?this.setNativeFullScreen(e,i):this.setSimpleFullScreen(e)}get isFullScreen(){if(s&&typeof this.transientIsNativeFullScreen=="boolean")return this.transientIsNativeFullScreen;const e=this.win,i=e?.isFullScreen(),t=e?.isSimpleFullScreen();return!!(i||t)}setNativeFullScreen(e,i){const t=this.win;t?.isSimpleFullScreen()&&t?.setSimpleFullScreen(!1),this.doSetNativeFullScreen(e,i)}doSetNativeFullScreen(e,i){if(s){this.transientIsNativeFullScreen=e;const n=this.joinNativeFullScreenTransition=new U;(async()=>{const o=await Promise.race([n.p,G(1e4).then(()=>!1)]);this.joinNativeFullScreenTransition===n&&(this.transientIsNativeFullScreen=void 0,this.joinNativeFullScreenTransition=void 0,!o&&e&&i&&this.win&&!this.win.isFullScreen()&&(this.logService.warn("window: native macOS fullscreen transition did not happen within 10s from restoring"),this._onDidLeaveFullScreen.fire()))})()}this.win?.setFullScreen(e)}setSimpleFullScreen(e){const i=this.win;i?.isFullScreen()&&this.doSetNativeFullScreen(!1,!1),i?.setSimpleFullScreen(e),i?.webContents.focus()}dispose(){super.dispose(),this._win=null}}let w=class extends E{constructor(e,i,t,n,o,p,y,b,g,M,We,De,ke,Pe,Te,Ne,Fe,Be,Le,O,R){super(M,O,n,i);this.loggerMainService=t;this.policyService=o;this.userDataProfilesService=p;this.fileService=y;this.applicationStorageMainService=b;this.storageMainService=g;this.themeMainService=We;this.workspacesManagementMainService=De;this.backupMainService=ke;this.telemetryService=Pe;this.dialogMainService=Te;this.lifecycleMainService=Ne;this.productService=Fe;this.protocolMainService=Be;this.windowsMainService=Le;{const[x,A]=this.restoreWindowState(e.state);this.windowState=x,this.logService.trace("window#ctor: using window state",x);const W=R.invokeFunction(ve,this.windowState,void 0,{preload:k.asFileUri("vs/base/parts/sandbox/electron-sandbox/preload.js").fsPath,additionalArguments:[`--vscode-window-config=${this.configObjectUrl.resource.toString()}`],v8CacheOptions:this.environmentMainService.useCodeCache?"bypassHeatCheck":"none"});v("code/willCreateCodeBrowserWindow"),this._win=new d.BrowserWindow(W),v("code/didCreateCodeBrowserWindow"),this._id=this._win.id,this.setWin(this._win,W),this.applyState(this.windowState,A),this._lastFocusTime=Date.now()}this.onConfigurationUpdated(),this.createTouchBar(),this.registerListeners()}_onWillLoad=this._register(new u);onWillLoad=this._onWillLoad.event;_onDidSignalReady=this._register(new u);onDidSignalReady=this._onDidSignalReady.event;_onDidDestroy=this._register(new u);onDidDestroy=this._onDidDestroy.event;_id;get id(){return this._id}_win;get backupPath(){return this._config?.backupPath}get openedWorkspace(){return this._config?.workspace}get profile(){if(!this.config)return;const e=this.userDataProfilesService.profiles.find(i=>i.id===this.config?.profiles.profile.id);return this.isExtensionDevelopmentHost&&e?e:this.userDataProfilesService.getProfileForWorkspace(this.config.workspace??ye(this.backupPath,this.isExtensionDevelopmentHost))??this.userDataProfilesService.defaultProfile}get remoteAuthority(){return this._config?.remoteAuthority}_config;get config(){return this._config}get isExtensionDevelopmentHost(){return!!this._config?.extensionDevelopmentPath}get isExtensionTestHost(){return!!this._config?.extensionTestsPath}get isExtensionDevelopmentTestFromCli(){return this.isExtensionDevelopmentHost&&this.isExtensionTestHost&&!this._config?.debugId}windowState;currentMenuBarVisibility;whenReadyCallbacks=[];touchBarGroups=[];currentHttpProxy=void 0;currentNoProxy=void 0;customZoomLevel=void 0;configObjectUrl=this._register(this.protocolMainService.createIPCObjectUrl());pendingLoadConfig;wasLoaded=!1;readyState=0;setReady(){for(this.logService.trace(`window#load: window reported ready (id: ${this._id})`),this.readyState=2;this.whenReadyCallbacks.length;)this.whenReadyCallbacks.pop()(this);this._onDidSignalReady.fire()}ready(){return new Promise(e=>{if(this.isReady)return e(this);this.whenReadyCallbacks.push(e)})}get isReady(){return this.readyState===2}get whenClosedOrLoaded(){return new Promise(e=>{function i(){t.dispose(),n.dispose(),e()}const t=this.onDidClose(()=>i()),n=this.onWillLoad(()=>i())})}registerListeners(){this._register(c.fromNodeEventEmitter(this._win,"unresponsive")(()=>this.onWindowError(h.UNRESPONSIVE))),this._register(c.fromNodeEventEmitter(this._win.webContents,"render-process-gone",(i,t)=>t)(i=>this.onWindowError(h.PROCESS_GONE,{...i}))),this._register(c.fromNodeEventEmitter(this._win.webContents,"did-fail-load",(i,t,n)=>({exitCode:t,reason:n}))(({exitCode:i,reason:t})=>this.onWindowError(h.LOAD,{reason:t,exitCode:i}))),this._register(c.fromNodeEventEmitter(this._win.webContents,"will-prevent-unload")(i=>i.preventDefault())),this._register(c.fromNodeEventEmitter(this._win.webContents,"did-finish-load")(()=>{this.pendingLoadConfig&&(this._config=this.pendingLoadConfig,this.pendingLoadConfig=void 0)})),this._register(this.onDidMaximize(()=>{this._config&&(this._config.maximized=!0)})),this._register(this.onDidUnmaximize(()=>{this._config&&(this._config.maximized=!1)})),this._register(this.onDidEnterFullScreen(()=>{this.sendWhenReady("vscode:enterFullScreen",S.None)})),this._register(this.onDidLeaveFullScreen(()=>{this.sendWhenReady("vscode:leaveFullScreen",S.None)})),this._register(this.configurationService.onDidChangeConfiguration(i=>this.onConfigurationUpdated(i))),this._register(this.workspacesManagementMainService.onDidDeleteUntitledWorkspace(i=>this.onDidDeleteUntitledWorkspace(i)));const e=["https://marketplace.visualstudio.com/*","https://*.vsassets.io/*"];this._win.webContents.session.webRequest.onBeforeSendHeaders({urls:e},async(i,t)=>{const n=await this.getMarketplaceHeaders();t({cancel:!1,requestHeaders:Object.assign(i.requestHeaders,n)})})}marketplaceHeadersPromise;getMarketplaceHeaders(){return this.marketplaceHeadersPromise||(this.marketplaceHeadersPromise=re(this.productService.version,this.productService,this.environmentMainService,this.configurationService,this.fileService,this.applicationStorageMainService,this.telemetryService)),this.marketplaceHeadersPromise}async onWindowError(e,i){switch(e){case h.PROCESS_GONE:this.logService.error(`CodeWindow: renderer process gone (reason: ${i?.reason||"<unknown>"}, code: ${i?.exitCode||"<unknown>"})`);break;case h.UNRESPONSIVE:this.logService.error("CodeWindow: detected unresponsive");break;case h.LOAD:this.logService.error(`CodeWindow: failed to load (reason: ${i?.reason||"<unknown>"}, code: ${i?.exitCode||"<unknown>"})`);break}switch(this.telemetryService.publicLog2("windowerror",{type:e,reason:i?.reason,code:i?.exitCode}),e){case h.UNRESPONSIVE:case h.PROCESS_GONE:if(this.isExtensionDevelopmentTestFromCli){this.lifecycleMainService.kill(1);return}if(this.environmentMainService.args["enable-smoke-test-driver"]){await this.destroyWindow(!1,!1),this.lifecycleMainService.quit();return}if(e===h.UNRESPONSIVE){if(this.isExtensionDevelopmentHost||this.isExtensionTestHost||this._win&&this._win.webContents&&this._win.webContents.isDevToolsOpened())return;const{response:t,checkboxChecked:n}=await this.dialogMainService.showMessageBox({type:"warning",buttons:[a({key:"reopen",comment:["&& denotes a mnemonic"]},"&&Reopen"),a({key:"close",comment:["&& denotes a mnemonic"]},"&&Close"),a({key:"wait",comment:["&& denotes a mnemonic"]},"&&Keep Waiting")],message:a("appStalled","The window is not responding"),detail:a("appStalledDetail","You can reopen or close the window or keep waiting."),checkboxLabel:this._config?.workspace?a("doNotRestoreEditors","Don't restore editors"):void 0},this._win);if(t!==2){const o=t===0;await this.destroyWindow(o,n)}}else if(e===h.PROCESS_GONE){let t;i?t=a("appGoneDetails","The window terminated unexpectedly (reason: '{0}', code: '{1}')",i.reason,i.exitCode??"<unknown>"):t=a("appGone","The window terminated unexpectedly");const{response:n,checkboxChecked:o}=await this.dialogMainService.showMessageBox({type:"warning",buttons:[this._config?.workspace?a({key:"reopen",comment:["&& denotes a mnemonic"]},"&&Reopen"):a({key:"newWindow",comment:["&& denotes a mnemonic"]},"&&New Window"),a({key:"close",comment:["&& denotes a mnemonic"]},"&&Close")],message:t,detail:this._config?.workspace?a("appGoneDetailWorkspace","We are sorry for the inconvenience. You can reopen the window to continue where you left off."):a("appGoneDetailEmptyWindow","We are sorry for the inconvenience. You can open a new empty window to start again."),checkboxLabel:this._config?.workspace?a("doNotRestoreEditors","Don't restore editors"):void 0},this._win),p=n===0;await this.destroyWindow(p,o)}break}}async destroyWindow(e,i){const t=this._config?.workspace;if(i&&t)try{const n=this.storageMainService.workspaceStorage(t);await n.init(),n.delete("memento/workbench.parts.editor"),await n.close()}catch(n){this.logService.error(n)}this._onDidDestroy.fire();try{if(e&&this._config){let n,o;B(t)?n={folderUri:t.uri}:L(t)?n={workspaceUri:t.configPath}:o=!0,(await this.windowsMainService.open({context:ge.API,userEnv:this._config.userEnv,cli:{...this.environmentMainService.args,_:[]},urisToOpen:n?[n]:void 0,forceEmpty:o,forceNewWindow:!0,remoteAuthority:this.remoteAuthority})).at(0)?.focus()}}finally{this._win?.destroy()}}onDidDeleteUntitledWorkspace(e){this._config?.workspace?.id===e.id&&(this._config.workspace=void 0)}onConfigurationUpdated(e){if(!e||e.affectsConfiguration("window.menuBarVisibility")){const i=this.getMenuBarVisibility();i!==this.currentMenuBarVisibility&&(this.currentMenuBarVisibility=i,this.setMenuBarVisibility(i))}if(!e||e.affectsConfiguration("http.proxy")||e.affectsConfiguration("http.noProxy")){let i=(this.configurationService.getValue("http.proxy")||"").trim()||(process.env.https_proxy||process.env.HTTPS_PROXY||process.env.http_proxy||process.env.HTTP_PROXY||"").trim()||void 0;if(i?.indexOf("@")!==-1){const n=T.parse(i),o=n.authority.indexOf("@");o!==-1&&(i=n.with({authority:n.authority.substring(o+1)}).toString())}i?.endsWith("/")&&(i=i.substr(0,i.length-1));const t=(this.configurationService.getValue("http.noProxy")||[]).map(n=>n.trim()).join(",")||(process.env.no_proxy||process.env.NO_PROXY||"").trim()||void 0;if((i||"").indexOf("@")===-1&&(i!==this.currentHttpProxy||t!==this.currentNoProxy)){this.currentHttpProxy=i,this.currentNoProxy=t;const n=i||"",o=t?`${t},<local>`:"<local>";this.logService.trace(`Setting proxy to '${n}', bypassing '${o}'`),this._win.webContents.session.setProxy({proxyRules:n,proxyBypassRules:o,pacScript:""}),d.app.setProxy({proxyRules:n,proxyBypassRules:o,pacScript:""})}}}addTabbedWindow(e){s&&e.win&&this._win.addTabbedWindow(e.win)}load(e,i=Object.create(null)){this.logService.trace(`window#load: attempt to load window (id: ${this._id})`),this.isDocumentEdited()&&(!i.isReload||!this.backupMainService.isHotExitEnabled())&&this.setDocumentEdited(!1),i.isReload||(this.getRepresentedFilename()&&this.setRepresentedFilename(""),this._win.setTitle(this.productService.nameLong)),this.updateConfiguration(e,i),this.readyState===0?this._config=e:this.pendingLoadConfig=e,this.readyState=1,this._win.loadURL(k.asBrowserUri(`vs/code/electron-sandbox/workbench/workbench${this.environmentMainService.isBuilt?"":"-dev"}.html`).toString(!0));const t=this.wasLoaded;this.wasLoaded=!0,!this.environmentMainService.isBuilt&&!this.environmentMainService.extensionTestsLocationURI&&this._register(new V(()=>{this._win&&!this._win.isVisible()&&!this._win.isMinimized()&&(this._win.show(),this.focus({force:!0}),this._win.webContents.openDevTools())},1e4)).schedule(),this._onWillLoad.fire({workspace:e.workspace,reason:i.isReload?I.RELOAD:t?I.LOAD:I.INITIAL})}updateConfiguration(e,i){const t=(this._config??this.pendingLoadConfig)?.userEnv;if(t){const n=N(t)&&!N(e.userEnv),o=this.isExtensionDevelopmentHost;(n||o)&&(e.userEnv={...t,...e.userEnv})}process.env.CHROME_CRASHPAD_PIPE_NAME&&Object.assign(e.userEnv,{CHROME_CRASHPAD_PIPE_NAME:process.env.CHROME_CRASHPAD_PIPE_NAME}),i.disableExtensions!==void 0&&(e["disable-extensions"]=i.disableExtensions),e.fullscreen=this.isFullScreen,e.maximized=this._win.isMaximized(),e.partsSplash=this.themeMainService.getWindowSplash(),e.zoomLevel=this.getZoomLevel(),e.isCustomZoomLevel=typeof this.customZoomLevel=="number",e.isCustomZoomLevel&&e.partsSplash&&(e.partsSplash.zoomLevel=e.zoomLevel),v("code/willOpenNewWindow"),e.perfMarks=Z(),this.configObjectUrl.update(e)}async reload(e){const i=Object.assign({},this._config);i.workspace=await this.validateWorkspaceBeforeReload(i),delete i.filesToOpenOrCreate,delete i.filesToDiff,delete i.filesToMerge,delete i.filesToWait,this.isExtensionDevelopmentHost&&e&&(i.verbose=e.verbose,i.debugId=e.debugId,i.extensionEnvironment=e.extensionEnvironment,i["inspect-extensions"]=e["inspect-extensions"],i["inspect-brk-extensions"]=e["inspect-brk-extensions"],i["extensions-dir"]=e["extensions-dir"]),i.accessibilitySupport=d.app.isAccessibilitySupportEnabled(),i.isInitialStartup=!1,i.policiesData=this.policyService.serialize(),i.continueOn=this.environmentMainService.continueOn,i.profiles={all:this.userDataProfilesService.profiles,profile:this.profile||this.userDataProfilesService.defaultProfile,home:this.userDataProfilesService.profilesHome},i.logLevel=this.loggerMainService.getLogLevel(),i.loggers={window:this.loggerMainService.getRegisteredLoggers(this.id),global:this.loggerMainService.getRegisteredLoggers()},this.load(i,{isReload:!0,disableExtensions:e?.["disable-extensions"]})}async validateWorkspaceBeforeReload(e){if(L(e.workspace)){const i=e.workspace.configPath;if(i.scheme===_.file&&!await this.fileService.exists(i))return}else if(B(e.workspace)){const i=e.workspace.uri;if(i.scheme===_.file&&!await this.fileService.exists(i))return}return e.workspace}serializeWindowState(){if(!this._win)return C();if(this.isFullScreen){let t;try{t=d.screen.getDisplayMatching(this.getBounds())}catch{}const n=C();return{mode:l.Fullscreen,display:t?t.id:void 0,width:this.windowState.width||n.width,height:this.windowState.height||n.height,x:this.windowState.x||0,y:this.windowState.y||0,zoomLevel:this.customZoomLevel}}const e=Object.create(null);let i;if(!s&&this._win.isMaximized()?i=l.Maximized:i=l.Normal,i===l.Maximized?e.mode=l.Maximized:e.mode=l.Normal,i===l.Normal||i===l.Maximized){let t;i===l.Normal?t=this.getBounds():t=this._win.getNormalBounds(),e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height}return e.zoomLevel=this.customZoomLevel,e}restoreWindowState(e){v("code/willRestoreCodeWindowState");let i=!1;if(e){this.customZoomLevel=e.zoomLevel;try{const t=d.screen.getAllDisplays();i=t.length>1,e=Se.validateWindowState(this.logService,e,t)}catch(t){this.logService.warn(`Unexpected error validating window state: ${t}
${t.stack}`)}}return v("code/didRestoreCodeWindowState"),[e||C(),i]}getBounds(){const[e,i]=this._win.getPosition(),[t,n]=this._win.getSize();return{x:e,y:i,width:t,height:n}}setFullScreen(e,i){super.setFullScreen(e,i),this.sendWhenReady(e?"vscode:enterFullScreen":"vscode:leaveFullScreen",S.None),this.currentMenuBarVisibility&&this.setMenuBarVisibility(this.currentMenuBarVisibility,!1)}getMenuBarVisibility(){let e=he(this.configurationService);return["visible","toggle","hidden"].indexOf(e)<0&&(e="classic"),e}setMenuBarVisibility(e,i=!0){s||(e==="toggle"&&i&&this.send("vscode:showInfoMessage",a("hiddenMenuBar","You can still access the menu bar by pressing the Alt-key.")),e==="hidden"?setTimeout(()=>{this.doSetMenuBarVisibility(e)}):this.doSetMenuBarVisibility(e))}doSetMenuBarVisibility(e){const i=this.isFullScreen;switch(e){case"classic":this._win.setMenuBarVisibility(!i),this._win.autoHideMenuBar=i;break;case"visible":this._win.setMenuBarVisibility(!0),this._win.autoHideMenuBar=!1;break;case"toggle":this._win.setMenuBarVisibility(!1),this._win.autoHideMenuBar=!0;break;case"hidden":this._win.setMenuBarVisibility(!1),this._win.autoHideMenuBar=!1;break}}notifyZoomLevel(e){this.customZoomLevel=e}getZoomLevel(){return typeof this.customZoomLevel=="number"?this.customZoomLevel:this.configurationService.getValue("window")?.zoomLevel}close(){this._win?.close()}sendWhenReady(e,i,...t){this.isReady?this.send(e,...t):this.ready().then(()=>{i.isCancellationRequested||this.send(e,...t)})}send(e,...i){if(this._win){if(this._win.isDestroyed()||this._win.webContents.isDestroyed()){this.logService.warn(`Sending IPC message to channel '${e}' for window that is destroyed`);return}try{this._win.webContents.send(e,...i)}catch(t){this.logService.warn(`Error sending IPC message to channel '${e}' of window ${this._id}: ${j(t)}`)}}}updateTouchBar(e){s&&this.touchBarGroups.forEach((i,t)=>{const n=e[t];i.segments=this.createTouchBarGroupSegments(n)})}createTouchBar(){if(s){for(let e=0;e<10;e++){const i=this.createTouchBarGroup();this.touchBarGroups.push(i)}this._win.setTouchBar(new d.TouchBar({items:this.touchBarGroups}))}}createTouchBarGroup(e=[]){const i=this.createTouchBarGroupSegments(e),t=new d.TouchBar.TouchBarSegmentedControl({segments:i,mode:"buttons",segmentStyle:"automatic",change:n=>{this.sendWhenReady("vscode:runAction",S.None,{id:t.segments[n].id,from:"touchbar"})}});return t}createTouchBarGroupSegments(e=[]){return e.map(t=>{let n;t.icon&&!le.isThemeIcon(t.icon)&&t.icon?.dark?.scheme===_.file&&(n=d.nativeImage.createFromPath(T.revive(t.icon.dark).fsPath),n.isEmpty()&&(n=void 0));let o;return typeof t.title=="string"?o=t.title:o=t.title.value,{id:t.id,label:n?void 0:o,icon:n}})}matches(e){return this._win?.webContents.id===e.id}dispose(){super.dispose(),this.loggerMainService.deregisterLoggers(this.id)}};w=D([r(1,te),r(2,Ee),r(3,Q),r(4,_e),r(5,Ce),r(6,ee),r(7,se),r(8,ae),r(9,X),r(10,ce),r(11,be),r(12,K),r(13,de),r(14,J),r(15,ie),r(16,ne),r(17,oe),r(18,we),r(19,Ie),r(20,Me)],w);export{E as BaseWindow,w as CodeWindow};
