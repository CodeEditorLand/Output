import{onUnexpectedError as A}from"../../../base/common/errors.js";import*as M from"../../../base/common/strings.js";import{CursorCollection as V}from"./cursorCollection.js";import{CursorState as b,EditOperationResult as k,EditOperationType as I}from"../cursorCommon.js";import{CursorContext as D}from"./cursorContext.js";import{DeleteOperations as L}from"./cursorDeleteOperations.js";import{CursorChangeReason as g}from"../cursorEvents.js";import{CompositionOutcome as B,TypeOperations as _}from"./cursorTypeOperations.js";import{BaseTypeWithAutoClosingCommand as F}from"./cursorTypeEditOperations.js";import"../core/position.js";import{Range as f}from"../core/range.js";import{Selection as O,SelectionDirection as W}from"../core/selection.js";import*as T from"../editorCommon.js";import{TrackedRangeStickiness as S}from"../model.js";import{RawContentChangedType as j,ModelInjectedTextChangedEvent as H}from"../textModelEvents.js";import{VerticalRevealType as R,ViewCursorStateChangedEvent as G,ViewRevealRangeRequestEvent as N}from"../viewEvents.js";import{dispose as U,Disposable as q}from"../../../base/common/lifecycle.js";import"../viewModel.js";import{CursorStateChangedEvent as z}from"../viewModelEventDispatcher.js";class xe extends q{_model;_knownModelVersionId;_viewModel;_coordinatesConverter;context;_cursors;_hasFocus;_isHandling;_compositionState;_columnSelectData;_autoClosedActions;_prevEditOperationType;constructor(e,o,t,i){super(),this._model=e,this._knownModelVersionId=this._model.getVersionId(),this._viewModel=o,this._coordinatesConverter=t,this.context=new D(this._model,this._viewModel,this._coordinatesConverter,i),this._cursors=new V(this.context),this._hasFocus=!1,this._isHandling=!1,this._compositionState=null,this._columnSelectData=null,this._autoClosedActions=[],this._prevEditOperationType=I.Other}dispose(){this._cursors.dispose(),this._autoClosedActions=U(this._autoClosedActions),super.dispose()}updateConfiguration(e){this.context=new D(this._model,this._viewModel,this._coordinatesConverter,e),this._cursors.updateContext(this.context)}onLineMappingChanged(e){this._knownModelVersionId===this._model.getVersionId()&&this.setStates(e,"viewModel",g.NotSet,this.getCursorStates())}setHasFocus(e){this._hasFocus=e}_validateAutoClosedActions(){if(this._autoClosedActions.length>0){const e=this._cursors.getSelections();for(let o=0;o<this._autoClosedActions.length;o++){const t=this._autoClosedActions[o];t.isValid(e)||(t.dispose(),this._autoClosedActions.splice(o,1),o--)}}}getPrimaryCursorState(){return this._cursors.getPrimaryCursor()}getLastAddedCursorIndex(){return this._cursors.getLastAddedCursorIndex()}getCursorStates(){return this._cursors.getAll()}setStates(e,o,t,i){let n=!1;const s=this.context.cursorConfig.multiCursorLimit;i!==null&&i.length>s&&(i=i.slice(0,s),n=!0);const r=E.from(this._model,this);return this._cursors.setStates(i),this._cursors.normalize(),this._columnSelectData=null,this._validateAutoClosedActions(),this._emitStateChangedIfNecessary(e,o,t,r,n)}setCursorColumnSelectData(e){this._columnSelectData=e}revealAll(e,o,t,i,n,s){const r=this._cursors.getViewPositions();let c=null,l=null;r.length>1?l=this._cursors.getViewSelections():c=f.fromPositions(r[0],r[0]),e.emitViewEvent(new N(o,t,c,l,i,n,s))}revealPrimary(e,o,t,i,n,s){const c=[this._cursors.getPrimaryCursor().viewState.selection];e.emitViewEvent(new N(o,t,null,c,i,n,s))}saveState(){const e=[],o=this._cursors.getSelections();for(let t=0,i=o.length;t<i;t++){const n=o[t];e.push({inSelectionMode:!n.isEmpty(),selectionStart:{lineNumber:n.selectionStartLineNumber,column:n.selectionStartColumn},position:{lineNumber:n.positionLineNumber,column:n.positionColumn}})}return e}restoreState(e,o){const t=[];for(let i=0,n=o.length;i<n;i++){const s=o[i];let r=1,c=1;s.position&&s.position.lineNumber&&(r=s.position.lineNumber),s.position&&s.position.column&&(c=s.position.column);let l=r,u=c;s.selectionStart&&s.selectionStart.lineNumber&&(l=s.selectionStart.lineNumber),s.selectionStart&&s.selectionStart.column&&(u=s.selectionStart.column),t.push({selectionStartLineNumber:l,selectionStartColumn:u,positionLineNumber:r,positionColumn:c})}this.setStates(e,"restoreState",g.NotSet,b.fromModelSelections(t)),this.revealAll(e,"restoreState",!1,R.Simple,!0,T.ScrollType.Immediate)}onModelContentChanged(e,o){if(o instanceof H){if(this._isHandling)return;this._isHandling=!0;try{this.setStates(e,"modelChange",g.NotSet,this.getCursorStates())}finally{this._isHandling=!1}}else{const t=o.rawContentChangedEvent;if(this._knownModelVersionId=t.versionId,this._isHandling)return;const i=t.containsEvent(j.Flush);if(this._prevEditOperationType=I.Other,i)this._cursors.dispose(),this._cursors=new V(this.context),this._validateAutoClosedActions(),this._emitStateChangedIfNecessary(e,"model",g.ContentFlush,null,!1);else if(this._hasFocus&&t.resultingSelection&&t.resultingSelection.length>0){const n=b.fromModelSelections(t.resultingSelection);this.setStates(e,"modelChange",t.isUndoing?g.Undo:t.isRedoing?g.Redo:g.RecoverFromMarkers,n)&&this.revealAll(e,"modelChange",!1,R.Simple,!0,T.ScrollType.Smooth)}else{const n=this._cursors.readSelectionFromMarkers();this.setStates(e,"modelChange",g.RecoverFromMarkers,b.fromModelSelections(n))}}}getSelection(){return this._cursors.getPrimaryCursor().modelState.selection}getTopMostViewPosition(){return this._cursors.getTopMostViewPosition()}getBottomMostViewPosition(){return this._cursors.getBottomMostViewPosition()}getCursorColumnSelectData(){if(this._columnSelectData)return this._columnSelectData;const e=this._cursors.getPrimaryCursor(),o=e.viewState.selectionStart.getStartPosition(),t=e.viewState.position;return{isReal:!1,fromViewLineNumber:o.lineNumber,fromViewVisualColumn:this.context.cursorConfig.visibleColumnFromColumn(this._viewModel,o),toViewLineNumber:t.lineNumber,toViewVisualColumn:this.context.cursorConfig.visibleColumnFromColumn(this._viewModel,t)}}getSelections(){return this._cursors.getSelections()}getPosition(){return this._cursors.getPrimaryCursor().modelState.position}setSelections(e,o,t,i){this.setStates(e,o,i,b.fromModelSelections(t))}getPrevEditOperationType(){return this._prevEditOperationType}setPrevEditOperationType(e){this._prevEditOperationType=e}_pushAutoClosedAction(e,o){const t=[],i=[];for(let r=0,c=e.length;r<c;r++)t.push({range:e[r],options:{description:"auto-closed-character",inlineClassName:"auto-closed-character",stickiness:S.NeverGrowsWhenTypingAtEdges}}),i.push({range:o[r],options:{description:"auto-closed-enclosing",stickiness:S.NeverGrowsWhenTypingAtEdges}});const n=this._model.deltaDecorations([],t),s=this._model.deltaDecorations([],i);this._autoClosedActions.push(new P(this._model,n,s))}_executeEditOperation(e){if(!e)return;e.shouldPushStackElementBefore&&this._model.pushStackElement();const o=$.executeCommands(this._model,this._cursors.getSelections(),e.commands);if(o){this._interpretCommandResult(o);const t=[],i=[];for(let n=0;n<e.commands.length;n++){const s=e.commands[n];s instanceof F&&s.enclosingRange&&s.closeCharacterRange&&(t.push(s.closeCharacterRange),i.push(s.enclosingRange))}t.length>0&&this._pushAutoClosedAction(t,i),this._prevEditOperationType=e.type}e.shouldPushStackElementAfter&&this._model.pushStackElement()}_interpretCommandResult(e){(!e||e.length===0)&&(e=this._cursors.readSelectionFromMarkers()),this._columnSelectData=null,this._cursors.setSelections(e),this._cursors.normalize()}_emitStateChangedIfNecessary(e,o,t,i,n){const s=E.from(this._model,this);if(s.equals(i))return!1;const r=this._cursors.getSelections(),c=this._cursors.getViewSelections();if(e.emitViewEvent(new G(c,r,t)),!i||i.cursorState.length!==s.cursorState.length||s.cursorState.some((l,u)=>!l.modelState.equals(i.cursorState[u].modelState))){const l=i?i.cursorState.map(d=>d.modelState.selection):null,u=i?i.modelVersionId:0;e.emitOutgoingEvent(new z(l,r,u,s.modelVersionId,o||"keyboard",t,n))}return!0}_findAutoClosingPairs(e){if(!e.length)return null;const o=[];for(let t=0,i=e.length;t<i;t++){const n=e[t];if(!n.text||n.text.indexOf(`
`)>=0)return null;const s=n.text.match(/([)\]}>'"`])([^)\]}>'"`]*)$/);if(!s)return null;const r=s[1],c=this.context.cursorConfig.autoClosingPairs.autoClosingPairsCloseSingleChar.get(r);if(!c||c.length!==1)return null;const l=c[0].open,u=n.text.length-s[2].length-1,d=n.text.lastIndexOf(l,u-1);if(d===-1)return null;o.push([d,u])}return o}executeEdits(e,o,t,i){let n=null;o==="snippet"&&(n=this._findAutoClosingPairs(t)),n&&(t[0]._isTracked=!0);const s=[],r=[],c=this._model.pushEditOperations(this.getSelections(),t,l=>{if(n)for(let d=0,h=n.length;d<h;d++){const[a,p]=n[d],C=l[d],m=C.range.startLineNumber,y=C.range.startColumn-1+a,x=C.range.startColumn-1+p;s.push(new f(m,x+1,m,x+2)),r.push(new f(m,y+1,m,x+2))}const u=i(l);return u&&(this._isHandling=!0),u});c&&(this._isHandling=!1,this.setSelections(e,o,c,g.NotSet)),s.length>0&&this._pushAutoClosedAction(s,r)}_executeEdit(e,o,t,i=g.NotSet){if(this.context.cursorConfig.readOnly)return;const n=E.from(this._model,this);this._cursors.stopTrackingSelections(),this._isHandling=!0;try{this._cursors.ensureValidState(),e()}catch(s){A(s)}this._isHandling=!1,this._cursors.startTrackingSelections(),this._validateAutoClosedActions(),this._emitStateChangedIfNecessary(o,t,i,n,!1)&&this.revealAll(o,t,!1,R.Simple,!0,T.ScrollType.Smooth)}getAutoClosedCharacters(){return P.getAllAutoClosedCharacters(this._autoClosedActions)}startComposition(e){this._compositionState=new v(this._model,this.getSelections())}endComposition(e,o){const t=this._compositionState?this._compositionState.deduceOutcome(this._model,this.getSelections()):null;this._compositionState=null,this._executeEdit(()=>{o==="keyboard"&&this._executeEditOperation(_.compositionEndWithInterceptors(this._prevEditOperationType,this.context.cursorConfig,this._model,t,this.getSelections(),this.getAutoClosedCharacters()))},e,o)}type(e,o,t){this._executeEdit(()=>{if(t==="keyboard"){const i=o.length;let n=0;for(;n<i;){const s=M.nextCharLength(o,n),r=o.substr(n,s);this._executeEditOperation(_.typeWithInterceptors(!!this._compositionState,this._prevEditOperationType,this.context.cursorConfig,this._model,this.getSelections(),this.getAutoClosedCharacters(),r)),n+=s}}else this._executeEditOperation(_.typeWithoutInterceptors(this._prevEditOperationType,this.context.cursorConfig,this._model,this.getSelections(),o))},e,t)}compositionType(e,o,t,i,n,s){if(o.length===0&&t===0&&i===0){if(n!==0){const r=this.getSelections().map(c=>{const l=c.getPosition();return new O(l.lineNumber,l.column+n,l.lineNumber,l.column+n)});this.setSelections(e,s,r,g.NotSet)}return}this._executeEdit(()=>{this._executeEditOperation(_.compositionType(this._prevEditOperationType,this.context.cursorConfig,this._model,this.getSelections(),o,t,i,n))},e,s)}paste(e,o,t,i,n){this._executeEdit(()=>{this._executeEditOperation(_.paste(this.context.cursorConfig,this._model,this.getSelections(),o,t,i||[]))},e,n,g.Paste)}cut(e,o){this._executeEdit(()=>{this._executeEditOperation(L.cut(this.context.cursorConfig,this._model,this.getSelections()))},e,o)}executeCommand(e,o,t){this._executeEdit(()=>{this._cursors.killSecondaryCursors(),this._executeEditOperation(new k(I.Other,[o],{shouldPushStackElementBefore:!1,shouldPushStackElementAfter:!1}))},e,t)}executeCommands(e,o,t){this._executeEdit(()=>{this._executeEditOperation(new k(I.Other,o,{shouldPushStackElementBefore:!1,shouldPushStackElementAfter:!1}))},e,t)}}class E{constructor(e,o){this.modelVersionId=e;this.cursorState=o}static from(e,o){return new E(e.getVersionId(),o.getCursorStates())}equals(e){if(!e||this.modelVersionId!==e.modelVersionId||this.cursorState.length!==e.cursorState.length)return!1;for(let o=0,t=this.cursorState.length;o<t;o++)if(!this.cursorState[o].equals(e.cursorState[o]))return!1;return!0}}class P{static getAllAutoClosedCharacters(e){let o=[];for(const t of e)o=o.concat(t.getAutoClosedCharactersRanges());return o}_model;_autoClosedCharactersDecorations;_autoClosedEnclosingDecorations;constructor(e,o,t){this._model=e,this._autoClosedCharactersDecorations=o,this._autoClosedEnclosingDecorations=t}dispose(){this._autoClosedCharactersDecorations=this._model.deltaDecorations(this._autoClosedCharactersDecorations,[]),this._autoClosedEnclosingDecorations=this._model.deltaDecorations(this._autoClosedEnclosingDecorations,[])}getAutoClosedCharactersRanges(){const e=[];for(let o=0;o<this._autoClosedCharactersDecorations.length;o++){const t=this._model.getDecorationRange(this._autoClosedCharactersDecorations[o]);t&&e.push(t)}return e}isValid(e){const o=[];for(let t=0;t<this._autoClosedEnclosingDecorations.length;t++){const i=this._model.getDecorationRange(this._autoClosedEnclosingDecorations[t]);if(i&&(o.push(i),i.startLineNumber!==i.endLineNumber))return!1}o.sort(f.compareRangesUsingStarts),e.sort(f.compareRangesUsingStarts);for(let t=0;t<e.length;t++)if(t>=o.length||!o[t].strictContainsRange(e[t]))return!1;return!0}}class ${static executeCommands(e,o,t){const i={model:e,selectionsBefore:o,trackedRanges:[],trackedRangesDirection:[]},n=this._innerExecuteCommands(i,t);for(let s=0,r=i.trackedRanges.length;s<r;s++)i.model._setTrackedRange(i.trackedRanges[s],null,S.AlwaysGrowsWhenTypingAtEdges);return n}static _innerExecuteCommands(e,o){if(this._arrayIsEmpty(o))return null;const t=this._getEditOperations(e,o);if(t.operations.length===0)return null;const i=t.operations,n=this._getLoserCursorMap(i);if(n.hasOwnProperty("0"))return null;const s=[];for(let l=0,u=i.length;l<u;l++)n.hasOwnProperty(i[l].identifier.major.toString())||s.push(i[l]);t.hadTrackedEditOperation&&s.length>0&&(s[0]._isTracked=!0);let r=e.model.pushEditOperations(e.selectionsBefore,s,l=>{const u=[];for(let a=0;a<e.selectionsBefore.length;a++)u[a]=[];for(const a of l)a.identifier&&u[a.identifier.major].push(a);const d=(a,p)=>a.identifier.minor-p.identifier.minor,h=[];for(let a=0;a<e.selectionsBefore.length;a++)u[a].length>0?(u[a].sort(d),h[a]=o[a].computeCursorState(e.model,{getInverseEditOperations:()=>u[a],getTrackedSelection:p=>{const C=parseInt(p,10),m=e.model._getTrackedRange(e.trackedRanges[C]);return e.trackedRangesDirection[C]===W.LTR?new O(m.startLineNumber,m.startColumn,m.endLineNumber,m.endColumn):new O(m.endLineNumber,m.endColumn,m.startLineNumber,m.startColumn)}})):h[a]=e.selectionsBefore[a];return h});r||(r=e.selectionsBefore);const c=[];for(const l in n)n.hasOwnProperty(l)&&c.push(parseInt(l,10));c.sort((l,u)=>u-l);for(const l of c)r.splice(l,1);return r}static _arrayIsEmpty(e){for(let o=0,t=e.length;o<t;o++)if(e[o])return!1;return!0}static _getEditOperations(e,o){let t=[],i=!1;for(let n=0,s=o.length;n<s;n++){const r=o[n];if(r){const c=this._getEditOperationsFromCommand(e,n,r);t=t.concat(c.operations),i=i||c.hadTrackedEditOperation}}return{operations:t,hadTrackedEditOperation:i}}static _getEditOperationsFromCommand(e,o,t){const i=[];let n=0;const s=(d,h,a=!1)=>{f.isEmpty(d)&&h===""||i.push({identifier:{major:o,minor:n++},range:d,text:h,forceMoveMarkers:a,isAutoWhitespaceEdit:t.insertsAutoWhitespace})};let r=!1;const u={addEditOperation:s,addTrackedEditOperation:(d,h,a)=>{r=!0,s(d,h,a)},trackSelection:(d,h)=>{const a=O.liftSelection(d);let p;if(a.isEmpty())if(typeof h=="boolean")h?p=S.GrowsOnlyWhenTypingBefore:p=S.GrowsOnlyWhenTypingAfter;else{const y=e.model.getLineMaxColumn(a.startLineNumber);a.startColumn===y?p=S.GrowsOnlyWhenTypingBefore:p=S.GrowsOnlyWhenTypingAfter}else p=S.NeverGrowsWhenTypingAtEdges;const C=e.trackedRanges.length,m=e.model._setTrackedRange(null,a,p);return e.trackedRanges[C]=m,e.trackedRangesDirection[C]=a.getDirection(),C.toString()}};try{t.getEditOperations(e.model,u)}catch(d){return A(d),{operations:[],hadTrackedEditOperation:!1}}return{operations:i,hadTrackedEditOperation:r}}static _getLoserCursorMap(e){e=e.slice(0),e.sort((t,i)=>-f.compareRangesUsingEnds(t.range,i.range));const o={};for(let t=1;t<e.length;t++){const i=e[t-1],n=e[t];if(f.getStartPosition(i.range).isBefore(f.getEndPosition(n.range))){let s;i.identifier.major>n.identifier.major?s=i.identifier.major:s=n.identifier.major,o[s.toString()]=!0;for(let r=0;r<e.length;r++)e[r].identifier.major===s&&(e.splice(r,1),r<t&&t--,r--);t>0&&t--}}return o}}class J{constructor(e,o,t){this.text=e;this.startSelection=o;this.endSelection=t}}class v{_original;static _capture(e,o){const t=[];for(const i of o){if(i.startLineNumber!==i.endLineNumber)return null;t.push(new J(e.getLineContent(i.startLineNumber),i.startColumn-1,i.endColumn-1))}return t}constructor(e,o){this._original=v._capture(e,o)}deduceOutcome(e,o){if(!this._original)return null;const t=v._capture(e,o);if(!t||this._original.length!==t.length)return null;const i=[];for(let n=0,s=this._original.length;n<s;n++)i.push(v._deduceOutcome(this._original[n],t[n]));return i}static _deduceOutcome(e,o){const t=Math.min(e.startSelection,o.startSelection,M.commonPrefixLength(e.text,o.text)),i=Math.min(e.text.length-e.endSelection,o.text.length-o.endSelection,M.commonSuffixLength(e.text,o.text)),n=e.text.substring(t,e.text.length-i),s=o.text.substring(t,o.text.length-i);return new B(n,e.startSelection-t,e.endSelection-t,s,o.startSelection-t,o.endSelection-t)}}export{$ as CommandExecutor,xe as CursorsController};
