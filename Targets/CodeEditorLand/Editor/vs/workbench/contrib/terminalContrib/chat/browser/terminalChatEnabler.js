var h=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var c=(s,t,o,e)=>{for(var r=e>1?void 0:e?p(t,o):t,n=s.length-1,a;n>=0;n--)(a=s[n])&&(r=(e?a(t,o,r):a(r))||r);return e&&r&&h(t,o,r),r},d=(s,t)=>(o,e)=>t(o,e,s);import{DisposableStore as x}from"../../../../../base/common/lifecycle.js";import{IContextKeyService as m}from"../../../../../platform/contextkey/common/contextkey.js";import{IChatAgentService as v,ChatAgentLocation as C}from"../../../chat/common/chatAgents.js";import{TerminalChatContextKeys as g}from"./terminalChat.js";let i=class{static Id="terminalChat.enabler";_ctxHasProvider;_store=new x;constructor(t,o){this._ctxHasProvider=g.hasChatAgent.bindTo(o),this._store.add(t.onDidChangeAgents(()=>{const e=!!t.getDefaultAgent(C.Terminal);this._ctxHasProvider.set(e)}))}dispose(){this._ctxHasProvider.reset(),this._store.dispose()}};i=c([d(0,v),d(1,m)],i);export{i as TerminalChatEnabler};
