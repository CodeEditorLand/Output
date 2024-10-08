var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var m=(l,e,i,n)=>{for(var t=n>1?void 0:n?v(e,i):e,r=l.length-1,o;r>=0;r--)(o=l[r])&&(t=(n?o(e,i,t):o(t))||t);return n&&t&&u(e,i,t),t},s=(l,e)=>(i,n)=>e(i,n,l);import*as h from"../../../base/common/performance.js";import{URI as x}from"../../../base/common/uri.js";import{MainContext as f}from"./extHost.protocol.js";import{IExtHostConfiguration as _}from"./extHostConfiguration.js";import{nullExtensionDescription as y}from"../../services/extensions/common/extensions.js";import"vscode";import{ExtensionIdentifierMap as I}from"../../../platform/extensions/common/extensions.js";import"./extHost.api.impl.js";import{IExtHostRpcService as S}from"./extHostRpcService.js";import{IExtHostInitDataService as g}from"./extHostInitDataService.js";import{IInstantiationService as w}from"../../../platform/instantiation/common/instantiation.js";import{IExtHostExtensionService as E}from"./extHostExtensionService.js";import{ILogService as P}from"../../../platform/log/common/log.js";import{escapeRegExpCharacters as T}from"../../../base/common/strings.js";let c=class{constructor(e,i,n,t,r,o,d){this._apiFactory=e;this._extensionRegistry=i;this._instaService=n;this._extHostConfiguration=t;this._extHostExtensionService=r;this._initData=o;this._logService=d;this._factories=new Map,this._alternatives=[]}_factories;_alternatives;async install(){this._installInterceptor(),h.mark("code/extHost/willWaitForConfig");const e=await this._extHostConfiguration.getConfigProvider();h.mark("code/extHost/didWaitForConfig");const i=await this._extHostExtensionService.getExtensionPathIndex();this.register(new M(this._apiFactory,i,this._extensionRegistry,e,this._logService)),this.register(this._instaService.createInstance(a)),this._initData.remote.isRemote&&this.register(this._instaService.createInstance(p,i,this._initData.environment.appUriScheme))}register(e){if("nodeModuleName"in e)if(Array.isArray(e.nodeModuleName))for(const i of e.nodeModuleName)this._factories.set(i,e);else this._factories.set(e.nodeModuleName,e);typeof e.alternativeModuleName=="function"&&this._alternatives.push(i=>e.alternativeModuleName(i))}};c=m([s(2,w),s(3,_),s(4,E),s(5,g),s(6,P)],c);let a=class{static aliased=new Map([["vscode-ripgrep","@vscode/ripgrep"],["vscode-windows-registry","@vscode/windows-registry"]]);re;constructor(e){if(e.environment.appRoot&&a.aliased.size){const i=T(this.forceForwardSlashes(e.environment.appRoot.fsPath)),n="[a-z0-9_.-]",t=`@${n}+\\/${n}+|${n}+`,r="node_modules|node_modules\\.asar(?:\\.unpacked)?";this.re=new RegExp(`^(${i}/${r}\\/)(${t})(.*)$`,"i")}}alternativeModuleName(e){if(!this.re)return;const i=this.re.exec(this.forceForwardSlashes(e));if(!i)return;const[,n,t,r]=i,o=a.aliased.get(t);if(o!==void 0)return n+o+r}forceForwardSlashes(e){return e.replace(/\\/g,"/")}};a=m([s(0,g)],a);class M{constructor(e,i,n,t,r){this._apiFactory=e;this._extensionPaths=i;this._extensionRegistry=n;this._configProvider=t;this._logService=r}nodeModuleName="vscode";_extApiImpl=new I;_defaultApiImpl;load(e,i){const n=this._extensionPaths.findSubstr(i);if(n){let t=this._extApiImpl.get(n.identifier);return t||(t=this._apiFactory(n,this._extensionRegistry,this._configProvider),this._extApiImpl.set(n.identifier,t)),t}if(!this._defaultApiImpl){let t="";this._extensionPaths.forEach((r,o)=>t+=`	${o} -> ${r.identifier.value}
`),this._logService.warn(`Could not identify extension for 'vscode' require call from ${i}. These are the extension path mappings: 
${t}`),this._defaultApiImpl=this._apiFactory(y,this._extensionRegistry,this._configProvider)}return this._defaultApiImpl}}let p=class{constructor(e,i,n){this._extensionPaths=e;this._appUriScheme=i;this._mainThreadTelemetry=n.getProxy(f.MainThreadTelemetry);const t=n.getProxy(f.MainThreadWindow);this._impl=(r,o)=>{const d=x.parse(r);return o?this.callOriginal(r,o):d.scheme==="http"||d.scheme==="https"?t.$openUri(d,r,{allowTunneling:!0}):d.scheme==="mailto"||d.scheme===this._appUriScheme?t.$openUri(d,r,{}):this.callOriginal(r,o)}}nodeModuleName=["open","opn"];_extensionId;_original;_impl;_mainThreadTelemetry;load(e,i,n){const t=this._extensionPaths.findSubstr(i);return t&&(this._extensionId=t.identifier.value,this.sendShimmingTelemetry()),this._original=n(e),this._impl}callOriginal(e,i){return this.sendNoForwardTelemetry(),this._original(e,i)}sendShimmingTelemetry(){this._extensionId&&this._mainThreadTelemetry.$publicLog2("shimming.open",{extension:this._extensionId})}sendNoForwardTelemetry(){this._extensionId&&this._mainThreadTelemetry.$publicLog2("shimming.open.call.noForward",{extension:this._extensionId})}};p=m([s(2,S)],p);export{c as RequireInterceptor};
