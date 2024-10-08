import{Barrier as T,isThenable as g,RunOnceScheduler as C}from"../../../../base/common/async.js";import{Emitter as b}from"../../../../base/common/event.js";import{Disposable as E}from"../../../../base/common/lifecycle.js";import{assertNever as S}from"../../../../base/common/assert.js";import{applyTestItemUpdate as v,namespaceTestTag as h,TestDiffOpType as l,TestItemExpandState as p}from"./testTypes.js";import{TestId as c}from"./testId.js";import"../../../../base/common/uri.js";var y=(n=>(n[n.Upsert=0]="Upsert",n[n.SetTags=1]="SetTags",n[n.UpdateCanResolveChildren=2]="UpdateCanResolveChildren",n[n.RemoveChild=3]="RemoveChild",n[n.SetProp=4]="SetProp",n[n.Bulk=5]="Bulk",n[n.DocumentSynced=6]="DocumentSynced",n))(y||{});const m=(d,r)=>d===r,D={range:(d,r)=>d===r?!0:!d||!r?!1:d.equalsRange(r),busy:m,label:m,description:m,error:m,sortText:m,tags:(d,r)=>!(d.length!==r.length||d.some(e=>!r.includes(e)))},k=Object.entries(D),R=(d,r)=>{let e;for(const[t,i]of k)i(d[t],r[t])||(e?e[t]=r[t]:e={[t]:r[t]});return e};class z extends E{constructor(e){super();this.options=e;this.root.canResolveChildren=!0,this.upsertItem(this.root,void 0)}debounceSendDiff=this._register(new C(()=>this.flushDiff(),200));diffOpEmitter=this._register(new b);_resolveHandler;get root(){return this.options.root}tree=new Map;tags=new Map;diff=[];set resolveHandler(e){this._resolveHandler=e;for(const t of this.tree.values())this.updateExpandability(t)}get resolveHandler(){return this._resolveHandler}onDidGenerateDiff=this.diffOpEmitter.event;collectDiff(){const e=this.diff;return this.diff=[],e}pushDiff(e){switch(e.op){case l.DocumentSynced:{for(const t of this.diff)if(t.op===l.DocumentSynced&&t.uri===e.uri){t.docv=e.docv;return}break}case l.Update:{const t=this.diff[this.diff.length-1];if(t){if(t.op===l.Update&&t.item.extId===e.item.extId){v(t.item,e.item);return}if(t.op===l.Add&&t.item.item.extId===e.item.extId){v(t.item,e.item);return}}break}}this.diff.push(e),this.debounceSendDiff.isScheduled()||this.debounceSendDiff.schedule()}expand(e,t){const i=this.tree.get(e);if(i){if((i.expandLevels===void 0||t>i.expandLevels)&&(i.expandLevels=t),i.expand===p.Expandable){const o=this.resolveChildren(i);return o.isOpen()?this.expandChildren(i,t-1):o.wait().then(()=>this.expandChildren(i,t-1))}else if(i.expand===p.Expanded)return i.resolveBarrier?.isOpen()===!1?i.resolveBarrier.wait().then(()=>this.expandChildren(i,t-1)):this.expandChildren(i,t-1)}}dispose(){for(const e of this.tree.values())this.options.getApiFor(e.actual).listener=void 0;this.tree.clear(),this.diff=[],super.dispose()}onTestItemEvent(e,t){switch(t.op){case 3:this.removeItem(c.joinToString(e.fullId,t.id));break;case 0:this.upsertItem(t.item,e);break;case 5:for(const i of t.ops)this.onTestItemEvent(e,i);break;case 1:this.diffTagRefs(t.new,t.old,e.fullId.toString());break;case 2:this.updateExpandability(e);break;case 4:this.pushDiff({op:l.Update,item:{extId:e.fullId.toString(),item:t.update}});break;case 6:this.documentSynced(e.actual.uri);break;default:S(t)}}documentSynced(e){e&&this.pushDiff({op:l.DocumentSynced,uri:e,docv:this.options.getDocumentVersion(e)})}upsertItem(e,t){const i=c.fromExtHostTestItem(e,this.root.id,t?.actual),o=this.options.getApiFor(e);o.parent&&o.parent!==t?.actual&&this.options.getChildren(o.parent).delete(e.id);let s=this.tree.get(i.toString());if(!s){s={fullId:i,actual:e,expandLevels:t?.expandLevels?t.expandLevels-1:void 0,expand:p.NotExpandable},e.tags.forEach(this.incrementTagRefs,this),this.tree.set(s.fullId.toString(),s),this.setItemParent(e,t),this.pushDiff({op:l.Add,item:{controllerId:this.options.controllerId,expand:s.expand,item:this.options.toITestItem(e)}}),this.connectItemAndChildren(e,s,t);return}if(s.actual===e){this.connectItem(e,s,t);return}if(s.actual.uri?.toString()!==e.uri?.toString())return this.removeItem(i.toString()),this.upsertItem(e,t);const n=this.options.getChildren(s.actual),a=s.actual,f=R(this.options.toITestItem(a),this.options.toITestItem(e));this.options.getApiFor(a).listener=void 0,s.actual=e,s.resolveBarrier=void 0,s.expand=p.NotExpandable,f&&(f.hasOwnProperty("tags")&&(this.diffTagRefs(e.tags,a.tags,i.toString()),delete f.tags),this.onTestItemEvent(s,{op:4,update:f})),this.connectItemAndChildren(e,s,t);for(const[A,u]of n)this.options.getChildren(e).get(u.id)||this.removeItem(c.joinToString(i,u.id));const I=s.expandLevels;I!==void 0&&queueMicrotask(()=>{s.expand===p.Expandable&&(s.expandLevels=void 0,this.expand(i.toString(),I))}),this.documentSynced(s.actual.uri)}diffTagRefs(e,t,i){const o=new Set(t.map(s=>s.id));for(const s of e)o.delete(s.id)||this.incrementTagRefs(s);this.pushDiff({op:l.Update,item:{extId:i,item:{tags:e.map(s=>h(this.options.controllerId,s.id))}}}),o.forEach(this.decrementTagRefs,this)}incrementTagRefs(e){const t=this.tags.get(e.id);t?t.refCount++:(this.tags.set(e.id,{refCount:1}),this.pushDiff({op:l.AddTag,tag:{id:h(this.options.controllerId,e.id)}}))}decrementTagRefs(e){const t=this.tags.get(e);t&&!--t.refCount&&(this.tags.delete(e),this.pushDiff({op:l.RemoveTag,id:h(this.options.controllerId,e)}))}setItemParent(e,t){this.options.getApiFor(e).parent=t&&t.actual!==this.root?t.actual:void 0}connectItem(e,t,i){this.setItemParent(e,i);const o=this.options.getApiFor(e);o.parent=i?.actual,o.listener=s=>this.onTestItemEvent(t,s),this.updateExpandability(t)}connectItemAndChildren(e,t,i){this.connectItem(e,t,i);for(const[o,s]of this.options.getChildren(e))this.upsertItem(s,t)}updateExpandability(e){let t;this._resolveHandler?e.resolveBarrier?t=e.resolveBarrier.isOpen()?p.Expanded:p.BusyExpanding:t=e.actual.canResolveChildren?p.Expandable:p.NotExpandable:t=p.NotExpandable,t!==e.expand&&(e.expand=t,this.pushDiff({op:l.Update,item:{extId:e.fullId.toString(),expand:t}}),t===p.Expandable&&e.expandLevels!==void 0&&this.resolveChildren(e))}expandChildren(e,t){if(t<0)return;const i=[];for(const[o,s]of this.options.getChildren(e.actual)){const n=this.expand(c.joinToString(e.fullId,s.id),t);g(n)&&i.push(n)}if(i.length)return Promise.all(i).then(()=>{})}resolveChildren(e){if(e.resolveBarrier)return e.resolveBarrier;if(!this._resolveHandler){const s=new T;return s.open(),s}e.expand=p.BusyExpanding,this.pushExpandStateUpdate(e);const t=e.resolveBarrier=new T,i=s=>{};let o;try{o=this._resolveHandler(e.actual===this.root?void 0:e.actual)}catch(s){i(s)}return g(o)?o.catch(i).then(()=>{t.open(),this.updateExpandability(e)}):(t.open(),this.updateExpandability(e)),e.resolveBarrier}pushExpandStateUpdate(e){this.pushDiff({op:l.Update,item:{extId:e.fullId.toString(),expand:e.expand}})}removeItem(e){const t=this.tree.get(e);if(!t)throw new Error("attempting to remove non-existent child");this.pushDiff({op:l.Remove,itemId:e});const i=[t];for(;i.length;){const o=i.pop();if(o){this.options.getApiFor(o.actual).listener=void 0;for(const s of o.actual.tags)this.decrementTagRefs(s.id);this.tree.delete(o.fullId.toString());for(const[s,n]of this.options.getChildren(o.actual))i.push(this.tree.get(c.joinToString(o.fullId,n.id)))}}}flushDiff(){const e=this.collectDiff();e.length&&this.diffOpEmitter.fire(e)}}class w extends Error{constructor(r){super(`Attempted to insert a duplicate test item ID ${r}`)}}class x extends Error{constructor(r){super(`TestItem with ID "${r}" is invalid. Make sure to create it from the createTestItem method.`)}}class U extends Error{constructor(r,e,t){super(`TestItem with ID "${r}" is from controller "${e}" and cannot be added as a child of an item from controller "${t}".`)}}const K=(d,r,e)=>{let t=new Map;return{get size(){return t.size},forEach(i,o){for(const s of t.values())i.call(o,s,this)},[Symbol.iterator](){return t.entries()},replace(i){const o=new Map,s=new Set(t.keys()),n={op:5,ops:[]};for(const a of i){if(!(a instanceof e))throw new x(a.id);const f=r(a).controllerId;if(f!==d.controllerId)throw new U(a.id,f,d.controllerId);if(o.has(a.id))throw new w(a.id);o.set(a.id,a),s.delete(a.id),n.ops.push({op:0,item:a})}for(const a of s.keys())n.ops.push({op:3,id:a});d.listener?.(n),t=o},add(i){if(!(i instanceof e))throw new x(i.id);t.set(i.id,i),d.listener?.({op:0,item:i})},delete(i){t.delete(i)&&d.listener?.({op:3,id:i})},get(i){return t.get(i)},toJSON(){return Array.from(t.values())}}};export{w as DuplicateTestItemError,x as InvalidTestItemError,U as MixedTestItemController,z as TestItemCollection,y as TestItemEventOp,K as createTestItemChildren};
