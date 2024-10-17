import{DataTransfers as g}from"../../../base/browser/dnd.js";import{mainWindow as S}from"../../../base/browser/window.js";import"../../../base/browser/mouseEvent.js";import{coalesce as D}from"../../../base/common/arrays.js";import{DeferredPromise as m}from"../../../base/common/async.js";import{VSBuffer as I}from"../../../base/common/buffer.js";import{ResourceMap as b}from"../../../base/common/map.js";import{parse as w}from"../../../base/common/marshalling.js";import{Schemas as y}from"../../../base/common/network.js";import{isNative as v,isWeb as A}from"../../../base/common/platform.js";import{URI as u}from"../../../base/common/uri.js";import{localize as R}from"../../../nls.js";import{IDialogService as x}from"../../dialogs/common/dialogs.js";import"../../editor/common/editor.js";import{HTMLFileSystemProvider as C}from"../../files/browser/htmlFileSystemProvider.js";import{WebFileSystemAccess as l}from"../../files/browser/webFileSystemAccess.js";import{ByteSize as P,IFileService as L}from"../../files/common/files.js";import{IInstantiationService as O}from"../../instantiation/common/instantiation.js";import{extractSelection as U}from"../../opener/common/opener.js";import{Registry as T}from"../../registry/common/platform.js";const h={EDITORS:"CodeEditors",FILES:"CodeFiles"};function k(t){const e=[];if(t.dataTransfer&&t.dataTransfer.types.length>0){const r=t.dataTransfer.getData(h.EDITORS);if(r)try{e.push(...w(r))}catch{}else try{const o=t.dataTransfer.getData(g.RESOURCES);e.push(...B(o))}catch{}if(t.dataTransfer?.files)for(let o=0;o<t.dataTransfer.files.length;o++){const c=t.dataTransfer.files[o];if(c&&E(c))try{e.push({resource:u.file(E(c)),isExternal:!0,allowWorkspaceOpen:!0})}catch{}}const s=t.dataTransfer.getData(h.FILES);if(s)try{const o=JSON.parse(s);for(const c of o)e.push({resource:u.file(c),isExternal:!0,allowWorkspaceOpen:!0})}catch{}const n=T.as(F.DragAndDropContribution).getAll();for(const o of n){const c=t.dataTransfer.getData(o.dataFormatKey);if(c)try{e.push(...o.getEditorInputs(c))}catch{}}}const a=[],i=new b;for(const r of e)r.resource?i.has(r.resource)||(a.push(r),i.set(r.resource,!0)):a.push(r);return a}async function ue(t,e){const a=k(e);if(e.dataTransfer&&A&&M(e,g.FILES)&&e.dataTransfer.items){const s=await t.get(O).invokeFunction(n=>N(n,e));for(const n of s)a.push({resource:n.resource,contents:n.contents?.toString(),isExternal:!0,allowWorkspaceOpen:n.isDirectory})}return a}function B(t){const e=[];if(t){const a=JSON.parse(t);for(const i of a)if(i.indexOf(":")>0){const{selection:r,uri:s}=U(u.parse(i));e.push({resource:s,options:{selection:r}})}}return e}async function N(t,e){if(l.supported(S)){const i=e.dataTransfer?.items;if(i)return W(t,i)}const a=e.dataTransfer?.files;return a?H(t,a):[]}async function W(t,e){const a=t.get(L).getProvider(y.file);if(!(a instanceof C))return[];const i=[];for(let r=0;r<e.length;r++){const s=e[r];if(s){const n=new m;i.push(n),(async()=>{try{const o=await s.getAsFileSystemHandle();if(!o){n.complete(void 0);return}l.isFileSystemFileHandle(o)?n.complete({resource:await a.registerFileHandle(o),isDirectory:!1}):l.isFileSystemDirectoryHandle(o)?n.complete({resource:await a.registerDirectoryHandle(o),isDirectory:!0}):n.complete(void 0)}catch{n.complete(void 0)}})()}}return D(await Promise.all(i.map(r=>r.p)))}async function H(t,e){const a=t.get(x),i=[];for(let r=0;r<e.length;r++){const s=e.item(r);if(s){if(s.size>100*P.MB){a.warn(R("fileTooLarge","File is too large to open as untitled editor. Please upload it first into the file explorer and then try again."));continue}const n=new m;i.push(n);const o=new FileReader;o.onerror=()=>n.complete(void 0),o.onabort=()=>n.complete(void 0),o.onload=async c=>{const d=s.name,f=c.target?.result??void 0;if(typeof d!="string"||typeof f>"u"){n.complete(void 0);return}n.complete({resource:u.from({scheme:y.untitled,path:d}),contents:typeof f=="string"?I.fromString(f):I.wrap(new Uint8Array(f))})},o.readAsArrayBuffer(s)}}return D(await Promise.all(i.map(r=>r.p)))}function M(t,...e){if(!t.dataTransfer)return!1;const a=t.dataTransfer.types,i=[];for(let r=0;r<a.length;r++)i.push(a[r].toLowerCase());for(const r of e)if(i.indexOf(r.toLowerCase())>=0)return!0;return!1}class K{_contributions=new Map;register(e){if(this._contributions.has(e.dataFormatKey))throw new Error(`A drag and drop contributiont with key '${e.dataFormatKey}' was already registered.`);this._contributions.set(e.dataFormatKey,e)}getAll(){return this._contributions.values()}}const F={DragAndDropContribution:"workbench.contributions.dragAndDrop"};T.add(F.DragAndDropContribution,new K);class p{static INSTANCE=new p;data;proto;constructor(){}static getInstance(){return p.INSTANCE}hasData(e){return e&&e===this.proto}clearData(e){this.hasData(e)&&(this.proto=void 0,this.data=void 0)}getData(e){if(this.hasData(e))return this.data}setData(e,a){a&&(this.data=e,this.proto=a)}}function E(t){if(v&&typeof globalThis.vscode?.webUtils?.getPathForFile=="function")return globalThis.vscode.webUtils.getPathForFile(t)}export{h as CodeDataTransfers,F as Extensions,p as LocalSelectionTransfer,M as containsDragType,B as createDraggedEditorInputFromRawResourcesData,ue as extractEditorsAndFilesDropData,k as extractEditorsDropData,H as extractFileListData,E as getPathForFile};
