var N=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var T=(d,m,e,i)=>{for(var t=i>1?void 0:i?V(m,e):m,r=d.length-1,o;r>=0;r--)(o=d[r])&&(t=(i?o(m,e,t):o(t))||t);return i&&t&&N(m,e,t),t},a=(d,m)=>(e,i)=>m(e,i,d);import*as h from"../../../../nls.js";import*as n from"../../../../base/browser/dom.js";import*as A from"../../../../editor/common/languages.js";import{ActionsOrientation as P,ActionBar as $}from"../../../../base/browser/ui/actionbar/actionbar.js";import{Action as W,Separator as B,ActionRunner as F}from"../../../../base/common/actions.js";import{Disposable as K,dispose as b}from"../../../../base/common/lifecycle.js";import{URI as p}from"../../../../base/common/uri.js";import"../../../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js";import{IInstantiationService as k}from"../../../../platform/instantiation/common/instantiation.js";import{ICommentService as O}from"./commentService.js";import{MIN_EDITOR_HEIGHT as U,SimpleCommentEditor as C,calculateEditorHeight as z}from"./simpleCommentEditor.js";import{Emitter as q}from"../../../../base/common/event.js";import{INotificationService as j}from"../../../../platform/notification/common/notification.js";import{ToolBar as G}from"../../../../base/browser/ui/toolbar/toolbar.js";import{IContextMenuService as X}from"../../../../platform/contextview/browser/contextView.js";import{AnchorAlignment as f}from"../../../../base/browser/ui/contextview/contextview.js";import{ToggleReactionsAction as u,ReactionAction as I,ReactionActionViewItem as Z}from"./reactionsAction.js";import"../common/commentThreadWidget.js";import{MenuItemAction as S,SubmenuItemAction as J,MenuId as Q}from"../../../../platform/actions/common/actions.js";import{MenuEntryActionViewItem as Y,SubmenuEntryActionViewItem as ee}from"../../../../platform/actions/browser/menuEntryActionViewItem.js";import{IContextKeyService as te}from"../../../../platform/contextkey/common/contextkey.js";import{CommentFormActions as y}from"./commentFormActions.js";import{MOUSE_CURSOR_TEXT_CSS_CLASS_NAME as M}from"../../../../base/browser/ui/mouseCursor/mouseCursor.js";import{ActionViewItem as ie}from"../../../../base/browser/ui/actionbar/actionViewItems.js";import{DropdownMenuActionViewItem as E}from"../../../../base/browser/ui/dropdown/dropdownActionViewItem.js";import{Codicon as x}from"../../../../base/common/codicons.js";import{ThemeIcon as R}from"../../../../base/common/themables.js";import{MarshalledId as g}from"../../../../base/common/marshallingIds.js";import{TimestampWidget as oe}from"./timestamp.js";import{IConfigurationService as ne}from"../../../../platform/configuration/common/configuration.js";import"../../../../base/common/htmlContent.js";import"../../../../editor/common/core/range.js";import"../../notebook/common/notebookRange.js";import"./commentMenus.js";import{Scrollable as re,ScrollbarVisibility as w}from"../../../../base/common/scrollable.js";import{SmoothScrollableElement as se}from"../../../../base/browser/ui/scrollbar/scrollableElement.js";import{DomEmitter as me}from"../../../../base/browser/event.js";import{CommentContextKeys as ce}from"../common/commentContextKeys.js";import{FileAccess as ae,Schemas as de}from"../../../../base/common/network.js";import{COMMENTS_SECTION as he}from"../common/commentsConfiguration.js";import{StandardMouseEvent as le}from"../../../../base/browser/mouseEvent.js";import{IAccessibilityService as ue}from"../../../../platform/accessibility/common/accessibility.js";import{IKeybindingService as pe}from"../../../../platform/keybinding/common/keybinding.js";import"../../../common/comments.js";import{IHoverService as ge}from"../../../../platform/hover/browser/hover.js";import{ITextModelService as _e}from"../../../../editor/common/services/resolverService.js";import{Position as ve}from"../../../../editor/common/core/position.js";class L extends F{async runAction(m,e){await m.run(...e)}}let _=class extends K{constructor(e,i,t,r,o,s,c,l,Ee,Te,Ae,be,H,D,Ce,Ie,Se,ye){super();this.parentEditor=e;this.commentThread=i;this.comment=t;this.pendingEdit=r;this.owner=o;this.resource=s;this.parentThread=c;this.markdownRenderer=l;this.instantiationService=Ee;this.commentService=Te;this.notificationService=Ae;this.contextMenuService=be;this.configurationService=D;this.hoverService=Ce;this.accessibilityService=Ie;this.keybindingService=Se;this.textModelService=ye;this._domNode=n.$("div.review-comment"),this._contextKeyService=this._register(H.createScoped(this._domNode)),this._commentContextValue=ce.commentContext.bindTo(this._contextKeyService),this.comment.contextValue&&this._commentContextValue.set(this.comment.contextValue),this._commentMenus=this.commentService.getCommentMenus(this.owner),this._domNode.tabIndex=-1,this._avatar=n.append(this._domNode,n.$("div.avatar-container")),this.updateCommentUserIcon(this.comment.userIconPath),this._commentDetailsContainer=n.append(this._domNode,n.$(".review-comment-contents")),this.createHeader(this._commentDetailsContainer),this._body=document.createElement("div"),this._body.classList.add("comment-body",M),D.getValue(he)?.maxHeight!==!1&&this._body.classList.add("comment-body-max-height"),this.createScroll(this._commentDetailsContainer,this._body),this.updateCommentBody(this.comment.body),this.comment.commentReactions&&this.comment.commentReactions.length&&this.comment.commentReactions.filter(v=>!!v.count).length&&this.createReactionsContainer(this._commentDetailsContainer),this._domNode.setAttribute("aria-label",`${t.userName}, ${this.commentBodyValue}`),this._domNode.setAttribute("role","treeitem"),this._clearTimeout=null,this._register(n.addDisposableListener(this._domNode,n.EventType.CLICK,()=>this.isEditing||this._onDidClick.fire(this))),this._register(n.addDisposableListener(this._domNode,n.EventType.CONTEXT_MENU,v=>this.onContextMenu(v))),r&&this.switchToEditMode(),this._register(this.accessibilityService.onDidChangeScreenReaderOptimized(()=>{this.toggleToolbarHidden(!0)})),this.activeCommentListeners()}_domNode;_body;_avatar;_md;_plainText;_clearTimeout;_editAction=null;_commentEditContainer=null;_commentDetailsContainer;_actionsToolbarContainer;_reactionsActionBar;_reactionActionsContainer;_commentEditor=null;_commentEditorDisposables=[];_commentEditorModel=null;_editorHeight=U;_isPendingLabel;_timestamp;_timestampWidget;_contextKeyService;_commentContextValue;_commentMenus;_scrollable;_scrollableElement;actionRunner;toolbar;_commentFormActions=null;_commentEditorActions=null;_onDidClick=new q;get domNode(){return this._domNode}isEditing=!1;activeCommentListeners(){this._register(n.addDisposableListener(this._domNode,n.EventType.FOCUS_IN,()=>{this.commentService.setActiveCommentAndThread(this.owner,{thread:this.commentThread,comment:this.comment})},!0))}createScroll(e,i){this._scrollable=new re({forceIntegerValues:!0,smoothScrollDuration:125,scheduleAtNextAnimationFrame:r=>n.scheduleAtNextAnimationFrame(n.getWindow(e),r)}),this._scrollableElement=this._register(new se(i,{horizontal:w.Visible,vertical:w.Visible},this._scrollable)),this._register(this._scrollableElement.onScroll(r=>{r.scrollLeftChanged&&(i.scrollLeft=r.scrollLeft),r.scrollTopChanged&&(i.scrollTop=r.scrollTop)}));const t=this._register(new me(i,"scroll")).event;this._register(t(r=>{const o=this._scrollableElement.getScrollPosition(),s=Math.abs(i.scrollLeft-o.scrollLeft)<=1?void 0:i.scrollLeft,c=Math.abs(i.scrollTop-o.scrollTop)<=1?void 0:i.scrollTop;(s!==void 0||c!==void 0)&&this._scrollableElement.setScrollPosition({scrollLeft:s,scrollTop:c})})),e.appendChild(this._scrollableElement.getDomNode())}updateCommentBody(e){this._body.innerText="",this._md=void 0,this._plainText=void 0,typeof e=="string"?(this._plainText=n.append(this._body,n.$(".comment-body-plainstring")),this._plainText.innerText=e):(this._md=this.markdownRenderer.render(e).element,this._body.appendChild(this._md))}updateCommentUserIcon(e){if(this._avatar.textContent="",e){const i=n.append(this._avatar,n.$("img.avatar"));i.src=ae.uriToBrowserUri(p.revive(e)).toString(!0),i.onerror=t=>i.remove()}}get onDidClick(){return this._onDidClick.event}createTimestamp(e){this._timestamp=n.append(e,n.$("span.timestamp-container")),this.updateTimestamp(this.comment.timestamp)}updateTimestamp(e){if(!this._timestamp)return;const i=e!==void 0?new Date(e):void 0;i?this._timestampWidget?this._timestampWidget.setTimestamp(i):(this._timestampWidget=new oe(this.configurationService,this.hoverService,this._timestamp,i),this._register(this._timestampWidget)):this._timestampWidget?.dispose()}createHeader(e){const i=n.append(e,n.$(`div.comment-title.${M}`)),t=n.append(i,n.$("comment-header-info")),r=n.append(t,n.$("strong.author"));r.innerText=this.comment.userName,this.createTimestamp(t),this._isPendingLabel=n.append(t,n.$("span.isPending")),this.comment.label?this._isPendingLabel.innerText=this.comment.label:this._isPendingLabel.innerText="",this._actionsToolbarContainer=n.append(i,n.$(".comment-actions")),this.toggleToolbarHidden(!0),this.createActionsToolbar()}toggleToolbarHidden(e){e&&!this.accessibilityService.isScreenReaderOptimized()?this._actionsToolbarContainer.classList.add("hidden"):this._actionsToolbarContainer.classList.remove("hidden")}getToolbarActions(e){const i=e.getActions({shouldForwardArgs:!0}),o={primary:[],secondary:[]};return fe(i,o,!1,s=>/^inline/.test(s)),o}get commentNodeContext(){return[{thread:this.commentThread,commentUniqueId:this.comment.uniqueIdInThread,$mid:g.CommentNode},{commentControlHandle:this.commentThread.controllerHandle,commentThreadHandle:this.commentThread.commentThreadHandle,$mid:g.CommentThread}]}createToolbar(){this.toolbar=new G(this._actionsToolbarContainer,this.contextMenuService,{actionViewItemProvider:(e,i)=>e.id===u.ID?new E(e,e.menuActions,this.contextMenuService,{...i,actionViewItemProvider:(t,r)=>this.actionViewItemProvider(t,r),actionRunner:this.actionRunner,classNames:["toolbar-toggle-pickReactions",...R.asClassNameArray(x.reactions)],anchorAlignmentProvider:()=>f.RIGHT}):this.actionViewItemProvider(e,i),orientation:P.HORIZONTAL}),this.toolbar.context=this.commentNodeContext,this.toolbar.actionRunner=new L,this.registerActionBarListeners(this._actionsToolbarContainer),this._register(this.toolbar)}createActionsToolbar(){const e=[];if(this.commentService.hasReactionHandler(this.owner)){const s=this.createReactionPicker(this.comment.commentReactions||[]);e.push(s)}const t=this._commentMenus.getCommentTitleActions(this.comment,this._contextKeyService);this._register(t),this._register(t.onDidChange(s=>{const{primary:c,secondary:l}=this.getToolbarActions(t);!this.toolbar&&(c.length||l.length)&&this.createToolbar(),this.toolbar.setActions(c,l)}));const{primary:r,secondary:o}=this.getToolbarActions(t);e.push(...r),(e.length||o.length)&&(this.createToolbar(),this.toolbar.setActions(e,o))}actionViewItemProvider(e,i){return e.id===u.ID?i={label:!1,icon:!0}:i={label:!1,icon:!0},e.id===I.ID?new Z(e):e instanceof S?this.instantiationService.createInstance(Y,e,{hoverDelegate:i.hoverDelegate}):e instanceof J?this.instantiationService.createInstance(ee,e,i):new ie({},e,i)}async submitComment(){this._commentEditor&&this._commentFormActions&&(await this._commentFormActions.triggerDefaultAction(),this.pendingEdit=void 0)}createReactionPicker(e){const i=this._register(new u(()=>{r?.show()},h.localize("commentToggleReaction","Toggle Reaction")));let t=[];e&&e.length&&(t=e.map(o=>new W(`reaction.command.${o.label}`,`${o.label}`,"",!0,async()=>{try{await this.commentService.toggleReaction(this.owner,this.resource,this.commentThread,this.comment,o)}catch(s){const c=s.message?h.localize("commentToggleReactionError","Toggling the comment reaction failed: {0}.",s.message):h.localize("commentToggleReactionDefaultError","Toggling the comment reaction failed");this.notificationService.error(c)}}))),i.menuActions=t;const r=new E(i,i.menuActions,this.contextMenuService,{actionViewItemProvider:(o,s)=>o.id===u.ID?r:this.actionViewItemProvider(o,s),actionRunner:this.actionRunner,classNames:"toolbar-toggle-pickReactions",anchorAlignmentProvider:()=>f.RIGHT});return i}createReactionsContainer(e){this._reactionActionsContainer=n.append(e,n.$("div.comment-reactions")),this._reactionsActionBar=new $(this._reactionActionsContainer,{actionViewItemProvider:(t,r)=>t.id===u.ID?new E(t,t.menuActions,this.contextMenuService,{actionViewItemProvider:(o,s)=>this.actionViewItemProvider(o,s),actionRunner:this.actionRunner,classNames:["toolbar-toggle-pickReactions",...R.asClassNameArray(x.reactions)],anchorAlignmentProvider:()=>f.RIGHT}):this.actionViewItemProvider(t,r)}),this._register(this._reactionsActionBar);const i=this.commentService.hasReactionHandler(this.owner);if(this.comment.commentReactions.filter(t=>!!t.count).map(t=>{const r=new I(`reaction.${t.label}`,`${t.label}`,t.hasReacted&&(t.canEdit||i)?"active":"",t.canEdit||i,async()=>{try{await this.commentService.toggleReaction(this.owner,this.resource,this.commentThread,this.comment,t)}catch(o){let s;t.hasReacted?s=o.message?h.localize("commentDeleteReactionError","Deleting the comment reaction failed: {0}.",o.message):h.localize("commentDeleteReactionDefaultError","Deleting the comment reaction failed"):s=o.message?h.localize("commentAddReactionError","Deleting the comment reaction failed: {0}.",o.message):h.localize("commentAddReactionDefaultError","Deleting the comment reaction failed"),this.notificationService.error(s)}},t.reactors,t.iconPath,t.count);this._reactionsActionBar?.push(r,{label:!0,icon:!0})}),i){const t=this.createReactionPicker(this.comment.commentReactions||[]);this._reactionsActionBar.push(t,{label:!1,icon:!0})}}get commentBodyValue(){return typeof this.comment.body=="string"?this.comment.body:this.comment.body.value}async createCommentEditor(e){const i=n.append(e,n.$(".edit-textarea"));this._commentEditor=this.instantiationService.createInstance(C,i,C.getEditorOptions(this.configurationService),this._contextKeyService,this.parentThread);const t=p.from({scheme:de.commentsInput,path:`/commentinput-${this.comment.uniqueIdInThread}-${Date.now()}.md`}),r=await this.textModelService.createModelReference(t);if(this._commentEditorModel=r,this._commentEditor.setModel(this._commentEditorModel.object.textEditorModel),this._commentEditor.setValue(this.pendingEdit?.body??this.commentBodyValue),this.pendingEdit)this._commentEditor.setPosition(this.pendingEdit.cursor);else{const s=this._commentEditorModel.object.textEditorModel.getLineCount(),c=this._commentEditorModel.object.textEditorModel.getLineLength(s)+1;this._commentEditor.setPosition(new ve(s,c))}this.pendingEdit=void 0,this._commentEditor.layout({width:i.clientWidth-14,height:this._editorHeight}),this._commentEditor.focus(),n.scheduleAtNextAnimationFrame(n.getWindow(e),()=>{this._commentEditor.layout({width:i.clientWidth-14,height:this._editorHeight}),this._commentEditor.focus()});const o=this.commentThread;o.input={uri:this._commentEditor.getModel().uri,value:this.commentBodyValue},this.commentService.setActiveEditingCommentThread(o),this.commentService.setActiveCommentAndThread(this.owner,{thread:o,comment:this.comment}),this._commentEditorDisposables.push(this._commentEditor.onDidFocusEditorWidget(()=>{o.input={uri:this._commentEditor.getModel().uri,value:this.commentBodyValue},this.commentService.setActiveEditingCommentThread(o),this.commentService.setActiveCommentAndThread(this.owner,{thread:o,comment:this.comment})})),this._commentEditorDisposables.push(this._commentEditor.onDidChangeModelContent(s=>{if(o.input&&this._commentEditor&&this._commentEditor.getModel().uri===o.input.uri){const c=this._commentEditor.getValue();if(c!==o.input.value){const l=o.input;l.value=c,o.input=l,this.commentService.setActiveEditingCommentThread(o),this.commentService.setActiveCommentAndThread(this.owner,{thread:o,comment:this.comment})}}})),this.calculateEditorHeight(),this._register(this._commentEditorModel.object.textEditorModel.onDidChangeContent(()=>{this._commentEditor&&this.calculateEditorHeight()&&(this._commentEditor.layout({height:this._editorHeight,width:this._commentEditor.getLayoutInfo().width}),this._commentEditor.render(!0))})),this._register(this._commentEditor),this._register(this._commentEditorModel)}calculateEditorHeight(){if(this._commentEditor){const e=z(this.parentEditor,this._commentEditor,this._editorHeight);if(e!==this._editorHeight)return this._editorHeight=e,!0}return!1}getPendingEdit(){const e=this._commentEditor?.getModel();if(this._commentEditor&&e&&e.getValueLength()>0)return{body:e.getValue(),cursor:this._commentEditor.getPosition()}}removeCommentEditor(){this.isEditing=!1,this._editAction&&(this._editAction.enabled=!0),this._body.classList.remove("hidden"),this._commentEditorModel?.dispose(),b(this._commentEditorDisposables),this._commentEditorDisposables=[],this._commentEditor?.dispose(),this._commentEditor=null,this._commentEditContainer.remove()}layout(e){const i=e!==void 0?e-72:this._commentEditor?.getLayoutInfo().width??0;this._commentEditor?.layout({width:i,height:this._editorHeight});const t=this._body.scrollWidth,r=n.getContentWidth(this._body),o=this._body.scrollHeight,s=n.getContentHeight(this._body)+4;this._scrollableElement.setScrollDimensions({width:r,scrollWidth:t,height:s,scrollHeight:o})}async switchToEditMode(){if(this.isEditing)return;this.isEditing=!0,this._body.classList.add("hidden"),this._commentEditContainer=n.append(this._commentDetailsContainer,n.$(".edit-container")),await this.createCommentEditor(this._commentEditContainer);const e=n.append(this._commentEditContainer,n.$(".form-actions")),i=n.append(e,n.$(".other-actions"));this.createCommentWidgetFormActions(i);const t=n.append(e,n.$(".editor-actions"));this.createCommentWidgetEditorActions(t)}createCommentWidgetFormActions(e){const t=this.commentService.getCommentMenus(this.owner).getCommentActions(this.comment,this._contextKeyService);this._register(t),this._register(t.onDidChange(()=>{this._commentFormActions?.setActions(t)})),this._commentFormActions=new y(this.keybindingService,this._contextKeyService,this.contextMenuService,e,r=>{const o=this._commentEditor.getValue();r.run({thread:this.commentThread,commentUniqueId:this.comment.uniqueIdInThread,text:o,$mid:g.CommentThreadNode}),this.removeCommentEditor()}),this._register(this._commentFormActions),this._commentFormActions.setActions(t)}createCommentWidgetEditorActions(e){const t=this.commentService.getCommentMenus(this.owner).getCommentEditorActions(this._contextKeyService);this._register(t),this._register(t.onDidChange(()=>{this._commentEditorActions?.setActions(t)})),this._commentEditorActions=new y(this.keybindingService,this._contextKeyService,this.contextMenuService,e,r=>{const o=this._commentEditor.getValue();r.run({thread:this.commentThread,commentUniqueId:this.comment.uniqueIdInThread,text:o,$mid:g.CommentThreadNode}),this._commentEditor?.focus()}),this._register(this._commentEditorActions),this._commentEditorActions.setActions(t,!0)}setFocus(e,i=!1){e?(this._domNode.focus(),this.toggleToolbarHidden(!1),this._actionsToolbarContainer.classList.add("tabfocused"),this._domNode.tabIndex=0,this.comment.mode===A.CommentMode.Editing&&this._commentEditor?.focus()):(this._actionsToolbarContainer.classList.contains("tabfocused")&&!this._actionsToolbarContainer.classList.contains("mouseover")&&(this.toggleToolbarHidden(!0),this._domNode.tabIndex=-1),this._actionsToolbarContainer.classList.remove("tabfocused"))}registerActionBarListeners(e){this._register(n.addDisposableListener(this._domNode,"mouseenter",()=>{this.toggleToolbarHidden(!1),e.classList.add("mouseover")})),this._register(n.addDisposableListener(this._domNode,"mouseleave",()=>{e.classList.contains("mouseover")&&!e.classList.contains("tabfocused")&&this.toggleToolbarHidden(!0),e.classList.remove("mouseover")}))}async update(e){e.body!==this.comment.body&&this.updateCommentBody(e.body),this.comment.userIconPath&&e.userIconPath&&p.from(this.comment.userIconPath).toString()!==p.from(e.userIconPath).toString()&&this.updateCommentUserIcon(e.userIconPath);const i=e.mode!==void 0&&e.mode!==this.comment.mode;this.comment=e,i&&(e.mode===A.CommentMode.Editing?await this.switchToEditMode():this.removeCommentEditor()),e.label?this._isPendingLabel.innerText=e.label:this._isPendingLabel.innerText="",this._reactionActionsContainer?.remove(),this._reactionsActionBar?.clear(),this.comment.commentReactions&&this.comment.commentReactions.some(t=>!!t.count)&&this.createReactionsContainer(this._commentDetailsContainer),this.comment.contextValue?this._commentContextValue.set(this.comment.contextValue):this._commentContextValue.reset(),this.comment.timestamp&&this.updateTimestamp(this.comment.timestamp)}onContextMenu(e){const i=new le(n.getWindow(this._domNode),e);this.contextMenuService.showContextMenu({getAnchor:()=>i,menuId:Q.CommentThreadCommentContext,menuActionOptions:{shouldForwardArgs:!0},contextKeyService:this._contextKeyService,actionRunner:new L,getActionsContext:()=>this.commentNodeContext})}focus(){this.domNode.focus(),this._clearTimeout||(this.domNode.classList.add("focus"),this._clearTimeout=setTimeout(()=>{this.domNode.classList.remove("focus")},3e3))}dispose(){super.dispose(),b(this._commentEditorDisposables)}};_=T([a(8,k),a(9,O),a(10,j),a(11,X),a(12,te),a(13,ne),a(14,ge),a(15,ue),a(16,pe),a(17,_e)],_);function fe(d,m,e,i=t=>t==="navigation"){for(const t of d){let[r,o]=t;if(e&&(o=o.map(s=>s instanceof S&&s.alt?s.alt:s)),i(r))(Array.isArray(m)?m:m.primary).unshift(...o);else{const s=Array.isArray(m)?m:m.secondary;s.length>0&&s.push(new B),s.push(...o)}}}export{_ as CommentNode};
