import"./media/releasenoteseditor.css";import{CancellationToken as z}from"../../../../base/common/cancellation.js";import{$eb as _}from"../../../../base/common/errors.js";import{$Qj as y}from"../../../../base/common/htmlContent.js";import{$K9 as D}from"../../../../base/common/keybindingParser.js";import{$yf as M}from"../../../../base/common/strings.js";import{URI as b}from"../../../../base/common/uri.js";import{$Im as P}from"../../../../base/common/uuid.js";import{$HD as $}from"../../../../editor/common/languages.js";import{$HOb as q}from"../../../../editor/common/languages/supports/tokenization.js";import{$JD as H}from"../../../../editor/common/languages/language.js";import*as w from"../../../../nls.js";import{$9k as L}from"../../../../platform/environment/common/environment.js";import{$ix as O}from"../../../../platform/keybinding/common/keybinding.js";import{$30 as j}from"../../../../platform/opener/common/opener.js";import{$en as A}from"../../../../platform/product/common/productService.js";import{$io as I,$do as U}from"../../../../platform/request/common/request.js";import{$5gc as W,$6gc as B}from"../../markdown/browser/markdownDocumentRenderer.js";import{$yXb as K}from"../../webviewPanel/browser/webviewWorkbenchService.js";import{$6H as V}from"../../../services/editor/common/editorGroupsService.js";import{$$H as T,$0H as F}from"../../../services/editor/common/editorService.js";import{$sO as Q}from"../../../services/extensions/common/extensions.js";import{$xu as X,$vu as Y}from"../../../../platform/telemetry/common/telemetryUtils.js";import{$vl as G}from"../../../../platform/configuration/common/configuration.js";import{$sd as k}from"../../../../base/common/lifecycle.js";import{$$tc as J}from"../../markdown/browser/markdownSettingRenderer.js";import{$ej as Z}from"../../../../platform/instantiation/common/instantiation.js";import{Schemas as R}from"../../../../base/common/network.js";import{$9$ as ee}from"../../../../editor/browser/services/codeEditorService.js";import{$fh as te}from"../../../../base/common/resources.js";import{$QSb as oe}from"../../webview/common/webview.js";var N=function(g,e,t,o){var a=arguments.length,n=a<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(g,e,t,o);else for(var r=g.length-1;r>=0;r--)(i=g[r])&&(n=(a<3?i(n):a>3?i(e,t,n):i(e,t))||n);return a>3&&n&&Object.defineProperty(e,t,n),n},l=function(g,e){return function(t,o){e(t,o,g)}};let E=class{constructor(e,t,o,a,n,i,r,m,h,u,s,f,v){this.g=e,this.h=t,this.i=o,this.j=a,this.k=n,this.l=i,this.m=r,this.n=m,this.o=h,this.p=u,this.q=s,this.r=f,this.s=v,this.b=new Map,this.c=void 0,this.f=new k,$.onDidChange(()=>this.t()),i.onDidChangeConfiguration(this.B,this,this.f),u.onDidChangeActiveWebviewEditor(this.C,this,this.f),this.a=this.s.createInstance(J)}async t(){if(!this.c||!this.d)return;const e=await this.A(this.d);this.c&&this.c.webview.setHtml(e)}async u(e){if(e){const t=this.o.getActiveCodeEditor()?.getModel()?.uri;if(t)return te(t)}return b.parse("https://code.visualstudio.com/raw")}async show(e,t){const o=await this.v(e,t),a=await this.u(t);this.d={text:o,base:a};const n=await this.A(this.d),i=w.localize(12408,null,e),r=this.m.activeEditorPane;if(this.c)this.c.setName(i),this.c.webview.setHtml(n),this.p.revealWebview(this.c,r?r.group:this.n.activeGroup,!1);else{this.c=this.p.openWebview({title:i,options:{tryRestoreScrollPosition:!0,enableFindWidget:!0,disableServiceWorker:!t},contentOptions:{localResourceRoots:t?[a]:[],allowScripts:!0},extension:void 0},"releaseNotes",i,{group:T,preserveFocus:!1}),this.c.webview.onDidClickLink(h=>this.w(b.parse(h)));const m=new k;m.add(this.c.webview.onMessage(h=>{if(h.message.type==="showReleaseNotes")this.l.updateValue("update.showReleaseNotes",h.message.value);else if(h.message.type==="clickSetting"){const u=this.c?.webview.container.offsetLeft+h.message.value.x,s=this.c?.webview.container.offsetTop+h.message.value.y;this.a.updateSetting(b.parse(h.message.value.uri),u,s)}})),m.add(this.c.onWillDispose(()=>{m.dispose(),this.c=void 0})),this.c.webview.setHtml(n)}return!0}async v(e,t){const o=/^(\d+\.\d+)\./.exec(e);if(!o)throw new Error("not found");const i=`https://code.visualstudio.com/raw/v${o[1].replace(/\./g,"_")}.md`,r=w.localize(12409,null),m=s=>M(s).replace(/\\/g,"\\\\"),h=s=>{const f=(p,c)=>{const d=this.h.lookupKeybinding(c);return d&&d.getLabel()||r},v=(p,c)=>{const d=D.parseKeybinding(c);if(!d)return r;const x=this.h.resolveKeybinding(d);return x.length===0?r:x[0].getLabel()||r},C=(p,c)=>{const d=f(p,c);return d&&`<code title="${c}">${m(d)}</code>`},S=(p,c)=>{const d=v(p,c);return d&&`<code title="${c}">${m(d)}</code>`};return s.replace(/`kb\(([a-z.\d\-]+)\)`/gi,C).replace(/`kbstyle\(([^\)]+)\)`/gi,S).replace(/kb\(([a-z.\d\-]+)\)/gi,(p,c)=>y(f(p,c))).replace(/kbstyle\(([^\)]+)\)/gi,(p,c)=>y(v(p,c)))},u=async()=>{let s;try{if(t){const f=this.o.getActiveCodeEditor()?.getModel()?.getValue();s=f?f.substring(f.indexOf("#")):void 0}else s=await I(await this.k.request({url:i},z.None))}catch{throw new Error("Failed to fetch release notes")}if(!s||!/^#\s/.test(s)&&!t)throw new Error("Invalid release notes");return h(s)};return t?u():(this.b.has(e)||this.b.set(e,(async()=>{try{return await u()}catch(s){throw this.b.delete(e),s}})()),this.b.get(e))}async w(e){e.scheme===R.codeSetting||this.z(e,"ReleaseNotes").then(t=>this.j.open(t,{allowCommands:["workbench.action.openSettings"]})).then(void 0,_)}async z(e,t,o="1"){return Y(this.r,this.g)&&X(this.l)===3&&e.scheme==="https"&&e.authority==="code.visualstudio.com"?e.with({query:`${e.query?e.query+"&":""}utm_source=VsCode&utm_medium=${encodeURIComponent(t)}&utm_content=${encodeURIComponent(o)}`}):e}async A(e){const t=P(),o=await B(e.text,this.q,this.i,{shouldSanitize:!1,markedExtensions:[{renderer:{html:this.a.getHtmlRenderer(),codespan:this.a.getCodeSpanRenderer()}}]}),a=$.getColorMap(),n=a?q(a):"",i=!!this.l.getValue("update.showReleaseNotes");return`<!DOCTYPE html>
		<html>
			<head>
				<base href="${oe(e.base).toString(!0)}/" >
				<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; media-src https:; style-src 'nonce-${t}' https://code.visualstudio.com; script-src 'nonce-${t}';">
				<style nonce="${t}">
					${W}
					${n}

					/* codesetting */

					code:has(.codesetting) {
						background-color: var(--vscode-textPreformat-background);
						color: var(--vscode-textPreformat-foreground);
						padding-left: 1px;
						margin-right: 3px;
						padding-right: 0px;
					}

					code:has(.codesetting):focus {
						border: 1px solid var(--vscode-button-border, transparent);
					}

					.codesetting {
						color: var(--vscode-textPreformat-foreground);
						padding: 0px 1px 1px 0px;
						font-size: 0px;
						overflow: hidden;
						text-overflow: ellipsis;
						outline-offset: 2px !important;
						box-sizing: border-box;
						text-align: center;
						cursor: pointer;
						display: inline;
						margin-right: 3px;
					}
					.codesetting svg {
						font-size: 12px;
						text-align: center;
						cursor: pointer;
						border: 1px solid var(--vscode-button-secondaryBorder, transparent);
						outline: 1px solid transparent;
						line-height: 9px;
						margin-bottom: -5px;
						padding-left: 0px;
						padding-top: 2px;
						padding-bottom: 2px;
						padding-right: 2px;
						display: inline-block;
						text-decoration: none;
						text-rendering: auto;
						text-transform: none;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
						user-select: none;
						-webkit-user-select: none;
					}
					.codesetting .setting-name {
						font-size: 13px;
						padding-left: 2px;
						padding-right: 3px;
						padding-top: 1px;
						padding-bottom: 1px;
						margin-top: -3px;
					}
					.codesetting:hover {
						color: var(--vscode-textPreformat-foreground) !important;
						text-decoration: none !important;
					}
					code:has(.codesetting):hover {
						filter: brightness(140%);
						text-decoration: none !important;
					}
					.codesetting:focus {
						outline: 0 !important;
						text-decoration: none !important;
						color: var(--vscode-button-hoverForeground) !important;
					}
					.codesetting .separator {
						width: 1px;
						height: 14px;
						margin-bottom: -3px;
						display: inline-block;
						background-color: var(--vscode-editor-background);
						font-size: 12px;
						margin-right: 4px;
					}

					header { display: flex; align-items: center; padding-top: 1em; }
				</style>
			</head>
			<body>
				${o}
				<script nonce="${t}">
					const vscode = acquireVsCodeApi();
					const container = document.createElement('p');
					container.style.display = 'flex';
					container.style.alignItems = 'center';

					const input = document.createElement('input');
					input.type = 'checkbox';
					input.id = 'showReleaseNotes';
					input.checked = ${i};
					container.appendChild(input);

					const label = document.createElement('label');
					label.htmlFor = 'showReleaseNotes';
					label.textContent = '${w.localize(12410,null)}';
					container.appendChild(label);

					const beforeElement = document.querySelector("body > h1")?.nextElementSibling;
					if (beforeElement) {
						document.body.insertBefore(container, beforeElement);
					} else {
						document.body.appendChild(container);
					}

					window.addEventListener('message', event => {
						if (event.data.type === 'showReleaseNotes') {
							input.checked = event.data.value;
						}
					});

					window.addEventListener('click', event => {
						const href = event.target.href ?? event.target.parentElement?.href ?? event.target.parentElement?.parentElement?.href;
						if (href && (href.startsWith('${R.codeSetting}'))) {
							vscode.postMessage({ type: 'clickSetting', value: { uri: href, x: event.clientX, y: event.clientY }});
						}
					});

					window.addEventListener('keypress', event => {
						if (event.keyCode === 13) {
							if (event.target.children.length > 0 && event.target.children[0].href) {
								const clientRect = event.target.getBoundingClientRect();
								vscode.postMessage({ type: 'clickSetting', value: { uri: event.target.children[0].href, x: clientRect.right , y: clientRect.bottom }});
							}
						}
					});

					input.addEventListener('change', event => {
						vscode.postMessage({ type: 'showReleaseNotes', value: input.checked }, '*');
					});
				</script>
			</body>
		</html>`}B(e){e.affectsConfiguration("update.showReleaseNotes")&&this.D()}C(e){e&&e===this.c&&this.D()}D(){this.c&&this.c.webview.postMessage({type:"showReleaseNotes",value:this.l.getValue("update.showReleaseNotes")})}};E=N([l(0,L),l(1,O),l(2,H),l(3,j),l(4,U),l(5,G),l(6,F),l(7,V),l(8,ee),l(9,K),l(10,Q),l(11,A),l(12,Z)],E);export{E as $_tc};
