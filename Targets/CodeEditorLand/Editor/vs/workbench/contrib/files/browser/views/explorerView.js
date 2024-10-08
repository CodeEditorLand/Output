var $=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var x=(a,l,e,t)=>{for(var r=t>1?void 0:t?Y(l,e):l,o=a.length-1,n;o>=0;o--)(n=a[o])&&(r=(t?n(l,e,r):n(r))||r);return t&&r&&$(l,e,r),r},c=(a,l)=>(e,t)=>l(e,t,a);import*as m from"../../../../../nls.js";import"../../../../../base/common/uri.js";import*as R from"../../../../../base/common/performance.js";import"../../../../../base/common/actions.js";import{memoize as A}from"../../../../../base/common/decorators.js";import{ExplorerFolderContext as j,FilesExplorerFocusedContext as J,ExplorerFocusedContext as Q,ExplorerRootContext as X,ExplorerResourceReadonlyContext as Z,ExplorerResourceCut as ee,ExplorerResourceMoveableToTrash as te,ExplorerCompressedFocusContext as re,ExplorerCompressedFirstFocusContext as ie,ExplorerCompressedLastFocusContext as oe,ExplorerResourceAvailableEditorIdsContext as se,VIEW_ID as C,ExplorerResourceNotReadonlyContext as D,ViewHasSomeCollapsibleRootItemContext as ne,FoldersViewVisibleContext as ae}from"../../common/files.js";import{FileCopiedContext as le,NEW_FILE_COMMAND_ID as N,NEW_FOLDER_COMMAND_ID as ce}from"../fileActions.js";import*as u from"../../../../../base/browser/dom.js";import{IWorkbenchLayoutService as de}from"../../../../services/layout/browser/layoutService.js";import{ExplorerDecorationsProvider as he}from"./explorerDecorationsProvider.js";import{IWorkspaceContextService as P,WorkbenchState as pe}from"../../../../../platform/workspace/common/workspace.js";import{IConfigurationService as _}from"../../../../../platform/configuration/common/configuration.js";import{IKeybindingService as ue}from"../../../../../platform/keybinding/common/keybinding.js";import{IInstantiationService as fe}from"../../../../../platform/instantiation/common/instantiation.js";import{IProgressService as V,ProgressLocation as k}from"../../../../../platform/progress/common/progress.js";import{IContextMenuService as ve}from"../../../../../platform/contextview/browser/contextView.js";import{IContextKeyService as me,ContextKeyExpr as y}from"../../../../../platform/contextkey/common/contextkey.js";import{ResourceContextKey as ge}from"../../../../common/contextkeys.js";import{IDecorationsService as Ce}from"../../../../services/decorations/common/decorations.js";import{WorkbenchCompressibleAsyncDataTree as xe}from"../../../../../platform/list/browser/listService.js";import{DelayedDragHandler as Se}from"../../../../../base/browser/dnd.js";import{IEditorService as Ie,SIDE_GROUP as Ee,ACTIVE_GROUP as ye}from"../../../../services/editor/common/editorService.js";import{ViewPane as be}from"../../../../browser/parts/views/viewPane.js";import{ILabelService as Fe}from"../../../../../platform/label/common/label.js";import{ExplorerDelegate as L,ExplorerDataSource as we,FilesRenderer as Te,FilesFilter as Re,FileSorter as Ae,FileDragAndDrop as De,ExplorerCompressionDelegate as Ne,isCompressedFolderName as Pe}from"./explorerViewer.js";import{IThemeService as _e}from"../../../../../platform/theme/common/themeService.js";import"../../../../services/themes/common/workbenchThemeService.js";import{TreeVisibility as Ve}from"../../../../../base/browser/ui/tree/tree.js";import{MenuId as S,Action2 as b,registerAction2 as F}from"../../../../../platform/actions/common/actions.js";import{ITelemetryService as ke}from"../../../../../platform/telemetry/common/telemetry.js";import{ExplorerItem as g,NewExplorerItem as Le}from"../../common/explorerModel.js";import{ResourceLabels as Me}from"../../../../browser/labels.js";import{IStorageService as Ke,StorageScope as M,StorageTarget as ze}from"../../../../../platform/storage/common/storage.js";import"../../../../../base/browser/ui/tree/asyncDataTree.js";import{fuzzyScore as Oe}from"../../../../../base/common/filters.js";import{IClipboardService as We}from"../../../../../platform/clipboard/common/clipboardService.js";import{IFileService as K,FileSystemProviderCapabilities as He}from"../../../../../platform/files/common/files.js";import"../../../../../base/common/lifecycle.js";import{Event as Be}from"../../../../../base/common/event.js";import{IViewDescriptorService as Ue}from"../../../../common/views.js";import{IViewsService as z}from"../../../../services/views/common/viewsService.js";import{IOpenerService as qe}from"../../../../../platform/opener/common/opener.js";import{IUriIdentityService as Ge}from"../../../../../platform/uriIdentity/common/uriIdentity.js";import{EditorResourceAccessor as $e,SideBySideEditor as Ye}from"../../../../common/editor.js";import{IExplorerService as w}from"../files.js";import{Codicon as I}from"../../../../../base/common/codicons.js";import{ICommandService as T}from"../../../../../platform/commands/common/commands.js";import{IEditorResolverService as je}from"../../../../services/editor/common/editorResolverService.js";import{EditorOpenSource as Je}from"../../../../../platform/editor/common/editor.js";import{ResourceMap as Qe}from"../../../../../base/common/map.js";import{AbstractTreePart as O,contiguousFuzzyScore as Xe}from"../../../../../base/browser/ui/tree/abstractTree.js";import{IHoverService as Ze}from"../../../../../platform/hover/browser/hover.js";import{basename as et,relativePath as tt}from"../../../../../base/common/resources.js";import{IFilesConfigurationService as rt}from"../../../../services/filesConfiguration/common/filesConfigurationService.js";import{getExcludes as it,ISearchService as ot,QueryType as st}from"../../../../services/search/common/search.js";import"../../../../../base/common/cancellation.js";function nt(a,l){for(const e of l)if(a.hasNode(e)&&!a.isCollapsed(e)){for(const[,t]of e.children.entries())if(a.hasNode(t)&&a.isCollapsible(t)&&!a.isCollapsed(t))return!0}return!1}function at(a,l){for(const e of l)if(a.hasNode(e)&&!a.isCollapsed(e))return!0;return!1}const lt={getId:a=>a instanceof Le?`new:${a.getId()}`:a.getId()};function ct(a,l,e,t){let r;r=a.length?a[0]:void 0,e&&l.length>1&&(r=void 0);const o=r&&t.getCompressedNavigationController(r),n=o&&o.length?o[0]:void 0;r=n?n.current:r;const d=[];for(const i of l){const s=t.getCompressedNavigationController(i),h=s&&s.length?s[0]:void 0;if(h&&r&&h===n){i===r&&d.push(i);continue}h?d.push(...h.items):d.push(i)}return r?e&&d.indexOf(r)>=0?d:[r]:e?d:[]}const W={id:"fuzzyMatch",title:"Fuzzy Match",icon:I.searchFuzzy,isChecked:!1};let E=class{constructor(l,e,t,r,o,n,d){this.workspaceContextService=l;this.searchService=e;this.fileService=t;this.configurationService=r;this.filesConfigService=o;this.progressService=n;this.explorerService=d}toggles=[W];placeholder=m.localize("type to search files","Type to search files");async*getFindResults(l,e,t,r){const o=r.find(s=>s.id===W.id)?.isChecked,n=this.workspaceContextService.getWorkspace().folders,d=Promise.all(n.map(async s=>{const h=it(this.configurationService.getValue({resource:s.uri}))||{},v=await this.searchService.fileSearch({folderQueries:[{folder:s.uri}],type:st.File,shouldGlobMatchFilePattern:!o,filePattern:o?l:`**/*${l}*`,maxResults:512,sortByScore:!0,cacheKey:`explorerfindprovider:${e}`,excludePattern:h},t);return{folder:s.uri,result:v}})),i=await this.progressService.withProgress({location:k.Explorer,delay:1e3},s=>d);t.isCancellationRequested||(yield*this.createResultItems(i,l,o))}async*createResultItems(l,e,t){const r=e.toLowerCase();for(const{folder:o,result:n}of l){const d=new g(o,this.fileService,this.configurationService,this.filesConfigService,void 0);for(const i of n.results){const s=et(i.resource);let h;if(t?h=Oe(e,r,0,s,s.toLowerCase(),0,{firstMatchCanBeWeak:!0,boostFullMatch:!0}):h=Xe(r,s.toLowerCase()),!h)continue;const v=this.createItem(i.resource,d);v&&(yield{element:v,filterdata:h})}}}createItem(l,e){const t=tt(e.resource,l);if(!t)return;let r=e,o=e.resource;const n=t.split("/");for(const d of n){o=o.with({path:`${o.path}/${d}`});let i=r.children.get(d);if(!i){const s=n[n.length-1]!==d;i=new g(o,this.fileService,this.configurationService,this.filesConfigService,r,s)}r=i}return r}revealResultInTree(l){this.explorerService.select(l.resource,!0)}};E=x([c(0,P),c(1,ot),c(2,K),c(3,_),c(4,rt),c(5,V),c(6,w)],E);let f=class extends be{constructor(e,t,r,o,n,d,i,s,h,v,p,H,ht,pt,B,U,q,ut,ft,vt,mt,gt,Ct,G){super(e,v,t,H,p,r,o,G,B,U,q);this.contextService=n;this.progressService=d;this.editorService=i;this.editorResolverService=s;this.layoutService=h;this.decorationService=ht;this.labelService=pt;this.explorerService=ut;this.storageService=ft;this.clipboardService=vt;this.fileService=mt;this.uriIdentityService=gt;this.commandService=Ct;this.delegate=e.delegate,this.resourceContext=o.createInstance(ge),this._register(this.resourceContext),this.folderContext=j.bindTo(p),this.readonlyContext=Z.bindTo(p),this.availableEditorIdsContext=se.bindTo(p),this.rootContext=X.bindTo(p),this.resourceMoveableToTrash=te.bindTo(p),this.compressedFocusContext=re.bindTo(p),this.compressedFocusFirstContext=ie.bindTo(p),this.compressedFocusLastContext=oe.bindTo(p),this.viewHasSomeCollapsibleRootItem=ne.bindTo(p),this.viewVisibleContextKey=ae.bindTo(p),this.explorerService.registerView(this)}static TREE_VIEW_STATE_STORAGE_KEY="workbench.explorer.treeViewState";tree;filter;resourceContext;folderContext;readonlyContext;availableEditorIdsContext;rootContext;resourceMoveableToTrash;renderer;treeContainer;container;compressedFocusContext;compressedFocusFirstContext;compressedFocusLastContext;viewHasSomeCollapsibleRootItem;viewVisibleContextKey;setTreeInputPromise;horizontalScrolling;dragHandler;_autoReveal=!1;decorationsProvider;delegate;get autoReveal(){return this._autoReveal}set autoReveal(e){this._autoReveal=e}get name(){return this.labelService.getWorkspaceLabel(this.contextService.getWorkspace())}get title(){return this.name}set title(e){}setVisible(e){this.viewVisibleContextKey.set(e),super.setVisible(e)}get fileCopiedContextKey(){return le.bindTo(this.contextKeyService)}get resourceCutContextKey(){return ee.bindTo(this.contextKeyService)}renderHeader(e){super.renderHeader(e),this.dragHandler=new Se(e,()=>this.setExpanded(!0));const t=e.querySelector(".title"),r=()=>{t.textContent=this.name,this.updateTitle(this.name),this.ariaHeaderLabel=m.localize("explorerSection","Explorer Section: {0}",this.name),t.setAttribute("aria-label",this.ariaHeaderLabel)};this._register(this.contextService.onDidChangeWorkspaceName(r)),this._register(this.labelService.onDidChangeFormatters(r)),r()}layoutBody(e,t){super.layoutBody(e,t),this.tree.layout(e,t)}renderBody(e){super.renderBody(e),this.container=e,this.treeContainer=u.append(e,u.$(".explorer-folders-view")),this.createTree(this.treeContainer),this._register(this.labelService.onDidChangeFormatters(()=>{this._onDidChangeTitleArea.fire()})),this.onConfigurationUpdated(void 0),this._register(this.editorService.onDidActiveEditorChange(()=>{this.selectActiveFile()})),this._register(this.configurationService.onDidChangeConfiguration(t=>this.onConfigurationUpdated(t))),this._register(this.onDidChangeBodyVisibility(async t=>{t&&(await this.setTreeInput(),this.updateAnyCollapsedContext(),this.selectActiveFile(!0))})),this._register(u.addDisposableListener(u.getWindow(this.container),u.EventType.PASTE,async t=>{!this.hasFocus()||this.readonlyContext.get()||t.clipboardData?.files?.length&&await this.commandService.executeCommand("filesExplorer.paste",t.clipboardData?.files)}))}focus(){if(super.focus(),this.tree.domFocus(),this.tree.getFocusedPart()===O.Tree){const e=this.tree.getFocus();e.length===1&&this._autoReveal&&this.tree.reveal(e[0],.5)}}hasFocus(){return u.isAncestorOfActiveElement(this.container)}getFocus(){return this.tree.getFocus()}focusNext(){this.tree.focusNext()}focusLast(){this.tree.focusLast()}getContext(e){const t=this.tree.getFocusedPart()===O.StickyScroll?this.tree.getStickyScrollFocus():this.tree.getFocus();return ct(t,this.tree.getSelection(),e,this.renderer)}isItemVisible(e){return this.filter?this.filter.filter(e,Ve.Visible):!1}isItemCollapsed(e){return this.tree.isCollapsed(e)}async setEditable(e,t){t?(this.horizontalScrolling=this.tree.options.horizontalScrolling,this.horizontalScrolling&&this.tree.updateOptions({horizontalScrolling:!1}),await this.tree.expand(e.parent)):(this.horizontalScrolling!==void 0&&this.tree.updateOptions({horizontalScrolling:this.horizontalScrolling}),this.horizontalScrolling=void 0,this.treeContainer.classList.remove("highlight")),await this.refresh(!1,e.parent,!1),t?(this.treeContainer.classList.add("highlight"),this.tree.reveal(e)):this.tree.domFocus()}async selectActiveFile(e=this._autoReveal){if(this._autoReveal){const t=$e.getCanonicalUri(this.editorService.activeEditor,{supportSideBySide:Ye.PRIMARY});if(t){const r=this.tree.getFocus(),o=this.tree.getSelection();return r.length===1&&this.uriIdentityService.extUri.isEqual(r[0].resource,t)&&o.length===1&&this.uriIdentityService.extUri.isEqual(o[0].resource,t)?void 0:this.explorerService.select(t,e)}}}createTree(e){this.filter=this.instantiationService.createInstance(Re),this._register(this.filter),this._register(this.filter.onDidChange(()=>this.refresh(!0)));const t=this.instantiationService.createInstance(Me,{onDidChangeVisibility:this.onDidChangeBodyVisibility});this._register(t);const r=i=>this.tree.updateWidth(i);this.renderer=this.instantiationService.createInstance(Te,e,t,r),this._register(this.renderer),this._register(dt(e,this.themeService));const o=()=>this.configurationService.getValue("explorer.compactFolders"),n=i=>this.configurationService.getValue({resource:i?.root.resource}).explorer.fileNesting;this.tree=this.instantiationService.createInstance(xe,"FileExplorer",e,new L,new Ne,[this.renderer],this.instantiationService.createInstance(we,this.filter),{compressionEnabled:o(),accessibilityProvider:this.renderer,identityProvider:lt,keyboardNavigationLabelProvider:{getKeyboardNavigationLabel:i=>{if(!this.explorerService.isEditable(i))return i.name},getCompressedNodeKeyboardNavigationLabel:i=>{if(!i.some(s=>this.explorerService.isEditable(s)))return i.map(s=>s.name).join("/")}},multipleSelectionSupport:!0,filter:this.filter,sorter:this.instantiationService.createInstance(Ae),dnd:this.instantiationService.createInstance(De,i=>this.isItemCollapsed(i)),collapseByDefault:i=>!(i instanceof g&&i.hasNests&&n(i).expand),autoExpandSingleChildren:!0,expandOnlyOnTwistieClick:i=>{if(i instanceof g){if(i.hasNests)return!0;if(this.configurationService.getValue("workbench.tree.expandMode")==="doubleClick")return!0}return!1},paddingBottom:L.ITEM_HEIGHT,overrideStyles:this.getLocationBasedColors().listOverrideStyles,findResultsProvider:this.instantiationService.createInstance(E)}),this._register(this.tree),this._register(this.themeService.onDidColorThemeChange(()=>this.tree.rerender()));const d=Be.filter(this.configurationService.onDidChangeConfiguration,i=>i.affectsConfiguration("explorer.compactFolders"));this._register(d(i=>this.tree.updateOptions({compressionEnabled:o()}))),J.bindTo(this.tree.contextKeyService),Q.bindTo(this.tree.contextKeyService),this._register(this.tree.onDidChangeFocus(i=>this.onFocusChanged(i.elements))),this.onFocusChanged([]),this._register(this.tree.onDidOpen(async i=>{const s=i.element;if(!s)return;if(!(u.isKeyboardEvent(i.browserEvent)&&i.browserEvent.shiftKey)){if(s.isDirectory||this.explorerService.isEditable(void 0))return;this.telemetryService.publicLog2("workbenchActionExecuted",{id:"workbench.files.openFile",from:"explorer"});try{this.delegate?.willOpenElement(i.browserEvent),await this.editorService.openEditor({resource:s.resource,options:{preserveFocus:i.editorOptions.preserveFocus,pinned:i.editorOptions.pinned,source:Je.USER}},i.sideBySide?Ee:ye)}finally{this.delegate?.didOpenElement()}}})),this._register(this.tree.onContextMenu(i=>this.onContextMenu(i))),this._register(this.tree.onDidScroll(async i=>{const s=this.explorerService.getEditable();i.scrollTopChanged&&s&&this.tree.getRelativeTop(s.stat)===null&&await s.data.onFinish("",!1)})),this._register(this.tree.onDidChangeCollapseState(i=>{const s=i.node.element?.element;s&&this.renderer.getCompressedNavigationController(s instanceof Array?s[0]:s)?.forEach(v=>v.updateCollapsed(i.node.collapsed)),this.updateAnyCollapsedContext()})),this.updateAnyCollapsedContext(),this._register(this.tree.onMouseDblClick(i=>{const s=this.configurationService.getValue("workbench.list.scrollByPage");i.element===null&&!s&&this.commandService.executeCommand(N)})),this._register(this.storageService.onWillSaveState(()=>{this.storeTreeViewState()}))}onConfigurationUpdated(e){if(!e||e.affectsConfiguration("explorer.autoReveal")){const t=this.configurationService.getValue();this._autoReveal=t?.explorer?.autoReveal}e&&(e.affectsConfiguration("explorer.decorations.colors")||e.affectsConfiguration("explorer.decorations.badges"))&&this.refresh(!0)}storeTreeViewState(){this.storageService.store(f.TREE_VIEW_STATE_STORAGE_KEY,JSON.stringify(this.tree.getViewState()),M.WORKSPACE,ze.MACHINE)}setContextKeys(e){const t=this.contextService.getWorkspace().folders,r=e?e.resource:t[t.length-1].uri;if(e=e||this.explorerService.findClosest(r),this.resourceContext.set(r),this.folderContext.set(!!e&&e.isDirectory),this.readonlyContext.set(!!e&&!!e.isReadonly),this.rootContext.set(!!e&&e.isRoot),r){const o=r?this.editorResolverService.getEditors(r).map(n=>n.id):[];this.availableEditorIdsContext.set(o.join(","))}else this.availableEditorIdsContext.reset()}async onContextMenu(e){if(u.isEditableElement(e.browserEvent.target))return;const t=e.element;let r=e.anchor;if(u.isHTMLElement(r)&&t){const i=this.renderer.getCompressedNavigationController(t);i&&i.length>0&&(u.isKeyboardEvent(e.browserEvent)||Pe(e.browserEvent.target)?r=i[0].labels[i[0].index]:i.forEach(s=>s.last()))}this.fileCopiedContextKey.set(await this.clipboardService.hasResources()),this.setContextKeys(t);const o=this.tree.getSelection(),n=this.explorerService.roots;let d;if(t instanceof g){const i=this.renderer.getCompressedNavigationController(t);d=i&&i.length?i[0].current.resource:t.resource}else d=n.length===1?n[0].resource:{};this.contextMenuService.showContextMenu({menuId:S.ExplorerContext,menuActionOptions:{arg:d,shouldForwardArgs:!0},contextKeyService:this.tree.contextKeyService,getAnchor:()=>r,onHide:i=>{i&&this.tree.domFocus()},getActionsContext:()=>t&&o&&o.indexOf(t)>=0?o.map(i=>i.resource):t instanceof g?[t.resource]:[]})}onFocusChanged(e){const t=e&&e.length?e[0]:void 0;if(this.setContextKeys(t),t){const o=!!this.configurationService.getValue().files?.enableTrash,n=this.fileService.hasCapability(t.resource,He.Trash);this.resourceMoveableToTrash.set(o&&n)}else this.resourceMoveableToTrash.reset();const r=t&&this.renderer.getCompressedNavigationController(t);if(!r){this.compressedFocusContext.set(!1);return}this.compressedFocusContext.set(!0),r.forEach(o=>{this.updateCompressedNavigationContextKeys(o)})}refresh(e,t,r=!0){if(!this.tree||!this.isBodyVisible()||t&&!this.tree.hasNode(t))return Promise.resolve(void 0);r&&this.explorerService.isEditable(void 0)&&this.tree.domFocus();const o=t||this.tree.getInput();return this.tree.updateChildren(o,e,!!t)}getOptimalWidth(){const e=this.tree.getHTMLElement(),t=[].slice.call(e.querySelectorAll(".explorer-item .label-name"));return u.getLargestChildWidth(e,t)}async setTreeInput(){if(!this.isBodyVisible())return Promise.resolve(void 0);this.setTreeInputPromise&&await this.setTreeInputPromise;const e=!this.tree.getInput();e&&R.mark("code/willResolveExplorer");const t=this.explorerService.roots;let r=t[0];(this.contextService.getWorkbenchState()!==pe.FOLDER||t[0].error)&&(r=t);let o;if(this.tree&&this.tree.getInput())o=this.tree.getViewState();else{const i=this.storageService.get(f.TREE_VIEW_STATE_STORAGE_KEY,M.WORKSPACE);i&&(o=JSON.parse(i))}const n=this.tree.getInput(),d=this.setTreeInputPromise=this.tree.setInput(r,o).then(async()=>{if(Array.isArray(r)){if(!o||n instanceof g)for(let i=0;i<Math.min(r.length,5);i++)try{await this.tree.expand(r[i])}catch{}if(!n&&r.length===1&&this.configurationService.getValue().explorer.expandSingleFolderWorkspaces&&await this.tree.expand(r[0]).catch(()=>{}),Array.isArray(n)){const i=new Qe;n.forEach(s=>i.set(s.resource,!0)),await Promise.all(r.map(async s=>{if(!i.has(s.resource))try{await this.tree.expand(s)}catch{}}))}}e&&R.mark("code/didResolveExplorer")});this.progressService.withProgress({location:k.Explorer,delay:this.layoutService.isRestored()?800:1500},i=>d),await d,this.decorationsProvider||(this.decorationsProvider=new he(this.explorerService,this.contextService),this._register(this.decorationService.registerDecorationsProvider(this.decorationsProvider)))}async selectResource(e,t=this._autoReveal,r=0){if(r===2||!e||!this.isBodyVisible())return;this.setTreeInputPromise&&await this.setTreeInputPromise;let o=this.explorerService.findClosestRoot(e);for(;o&&o.resource.toString()!==e.toString();){try{await this.tree.expand(o)}catch{return this.selectResource(e,t,r+1)}if(!o.children.size)o=null;else for(const n of o.children.values()){if(this.uriIdentityService.extUri.isEqualOrParent(e,n.resource)){o=n;break}o=null}}if(o){if(o===this.tree.getInput()){this.tree.setFocus([]),this.tree.setSelection([]);return}try{o.nestedParent&&await this.tree.expand(o.nestedParent),(t===!0||t==="force")&&this.tree.getRelativeTop(o)===null&&this.tree.reveal(o,.5),this.tree.setFocus([o]),this.tree.setSelection([o])}catch{return this.selectResource(e,t,r+1)}}}itemsCopied(e,t,r){this.fileCopiedContextKey.set(e.length>0),this.resourceCutContextKey.set(t&&e.length>0),r?.forEach(o=>this.tree.rerender(o)),t&&e.forEach(o=>this.tree.rerender(o))}expandAll(){this.explorerService.isEditable(void 0)&&this.tree.domFocus(),this.tree.expandAll()}collapseAll(){this.explorerService.isEditable(void 0)&&this.tree.domFocus();const e=this.tree.getInput();if(Array.isArray(e)&&nt(this.tree,e)){e.forEach(t=>{t.children.forEach(r=>this.tree.hasNode(r)&&this.tree.collapse(r,!0))});return}this.tree.collapseAll()}previousCompressedStat(){const e=this.tree.getFocus();if(!e.length)return;this.renderer.getCompressedNavigationController(e[0]).forEach(r=>{r.previous(),this.updateCompressedNavigationContextKeys(r)})}nextCompressedStat(){const e=this.tree.getFocus();if(!e.length)return;this.renderer.getCompressedNavigationController(e[0]).forEach(r=>{r.next(),this.updateCompressedNavigationContextKeys(r)})}firstCompressedStat(){const e=this.tree.getFocus();if(!e.length)return;this.renderer.getCompressedNavigationController(e[0]).forEach(r=>{r.first(),this.updateCompressedNavigationContextKeys(r)})}lastCompressedStat(){const e=this.tree.getFocus();if(!e.length)return;this.renderer.getCompressedNavigationController(e[0]).forEach(r=>{r.last(),this.updateCompressedNavigationContextKeys(r)})}updateCompressedNavigationContextKeys(e){this.compressedFocusFirstContext.set(e.index===0),this.compressedFocusLastContext.set(e.index===e.count-1)}updateAnyCollapsedContext(){const e=this.tree.getInput();if(e===void 0)return;const t=Array.isArray(e)?e:Array.from(e.children.values());this.viewHasSomeCollapsibleRootItem.set(at(this.tree,t)),this.storeTreeViewState()}dispose(){this.dragHandler?.dispose(),super.dispose()}};x([A],f.prototype,"fileCopiedContextKey",1),x([A],f.prototype,"resourceCutContextKey",1),f=x([c(1,ve),c(2,Ue),c(3,fe),c(4,P),c(5,V),c(6,Ie),c(7,je),c(8,de),c(9,ue),c(10,me),c(11,_),c(12,Ce),c(13,Fe),c(14,_e),c(15,ke),c(16,Ze),c(17,w),c(18,Ke),c(19,We),c(20,K),c(21,Ge),c(22,T),c(23,qe)],f);function dt(a,l){a.classList.add("file-icon-themable-tree"),a.classList.add("show-file-icons");const e=t=>{a.classList.toggle("align-icons-and-twisties",t.hasFileIcons&&!t.hasFolderIcons),a.classList.toggle("hide-arrows",t.hidesExplorerArrows===!0)};return e(l.getFileIconTheme()),l.onDidFileIconThemeChange(e)}F(class extends b{constructor(){super({id:"workbench.files.action.createFileFromExplorer",title:m.localize("createNewFile","New File..."),f1:!1,icon:I.newFile,precondition:D,menu:{id:S.ViewTitle,group:"navigation",when:y.equals("view",C),order:10}})}run(a){a.get(T).executeCommand(N)}}),F(class extends b{constructor(){super({id:"workbench.files.action.createFolderFromExplorer",title:m.localize("createNewFolder","New Folder..."),f1:!1,icon:I.newFolder,precondition:D,menu:{id:S.ViewTitle,group:"navigation",when:y.equals("view",C),order:20}})}run(a){a.get(T).executeCommand(ce)}}),F(class extends b{constructor(){super({id:"workbench.files.action.refreshFilesExplorer",title:m.localize2("refreshExplorer","Refresh Explorer"),f1:!0,icon:I.refresh,menu:{id:S.ViewTitle,group:"navigation",when:y.equals("view",C),order:30},metadata:{description:m.localize2("refreshExplorerMetadata","Forces a refresh of the Explorer.")}})}async run(a){const l=a.get(z),e=a.get(w);await l.openView(C),await e.refresh()}}),F(class extends b{constructor(){super({id:"workbench.files.action.collapseExplorerFolders",title:m.localize2("collapseExplorerFolders","Collapse Folders in Explorer"),f1:!0,icon:I.collapseAll,menu:{id:S.ViewTitle,group:"navigation",when:y.equals("view",C),order:40},metadata:{description:m.localize2("collapseExplorerFoldersMetadata","Folds all folders in the Explorer.")}})}run(a){const e=a.get(z).getViewWithId(C);e!==null&&e.collapseAll()}});export{f as ExplorerView,dt as createFileIconThemableTreeContainerScope,ct as getContext};
