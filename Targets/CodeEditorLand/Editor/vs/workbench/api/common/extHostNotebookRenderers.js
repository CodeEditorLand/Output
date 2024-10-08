import{Emitter as a}from"../../../base/common/event.js";import"../../../platform/extensions/common/extensions.js";import{MainContext as d}from"./extHost.protocol.js";import"./extHostNotebook.js";import{ExtHostNotebookEditor as n}from"./extHostNotebookEditor.js";import"vscode";class l{constructor(o,e){this._extHostNotebook=e;this.proxy=o.getProxy(d.MainThreadNotebookRenderers)}_rendererMessageEmitters=new Map;proxy;$postRendererMessage(o,e,i){const t=this._extHostNotebook.getEditorById(o);this._rendererMessageEmitters.get(e)?.fire({editor:t.apiEditor,message:i})}createRendererMessaging(o,e){if(!o.contributes?.notebookRenderer?.some(t=>t.id===e))throw new Error(`Extensions may only call createRendererMessaging() for renderers they contribute (got ${e})`);return{onDidReceiveMessage:(t,r,s)=>this.getOrCreateEmitterFor(e).event(t,r,s),postMessage:(t,r)=>{n.apiEditorsToExtHost.has(t)&&([t,r]=[r,t]);const s=r&&n.apiEditorsToExtHost.get(r);return this.proxy.$postMessage(s?.id,e,t)}}}getOrCreateEmitterFor(o){let e=this._rendererMessageEmitters.get(o);return e||(e=new a({onDidRemoveLastListener:()=>{e?.dispose(),this._rendererMessageEmitters.delete(o)}}),this._rendererMessageEmitters.set(o,e),e)}}export{l as ExtHostNotebookRenderers};
