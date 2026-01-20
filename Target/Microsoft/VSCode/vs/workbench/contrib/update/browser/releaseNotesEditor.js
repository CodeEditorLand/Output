import"./media/releasenoteseditor.css";import{CancellationToken as z}from"../../../../base/common/cancellation.js";import{$mb as L}from"../../../../base/common/errors.js";import{$mk as k}from"../../../../base/common/htmlContent.js";import{$V_ as N}from"../../../../base/common/keybindingParser.js";import{$Xf as R}from"../../../../base/common/strings.js";import{URI as w}from"../../../../base/common/uri.js";import{$kn as E}from"../../../../base/common/uuid.js";import{$VF as C}from"../../../../editor/common/languages.js";import{$PK as Z}from"../../../../editor/common/languages/supports/tokenization.js";import{$WF as D}from"../../../../editor/common/languages/language.js";import*as y from"../../../../nls.js";import{$Jl as G}from"../../../../platform/environment/common/environment.js";import{$cy as P}from"../../../../platform/keybinding/common/keybinding.js";import{$yP as j}from"../../../../platform/opener/common/opener.js";import{$Un as S}from"../../../../platform/product/common/productService.js";import{$2o as W,$Uo as B}from"../../../../platform/request/common/request.js";import{$cqc as O,$dqc as U}from"../../markdown/browser/markdownDocumentRenderer.js";import{$O4b as Y}from"../../webviewPanel/browser/webviewWorkbenchService.js";import{$uL as A}from"../../../services/editor/common/editorGroupsService.js";import{$zL as J,$yL as V}from"../../../services/editor/common/editorService.js";import{$4R as T}from"../../../services/extensions/common/extensions.js";import{$lv as K,$jv as F}from"../../../../platform/telemetry/common/telemetryUtils.js";import{$9l as Q}from"../../../../platform/configuration/common/configuration.js";import{$Ed as X,$Dd as q}from"../../../../base/common/lifecycle.js";import{$HFc as _}from"../../markdown/browser/markdownSettingRenderer.js";import{$Lj as ee}from"../../../../platform/instantiation/common/instantiation.js";import{Schemas as f}from"../../../../base/common/network.js";import{$ucb as te}from"../../../../editor/browser/services/codeEditorService.js";import{$Gh as oe}from"../../../../base/common/resources.js";import{$wGb as ne}from"../../webview/common/webview.js";var M=function(h,e,t,o){var a=arguments.length,n=a<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(h,e,t,o);else for(var s=h.length-1;s>=0;s--)(i=h[s])&&(n=(a<3?i(n):a>3?i(e,t,n):i(e,t))||n);return a>3&&n&&Object.defineProperty(e,t,n),n},d=function(h,e){return function(t,o){e(t,o,h)}};let $=class extends X{constructor(e,t,o,a,n,i,s,g,p,b,r,u,x){super(),this.g=e,this.h=t,this.j=o,this.m=a,this.n=n,this.q=i,this.r=s,this.s=g,this.t=p,this.u=b,this.w=r,this.z=u,this.C=x,this.b=new Map,this.c=void 0,this.D(C.onDidChange(()=>this.F())),this.D(i.onDidChangeConfiguration(v=>this.M(v))),this.D(b.onDidChangeActiveWebviewEditor(v=>this.N(v))),this.a=this.C.createInstance(_)}async F(){if(!this.c||!this.f)return;const e=await this.L(this.f);this.c&&this.c.webview.setHtml(e)}async G(e){if(e){const t=this.t.getActiveCodeEditor()?.getModel()?.uri;if(t)return oe(t)}return w.parse("https://code.visualstudio.com/raw")}async show(e,t){const o=await this.H(e,t),a=await this.G(t);this.f={text:o,base:a};const n=await this.L(this.f),i=y.localize(14260,null,e),s=this.r.activeEditorPane;if(this.c)this.c.setWebviewTitle(i),this.c.webview.setHtml(n),this.u.revealWebview(this.c,s?s.group:this.s.activeGroup,!1);else{this.c=this.u.openWebview({title:i,options:{tryRestoreScrollPosition:!0,enableFindWidget:!0,disableServiceWorker:!t},contentOptions:{localResourceRoots:t?[a]:[],allowScripts:!0},extension:void 0},"releaseNotes",i,void 0,{group:J,preserveFocus:!1});const g=new q;g.add(this.c.webview.onDidClickLink(p=>this.I(w.parse(p)))),g.add(this.c.webview.onMessage(p=>{if(p.message.type==="showReleaseNotes")this.q.updateValue("update.showReleaseNotes",p.message.value);else if(p.message.type==="clickSetting"){const b=this.c?.webview.container.offsetLeft+p.message.value.x,r=this.c?.webview.container.offsetTop+p.message.value.y;this.a.updateSetting(w.parse(p.message.value.uri),b,r)}})),g.add(this.c.onWillDispose(()=>{g.dispose(),this.c=void 0})),this.c.webview.setHtml(n)}return!0}async H(e,t){const o=/^(\d+\.\d+)\./.exec(e);if(!o)throw new Error("not found");const i=`https://code.visualstudio.com/raw/v${o[1].replace(/\./g,"_")}.md`,s=y.localize(14261,null),g=r=>R(r).replace(/\\/g,"\\\\"),p=r=>{const u=(m,c)=>{const l=this.h.lookupKeybinding(c);return l&&l.getLabel()||s},x=(m,c)=>{const l=N.parseKeybinding(c);if(!l)return s;const I=this.h.resolveKeybinding(l);return I.length===0?s:I[0].getLabel()||s},v=(m,c)=>{const l=u(m,c);return l&&`<code title="${c}">${g(l)}</code>`},H=(m,c)=>{const l=x(m,c);return l&&`<code title="${c}">${g(l)}</code>`};return r.replace(/`kb\(([a-z.\d\-]+)\)`/gi,v).replace(/`kbstyle\(([^\)]+)\)`/gi,H).replace(/kb\(([a-z.\d\-]+)\)/gi,(m,c)=>k(u(m,c))).replace(/kbstyle\(([^\)]+)\)/gi,(m,c)=>k(x(m,c)))},b=async()=>{let r;try{if(t){const u=this.t.getActiveCodeEditor()?.getModel()?.getValue();r=u?u.substring(u.indexOf("#")):void 0}else r=await W(await this.n.request({url:i},z.None))}catch{throw new Error("Failed to fetch release notes")}if(!r||!/^#\s/.test(r)&&!t)throw new Error("Invalid release notes");return p(r)};return t?b():(this.b.has(e)||this.b.set(e,(async()=>{try{return await b()}catch(r){throw this.b.delete(e),r}})()),this.b.get(e))}async I(e){e.scheme===f.codeSetting||this.J(e,"ReleaseNotes").then(t=>this.m.open(t,{allowCommands:["workbench.action.openSettings","summarize.release.notes"]})).then(void 0,L)}async J(e,t,o="1"){return F(this.z,this.g)&&K(this.q)===3&&e.scheme==="https"&&e.authority==="code.visualstudio.com"?e.with({query:`${e.query?e.query+"&":""}utm_source=VsCode&utm_medium=${encodeURIComponent(t)}&utm_content=${encodeURIComponent(o)}`}):e}async L(e){const t=E(),o=await ie(e.text,this.w,this.j,this.a),a=C.getColorMap(),n=a?Z(a):"",i=!!this.q.getValue("update.showReleaseNotes");return`<!DOCTYPE html>
		<html>
			<head>
				<base href="${ne(e.base).toString(!0)}/" >
				<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; media-src https:; style-src 'nonce-${t}' https://code.visualstudio.com; script-src 'nonce-${t}';">
				<style nonce="${t}">
					${O}
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

					/* Release notes enhancements from vscode-docs */
					html {
						font-size: 10px;
						height: 100%;
						overscroll-behavior: none;
					}

					body {
						margin: 0 auto;
						max-width: 980px;
						height: auto;
						overflow-y: auto;
						overscroll-behavior: none;
					}

					/* Scroll to top button */
					#scroll-to-top {
						position: fixed;
						width: 40px;
						height: 40px;
						right: 25px;
						bottom: 25px;
						background-color: var(--vscode-button-background, #444);
						border-color: var(--vscode-button-border);
						border-radius: 50%;
						cursor: pointer;
						box-shadow: 1px 1px 1px rgba(0,0,0,.25);
						outline: none;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					#scroll-to-top:hover {
						background-color: var(--vscode-button-hoverBackground);
						box-shadow: 2px 2px 2px rgba(0,0,0,.25);
					}

					body.vscode-high-contrast #scroll-to-top {
						border-width: 2px;
						border-style: solid;
						box-shadow: none;
					}

					#scroll-to-top span.icon::before {
						content: "";
						display: block;
						background: var(--vscode-button-foreground);
						/* Chevron up icon */
						-webkit-mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZmlsbDpub25lO30KPC9zdHlsZT4KPHRpdGxlPnVwY2hldnJvbjwvdGl0bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDUuMWwtNy4zLDcuM0wwLDExLjZsOC04bDgsOGwtMC43LDAuN0w4LDUuMXoiLz4KPHJlY3QgY2xhc3M9InN0MSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ii8+Cjwvc3ZnPgo=');
						mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZmlsbDpub25lO30KPC9zdHlsZT4KPHRpdGxlPnVwY2hldnJvbjwvdGl0bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDUuMWwtNy4zLDcuM0wwLDExLjZsOC04bDgsOGwtMC43LDAuN0w4LDUuMXoiLz4KPHJlY3QgY2xhc3M9InN0MSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ii8+Cjwvc3ZnPgo=');
						width: 16px;
						height: 16px;
					}

					/* Header styling */
					h2 {
						margin-top: 1.2em;
						scroll-margin-top: 1.2em;
					}

					h2:not(:first-of-type) {
						margin-top: 4em;
						scroll-margin-top: 1em;
					}

					h3 {
						margin-top: 4em;
						scroll-margin-top: 1em;
					}

					h2 + h3 {
						margin-top: 0;
					}

					/* Highlights table styling */
					.highlights-table {
						border-collapse: collapse;
						border: none;
					}

					.highlights-table th {
						vertical-align: top;
						border: none;
						padding-top: 2em;
						font-weight: bold;
					}

					.highlights-table td {
						vertical-align: top;
						border: none;
					}

					.highlights-table tr:nth-child(2) td {
						padding-bottom: 1em;
					}

					/* Main content layout */
					.toc-nav-layout {
						display: flex;
						align-items: flex-start;
					}

					/* TOC Navigation */
					#toc-nav {
						position: sticky;
						top: 20px;
						width: 10vw;
						min-width: 120px;
						margin-right: 32px;
						margin-top: 2em;
					}

					#toc-nav > div {
						font-weight: bold;
						font-size: 1em;
						margin-bottom: 1em;
						text-transform: uppercase;
					}

					#toc-nav ul {
						list-style: none;
						padding: 0;
						margin: 0;
					}

					#toc-nav ul li {
						margin-bottom: 0.5em;
					}

					#toc-nav a {
						color: var(--vscode-editor-foreground, #ccc);
						text-decoration: none !important;
						transition: background-color 0.2s, color 0.2s;
						padding: 4px 6px;
						margin: -4px -6px;
						border-radius: 4px;
						display: block;
						outline: none;
					}

					#toc-nav a:hover {
						background-color: var(--vscode-button-secondaryHoverBackground, #1177bb);
						color: var(--vscode-button-secondaryForeground, #ffffff);
						cursor: pointer;
						text-decoration: none !important;
					}

					/* Main content area */
					.notes-main {
						flex: 1;
						min-width: 0;
					}

					/* Responsive breakpoint - Hide TOC on smaller screens */
					@media (max-width: 576px) {
						#toc-nav {
							display: none;
						}

						.toc-nav-layout {
							flex-direction: column;
						}

						.notes-main {
							margin-left: 0;
						}
					}
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
					label.textContent = '${y.localize(14262,null)}';
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
						if (href && (href.startsWith('${f.codeSetting}'))) {
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
				<\/script>
			</body>
		</html>`}M(e){e.affectsConfiguration("update.showReleaseNotes")&&this.O()}N(e){e&&e===this.c&&this.O()}O(){this.c&&this.c.webview.postMessage({type:"showReleaseNotes",value:this.q.getValue("update.showReleaseNotes")})}};$=M([d(0,G),d(1,P),d(2,D),d(3,j),d(4,B),d(5,Q),d(6,V),d(7,A),d(8,te),d(9,Y),d(10,T),d(11,S),d(12,ee)],$);async function ie(h,e,t,o){return h=h.toString().replace(/<!--\s*TOC\s*/gi,"").replace(/\s*Navigation End\s*-->/gi,""),U(h,e,t,{sanitizerConfig:{allowRelativeMediaPaths:!0,allowedLinkProtocols:{override:[f.http,f.https,f.command,f.codeSetting]},allowedTags:{augment:["nav","svg","path"]},allowedAttributes:{augment:["aria-role","viewBox","fill","xmlns","d"]}},markedExtensions:[{renderer:{html:o.getHtmlRenderer(),codespan:o.getCodeSpanRenderer()}}]})}export{$ as $IFc,ie as $JFc};
