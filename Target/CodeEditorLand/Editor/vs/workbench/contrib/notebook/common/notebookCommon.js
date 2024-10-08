import{VSBuffer as y}from"../../../../base/common/buffer.js";import"../../../../base/common/cancellation.js";import"../../../../base/common/diff/diff.js";import"../../../../base/common/event.js";import*as m from"../../../../base/common/glob.js";import"../../../../base/common/htmlContent.js";import{Iterable as v}from"../../../../base/common/iterator.js";import"../../../../base/common/lifecycle.js";import{Mimes as b}from"../../../../base/common/mime.js";import{Schemas as I}from"../../../../base/common/network.js";import{basename as x}from"../../../../base/common/path.js";import{isWindows as M}from"../../../../base/common/platform.js";import"../../../../base/common/sequence.js";import"../../../../base/common/themables.js";import"../../../../base/common/uri.js";import"../../../../editor/common/core/range.js";import"../../../../editor/common/diff/legacyLinesDiffComputer.js";import"../../../../editor/common/editorCommon.js";import"../../../../editor/common/languages.js";import"../../../../editor/common/model.js";import"../../../../platform/accessibility/common/accessibility.js";import{RawContextKey as h}from"../../../../platform/contextkey/common/contextkey.js";import"../../../../platform/extensions/common/extensions.js";import"../../../../platform/files/common/files.js";import"../../../../platform/undoRedo/common/undoRedo.js";import"../../../common/editor.js";import"./model/notebookTextModel.js";import"./notebookExecutionStateService.js";import"./notebookKernelService.js";import"./notebookRange.js";import"../../../services/editor/common/editorResolverService.js";import{generateMetadataUri as O,generate as D,parseMetadataUri as R,parse as N}from"../../../services/notebook/common/notebookDocumentService.js";import"../../../services/workingCopy/common/workingCopy.js";const rt="workbench.editor.notebook",lt="workbench.editor.notebookTextDiffEditor",it="workbench.editor.notebookMultiTextDiffEditor",dt="workbench.editor.interactive",st="workbench.editor.repl",ut="replNotebook.input.execute";var S=(e=>(e[e.Markup=1]="Markup",e[e.Code=2]="Code",e))(S||{});const T=["application/json","application/javascript","text/html","image/svg+xml",b.latex,b.markdown,"image/png","image/jpeg",b.text],pt=[b.latex,b.markdown,"application/json","text/html","image/svg+xml","image/png","image/jpeg",b.text],ct=new Map([["ms-toolsai.jupyter",new Set(["jupyter-notebook","interactive"])],["ms-toolsai.jupyter-renderers",new Set(["jupyter-notebook","interactive"])]]),mt="_notAvailable";var w=(e=>(e[e.Running=1]="Running",e[e.Idle=2]="Idle",e))(w||{}),P=(o=>(o[o.Unconfirmed=1]="Unconfirmed",o[o.Pending=2]="Pending",o[o.Executing=3]="Executing",o))(P||{}),U=(o=>(o[o.Unconfirmed=1]="Unconfirmed",o[o.Pending=2]="Pending",o[o.Executing=3]="Executing",o))(U||{}),L=(a=>(a[a.WithHardKernelDependency=0]="WithHardKernelDependency",a[a.WithOptionalKernelDependency=1]="WithOptionalKernelDependency",a[a.Pure=2]="Pure",a[a.Never=3]="Never",a))(L||{}),A=(o=>(o.Always="always",o.Never="never",o.Optional="optional",o))(A||{}),B=(i=>(i[i.ModelChange=1]="ModelChange",i[i.Move=2]="Move",i[i.ChangeCellLanguage=5]="ChangeCellLanguage",i[i.Initialize=6]="Initialize",i[i.ChangeCellMetadata=7]="ChangeCellMetadata",i[i.Output=8]="Output",i[i.OutputItem=9]="OutputItem",i[i.ChangeCellContent=10]="ChangeCellContent",i[i.ChangeDocumentMetadata=11]="ChangeDocumentMetadata",i[i.ChangeCellInternalMetadata=12]="ChangeCellInternalMetadata",i[i.ChangeCellMime=13]="ChangeCellMime",i[i.Unknown=100]="Unknown",i))(B||{}),_=(e=>(e[e.Handle=0]="Handle",e[e.Index=1]="Index",e))(_||{}),F=(r=>(r[r.Replace=1]="Replace",r[r.Output=2]="Output",r[r.Metadata=3]="Metadata",r[r.CellLanguage=4]="CellLanguage",r[r.DocumentMetadata=5]="DocumentMetadata",r[r.Move=6]="Move",r[r.OutputItems=7]="OutputItems",r[r.PartialMetadata=8]="PartialMetadata",r[r.PartialInternalMetadata=9]="PartialInternalMetadata",r))(F||{}),W;(o=>{o.scheme=I.vscodeNotebookMetadata;function n(a){return O(a)}o.generate=n;function e(a){return R(a)}o.parse=e})(W||={});var V;(u=>{u.scheme=I.vscodeNotebookCell;function n(s,r){return D(s,r)}u.generate=n;function e(s){return N(s)}u.parse=e;function o(s,r){return s.with({scheme:I.vscodeNotebookCellOutput,fragment:`op${r??""},${s.scheme!==I.file?s.scheme:""}`})}u.generateCellOutputUri=o;function a(s){if(s.scheme!==I.vscodeNotebookCellOutput)return;const r=/^op([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?\,(.*)$/i.exec(s.fragment);if(!r)return;const p=r[1]&&r[1]!==""?r[1]:void 0,c=r[2];return{outputId:p,notebook:s.with({scheme:c||I.file,fragment:null})}}u.parseCellOutputUri=a;function d(s,r,p){return u.generate(s,r).with({scheme:p})}u.generateCellPropertyUri=d;function l(s,r){if(s.scheme===r)return u.parse(s.with({scheme:u.scheme}))}u.parseCellPropertyUri=l})(V||={});const g=t=>M?t.replace(/\//g,"\\"):t;class bt{constructor(n=[],e=T){this.defaultOrder=e;this.order=[...new Set(n)].map(o=>({pattern:o,matches:m.parse(g(o))}))}order;sort(n){const e=new Map(v.map(n,a=>[a,g(a)]));let o=[];for(const{matches:a}of this.order)for(const[d,l]of e)if(a(l)){o.push(d),e.delete(d);break}return e.size&&(o=o.concat([...e.keys()].sort((a,d)=>this.defaultOrder.indexOf(a)-this.defaultOrder.indexOf(d)))),o}prioritize(n,e){const o=this.findIndex(n);if(o===-1){this.order.unshift({pattern:n,matches:m.parse(g(n))});return}const a=new Set(e.map(l=>this.findIndex(l,o)));a.delete(-1);const d=Array.from(a).sort();this.order.splice(o+1,0,...d.map(l=>this.order[l]));for(let l=d.length-1;l>=0;l--)this.order.splice(d[l],1)}toArray(){return this.order.map(n=>n.pattern)}findIndex(n,e=this.order.length){const o=g(n);for(let a=0;a<e;a++)if(this.order[a].matches(o))return a;return-1}}function It(t,n,e,o=(a,d)=>a===d){const a=[];function d(s,r,p){if(r===0&&p.length===0)return;const c=a[a.length-1];c&&c.start+c.deleteCount===s?(c.deleteCount+=r,c.toInsert.push(...p)):a.push({start:s,deleteCount:r,toInsert:p})}let l=0,u=0;for(;;){if(l===t.length){d(l,0,n.slice(u));break}if(u===n.length){d(l,t.length-l,[]);break}const s=t[l],r=n[u];if(o(s,r)){l+=1,u+=1;continue}e(r)?(d(l,1,[]),l+=1):(d(l,0,[r]),u+=1)}return a}const gt=new h("notebookEditorCursorAtBoundary","none"),ft=new h("notebookEditorCursorAtLineBoundary","none");var H=(e=>(e.default="default",e.option="option",e))(H||{}),K=(o=>(o.Cells="cells",o.Text="text",o.None="none",o))(K||{});function E(t){const n=t;return!!((typeof n.include=="string"||m.isRelativePattern(n.include))&&(typeof n.exclude=="string"||m.isRelativePattern(n.exclude)))}function Ct(t,n,e){if(Array.isArray(t.viewType)&&t.viewType.indexOf(n)>=0||t.viewType===n)return!0;if(t.filenamePattern){const o=E(t.filenamePattern)?t.filenamePattern.include:t.filenamePattern,a=E(t.filenamePattern)?t.filenamePattern.exclude:void 0;if(m.match(o,x(e.fsPath).toLowerCase()))return!(a&&m.match(a,x(e.fsPath).toLowerCase()))}return!1}const yt={displayOrder:"notebook.displayOrder",cellToolbarLocation:"notebook.cellToolbarLocation",cellToolbarVisibility:"notebook.cellToolbarVisibility",showCellStatusBar:"notebook.showCellStatusBar",textDiffEditorPreview:"notebook.diff.enablePreview",diffOverviewRuler:"notebook.diff.overviewRuler",experimentalInsertToolbarAlignment:"notebook.experimental.insertToolbarAlignment",compactView:"notebook.compactView",focusIndicator:"notebook.cellFocusIndicator",insertToolbarLocation:"notebook.insertToolbarLocation",globalToolbar:"notebook.globalToolbar",stickyScrollEnabled:"notebook.stickyScroll.enabled",stickyScrollMode:"notebook.stickyScroll.mode",undoRedoPerCell:"notebook.undoRedoPerCell",consolidatedOutputButton:"notebook.consolidatedOutputButton",showFoldingControls:"notebook.showFoldingControls",dragAndDropEnabled:"notebook.dragAndDropEnabled",cellEditorOptionsCustomizations:"notebook.editorOptionsCustomizations",consolidatedRunButton:"notebook.consolidatedRunButton",openGettingStarted:"notebook.experimental.openGettingStarted",globalToolbarShowLabel:"notebook.globalToolbarShowLabel",markupFontSize:"notebook.markup.fontSize",markdownLineHeight:"notebook.markdown.lineHeight",interactiveWindowCollapseCodeCells:"interactiveWindow.collapseCellInputCode",outputScrollingDeprecated:"notebook.experimental.outputScrolling",outputScrolling:"notebook.output.scrolling",textOutputLineLimit:"notebook.output.textLineLimit",LinkifyOutputFilePaths:"notebook.output.linkifyFilePaths",minimalErrorRendering:"notebook.output.minimalErrorRendering",formatOnSave:"notebook.formatOnSave.enabled",insertFinalNewline:"notebook.insertFinalNewline",defaultFormatter:"notebook.defaultFormatter",formatOnCellExecution:"notebook.formatOnCellExecution",codeActionsOnSave:"notebook.codeActionsOnSave",outputWordWrap:"notebook.output.wordWrap",outputLineHeightDeprecated:"notebook.outputLineHeight",outputLineHeight:"notebook.output.lineHeight",outputFontSizeDeprecated:"notebook.outputFontSize",outputFontSize:"notebook.output.fontSize",outputFontFamilyDeprecated:"notebook.outputFontFamily",outputFontFamily:"notebook.output.fontFamily",findFilters:"notebook.find.filters",logging:"notebook.logging",confirmDeleteRunningCell:"notebook.confirmDeleteRunningCell",remoteSaving:"notebook.experimental.remoteSave",gotoSymbolsAllSymbols:"notebook.gotoSymbols.showAllSymbols",outlineShowMarkdownHeadersOnly:"notebook.outline.showMarkdownHeadersOnly",outlineShowCodeCells:"notebook.outline.showCodeCells",outlineShowCodeCellSymbols:"notebook.outline.showCodeCellSymbols",breadcrumbsShowCodeCells:"notebook.breadcrumbs.showCodeCells",scrollToRevealCell:"notebook.scrolling.revealNextCellOnExecute",cellChat:"notebook.experimental.cellChat",cellGenerate:"notebook.experimental.generate",notebookVariablesView:"notebook.variablesView",InteractiveWindowPromptToSave:"interactiveWindow.promptToSaveOnClose",cellFailureDiagnostics:"notebook.cellFailureDiagnostics",outputBackupSizeLimit:"notebook.backup.sizeLimit",multiCursor:"notebook.multiCursor.enabled"};var z=(e=>(e[e.Left=1]="Left",e[e.Right=2]="Right",e))(z||{});class C{static _prefix="notebook/";static create(n,e){return`${C._prefix}${n}/${e??n}`}static parse(n){if(n.startsWith(C._prefix)){const e=n.substring(C._prefix.length).split("/");if(e.length===2)return{notebookType:e[0],viewType:e[1]}}}}function kt(t){return["application/vnd.code.notebook.stdout","application/vnd.code.notebook.stderr"].includes(t)}const j=new TextDecoder;function xt(t){const n=[];let e=!1;for(const l of t)(n.length===0||e)&&(n.push(l),e=!0);let o=G(n);const a=y.concat(n.map(l=>y.wrap(l))),d=J(a);return o=o||d.byteLength!==a.byteLength,{data:d,didCompression:o}}const f="\x1B[A",k=f.split("").map(t=>t.charCodeAt(0)),$=10;function G(t){let n=!1;return t.forEach((e,o)=>{if(o===0||e.length<f.length)return;const a=t[o-1],d=e.subarray(0,f.length);if(d[0]===k[0]&&d[1]===k[1]&&d[2]===k[2]){const l=a.lastIndexOf($);if(l===-1)return;n=!0,t[o-1]=a.subarray(0,l),t[o]=e.subarray(f.length)}}),n}function Y(t){let n=t;do t=n,n=t.replace(/[^\n]\x08/gm,"");while(n.length<t.length);return t}function X(t){for(t=t.replace(/\r+\n/gm,`
`);t.search(/\r[^$]/g)>-1;){const n=t.match(/^(.*)\r+/m)[1];let e=t.match(/\r+(.*)$/m)[1];e=e+n.slice(e.length,n.length),t=t.replace(/\r+.*$/m,"\r").replace(/^.*\r/m,e)}return t}const q=8,Q=13;function J(t){return!t.buffer.includes(q)&&!t.buffer.includes(Q)?t:y.fromString(X(Y(j.decode(t.buffer))))}export{pt as ACCESSIBLE_NOTEBOOK_DISPLAY_ORDER,F as CellEditType,S as CellKind,z as CellStatusbarAlignment,V as CellUri,ut as EXECUTE_REPL_COMMAND_ID,dt as INTERACTIVE_WINDOW_EDITOR_ID,f as MOVE_CURSOR_1_LINE_COMMAND,bt as MimeTypeDisplayOrder,lt as NOTEBOOK_DIFF_EDITOR_ID,T as NOTEBOOK_DISPLAY_ORDER,gt as NOTEBOOK_EDITOR_CURSOR_BOUNDARY,ft as NOTEBOOK_EDITOR_CURSOR_LINE_BOUNDARY,rt as NOTEBOOK_EDITOR_ID,it as NOTEBOOK_MULTI_DIFF_EDITOR_ID,P as NotebookCellExecutionState,B as NotebookCellsChangeType,H as NotebookEditorPriority,U as NotebookExecutionState,K as NotebookFindScopeType,W as NotebookMetadataUri,L as NotebookRendererMatch,w as NotebookRunState,yt as NotebookSetting,C as NotebookWorkingCopyTypeIdentifier,ct as RENDERER_EQUIVALENT_EXTENSIONS,mt as RENDERER_NOT_AVAILABLE,st as REPL_EDITOR_ID,A as RendererMessagingSpec,_ as SelectionStateType,xt as compressOutputItemStreams,It as diff,E as isDocumentExcludePattern,kt as isTextStreamMime,Ct as notebookDocumentFilterMatch};
