import*as C from"../../../../../../../base/browser/dom.js";import{$1c as E}from"../../../../../../../base/common/assert.js";import{$$h as S}from"../../../../../../../base/common/async.js";import{$qj as v}from"../../../../../../../base/common/buffer.js";import{$Jf as T}from"../../../../../../../base/common/cancellation.js";import{$xf as R}from"../../../../../../../base/common/event.js";import{$Mn as j}from"../../../../../../../base/common/hash.js";import{$jk as y}from"../../../../../../../base/common/htmlContent.js";import{$Ed as L}from"../../../../../../../base/common/lifecycle.js";import{autorun as P,autorunSelfDisposable as A,observableValue as D}from"../../../../../../../base/common/observable.js";import{$Fh as g}from"../../../../../../../base/common/resources.js";import{$Uf as H}from"../../../../../../../base/common/strings.js";import{$rd as w,$dd as O}from"../../../../../../../base/common/types.js";import{URI as Y}from"../../../../../../../base/common/uri.js";import{localize as W}from"../../../../../../../nls.js";import{$w5b as _}from"../../../../common/widget/chatResponseResourceFileSystemProvider.js";import{$Mj as F}from"../../../../../../../platform/instantiation/common/instantiation.js";import{$Eo as q}from"../../../../../../../platform/log/common/log.js";import{$1Q as z}from"../../../../../../../platform/opener/common/opener.js";import{$2n as J}from"../../../../../../../platform/product/common/productService.js";import{$np as N}from"../../../../../../../platform/storage/common/storage.js";import{$I5b as U}from"../../../../../mcp/browser/mcpToolCallUI.js";import{McpResourceURI as b}from"../../../../../mcp/common/mcpTypes.js";import{McpApps as X}from"../../../../../mcp/common/modelContextProtocolApps.js";import{$IFb as B,$KFb as Z}from"../../../../../webview/browser/webview.js";import{$4V as G}from"../../../../common/tools/languageModelToolsService.js";import{$w8b as V}from"../../../chat.js";var x=function(h,t,e,o){var n=arguments.length,i=n<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,e):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(h,t,e,o);else for(var a=h.length-1;a>=0;a--)(s=h[a])&&(i=(n<3?s(i):n>3?s(t,e,i):s(t,e))||i);return n>3&&i&&Object.defineProperty(t,e,i),i},d=function(h,t){return function(e,o){t(e,o,h)}},m;const Q="chatMcpApp.origins";let $=class extends L{static{m=this}static{this.a=new WeakMap}constructor(t,e,o,n,i,s,a,r,l,c,p,k,M){super(),this.toolInvocation=t,this.renderData=e,this.w=o,this.y=s,this.z=a,this.C=r,this.F=c,this.G=p,this.H=k,this.I=M,this.h=this.D(new T),this.j=!1,this.m=void 0,this.r=D(this,{status:"loading"}),this.loadState=this.r,this.t=this.D(new R),this.onDidChangeHeight=this.t.event,this.u=D(this,[]),this.downloadParts=this.u,this.b=new Z(Q,l),this.q=this.b.getOrigin("mcpApp",e.serverDefinitionId),this.g=this.D(this.y.createInstance(U,e)),this.n=m.a.get(this.toolInvocation)??300,this.f=this.D(this.C.createWebviewElement({origin:this.q,title:W(7659,null),options:{purpose:"chatOutputItem",enableFindWidget:!1,disableServiceWorker:!0,retainContextWhenHidden:!0},contentOptions:{allowMultipleAPIAcquire:!0,allowScripts:!0,allowForms:!0},extension:void 0}));const I=C.getWindow(this.w);this.f.mountTo(this.w,I),this.hostContext=this.g.hostContext.map((u,f)=>({...u,containerDimensions:{width:i.read(f),maxHeight:n.read(f)},toolCall:{toolCallId:this.toolInvocation.toolCallId,toolName:this.toolInvocation.toolId}})),this.D(P(u=>{const f=this.hostContext.read(u);this.j&&this.bb({method:"ui/notifications/host-context-changed",params:f})})),this.D(this.f.onMessage(async({message:u})=>{await this.N(u)})),this.J()}get height(){return this.n}remount(){this.f.reinitializeAfterDismount(),this.j=!1}retry(){this.r.set({status:"loading"},void 0),this.J()}async J(){const t=this.h.token;try{const e=await this.g.loadResource(t);if(t.isCancellationRequested)return;const o=this.L(e);this.j=!1,this.m=e.csp,this.f.setHtml(o),this.r.set({status:"loaded"},void 0)}catch(e){this.G.error("[MCP App] Error loading app:",e),this.r.set({status:"error",error:e},void 0)}}L({html:t,csp:e}){const o=a=>(a?.join(" ")||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i=`<meta http-equiv="Content-Security-Policy" content="${`
			default-src 'none';
			script-src 'self' 'unsafe-inline' ${o(e?.resourceDomains)};
			style-src 'self' 'unsafe-inline' ${o(e?.resourceDomains)};
			connect-src 'self' ${o(e?.connectDomains)};
			img-src 'self' data: ${o(e?.resourceDomains)};
			font-src 'self' ${o(e?.resourceDomains)};
			media-src 'self' data: ${o(e?.resourceDomains)};
			frame-src ${o(e?.frameDomains)||"'none'"};
			object-src 'none';
			base-uri ${o(e?.baseUriDomains)||"'self'"};
		`}">`;return this.M(t,i+`
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
							if (event.origin === document.location.origin && event.source !== window) { event = setMessageSource(event, window.parent); }
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

				// Scroll boundary detection: bubble wheel events to parent when at scroll boundaries
				const shouldBubbleScroll = (event) => {
					// First check element-level scrolling (for elements with overflow: auto/scroll)
					for (let node = event.target; node; node = node.parentNode) {
						if (!(node instanceof Element)) {
							continue;
						}

						// Skip HTML and BODY - we check document-level scroll separately
						if (node === document.documentElement || node === document.body) {
							continue;
						}

						// Check if the element can actually scroll
						const overflow = window.getComputedStyle(node).overflowY;
						if (overflow === 'hidden' || overflow === 'visible') {
							continue;
						}

						// Scroll up: if there's content above (scrollTop > 0), don't bubble
						if (event.deltaY < 0 && node.scrollTop > 0) {
							return false;
						}

						// Scroll down: if there's content below, don't bubble
						if (event.deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight) {
							// Account for rounding: scrollTop isn't rounded but scrollHeight/clientHeight are
							if (node.scrollHeight - node.scrollTop - node.clientHeight < 2) {
								continue;
							}
							return false;
						}
					}

					// Check document-level scrolling (works even with overflow: visible on html/body)
					const docEl = document.documentElement;
					const scrollTop = window.scrollY || docEl.scrollTop || document.body.scrollTop || 0;
					const scrollHeight = Math.max(docEl.scrollHeight, document.body.scrollHeight);
					const clientHeight = docEl.clientHeight;
					const scrollableDistance = scrollHeight - clientHeight;

					if (scrollableDistance > 2) {
						// Document is scrollable
						if (event.deltaY < 0 && scrollTop > 0) {
							return false;
						}
						if (event.deltaY > 0 && scrollTop < scrollableDistance - 2) {
							return false;
						}
					}

					return true;
				};

				window.addEventListener('wheel', (event) => {
					if (event.defaultPrevented || !shouldBubbleScroll(event)) {
						return;
					}
					api.postMessage({
						method: 'ui/notifications/sandbox-wheel',
						params: {
							deltaMode: event.deltaMode,
							deltaX: event.deltaX,
							deltaY: event.deltaY,
							deltaZ: event.deltaZ,
						}
					});
				}, { passive: true });
			})();<\/script>
		`)}M(t,e){const o=t.match(/<head[^>]*>/i);if(o){const i=o.index+o[0].length;return t.slice(0,i)+`
`+e+t.slice(i)}const n=t.match(/<html[^>]*>/i);if(n){const i=n.index+n[0].length;return t.slice(0,i)+`
<head>`+e+"</head>"+t.slice(i)}return`<!DOCTYPE html><html><head>${e}</head><body>${t}</body></html>`}async N(t){const e=t,o=this.h.token;try{let n={};switch(e.method){case"ui/initialize":n=await this.O(e.params);break;case"tools/call":n=await this.Y(e.params,o);break;case"resources/read":n=await this.Z(e.params,o);break;case"ping":break;case"ui/notifications/size-changed":this.S(e.params);break;case"ui/open-link":n=await this.X(e.params);break;case"ui/download-file":n=await this.W(e.params);break;case"ui/request-display-mode":n={mode:"inline"};break;case"ui/notifications/initialized":break;case"ui/message":n=await this.Q(e.params);break;case"ui/update-model-context":n=await this.R(e.params);break;case"notifications/message":await this.g.log(e.params);break;case"ui/notifications/sandbox-wheel":this.U(e.params);break;default:{E(e);const i=e;i.id!==void 0&&await this.ab(i.id,-32601,`Method not found: ${i.method}`);return}}w(e,{id:!0})&&await this.$(e.id,n)}catch(n){if(this.G.error(`[MCP App] Error handling ${e.method}:`,n),w(e,{id:!0})){const i=n instanceof Error?n.message:String(n);await this.ab(e.id,-32e3,i)}}}async O(t){this.j=!0;let e;try{e=JSON.parse(this.renderData.input)}catch{e=this.renderData.input}const o=this.D(S(async()=>{if(this.B.delete(o),await this.bb({method:"ui/notifications/tool-input",params:{arguments:e}}),this.toolInvocation.kind==="toolInvocationSerialized")this.P(this.toolInvocation.resultDetails);else if(this.toolInvocation.kind==="toolInvocation"){const n=this.toolInvocation;this.D(A(i=>{const s=n.state.read(i);s.type===4&&(this.P(s.resultDetails),i.dispose())}))}}));return{protocolVersion:X.LATEST_PROTOCOL_VERSION,hostInfo:{name:this.H.nameLong,version:this.H.version},hostCapabilities:{openLinks:{},serverTools:{listChanged:!0},serverResources:{listChanged:!0},logging:{},sandbox:{csp:this.m,permissions:{clipboardWrite:{}}},updateModelContext:{audio:{},image:{},resourceLink:{},resource:{},structuredContent:{}},downloadFile:{}},hostContext:this.hostContext.get()}}P(t){G(t)&&t.mcpOutput&&this.bb({method:"ui/notifications/tool-result",params:t.mcpOutput})}async Q(t){const e=this.z.getWidgetBySessionResource(this.renderData.sessionResource);return e?H(e.getInput())?(e.setInput(t.content.filter(o=>o.type==="text").map(o=>o.text).join(`

`)),e.attachmentModel.clearAndSetContext(...t.content.map((o,n)=>{const i=`mcpui-${n}-${Date.now()}`;if(o.type==="image")return{kind:"image",value:v(o.data).buffer,id:i,name:"Image"};if(o.type==="resource_link"){const s=b.fromServer({id:this.renderData.serverDefinitionId,label:""},o.uri);return{kind:"file",value:s,id:i,name:g(s)}}else return}).filter(O)),e.focusInput(),{isError:!1}):{isError:!0}:{isError:!0}}async R(t){const e=this.z.getWidgetBySessionResource(this.renderData.sessionResource);if(!e)return{};const o=`mcpui-context-${j(this.renderData.serverDefinitionId)}-`,n=e.attachmentModel.getAttachmentIDs(),i=Array.from(n).filter(r=>r.startsWith(o)),s=[];let a=0;if(t.content)for(const r of t.content){const l=`${o}${a++}`;if(r.type==="image")s.push({kind:"image",value:v(r.data).buffer,id:l,name:"Image",mimeType:r.mimeType});else if(r.type==="resource_link"){const c=b.fromServer({id:this.renderData.serverDefinitionId,label:""},r.uri);s.push({kind:"file",value:c,id:l,name:g(c)})}else if(r.type==="text"){const c=r.text.replaceAll(/\s+/g," ").trim(),p=20;s.push({kind:"generic",value:r.text,id:l,tooltip:new y().appendCodeblock("plaintext",r.text),name:c.length>p?c.slice(0,p)+"\u2026":c})}}if(t.structuredContent&&Object.keys(t.structuredContent).length>0){const r=`${o}structured`,l=JSON.stringify(t.structuredContent,null,2);s.push({kind:"generic",value:l,tooltip:new y().appendCodeblock("json",l),id:r,name:"UI Data"})}return e.attachmentModel.updateContext(i,s),{}}S(t){t.height!==void 0&&t.height!==this.n&&(this.n=t.height,m.a.set(this.toolInvocation,t.height),this.t.fire())}U(t){let e=!1;const o={wheelDeltaX:t.deltaX,wheelDeltaY:-t.deltaY,wheelDelta:Math.abs(t.deltaY),deltaX:t.deltaX,deltaY:-t.deltaY,deltaZ:t.deltaZ,deltaMode:t.deltaMode,preventDefault:()=>{e=!0},stopPropagation:()=>{},get defaultPrevented(){return e}};this.z.getWidgetBySessionResource(this.renderData.sessionResource)?.delegateScrollFromMouseWheelEvent(o)}async W(t){const e=[];let o=!1;for(const n of t.contents)try{if(n.type==="resource"){const i=n.resource,s=Y.parse(i.uri),a=w(i,{text:!0})?new TextEncoder().encode(i.text):{base64:i.blob},r=this.F.associate(this.renderData.sessionResource,a,g(s));e.push({kind:"data",mimeType:i.mimeType,uri:r})}else if(n.type==="resource_link"){const i=b.fromServer({id:this.renderData.serverDefinitionId,label:""},n.uri);e.push({kind:"data",mimeType:n.mimeType,uri:i})}}catch(i){o=!0,this.G.warn("[MCP App] Failed to process ui/download-file content",i)}if(e.length>0){const n=this.u.get();this.u.set([...n,...e],void 0)}return o?{isError:!0}:{}}async X(t){return{isError:!await this.I.open(t.url)}}async Y(t,e){if(!t?.name)throw new Error("Missing tool name in tools/call request");return this.g.callTool(t.name,t.arguments||{},e)}async Z(t,e){if(!t?.uri)throw new Error("Missing uri in resources/read request");return this.g.readResource(t.uri,e)}async $(t,e){await this.f.postMessage({jsonrpc:"2.0",id:t,result:e})}async ab(t,e,o){await this.f.postMessage({jsonrpc:"2.0",id:t,error:{code:e,message:o}})}async bb(t){await this.f.postMessage({jsonrpc:"2.0",...t})}dispose(){this.h.dispose(!0),super.dispose()}};$=m=x([d(5,F),d(6,V),d(7,B),d(8,N),d(9,_),d(10,q),d(11,J),d(12,z)],$);export{$ as $J5b};
