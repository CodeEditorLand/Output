var g=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var l=(a,e,n,t)=>{for(var i=t>1?void 0:t?f(e,n):e,r=a.length-1,o;r>=0;r--)(o=a[r])&&(i=(t?o(e,n,i):o(i))||i);return t&&i&&g(e,n,i),i},s=(a,e)=>(n,t)=>e(n,t,a);import{Emitter as C,Event as c}from"../../../../../base/common/event.js";import{Disposable as u,DisposableStore as I}from"../../../../../base/common/lifecycle.js";import{basename as h}from"../../../../../base/common/resources.js";import{URI as m}from"../../../../../base/common/uri.js";import{ICodeEditorService as D}from"../../../../../editor/browser/services/codeEditorService.js";import"../../../../../editor/common/languages.js";import"../../../../common/contributions.js";import{IEditorService as E}from"../../../../services/editor/common/editorService.js";import{ChatAgentLocation as b}from"../../common/chatAgents.js";import"../../common/chatModel.js";import{IChatWidgetService as y}from"../chat.js";let d=class extends u{constructor(n,t,i){super();this.codeEditorService=n;this.chatWidgetService=i;const r=this._register(new I);this._register(c.runAndSubscribe(t.onDidActiveEditorChange,()=>{r.clear();const o=n.getActiveCodeEditor();o&&(r.add(o.onDidChangeModel(()=>this.updateImplicitContext())),r.add(c.debounce(o.onDidChangeCursorSelection,()=>{},500)(()=>this.updateImplicitContext()))),this.updateImplicitContext()})),this._register(i.onDidAddWidget(o=>this.updateImplicitContext(o)))}static ID="chat.implicitContext";updateImplicitContext(n){const t=this.codeEditorService.getActiveCodeEditor(),i=t?.getModel(),r=t?.getSelection(),o=i?r&&!r?.isEmpty()?{uri:i.uri,range:r}:i.uri:void 0,p=n?[n]:this.chatWidgetService.getAllWidgets(b.Panel);for(const v of p)v.input.implicitContext.value=o}};d=l([s(0,D),s(1,E),s(2,y)],d);class j extends u{id="vscode.implicit";get name(){return m.isUri(this.value)?`file:${h(this.value)}`:this.value?`file:${h(this.value.uri)}`:"implicit"}kind="implicit";get modelDescription(){return m.isUri(this.value)?"User's active file":"User's active selection"}isDynamic=!0;isFile=!0;_onDidChangeValue=new C;onDidChangeValue=this._onDidChangeValue.event;_value;get value(){return this._value}set value(e){this._value=e,this._onDidChangeValue.fire()}_enabled=!0;get enabled(){return this._enabled}set enabled(e){this._enabled=e,this._onDidChangeValue.fire()}constructor(e){super(),this._value=e}setValue(e){this._value=e,this._onDidChangeValue.fire()}toBaseEntry(){return{id:this.id,name:this.name,value:this.value,isFile:!0,isDynamic:!0,modelDescription:this.modelDescription}}}export{j as ChatImplicitContext,d as ChatImplicitContextContribution};
