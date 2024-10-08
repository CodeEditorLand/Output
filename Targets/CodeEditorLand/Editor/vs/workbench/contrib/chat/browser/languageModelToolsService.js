var C=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var f=(r,a,e,o)=>{for(var i=o>1?void 0:o?y(a,e):a,t=r.length-1,n;t>=0;t--)(n=r[t])&&(i=(o?n(a,e,i):n(i))||i);return o&&i&&C(a,e,i),i},l=(r,a)=>(e,o)=>a(e,o,r);import{renderStringAsPlaintext as _}from"../../../../base/browser/markdownRenderer.js";import{RunOnceScheduler as w}from"../../../../base/common/async.js";import"../../../../base/common/cancellation.js";import{CancellationError as x}from"../../../../base/common/errors.js";import{Emitter as S}from"../../../../base/common/event.js";import{Iterable as u}from"../../../../base/common/iterator.js";import{Disposable as E,toDisposable as g}from"../../../../base/common/lifecycle.js";import{localize as d}from"../../../../nls.js";import{IContextKeyService as D}from"../../../../platform/contextkey/common/contextkey.js";import{IDialogService as M}from"../../../../platform/dialogs/common/dialogs.js";import{IExtensionService as K}from"../../../services/extensions/common/extensions.js";import"../common/chatModel.js";import{ChatToolInvocation as b}from"../common/chatProgressTypes/chatToolInvocation.js";import{IChatService as $}from"../common/chatService.js";import"../common/languageModelToolsService.js";let c=class extends E{constructor(e,o,i,t){super();this._extensionService=e;this._contextKeyService=o;this._chatService=i;this._dialogService=t;this._register(this._contextKeyService.onDidChangeContext(n=>{n.affectsSome(this._toolContextKeys)&&this._onDidChangeToolsScheduler.schedule()}))}_serviceBrand;_onDidChangeTools=new S;onDidChangeTools=this._onDidChangeTools.event;_onDidChangeToolsScheduler=new w(()=>this._onDidChangeTools.fire(),750);_tools=new Map;_toolContextKeys=new Set;registerToolData(e){if(this._tools.has(e.id))throw new Error(`Tool "${e.id}" is already registered.`);return e.supportedContentTypes.includes("text/plain")||e.supportedContentTypes.push("text/plain"),this._tools.set(e.id,{data:e}),this._onDidChangeToolsScheduler.schedule(),e.when?.keys().forEach(o=>this._toolContextKeys.add(o)),g(()=>{this._tools.delete(e.id),this._refreshAllToolContextKeys(),this._onDidChangeToolsScheduler.schedule()})}_refreshAllToolContextKeys(){this._toolContextKeys.clear();for(const e of this._tools.values())e.data.when?.keys().forEach(o=>this._toolContextKeys.add(o))}registerToolImplementation(e,o){const i=this._tools.get(e);if(!i)throw new Error(`Tool "${e}" was not contributed.`);if(i.impl)throw new Error(`Tool "${e}" already has an implementation.`);return i.impl=o,g(()=>{i.impl=void 0})}getTools(){const e=u.map(this._tools.values(),o=>o.data);return u.filter(e,o=>!o.when||this._contextKeyService.contextMatchesRules(o.when))}getTool(e){return this._getToolEntry(e)?.data}_getToolEntry(e){const o=this._tools.get(e);if(o&&(!o.data.when||this._contextKeyService.contextMatchesRules(o.data.when)))return o}getToolByName(e){for(const o of this.getTools())if(o.name===e)return o}async invokeTool(e,o,i){let t=this._tools.get(e.toolId);if(!t)throw new Error(`Tool ${e.toolId} was not contributed`);if(!t.impl&&(await this._extensionService.activateByEvent(`onLanguageModelTool:${e.toolId}`),t=this._tools.get(e.toolId),!t?.impl))throw new Error(`Tool ${e.toolId} does not have an implementation registered.`);let n;if(e.context){const m=this._chatService.getSession(e.context?.sessionId),s=m.getRequests().at(-1),p=s.response?.agent?.fullName??"",h=t.impl.prepareToolInvocation?await t.impl.prepareToolInvocation(p,e.parameters,i):void 0,T=t.data.requiresConfirmation?h?.confirmationMessages??{title:d("toolConfirmTitle","Use {0}?",`"${t.data.displayName??t.data.id}"`),message:d("toolConfirmMessage","{0} will use {1}.",p,`"${t.data.displayName??t.data.id}"`)}:void 0,I=d("toolInvocationMessage","Using {0}",`"${t.data.displayName??t.data.id}"`),v=h?.invocationMessage??I;if(n=new b(v,T),i.onCancellationRequested(()=>{n.confirmed.complete(!1)}),m.acceptResponseProgress(s,n),t.data.requiresConfirmation&&!await n.confirmed.p)throw new x}else if(t.data.requiresConfirmation){const s=(t.impl.prepareToolInvocation?await t.impl.prepareToolInvocation("Some Extension",e.parameters,i):void 0)?.confirmationMessages??{title:d("toolConfirmTitle","Use {0}?",`"${t.data.displayName??t.data.id}"`),message:d("toolConfirmMessage","{0} will use {1}.","Some Extension",`"${t.data.displayName??t.data.id}"`)};await this._dialogService.confirm({message:s.title,detail:_(s.message)})}try{return await t.impl.invoke(e,o,i)}finally{n?.isCompleteDeferred.complete()}}};c=f([l(0,K),l(1,D),l(2,$),l(3,M)],c);export{c as LanguageModelToolsService};
