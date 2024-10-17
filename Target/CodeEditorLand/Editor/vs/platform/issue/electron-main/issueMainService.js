var g=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var u=(p,e,t,r)=>{for(var o=r>1?void 0:r?f(e,t):e,n=p.length-1,i;n>=0;n--)(i=p[n])&&(o=(r?i(e,t,o):i(o))||o);return r&&o&&g(e,t,o),o},a=(p,e)=>(t,r)=>e(t,r,p);import{BrowserWindow as h,screen as c}from"electron";import{arch as W,release as y,type as R}from"os";import{raceTimeout as S}from"../../../base/common/async.js";import{CancellationTokenSource as b}from"../../../base/common/cancellation.js";import{DisposableStore as I}from"../../../base/common/lifecycle.js";import{FileAccess as m}from"../../../base/common/network.js";import{isMacintosh as C}from"../../../base/common/platform.js";import{validatedIpcMain as M}from"../../../base/parts/ipc/electron-main/ipcMain.js";import{getNLSLanguage as P,getNLSMessages as D,localize as d}from"../../../nls.js";import{IDialogMainService as O}from"../../dialogs/electron-main/dialogMainService.js";import{IEnvironmentMainService as x}from"../../environment/electron-main/environmentMainService.js";import"../common/issue.js";import{ILogService as B}from"../../log/common/log.js";import{INativeHostMainService as k}from"../../native/electron-main/nativeHostMainService.js";import E from"../../product/common/product.js";import{IProtocolMainService as L}from"../../protocol/electron-main/protocol.js";import{zoomLevelToZoomFactor as T}from"../../window/common/window.js";import"../../window/electron-main/window.js";import{IWindowsMainService as U}from"../../windows/electron-main/windows.js";import{ICSSDevelopmentService as z}from"../../cssDev/node/cssDevService.js";let l=class{constructor(e,t,r,o,n,i,s,w){this.userEnv=e;this.environmentMainService=t;this.logService=r;this.dialogMainService=o;this.nativeHostMainService=n;this.protocolMainService=i;this.windowsMainService=s;this.cssDevelopmentService=w}static DEFAULT_BACKGROUND_COLOR="#1E1E1E";issueReporterWindow=null;issueReporterParentWindow=null;async openReporter(e){if(this.issueReporterWindow)this.issueReporterWindow&&this.focusWindow(this.issueReporterWindow);else if(this.issueReporterParentWindow=h.getFocusedWindow(),this.issueReporterParentWindow){const t=new I,r=t.add(this.protocolMainService.createIPCObjectUrl()),o=this.getWindowPosition(this.issueReporterParentWindow,700,800);this.issueReporterWindow=this.createBrowserWindow(o,r,{backgroundColor:e.styles.backgroundColor,title:d("issueReporter","Issue Reporter"),zoomLevel:e.zoomLevel,alwaysOnTop:!1},"issue-reporter"),r.update({appRoot:this.environmentMainService.appRoot,windowId:this.issueReporterWindow.id,userEnv:this.userEnv,data:e,disableExtensions:!!this.environmentMainService.disableExtensions,os:{type:R(),arch:W(),release:y()},product:E,nls:{messages:D(),language:P()},cssModules:this.cssDevelopmentService.isEnabled?await this.cssDevelopmentService.getCssModules():void 0}),this.issueReporterWindow.loadURL(m.asBrowserUri(`vs/workbench/contrib/issue/electron-sandbox/issueReporter${this.environmentMainService.isBuilt?"":"-dev"}.html`).toString(!0)),this.issueReporterWindow.on("close",()=>{this.issueReporterWindow=null,t.dispose()}),this.issueReporterParentWindow.on("closed",()=>{this.issueReporterWindow&&(this.issueReporterWindow.close(),this.issueReporterWindow=null,t.dispose())})}}async $reloadWithExtensionsDisabled(){if(this.issueReporterParentWindow)try{await this.nativeHostMainService.reload(this.issueReporterParentWindow.id,{disableExtensions:!0})}catch(e){this.logService.error(e)}}async $showConfirmCloseDialog(){if(this.issueReporterWindow){const{response:e}=await this.dialogMainService.showMessageBox({type:"warning",message:d("confirmCloseIssueReporter","Your input will not be saved. Are you sure you want to close this window?"),buttons:[d({key:"yes",comment:["&& denotes a mnemonic"]},"&&Yes"),d("cancel","Cancel")]},this.issueReporterWindow);e===0&&this.issueReporterWindow&&(this.issueReporterWindow.destroy(),this.issueReporterWindow=null)}}async $showClipboardDialog(){if(this.issueReporterWindow){const{response:e}=await this.dialogMainService.showMessageBox({type:"warning",message:d("issueReporterWriteToClipboard","There is too much data to send to GitHub directly. The data will be copied to the clipboard, please paste it into the GitHub issue page that is opened."),buttons:[d({key:"ok",comment:["&& denotes a mnemonic"]},"&&OK"),d("cancel","Cancel")]},this.issueReporterWindow);return e===0}return!1}issueReporterWindowCheck(){if(!this.issueReporterParentWindow)throw new Error("Issue reporter window not available");const e=this.windowsMainService.getWindowById(this.issueReporterParentWindow.id);if(!e)throw new Error("Window not found");return e}async $sendReporterMenu(e,t){const r=this.issueReporterWindowCheck(),o="vscode:triggerReporterMenu",n=new b;return r.sendWhenReady(o,n.token,{replyChannel:o,extensionId:e,extensionName:t}),await S(new Promise(s=>M.once(`vscode:triggerReporterMenuResponse:${e}`,(w,v)=>s(v))),5e3,()=>{this.logService.error(`Error: Extension ${e} timed out waiting for menu response`),n.cancel()})}async $closeReporter(){this.issueReporterWindow?.close()}focusWindow(e){e.isMinimized()&&e.restore(),e.focus()}createBrowserWindow(e,t,r,o){const n={fullscreen:!1,skipTaskbar:!1,resizable:!0,width:e.width,height:e.height,minWidth:300,minHeight:200,x:e.x,y:e.y,title:r.title,backgroundColor:r.backgroundColor||l.DEFAULT_BACKGROUND_COLOR,webPreferences:{preload:m.asFileUri("vs/base/parts/sandbox/electron-sandbox/preload.js").fsPath,additionalArguments:[`--vscode-window-config=${t.resource.toString()}`],v8CacheOptions:this.environmentMainService.useCodeCache?"bypassHeatCheck":"none",enableWebSQL:!1,spellcheck:!1,zoomFactor:T(r.zoomLevel),sandbox:!0},alwaysOnTop:r.alwaysOnTop,experimentalDarkMode:!0},i=new h(n);return i.setMenuBarVisibility(!1),i}getWindowPosition(e,t,r){let o;const n=c.getAllDisplays();if(n.length===1)o=n[0];else{if(C){const w=c.getCursorScreenPoint();o=c.getDisplayNearestPoint(w)}!o&&e&&(o=c.getDisplayMatching(e.getBounds())),o||(o=c.getPrimaryDisplay()||n[0])}const i=o.bounds,s={width:t,height:r,x:i.x+i.width/2-t/2,y:i.y+i.height/2-r/2};return i.width>0&&i.height>0&&(s.x<i.x&&(s.x=i.x),s.y<i.y&&(s.y=i.y),s.x>i.x+i.width&&(s.x=i.x),s.y>i.y+i.height&&(s.y=i.y),s.width>i.width&&(s.width=i.width),s.height>i.height&&(s.height=i.height)),s}};l=u([a(1,x),a(2,B),a(3,O),a(4,k),a(5,L),a(6,U),a(7,z)],l);export{l as IssueMainService};
