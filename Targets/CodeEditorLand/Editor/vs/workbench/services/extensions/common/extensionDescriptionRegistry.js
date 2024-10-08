import{ExtensionIdentifier as u,ExtensionIdentifierMap as x,ExtensionIdentifierSet as h}from"../../../../platform/extensions/common/extensions.js";import{Emitter as g}from"../../../../base/common/event.js";import*as D from"../../../../base/common/path.js";import{Disposable as v,toDisposable as f}from"../../../../base/common/lifecycle.js";import{promiseWithResolvers as I}from"../../../../base/common/async.js";class _{constructor(e,i){this.versionId=e;this.removedDueToLooping=i}}class d{constructor(e,i){this._activationEventsReader=e;this._extensionDescriptions=i,this._initialize()}static isHostExtension(e,i,t){if(i.getExtensionDescription(e))return!1;const s=t.getExtensionDescription(e);return s?!!((s.main||s.browser)&&s.api==="none"):!1}_onDidChange=new g;onDidChange=this._onDidChange.event;_versionId=0;_extensionDescriptions;_extensionsMap;_extensionsArr;_activationMap;_initialize(){this._extensionDescriptions.sort(L),this._extensionsMap=new x,this._extensionsArr=[],this._activationMap=new Map;for(const e of this._extensionDescriptions){if(this._extensionsMap.has(e.identifier))continue;this._extensionsMap.set(e.identifier,e),this._extensionsArr.push(e);const i=this._activationEventsReader.readActivationEvents(e);for(const t of i)this._activationMap.has(t)||this._activationMap.set(t,[]),this._activationMap.get(t).push(e)}}set(e){return this._extensionDescriptions=e,this._initialize(),this._versionId++,this._onDidChange.fire(void 0),{versionId:this._versionId}}deltaExtensions(e,i){this._extensionDescriptions=E(this._extensionDescriptions,i),this._extensionDescriptions=this._extensionDescriptions.concat(e);const t=d._findLoopingExtensions(this._extensionDescriptions);return this._extensionDescriptions=E(this._extensionDescriptions,t.map(s=>s.identifier)),this._initialize(),this._versionId++,this._onDidChange.fire(void 0),new _(this._versionId,t)}static _findLoopingExtensions(e){const i=new class{_arcs=new Map;_nodesSet=new Set;_nodesArr=[];addNode(n){this._nodesSet.has(n)||(this._nodesSet.add(n),this._nodesArr.push(n))}addArc(n,r){this.addNode(n),this.addNode(r),this._arcs.has(n)?this._arcs.get(n).push(r):this._arcs.set(n,[r])}getArcs(n){return this._arcs.has(n)?this._arcs.get(n):[]}hasOnlyGoodArcs(n,r){const l=i.getArcs(n);for(let p=0;p<l.length;p++)if(!r.has(l[p]))return!1;return!0}getNodes(){return this._nodesArr}},t=new x;for(const n of e)if(t.set(n.identifier,n),n.extensionDependencies)for(const r of n.extensionDependencies)i.addArc(u.toKey(n.identifier),u.toKey(r));const s=new Set;i.getNodes().filter(n=>i.getArcs(n).length===0).forEach(n=>s.add(n));const c=i.getNodes().filter(n=>!s.has(n));let a;do{a=!1;for(let n=0;n<c.length;n++){const r=c[n];i.hasOnlyGoodArcs(r,s)&&(c.splice(n,1),n--,s.add(r),a=!0)}}while(a);return c.map(n=>t.get(n))}containsActivationEvent(e){return this._activationMap.has(e)}containsExtension(e){return this._extensionsMap.has(e)}getExtensionDescriptionsForActivationEvent(e){const i=this._activationMap.get(e);return i?i.slice(0):[]}getAllExtensionDescriptions(){return this._extensionsArr.slice(0)}getSnapshot(){return new b(this._versionId,this.getAllExtensionDescriptions())}getExtensionDescription(e){const i=this._extensionsMap.get(e);return i||void 0}getExtensionDescriptionByUUID(e){for(const i of this._extensionsArr)if(i.uuid===e)return i}getExtensionDescriptionByIdOrUUID(e,i){return this.getExtensionDescription(e)??(i?this.getExtensionDescriptionByUUID(i):void 0)}}class b{constructor(e,i){this.versionId=e;this.extensions=i}}class C{_actual;_lock=new A;constructor(e){this._actual=new d(e,[])}async acquireLock(e){const i=await this._lock.acquire(e);return new m(this,i)}deltaExtensions(e,i,t){if(!e.isAcquiredFor(this))throw new Error("Lock is not held");return this._actual.deltaExtensions(i,t)}containsActivationEvent(e){return this._actual.containsActivationEvent(e)}containsExtension(e){return this._actual.containsExtension(e)}getExtensionDescriptionsForActivationEvent(e){return this._actual.getExtensionDescriptionsForActivationEvent(e)}getAllExtensionDescriptions(){return this._actual.getAllExtensionDescriptions()}getSnapshot(){return this._actual.getSnapshot()}getExtensionDescription(e){return this._actual.getExtensionDescription(e)}getExtensionDescriptionByUUID(e){return this._actual.getExtensionDescriptionByUUID(e)}getExtensionDescriptionByIdOrUUID(e,i){return this._actual.getExtensionDescriptionByIdOrUUID(e,i)}}class m extends v{constructor(i,t){super();this._registry=i;this._register(t)}_isDisposed=!1;isAcquiredFor(i){return!this._isDisposed&&this._registry===i}}class y{constructor(e){this.name=e;const i=I();this.promise=i.promise,this._resolve=i.resolve}promise;_resolve;resolve(e){this._resolve(e)}}class A{_pendingCustomers=[];_isLocked=!1;async acquire(e){const i=new y(e);return this._pendingCustomers.push(i),this._advance(),i.promise}_advance(){if(this._isLocked||this._pendingCustomers.length===0)return;const e=this._pendingCustomers.shift();this._isLocked=!0;let i=!0;const t=setTimeout(()=>{},30*1e3),s=()=>{i&&(clearTimeout(t),i=!1,this._isLocked=!1,this._advance())};e.resolve(f(s))}}var R=(t=>(t[t.Builtin=0]="Builtin",t[t.User=1]="User",t[t.Dev=2]="Dev",t))(R||{});function L(o,e){const i=o.isBuiltin?0:o.isUnderDevelopment?2:1,t=e.isBuiltin?0:e.isUnderDevelopment?2:1;if(i!==t)return i-t;const s=D.posix.basename(o.extensionLocation.path),c=D.posix.basename(e.extensionLocation.path);return s<c?-1:s>c?1:0}function E(o,e){const i=new h(e);return o.filter(t=>!i.has(t.identifier))}export{_ as DeltaExtensionsResult,d as ExtensionDescriptionRegistry,m as ExtensionDescriptionRegistryLock,b as ExtensionDescriptionRegistrySnapshot,C as LockableExtensionDescriptionRegistry};
