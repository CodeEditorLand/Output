var H=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var y=(c,s,o,e)=>{for(var t=e>1?void 0:e?L(s,o):s,n=c.length-1,r;n>=0;n--)(r=c[n])&&(t=(e?r(s,o,t):r(t))||t);return e&&t&&H(s,o,t),t},i=(c,s)=>(o,e)=>s(o,e,c);import{VSBuffer as P}from"../../../../base/common/buffer.js";import{Emitter as R}from"../../../../base/common/event.js";import{Disposable as k}from"../../../../base/common/lifecycle.js";import{Schemas as T}from"../../../../base/common/network.js";import*as h from"../../../../base/common/platform.js";import"../../../../base/common/uri.js";import"../../../../base/parts/ipc/common/ipc.js";import"../../../../base/parts/ipc/common/ipc.net.js";import{IExtensionHostDebugService as A}from"../../../../platform/debug/common/extensionHostDebug.js";import{ILabelService as C}from"../../../../platform/label/common/label.js";import{ILogService as U,ILoggerService as w}from"../../../../platform/log/common/log.js";import{IProductService as O}from"../../../../platform/product/common/productService.js";import{connectRemoteAgentExtensionHost as W}from"../../../../platform/remote/common/remoteAgentConnection.js";import{IRemoteAuthorityResolverService as M}from"../../../../platform/remote/common/remoteAuthorityResolver.js";import{IRemoteSocketFactoryService as F}from"../../../../platform/remote/common/remoteSocketFactoryService.js";import{ISignService as q}from"../../../../platform/sign/common/sign.js";import{ITelemetryService as N}from"../../../../platform/telemetry/common/telemetry.js";import{isLoggingOnly as B}from"../../../../platform/telemetry/common/telemetryUtils.js";import{IWorkspaceContextService as K,WorkbenchState as z}from"../../../../platform/workspace/common/workspace.js";import{IWorkbenchEnvironmentService as J}from"../../environment/common/environmentService.js";import{parseExtensionDevOptions as V}from"./extensionDevOptions.js";import{MessageType as g,UIKind as f,createMessageOfType as Y,isMessageOfType as b}from"./extensionHostProtocol.js";import"./extensionRunningLocation.js";import{ExtensionHostStartup as E}from"./extensions.js";let v=class extends k{constructor(o,e,t,n,r,l,a,m,p,u,S,_,I){super();this.runningLocation=o;this._initDataProvider=e;this.remoteSocketFactoryService=t;this._contextService=n;this._environmentService=r;this._telemetryService=l;this._logService=a;this._loggerService=m;this._labelService=p;this.remoteAuthorityResolverService=u;this._extensionHostDebugService=S;this._productService=_;this._signService=I;this.remoteAuthority=this._initDataProvider.remoteAuthority,this._protocol=null,this._hasLostConnection=!1,this._terminating=!1;const d=V(this._environmentService);this._isExtensionDevHost=d.isExtensionDevHost}pid=null;remoteAuthority;startup=E.EagerAutoStart;extensions=null;_onExit=this._register(new R);onExit=this._onExit.event;_protocol;_hasLostConnection;_terminating;_hasDisconnected=!1;_isExtensionDevHost;start(){const o={commit:this._productService.commit,quality:this._productService.quality,addressProvider:{getAddress:async()=>{const{authority:e}=await this.remoteAuthorityResolverService.resolveAuthority(this._initDataProvider.remoteAuthority);return{connectTo:e.connectTo,connectionToken:e.connectionToken}}},remoteSocketFactoryService:this.remoteSocketFactoryService,signService:this._signService,logService:this._logService,ipcLogger:null};return this.remoteAuthorityResolverService.resolveAuthority(this._initDataProvider.remoteAuthority).then(e=>{const t={language:h.language,debugId:this._environmentService.debugExtensionHost.debugId,break:this._environmentService.debugExtensionHost.break,port:this._environmentService.debugExtensionHost.port,env:{...this._environmentService.debugExtensionHost.env,...e.options?.extensionHostEnv}},n=this._environmentService.extensionDevelopmentLocationURI;let r=!0;return n&&n.length>0&&n[0].scheme===T.file&&(r=!1),r||(t.break=!1),W(o,t).then(l=>{this._register(l);const{protocol:a,debugPort:m,reconnectionToken:p}=l,u=typeof m=="number";return r&&this._environmentService.isExtensionDevelopment&&this._environmentService.debugExtensionHost.debugId&&m&&this._extensionHostDebugService.attachSession(this._environmentService.debugExtensionHost.debugId,m,this._initDataProvider.remoteAuthority),a.onDidDispose(()=>{this._onExtHostConnectionLost(p)}),a.onSocketClose(()=>{this._isExtensionDevHost&&this._onExtHostConnectionLost(p)}),new Promise((S,_)=>{const I=setTimeout(()=>{_("The remote extension host took longer than 60s to send its ready message.")},6e4),d=a.onMessage(x=>{if(b(x,g.Ready)){this._createExtHostInitData(u).then(D=>{a.send(P.fromString(JSON.stringify(D)))});return}if(b(x,g.Initialized)){clearTimeout(I),d.dispose(),this._protocol=a,S(a);return}})})})})}_onExtHostConnectionLost(o){this._hasLostConnection||(this._hasLostConnection=!0,this._isExtensionDevHost&&this._environmentService.debugExtensionHost.debugId&&this._extensionHostDebugService.close(this._environmentService.debugExtensionHost.debugId),!this._terminating&&this._onExit.fire([0,o]))}async _createExtHostInitData(o){const e=await this._initDataProvider.getInitData();this.extensions=e.extensions;const t=this._contextService.getWorkspace();return{commit:this._productService.commit,version:this._productService.version,quality:this._productService.quality,parentPid:e.pid,environment:{isExtensionDevelopmentDebug:o,appRoot:e.appRoot,appName:this._productService.nameLong,appHost:this._productService.embedderIdentifier||"desktop",appUriScheme:this._productService.urlProtocol,extensionTelemetryLogResource:this._environmentService.extHostTelemetryLogFile,isExtensionTelemetryLoggingOnly:B(this._productService,this._environmentService),appLanguage:h.language,extensionDevelopmentLocationURI:this._environmentService.extensionDevelopmentLocationURI,extensionTestsLocationURI:this._environmentService.extensionTestsLocationURI,globalStorageHome:e.globalStorageHome,workspaceStorageHome:e.workspaceStorageHome,extensionLogLevel:this._environmentService.extensionLogLevel},workspace:this._contextService.getWorkbenchState()===z.EMPTY?null:{configuration:t.configuration,id:t.id,name:this._labelService.getWorkspaceLabel(t),transient:t.transient},remote:{isRemote:!0,authority:this._initDataProvider.remoteAuthority,connectionData:e.connectionData},consoleForward:{includeStack:!1,logNative:!!this._environmentService.debugExtensionHost.debugId},extensions:this.extensions.toSnapshot(),telemetryInfo:{sessionId:this._telemetryService.sessionId,machineId:this._telemetryService.machineId,sqmId:this._telemetryService.sqmId,devDeviceId:this._telemetryService.devDeviceId,firstSessionDate:this._telemetryService.firstSessionDate,msftInternal:this._telemetryService.msftInternal},logLevel:this._logService.getLevel(),loggers:[...this._loggerService.getRegisteredLoggers()],logsLocation:e.extensionHostLogsPath,autoStart:this.startup===E.EagerAutoStart,uiKind:h.isWeb?f.Web:f.Desktop}}getInspectPort(){}enableInspectPort(){return Promise.resolve(!1)}async disconnect(){this._protocol&&!this._hasDisconnected&&(this._protocol.send(Y(g.Terminate)),this._protocol.sendDisconnect(),this._hasDisconnected=!0,await this._protocol.drain())}dispose(){super.dispose(),this._terminating=!0,this.disconnect(),this._protocol&&(this._protocol.getSocket().end(),this._protocol=null)}};v=y([i(2,F),i(3,K),i(4,J),i(5,N),i(6,U),i(7,w),i(8,C),i(9,M),i(10,A),i(11,O),i(12,q)],v);export{v as RemoteExtensionHost};
