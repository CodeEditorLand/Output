var E=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var I=(n,a,e,t)=>{for(var i=t>1?void 0:t?W(a,e):a,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(t?o(a,e,i):o(i))||i);return t&&i&&E(a,e,i),i},g=(n,a)=>(e,t)=>a(e,t,n);import*as m from"../../../../../base/browser/dom.js";import"../xterm-private.js";import{IConfigurationService as k}from"../../../../../platform/configuration/common/configuration.js";import{Disposable as B,DisposableStore as N}from"../../../../../base/common/lifecycle.js";import"../../../../../editor/common/config/editorOptions.js";import{ITerminalLogService as F,TerminalSettingId as b}from"../../../../../platform/terminal/common/terminal.js";import"../../common/terminal.js";import{XtermTerminalConstants as P,ITerminalConfigurationService as H}from"../terminal.js";import{LogLevel as v}from"../../../../../platform/log/common/log.js";import{INotificationService as G}from"../../../../../platform/notification/common/notification.js";import{MarkNavigationAddon as U,ScrollPosition as z}from"./markNavigationAddon.js";import{localize as X}from"../../../../../nls.js";import{IThemeService as V}from"../../../../../platform/theme/common/themeService.js";import{PANEL_BACKGROUND as K}from"../../../../common/theme.js";import{TERMINAL_FOREGROUND_COLOR as q,TERMINAL_BACKGROUND_COLOR as $,TERMINAL_CURSOR_FOREGROUND_COLOR as Y,TERMINAL_CURSOR_BACKGROUND_COLOR as j,ansiColorIdentifiers as c,TERMINAL_SELECTION_BACKGROUND_COLOR as J,TERMINAL_FIND_MATCH_BACKGROUND_COLOR as Q,TERMINAL_FIND_MATCH_HIGHLIGHT_BACKGROUND_COLOR as Z,TERMINAL_FIND_MATCH_BORDER_COLOR as ee,TERMINAL_OVERVIEW_RULER_FIND_MATCH_FOREGROUND_COLOR as te,TERMINAL_FIND_MATCH_HIGHLIGHT_BORDER_COLOR as ie,TERMINAL_OVERVIEW_RULER_CURSOR_FOREGROUND_COLOR as re,TERMINAL_SELECTION_FOREGROUND_COLOR as oe,TERMINAL_INACTIVE_SELECTION_BACKGROUND_COLOR as ne,TERMINAL_OVERVIEW_RULER_BORDER_COLOR as ae}from"../../common/terminalColorRegistry.js";import{ShellIntegrationAddon as se}from"../../../../../platform/terminal/common/xterm/shellIntegrationAddon.js";import{IInstantiationService as le}from"../../../../../platform/instantiation/common/instantiation.js";import{DecorationAddon as de}from"./decorationAddon.js";import{TerminalCapability as y}from"../../../../../platform/terminal/common/capabilities/capabilities.js";import{Emitter as p}from"../../../../../base/common/event.js";import{ITelemetryService as ce}from"../../../../../platform/telemetry/common/telemetry.js";import{IContextKeyService as he}from"../../../../../platform/contextkey/common/contextkey.js";import{TerminalContextKeys as R}from"../../common/terminalContextKey.js";import{IClipboardService as ge}from"../../../../../platform/clipboard/common/clipboardService.js";import{debounce as ue}from"../../../../../base/common/decorators.js";import{MouseWheelClassifier as D}from"../../../../../base/browser/ui/scrollbar/scrollableElement.js";import{StandardWheelEvent as me}from"../../../../../base/browser/mouseEvent.js";import{ILayoutService as pe}from"../../../../../platform/layout/browser/layoutService.js";import{AccessibilitySignal as _e,IAccessibilitySignalService as fe}from"../../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";import{scrollbarSliderActiveBackground as ve,scrollbarSliderBackground as Se,scrollbarSliderHoverBackground as Ce}from"../../../../../platform/theme/common/colorRegistry.js";import{XtermAddonImporter as Ae}from"./xtermAddonImporter.js";var we=(a=>(a[a.SmoothScrollDuration=125]="SmoothScrollDuration",a))(we||{});function Ie(n,a){let e=a.getLine(n);if(!e)return{lineData:void 0,lineIndex:n};let t=e.translateToString(!0);for(;n>0&&e.isWrapped&&(e=a.getLine(--n),!!e);)t=e.translateToString(!1)+t;return{lineData:t,lineIndex:n}}let u=class extends B{constructor(e,t,i,r,o,s,h,_,f,S,T,be,O){super();this._configurationService=i;this._instantiationService=r;this._logService=o;this._notificationService=s;this._themeService=h;this._telemetryService=_;this._terminalConfigurationService=f;this._clipboardService=S;this._accessibilitySignalService=be;this._xtermAddonLoader=t.xtermAddonImpoter??new Ae,this._xtermColorProvider=t.xtermColorProvider,this._capabilities=t.capabilities;const C=this._terminalConfigurationService.getFont(m.getActiveWindow(),void 0,!0),l=this._terminalConfigurationService.config,M=this._configurationService.getValue("editor");this.raw=this._register(new e({allowProposedApi:!0,cols:t.cols,rows:t.rows,documentOverride:O.mainContainer.ownerDocument,altClickMovesCursor:l.altClickMovesCursor&&M.multiCursorModifier==="alt",scrollback:l.scrollback,theme:this.getXtermTheme(),drawBoldTextInBrightColors:l.drawBoldTextInBrightColors,fontFamily:C.fontFamily,fontWeight:l.fontWeight,fontWeightBold:l.fontWeightBold,fontSize:C.fontSize,letterSpacing:C.letterSpacing,lineHeight:C.lineHeight,logLevel:L(this._logService.getLevel()),logger:this._logService,minimumContrastRatio:l.minimumContrastRatio,tabStopWidth:l.tabStopWidth,cursorBlink:l.cursorBlinking,cursorStyle:A(l.cursorStyle),cursorInactiveStyle:A(l.cursorStyleInactive),cursorWidth:l.cursorWidth,macOptionIsMeta:l.macOptionIsMeta,macOptionClickForcesSelection:l.macOptionClickForcesSelection,rightClickSelectsWord:l.rightClickBehavior==="selectWord",fastScrollModifier:"alt",fastScrollSensitivity:l.fastScrollSensitivity,scrollSensitivity:l.mouseWheelScrollSensitivity,wordSeparator:l.wordSeparators,overviewRuler:{width:14,showTopBorder:!0},ignoreBracketedPasteMode:l.ignoreBracketedPasteMode,rescaleOverlappingGlyphs:l.rescaleOverlappingGlyphs,windowOptions:{getWinSizePixels:!0,getCellSizePixels:!0,getWinSizeChars:!0}})),this._updateSmoothScrolling(),this._core=this.raw._core,this._register(this._configurationService.onDidChangeConfiguration(async d=>{d.affectsConfiguration(b.GpuAcceleration)&&(u._suggestedRendererType=void 0),(d.affectsConfiguration("terminal.integrated")||d.affectsConfiguration("editor.fastScrollSensitivity")||d.affectsConfiguration("editor.mouseWheelScrollSensitivity")||d.affectsConfiguration("editor.multiCursorModifier"))&&this.updateConfig(),d.affectsConfiguration(b.UnicodeVersion)&&this._updateUnicodeVersion(),d.affectsConfiguration(b.ShellIntegrationDecorationsEnabled)&&this._updateTheme()})),this._register(this._themeService.onDidColorThemeChange(d=>this._updateTheme(d))),this._register(this._logService.onDidChangeLogLevel(d=>this.raw.options.logLevel=L(d))),this._register(this.raw.onSelectionChange(()=>{this._onDidChangeSelection.fire(),this.isFocused&&this._anyFocusedTerminalHasSelection.set(this.raw.hasSelection())})),this._updateUnicodeVersion(),this._markNavigationAddon=this._instantiationService.createInstance(U,t.capabilities),this.raw.loadAddon(this._markNavigationAddon),this._decorationAddon=this._instantiationService.createInstance(de,this._capabilities),this._register(this._decorationAddon.onDidRequestRunCommand(d=>this._onDidRequestRunCommand.fire(d))),this._register(this._decorationAddon.onDidRequestCopyAsHtml(d=>this._onDidRequestCopyAsHtml.fire(d))),this.raw.loadAddon(this._decorationAddon),this._shellIntegrationAddon=new se(t.shellIntegrationNonce??"",t.disableShellIntegrationReporting,this._telemetryService,this._logService),this.raw.loadAddon(this._shellIntegrationAddon),this._xtermAddonLoader.importAddon("clipboard").then(d=>{this._store.isDisposed||(this._clipboardAddon=this._instantiationService.createInstance(d,void 0,{async readText(w){return S.readText(w==="p"?"selection":"clipboard")},async writeText(w,x){return S.writeText(x,w==="p"?"selection":"clipboard")}}),this.raw.loadAddon(this._clipboardAddon))}),this._anyTerminalFocusContextKey=R.focusInAny.bindTo(T),this._anyFocusedTerminalHasSelection=R.textSelectedInFocused.bindTo(T)}raw;_core;_xtermAddonLoader;_xtermColorProvider;_capabilities;static _suggestedRendererType=void 0;static _checkedWebglCompatible=!1;_attached;_isPhysicalMouseWheel=D.INSTANCE.isPhysicalMouseWheel();_markNavigationAddon;_shellIntegrationAddon;_decorationAddon;_clipboardAddon;_searchAddon;_unicode11Addon;_webglAddon;_serializeAddon;_imageAddon;_attachedDisposables=this._register(new N);_anyTerminalFocusContextKey;_anyFocusedTerminalHasSelection;_lastFindResult;get findResult(){return this._lastFindResult}get isStdinDisabled(){return!!this.raw.options.disableStdin}get isGpuAccelerated(){return!!this._webglAddon}_onDidRequestRunCommand=this._register(new p);onDidRequestRunCommand=this._onDidRequestRunCommand.event;_onDidRequestCopyAsHtml=this._register(new p);onDidRequestCopyAsHtml=this._onDidRequestCopyAsHtml.event;_onDidRequestRefreshDimensions=this._register(new p);onDidRequestRefreshDimensions=this._onDidRequestRefreshDimensions.event;_onDidChangeFindResults=this._register(new p);onDidChangeFindResults=this._onDidChangeFindResults.event;_onDidChangeSelection=this._register(new p);onDidChangeSelection=this._onDidChangeSelection.event;_onDidChangeFocus=this._register(new p);onDidChangeFocus=this._onDidChangeFocus.event;_onDidDispose=this._register(new p);onDidDispose=this._onDidDispose.event;get markTracker(){return this._markNavigationAddon}get shellIntegration(){return this._shellIntegrationAddon}get textureAtlas(){const e=this._webglAddon?.textureAtlas;if(e)return createImageBitmap(e)}get isFocused(){return this.raw.element?m.isAncestorOfActiveElement(this.raw.element):!1}*getBufferReverseIterator(){for(let e=this.raw.buffer.active.length;e>=0;e--){const{lineData:t,lineIndex:i}=Ie(e,this.raw.buffer.active);t&&(e=i,yield t)}}async getContentsAsHtml(){if(!this._serializeAddon){const e=await this._xtermAddonLoader.importAddon("serialize");this._serializeAddon=new e,this.raw.loadAddon(this._serializeAddon)}return this._serializeAddon.serializeAsHTML()}async getSelectionAsHtml(e){if(!this._serializeAddon){const i=await this._xtermAddonLoader.importAddon("serialize");this._serializeAddon=new i,this.raw.loadAddon(this._serializeAddon)}if(e){const i=e.getOutput()?.length,r=e.marker?.line;if(!i||!r)throw new Error(`No row ${r} or output length ${i} for command ${e}`);this.raw.select(0,r+1,i-Math.floor(i/this.raw.cols))}const t=this._serializeAddon.serializeAsHTML({onlySelection:!0});return e&&this.raw.clearSelection(),t}attachToElement(e,t){const i={enableGpu:!0,...t};if(this._attached||this.raw.open(e),i.enableGpu&&this._shouldLoadWebgl()&&this._enableWebglRenderer(),!this.raw.element||!this.raw.textarea)throw new Error("xterm elements not set after open");const r=this._attachedDisposables;return r.clear(),r.add(m.addDisposableListener(this.raw.textarea,"focus",()=>this._setFocused(!0))),r.add(m.addDisposableListener(this.raw.textarea,"blur",()=>this._setFocused(!1))),r.add(m.addDisposableListener(this.raw.textarea,"focusout",()=>this._setFocused(!1))),r.add(m.addDisposableListener(this.raw.element,m.EventType.MOUSE_WHEEL,o=>{const s=D.INSTANCE;s.acceptStandardWheelEvent(new me(o));const h=s.isPhysicalMouseWheel();h!==this._isPhysicalMouseWheel&&(this._isPhysicalMouseWheel=h,this._updateSmoothScrolling())},{passive:!0})),this._attached={container:e,options:i},this._attached?.container.querySelector(".xterm-screen")}_setFocused(e){this._onDidChangeFocus.fire(e),this._anyTerminalFocusContextKey.set(e),this._anyFocusedTerminalHasSelection.set(e&&this.raw.hasSelection())}write(e,t){this.raw.write(e,t)}resize(e,t){this.raw.resize(e,t)}updateConfig(){const e=this._terminalConfigurationService.config;this.raw.options.altClickMovesCursor=e.altClickMovesCursor,this._setCursorBlink(e.cursorBlinking),this._setCursorStyle(e.cursorStyle),this._setCursorStyleInactive(e.cursorStyleInactive),this._setCursorWidth(e.cursorWidth),this.raw.options.scrollback=e.scrollback,this.raw.options.drawBoldTextInBrightColors=e.drawBoldTextInBrightColors,this.raw.options.minimumContrastRatio=e.minimumContrastRatio,this.raw.options.tabStopWidth=e.tabStopWidth,this.raw.options.fastScrollSensitivity=e.fastScrollSensitivity,this.raw.options.scrollSensitivity=e.mouseWheelScrollSensitivity,this.raw.options.macOptionIsMeta=e.macOptionIsMeta;const t=this._configurationService.getValue("editor");this.raw.options.altClickMovesCursor=e.altClickMovesCursor&&t.multiCursorModifier==="alt",this.raw.options.macOptionClickForcesSelection=e.macOptionClickForcesSelection,this.raw.options.rightClickSelectsWord=e.rightClickBehavior==="selectWord",this.raw.options.wordSeparator=e.wordSeparators,this.raw.options.customGlyphs=e.customGlyphs,this.raw.options.ignoreBracketedPasteMode=e.ignoreBracketedPasteMode,this.raw.options.rescaleOverlappingGlyphs=e.rescaleOverlappingGlyphs,this.raw.options.overviewRuler={width:14,showTopBorder:!0},this._updateSmoothScrolling(),this._attached?.options.enableGpu&&(this._shouldLoadWebgl()?this._enableWebglRenderer():this._disposeOfWebglRenderer())}_updateSmoothScrolling(){this.raw.options.smoothScrollDuration=this._terminalConfigurationService.config.smoothScrolling&&this._isPhysicalMouseWheel?125:0}_shouldLoadWebgl(){return this._terminalConfigurationService.config.gpuAcceleration==="auto"&&u._suggestedRendererType===void 0||this._terminalConfigurationService.config.gpuAcceleration==="on"}forceRedraw(){this.raw.clearTextureAtlas()}clearDecorations(){this._decorationAddon?.clearDecorations()}forceRefresh(){this._core.viewport?._innerRefresh()}async findNext(e,t){return this._updateFindColors(t),(await this._getSearchAddon()).findNext(e,t)}async findPrevious(e,t){return this._updateFindColors(t),(await this._getSearchAddon()).findPrevious(e,t)}_updateFindColors(e){const t=this._themeService.getColorTheme(),i=t.getColor($)||t.getColor(K),r=t.getColor(Q),o=t.getColor(ee),s=t.getColor(re),h=t.getColor(Z),_=t.getColor(ie),f=t.getColor(te);e.decorations={activeMatchBackground:r?.toString(),activeMatchBorder:o?.toString()||"transparent",activeMatchColorOverviewRuler:s?.toString()||"transparent",matchBackground:i?h?.blend(i).toString():void 0,matchBorder:_?.toString()||"transparent",matchOverviewRuler:f?.toString()||"transparent"}}_searchAddonPromise;_getSearchAddon(){return this._searchAddonPromise||(this._searchAddonPromise=this._xtermAddonLoader.importAddon("search").then(e=>this._store.isDisposed?Promise.reject("Could not create search addon, terminal is disposed"):(this._searchAddon=new e({highlightLimit:P.SearchHighlightLimit}),this.raw.loadAddon(this._searchAddon),this._searchAddon.onDidChangeResults(t=>{this._lastFindResult=t,this._onDidChangeFindResults.fire(t)}),this._searchAddon))),this._searchAddonPromise}clearSearchDecorations(){this._searchAddon?.clearDecorations()}clearActiveSearchDecoration(){this._searchAddon?.clearActiveDecoration()}getFont(){return this._terminalConfigurationService.getFont(m.getWindow(this.raw.element),this._core)}getLongestViewportWrappedLineLength(){let e=0;for(let t=this.raw.buffer.active.length-1;t>=this.raw.buffer.active.viewportY;t--){const i=this._getWrappedLineCount(t,this.raw.buffer.active);e=Math.max(e,i.lineCount*this.raw.cols-i.endSpaces||0),t=i.currentIndex}return e}_getWrappedLineCount(e,t){let i=t.getLine(e);if(!i)throw new Error("Could not get line");let r=e,o=0;for(let s=Math.min(i.length,this.raw.cols)-1;s>=0&&!i?.getCell(s)?.getChars();s--)o++;for(;i?.isWrapped&&r>0;)r--,i=t.getLine(r);return{lineCount:e-r+1,currentIndex:r,endSpaces:o}}scrollDownLine(){this.raw.scrollLines(1)}scrollDownPage(){this.raw.scrollPages(1)}scrollToBottom(){this.raw.scrollToBottom()}scrollUpLine(){this.raw.scrollLines(-1)}scrollUpPage(){this.raw.scrollPages(-1)}scrollToTop(){this.raw.scrollToTop()}scrollToLine(e,t=z.Top){this.markTracker.scrollToLine(e,t)}clearBuffer(){this.raw.clear(),this._capabilities.get(y.CommandDetection)?.handlePromptStart(),this._capabilities.get(y.CommandDetection)?.handleCommandStart(),this._accessibilitySignalService.playSignal(_e.clear)}hasSelection(){return this.raw.hasSelection()}clearSelection(){this.raw.clearSelection()}selectMarkedRange(e,t,i=!1){const r=this.shellIntegration.capabilities.get(y.BufferMarkDetection);if(!r)return;const o=r.getMark(e),s=r.getMark(t);o===void 0||s===void 0||(this.raw.selectLines(o.line,s.line),i&&this.raw.scrollToLine(o.line))}selectAll(){this.raw.focus(),this.raw.selectAll()}focus(){this.raw.focus()}async copySelection(e,t){if(this.hasSelection()||e&&t)if(e){let o=function(h){h.clipboardData.types.includes("text/plain")||h.clipboardData.setData("text/plain",t?.getOutput()??""),h.clipboardData.setData("text/html",r),h.preventDefault()};var i=o;const r=await this.getSelectionAsHtml(t),s=m.getDocument(this.raw.element);s.addEventListener("copy",o),s.execCommand("copy"),s.removeEventListener("copy",o)}else await this._clipboardService.writeText(this.raw.getSelection());else this._notificationService.warn(X("terminal.integrated.copySelection.noSelection","The terminal has no selection to copy"))}_setCursorBlink(e){this.raw.options.cursorBlink!==e&&(this.raw.options.cursorBlink=e,this.raw.refresh(0,this.raw.rows-1))}_setCursorStyle(e){const t=A(e);this.raw.options.cursorStyle!==t&&(this.raw.options.cursorStyle=t)}_setCursorStyleInactive(e){const t=A(e);this.raw.options.cursorInactiveStyle!==t&&(this.raw.options.cursorInactiveStyle=t)}_setCursorWidth(e){this.raw.options.cursorWidth!==e&&(this.raw.options.cursorWidth=e)}async _enableWebglRenderer(){if(!this.raw.element||this._webglAddon)return;if(!u._checkedWebglCompatible){u._checkedWebglCompatible=!0;const i=document.createElement("canvas").getContext("webgl2"),r=i?.getExtension("WEBGL_debug_renderer_info");if(i&&r&&i.getParameter(r.UNMASKED_RENDERER_WEBGL).startsWith("ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)")){this._disableWebglForThisSession();return}}const e=await this._xtermAddonLoader.importAddon("webgl");this._webglAddon=new e;try{this.raw.loadAddon(this._webglAddon),this._logService.trace("Webgl was loaded"),this._webglAddon.onContextLoss(()=>{this._logService.info("Webgl lost context, disposing of webgl renderer"),this._disposeOfWebglRenderer()}),this._refreshImageAddon(),this._onDidRequestRefreshDimensions.fire()}catch(t){this._logService.warn("Webgl could not be loaded. Falling back to the DOM renderer",t),this._disableWebglForThisSession()}}_disableWebglForThisSession(){u._suggestedRendererType="dom",this._disposeOfWebglRenderer()}async _refreshImageAddon(){if(this._terminalConfigurationService.config.enableImages&&this._webglAddon){if(!this._imageAddon){const e=await this._xtermAddonLoader.importAddon("image");this._imageAddon=new e,this.raw.loadAddon(this._imageAddon)}}else{try{this._imageAddon?.dispose()}catch{}this._imageAddon=void 0}}_disposeOfWebglRenderer(){try{this._webglAddon?.dispose()}catch{}this._webglAddon=void 0,this._refreshImageAddon(),this._onDidRequestRefreshDimensions.fire()}getXtermTheme(e){e||(e=this._themeService.getColorTheme());const t=this._terminalConfigurationService.config,i=["never","gutter"].includes(t.shellIntegration?.decorationsEnabled??""),r=e.getColor(q),o=this._xtermColorProvider.getBackgroundColor(e),s=e.getColor(Y)||r,h=e.getColor(j)||o,_=e.getColor(J),f=e.getColor(ne),S=e.getColor(oe)||void 0;return{background:o?.toString(),foreground:r?.toString(),cursor:s?.toString(),cursorAccent:h?.toString(),selectionBackground:_?.toString(),selectionInactiveBackground:f?.toString(),selectionForeground:S?.toString(),overviewRulerBorder:i?"#0000":e.getColor(ae)?.toString(),scrollbarSliderActiveBackground:e.getColor(ve)?.toString(),scrollbarSliderBackground:e.getColor(Se)?.toString(),scrollbarSliderHoverBackground:e.getColor(Ce)?.toString(),black:e.getColor(c[0])?.toString(),red:e.getColor(c[1])?.toString(),green:e.getColor(c[2])?.toString(),yellow:e.getColor(c[3])?.toString(),blue:e.getColor(c[4])?.toString(),magenta:e.getColor(c[5])?.toString(),cyan:e.getColor(c[6])?.toString(),white:e.getColor(c[7])?.toString(),brightBlack:e.getColor(c[8])?.toString(),brightRed:e.getColor(c[9])?.toString(),brightGreen:e.getColor(c[10])?.toString(),brightYellow:e.getColor(c[11])?.toString(),brightBlue:e.getColor(c[12])?.toString(),brightMagenta:e.getColor(c[13])?.toString(),brightCyan:e.getColor(c[14])?.toString(),brightWhite:e.getColor(c[15])?.toString()}}_updateTheme(e){this.raw.options.theme=this.getXtermTheme(e)}refresh(){this._updateTheme(),this._decorationAddon.refreshLayouts()}async _updateUnicodeVersion(){if(!this._unicode11Addon&&this._terminalConfigurationService.config.unicodeVersion==="11"){const e=await this._xtermAddonLoader.importAddon("unicode11");this._unicode11Addon=new e,this.raw.loadAddon(this._unicode11Addon)}this.raw.unicode.activeVersion!==this._terminalConfigurationService.config.unicodeVersion&&(this.raw.unicode.activeVersion=this._terminalConfigurationService.config.unicodeVersion)}_writeText(e){this.raw.write(e)}dispose(){this._anyTerminalFocusContextKey.reset(),this._anyFocusedTerminalHasSelection.reset(),this._onDidDispose.fire(),super.dispose()}};I([ue(100)],u.prototype,"_refreshImageAddon",1),u=I([g(2,k),g(3,le),g(4,F),g(5,G),g(6,V),g(7,ce),g(8,H),g(9,ge),g(10,he),g(11,fe),g(12,pe)],u);function vt(n,a,e,t){if(!a.charWidth||!a.charHeight)return null;const i=e*n.devicePixelRatio,r=a.charWidth*n.devicePixelRatio+a.letterSpacing,o=Math.max(Math.floor(i/r),1),s=t*n.devicePixelRatio,h=Math.ceil(a.charHeight*n.devicePixelRatio),_=Math.floor(h*a.lineHeight);return{rows:Math.max(Math.floor(s/_),1),cols:o}}function L(n){switch(n){case v.Trace:return"trace";case v.Debug:return"debug";case v.Info:return"info";case v.Warning:return"warn";case v.Error:return"error";default:return"off"}}function A(n){return n==="line"?"bar":n}export{u as XtermTerminal,vt as getXtermScaledDimensions};
