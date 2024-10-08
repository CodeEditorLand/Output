var D=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var k=(i,o,t,e)=>{for(var r=e>1?void 0:e?P(o,t):o,n=i.length-1,a;n>=0;n--)(a=i[n])&&(r=(e?a(o,t,r):a(r))||r);return e&&r&&D(o,t,r),r},p=(i,o)=>(t,e)=>o(t,e,i);import{SyncDescriptor as O}from"../../../../platform/instantiation/common/descriptors.js";import{Registry as h}from"../../../../platform/registry/common/platform.js";import{EditorPaneDescriptor as _}from"../../../browser/editor.js";import{EditorExtensions as R}from"../../../common/editor.js";import{parse as K}from"../../../../base/common/marshalling.js";import{assertType as A}from"../../../../base/common/types.js";import{URI as C}from"../../../../base/common/uri.js";import{IInstantiationService as w}from"../../../../platform/instantiation/common/instantiation.js";import"../../../common/editor/editorInput.js";import{CellEditType as z,CellKind as M,NotebookSetting as U,NotebookWorkingCopyTypeIdentifier as F,REPL_EDITOR_ID as H}from"../../notebook/common/notebookCommon.js";import"../../notebook/common/notebookEditorInput.js";import{isReplEditorControl as L,ReplEditor as B}from"./replEditor.js";import{ReplEditorInput as l}from"./replEditorInput.js";import{Disposable as N}from"../../../../base/common/lifecycle.js";import{registerWorkbenchContribution2 as x,WorkbenchPhase as T}from"../../../common/contributions.js";import{IExtensionService as V}from"../../../services/extensions/common/extensions.js";import"../../../services/workingCopy/common/workingCopy.js";import{IWorkingCopyEditorService as q}from"../../../services/workingCopy/common/workingCopyEditorService.js";import{isEqual as G}from"../../../../base/common/resources.js";import{INotebookService as W}from"../../notebook/common/notebookService.js";import{IEditorResolverService as j,RegisteredEditorPriority as J}from"../../../services/editor/common/editorResolverService.js";import{INotebookEditorModelResolverService as X}from"../../notebook/common/notebookEditorModelResolverService.js";import{isFalsyOrWhitespace as Q}from"../../../../base/common/strings.js";import{IBulkEditService as Y}from"../../../../editor/browser/services/bulkEditService.js";import"../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";import{PLAINTEXT_LANGUAGE_ID as Z}from"../../../../editor/common/languages/modesRegistry.js";import{ResourceNotebookCellEdit as $}from"../../bulkEdit/browser/bulkCellEdits.js";import{IInteractiveHistoryService as ee}from"../../interactive/browser/interactiveHistoryService.js";import"../../notebook/browser/notebookEditorWidget.js";import{INotebookEditorService as te}from"../../notebook/browser/services/notebookEditorService.js";import{IConfigurationService as oe}from"../../../../platform/configuration/common/configuration.js";import{ContextKeyExpr as u}from"../../../../platform/contextkey/common/contextkey.js";import{KeybindingsRegistry as re,KeybindingWeight as ie}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{getReplView as ne}from"../../debug/browser/repl.js";import{REPL_VIEW_ID as se}from"../../debug/common/debug.js";import{IViewsService as ae}from"../../../services/views/common/viewsService.js";import{KeyCode as I,KeyMod as v}from"../../../../base/common/keyCodes.js";import{Action2 as de,MenuId as ce,registerAction2 as pe}from"../../../../platform/actions/common/actions.js";import{localize2 as le}from"../../../../nls.js";import{NOTEBOOK_EDITOR_WIDGET_ACTION_WEIGHT as S}from"../../notebook/browser/controller/coreActions.js";import*as ue from"../../notebook/browser/notebookIcons.js";import{IEditorService as me}from"../../../services/editor/common/editorService.js";import"../../notebook/browser/notebookBrowser.js";import{InlineChatController as Ee}from"../../inlineChat/browser/inlineChatController.js";import{ReplEditorAccessibilityHelp as fe}from"./replEditorAccessibilityHelp.js";import{AccessibleViewRegistry as Ie}from"../../../../platform/accessibility/browser/accessibleViewRegistry.js";class ve{canSerialize(o){return o.typeId===l.ID}serialize(o){A(o instanceof l);const t={resource:o.resource,preferredResource:o.preferredResource,viewType:o.viewType,options:o.options,label:o.getName()};return JSON.stringify(t)}deserialize(o,t){const e=K(t);if(!e)return;const{resource:r,viewType:n}=e;return!e||!C.isUri(r)||typeof n!="string"?void 0:o.createInstance(l,r,e.label)}}h.as(R.EditorPane).registerEditorPane(_.create(B,H,"REPL Editor"),[new O(l)]),h.as(R.EditorFactory).registerEditorSerializer(l.ID,ve);let E=class extends N{constructor(t,e,r,n,a){super();this.notebookEditorModelResolverService=r;this.instantiationService=n;this.configurationService=a;e.registerEditor(" ",{id:"repl",label:"repl Editor",priority:J.option},{canSupportResource:c=>t.getNotebookTextModel(c)!==void 0,singlePerResource:!0},{createUntitledEditorInput:async({resource:c,options:s})=>{const d=this.configurationService.getValue(U.InteractiveWindowPromptToSave)!==!0,m=await this.notebookEditorModelResolverService.resolve({untitledResource:c},"jupyter-notebook",{scratchpad:d,viewType:"repl"});m.object.notebook.onWillDispose(()=>{m.dispose()});const g=s?.label??void 0;return{editor:this.instantiationService.createInstance(l,c,g),options:s}},createEditorInput:async({resource:c,options:s})=>{const d=s?.label??void 0;return{editor:this.instantiationService.createInstance(l,c,d),options:s}}})}static ID="workbench.contrib.replDocument"};E=k([p(0,W),p(1,j),p(2,X),p(3,w),p(4,oe)],E);let f=class extends N{constructor(t,e,r,n){super();this.instantiationService=t;this.workingCopyEditorService=e;this.extensionService=r;this.notebookService=n;this._installHandler()}static ID="workbench.contrib.replWorkingCopyEditorHandler";async handles(t){const e=this._getNotebookType(t);return e?!!e&&e.viewType==="repl"&&await this.notebookService.canResolve(e.notebookType):!1}isOpen(t,e){return this.handles(t)?e instanceof l&&G(t.resource,e.resource):!1}createEditor(t){return this.instantiationService.createInstance(l,t.resource,void 0)}async _installHandler(){await this.extensionService.whenInstalledExtensionsRegistered(),this._register(this.workingCopyEditorService.registerHandler(this))}_getNotebookType(t){return F.parse(t.typeId)}};f=k([p(0,w),p(1,q),p(2,V),p(3,W)],f),x(f.ID,f,T.BlockRestore),x(E.ID,E,T.BlockRestore),Ie.register(new fe),pe(class extends de{constructor(){super({id:"repl.execute",title:le("repl.execute","Execute REPL input"),category:"REPL",keybinding:[{when:u.equals("activeEditor","workbench.editor.repl"),primary:v.CtrlCmd|I.Enter,weight:S},{when:u.and(u.equals("activeEditor","workbench.editor.repl"),u.equals("config.interactiveWindow.executeWithShiftEnter",!0)),primary:v.Shift|I.Enter,weight:S},{when:u.and(u.equals("activeEditor","workbench.editor.repl"),u.equals("config.interactiveWindow.executeWithShiftEnter",!1)),primary:I.Enter,weight:S}],menu:[{id:ce.ReplInputExecute}],icon:ue.executeIcon,f1:!1,metadata:{description:"Execute the Contents of the Input Box",args:[{name:"resource",description:"Interactive resource Uri",isOptional:!0}]}})}async run(i,o){const t=i.get(me),e=i.get(Y),r=i.get(ee),n=i.get(te);let a;if(o){const c=C.revive(o),s=t.findEditors(c);for(const d of s)if(d.editor.typeId===l.ID){a=(await t.openEditor(d.editor,d.groupId))?.getControl();break}}else a=t.activeEditorPane?.getControl();L(a)&&ge(e,r,n,a)}});async function ge(i,o,t,e){if(e&&e.notebookEditor&&e.activeCodeEditor){const r=e.notebookEditor.textModel,n=e.activeCodeEditor.getModel(),c=e.notebookEditor.activeKernel?.supportedLanguages[0]??Z;if(r&&n){const s=r.length-1,d=n.getValue();if(Q(d))return;const m=Ee.get(e.activeCodeEditor);m&&m.acceptHunk(),o.replaceLast(r.uri,d),o.addToHistory(r.uri,""),n.setValue(""),r.cells[s].resetTextBuffer(n.getTextBuffer());const g=e.notebookEditor.notebookOptions.getDisplayOptions().interactiveWindowCollapseCodeCells==="fromEditor"?{inputCollapsed:!1,outputCollapsed:!1}:void 0;await i.apply([new $(r.uri,{editType:z.Replace,index:s,count:0,cells:[{cellKind:M.Code,mime:void 0,language:c,source:d,outputs:[],metadata:{},collapseState:g}]})]);const b={start:s,end:s+1};e.notebookEditor.revealCellRangeInView(b),await e.notebookEditor.executeNotebookCells(e.notebookEditor.getCellsInRange({start:s,end:s+1}));const y=t.getNotebookEditor(e.notebookEditor.getId());y&&(y.setSelections([b]),y.setFocus(b))}}}re.registerCommandAndKeybindingRule({id:"list.find.replInputFocus",weight:ie.WorkbenchContrib+1,when:u.equals("view",se),primary:v.CtrlCmd|v.Alt|I.KeyF,secondary:[I.F3],handler:i=>{ne(i.get(ae))?.openFind()}});export{E as ReplDocumentContribution};
