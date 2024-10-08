import{Emitter as i}from"../../../../base/common/event.js";import{Disposable as t}from"../../../../base/common/lifecycle.js";import{TerminalCapability as s}from"./capabilities.js";class l extends t{constructor(r){super();this._terminal=r}type=s.BufferMarkDetection;_idToMarkerMap=new Map;_anonymousMarkers=new Map;_onMarkAdded=this._register(new i);onMarkAdded=this._onMarkAdded.event;*markers(){for(const r of this._idToMarkerMap.values())yield r;for(const r of this._anonymousMarkers.values())yield r}addMark(r){const e=r?.marker||this._terminal.registerMarker(),a=r?.id;e&&(a?(this._idToMarkerMap.set(a,e),e.onDispose(()=>this._idToMarkerMap.delete(a))):(this._anonymousMarkers.set(e.id,e),e.onDispose(()=>this._anonymousMarkers.delete(e.id))),this._onMarkAdded.fire({marker:e,id:a,hidden:r?.hidden,hoverMessage:r?.hoverMessage}))}getMark(r){return this._idToMarkerMap.get(r)}}export{l as BufferMarkCapability};
