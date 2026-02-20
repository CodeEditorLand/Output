import"./media/releasenoteseditor.css";import{CancellationToken as A}from"../../../../base/common/cancellation.js";import{$mb as N}from"../../../../base/common/errors.js";import{$nk as C}from"../../../../base/common/htmlContent.js";import{$dcb as z}from"../../../../base/common/keybindingParser.js";import{$Yf as S}from"../../../../base/common/strings.js";import{URI as I}from"../../../../base/common/uri.js";import{$ln as H}from"../../../../base/common/uuid.js";import{$rG as M}from"../../../../editor/common/languages.js";import{$$L as L}from"../../../../editor/common/languages/supports/tokenization.js";import{$sG as R}from"../../../../editor/common/languages/language.js";import*as v from"../../../../nls.js";import{$Kl as B}from"../../../../platform/environment/common/environment.js";import{$vy as Z}from"../../../../platform/keybinding/common/keybinding.js";import{$NQ as D}from"../../../../platform/opener/common/opener.js";import{$Vn as G}from"../../../../platform/product/common/productService.js";import{$3o as j,$Vo as P}from"../../../../platform/request/common/request.js";import{$iuc as W,$juc as J}from"../../markdown/browser/markdownDocumentRenderer.js";import{$Q7b as Y}from"../../webviewPanel/browser/webviewWorkbenchService.js";import{$EM as O}from"../../../services/editor/common/editorGroupsService.js";import{$JM as U,$IM as V}from"../../../services/editor/common/editorService.js";import{$0S as T}from"../../../services/extensions/common/extensions.js";import{$ov as K,$mv as Q}from"../../../../platform/telemetry/common/telemetryUtils.js";import{$0l as X}from"../../../../platform/configuration/common/configuration.js";import{$Ed as F,$Dd as q}from"../../../../base/common/lifecycle.js";import{$8Jc as _}from"../../markdown/browser/markdownSettingRenderer.js";import{$Mj as ee}from"../../../../platform/instantiation/common/instantiation.js";import{Schemas as f}from"../../../../base/common/network.js";import{$Beb as te}from"../../../../editor/browser/services/codeEditorService.js";import{$Hh as oe}from"../../../../base/common/resources.js";import{$sIb as ne}from"../../webview/common/webview.js";import{$3y as ie}from"../../../../platform/update/common/update.js";import{$uo as ae}from"../../../../platform/commands/common/commands.js";var $=function(m,e,t,o){var c=arguments.length,n=c<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(m,e,t,o);else for(var i=m.length-1;i>=0;i--)(a=m[i])&&(n=(c<3?a(n):c>3?a(e,t,n):a(e,t))||n);return c>3&&n&&Object.defineProperty(e,t,n),n},d=function(m,e){return function(t,o){e(t,o,m)}};let E=class extends F{constructor(e,t,o,c,n,a,i,u,s,b,r,g,x,w,y){super(),this.g=e,this.h=t,this.j=o,this.m=c,this.n=n,this.q=a,this.r=i,this.s=u,this.t=s,this.u=b,this.w=r,this.z=g,this.C=x,this.F=w,this.G=y,this.b=new Map,this.c=void 0,this.D(M.onDidChange(()=>this.H())),this.D(a.onDidChangeConfiguration(l=>this.Q(l))),this.D(b.onDidChangeActiveWebviewEditor(l=>this.R(l))),this.D(this.F.onStateChange(()=>this.P())),this.a=this.C.createInstance(_)}async H(){if(!this.c||!this.f)return;const e=await this.N(this.f);this.c&&this.c.webview.setHtml(e)}async I(e){if(e){const t=this.t.getActiveCodeEditor()?.getModel()?.uri;if(t)return oe(t)}return I.parse("https://code.visualstudio.com/raw")}async show(e,t){const o=await this.J(e,t),c=await this.I(t);this.f={text:o,base:c};const n=await this.N(this.f),a=v.localize(15503,null,e),i=this.r.activeEditorPane;if(this.c)this.c.setWebviewTitle(a),this.c.webview.setHtml(n),this.u.revealWebview(this.c,i?i.group:this.s.activeGroup,!1);else{this.c=this.u.openWebview({title:a,options:{tryRestoreScrollPosition:!0,enableFindWidget:!0,disableServiceWorker:!t},contentOptions:{localResourceRoots:t?[c]:[],allowScripts:!0},extension:void 0},"releaseNotes",a,void 0,{group:U,preserveFocus:!1});const u=new q;u.add(this.c.webview.onDidClickLink(s=>this.L(I.parse(s)))),u.add(this.c.webview.onMessage(s=>{if(s.message.type==="showReleaseNotes")this.q.updateValue("update.showReleaseNotes",s.message.value);else if(s.message.type==="updateAction")s.message.commandId&&this.G.executeCommand(s.message.commandId);else if(s.message.type==="clickSetting"){const b=this.c?.webview.container.offsetLeft+s.message.value.x,r=this.c?.webview.container.offsetTop+s.message.value.y;this.a.updateSetting(I.parse(s.message.value.uri),b,r)}})),u.add(this.c.onWillDispose(()=>{u.dispose(),this.c=void 0})),this.c.webview.setHtml(n)}return!0}async J(e,t){const o=/^(\d+\.\d+)\./.exec(e);if(!o)throw new Error("not found");const a=`https://code.visualstudio.com/raw/v${o[1].replace(/\./g,"_")}.md`,i=v.localize(15504,null),u=r=>S(r).replace(/\\/g,"\\\\"),s=r=>{const g=(l,p)=>{const h=this.h.lookupKeybinding(p);return h&&h.getLabel()||i},x=(l,p)=>{const h=z.parseKeybinding(p);if(!h)return i;const k=this.h.resolveKeybinding(h);return k.length===0?i:k[0].getLabel()||i},w=(l,p)=>{const h=g(l,p);return h&&`<code title="${p}">${u(h)}</code>`},y=(l,p)=>{const h=x(l,p);return h&&`<code title="${p}">${u(h)}</code>`};return r.replace(/`kb\(([a-z.\d\-]+)\)`/gi,w).replace(/`kbstyle\(([^\)]+)\)`/gi,y).replace(/kb\(([a-z.\d\-]+)\)/gi,(l,p)=>C(g(l,p))).replace(/kbstyle\(([^\)]+)\)/gi,(l,p)=>C(x(l,p)))},b=async()=>{let r;try{if(t){const g=this.t.getActiveCodeEditor()?.getModel()?.getValue();r=g?g.substring(g.indexOf("#")):void 0}else r=await j(await this.n.request({url:a},A.None))}catch{throw new Error("Failed to fetch release notes")}if(!r||!/^#\s/.test(r)&&!t)throw new Error("Invalid release notes");return s(r)};return t?b():(this.b.has(e)||this.b.set(e,(async()=>{try{return await b()}catch(r){throw this.b.delete(e),r}})()),this.b.get(e))}async L(e){e.scheme===f.codeSetting||this.M(e,"ReleaseNotes").then(t=>this.m.open(t,{allowCommands:["workbench.action.openSettings","summarize.release.notes"]})).then(void 0,N)}async M(e,t,o="1"){return Q(this.z,this.g)&&K(this.q)===3&&e.scheme==="https"&&e.authority==="code.visualstudio.com"?e.with({query:`${e.query?e.query+"&":""}utm_source=VsCode&utm_medium=${encodeURIComponent(t)}&utm_content=${encodeURIComponent(o)}`}):e}async N(e){const t=H(),o=await se(e.text,this.w,this.j,this.a),c=M.getColorMap(),n=c?L(c):"",a=!!this.q.getValue("update.showReleaseNotes"),i=this.O();return`<!DOCTYPE html>
		<html>
			<head>
				<base href="${ne(e.base).toString(!0)}/" >
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

					/* Update action button */
					#update-action-btn {
						position: fixed;
						right: 25px;
						top: 25px;
						background-color: var(--vscode-button-background);
						color: var(--vscode-button-foreground);
						border: 1px solid var(--vscode-button-border, transparent);
						border-radius: 50%;
						width: 40px;
						height: 40px;
						padding: 0;
						cursor: pointer;
						font-size: var(--vscode-font-size);
						font-family: var(--vscode-font-family);
						white-space: nowrap;
						box-shadow: 0 2px 8px var(--vscode-widget-shadow);
						z-index: 100;
						overflow: hidden;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					#update-action-btn .icon {
						flex-shrink: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 16px;
						height: 16px;
					}

					#update-action-btn .icon svg {
						width: 16px;
						height: 16px;
						display: block;
					}

					#update-action-btn .label {
						overflow: hidden;
						max-width: 0;
						opacity: 0;
						margin-left: 0;
					}

					#update-action-btn:hover,
					#update-action-btn.expanded {
						background-color: var(--vscode-button-hoverBackground);
						box-shadow: 0 2px 8px var(--vscode-widget-shadow);
						width: auto;
						height: auto;
						max-height: 40px;
						border-radius: var(--vscode-cornerRadius-small);
						padding: 6px 10px;
						line-height: 16px;
					}

					#update-action-btn:hover .label,
					#update-action-btn.expanded .label {
						max-width: 200px;
						opacity: 1;
						margin-left: 6px;
					}

					#update-action-btn.expanded {
						background-color: var(--vscode-button-background);
						box-shadow: 0 2px 8px var(--vscode-widget-shadow);
					}

					body.vscode-high-contrast #update-action-btn {
						border-width: 2px;
						border-style: solid;
						box-shadow: none;
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
					input.checked = ${a};
					container.appendChild(input);

					const label = document.createElement('label');
					label.htmlFor = 'showReleaseNotes';
					label.textContent = '${v.localize(15505,null)}';
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
						} else if (event.data.type === 'updateAction') {
							if (event.data.label) {
								updateActionBtn.querySelector('.label').textContent = event.data.label;
								updateActionBtn.dataset.commandId = event.data.commandId;
								updateActionBtn.setAttribute('aria-label', event.data.label);
								updateActionBtn.style.display = 'flex';
							} else {
								updateActionBtn.style.display = 'none';
							}
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

					// Update action button
					const updateActionBtn = document.createElement('button');
					updateActionBtn.id = 'update-action-btn';

					// Arrow-circle-down SVG icon
					const iconSpan = document.createElement('span');
					iconSpan.className = 'icon';
					iconSpan.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1v9.5M4.5 7.5L8 11l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 13h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
					updateActionBtn.appendChild(iconSpan);

					const labelSpan = document.createElement('span');
					labelSpan.className = 'label';
					updateActionBtn.appendChild(labelSpan);

					const initialAction = ${JSON.stringify(i??null)};
					if (initialAction) {
						labelSpan.textContent = initialAction.label;
						updateActionBtn.dataset.commandId = initialAction.commandId;
						updateActionBtn.setAttribute('aria-label', initialAction.label);
						updateActionBtn.style.display = 'flex';
					} else {
						updateActionBtn.style.display = 'none';
					}

					document.body.appendChild(updateActionBtn);

					updateActionBtn.addEventListener('click', () => {
						if (updateActionBtn.dataset.commandId) {
							vscode.postMessage({ type: 'updateAction', commandId: updateActionBtn.dataset.commandId });
						}
					});

					// Expand button when at top of page
					function updateExpandedState() {
						if (window.scrollY <= 100) {
							updateActionBtn.classList.add('expanded');
						} else {
							updateActionBtn.classList.remove('expanded');
						}
					}
					updateExpandedState();
					window.addEventListener('scroll', updateExpandedState);
				<\/script>
			</body>
		</html>`}O(){switch(this.F.state.type){case"available for download":return{label:v.localize(15506,null),commandId:"update.downloadNow"};case"downloaded":return{label:v.localize(15507,null),commandId:"update.install"};case"ready":return{label:v.localize(15508,null),commandId:"update.restart"};default:return}}P(){if(this.c){const e=this.O();this.c.webview.postMessage({type:"updateAction",label:e?.label??"",commandId:e?.commandId??""})}}Q(e){e.affectsConfiguration("update.showReleaseNotes")&&this.S()}R(e){e&&e===this.c&&this.S()}S(){this.c&&this.c.webview.postMessage({type:"showReleaseNotes",value:this.q.getValue("update.showReleaseNotes")})}};E=$([d(0,B),d(1,Z),d(2,R),d(3,D),d(4,P),d(5,X),d(6,V),d(7,O),d(8,te),d(9,Y),d(10,T),d(11,G),d(12,ee),d(13,ie),d(14,ae)],E);async function se(m,e,t,o){return m=m.toString().replace(/<!--\s*TOC\s*/gi,"").replace(/\s*Navigation End\s*-->/gi,""),J(m,e,t,{sanitizerConfig:{allowRelativeMediaPaths:!0,allowedLinkProtocols:{override:[f.http,f.https,f.command,f.codeSetting]},allowedTags:{augment:["nav","svg","path"]},allowedAttributes:{augment:["aria-role","viewBox","fill","xmlns","d"]}},markedExtensions:[{renderer:{html:o.getHtmlRenderer(),codespan:o.getCodeSpanRenderer()}}]})}export{se as $0Jc,E as $9Jc};
