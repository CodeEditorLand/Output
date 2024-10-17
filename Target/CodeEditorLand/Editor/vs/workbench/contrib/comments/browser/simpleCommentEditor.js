var x=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var u=(s,t,i,o)=>{for(var e=o>1?void 0:o?O(t,i):t,r=s.length-1,a;r>=0;r--)(a=s[r])&&(e=(o?a(t,i,e):a(e))||e);return o&&e&&x(t,i,e),e},n=(s,t)=>(i,o)=>t(i,o,s);import{EditorOption as M}from"../../../../editor/common/config/editorOptions.js";import{EditorContributionInstantiation as m,EditorExtensionsRegistry as I}from"../../../../editor/browser/editorExtensions.js";import{ICodeEditorService as H}from"../../../../editor/browser/services/codeEditorService.js";import{CodeEditorWidget as W}from"../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";import{RawContextKey as F}from"../../../../platform/contextkey/common/contextkey.js";import{IInstantiationService as w}from"../../../../platform/instantiation/common/instantiation.js";import{ICommandService as A}from"../../../../platform/commands/common/commands.js";import{MenuPreventer as g}from"../../codeEditor/browser/menuPreventer.js";import{EditorDictation as f}from"../../codeEditor/browser/dictation/editorDictation.js";import{ContextMenuController as h}from"../../../../editor/contrib/contextmenu/browser/contextmenu.js";import{SuggestController as E}from"../../../../editor/contrib/suggest/browser/suggestController.js";import{SnippetController2 as C}from"../../../../editor/contrib/snippet/browser/snippetController2.js";import{TabCompletionController as b}from"../../snippets/browser/tabCompletion.js";import{IThemeService as R}from"../../../../platform/theme/common/themeService.js";import{INotificationService as N}from"../../../../platform/notification/common/notification.js";import{IAccessibilityService as B}from"../../../../platform/accessibility/common/accessibility.js";import"../common/commentThreadWidget.js";import{CommentContextKeys as V}from"../common/commentContextKeys.js";import{ILanguageConfigurationService as z}from"../../../../editor/common/languages/languageConfigurationRegistry.js";import{ILanguageFeaturesService as K}from"../../../../editor/common/services/languageFeatures.js";import"../../../../platform/configuration/common/configuration.js";import"../../../../editor/browser/editorBrowser.js";import{clamp as v}from"../../../../base/common/numbers.js";import{CopyPasteController as k}from"../../../../editor/contrib/dropOrPasteInto/browser/copyPasteController.js";import{CodeActionController as G}from"../../../../editor/contrib/codeAction/browser/codeActionController.js";import{DropIntoEditorController as P}from"../../../../editor/contrib/dropOrPasteInto/browser/dropIntoEditorController.js";import{InlineCompletionsController as q}from"../../../../editor/contrib/inlineCompletions/browser/controller/inlineCompletionsController.js";import{LinkDetector as X}from"../../../../editor/contrib/links/browser/links.js";import{MessageController as j}from"../../../../editor/contrib/message/browser/messageController.js";import{SelectionClipboardContributionID as J}from"../../codeEditor/browser/selectionClipboard.js";import{MenuId as Q}from"../../../../platform/actions/common/actions.js";import{ContentHoverController as U}from"../../../../editor/contrib/hover/browser/contentHoverController.js";import{GlyphHoverController as Y}from"../../../../editor/contrib/hover/browser/glyphHoverController.js";const Z=new F("commentEditorFocused",!1),c=5*18,$=25*18;let d=class extends W{_parentThread;_commentEditorFocused;_commentEditorEmpty;constructor(t,i,o,e,r,a,l,y,D,S,L,_){const T={contributions:[{id:g.ID,ctor:g,instantiation:m.BeforeFirstInteraction},{id:h.ID,ctor:h,instantiation:m.BeforeFirstInteraction},{id:E.ID,ctor:E,instantiation:m.Eager},{id:C.ID,ctor:C,instantiation:m.Lazy},{id:b.ID,ctor:b,instantiation:m.Eager},{id:f.ID,ctor:f,instantiation:m.Lazy},...I.getSomeEditorContributions([k.ID,P.ID,X.ID,j.ID,U.ID,Y.ID,J,q.ID,G.ID])],contextMenuId:Q.SimpleEditorContext};super(t,i,T,r,a,l,o,y,D,S,L,_),this._commentEditorFocused=Z.bindTo(o),this._commentEditorEmpty=V.commentIsEmpty.bindTo(o),this._commentEditorEmpty.set(!this.getModel()?.getValueLength()),this._parentThread=e,this._register(this.onDidFocusEditorWidget(p=>this._commentEditorFocused.set(!0))),this._register(this.onDidChangeModelContent(p=>this._commentEditorEmpty.set(!this.getModel()?.getValueLength()))),this._register(this.onDidBlurEditorWidget(p=>this._commentEditorFocused.reset()))}getParentThread(){return this._parentThread}_getActions(){return I.getEditorActions()}updateOptions(t){const i={...t,lineNumbers:"off"};super.updateOptions(i)}static getEditorOptions(t){return{wordWrap:"on",glyphMargin:!1,lineNumbers:"off",folding:!1,selectOnLineNumbers:!1,scrollbar:{vertical:"visible",verticalScrollbarSize:14,horizontal:"auto",useShadows:!0,verticalHasArrows:!1,horizontalHasArrows:!1,alwaysConsumeMouseWheel:!1},overviewRulerLanes:2,lineDecorationsWidth:0,scrollBeyondLastLine:!1,renderLineHighlight:"none",fixedOverflowWidgets:!0,acceptSuggestionOnEnter:"smart",minimap:{enabled:!1},dropIntoEditor:{enabled:!0},autoClosingBrackets:t.getValue("editor.autoClosingBrackets"),quickSuggestions:!1,accessibilitySupport:t.getValue("editor.accessibilitySupport"),fontFamily:t.getValue("editor.fontFamily")}}};d=u([n(4,w),n(5,H),n(6,A),n(7,R),n(8,N),n(9,B),n(10,z),n(11,K)],d);function Gt(s,t,i){const o=t.getLayoutInfo(),e=t.getOption(M.lineHeight),r=t._getViewModel()?.getLineCount()*e;if(r>o.height||r<o.height&&i>c){const a=Math.ceil((r-o.height)/e),l=o.height+e*a;return v(l,c,v(s.getLayoutInfo().height-90,c,$))}return i}export{$ as MAX_EDITOR_HEIGHT,c as MIN_EDITOR_HEIGHT,d as SimpleCommentEditor,Gt as calculateEditorHeight,Z as ctxCommentEditorFocused};
