var I=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var v=(c,r,e,t)=>{for(var s=t>1?void 0:t?m(r,e):r,n=c.length-1,i;n>=0;n--)(i=c[n])&&(s=(t?i(r,e,s):i(s))||s);return t&&s&&I(r,e,s),s},g=(c,r)=>(e,t)=>r(e,t,c);import{Queue as l}from"../../../../base/common/async.js";import{Disposable as p}from"../../../../base/common/lifecycle.js";import{InstantiationType as x,registerSingleton as S}from"../../../../platform/instantiation/common/extensions.js";import{createDecorator as U}from"../../../../platform/instantiation/common/instantiation.js";import{ILogService as f}from"../../../../platform/log/common/log.js";import{IProductService as _}from"../../../../platform/product/common/productService.js";import{IStorageService as y,StorageScope as d,StorageTarget as P}from"../../../../platform/storage/common/storage.js";import{IAuthenticationService as C}from"../common/authentication.js";const N=U("IAuthenticationUsageService");let u=class extends p{constructor(e,t,s,n){super();this._storageService=e;this._authenticationService=t;this._logService=s;const i=n.trustedExtensionAuthAccess;if(Array.isArray(i))for(const o of i)this._extensionsUsingAuth.add(o);else if(i)for(const o of Object.values(i))for(const a of o)this._extensionsUsingAuth.add(a);this._authenticationService.onDidRegisterAuthenticationProvider(o=>this._queue.queue(()=>this._addExtensionsToCache(o.id)))}_serviceBrand;_queue=new l;_extensionsUsingAuth=new Set;async initializeExtensionUsageCache(){await this._queue.queue(()=>Promise.all(this._authenticationService.getProviderIds().map(e=>this._addExtensionsToCache(e))))}async extensionUsesAuth(e){return await this._queue.whenIdle(),this._extensionsUsingAuth.has(e)}readAccountUsages(e,t){const s=`${e}-${t}-usages`,n=this._storageService.get(s,d.APPLICATION);let i=[];if(n)try{i=JSON.parse(n)}catch{}return i}removeAccountUsage(e,t){const s=`${e}-${t}-usages`;this._storageService.remove(s,d.APPLICATION)}addAccountUsage(e,t,s,n,i){const o=`${e}-${t}-usages`,a=this.readAccountUsages(e,t),h=a.findIndex(A=>A.extensionId===n);h>-1?a.splice(h,1,{extensionId:n,extensionName:i,scopes:s,lastUsed:Date.now()}):a.push({extensionId:n,extensionName:i,scopes:s,lastUsed:Date.now()}),this._storageService.store(o,JSON.stringify(a),d.APPLICATION,P.MACHINE),this._extensionsUsingAuth.add(n)}async _addExtensionsToCache(e){try{const t=await this._authenticationService.getAccounts(e);for(const s of t){const n=this.readAccountUsages(e,s.label);for(const i of n)this._extensionsUsingAuth.add(i.extensionId)}}catch(t){this._logService.error(t)}}};u=v([g(0,y),g(1,C),g(2,f),g(3,_)],u),S(N,u,x.Delayed);export{u as AuthenticationUsageService,N as IAuthenticationUsageService};
