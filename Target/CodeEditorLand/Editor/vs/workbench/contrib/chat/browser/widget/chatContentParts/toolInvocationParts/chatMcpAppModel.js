import*as I from"../../../../../../../base/browser/dom.js";import{$1c as C}from"../../../../../../../base/common/assert.js";import{$0h as M}from"../../../../../../../base/common/async.js";import{$pj as E}from"../../../../../../../base/common/buffer.js";import{$If as S}from"../../../../../../../base/common/cancellation.js";import{$wf as x}from"../../../../../../../base/common/event.js";import{$Ed as L}from"../../../../../../../base/common/lifecycle.js";import{autorun as u,autorunSelfDisposable as R,derived as k,observableValue as j}from"../../../../../../../base/common/observable.js";import{$Eh as O}from"../../../../../../../base/common/resources.js";import{$Tf as W}from"../../../../../../../base/common/strings.js";import{$rd as d,$dd as A}from"../../../../../../../base/common/types.js";import{localize as P}from"../../../../../../../nls.js";import{$Lj as q}from"../../../../../../../platform/instantiation/common/instantiation.js";import{$xo as _}from"../../../../../../../platform/log/common/log.js";import{$yP as z}from"../../../../../../../platform/opener/common/opener.js";import{$Un as T}from"../../../../../../../platform/product/common/productService.js";import{$gp as F}from"../../../../../../../platform/storage/common/storage.js";import{$H2b as H}from"../../../../../mcp/browser/mcpToolCallUI.js";import{McpResourceURI as U}from"../../../../../mcp/common/mcpTypes.js";import{McpApps as N}from"../../../../../mcp/common/modelContextProtocolApps.js";import{$SCb as V,$UCb as G}from"../../../../../webview/browser/webview.js";import{$iS as B}from"../../../../common/tools/languageModelToolsService.js";import{$O3b as J}from"../../../chat.js";var D=function(l,t,e,i){var o=arguments.length,s=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(l,t,e,i);else for(var c=l.length-1;c>=0;c--)(r=l[c])&&(s=(o<3?r(s):o>3?r(t,e,s):r(t,e))||s);return o>3&&s&&Object.defineProperty(t,e,s),s},h=function(l,t){return function(e,i){t(e,i,l)}};const Q="chatMcpApp.origins";let m=class extends L{constructor(t,e,i,o,s,r,c,f,g,w,b,v){super(),this.toolInvocation=t,this.renderData=e,this.t=i,this.u=r,this.w=c,this.y=f,this.z=w,this.C=b,this.F=v,this.g=this.D(new S),this.h=!1,this.j=void 0,this.m=300,this.q=j(this,{status:"loading"}),this.loadState=this.q,this.r=this.D(new x),this.onDidChangeHeight=this.r.event,this.a=new G(Q,g),this.n=this.a.getOrigin("mcpApp",e.serverDefinitionId),this.f=this.D(this.u.createInstance(H,e)),this.b=this.D(this.y.createWebviewElement({origin:this.n,title:P(6382,null),options:{purpose:"chatOutputItem",enableFindWidget:!1,disableServiceWorker:!0,retainContextWhenHidden:!0},contentOptions:{allowMultipleAPIAcquire:!0,allowScripts:!0,allowForms:!0},extension:void 0}));const y=I.getWindow(this.t);this.b.mountTo(this.t,y),this.hostContext=this.f.hostContext.map((n,a)=>({...n,containerDimensions:{width:s.read(a),maxHeight:o.read(a)},toolCall:{toolCallId:this.toolInvocation.toolCallId,toolName:this.toolInvocation.toolId}})),this.D(u(n=>{const a=this.hostContext.read(n);this.h&&this.W({method:"ui/notifications/host-context-changed",params:a})})),this.D(this.b.onMessage(async({message:n})=>{await this.J(n)}));const $=k(n=>{const a=this.b.intrinsicContentSize.read(n),p=o.read(n);return a?a.height>p:!1});this.D(u(n=>{if(!$.read(n)){const a=this.w.getWidgetBySessionResource(this.renderData.sessionResource);n.store.add(this.b.onDidWheel(p=>{a?.delegateScrollFromMouseWheelEvent({...p,preventDefault:()=>{},stopPropagation:()=>{}})}))}})),this.G()}get height(){return this.m}remount(){this.b.reinitializeAfterDismount(),this.h=!1}retry(){this.q.set({status:"loading"},void 0),this.G()}async G(){const t=this.g.token;try{const e=await this.f.loadResource(t);if(t.isCancellationRequested)return;const i=this.H(e);this.h=!1,this.j=e.csp,this.b.setHtml(i),this.q.set({status:"loaded"},void 0)}catch(e){this.z.error("[MCP App] Error loading app:",e),this.q.set({status:"error",error:e},void 0)}}H({html:t,csp:e}){const i=c=>(c?.join(" ")||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s=`<meta http-equiv="Content-Security-Policy" content="${`
			default-src 'none';
			script-src 'self' 'unsafe-inline' ${i(e?.resourceDomains)};
			style-src 'self' 'unsafe-inline' ${i(e?.resourceDomains)};
			connect-src 'self' ${i(e?.connectDomains)};
			img-src 'self' data: ${i(e?.resourceDomains)};
			font-src 'self' ${i(e?.resourceDomains)};
			media-src 'self' data: ${i(e?.resourceDomains)};
			frame-src ${i(e?.frameDomains)||"'none'"};
			object-src 'none';
			base-uri ${i(e?.baseUriDomains)||"'self'"};
		`}">`;return this.I(t,s+`
			<script>(() => {
				const api = acquireVsCodeApi();
				const setMessageSource = (obj, src) => new Proxy(obj, {
					get: (target, prop) => {
						if (prop === 'source')  {
							return src;
						}
						return target[prop];
					}
				});

				const wrappedFns = new WeakMap();

				let patchedPostMessage = (message, transfer) => api.postMessage(message, transfer);
				const wrap = target => new Proxy(target, {
					set: (obj, prop, value) => {
						if (prop === 'postMessage') {
							patchedPostMessage = (message, transfer) => value.call(target, message, transfer);
						} else {
							obj[prop] = value;
						}
						return true;
					},
					get: (obj, prop) => {
						if (prop === 'postMessage') {
							return patchedPostMessage;
						}
						return obj[prop];
					},
				});

				const originalAddEventListener = window.addEventListener.bind(window);
				window.addEventListener = (type, listener, options) => {
					if (type === 'message') {
						const originalListener = listener;
						const wrappedListener = (event) => {
							if (event.source.origin === document.location.origin && event.source !== window) { event = setMessageSource(event, window.parent); }
							originalListener(event);
						};
						wrappedFns.set(originalListener, wrappedListener);
						listener = wrappedListener;
					}

					return originalAddEventListener(type, listener, options);
				};

				const originalRemoveEventListener = window.removeEventListener.bind(window);
				window.removeEventListener = (type, listener, options) => {
					const wrappedListener = wrappedFns.get(listener) || listener;
					return originalRemoveEventListener(type, wrappedListener, options);
				};

				window.parent = wrap(window.parent);
			})();<\/script>
		`)}I(t,e){const i=t.match(/<head[^>]*>/i);if(i){const s=i.index+i[0].length;return t.slice(0,s)+`
`+e+t.slice(s)}const o=t.match(/<html[^>]*>/i);if(o){const s=o.index+o[0].length;return t.slice(0,s)+`
<head>`+e+"</head>"+t.slice(s)}return`<!DOCTYPE html><html><head>${e}</head><body>${t}</body></html>`}async J(t){const e=t,i=this.g.token;try{let o={};switch(e.method){case"ui/initialize":o=await this.L(e.params);break;case"tools/call":o=await this.Q(e.params,i);break;case"resources/read":o=await this.R(e.params,i);break;case"ping":break;case"ui/notifications/size-changed":this.O(e.params);break;case"ui/open-link":o=await this.P(e.params);break;case"ui/request-display-mode":break;case"ui/notifications/initialized":break;case"ui/message":o=await this.N(e.params);break;case"notifications/message":await this.f.log(e.params);break;default:{C(e);const s=e;s.id!==void 0&&await this.U(s.id,-32601,`Method not found: ${s.method}`);return}}d(e,{id:!0})&&await this.S(e.id,o)}catch(o){if(this.z.error(`[MCP App] Error handling ${e.method}:`,o),d(e,{id:!0})){const s=o instanceof Error?o.message:String(o);await this.U(e.id,-32e3,s)}}}async L(t){this.h=!0;let e;try{e=JSON.parse(this.renderData.input)}catch{e=this.renderData.input}const i=this.D(M(async()=>{if(this.B.delete(i),await this.W({method:"ui/notifications/tool-input",params:{arguments:e}}),this.toolInvocation.kind==="toolInvocationSerialized")this.M(this.toolInvocation.resultDetails);else if(this.toolInvocation.kind==="toolInvocation"){const o=this.toolInvocation;this.D(R(s=>{const r=o.state.read(s);r.type===4&&(this.M(r.resultDetails),s.dispose())}))}}));return{protocolVersion:N.LATEST_PROTOCOL_VERSION,hostInfo:{name:this.C.nameLong,version:this.C.version},hostCapabilities:{openLinks:{},serverTools:{listChanged:!0},serverResources:{listChanged:!0},logging:{},sandbox:{csp:this.j,permissions:{clipboardWrite:!0}}},hostContext:this.hostContext.get()}}M(t){B(t)&&t.mcpOutput&&this.W({method:"ui/notifications/tool-result",params:t.mcpOutput})}async N(t){const e=this.w.getWidgetBySessionResource(this.renderData.sessionResource);return e?W(e.getInput())?(e.setInput(t.content.filter(i=>i.type==="text").map(i=>i.text).join(`

`)),e.attachmentModel.clearAndSetContext(...t.content.map((i,o)=>{const s=`mcpui-${o}-${Date.now()}`;if(i.type==="image")return{kind:"image",value:E(i.data).buffer,id:s,name:"Image"};if(i.type==="resource_link"){const r=U.fromServer({id:this.renderData.serverDefinitionId,label:""},i.uri);return{kind:"file",value:r,id:s,name:O(r)}}else return}).filter(A)),e.focusInput(),{isError:!1}):{isError:!0}:{isError:!0}}O(t){t.height!==void 0&&(this.m=t.height,this.r.fire())}async P(t){return{isError:!await this.F.open(t.url)}}async Q(t,e){if(!t?.name)throw new Error("Missing tool name in tools/call request");return this.f.callTool(t.name,t.arguments||{},e)}async R(t,e){if(!t?.uri)throw new Error("Missing uri in resources/read request");return this.f.readResource(t.uri,e)}async S(t,e){await this.b.postMessage({jsonrpc:"2.0",id:t,result:e})}async U(t,e,i){await this.b.postMessage({jsonrpc:"2.0",id:t,error:{code:e,message:i}})}async W(t){await this.b.postMessage({jsonrpc:"2.0",...t})}dispose(){this.g.dispose(!0),super.dispose()}};m=D([h(5,q),h(6,J),h(7,V),h(8,F),h(9,_),h(10,T),h(11,z)],m);export{m as $I2b};
