var P=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var L=(p,e,t,a)=>{for(var o=a>1?void 0:a?R(e,t):e,n=p.length-1,s;n>=0;n--)(s=p[n])&&(o=(a?s(e,t,o):s(o))||o);return a&&o&&P(e,t,o),o},f=(p,e)=>(t,a)=>e(t,a,p);import{AsyncIterableObject as b,AsyncIterableSource as M}from"../../../base/common/async.js";import{CancellationToken as _}from"../../../base/common/cancellation.js";import{toErrorMessage as w}from"../../../base/common/errorMessage.js";import{CancellationError as A,transformErrorForSerialization as D,transformErrorFromSerialization as S}from"../../../base/common/errors.js";import{Emitter as y,Event as m}from"../../../base/common/event.js";import{Iterable as T}from"../../../base/common/iterator.js";import{toDisposable as $}from"../../../base/common/lifecycle.js";import{localize as k}from"../../../nls.js";import{ExtensionIdentifier as c,ExtensionIdentifierMap as C,ExtensionIdentifierSet as N}from"../../../platform/extensions/common/extensions.js";import{createDecorator as O}from"../../../platform/instantiation/common/instantiation.js";import{ILogService as q}from"../../../platform/log/common/log.js";import{Progress as x}from"../../../platform/progress/common/progress.js";import{MainContext as j}from"./extHost.protocol.js";import{IExtHostAuthentication as F}from"./extHostAuthentication.js";import{IExtHostRpcService as H}from"./extHostRpcService.js";import*as v from"./extHostTypeConverters.js";import*as u from"./extHostTypes.js";import"../../contrib/chat/common/languageModels.js";import{INTERNAL_AUTH_PROVIDER_PREFIX as U}from"../../services/authentication/common/authentication.js";import{checkProposedApiEnabled as I}from"../../services/extensions/common/extensions.js";const Me=O("IExtHostLanguageModels");class E{constructor(e,t){this.option=e;this.stream=t??new M}stream=new M}class z{apiObject;_responseStreams=new Map;_defaultStream=new M;_isDone=!1;constructor(){const e=this;this.apiObject={get stream(){return e._defaultStream.asyncIterable},get text(){return b.map(e._defaultStream.asyncIterable,t=>{if(t instanceof u.LanguageModelTextPart)return t.value}).coalesce()}}}*_streams(){if(this._responseStreams.size>0)for(const[,e]of this._responseStreams)yield e.stream;else yield this._defaultStream}handleFragment(e){if(this._isDone)return;let t=this._responseStreams.get(e.index);t||(this._responseStreams.size===0?t=new E(e.index,this._defaultStream):t=new E(e.index),this._responseStreams.set(e.index,t));let a;e.part.type==="text"?a=new u.LanguageModelTextPart(e.part.value):a=new u.LanguageModelToolCallPart(e.part.name,e.part.toolCallId,e.part.parameters),t.stream.emitOne(a)}reject(e){this._isDone=!0;for(const t of this._streams())t.reject(e)}resolve(){this._isDone=!0;for(const e of this._streams())e.resolve()}}let h=class{constructor(e,t,a){this._logService=t;this._extHostAuthentication=a;this._proxy=e.getProxy(j.MainThreadLanguageModels)}static _idPool=1;_proxy;_onDidChangeModelAccess=new y;_onDidChangeProviders=new y;onDidChangeProviders=this._onDidChangeProviders.event;_languageModels=new Map;_allLanguageModelData=new Map;_modelAccessList=new C;_pendingRequest=new Map;dispose(){this._onDidChangeModelAccess.dispose(),this._onDidChangeProviders.dispose()}registerLanguageModel(e,t,a,o){const n=h._idPool++;this._languageModels.set(n,{extension:e.identifier,provider:a,languageModelId:t});let s;o.auth&&(s={providerLabel:e.displayName||e.name,accountLabel:typeof o.auth=="object"?o.auth.label:void 0}),this._proxy.$registerLanguageModelProvider(n,`${c.toKey(e.identifier)}/${t}`,{extension:e.identifier,id:t,vendor:o.vendor??c.toKey(e.identifier),name:o.name??"",family:o.family??"",version:o.version,maxInputTokens:o.maxInputTokens,maxOutputTokens:o.maxOutputTokens,auth:s,targetExtensions:o.extensions,isDefault:o.isDefault,isUserSelectable:o.isUserSelectable});const r=a.onDidReceiveLanguageModelResponse2?.(({extensionId:l,participant:d,tokenCount:i})=>{this._proxy.$whenLanguageModelChatRequestMade(t,new c(l),d,i)});return $(()=>{this._languageModels.delete(n),this._proxy.$unregisterProvider(n),r?.dispose()})}async $startChatRequest(e,t,a,o,n,s){const r=this._languageModels.get(e);if(!r)throw new Error("Provider not found");const l=new x(async i=>{if(s.isCancellationRequested){this._logService.warn(`[CHAT](${r.extension.value}) CANNOT send progress because the REQUEST IS CANCELLED`);return}let g;if(i.part instanceof u.LanguageModelToolCallPart?g={type:"tool_use",name:i.part.name,parameters:i.part.parameters,toolCallId:i.part.toolCallId}:i.part instanceof u.LanguageModelTextPart&&(g={type:"text",value:i.part.value}),!g){this._logService.warn(`[CHAT](${r.extension.value}) UNKNOWN part ${JSON.stringify(i)}`);return}this._proxy.$reportResponsePart(t,{index:i.index,part:g})});let d;if(r.provider.provideLanguageModelResponse2)d=Promise.resolve(r.provider.provideLanguageModelResponse2(o.map(v.LanguageModelChatMessage.to),n,c.toKey(a),l,s));else{const i=new x(async g=>{l.report({index:g.index,part:new u.LanguageModelTextPart(g.part)})});d=Promise.resolve(r.provider.provideLanguageModelResponse(o.map(v.LanguageModelChatMessage.to),n?.modelOptions??{},c.toKey(a),i,s))}d.then(()=>{this._proxy.$reportResponseDone(t,void 0)},i=>{this._proxy.$reportResponseDone(t,D(i))})}$provideTokenLength(e,t,a){const o=this._languageModels.get(e);return o?Promise.resolve(o.provider.provideTokenCount(t,a)):Promise.resolve(0)}$acceptChatModelMetadata(e){if(e.added)for(const{identifier:t,metadata:a}of e.added)this._allLanguageModelData.set(t,{metadata:a,apiObjects:new C});if(e.removed)for(const t of e.removed){this._allLanguageModelData.delete(t);for(const[a,o]of this._pendingRequest)o.languageModelId===t&&(o.res.reject(new A),this._pendingRequest.delete(a))}e.added?.forEach(t=>this._fakeAuthPopulate(t.metadata)),this._onDidChangeProviders.fire(void 0)}async getLanguageModelByIdentifier(e,t){const a=this._allLanguageModelData.get(t);if(!a)return;this._isUsingAuth(e.identifier,a.metadata)&&await this._fakeAuthPopulate(a.metadata);let o=a.apiObjects.get(e.identifier);if(!o){const n=this;o={id:a.metadata.id,vendor:a.metadata.vendor,family:a.metadata.family,version:a.metadata.version,name:a.metadata.name,maxInputTokens:a.metadata.maxInputTokens,countTokens(s,r){if(!n._allLanguageModelData.has(t))throw u.LanguageModelError.NotFound(t);return n._computeTokenLength(t,s,r??_.None)},sendRequest(s,r,l){if(!n._allLanguageModelData.has(t))throw u.LanguageModelError.NotFound(t);return n._sendChatRequest(e,t,s,r??{},l??_.None)}},Object.freeze(o),a.apiObjects.set(e.identifier,o)}return o}async selectLanguageModels(e,t){const a=await this._proxy.$selectChatModels({...t,extension:e.identifier}),o=[];for(const n of a){const s=await this.getLanguageModelByIdentifier(e,n);s&&o.push(s)}return o}async _sendChatRequest(e,t,a,o,n){const s=this._convertMessages(e,a),r=e.identifier,l=this._allLanguageModelData.get(t)?.metadata;if(!l||!this._allLanguageModelData.has(t))throw u.LanguageModelError.NotFound(`Language model '${t}' is unknown.`);if(this._isUsingAuth(r,l)&&(!await this._getAuthAccess(e,{identifier:l.extension,displayName:l.auth.providerLabel},o.justification,!1)||!this._modelAccessList.get(r)?.has(l.extension)))throw u.LanguageModelError.NoPermissions(`Language model '${t}' cannot be used by '${r.value}'.`);try{const d=Math.random()*1e6|0,i=new z;this._pendingRequest.set(d,{languageModelId:t,res:i});try{await this._proxy.$tryStartChatRequest(r,t,d,s,o,n)}catch(g){throw this._pendingRequest.delete(d),g}return i.apiObject}catch(d){throw d.name===u.LanguageModelError.name?d:new u.LanguageModelError(`Language model '${t}' errored: ${w(d)}`,"Unknown",d)}}_convertMessages(e,t){const a=[];for(const o of t)o.role===u.LanguageModelChatMessageRole.System&&I(e,"languageModelSystem"),o.content2.some(n=>n instanceof u.LanguageModelToolResultPart)&&I(e,"lmTools"),a.push(v.LanguageModelChatMessage.from(o));return a}async $acceptResponsePart(e,t){const a=this._pendingRequest.get(e);a&&a.res.handleFragment(t)}async $acceptResponseDone(e,t){const a=this._pendingRequest.get(e);a&&(this._pendingRequest.delete(e),t?a.res.reject(S(t)):a.res.resolve())}async _getAuthAccess(e,t,a,o){const n=U+t.identifier.value;if(await this._extHostAuthentication.getSession(e,n,[],{silent:!0}))return this.$updateModelAccesslist([{from:e.identifier,to:t.identifier,enabled:!0}]),!0;if(o)return!1;try{const r=a?k("chatAccessWithJustification","Justification: {1}",t.displayName,a):void 0;return await this._extHostAuthentication.getSession(e,n,[],{forceNewSession:{detail:r}}),this.$updateModelAccesslist([{from:e.identifier,to:t.identifier,enabled:!0}]),!0}catch{return!1}}_isUsingAuth(e,t){return!!t.auth&&!c.equals(t.extension,e)}async _fakeAuthPopulate(e){if(e.auth)for(const t of this._languageAccessInformationExtensions)try{await this._getAuthAccess(t,{identifier:e.extension,displayName:""},void 0,!0)}catch(a){this._logService.error("Fake Auth request failed"),this._logService.error(a)}}async _computeTokenLength(e,t,a){if(!this._allLanguageModelData.get(e))throw u.LanguageModelError.NotFound(`Language model '${e}' is unknown.`);const n=T.find(this._languageModels.values(),s=>s.languageModelId===e);return n?n.provider.provideTokenCount(t,a):this._proxy.$countTokens(e,typeof t=="string"?t:v.LanguageModelChatMessage.from(t),a)}$updateModelAccesslist(e){const t=new Array;for(const{from:a,to:o,enabled:n}of e){const s=this._modelAccessList.get(a)??new N;if(s.has(o)!==n){n?s.add(o):s.delete(o),this._modelAccessList.set(a,s);const l={from:a,to:o};t.push(l),this._onDidChangeModelAccess.fire(l)}}}_languageAccessInformationExtensions=new Set;createLanguageModelAccessInformation(e){this._languageAccessInformationExtensions.add(e);const t=this,a=m.signal(m.filter(this._onDidChangeModelAccess.event,n=>c.equals(n.from,e.identifier))),o=m.signal(this._onDidChangeProviders.event);return{get onDidChange(){return m.any(a,o)},canSendRequest(n){let s;e:for(const[l,d]of t._allLanguageModelData)for(const i of d.apiObjects.values())if(i===n){s=d.metadata;break e}if(!s)return;if(!t._isUsingAuth(e.identifier,s))return!0;const r=t._modelAccessList.get(e.identifier);if(r)return r.has(s.extension)}}}};h=L([f(0,H),f(1,q),f(2,F)],h);export{h as ExtHostLanguageModels,Me as IExtHostLanguageModels};
