var x=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var h=(d,o,r,a)=>{for(var n=a>1?void 0:a?y(o,r):o,s=d.length-1,c;s>=0;s--)(c=d[s])&&(n=(a?c(o,r,n):c(n))||n);return a&&n&&x(o,r,n),n},l=(d,o)=>(r,a)=>o(r,a,d);import{DisposableStore as f}from"../../base/common/lifecycle.js";import"../../base/common/uri.js";import{localize as t}from"../../nls.js";import{IContextKeyService as b,RawContextKey as e}from"../../platform/contextkey/common/contextkey.js";import{basename as m,dirname as v,extname as w,isEqual as p}from"../../base/common/resources.js";import{ILanguageService as g}from"../../editor/common/languages/language.js";import{IFileService as E}from"../../platform/files/common/files.js";import{IModelService as C}from"../../editor/common/services/model.js";import{Schemas as u}from"../../base/common/network.js";import"./editor/editorInput.js";import"../services/editor/common/editorResolverService.js";import{DEFAULT_EDITOR_ASSOCIATION as I}from"./editor.js";import{isLinux as S}from"../../base/common/platform.js";const H=new e("workbenchState",void 0,{type:"string",description:t("workbenchState","The kind of workspace opened in the window, either 'empty' (no workspace), 'folder' (single folder) or 'workspace' (multi-root workspace)")}),j=new e("workspaceFolderCount",0,t("workspaceFolderCount","The number of root folders in the workspace")),q=new e("openFolderWorkspaceSupport",!0,!0),$=new e("enterMultiRootWorkspaceSupport",!0,!0),J=new e("emptyWorkspaceSupport",!0,!0),Q=new e("dirtyWorkingCopies",!1,t("dirtyWorkingCopies","Whether there are any working copies with unsaved changes")),X=new e("remoteName","",t("remoteName","The name of the remote the window is connected to or an empty string if not connected to any remote")),Y=new e("virtualWorkspace","",t("virtualWorkspace","The scheme of the current workspace is from a virtual file system or an empty string.")),ee=new e("temporaryWorkspace",!1,t("temporaryWorkspace","The scheme of the current workspace is from a temporary file system.")),te=new e("isFullscreen",!1,t("isFullscreen","Whether the main window is in fullscreen mode")),oe=new e("isAuxiliaryWindowFocusedContext",!1,t("isAuxiliaryWindowFocusedContext","Whether an auxiliary window is focused")),ie=new e("hasWebFileSystemAccess",!1,!0),re=new e("embedderIdentifier",void 0,t("embedderIdentifier","The identifier of the embedder according to the product service, if one is defined")),ne=new e("activeEditorIsDirty",!1,t("activeEditorIsDirty","Whether the active editor has unsaved changes")),se=new e("activeEditorIsNotPreview",!1,t("activeEditorIsNotPreview","Whether the active editor is not in preview mode")),ae=new e("activeEditorIsFirstInGroup",!1,t("activeEditorIsFirstInGroup","Whether the active editor is the first one in its group")),de=new e("activeEditorIsLastInGroup",!1,t("activeEditorIsLastInGroup","Whether the active editor is the last one in its group")),le=new e("activeEditorIsPinned",!1,t("activeEditorIsPinned","Whether the active editor is pinned")),ce=new e("activeEditorIsReadonly",!1,t("activeEditorIsReadonly","Whether the active editor is read-only")),pe=new e("activeCompareEditorCanSwap",!1,t("activeCompareEditorCanSwap","Whether the active compare editor can swap sides")),he=new e("activeEditorCanToggleReadonly",!0,t("activeEditorCanToggleReadonly","Whether the active editor can toggle between being read-only or writeable")),ue=new e("activeEditorCanRevert",!1,t("activeEditorCanRevert","Whether the active editor can revert")),xe=new e("activeEditorCanSplitInGroup",!0),ye=new e("activeEditor",null,{type:"string",description:t("activeEditor","The identifier of the active editor")}),fe=new e("activeEditorAvailableEditorIds","",t("activeEditorAvailableEditorIds","The available editor identifiers that are usable for the active editor")),be=new e("textCompareEditorVisible",!1,t("textCompareEditorVisible","Whether a text compare editor is visible")),me=new e("textCompareEditorActive",!1,t("textCompareEditorActive","Whether a text compare editor is active")),ve=new e("sideBySideEditorActive",!1,t("sideBySideEditorActive","Whether a side by side editor is active")),we=new e("groupEditorsCount",0,t("groupEditorsCount","The number of opened editor groups")),ge=new e("activeEditorGroupEmpty",!1,t("activeEditorGroupEmpty","Whether the active editor group is empty")),Ee=new e("activeEditorGroupIndex",0,t("activeEditorGroupIndex","The index of the active editor group")),Ce=new e("activeEditorGroupLast",!1,t("activeEditorGroupLast","Whether the active editor group is the last group")),Ie=new e("activeEditorGroupLocked",!1,t("activeEditorGroupLocked","Whether the active editor group is locked")),W=new e("multipleEditorGroups",!1,t("multipleEditorGroups","Whether there are multiple editor groups opened")),Se=W.toNegated(),We=new e("multipleEditorsSelectedInGroup",!1,t("multipleEditorsSelectedInGroup","Whether multiple editors have been selected in an editor group")),_e=new e("twoEditorsSelectedInGroup",!1,t("twoEditorsSelectedInGroup","Whether exactly two editors have been selected in an editor group")),Fe=new e("SelectedEditorsInGroupFileOrUntitledResourceContextKey",!0,t("SelectedEditorsInGroupFileOrUntitledResourceContextKey","Whether all selected editors in a group have a file or untitled resource associated")),_=new e("editorPartMultipleEditorGroups",!1,t("editorPartMultipleEditorGroups","Whether there are multiple editor groups opened in an editor part")),Te=_.toNegated(),Ae=new e("editorPartMaximizedEditorGroup",!1,t("editorPartEditorGroupMaximized","Editor Part has a maximized group")),Ke=new e("isAuxiliaryEditorPart",!1,t("isAuxiliaryEditorPart","Editor Part is in an auxiliary window")),ke=new e("editorIsOpen",!1,t("editorIsOpen","Whether an editor is open")),Ge=new e("inZenMode",!1,t("inZenMode","Whether Zen mode is enabled")),Ve=new e("isCenteredLayout",!1,t("isMainEditorCenteredLayout","Whether centered layout is enabled for the main editor")),Pe=new e("splitEditorsVertically",!1,t("splitEditorsVertically","Whether editors split vertically")),Re=new e("mainEditorAreaVisible",!0,t("mainEditorAreaVisible","Whether the editor area in the main window is visible")),Le=new e("editorTabsVisible",!0,t("editorTabsVisible","Whether editor tabs are visible")),Be=new e("sideBarVisible",!1,t("sideBarVisible","Whether the sidebar is visible")),Me=new e("sideBarFocus",!1,t("sideBarFocus","Whether the sidebar has keyboard focus")),De=new e("activeViewlet","",t("activeViewlet","The identifier of the active viewlet")),Ne=new e("statusBarFocused",!1,t("statusBarFocused","Whether the status bar has keyboard focus")),Oe=new e("titleBarStyle",S?"native":"custom",t("titleBarStyle","Style of the window title bar")),Ue=new e("titleBarVisible",!1,t("titleBarVisible","Whether the title bar is visible")),ze=new e("bannerFocused",!1,t("bannerFocused","Whether the banner has keyboard focus")),Ze=new e("notificationFocus",!0,t("notificationFocus","Whether a notification has keyboard focus")),He=new e("notificationCenterVisible",!1,t("notificationCenterVisible","Whether the notifications center is visible")),je=new e("notificationToastsVisible",!1,t("notificationToastsVisible","Whether a notification toast is visible")),qe=new e("activeAuxiliary","",t("activeAuxiliary","The identifier of the active auxiliary panel")),$e=new e("auxiliaryBarFocus",!1,t("auxiliaryBarFocus","Whether the auxiliary bar has keyboard focus")),Je=new e("auxiliaryBarVisible",!1,t("auxiliaryBarVisible","Whether the auxiliary bar is visible")),Qe=new e("activePanel","",t("activePanel","The identifier of the active panel")),Xe=new e("panelFocus",!1,t("panelFocus","Whether the panel has keyboard focus")),Ye=new e("panelPosition","bottom",t("panelPosition","The position of the panel, always 'bottom'")),et=new e("panelAlignment","center",t("panelAlignment","The alignment of the panel, either 'center', 'left', 'right' or 'justify'")),tt=new e("panelVisible",!1,t("panelVisible","Whether the panel is visible")),ot=new e("panelMaximized",!1,t("panelMaximized","Whether the panel is maximized")),it=new e("focusedView","",t("focusedView","The identifier of the view that has keyboard focus"));function rt(d){return`view.${d}.visible`}let i=class{constructor(o,r,a,n){this._contextKeyService=o;this._fileService=r;this._languageService=a;this._modelService=n;this._schemeKey=i.Scheme.bindTo(this._contextKeyService),this._filenameKey=i.Filename.bindTo(this._contextKeyService),this._dirnameKey=i.Dirname.bindTo(this._contextKeyService),this._pathKey=i.Path.bindTo(this._contextKeyService),this._langIdKey=i.LangId.bindTo(this._contextKeyService),this._resourceKey=i.Resource.bindTo(this._contextKeyService),this._extensionKey=i.Extension.bindTo(this._contextKeyService),this._hasResource=i.HasResource.bindTo(this._contextKeyService),this._isFileSystemResource=i.IsFileSystemResource.bindTo(this._contextKeyService),this._disposables.add(r.onDidChangeFileSystemProviderRegistrations(()=>{const s=this.get();this._isFileSystemResource.set(!!(s&&r.hasProvider(s)))})),this._disposables.add(n.onModelAdded(s=>{p(s.uri,this.get())&&this._setLangId()})),this._disposables.add(n.onModelLanguageChanged(s=>{p(s.model.uri,this.get())&&this._setLangId()}))}static Scheme=new e("resourceScheme",void 0,{type:"string",description:t("resourceScheme","The scheme of the resource")});static Filename=new e("resourceFilename",void 0,{type:"string",description:t("resourceFilename","The file name of the resource")});static Dirname=new e("resourceDirname",void 0,{type:"string",description:t("resourceDirname","The folder name the resource is contained in")});static Path=new e("resourcePath",void 0,{type:"string",description:t("resourcePath","The full path of the resource")});static LangId=new e("resourceLangId",void 0,{type:"string",description:t("resourceLangId","The language identifier of the resource")});static Resource=new e("resource",void 0,{type:"URI",description:t("resource","The full value of the resource including scheme and path")});static Extension=new e("resourceExtname",void 0,{type:"string",description:t("resourceExtname","The extension name of the resource")});static HasResource=new e("resourceSet",void 0,{type:"boolean",description:t("resourceSet","Whether a resource is present or not")});static IsFileSystemResource=new e("isFileSystemResource",void 0,{type:"boolean",description:t("isFileSystemResource","Whether the resource is backed by a file system provider")});_disposables=new f;_value;_resourceKey;_schemeKey;_filenameKey;_dirnameKey;_pathKey;_langIdKey;_extensionKey;_hasResource;_isFileSystemResource;dispose(){this._disposables.dispose()}_setLangId(){const o=this.get();if(!o){this._langIdKey.set(null);return}const r=this._modelService.getModel(o)?.getLanguageId()??this._languageService.guessLanguageIdByFilepathOrFirstLine(o);this._langIdKey.set(r)}set(o){o=o??void 0,!p(this._value,o)&&(this._value=o,this._contextKeyService.bufferChangeEvents(()=>{this._resourceKey.set(o?o.toString():null),this._schemeKey.set(o?o.scheme:null),this._filenameKey.set(o?m(o):null),this._dirnameKey.set(o?this.uriToPath(v(o)):null),this._pathKey.set(o?this.uriToPath(o):null),this._setLangId(),this._extensionKey.set(o?w(o):null),this._hasResource.set(!!o),this._isFileSystemResource.set(o?this._fileService.hasProvider(o):!1)}))}uriToPath(o){return o.scheme===u.file?o.fsPath:o.path}reset(){this._value=void 0,this._contextKeyService.bufferChangeEvents(()=>{this._resourceKey.reset(),this._schemeKey.reset(),this._filenameKey.reset(),this._dirnameKey.reset(),this._pathKey.reset(),this._langIdKey.reset(),this._extensionKey.reset(),this._hasResource.reset(),this._isFileSystemResource.reset()})}get(){return this._value}};i=h([l(0,b),l(1,E),l(2,g),l(3,C)],i);function nt(d,o,r){if(!o){d.set("");return}const a=o.resource;if(a?.scheme===u.untitled&&o.editorId!==I.id)d.set("");else{const n=a?r.getEditors(a).map(s=>s.id):[];d.set(n.join(","))}}export{qe as ActiveAuxiliaryContext,pe as ActiveCompareEditorCanSwapContext,fe as ActiveEditorAvailableEditorIdsContext,ue as ActiveEditorCanRevertContext,xe as ActiveEditorCanSplitInGroupContext,he as ActiveEditorCanToggleReadonlyContext,ye as ActiveEditorContext,ne as ActiveEditorDirtyContext,ae as ActiveEditorFirstInGroupContext,ge as ActiveEditorGroupEmptyContext,Ee as ActiveEditorGroupIndexContext,Ce as ActiveEditorGroupLastContext,Ie as ActiveEditorGroupLockedContext,de as ActiveEditorLastInGroupContext,se as ActiveEditorPinnedContext,ce as ActiveEditorReadonlyContext,le as ActiveEditorStickyContext,Qe as ActivePanelContext,De as ActiveViewletContext,$e as AuxiliaryBarFocusContext,Je as AuxiliaryBarVisibleContext,ze as BannerFocused,Q as DirtyWorkingCopiesContext,we as EditorGroupEditorsCountContext,Ae as EditorPartMaximizedEditorGroupContext,_ as EditorPartMultipleEditorGroupsContext,Te as EditorPartSingleEditorGroupsContext,Le as EditorTabsVisibleContext,ke as EditorsVisibleContext,re as EmbedderIdentifierContext,J as EmptyWorkspaceSupportContext,$ as EnterMultiRootWorkspaceSupportContext,it as FocusedViewContext,ie as HasWebFileSystemAccess,Ge as InEditorZenModeContext,Ke as IsAuxiliaryEditorPartContext,oe as IsAuxiliaryWindowFocusedContext,Ve as IsMainEditorCenteredLayoutContext,te as IsMainWindowFullscreenContext,Re as MainEditorAreaVisibleContext,W as MultipleEditorGroupsContext,We as MultipleEditorsSelectedInGroupContext,Ze as NotificationFocusedContext,He as NotificationsCenterVisibleContext,je as NotificationsToastsVisibleContext,q as OpenFolderWorkspaceSupportContext,et as PanelAlignmentContext,Xe as PanelFocusContext,ot as PanelMaximizedContext,Ye as PanelPositionContext,tt as PanelVisibleContext,X as RemoteNameContext,i as ResourceContextKey,Fe as SelectedEditorsInGroupFileOrUntitledResourceContextKey,Be as SideBarVisibleContext,ve as SideBySideEditorActiveContext,Me as SidebarFocusContext,Se as SingleEditorGroupsContext,Pe as SplitEditorsVertically,Ne as StatusBarFocused,ee as TemporaryWorkspaceContext,me as TextCompareEditorActiveContext,be as TextCompareEditorVisibleContext,Oe as TitleBarStyleContext,Ue as TitleBarVisibleContext,_e as TwoEditorsSelectedInGroupContext,Y as VirtualWorkspaceContext,H as WorkbenchStateContext,j as WorkspaceFolderCountContext,nt as applyAvailableEditorIds,rt as getVisbileViewContextKey};
