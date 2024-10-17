var l=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var c=(o,i,e,r)=>{for(var t=r>1?void 0:r?m(i,e):i,a=o.length-1,u;a>=0;a--)(u=o[a])&&(t=(r?u(i,e,t):u(t))||t);return r&&t&&l(i,e,t),t},s=(o,i)=>(e,r)=>i(e,r,o);import{IConfigurationService as v}from"../../../../platform/configuration/common/configuration.js";import{InstantiationType as f,registerSingleton as p}from"../../../../platform/instantiation/common/extensions.js";import{AbstractRequestService as d,IRequestService as g}from"../../../../platform/request/common/request.js";import{INativeHostService as h}from"../../../../platform/native/common/native.js";import"../../../../base/parts/request/common/request.js";import"../../../../base/common/cancellation.js";import{request as y}from"../../../../base/parts/request/browser/request.js";import{ILogService as I}from"../../../../platform/log/common/log.js";let n=class extends d{constructor(e,r,t){super(t);this.nativeHostService=e;this.configurationService=r}async request(e,r){return e.proxyAuthorization||(e.proxyAuthorization=this.configurationService.getValue("http.proxyAuthorization")),this.logAndRequest(e,()=>y(e,r))}async resolveProxy(e){return this.nativeHostService.resolveProxy(e)}async lookupAuthorization(e){return this.nativeHostService.lookupAuthorization(e)}async lookupKerberosAuthorization(e){return this.nativeHostService.lookupKerberosAuthorization(e)}async loadCertificates(){return this.nativeHostService.loadCertificates()}};n=c([s(0,h),s(1,v),s(2,I)],n),p(g,n,f.Delayed);export{n as NativeRequestService};
