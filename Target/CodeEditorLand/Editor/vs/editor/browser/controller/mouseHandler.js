import*as d from"../../../base/browser/dom.js";import{StandardWheelEvent as N}from"../../../base/browser/mouseEvent.js";import{Disposable as w}from"../../../base/common/lifecycle.js";import*as T from"../../../base/common/platform.js";import{HitTestContext as D,MouseTarget as m,MouseTargetFactory as S}from"./mouseTarget.js";import{MouseTargetType as h}from"../editorBrowser.js";import{ClientCoordinates as L,EditorMouseEvent as P,EditorMouseEventFactory as O,GlobalEditorPointerMoveMonitor as x,createEditorPagePosition as y,createCoordinatesRelativeToEditor as b,PageCoordinates as H}from"../editorDom.js";import"../view/viewController.js";import{EditorZoom as g}from"../../common/config/editorZoom.js";import{Position as _}from"../../common/core/position.js";import{Selection as I}from"../../common/core/selection.js";import"../view/renderingContext.js";import"../../common/viewModel/viewContext.js";import"../../common/viewEvents.js";import{ViewEventHandler as K}from"../../common/viewEventHandler.js";import{EditorOption as v}from"../../common/config/editorOptions.js";import{NavigationCommandRevealType as f}from"../coreCommands.js";import{MouseWheelClassifier as A}from"../../../base/browser/ui/scrollbar/scrollableElement.js";class pe extends K{_context;viewController;viewHelper;mouseTargetFactory;_mouseDownOperation;lastMouseLeaveTime;_height;_mouseLeaveMonitor=null;constructor(o,t,e){super(),this._context=o,this.viewController=t,this.viewHelper=e,this.mouseTargetFactory=new S(this._context,e),this._mouseDownOperation=this._register(new B(this._context,this.viewController,this.viewHelper,this.mouseTargetFactory,(n,a)=>this._createMouseTarget(n,a),n=>this._getMouseColumn(n))),this.lastMouseLeaveTime=-1,this._height=this._context.configuration.options.get(v.layoutInfo).height;const s=new O(this.viewHelper.viewDomNode);this._register(s.onContextMenu(this.viewHelper.viewDomNode,n=>this._onContextMenu(n,!0))),this._register(s.onMouseMove(this.viewHelper.viewDomNode,n=>{this._onMouseMove(n),this._mouseLeaveMonitor||(this._mouseLeaveMonitor=d.addDisposableListener(this.viewHelper.viewDomNode.ownerDocument,"mousemove",a=>{this.viewHelper.viewDomNode.contains(a.target)||this._onMouseLeave(new P(a,!1,this.viewHelper.viewDomNode))}))})),this._register(s.onMouseUp(this.viewHelper.viewDomNode,n=>this._onMouseUp(n))),this._register(s.onMouseLeave(this.viewHelper.viewDomNode,n=>this._onMouseLeave(n)));let i=0;this._register(s.onPointerDown(this.viewHelper.viewDomNode,(n,a)=>{i=a})),this._register(d.addDisposableListener(this.viewHelper.viewDomNode,d.EventType.POINTER_UP,n=>{this._mouseDownOperation.onPointerUp()})),this._register(s.onMouseDown(this.viewHelper.viewDomNode,n=>this._onMouseDown(n,i))),this._setupMouseWheelZoomListener(),this._context.addEventHandler(this)}_setupMouseWheelZoomListener(){const o=A.INSTANCE;let t=0,e=g.getZoomLevel(),s=!1,i=0;const n=r=>{if(this.viewController.emitMouseWheel(r),!this._context.configuration.options.get(v.mouseWheelZoom))return;const l=new N(r);if(o.acceptStandardWheelEvent(l),o.isPhysicalMouseWheel()){if(a(r)){const u=g.getZoomLevel(),p=l.deltaY>0?1:-1;g.setZoomLevel(u+p),l.preventDefault(),l.stopPropagation()}}else Date.now()-t>50&&(e=g.getZoomLevel(),s=a(r),i=0),t=Date.now(),i+=l.deltaY,s&&(g.setZoomLevel(e+i/5),l.preventDefault(),l.stopPropagation())};this._register(d.addDisposableListener(this.viewHelper.viewDomNode,d.EventType.MOUSE_WHEEL,n,{capture:!0,passive:!1}));function a(r){return T.isMacintosh?(r.metaKey||r.ctrlKey)&&!r.shiftKey&&!r.altKey:r.ctrlKey&&!r.metaKey&&!r.shiftKey&&!r.altKey}}dispose(){this._context.removeEventHandler(this),this._mouseLeaveMonitor&&(this._mouseLeaveMonitor.dispose(),this._mouseLeaveMonitor=null),super.dispose()}onConfigurationChanged(o){if(o.hasChanged(v.layoutInfo)){const t=this._context.configuration.options.get(v.layoutInfo).height;this._height!==t&&(this._height=t,this._mouseDownOperation.onHeightChanged())}return!1}onCursorStateChanged(o){return this._mouseDownOperation.onCursorStateChanged(o),!1}onFocusChanged(o){return!1}getTargetAtClientPoint(o,t){const s=new L(o,t).toPageCoordinates(d.getWindow(this.viewHelper.viewDomNode)),i=y(this.viewHelper.viewDomNode);if(s.y<i.y||s.y>i.y+i.height||s.x<i.x||s.x>i.x+i.width)return null;const n=b(this.viewHelper.viewDomNode,i,s);return this.mouseTargetFactory.createMouseTarget(this.viewHelper.getLastRenderData(),i,s,n,null)}_createMouseTarget(o,t){let e=o.target;if(!this.viewHelper.viewDomNode.contains(e)){const s=d.getShadowRoot(this.viewHelper.viewDomNode);s&&(e=s.elementsFromPoint(o.posx,o.posy).find(i=>this.viewHelper.viewDomNode.contains(i)))}return this.mouseTargetFactory.createMouseTarget(this.viewHelper.getLastRenderData(),o.editorPos,o.pos,o.relativePos,t?e:null)}_getMouseColumn(o){return this.mouseTargetFactory.getMouseColumn(o.relativePos)}_onContextMenu(o,t){this.viewController.emitContextMenu({event:o,target:this._createMouseTarget(o,t)})}_onMouseMove(o){this.mouseTargetFactory.mouseTargetIsWidget(o)||o.preventDefault(),!(this._mouseDownOperation.isActive()||o.timestamp<this.lastMouseLeaveTime)&&this.viewController.emitMouseMove({event:o,target:this._createMouseTarget(o,!0)})}_onMouseLeave(o){this._mouseLeaveMonitor&&(this._mouseLeaveMonitor.dispose(),this._mouseLeaveMonitor=null),this.lastMouseLeaveTime=new Date().getTime(),this.viewController.emitMouseLeave({event:o,target:null})}_onMouseUp(o){this.viewController.emitMouseUp({event:o,target:this._createMouseTarget(o,!0)})}_onMouseDown(o,t){const e=this._createMouseTarget(o,!0),s=e.type===h.CONTENT_TEXT||e.type===h.CONTENT_EMPTY,i=e.type===h.GUTTER_GLYPH_MARGIN||e.type===h.GUTTER_LINE_NUMBERS||e.type===h.GUTTER_LINE_DECORATIONS,n=e.type===h.GUTTER_LINE_NUMBERS,a=this._context.configuration.options.get(v.selectOnLineNumbers),r=e.type===h.CONTENT_VIEW_ZONE||e.type===h.GUTTER_VIEW_ZONE,l=e.type===h.CONTENT_WIDGET;let u=o.leftButton||o.middleButton;T.isMacintosh&&o.leftButton&&o.ctrlKey&&(u=!1);const p=()=>{o.preventDefault(),this.viewHelper.focusTextArea()};if(u&&(s||n&&a))p(),this._mouseDownOperation.start(e.type,o,t);else if(i)o.preventDefault();else if(r){const c=e.detail;u&&this.viewHelper.shouldSuppressMouseDownOnViewZone(c.viewZoneId)&&(p(),this._mouseDownOperation.start(e.type,o,t),o.preventDefault())}else l&&this.viewHelper.shouldSuppressMouseDownOnWidget(e.detail)&&(p(),o.preventDefault());this.viewController.emitMouseDown({event:o,target:e})}_onMouseWheel(o){this.viewController.emitMouseWheel(o)}}class B extends w{constructor(t,e,s,i,n,a){super();this._context=t;this._viewController=e;this._viewHelper=s;this._mouseTargetFactory=i;this._createMouseTarget=n,this._getMouseColumn=a,this._mouseMoveMonitor=this._register(new x(this._viewHelper.viewDomNode)),this._topBottomDragScrolling=this._register(new W(this._context,this._viewHelper,this._mouseTargetFactory,(r,l,u)=>this._dispatchMouse(r,l,u))),this._mouseState=new E,this._currentSelection=new I(1,1,1,1),this._isActive=!1,this._lastMouseEvent=null}_createMouseTarget;_getMouseColumn;_mouseMoveMonitor;_topBottomDragScrolling;_mouseState;_currentSelection;_isActive;_lastMouseEvent;dispose(){super.dispose()}isActive(){return this._isActive}_onMouseDownThenMove(t){this._lastMouseEvent=t,this._mouseState.setModifiers(t);const e=this._findMousePosition(t,!1);e&&(this._mouseState.isDragAndDrop?this._viewController.emitMouseDrag({event:t,target:e}):e.type===h.OUTSIDE_EDITOR&&(e.outsidePosition==="above"||e.outsidePosition==="below")?this._topBottomDragScrolling.start(e,t):(this._topBottomDragScrolling.stop(),this._dispatchMouse(e,!0,f.Minimal)))}start(t,e,s){this._lastMouseEvent=e,this._mouseState.setStartedOnLineNumbers(t===h.GUTTER_LINE_NUMBERS),this._mouseState.setStartButtons(e),this._mouseState.setModifiers(e);const i=this._findMousePosition(e,!0);if(!i||!i.position)return;this._mouseState.trySetCount(e.detail,i.position),e.detail=this._mouseState.count;const n=this._context.configuration.options;if(!n.get(v.readOnly)&&n.get(v.dragAndDrop)&&!n.get(v.columnSelection)&&!this._mouseState.altKey&&e.detail<2&&!this._isActive&&!this._currentSelection.isEmpty()&&i.type===h.CONTENT_TEXT&&i.position&&this._currentSelection.containsPosition(i.position)){this._mouseState.isDragAndDrop=!0,this._isActive=!0,this._mouseMoveMonitor.startMonitoring(this._viewHelper.viewLinesDomNode,s,e.buttons,a=>this._onMouseDownThenMove(a),a=>{const r=this._findMousePosition(this._lastMouseEvent,!1);d.isKeyboardEvent(a)?this._viewController.emitMouseDropCanceled():this._viewController.emitMouseDrop({event:this._lastMouseEvent,target:r?this._createMouseTarget(this._lastMouseEvent,!0):null}),this._stop()});return}this._mouseState.isDragAndDrop=!1,this._dispatchMouse(i,e.shiftKey,f.Minimal),this._isActive||(this._isActive=!0,this._mouseMoveMonitor.startMonitoring(this._viewHelper.viewLinesDomNode,s,e.buttons,a=>this._onMouseDownThenMove(a),()=>this._stop()))}_stop(){this._isActive=!1,this._topBottomDragScrolling.stop()}onHeightChanged(){this._mouseMoveMonitor.stopMonitoring()}onPointerUp(){this._mouseMoveMonitor.stopMonitoring()}onCursorStateChanged(t){this._currentSelection=t.selections[0]}_getPositionOutsideEditor(t){const e=t.editorPos,s=this._context.viewModel,i=this._context.viewLayout,n=this._getMouseColumn(t);if(t.posy<e.y){const r=e.y-t.posy,l=Math.max(i.getCurrentScrollTop()-r,0),u=D.getZoneAtCoord(this._context,l);if(u){const c=this._helpPositionJumpOverViewZone(u);if(c)return m.createOutsideEditor(n,c,"above",r)}const p=i.getLineNumberAtVerticalOffset(l);return m.createOutsideEditor(n,new _(p,1),"above",r)}if(t.posy>e.y+e.height){const r=t.posy-e.y-e.height,l=i.getCurrentScrollTop()+t.relativePos.y,u=D.getZoneAtCoord(this._context,l);if(u){const c=this._helpPositionJumpOverViewZone(u);if(c)return m.createOutsideEditor(n,c,"below",r)}const p=i.getLineNumberAtVerticalOffset(l);return m.createOutsideEditor(n,new _(p,s.getLineMaxColumn(p)),"below",r)}const a=i.getLineNumberAtVerticalOffset(i.getCurrentScrollTop()+t.relativePos.y);if(t.posx<e.x){const r=e.x-t.posx;return m.createOutsideEditor(n,new _(a,1),"left",r)}if(t.posx>e.x+e.width){const r=t.posx-e.x-e.width;return m.createOutsideEditor(n,new _(a,s.getLineMaxColumn(a)),"right",r)}return null}_findMousePosition(t,e){const s=this._getPositionOutsideEditor(t);if(s)return s;const i=this._createMouseTarget(t,e);if(!i.position)return null;if(i.type===h.CONTENT_VIEW_ZONE||i.type===h.GUTTER_VIEW_ZONE){const a=this._helpPositionJumpOverViewZone(i.detail);if(a)return m.createViewZone(i.type,i.element,i.mouseColumn,a,i.detail)}return i}_helpPositionJumpOverViewZone(t){const e=new _(this._currentSelection.selectionStartLineNumber,this._currentSelection.selectionStartColumn),s=t.positionBefore,i=t.positionAfter;return s&&i?s.isBefore(e)?s:i:null}_dispatchMouse(t,e,s){t.position&&this._viewController.dispatchMouse({position:t.position,mouseColumn:t.mouseColumn,startedOnLineNumbers:this._mouseState.startedOnLineNumbers,revealType:s,inSelectionMode:e,mouseDownCount:this._mouseState.count,altKey:this._mouseState.altKey,ctrlKey:this._mouseState.ctrlKey,metaKey:this._mouseState.metaKey,shiftKey:this._mouseState.shiftKey,leftButton:this._mouseState.leftButton,middleButton:this._mouseState.middleButton,onInjectedText:t.type===h.CONTENT_TEXT&&t.detail.injectedText!==null})}}class W extends w{constructor(t,e,s,i){super();this._context=t;this._viewHelper=e;this._mouseTargetFactory=s;this._dispatchMouse=i;this._operation=null}_operation;dispose(){super.dispose(),this.stop()}start(t,e){this._operation?this._operation.setPosition(t,e):this._operation=new V(this._context,this._viewHelper,this._mouseTargetFactory,this._dispatchMouse,t,e)}stop(){this._operation&&(this._operation.dispose(),this._operation=null)}}class V extends w{constructor(t,e,s,i,n,a){super();this._context=t;this._viewHelper=e;this._mouseTargetFactory=s;this._dispatchMouse=i;this._position=n,this._mouseEvent=a,this._lastTime=Date.now(),this._animationFrameDisposable=d.scheduleAtNextAnimationFrame(d.getWindow(a.browserEvent),()=>this._execute())}_position;_mouseEvent;_lastTime;_animationFrameDisposable;dispose(){this._animationFrameDisposable.dispose(),super.dispose()}setPosition(t,e){this._position=t,this._mouseEvent=e}_tick(){const t=Date.now(),e=t-this._lastTime;return this._lastTime=t,e}_getScrollSpeed(){const t=this._context.configuration.options.get(v.lineHeight),e=this._context.configuration.options.get(v.layoutInfo).height/t,s=this._position.outsideDistance/t;return s<=1.5?Math.max(30,e*(1+s)):s<=3?Math.max(60,e*(2+s)):Math.max(200,e*(7+s))}_execute(){const t=this._context.configuration.options.get(v.lineHeight),e=this._getScrollSpeed(),s=this._tick(),i=e*(s/1e3)*t,n=this._position.outsidePosition==="above"?-i:i;this._context.viewModel.viewLayout.deltaScrollNow(0,n),this._viewHelper.renderNow();const a=this._context.viewLayout.getLinesViewportData(),r=this._position.outsidePosition==="above"?a.startLineNumber:a.endLineNumber;let l;{const u=y(this._viewHelper.viewDomNode),p=this._context.configuration.options.get(v.layoutInfo).horizontalScrollbarHeight,c=new H(this._mouseEvent.pos.x,u.y+u.height-p-.1),C=b(this._viewHelper.viewDomNode,u,c);l=this._mouseTargetFactory.createMouseTarget(this._viewHelper.getLastRenderData(),u,c,C,null)}(!l.position||l.position.lineNumber!==r)&&(this._position.outsidePosition==="above"?l=m.createOutsideEditor(this._position.mouseColumn,new _(r,1),"above",this._position.outsideDistance):l=m.createOutsideEditor(this._position.mouseColumn,new _(r,this._context.viewModel.getLineMaxColumn(r)),"below",this._position.outsideDistance)),this._dispatchMouse(l,!0,f.None),this._animationFrameDisposable=d.scheduleAtNextAnimationFrame(d.getWindow(l.element),()=>this._execute())}}class E{static CLEAR_MOUSE_DOWN_COUNT_TIME=400;_altKey;get altKey(){return this._altKey}_ctrlKey;get ctrlKey(){return this._ctrlKey}_metaKey;get metaKey(){return this._metaKey}_shiftKey;get shiftKey(){return this._shiftKey}_leftButton;get leftButton(){return this._leftButton}_middleButton;get middleButton(){return this._middleButton}_startedOnLineNumbers;get startedOnLineNumbers(){return this._startedOnLineNumbers}_lastMouseDownPosition;_lastMouseDownPositionEqualCount;_lastMouseDownCount;_lastSetMouseDownCountTime;isDragAndDrop;constructor(){this._altKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._shiftKey=!1,this._leftButton=!1,this._middleButton=!1,this._startedOnLineNumbers=!1,this._lastMouseDownPosition=null,this._lastMouseDownPositionEqualCount=0,this._lastMouseDownCount=0,this._lastSetMouseDownCountTime=0,this.isDragAndDrop=!1}get count(){return this._lastMouseDownCount}setModifiers(o){this._altKey=o.altKey,this._ctrlKey=o.ctrlKey,this._metaKey=o.metaKey,this._shiftKey=o.shiftKey}setStartButtons(o){this._leftButton=o.leftButton,this._middleButton=o.middleButton}setStartedOnLineNumbers(o){this._startedOnLineNumbers=o}trySetCount(o,t){const e=new Date().getTime();e-this._lastSetMouseDownCountTime>E.CLEAR_MOUSE_DOWN_COUNT_TIME&&(o=1),this._lastSetMouseDownCountTime=e,o>this._lastMouseDownCount+1&&(o=this._lastMouseDownCount+1),this._lastMouseDownPosition&&this._lastMouseDownPosition.equals(t)?this._lastMouseDownPositionEqualCount++:this._lastMouseDownPositionEqualCount=1,this._lastMouseDownPosition=t,this._lastMouseDownCount=Math.min(o,this._lastMouseDownPositionEqualCount)}}export{pe as MouseHandler};
