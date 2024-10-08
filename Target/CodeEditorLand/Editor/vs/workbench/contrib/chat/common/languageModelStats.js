var f=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var c=(d,a,e,t)=>{for(var s=t>1?void 0:t?E(a,e):a,i=d.length-1,n;i>=0;i--)(n=d[i])&&(s=(t?n(a,e,s):n(s))||s);return t&&s&&f(a,e,s),s},u=(d,a)=>(e,t)=>a(e,t,d);import{Emitter as h}from"../../../../base/common/event.js";import{Disposable as A}from"../../../../base/common/lifecycle.js";import{createDecorator as v}from"../../../../platform/instantiation/common/instantiation.js";import{IStorageService as _,StorageScope as g,StorageTarget as S}from"../../../../platform/storage/common/storage.js";import{ExtensionIdentifier as m}from"../../../../platform/extensions/common/extensions.js";import{Extensions as y,IExtensionFeaturesManagementService as C}from"../../../services/extensionManagement/common/extensionFeatures.js";import{Registry as I}from"../../../../platform/registry/common/platform.js";import{localize as l}from"../../../../nls.js";const K=v("ILanguageModelStatsService");let r=class extends A{constructor(e,t){super();this.extensionFeaturesManagementService=e;this._storageService=t;this._register(t.onDidChangeValue(g.APPLICATION,void 0,this._store)(s=>{const i=this.getModel(s.key);i&&this._onDidChangeStats.fire(i)}))}static MODEL_STATS_STORAGE_KEY_PREFIX="languageModelStats.";static MODEL_ACCESS_STORAGE_KEY_PREFIX="languageModelAccess.";_onDidChangeStats=this._register(new h);onDidChangeLanguageMoelStats=this._onDidChangeStats.event;sessionStats=new Map;hasAccessedModel(e,t){return this.getAccessExtensions(t).includes(e.toLowerCase())}async update(e,t,s,i){await this.extensionFeaturesManagementService.getAccess(t,"languageModels"),this.addAccess(e,t.value);let n=this.sessionStats.get(e);n||(n={extensions:[]},this.sessionStats.set(e,n)),this.add(n,t.value,s,i),this.write(e,t.value,s,i),this._onDidChangeStats.fire(e)}addAccess(e,t){t=t.toLowerCase();const s=this.getAccessExtensions(e);s.includes(t)||(s.push(t),this._storageService.store(this.getAccessKey(e),JSON.stringify(s),g.APPLICATION,S.USER))}getAccessExtensions(e){const t=this.getAccessKey(e),s=this._storageService.get(t,g.APPLICATION);try{if(s){const i=JSON.parse(s);if(Array.isArray(i))return i}}catch{}return[]}async write(e,t,s,i){const n=await this.read(e);this.add(n,t,s,i),this._storageService.store(this.getKey(e),JSON.stringify(n),g.APPLICATION,S.USER)}add(e,t,s,i){let n=e.extensions.find(o=>m.equals(o.extensionId,t));if(n||(n={extensionId:t,requestCount:0,tokenCount:0,participants:[]},e.extensions.push(n)),s){let o=n.participants.find(p=>p.id===s);o||(o={id:s,requestCount:0,tokenCount:0},n.participants.push(o)),o.requestCount++,o.tokenCount+=i??0}else n.requestCount++,n.tokenCount+=i??0}async read(e){try{const t=this._storageService.get(this.getKey(e),g.APPLICATION);if(t)return JSON.parse(t)}catch{}return{extensions:[]}}getModel(e){if(e.startsWith(r.MODEL_STATS_STORAGE_KEY_PREFIX))return e.substring(r.MODEL_STATS_STORAGE_KEY_PREFIX.length)}getKey(e){return`${r.MODEL_STATS_STORAGE_KEY_PREFIX}${e}`}getAccessKey(e){return`${r.MODEL_ACCESS_STORAGE_KEY_PREFIX}${e}`}};r=c([u(0,C),u(1,_)],r),I.as(y.ExtensionFeaturesRegistry).registerExtensionFeature({id:"languageModels",label:l("Language Models","Language Models"),description:l("languageModels","Language models usage statistics of this extension."),access:{canToggle:!1}});export{K as ILanguageModelStatsService,r as LanguageModelStatsService};
