var Z=Object.defineProperty;var ee=Object.getOwnPropertyDescriptor;var S=(l,r,e,i)=>{for(var n=i>1?void 0:i?ee(r,e):r,t=l.length-1,s;t>=0;t--)(s=l[t])&&(n=(i?s(r,e,n):s(n))||n);return i&&n&&Z(r,e,n),n},a=(l,r)=>(e,i)=>r(e,i,l);import"./media/timelinePane.css";import{localize as c,localize2 as g}from"../../../../nls.js";import*as f from"../../../../base/browser/dom.js";import*as ie from"../../../../base/browser/cssValue.js";import{ActionRunner as te}from"../../../../base/common/actions.js";import{CancellationTokenSource as ne}from"../../../../base/common/cancellation.js";import{fromNow as O}from"../../../../base/common/date.js";import{debounce as re}from"../../../../base/common/decorators.js";import{Emitter as se}from"../../../../base/common/event.js";import{createMatches as oe}from"../../../../base/common/filters.js";import{Iterable as le}from"../../../../base/common/iterator.js";import{DisposableStore as R,Disposable as ae}from"../../../../base/common/lifecycle.js";import{Schemas as I}from"../../../../base/common/network.js";import{ILabelService as de}from"../../../../platform/label/common/label.js";import{escapeRegExpCharacters as me}from"../../../../base/common/strings.js";import{URI as U}from"../../../../base/common/uri.js";import{IconLabel as ce}from"../../../../base/browser/ui/iconLabel/iconLabel.js";import"../../../../base/browser/ui/list/list.js";import"../../../../base/browser/ui/tree/tree.js";import{ViewPane as ue}from"../../../browser/parts/views/viewPane.js";import{WorkbenchObjectTree as he}from"../../../../platform/list/browser/listService.js";import{IKeybindingService as fe}from"../../../../platform/keybinding/common/keybinding.js";import{IContextMenuService as ge}from"../../../../platform/contextview/browser/contextView.js";import{ContextKeyExpr as pe,IContextKeyService as k,RawContextKey as z}from"../../../../platform/contextkey/common/contextkey.js";import{IConfigurationService as ve}from"../../../../platform/configuration/common/configuration.js";import{IInstantiationService as q}from"../../../../platform/instantiation/common/instantiation.js";import{ITimelineService as H}from"../common/timeline.js";import{IEditorService as Se}from"../../../services/editor/common/editorService.js";import{SideBySideEditor as Ie,EditorResourceAccessor as ye}from"../../../common/editor.js";import{ICommandService as Te,CommandsRegistry as be}from"../../../../platform/commands/common/commands.js";import{IThemeService as N}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as Ce}from"../../../../base/common/themables.js";import{IViewDescriptorService as Ee}from"../../../common/views.js";import{IProgressService as xe}from"../../../../platform/progress/common/progress.js";import{IOpenerService as we}from"../../../../platform/opener/common/opener.js";import{ActionBar as Ae}from"../../../../base/browser/ui/actionbar/actionbar.js";import{createAndFillInContextMenuActions as _e,createActionViewItem as Re}from"../../../../platform/actions/browser/menuEntryActionViewItem.js";import{IMenuService as Le,MenuId as p,registerAction2 as $,Action2 as K,MenuRegistry as W}from"../../../../platform/actions/common/actions.js";import{ITelemetryService as Me}from"../../../../platform/telemetry/common/telemetry.js";import{ActionViewItem as De}from"../../../../base/browser/ui/actionbar/actionViewItems.js";import{ColorScheme as Pe}from"../../../../platform/theme/common/theme.js";import{Codicon as L}from"../../../../base/common/codicons.js";import{registerIcon as M}from"../../../../platform/theme/common/iconRegistry.js";import{API_OPEN_DIFF_EDITOR_COMMAND_ID as Fe,API_OPEN_EDITOR_COMMAND_ID as Ve}from"../../../browser/parts/editor/editorCommands.js";import{MarshalledId as Be}from"../../../../base/common/marshallingIds.js";import{isString as Oe}from"../../../../base/common/types.js";import{renderMarkdownAsPlaintext as Ue}from"../../../../base/browser/markdownRenderer.js";import"../../../../base/browser/ui/hover/hoverDelegate.js";import{IUriIdentityService as ke}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{IExtensionService as ze}from"../../../services/extensions/common/extensions.js";import{IStorageService as D,StorageScope as y,StorageTarget as qe}from"../../../../platform/storage/common/storage.js";import"../../../../base/browser/ui/aria/aria.js";import"../../../../platform/action/common/action.js";import{getDefaultHoverDelegate as He}from"../../../../base/browser/ui/hover/hoverDelegateFactory.js";import{IHoverService as Ne}from"../../../../platform/hover/browser/hover.js";const j=22;function A(l){return l instanceof P}function T(l){return!!l&&!l.handle.startsWith("vscode-command:")}function J(l,r){return l.relativeTime=T(l)?O(l.timestamp):void 0,l.relativeTimeFullWord=T(l)?O(l.timestamp,!1,!0):void 0,r===void 0||l.relativeTime!==r?(r=l.relativeTime,l.hideRelativeTime=!1):l.hideRelativeTime=!0,r}class $e{items;source;lastRenderedIndex;constructor(r){this.source=r.source,this.items=r.items,this._cursor=r.paging?.cursor,this.lastRenderedIndex=-1}_cursor;get cursor(){return this._cursor}get more(){return this._cursor!==void 0}get newest(){return this.items[0]}get oldest(){return this.items[this.items.length-1]}add(r,e){let i=!1;if(r.items.length!==0&&this.items.length!==0){i=!0;const n=new Set,t=new Set;for(const d of r.items)d.id===void 0?t.add(d.timestamp):n.add(d.id);let s=this.items.length,o;for(;s--;)o=this.items[s],(o.id!==void 0&&n.has(o.id)||t.has(o.timestamp))&&this.items.splice(s,1);(r.items[r.items.length-1]?.timestamp??0)>=(this.newest?.timestamp??0)?this.items.splice(0,0,...r.items):this.items.push(...r.items)}else r.items.length!==0&&(i=!0,this.items.push(...r.items));return(e.cursor!==void 0||typeof e.limit!="object")&&(this._cursor=r.paging?.cursor),i&&this.items.sort((n,t)=>t.timestamp-n.timestamp||(n.source===void 0?t.source===void 0?0:1:t.source===void 0?-1:t.source.localeCompare(n.source,void 0,{numeric:!0,sensitivity:"base"}))),i}_stale=!1;get stale(){return this._stale}_requiresReset=!1;get requiresReset(){return this._requiresReset}invalidate(r){this._stale=!0,this._requiresReset=r}}class P{handle="vscode-command:loadMore";timestamp=0;description=void 0;tooltip=void 0;contextValue=void 0;id=void 0;icon=void 0;iconDark=void 0;source=void 0;relativeTime=void 0;relativeTimeFullWord=void 0;hideRelativeTime=void 0;constructor(r){this._loading=r}_loading=!1;get loading(){return this._loading}set loading(r){this._loading=r}get ariaLabel(){return this.label}get label(){return this.loading?c("timeline.loadingMore","Loading..."):c("timeline.loadMore","Load more")}get themeIcon(){}}const F=new z("timelineFollowActiveEditor",!0,!0),Ke=new z("timelineExcludeSources","[]",!0);let b=class extends ue{constructor(e,i,n,t,s,o,d,h,_,v,u,m,x,w,Y,Q,Xe,Ze,ei){super({...e,titleMenuId:p.TimelineTitle},i,n,s,t,d,h,x,w,Y,Q);this.storageService=o;this.editorService=_;this.commandService=v;this.progressService=u;this.timelineService=m;this.labelService=Xe;this.uriIdentityService=Ze;this.extensionService=ei;this.commands=this._register(this.instantiationService.createInstance(E,this)),this.followActiveEditorContext=F.bindTo(this.contextKeyService),this.timelineExcludeSourcesContext=Ke.bindTo(this.contextKeyService);const B=o.get("timeline.excludeSources",y.PROFILE,"[]");this.timelineExcludeSourcesContext.set(B),this.excludedSources=new Set(JSON.parse(B)),this._register(o.onDidChangeValue(y.PROFILE,"timeline.excludeSources",this._register(new R))(this.onStorageServiceChanged,this)),this._register(s.onDidChangeConfiguration(this.onConfigurationChanged,this)),this._register(m.onDidChangeProviders(this.onProvidersChanged,this)),this._register(m.onDidChangeTimeline(this.onTimelineChanged,this)),this._register(m.onDidChangeUri(X=>this.setUri(X),this))}static TITLE=g("timeline","Timeline");$container;$message;$tree;tree;treeRenderer;commands;visibilityDisposables;followActiveEditorContext;timelineExcludeSourcesContext;excludedSources;pendingRequests=new Map;timelinesBySource=new Map;uri;_followActiveEditor=!0;get followActiveEditor(){return this._followActiveEditor}set followActiveEditor(e){this._followActiveEditor!==e&&(this._followActiveEditor=e,this.followActiveEditorContext.set(e),this.updateFilename(this._filename),e&&this.onActiveEditorChanged())}_pageOnScroll;get pageOnScroll(){return this._pageOnScroll===void 0&&(this._pageOnScroll=this.configurationService.getValue("timeline.pageOnScroll")??!1),this._pageOnScroll}get pageSize(){let e=this.configurationService.getValue("timeline.pageSize");return e==null&&(e=Math.max(20,Math.floor((this.tree?.renderHeight??0/j)+(this.pageOnScroll?1:-1)))),e}reset(){this.loadTimeline(!0)}setUri(e){this.setUriCore(e,!0)}setUriCore(e,i){i&&(this.followActiveEditor=!1),this.uri=e,this.updateFilename(e?this.labelService.getUriBasenameLabel(e):void 0),this.treeRenderer?.setUri(e),this.loadTimeline(!0)}onStorageServiceChanged(){const e=this.storageService.get("timeline.excludeSources",y.PROFILE,"[]");this.timelineExcludeSourcesContext.set(e),this.excludedSources=new Set(JSON.parse(e));const i=this.timelineService.getSources().filter(({id:n})=>!this.excludedSources.has(n)&&!this.timelinesBySource.has(n));i.length!==0?this.loadTimeline(!0,i.map(({id:n})=>n)):this.refresh()}onConfigurationChanged(e){e.affectsConfiguration("timeline.pageOnScroll")&&(this._pageOnScroll=void 0)}onActiveEditorChanged(){if(!this.followActiveEditor||!this.isExpanded())return;const e=ye.getOriginalUri(this.editorService.activeEditor,{supportSideBySide:Ie.PRIMARY});if(this.uriIdentityService.extUri.isEqual(e,this.uri)&&e!==void 0||e?.fsPath===this.uri?.fsPath&&(e?.scheme===I.file||e?.scheme==="git")&&(this.uri?.scheme===I.file||this.uri?.scheme==="git")){for(const i of this.timelineService.getSources()){if(this.excludedSources.has(i.id))continue;const n=this.timelinesBySource.get(i.id);n!==void 0&&!n.stale||(n!==void 0?this.updateTimeline(n,n.requiresReset):this.loadTimelineForSource(i.id,e,!0))}return}this.setUriCore(e,!1)}onProvidersChanged(e){if(e.removed){for(const i of e.removed)this.timelinesBySource.delete(i);this.refresh()}e.added&&this.loadTimeline(!0,e.added)}onTimelineChanged(e){if(e?.uri===void 0||this.uriIdentityService.extUri.isEqual(U.revive(e.uri),this.uri)){const i=this.timelinesBySource.get(e.id);if(i===void 0)return;this.isBodyVisible()?this.updateTimeline(i,e.reset):i.invalidate(e.reset)}}_filename;updateFilename(e){this._filename=e,this.followActiveEditor||!e?this.updateTitleDescription(e):this.updateTitleDescription(`${e} (pinned)`)}_message;get message(){return this._message}set message(e){this._message=e,this.updateMessage()}updateMessage(){this._message!==void 0?this.showMessage(this._message):this.hideMessage()}showMessage(e){this.$message&&(this.$message.classList.remove("hide"),this.resetMessageElement(),this.$message.textContent=e)}hideMessage(){this.resetMessageElement(),this.$message.classList.add("hide")}resetMessageElement(){f.clearNode(this.$message)}_isEmpty=!0;_maxItemCount=0;_visibleItemCount=0;get hasVisibleItems(){return this._visibleItemCount>0}clear(e){if(this._visibleItemCount=0,this._maxItemCount=this.pageSize,this.timelinesBySource.clear(),e){for(const{tokenSource:i}of this.pendingRequests.values())i.dispose(!0);this.pendingRequests.clear(),!this.isBodyVisible()&&this.tree&&(this.tree.setChildren(null,void 0),this._isEmpty=!0)}}async loadTimeline(e,i){if(i===void 0){if(e&&this.clear(!0),this.uri?.scheme===I.vscodeSettings||this.uri?.scheme===I.webviewPanel||this.uri?.scheme===I.walkThrough){this.uri=void 0,this.clear(!1),this.refresh();return}this._isEmpty&&this.uri!==void 0&&this.setLoadingUriMessage()}if(this.uri===void 0){this.clear(!1),this.refresh();return}if(!this.isBodyVisible())return;let n=!1;for(const t of i??this.timelineService.getSources().map(s=>s.id))this.loadTimelineForSource(t,this.uri,e)&&(n=!0);n?this._isEmpty&&this.setLoadingUriMessage():this.refresh()}loadTimelineForSource(e,i,n,t){if(this.excludedSources.has(e))return!1;const s=this.timelinesBySource.get(e);if(!n&&t?.cursor!==void 0&&s!==void 0&&(!s?.more||s.items.length>s.lastRenderedIndex+this.pageSize))return!1;if(t===void 0){if(!n&&s!==void 0&&s.items.length>0&&!s.more)return!1;t={cursor:n?void 0:s?.cursor,limit:this.pageSize}}let o=this.pendingRequests.get(e);return o!==void 0&&(t.cursor=o.options.cursor,typeof t.limit=="number"&&(typeof o.options.limit=="number"?t.limit+=o.options.limit:t.limit=o.options.limit)),o?.tokenSource.dispose(!0),t.cacheResults=!0,t.resetCache=n,o=this.timelineService.getTimeline(e,i,t,new ne),o===void 0?!1:(this.pendingRequests.set(e,o),o.tokenSource.token.onCancellationRequested(()=>this.pendingRequests.delete(e)),this.handleRequest(o),!0)}updateTimeline(e,i){if(i){this.timelinesBySource.delete(e.source);const{oldest:n}=e;this.loadTimelineForSource(e.source,this.uri,!0,n!==void 0?{limit:{timestamp:n.timestamp,id:n.id}}:void 0)}else{const{newest:n}=e;this.loadTimelineForSource(e.source,this.uri,!1,n!==void 0?{limit:{timestamp:n.timestamp,id:n.id}}:{limit:this.pageSize})}}_pendingRefresh=!1;async handleRequest(e){let i;try{i=await this.progressService.withProgress({location:this.id},()=>e.result)}finally{this.pendingRequests.delete(e.source)}if(i===void 0||e.tokenSource.token.isCancellationRequested||e.uri!==this.uri){this.pendingRequests.size===0&&this._pendingRefresh&&this.refresh();return}const n=e.source;let t=!1;const s=this.timelinesBySource.get(n);s===void 0?(this.timelinesBySource.set(n,new $e(i)),t=!0):t=s.add(i,e.options),t?(this._pendingRefresh=!0,this.hasVisibleItems&&this.pendingRequests.size!==0?this.refreshDebounced():this.refresh()):this.pendingRequests.size===0&&(this._pendingRefresh?this.refresh():this.tree.rerender())}*getItems(){let e=!1;if(this.uri===void 0||this.timelinesBySource.size===0){this._visibleItemCount=0;return}const i=this._maxItemCount;let n=0;if(this.timelinesBySource.size===1){const[s,o]=le.first(this.timelinesBySource);if(o.lastRenderedIndex=-1,this.excludedSources.has(s)){this._visibleItemCount=0;return}o.items.length!==0&&(this._visibleItemCount=1),e=o.more;let d;for(const h of o.items){if(h.relativeTime=void 0,h.hideRelativeTime=void 0,n++,n>i){e=!0;break}d=J(h,d),yield{element:h}}o.lastRenderedIndex=n-1}else{let h=function(){return s.filter(u=>!u.nextItem.done).reduce((u,m)=>u===void 0||m.nextItem.value.timestamp>=u.nextItem.value.timestamp?m:u,void 0)};var t=h;const s=[];let o=!1,d=0;for(const[u,m]of this.timelinesBySource){if(m.lastRenderedIndex=-1,this.excludedSources.has(u)||m.stale)continue;if(m.items.length!==0&&(o=!0),m.more){e=!0;const w=m.items[Math.min(i,m.items.length-1)];w.timestamp>d&&(d=w.timestamp)}const x=m.items[Symbol.iterator]();s.push({timeline:m,iterator:x,nextItem:x.next()})}this._visibleItemCount=o?1:0;let _,v;for(;v=h();){v.timeline.lastRenderedIndex++;const u=v.nextItem.value;if(u.relativeTime=void 0,u.hideRelativeTime=void 0,u.timestamp>=d){if(n++,n>i){e=!0;break}_=J(u,_),yield{element:u}}v.nextItem=v.iterator.next()}}this._visibleItemCount=n,n>0&&(e?yield{element:new P(this.pendingRequests.size!==0)}:this.pendingRequests.size!==0&&(yield{element:new P(!0)}))}refresh(){if(this.isBodyVisible()){if(this.tree.setChildren(null,this.getItems()),this._isEmpty=!this.hasVisibleItems,this.uri===void 0)this.updateFilename(void 0),this.message=c("timeline.editorCannotProvideTimeline","The active editor cannot provide timeline information.");else if(this._isEmpty)if(this.pendingRequests.size!==0)this.setLoadingUriMessage();else{this.updateFilename(this.labelService.getUriBasenameLabel(this.uri));const e=this.contextKeyService.getContextKeyValue("scm.providerCount");this.timelineService.getSources().filter(({id:i})=>!this.excludedSources.has(i)).length===0?this.message=c("timeline.noTimelineSourcesEnabled","All timeline sources have been filtered out."):this.configurationService.getValue("workbench.localHistory.enabled")&&!this.excludedSources.has("timeline.localHistory")?this.message=c("timeline.noLocalHistoryYet","Local History will track recent changes as you save them unless the file has been excluded or is too large."):this.excludedSources.size>0?this.message=c("timeline.noTimelineInfoFromEnabledSources","No filtered timeline information was provided."):this.message=c("timeline.noTimelineInfo","No timeline information was provided."),(!e||e===0)&&(this.message+=" "+c("timeline.noSCM","Source Control has not been configured."))}else this.updateFilename(this.labelService.getUriBasenameLabel(this.uri)),this.message=void 0;this._pendingRefresh=!1}}refreshDebounced(){this.refresh()}focus(){super.focus(),this.tree.domFocus()}setExpanded(e){const i=super.setExpanded(e);return i&&this.isBodyVisible()&&(this.followActiveEditor?this.onActiveEditorChanged():this.setUriCore(this.uri,!0)),i}setVisible(e){e?(this.extensionService.activateByEvent("onView:timeline"),this.visibilityDisposables=new R,this.editorService.onDidActiveEditorChange(this.onActiveEditorChanged,this,this.visibilityDisposables),this.onDidFocus(()=>this.refreshDebounced(),this,this.visibilityDisposables),super.setVisible(e),this.onActiveEditorChanged()):(this.visibilityDisposables?.dispose(),super.setVisible(e))}layoutBody(e,i){super.layoutBody(e,i),this.tree.layout(e,i)}renderHeaderTitle(e){super.renderHeaderTitle(e,this.title),e.classList.add("timeline-view")}renderBody(e){super.renderBody(e),this.$container=e,e.classList.add("tree-explorer-viewlet-tree-view","timeline-tree-view"),this.$message=f.append(this.$container,f.$(".message")),this.$message.classList.add("timeline-subtle"),this.message=c("timeline.editorCannotProvideTimeline","The active editor cannot provide timeline information."),this.$tree=document.createElement("div"),this.$tree.classList.add("customview-tree","file-icon-themable-tree","hide-arrows"),e.appendChild(this.$tree),this.treeRenderer=this.instantiationService.createInstance(C,this.commands),this.treeRenderer.onDidScrollToEnd(i=>{this.pageOnScroll&&this.loadMore(i)}),this.tree=this.instantiationService.createInstance(he,"TimelinePane",this.$tree,new Je,[this.treeRenderer],{identityProvider:new We,accessibilityProvider:{getAriaLabel(i){return A(i)?i.ariaLabel:i.accessibilityInformation?i.accessibilityInformation.label:c("timeline.aria.item","{0}: {1}",i.relativeTimeFullWord??"",i.label)},getRole(i){return A(i)?"treeitem":i.accessibilityInformation&&i.accessibilityInformation.role?i.accessibilityInformation.role:"treeitem"},getWidgetAriaLabel(){return c("timeline","Timeline")}},keyboardNavigationLabelProvider:new je,multipleSelectionSupport:!1,overrideStyles:this.getLocationBasedColors().listOverrideStyles}),this._register(this.tree.onContextMenu(i=>this.onContextMenu(this.commands,i))),this._register(this.tree.onDidChangeSelection(i=>this.ensureValidItems())),this._register(this.tree.onDidOpen(i=>{if(!i.browserEvent||!this.ensureValidItems())return;const n=this.tree.getSelection();let t;if(n.length===1&&(t=n[0]),t!==null)if(T(t)){if(t.command){let s=t.command.arguments??[];(t.command.id===Ve||t.command.id===Fe)&&(s=[...s,i]),this.commandService.executeCommand(t.command.id,...s)}}else A(t)&&this.loadMore(t)}))}loadMore(e){e.loading||(e.loading=!0,this.tree.rerender(e),this.pendingRequests.size===0&&(this._maxItemCount=this._visibleItemCount+this.pageSize,this.loadTimeline(!1)))}ensureValidItems(){return!this.hasVisibleItems||!this.timelineService.getSources().some(({id:e})=>!this.excludedSources.has(e)&&this.timelinesBySource.has(e))?(this.tree.setChildren(null,void 0),this._isEmpty=!0,this.setLoadingUriMessage(),!1):!0}setLoadingUriMessage(){const e=this.uri&&this.labelService.getUriBasenameLabel(this.uri);this.updateFilename(e),this.message=e?c("timeline.loading","Loading timeline for {0}...",e):""}onContextMenu(e,i){const n=i.element;if(n===null)return;const t=i.browserEvent;if(t.preventDefault(),t.stopPropagation(),!this.ensureValidItems())return;this.tree.setFocus([n]);const s=e.getItemContextActions(n);s.length&&this.contextMenuService.showContextMenu({getAnchor:()=>i.anchor,getActions:()=>s,getActionViewItem:o=>{const d=this.keybindingService.lookupKeybinding(o.id);if(d)return new De(o,o,{label:!0,keybinding:d.getLabel()})},onHide:o=>{o&&this.tree.domFocus()},getActionsContext:()=>({uri:this.uri,item:n}),actionRunner:new G})}};S([re(500)],b.prototype,"refreshDebounced",1),b=S([a(1,fe),a(2,ge),a(3,k),a(4,ve),a(5,D),a(6,Ee),a(7,q),a(8,Se),a(9,Te),a(10,xe),a(11,H),a(12,we),a(13,N),a(14,Me),a(15,Ne),a(16,de),a(17,ke),a(18,ze)],b);class V{static id="TimelineElementTemplate";actionBar;icon;iconLabel;timestamp;constructor(r,e,i){r.classList.add("custom-view-tree-node-item"),this.icon=f.append(r,f.$(".custom-view-tree-node-item-icon")),this.iconLabel=new ce(r,{supportHighlights:!0,supportIcons:!0,hoverDelegate:i});const n=f.append(this.iconLabel.element,f.$(".timeline-timestamp-container"));this.timestamp=f.append(n,f.$("span.timeline-timestamp"));const t=f.append(this.iconLabel.element,f.$(".actions"));this.actionBar=new Ae(t,{actionViewItemProvider:e})}dispose(){this.iconLabel.dispose(),this.actionBar.dispose()}reset(){this.icon.className="",this.icon.style.backgroundImage="",this.actionBar.clear()}}class We{getId(r){return r.handle}}class G extends te{async runAction(r,{uri:e,item:i}){if(!T(i)){await r.run();return}await r.run({$mid:Be.TimelineActionContext,handle:i.handle,source:i.source,uri:e},e,i.source)}}class je{getKeyboardNavigationLabel(r){return r.label}}class Je{getHeight(r){return j}getTemplateId(r){return V.id}}let C=class{constructor(r,e,i){this.commands=r;this.instantiationService=e;this.themeService=i;this.actionViewItemProvider=Re.bind(void 0,this.instantiationService),this._hoverDelegate=He("mouse")}_onDidScrollToEnd=new se;onDidScrollToEnd=this._onDidScrollToEnd.event;templateId=V.id;_hoverDelegate;actionViewItemProvider;uri;setUri(r){this.uri=r}renderTemplate(r){return new V(r,this.actionViewItemProvider,this._hoverDelegate)}renderElement(r,e,i,n){i.reset();const{element:t}=r,s=this.themeService.getColorTheme(),o=s.type===Pe.LIGHT?t.icon:t.iconDark,d=o?U.revive(o):null;d?(i.icon.className="custom-view-tree-node-item-icon",i.icon.style.backgroundImage=ie.asCSSUrl(d),i.icon.style.color=""):t.themeIcon?(i.icon.className=`custom-view-tree-node-item-icon ${Ce.asClassName(t.themeIcon)}`,t.themeIcon.color?i.icon.style.color=s.getColor(t.themeIcon.color.id)?.toString()??"":i.icon.style.color="",i.icon.style.backgroundImage=""):(i.icon.className="custom-view-tree-node-item-icon",i.icon.style.backgroundImage="",i.icon.style.color="");const h=t.tooltip?Oe(t.tooltip)?t.tooltip:{markdown:t.tooltip,markdownNotSupportedFallback:Ue(t.tooltip)}:void 0;i.iconLabel.setLabel(t.label,t.description,{title:h,matches:oe(r.filterData)}),i.timestamp.textContent=t.relativeTime??"",i.timestamp.ariaLabel=t.relativeTimeFullWord??"",i.timestamp.parentElement.classList.toggle("timeline-timestamp--duplicate",T(t)&&t.hideRelativeTime),i.actionBar.context={uri:this.uri,item:t},i.actionBar.actionRunner=new G,i.actionBar.push(this.commands.getItemActions(t),{icon:!0,label:!1}),A(t)&&setTimeout(()=>this._onDidScrollToEnd.fire(t),0)}disposeTemplate(r){r.dispose()}};C=S([a(1,q),a(2,N)],C);const Ge=M("timeline-refresh",L.refresh,c("timelineRefresh","Icon for the refresh timeline action.")),Ye=M("timeline-pin",L.pin,c("timelinePin","Icon for the pin timeline action.")),Qe=M("timeline-unpin",L.pinned,c("timelineUnpin","Icon for the unpin timeline action."));let E=class extends ae{constructor(e,i,n,t,s){super();this.pane=e;this.timelineService=i;this.storageService=n;this.contextKeyService=t;this.menuService=s;this._register(this.sourceDisposables=new R),this._register($(class extends K{constructor(){super({id:"timeline.refresh",title:g("refresh","Refresh"),icon:Ge,category:g("timeline","Timeline"),menu:{id:p.TimelineTitle,group:"navigation",order:99}})}run(o,...d){e.reset()}})),this._register(be.registerCommand("timeline.toggleFollowActiveEditor",(o,...d)=>e.followActiveEditor=!e.followActiveEditor)),this._register(W.appendMenuItem(p.TimelineTitle,{command:{id:"timeline.toggleFollowActiveEditor",title:g("timeline.toggleFollowActiveEditorCommand.follow","Pin the Current Timeline"),icon:Ye,category:g("timeline","Timeline")},group:"navigation",order:98,when:F})),this._register(W.appendMenuItem(p.TimelineTitle,{command:{id:"timeline.toggleFollowActiveEditor",title:g("timeline.toggleFollowActiveEditorCommand.unfollow","Unpin the Current Timeline"),icon:Qe,category:g("timeline","Timeline")},group:"navigation",order:98,when:F.toNegated()})),this._register(i.onDidChangeProviders(()=>this.updateTimelineSourceFilters())),this.updateTimelineSourceFilters()}sourceDisposables;getItemActions(e){return this.getActions(p.TimelineItemContext,{key:"timelineItem",value:e.contextValue}).primary}getItemContextActions(e){return this.getActions(p.TimelineItemContext,{key:"timelineItem",value:e.contextValue}).secondary}getActions(e,i){const n=this.contextKeyService.createOverlay([["view",this.pane.id],[i.key,i.value]]),t=this.menuService.getMenuActions(e,n,{shouldForwardArgs:!0}),d={primary:[],secondary:[]};return _e(t,d,"inline"),d}updateTimelineSourceFilters(){this.sourceDisposables.clear();const e=new Set(JSON.parse(this.storageService.get("timeline.excludeSources",y.PROFILE,"[]")));for(const i of this.timelineService.getSources())this.sourceDisposables.add($(class extends K{constructor(){super({id:`timeline.toggleExcludeSource:${i.id}`,title:i.label,menu:{id:p.TimelineFilterSubMenu,group:"navigation"},toggled:pe.regex("timelineExcludeSources",new RegExp(`\\b${me(i.id)}\\b`)).negate()})}run(n,...t){e.has(i.id)?e.delete(i.id):e.add(i.id),n.get(D).store("timeline.excludeSources",JSON.stringify([...e.keys()]),y.PROFILE,qe.USER)}}))}};E=S([a(1,H),a(2,D),a(3,k),a(4,Le)],E);export{Ke as TimelineExcludeSources,F as TimelineFollowActiveEditorContext,We as TimelineIdentityProvider,je as TimelineKeyboardNavigationLabelProvider,Je as TimelineListVirtualDelegate,b as TimelinePane};
