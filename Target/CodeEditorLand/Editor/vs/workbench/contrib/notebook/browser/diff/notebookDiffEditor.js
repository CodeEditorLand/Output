var x=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var b=(v,l,e,t)=>{for(var i=t>1?void 0:t?N(l,e):l,o=v.length-1,n;o>=0;o--)(n=v[o])&&(i=(t?n(l,e,i):n(i))||i);return t&&i&&x(l,e,i),i},c=(v,l)=>(e,t)=>l(e,t,v);import*as R from"../../../../../nls.js";import*as f from"../../../../../base/browser/dom.js";import{findLastIdx as L}from"../../../../../base/common/arraysFind.js";import{IStorageService as B}from"../../../../../platform/storage/common/storage.js";import{ITelemetryService as H}from"../../../../../platform/telemetry/common/telemetry.js";import{IThemeService as P,registerThemingParticipant as U}from"../../../../../platform/theme/common/themeService.js";import{EditorPaneSelectionChangeReason as A,EditorPaneSelectionCompareResult as _}from"../../../../common/editor.js";import{getDefaultNotebookCreationOptions as $}from"../notebookEditorWidget.js";import"../../../../services/editor/common/editorGroupsService.js";import"../../common/notebookDiffEditorInput.js";import{CancellationTokenSource as C}from"../../../../../base/common/cancellation.js";import{SideBySideDiffElementViewModel as D}from"./diffElementViewModel.js";import{IInstantiationService as G}from"../../../../../platform/instantiation/common/instantiation.js";import{CellDiffPlaceholderRenderer as K,CellDiffSideBySideRenderer as q,CellDiffSingleSideRenderer as z,NotebookCellTextDiffListDelegate as j,NotebookDocumentMetadataDiffRenderer as Q,NotebookTextDiffList as Y}from"./notebookDiffList.js";import{IContextKeyService as Z}from"../../../../../platform/contextkey/common/contextkey.js";import{diffDiagonalFill as J,editorBackground as h,focusBorder as S,foreground as g}from"../../../../../platform/theme/common/colorRegistry.js";import{INotebookEditorWorkerService as X}from"../../common/services/notebookWorkerService.js";import{IConfigurationService as ee}from"../../../../../platform/configuration/common/configuration.js";import"../../../../../editor/common/config/editorOptions.js";import{BareFontInfo as ie}from"../../../../../editor/common/config/fontInfo.js";import{PixelRatio as te}from"../../../../../base/browser/pixelRatio.js";import"../notebookBrowser.js";import{DiffSide as s,DIFF_CELL_MARGIN as E}from"./notebookDiffEditorBrowser.js";import{Emitter as w,Event as oe}from"../../../../../base/common/event.js";import{DisposableStore as y,toDisposable as ne}from"../../../../../base/common/lifecycle.js";import{EditorPane as re}from"../../../../browser/parts/editor/editorPane.js";import{CellUri as M,NOTEBOOK_DIFF_EDITOR_ID as se,NotebookSetting as le}from"../../common/notebookCommon.js";import"../../../../../base/common/uri.js";import{SequencerByKey as ae}from"../../../../../base/common/async.js";import{generateUuid as k}from"../../../../../base/common/uuid.js";import"../../../../../base/browser/mouseEvent.js";import"./diffNestedCellViewModel.js";import{BackLayerWebView as O}from"../view/renderers/backLayerWebView.js";import{NotebookDiffEditorEventDispatcher as de,NotebookDiffLayoutChangedEvent as fe}from"./eventDispatcher.js";import{FontMeasurements as ce}from"../../../../../editor/browser/config/fontMeasurements.js";import{NotebookOptions as he}from"../notebookOptions.js";import"../notebookViewEvents.js";import"../../../../../platform/editor/common/editor.js";import{cellIndexesToRanges as ue,cellRangesToIndexes as W}from"../../common/notebookRange.js";import{NotebookDiffOverviewRuler as pe}from"./notebookDiffOverviewRuler.js";import{registerZIndex as ve,ZIndex as me}from"../../../../../platform/layout/browser/zIndexRegistry.js";import{NotebookDiffViewModel as ge}from"./notebookDiffViewModel.js";import{INotebookService as _e}from"../../common/notebookService.js";import{DiffEditorHeightCalculatorService as we}from"./editorHeightCalculator.js";import{IEditorService as Ie}from"../../../../services/editor/common/editorService.js";const be=f.$;class I{constructor(l){this.selections=l}compare(l){if(!(l instanceof I))return _.DIFFERENT;if(this.selections.length!==l.selections.length)return _.DIFFERENT;for(let e=0;e<this.selections.length;e++)if(this.selections[e]!==l.selections[e])return _.DIFFERENT;return _.IDENTICAL}restore(l){const e={cellSelections:ue(this.selections)};return Object.assign(e,l),e}}let u=class extends re{constructor(e,t,i,o,n,r,a,d,p,m){super(u.ID,e,a,i,d);this.instantiationService=t;this.contextKeyService=o;this.notebookEditorWorkerService=n;this.configurationService=r;this.notebookService=p;this.editorService=m;this.diffEditorCalcuator=this.instantiationService.createInstance(we,this.fontInfo.lineHeight),this._notebookOptions=t.createInstance(he,this.window,!1,void 0),this._register(this._notebookOptions),this._revealFirst=!0}static ENTIRE_DIFF_OVERVIEW_WIDTH=30;creationOptions=$();static ID=se;_rootElement;_listViewContainer;_overflowContainer;_overviewRulerContainer;_overviewRuler;_dimension=null;notebookDiffViewModel;_list;_modifiedWebview=null;_originalWebview=null;_webviewTransparentCover=null;_fontInfo;_onMouseUp=this._register(new w);onMouseUp=this._onMouseUp.event;_onDidScroll=this._register(new w);onDidScroll=this._onDidScroll.event;onDidChangeScroll=this._onDidScroll.event;_eventDispatcher;_scopeContextKeyService;_model=null;diffEditorCalcuator;_modifiedResourceDisposableStore=this._register(new y);get textModel(){return this._model?.modified.notebook}_revealFirst;_insetModifyQueueByOutputId=new ae;_onDidDynamicOutputRendered=this._register(new w);onDidDynamicOutputRendered=this._onDidDynamicOutputRendered.event;_notebookOptions;get notebookOptions(){return this._notebookOptions}_localStore=this._register(new y);_layoutCancellationTokenSource;_onDidChangeSelection=this._register(new w);onDidChangeSelection=this._onDidChangeSelection.event;_isDisposed=!1;get isDisposed(){return this._isDisposed}get fontInfo(){return this._fontInfo||(this._fontInfo=this.createFontInfo()),this._fontInfo}createFontInfo(){const e=this.configurationService.getValue("editor");return ce.readFontInfo(this.window,ie.createFromRawSettings(e,te.getInstance(this.window).value))}isOverviewRulerEnabled(){return this.configurationService.getValue(le.diffOverviewRuler)??!1}getSelection(){const e=this._list.getFocus();return new I(e)}toggleNotebookCellSelection(e){}updatePerformanceMetadata(e,t,i,o){}async focusNotebookCell(e,t){}async focusNextNotebookCell(e,t){}didFocusOutputInputChange(e){}getScrollTop(){return this._list?.scrollTop??0}getScrollHeight(){return this._list?.scrollHeight??0}getScrollPosition(){return{scrollTop:this.getScrollTop(),scrollLeft:this._list?.scrollLeft??0}}setScrollPosition(e){this._list&&(this._list.scrollTop=e.scrollTop,e.scrollLeft!==void 0&&(this._list.scrollLeft=e.scrollLeft))}delegateVerticalScrollbarPointerDown(e){this._list?.delegateVerticalScrollbarPointerDown(e)}updateOutputHeight(e,t,i,o){const n=e.diffElement,r=this.getCellByInfo(e),a=r.outputsViewModels.indexOf(t);if(n instanceof D){const d=M.parse(e.cellUri);if(!d)return;n.updateOutputHeight(d.notebook.toString()===this._model?.original.resource.toString()?s.Original:s.Modified,a,i)}else n.updateOutputHeight(n.type==="insert"?s.Modified:s.Original,a,i);o&&this._onDidDynamicOutputRendered.fire({cell:r,output:t})}setMarkupCellEditState(e,t){}didStartDragMarkupCell(e,t){}didDragMarkupCell(e,t){}didEndDragMarkupCell(e){}didDropMarkupCell(e){}didResizeOutput(e){}createEditor(e){this._rootElement=f.append(e,f.$(".notebook-text-diff-editor")),this._overflowContainer=document.createElement("div"),this._overflowContainer.classList.add("notebook-overflow-widget-container","monaco-editor"),f.append(e,this._overflowContainer);const t=[this.instantiationService.createInstance(z,this),this.instantiationService.createInstance(q,this),this.instantiationService.createInstance(K,this),this.instantiationService.createInstance(Q,this)];this._listViewContainer=f.append(this._rootElement,f.$(".notebook-diff-list-view")),this._list=this.instantiationService.createInstance(Y,"NotebookTextDiff",this._listViewContainer,this.instantiationService.createInstance(j,this.window),t,this.contextKeyService,{setRowLineHeight:!1,setRowHeight:!1,supportDynamicHeights:!0,horizontalScrolling:!1,keyboardSupport:!1,mouseSupport:!0,multipleSelectionSupport:!1,typeNavigationEnabled:!0,paddingBottom:0,styleController:i=>this._list,overrideStyles:{listBackground:h,listActiveSelectionBackground:h,listActiveSelectionForeground:g,listFocusAndSelectionBackground:h,listFocusAndSelectionForeground:g,listFocusBackground:h,listFocusForeground:g,listHoverForeground:g,listHoverBackground:h,listHoverOutline:S,listFocusOutline:S,listInactiveSelectionBackground:h,listInactiveSelectionForeground:g,listInactiveFocusBackground:h,listInactiveFocusOutline:h},accessibilityProvider:{getAriaLabel(){return null},getWidgetAriaLabel(){return R.localize("notebookTreeAriaLabel","Notebook Text Diff")}}}),this._register(this._list),this._register(this._list.onMouseUp(i=>{i.element&&(typeof i.index=="number"&&this._list.setFocus([i.index]),this._onMouseUp.fire({event:i.browserEvent,target:i.element}))})),this._register(this._list.onDidScroll(()=>{this._onDidScroll.fire()})),this._register(this._list.onDidChangeFocus(()=>this._onDidChangeSelection.fire({reason:A.USER}))),this._overviewRulerContainer=document.createElement("div"),this._overviewRulerContainer.classList.add("notebook-overview-ruler-container"),this._rootElement.appendChild(this._overviewRulerContainer),this._registerOverviewRuler(),this._webviewTransparentCover=f.append(this._list.rowsContainer,be(".webview-cover")),this._webviewTransparentCover.style.display="none",this._register(f.addStandardDisposableGenericMouseDownListener(this._overflowContainer,i=>{i.target.classList.contains("slider")&&this._webviewTransparentCover&&(this._webviewTransparentCover.style.display="block")})),this._register(f.addStandardDisposableGenericMouseUpListener(this._overflowContainer,()=>{this._webviewTransparentCover&&(this._webviewTransparentCover.style.display="none")})),this._register(this._list.onDidScroll(i=>{this._webviewTransparentCover.style.top=`${i.scrollTop}px`}))}_registerOverviewRuler(){this._overviewRuler=this._register(this.instantiationService.createInstance(pe,this,u.ENTIRE_DIFF_OVERVIEW_WIDTH,this._overviewRulerContainer))}_updateOutputsOffsetsInWebview(e,t,i,o,n){if(i.element.style.height=`${t}px`,i.insetMapping){const r=[],a=[];i.insetMapping.forEach((d,p)=>{const m=o(d.cellInfo.diffElement);if(!(!m||this._list.indexOf(d.cellInfo.diffElement)===void 0))if(m.outputsViewModels.indexOf(p)<0)a.push(p);else{const V=this._list.getCellViewScrollTop(d.cellInfo.diffElement),T=m.outputsViewModels.indexOf(p),F=d.cellInfo.diffElement.getOutputOffsetInCell(n,T);r.push({cell:m,output:p,cellTop:V,outputOffset:F,forceDisplay:!1})}}),i.removeInsets(a),r.length&&i.updateScrollTops(r,[])}}async setInput(e,t,i,o){await super.setInput(e,t,i,o);const n=await e.resolve();this._model!==n&&(this._detachModel(),this._attachModel(n)),this._model=n,this._model!==null&&(this._revealFirst=!0,this._modifiedResourceDisposableStore.clear(),this._layoutCancellationTokenSource=new C,this._modifiedResourceDisposableStore.add(oe.any(this._model.original.notebook.onDidChangeContent,this._model.modified.notebook.onDidChangeContent)(r=>{this._model!==null&&this.editorService.activeEditor!==e&&(this._layoutCancellationTokenSource?.dispose(),this._layoutCancellationTokenSource=new C,this.updateLayout(this._layoutCancellationTokenSource.token))})),await this._createOriginalWebview(k(),this._model.original.viewType,this._model.original.resource),this._originalWebview&&this._modifiedResourceDisposableStore.add(this._originalWebview),await this._createModifiedWebview(k(),this._model.modified.viewType,this._model.modified.resource),this._modifiedWebview&&this._modifiedResourceDisposableStore.add(this._modifiedWebview),await this.updateLayout(this._layoutCancellationTokenSource.token,t?.cellSelections?W(t.cellSelections):void 0))}_detachModel(){this._localStore.clear(),this._originalWebview?.dispose(),this._originalWebview?.element.remove(),this._originalWebview=null,this._modifiedWebview?.dispose(),this._modifiedWebview?.element.remove(),this._modifiedWebview=null,this.notebookDiffViewModel?.dispose(),this.notebookDiffViewModel=void 0,this._modifiedResourceDisposableStore.clear(),this._list.clear()}_attachModel(e){this._model=e,this._eventDispatcher=new de;const t=()=>{f.scheduleAtNextAnimationFrame(this.window,()=>{this._isDisposed||(this._modifiedWebview&&this._updateOutputsOffsetsInWebview(this._list.scrollTop,this._list.scrollHeight,this._modifiedWebview,o=>o.modified,s.Modified),this._originalWebview&&this._updateOutputsOffsetsInWebview(this._list.scrollTop,this._list.scrollHeight,this._originalWebview,o=>o.original,s.Original))})};this._localStore.add(this._list.onDidChangeContentHeight(()=>{t()})),this._localStore.add(this._eventDispatcher.onDidChangeCellLayout(()=>{t()}));const i=this.notebookDiffViewModel=this._register(new ge(this._model,this.notebookEditorWorkerService,this.configurationService,this._eventDispatcher,this.notebookService,this.diffEditorCalcuator,this.fontInfo,void 0));this._localStore.add(this.notebookDiffViewModel.onDidChangeItems(o=>{this._originalWebview?.removeInsets([...this._originalWebview?.insetMapping.keys()]),this._modifiedWebview?.removeInsets([...this._modifiedWebview?.insetMapping.keys()]),this._revealFirst&&typeof o.firstChangeIndex=="number"&&o.firstChangeIndex<this._list.length&&(this._revealFirst=!1,this._list.setFocus([o.firstChangeIndex]),this._list.reveal(o.firstChangeIndex,.3)),this._list.splice(o.start,o.deleteCount,o.elements),this.isOverviewRulerEnabled()&&this._overviewRuler.updateViewModels(i.items,this._eventDispatcher)}))}async _createModifiedWebview(e,t,i){this._modifiedWebview?.dispose(),this._modifiedWebview=this.instantiationService.createInstance(O,this,e,t,i,{...this._notebookOptions.computeDiffWebviewOptions(),fontFamily:this._generateFontFamily()},void 0),this._list.rowsContainer.insertAdjacentElement("afterbegin",this._modifiedWebview.element),this._modifiedWebview.createWebview(this.window),this._modifiedWebview.element.style.width="calc(50% - 16px)",this._modifiedWebview.element.style.left="calc(50%)"}_generateFontFamily(){return this.fontInfo.fontFamily??'"SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace'}async _createOriginalWebview(e,t,i){this._originalWebview?.dispose(),this._originalWebview=this.instantiationService.createInstance(O,this,e,t,i,{...this._notebookOptions.computeDiffWebviewOptions(),fontFamily:this._generateFontFamily()},void 0),this._list.rowsContainer.insertAdjacentElement("afterbegin",this._originalWebview.element),this._originalWebview.createWebview(this.window),this._originalWebview.element.style.width="calc(50% - 16px)",this._originalWebview.element.style.left="16px"}setOptions(e){const t=e?.cellSelections?W(e.cellSelections):void 0;t&&this._list.setFocus(t)}async updateLayout(e,t){!this._model||!this.notebookDiffViewModel||(await this.notebookDiffViewModel.computeDiff(e),!e.isCancellationRequested&&t&&this._list.setFocus(t))}scheduleOutputHeightAck(e,t,i){const o=e.diffElement;let n=s.Original;if(o instanceof D){const a=M.parse(e.cellUri);if(!a)return;n=a.notebook.toString()===this._model?.original.resource.toString()?s.Original:s.Modified}else n=o.type==="insert"?s.Modified:s.Original;const r=n===s.Modified?this._modifiedWebview:this._originalWebview;f.scheduleAtNextAnimationFrame(this.window,()=>{r?.ackHeight([{cellId:e.cellId,outputId:t,height:i}])},10)}pendingLayouts=new WeakMap;layoutNotebookCell(e,t){const i=(r,a)=>{this._list.updateElementHeight2(r,a)};this.pendingLayouts.has(e)&&this.pendingLayouts.get(e).dispose();let o;const n=f.scheduleAtNextAnimationFrame(this.window,()=>{this.pendingLayouts.delete(e),i(e,t),o()});return this.pendingLayouts.set(e,ne(()=>{n.dispose(),o()})),new Promise(r=>{o=r})}setScrollTop(e){this._list.scrollTop=e}triggerScroll(e){this._list.triggerScrollFromMouseWheelEvent(e)}previousChange(){if(!this.notebookDiffViewModel)return;let e=this._list.getFocus()[0];(isNaN(e)||e<0)&&(e=0);let t=e-1;const i=this.notebookDiffViewModel.items;for(;t>=0;){const o=i[t];if(o.type!=="unchanged"&&o.type!=="placeholder")break;t--}if(t>=0)this._list.setFocus([t]),this._list.reveal(t);else{const o=L(i,n=>n.type!=="unchanged"&&n.type!=="placeholder");o>=0&&(this._list.setFocus([o]),this._list.reveal(o))}}nextChange(){if(!this.notebookDiffViewModel)return;let e=this._list.getFocus()[0];(isNaN(e)||e<0)&&(e=0);let t=e+1;const i=this.notebookDiffViewModel.items;for(;t<i.length;){const o=i[t];if(o.type!=="unchanged"&&o.type!=="placeholder")break;t++}if(t<i.length)this._list.setFocus([t]),this._list.reveal(t);else{const o=i.findIndex(n=>n.type!=="unchanged"&&n.type!=="placeholder");o>=0&&(this._list.setFocus([o]),this._list.reveal(o))}}createOutput(e,t,i,o,n){this._insetModifyQueueByOutputId.queue(i.source.model.outputId+(n===s.Modified?"-right":"left"),async()=>{const r=n===s.Modified?this._modifiedWebview:this._originalWebview;if(r)if(r.insetMapping.has(i.source)){const a=this._list.getCellViewScrollTop(e),d=t.outputsViewModels.indexOf(i.source),p=e.getOutputOffsetInCell(n,d);r.updateScrollTops([{cell:t,output:i.source,cellTop:a,outputOffset:p,forceDisplay:!0}],[])}else{const a=this._list.getCellViewScrollTop(e);await r.createOutput({diffElement:e,cellHandle:t.handle,cellId:t.id,cellUri:t.uri},i,a,o())}})}updateMarkupCellHeight(){}getCellByInfo(e){return e.diffElement.getCellByUri(e.cellUri)}getCellById(e){throw new Error("Not implemented")}removeInset(e,t,i,o){this._insetModifyQueueByOutputId.queue(i.model.outputId+(o===s.Modified?"-right":"left"),async()=>{const n=o===s.Modified?this._modifiedWebview:this._originalWebview;n&&n.insetMapping.has(i)&&n.removeInsets([i])})}showInset(e,t,i,o){this._insetModifyQueueByOutputId.queue(i.model.outputId+(o===s.Modified?"-right":"left"),async()=>{const n=o===s.Modified?this._modifiedWebview:this._originalWebview;if(!n||!n.insetMapping.has(i))return;const r=this._list.getCellViewScrollTop(e),a=t.outputsViewModels.indexOf(i),d=e.getOutputOffsetInCell(o,a);n.updateScrollTops([{cell:t,output:i,cellTop:r,outputOffset:d,forceDisplay:!0}],[])})}hideInset(e,t,i){this._modifiedWebview?.hideInset(i),this._originalWebview?.hideInset(i)}getDomNode(){return this._rootElement}getOverflowContainerDomNode(){return this._overflowContainer}getControl(){return this}clearInput(){super.clearInput(),this._modifiedResourceDisposableStore.clear(),this._list?.splice(0,this._list?.length||0),this._model=null,this.notebookDiffViewModel?.dispose(),this.notebookDiffViewModel=void 0}deltaCellOutputContainerClassNames(e,t,i,o){e===s.Original?this._originalWebview?.deltaCellContainerClassNames(t,i,o):this._modifiedWebview?.deltaCellContainerClassNames(t,i,o)}getLayoutInfo(){if(!this._list)throw new Error("Editor is not initalized successfully");return{width:this._dimension.width,height:this._dimension.height,fontInfo:this.fontInfo,scrollHeight:this._list?.getScrollHeight()??0,stickyHeight:0}}layout(e,t){this._rootElement.classList.toggle("mid-width",e.width<1e3&&e.width>=600),this._rootElement.classList.toggle("narrow-width",e.width<600);const i=this.isOverviewRulerEnabled();this._dimension=e.with(e.width-(i?u.ENTIRE_DIFF_OVERVIEW_WIDTH:0)),this._listViewContainer.style.height=`${e.height}px`,this._listViewContainer.style.width=`${this._dimension.width}px`,this._list?.layout(this._dimension.height,this._dimension.width),this._modifiedWebview&&(this._modifiedWebview.element.style.width="calc(50% - 16px)",this._modifiedWebview.element.style.left="calc(50%)"),this._originalWebview&&(this._originalWebview.element.style.width="calc(50% - 16px)",this._originalWebview.element.style.left="16px"),this._webviewTransparentCover&&(this._webviewTransparentCover.style.height=`${this._dimension.height}px`,this._webviewTransparentCover.style.width=`${this._dimension.width}px`),i&&this._overviewRuler.layout(),this._eventDispatcher?.emit([new fe({width:!0,fontInfo:!0},this.getLayoutInfo())])}dispose(){this._isDisposed=!0,this._layoutCancellationTokenSource?.dispose(),this._detachModel(),super.dispose()}};u=b([c(1,G),c(2,P),c(3,Z),c(4,X),c(5,ee),c(6,H),c(7,B),c(8,_e),c(9,Ie)],u),ve(me.Base,10,"notebook-diff-view-viewport-slider"),U((v,l)=>{const e=v.getColor(J);l.addRule(`
	.notebook-text-diff-editor .diagonal-fill {
		background-image: linear-gradient(
			-45deg,
			${e} 12.5%,
			#0000 12.5%, #0000 50%,
			${e} 50%, ${e} 62.5%,
			#0000 62.5%, #0000 100%
		);
		background-size: 8px 8px;
	}
	`),l.addRule(`.notebook-text-diff-editor .cell-body { margin: ${E}px; }`),l.addRule(`.notebook-text-diff-editor .cell-placeholder-body { margin: ${E}px 0; }`)});export{u as NotebookTextDiffEditor};
