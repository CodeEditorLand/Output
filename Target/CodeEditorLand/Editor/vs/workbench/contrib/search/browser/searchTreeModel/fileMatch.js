var R=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var p=(h,s,e,t)=>{for(var r=t>1?void 0:t?y(s,e):s,n=h.length-1,i;n>=0;n--)(i=h[n])&&(r=(t?i(s,e,r):i(r))||r);return t&&r&&R(s,e,r),r},d=(h,s)=>(e,t)=>s(e,t,h);import{RunOnceScheduler as D}from"../../../../../base/common/async.js";import{Lazy as F}from"../../../../../base/common/lazy.js";import{Disposable as b}from"../../../../../base/common/lifecycle.js";import{themeColorFromId as l}from"../../../../../base/common/themables.js";import"../../../../../base/common/uri.js";import{TrackedRangeStickiness as u,MinimapPosition as M}from"../../../../../editor/common/model.js";import{ModelDecorationOptions as _}from"../../../../../editor/common/model/textModel.js";import{IModelService as w}from"../../../../../editor/common/services/model.js";import"../../../../../platform/files/common/files.js";import{ILabelService as C}from"../../../../../platform/label/common/label.js";import{overviewRulerFindMatchForeground as m,minimapFindMatch as v}from"../../../../../platform/theme/common/colorRegistry.js";import{resultIsMatch as f,DEFAULT_MAX_SEARCH_RESULTS as S}from"../../../../services/search/common/search.js";import{editorMatchesToTextSearchResults as E,getTextSearchMatchWithModelContext as L}from"../../../../services/search/common/searchHelpers.js";import"../../../notebook/browser/contrib/find/findMatchDecorationModel.js";import{IReplaceService as A}from"../replace.js";import{FILE_MATCH_PREFIX as W}from"./searchTreeCommon.js";import{Emitter as g}from"../../../../../base/common/event.js";import{textSearchResultToMatches as I}from"./match.js";import{OverviewRulerLane as T}from"../../../../../editor/common/standalone/standaloneEnums.js";let o=class extends b{constructor(e,t,r,n,i,c,a,q,x){super();this._query=e;this._previewOptions=t;this._maxResults=r;this._parent=n;this.rawMatch=i;this._closestRoot=c;this.modelService=a;this.replaceService=q;this._resource=this.rawMatch.resource,this._textMatches=new Map,this._removedTextMatches=new Set,this._updateScheduler=new D(this.updateMatchesForModel.bind(this),250),this._name=new F(()=>x.getUriBasenameLabel(this.resource))}static _CURRENT_FIND_MATCH=_.register({description:"search-current-find-match",stickiness:u.NeverGrowsWhenTypingAtEdges,zIndex:13,className:"currentFindMatch",overviewRuler:{color:l(m),position:T.Center},minimap:{color:l(v),position:M.Inline}});static _FIND_MATCH=_.register({description:"search-find-match",stickiness:u.NeverGrowsWhenTypingAtEdges,className:"findMatch",overviewRuler:{color:l(m),position:T.Center},minimap:{color:l(v),position:M.Inline}});static getDecorationOption(e){return e?o._CURRENT_FIND_MATCH:o._FIND_MATCH}_findMatchDecorationModel;_onChange=this._register(new g);onChange=this._onChange.event;_onDispose=this._register(new g);onDispose=this._onDispose.event;_resource;_fileStat;_model=null;_modelListener=null;_textMatches;_removedTextMatches;_selectedMatch=null;_name;_updateScheduler;_modelDecorations=[];_context=new Map;get context(){return new Map(this._context)}get closestRoot(){return this._closestRoot}hasReadonlyMatches(){return this.matches().some(e=>e.isReadonly)}createMatches(){const e=this.modelService.getModel(this._resource);e?(this.bindModel(e),this.updateMatchesForModel()):this.rawMatch.results&&this.rawMatch.results.filter(f).forEach(t=>{I(t,this,!1).forEach(r=>this.add(r))})}bindModel(e){this._model=e,this._modelListener=this._model.onDidChangeContent(()=>{this._updateScheduler.schedule()}),this._model.onWillDispose(()=>this.onModelWillDispose()),this.updateHighlights()}onModelWillDispose(){this.updateMatchesForModel(),this.unbindModel()}unbindModel(){this._model&&(this._updateScheduler.cancel(),this._model.changeDecorations(e=>{this._modelDecorations=e.deltaDecorations(this._modelDecorations,[])}),this._model=null,this._modelListener.dispose())}updateMatchesForModel(){if(!this._model)return;this._textMatches=new Map;const e=this._query.isWordMatch&&this._query.wordSeparators?this._query.wordSeparators:null,t=this._model.findMatches(this._query.pattern,this._model.getFullModelRange(),!!this._query.isRegExp,!!this._query.isCaseSensitive,e,!1,this._maxResults??S);this.updateMatches(t,!0,this._model,!1)}async updatesMatchesForLineAfterReplace(e,t){if(!this._model)return;const r={startLineNumber:e,startColumn:this._model.getLineMinColumn(e),endLineNumber:e,endColumn:this._model.getLineMaxColumn(e)};Array.from(this._textMatches.values()).filter(a=>a.range().startLineNumber===e).forEach(a=>this._textMatches.delete(a.id()));const i=this._query.isWordMatch&&this._query.wordSeparators?this._query.wordSeparators:null,c=this._model.findMatches(this._query.pattern,r,!!this._query.isRegExp,!!this._query.isCaseSensitive,i,!1,this._maxResults??S);this.updateMatches(c,t,this._model,!1)}updateMatches(e,t,r,n){const i=E(e,r,this._previewOptions);i.forEach(c=>{I(c,this,n).forEach(a=>{this._removedTextMatches.has(a.id())||(this.add(a),this.isMatchSelected(a)&&(this._selectedMatch=a))})}),this.addContext(L(i,r,this.parent().parent().query)),this._onChange.fire({forceUpdateModel:t}),this.updateHighlights()}updateHighlights(){this._model&&this._model.changeDecorations(e=>{const t=this.parent().showHighlights?this.matches().map(r=>({range:r.range(),options:o.getDecorationOption(this.isMatchSelected(r))})):[];this._modelDecorations=e.deltaDecorations(this._modelDecorations,t)})}id(){return W+this.resource.toString()}parent(){return this._parent}get hasChildren(){return this._textMatches.size>0}matches(){return[...this._textMatches.values()]}textMatches(){return Array.from(this._textMatches.values())}remove(e){Array.isArray(e)||(e=[e]);for(const t of e)this.removeMatch(t),this._removedTextMatches.add(t.id());this._onChange.fire({didRemove:!0})}replaceQ=Promise.resolve();async replace(e){return this.replaceQ=this.replaceQ.finally(async()=>{await this.replaceService.replace(e),await this.updatesMatchesForLineAfterReplace(e.range().startLineNumber,!1)})}setSelectedMatch(e){e&&(!this._textMatches.has(e.id())||this.isMatchSelected(e))||(this._selectedMatch=e,this.updateHighlights())}getSelectedMatch(){return this._selectedMatch}isMatchSelected(e){return!!this._selectedMatch&&this._selectedMatch.id()===e.id()}count(){return this.matches().length}get resource(){return this._resource}name(){return this._name.value}addContext(e){return e?e.filter(r=>!f(r)).forEach(r=>this._context.set(r.lineNumber,r.text)):void 0}add(e,t){this._textMatches.set(e.id(),e),t&&this._onChange.fire({forceUpdateModel:!0})}removeMatch(e){this._textMatches.delete(e.id()),this.isMatchSelected(e)?(this.setSelectedMatch(null),this._findMatchDecorationModel?.clearCurrentFindMatchDecoration()):this.updateHighlights()}async resolveFileStat(e){this._fileStat=await e.stat(this.resource).catch(()=>{})}get fileStat(){return this._fileStat}set fileStat(e){this._fileStat=e}dispose(){this.setSelectedMatch(null),this.unbindModel(),this._onDispose.fire(),super.dispose()}hasOnlyReadOnlyMatches(){return this.matches().every(e=>e.isReadonly)}};o=p([d(6,w),d(7,A),d(8,C)],o);export{o as FileMatchImpl};
