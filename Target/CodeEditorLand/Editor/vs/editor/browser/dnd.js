import{DataTransfers as o}from"../../base/browser/dnd.js";import{createFileDataTransferItem as D,createStringDataTransferItem as p,UriList as I,VSDataTransfer as u}from"../../base/common/dataTransfer.js";import{Mimes as f}from"../../base/common/mime.js";import{URI as c}from"../../base/common/uri.js";import{CodeDataTransfers as T,getPathForFile as l}from"../../platform/dnd/browser/dnd.js";function S(r){const a=new u;for(const t of r.items){const n=t.type;if(t.kind==="string"){const e=new Promise(s=>t.getAsString(s));a.append(n,p(e))}else if(t.kind==="file"){const e=t.getAsFile();e&&a.append(n,g(e))}}return a}function g(r){const a=l(r),t=a?c.parse(a):void 0;return D(r.name,t,async()=>new Uint8Array(await r.arrayBuffer()))}const L=Object.freeze([T.EDITORS,T.FILES,o.RESOURCES,o.INTERNAL_URI_LIST]);function N(r,a=!1){const t=S(r),n=t.get(o.INTERNAL_URI_LIST);if(n)t.replace(f.uriList,n);else if(a||!t.has(f.uriList)){const e=[];for(const s of r.items){const i=s.getAsFile();if(i){const m=l(i);try{m?e.push(c.file(m).toString()):e.push(c.parse(i.name,!0).toString())}catch{}}}e.length&&t.replace(f.uriList,p(I.create(e)))}for(const e of L)t.delete(e);return t}export{N as toExternalVSDataTransfer,S as toVSDataTransfer};
