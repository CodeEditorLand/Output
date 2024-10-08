var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var l=(o,r,e,n)=>{for(var t=n>1?void 0:n?p(r,e):r,s=o.length-1,i;s>=0;s--)(i=o[s])&&(t=(n?i(r,e,t):i(t))||t);return n&&t&&u(r,e,t),t},c=(o,r)=>(e,n)=>r(e,n,o);import*as I from"../../../../base/browser/dom.js";import{Delayer as b}from"../../../../base/common/async.js";import{onUnexpectedError as d}from"../../../../base/common/errors.js";import{Disposable as g}from"../../../../base/common/lifecycle.js";import"../../../../base/common/platform.js";import{MicrotaskDelay as T}from"../../../../base/common/symbols.js";import{IInstantiationService as v}from"../../../../platform/instantiation/common/instantiation.js";import{TerminalCapabilityStore as f}from"../../../../platform/terminal/common/capabilities/terminalCapabilityStore.js";import"../../../../platform/terminal/common/environmentVariable.js";import"../../../../platform/terminal/common/terminal.js";import"./terminal.js";import{TerminalExtensionsRegistry as E}from"./terminalExtensions.js";import{TerminalWidgetManager as _}from"./widgets/widgetManager.js";import"./xterm/xtermTerminal.js";import"../common/environmentVariable.js";import{ProcessState as x}from"../common/terminal.js";let a=class extends g{constructor(e,n,t){super();this._xterm=e;this._register(e);const s=E.getTerminalContributions();for(const i of s){if(this._contributions.has(i.id)){d(new Error(`Cannot have two terminal contributions with the same id ${i.id}`));continue}if(i.canRunInDetachedTerminals===!1)continue;let m;try{m=t.createInstance(i.ctor,{instance:this,processManager:n.processInfo,widgetManager:this._widgets}),this._contributions.set(i.id,m),this._register(m)}catch(h){d(h)}}this._register(new b(T)).trigger(()=>{for(const i of this._contributions.values())i.xtermReady?.(this._xterm)})}_widgets=this._register(new _);capabilities=new f;_contributions=new Map;domElement;get xterm(){return this._xterm}get selection(){return this._xterm&&this.hasSelection()?this._xterm.raw.getSelection():void 0}hasSelection(){return this._xterm.hasSelection()}clearSelection(){this._xterm.clearSelection()}focus(e){(e||!I.getActiveWindow().getSelection()?.toString())&&this.xterm.focus()}attachToElement(e,n){this.domElement=e;const t=this._xterm.attachToElement(e,n);this._widgets.attachToElement(t)}forceScrollbarVisibility(){this.domElement?.classList.add("force-scrollbar")}resetScrollbarVisibility(){this.domElement?.classList.remove("force-scrollbar")}getContribution(e){return this._contributions.get(e)}};a=l([c(2,v)],a);class Q{processState=x.Running;ptyProcessReady=Promise.resolve();shellProcessId;remoteAuthority;os;userHome;initialCwd="";environmentVariableInfo;persistentProcessId;shouldPersist=!1;hasWrittenData=!1;hasChildProcesses=!1;backend;capabilities=new f;shellIntegrationNonce="";extEnvironmentVariableCollection;constructor(r){Object.assign(this,r)}}export{Q as DetachedProcessInfo,a as DetachedTerminal};
