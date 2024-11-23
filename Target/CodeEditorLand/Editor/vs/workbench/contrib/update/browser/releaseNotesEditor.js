var N=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var x=(u,e,t,r)=>{for(var i=r>1?void 0:r?W(e,t):e,l=u.length-1,s;l>=0;l--)(s=u[l])&&(i=(r?s(e,t,i):s(i))||i);return r&&i&&N(e,t,i),i},n=(u,e)=>(t,r)=>e(t,r,u);import"./media/releasenoteseditor.css";import{CancellationToken as $}from"../../../../base/common/cancellation.js";import{onUnexpectedError as P}from"../../../../base/common/errors.js";import{escapeMarkdownSyntaxTokens as _}from"../../../../base/common/htmlContent.js";import{KeybindingParser as U}from"../../../../base/common/keybindingParser.js";import{DisposableStore as R}from"../../../../base/common/lifecycle.js";import{Schemas as k}from"../../../../base/common/network.js";import{dirname as L}from"../../../../base/common/resources.js";import{escape as M}from"../../../../base/common/strings.js";import{URI as y}from"../../../../base/common/uri.js";import{generateUuid as D}from"../../../../base/common/uuid.js";import{ICodeEditorService as T}from"../../../../editor/browser/services/codeEditorService.js";import{TokenizationRegistry as C}from"../../../../editor/common/languages.js";import{ILanguageService as z}from"../../../../editor/common/languages/language.js";import{generateTokensCSSForColorMap as q}from"../../../../editor/common/languages/supports/tokenization.js";import*as S from"../../../../nls.js";import{IConfigurationService as A}from"../../../../platform/configuration/common/configuration.js";import{IEnvironmentService as B}from"../../../../platform/environment/common/environment.js";import{IInstantiationService as G}from"../../../../platform/instantiation/common/instantiation.js";import{IKeybindingService as K}from"../../../../platform/keybinding/common/keybinding.js";import{IOpenerService as O}from"../../../../platform/opener/common/opener.js";import{IProductService as H}from"../../../../platform/product/common/productService.js";import{asTextOrError as V,IRequestService as F}from"../../../../platform/request/common/request.js";import{TelemetryLevel as Y}from"../../../../platform/telemetry/common/telemetry.js";import{getTelemetryLevel as X,supportsTelemetry as j}from"../../../../platform/telemetry/common/telemetryUtils.js";import{IEditorGroupsService as J}from"../../../services/editor/common/editorGroupsService.js";import{ACTIVE_GROUP as Q,IEditorService as Z}from"../../../services/editor/common/editorService.js";import{IExtensionService as ee}from"../../../services/extensions/common/extensions.js";import{DEFAULT_MARKDOWN_STYLES as te,renderMarkdownDocument as re}from"../../markdown/browser/markdownDocumentRenderer.js";import{SimpleSettingRenderer as ie}from"../../markdown/browser/markdownSettingRenderer.js";import{asWebviewUri as oe}from"../../webview/common/webview.js";import"../../webviewPanel/browser/webviewEditorInput.js";import{IWebviewWorkbenchService as ne}from"../../webviewPanel/browser/webviewWorkbenchService.js";let f=class{constructor(e,t,r,i,l,s,p,g,d,m,o,h,b){this._environmentService=e;this._keybindingService=t;this._languageService=r;this._openerService=i;this._requestService=l;this._configurationService=s;this._editorService=p;this._editorGroupService=g;this._codeEditorService=d;this._webviewWorkbenchService=m;this._extensionService=o;this._productService=h;this._instantiationService=b;C.onDidChange(()=>this.updateHtml()),s.onDidChangeConfiguration(this.onDidChangeConfiguration,this,this.disposables),m.onDidChangeActiveWebviewEditor(this.onDidChangeActiveWebviewEditor,this,this.disposables),this._simpleSettingRenderer=this._instantiationService.createInstance(ie)}_simpleSettingRenderer;_releaseNotesCache=new Map;_currentReleaseNotes=void 0;_lastMeta;disposables=new R;async updateHtml(){if(!this._currentReleaseNotes||!this._lastMeta)return;const e=await this.renderBody(this._lastMeta);this._currentReleaseNotes&&this._currentReleaseNotes.webview.setHtml(e)}async getBase(e){if(e){const t=this._codeEditorService.getActiveCodeEditor()?.getModel()?.uri;if(t)return L(t)}return y.parse("https://code.visualstudio.com/raw")}async show(e,t){const r=await this.loadReleaseNotes(e,t),i=await this.getBase(t);this._lastMeta={text:r,base:i};const l=await this.renderBody(this._lastMeta),s=S.localize("releaseNotesInputName","Release Notes: {0}",e),p=this._editorService.activeEditorPane;if(this._currentReleaseNotes)this._currentReleaseNotes.setName(s),this._currentReleaseNotes.webview.setHtml(l),this._webviewWorkbenchService.revealWebview(this._currentReleaseNotes,p?p.group:this._editorGroupService.activeGroup,!1);else{this._currentReleaseNotes=this._webviewWorkbenchService.openWebview({title:s,options:{tryRestoreScrollPosition:!0,enableFindWidget:!0,disableServiceWorker:!t},contentOptions:{localResourceRoots:t?[i]:[],allowScripts:!0},extension:void 0},"releaseNotes",s,{group:Q,preserveFocus:!1}),this._currentReleaseNotes.webview.onDidClickLink(d=>this.onDidClickLink(y.parse(d)));const g=new R;g.add(this._currentReleaseNotes.webview.onMessage(d=>{if(d.message.type==="showReleaseNotes")this._configurationService.updateValue("update.showReleaseNotes",d.message.value);else if(d.message.type==="clickSetting"){const m=this._currentReleaseNotes?.webview.container.offsetLeft+d.message.value.x,o=this._currentReleaseNotes?.webview.container.offsetTop+d.message.value.y;this._simpleSettingRenderer.updateSetting(y.parse(d.message.value.uri),m,o)}})),g.add(this._currentReleaseNotes.onWillDispose(()=>{g.dispose(),this._currentReleaseNotes=void 0})),this._currentReleaseNotes.webview.setHtml(l)}return!0}async loadReleaseNotes(e,t){const r=/^(\d+\.\d+)\./.exec(e);if(!r)throw new Error("not found");const s=`https://code.visualstudio.com/raw/v${r[1].replace(/\./g,"_")}.md`,p=S.localize("unassigned","unassigned"),g=o=>M(o).replace(/\\/g,"\\\\"),d=o=>{const h=(v,a)=>{const c=this._keybindingService.lookupKeybinding(a);return c&&c.getLabel()||p},b=(v,a)=>{const c=U.parseKeybinding(a);if(!c)return p;const w=this._keybindingService.resolveKeybinding(c);return w.length===0?p:w[0].getLabel()||p},E=(v,a)=>{const c=h(v,a);return c&&`<code title="${a}">${g(c)}</code>`},I=(v,a)=>{const c=b(v,a);return c&&`<code title="${a}">${g(c)}</code>`};return o.replace(/`kb\(([a-z.\d\-]+)\)`/gi,E).replace(/`kbstyle\(([^\)]+)\)`/gi,I).replace(/kb\(([a-z.\d\-]+)\)/gi,(v,a)=>_(h(v,a))).replace(/kbstyle\(([^\)]+)\)/gi,(v,a)=>_(b(v,a)))},m=async()=>{let o;try{if(t){const h=this._codeEditorService.getActiveCodeEditor()?.getModel()?.getValue();o=h?h.substring(h.indexOf("#")):void 0}else o=await V(await this._requestService.request({url:s},$.None))}catch{throw new Error("Failed to fetch release notes")}if(!o||!/^#\s/.test(o)&&!t)throw new Error("Invalid release notes");return d(o)};return t?m():(this._releaseNotesCache.has(e)||this._releaseNotesCache.set(e,(async()=>{try{return await m()}catch(o){throw this._releaseNotesCache.delete(e),o}})()),this._releaseNotesCache.get(e))}async onDidClickLink(e){e.scheme===k.codeSetting||this.addGAParameters(e,"ReleaseNotes").then(t=>this._openerService.open(t,{allowCommands:["workbench.action.openSettings"]})).then(void 0,P)}async addGAParameters(e,t,r="1"){return j(this._productService,this._environmentService)&&X(this._configurationService)===Y.USAGE&&e.scheme==="https"&&e.authority==="code.visualstudio.com"?e.with({query:`${e.query?e.query+"&":""}utm_source=VsCode&utm_medium=${encodeURIComponent(t)}&utm_content=${encodeURIComponent(r)}`}):e}async renderBody(e){const t=D(),r=await re(e.text,this._extensionService,this._languageService,{shouldSanitize:!1,markedExtensions:[{renderer:{html:this._simpleSettingRenderer.getHtmlRenderer(),codespan:this._simpleSettingRenderer.getCodeSpanRenderer()}}]}),i=C.getColorMap(),l=i?q(i):"",s=!!this._configurationService.getValue("update.showReleaseNotes");return`<!DOCTYPE html>
		<html>
			<head>
				<base href="${oe(e.base).toString(!0)}/" >
				<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; media-src https:; style-src 'nonce-${t}' https://code.visualstudio.com; script-src 'nonce-${t}';">
				<style nonce="${t}">
					${te}
					${l}

					/* codesetting */

					code:has(.codesetting)+code:not(:has(.codesetting)) {
						display: none;
					}

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
						margin-left: -5px;
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
						margin-right: 8px;
					}

					header { display: flex; align-items: center; padding-top: 1em; }
				</style>
			</head>
			<body>
				${r}
				<script nonce="${t}">
					const vscode = acquireVsCodeApi();

					const container = document.createElement('p');
					container.style.display = 'flex';
					container.style.alignItems = 'center';

					const input = document.createElement('input');
					input.type = 'checkbox';
					input.id = 'showReleaseNotes';
					input.checked = ${s};
					container.appendChild(input);

					const label = document.createElement('label');
					label.htmlFor = 'showReleaseNotes';
					label.textContent = '${S.localize("showOnUpdate","Show release notes after an update")}';
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

						if (href && (href.startsWith('${k.codeSetting}'))) {
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
		</html>`}onDidChangeConfiguration(e){e.affectsConfiguration("update.showReleaseNotes")&&this.updateCheckboxWebview()}onDidChangeActiveWebviewEditor(e){e&&e===this._currentReleaseNotes&&this.updateCheckboxWebview()}updateCheckboxWebview(){this._currentReleaseNotes&&this._currentReleaseNotes.webview.postMessage({type:"showReleaseNotes",value:this._configurationService.getValue("update.showReleaseNotes")})}};f=x([n(0,B),n(1,K),n(2,z),n(3,O),n(4,F),n(5,A),n(6,Z),n(7,J),n(8,T),n(9,ne),n(10,ee),n(11,H),n(12,G)],f);export{f as ReleaseNotesManager};
