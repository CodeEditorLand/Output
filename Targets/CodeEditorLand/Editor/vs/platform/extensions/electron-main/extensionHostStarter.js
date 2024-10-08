var m=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var d=(a,o,t,e)=>{for(var s=e>1?void 0:e?p(o,t):o,i=a.length-1,r;i>=0;i--)(r=a[i])&&(s=(e?r(o,t,s):r(s))||s);return e&&s&&m(o,t,s),s},c=(a,o)=>(t,e)=>o(t,e,a);import{Promises as v}from"../../../base/common/async.js";import{canceled as l}from"../../../base/common/errors.js";import{Event as g}from"../../../base/common/event.js";import{Disposable as x}from"../../../base/common/lifecycle.js";import"../common/extensionHostStarter.js";import{ILifecycleMainService as u}from"../../lifecycle/electron-main/lifecycleMainService.js";import{ILogService as _}from"../../log/common/log.js";import{ITelemetryService as w}from"../../telemetry/common/telemetry.js";import{WindowUtilityProcess as f}from"../../utilityProcess/electron-main/utilityProcess.js";import{IWindowsMainService as y}from"../../windows/electron-main/windows.js";let n=class extends x{constructor(t,e,s,i){super();this._logService=t;this._lifecycleMainService=e;this._windowsMainService=s;this._telemetryService=i;this._register(this._lifecycleMainService.onWillShutdown(r=>{this._shutdown=!0,r.join("extHostStarter",this._waitForAllExit(6e3))}))}_serviceBrand;static _lastId=0;_extHosts=new Map;_shutdown=!1;dispose(){super.dispose()}_getExtHost(t){const e=this._extHosts.get(t);if(!e)throw new Error("Unknown extension host!");return e}onDynamicStdout(t){return this._getExtHost(t).onStdout}onDynamicStderr(t){return this._getExtHost(t).onStderr}onDynamicMessage(t){return this._getExtHost(t).onMessage}onDynamicExit(t){return this._getExtHost(t).onExit}async createExtensionHost(){if(this._shutdown)throw l();const t=String(++n._lastId),e=new f(this._logService,this._windowsMainService,this._telemetryService,this._lifecycleMainService);this._extHosts.set(t,e);const s=e.onExit(({pid:i,code:r,signal:h})=>{s.dispose(),this._logService.info(`Extension host with pid ${i} exited with code: ${r}, signal: ${h}.`),setTimeout(()=>{e.dispose(),this._extHosts.delete(t)}),setTimeout(()=>{try{process.kill(i,0),this._logService.error(`Extension host with pid ${i} still exists, forcefully killing it...`),process.kill(i)}catch{}},1e3)});return{id:t}}async start(t,e){if(this._shutdown)throw l();const s=this._getExtHost(t);return s.start({...e,type:"extensionHost",entryPoint:"vs/workbench/api/node/extensionHostProcess",args:["--skipWorkspaceStorageLock"],execArgv:e.execArgv,allowLoadingUnsignedLibraries:!0,respondToAuthRequestsFromMainProcess:!0,correlationId:t}),{pid:await g.toPromise(s.onSpawn)}}async enableInspectPort(t){if(this._shutdown)throw l();const e=this._extHosts.get(t);return e?e.enableInspectPort():!1}async kill(t){if(this._shutdown)throw l();const e=this._extHosts.get(t);e&&e.kill()}async _killAllNow(){for(const[,t]of this._extHosts)t.kill()}async _waitForAllExit(t){const e=[];for(const[,s]of this._extHosts)e.push(s.waitForExit(t));return v.settled(e).then(()=>{})}};n=d([c(0,_),c(1,u),c(2,y),c(3,w)],n);export{n as ExtensionHostStarter};
