import{$ as M,addDisposableListener as H,append as R,getWindow as W,scheduleAtNextAnimationFrame as X}from"../../dom.js";import{DomEmitter as Z}from"../../event.js";import{Orientation as y,Sash as Y,SashState as L}from"../sash/sash.js";import{SmoothScrollableElement as k}from"../scrollbar/scrollableElement.js";import{pushToEnd as A,pushToStart as P,range as b}from"../../../common/arrays.js";import{Color as j}from"../../../common/color.js";import{Emitter as U,Event as B}from"../../../common/event.js";import{combinedDisposable as O,Disposable as q,dispose as J,toDisposable as Q}from"../../../common/lifecycle.js";import{clamp as z}from"../../../common/numbers.js";import{Scrollable as ee,ScrollbarVisibility as N}from"../../../common/scrollable.js";import*as te from"../../../common/types.js";import"./splitview.css";import{Orientation as xe}from"../sash/sash.js";const ie={separatorBorder:j.transparent};var se=(i=>(i[i.Normal=0]="Normal",i[i.Low=1]="Low",i[i.High=2]="High",i))(se||{});class ${constructor(e,t,i,s){this.container=e;this.view=t;this.disposable=s;typeof i=="number"?(this._size=i,this._cachedVisibleSize=void 0,e.classList.add("visible")):(this._size=0,this._cachedVisibleSize=i.cachedVisibleSize)}_size;set size(e){this._size=e}get size(){return this._size}_cachedVisibleSize=void 0;get cachedVisibleSize(){return this._cachedVisibleSize}get visible(){return typeof this._cachedVisibleSize>"u"}setVisible(e,t){if(e!==this.visible){e?(this.size=z(this._cachedVisibleSize,this.viewMinimumSize,this.viewMaximumSize),this._cachedVisibleSize=void 0):(this._cachedVisibleSize=typeof t=="number"?t:this.size,this.size=0),this.container.classList.toggle("visible",e);try{this.view.setVisible?.(e)}catch{}}}get minimumSize(){return this.visible?this.view.minimumSize:0}get viewMinimumSize(){return this.view.minimumSize}get maximumSize(){return this.visible?this.view.maximumSize:0}get viewMaximumSize(){return this.view.maximumSize}get priority(){return this.view.priority}get proportionalLayout(){return this.view.proportionalLayout??!0}get snap(){return!!this.view.snap}set enabled(e){this.container.style.pointerEvents=e?"":"none"}layout(e,t){this.layoutContainer(e);try{this.view.layout(this.size,e,t)}catch{}}dispose(){this.disposable.dispose()}}class ne extends ${layoutContainer(e){this.container.style.top=`${e}px`,this.container.style.height=`${this.size}px`}}class oe extends ${layoutContainer(e){this.container.style.left=`${e}px`,this.container.style.width=`${this.size}px`}}var re=(t=>(t[t.Idle=0]="Idle",t[t.Busy=1]="Busy",t))(re||{}),G;(s=>{s.Distribute={type:"distribute"};function e(r){return{type:"split",index:r}}s.Split=e;function t(r){return{type:"auto",index:r}}s.Auto=t;function i(r){return{type:"invisible",cachedVisibleSize:r}}s.Invisible=i})(G||={});class ye extends q{orientation;el;sashContainer;viewContainer;scrollable;scrollableElement;size=0;layoutContext;_contentSize=0;proportions=void 0;viewItems=[];sashItems=[];sashDragState;state=0;inverseAltBehavior;proportionalLayout;getSashOrthogonalSize;_onDidSashChange=this._register(new U);_onDidSashReset=this._register(new U);_orthogonalStartSash;_orthogonalEndSash;_startSnappingEnabled=!0;_endSnappingEnabled=!0;get contentSize(){return this._contentSize}onDidSashChange=this._onDidSashChange.event;onDidSashReset=this._onDidSashReset.event;onDidScroll;get length(){return this.viewItems.length}get minimumSize(){return this.viewItems.reduce((e,t)=>e+t.minimumSize,0)}get maximumSize(){return this.length===0?Number.POSITIVE_INFINITY:this.viewItems.reduce((e,t)=>e+t.maximumSize,0)}get orthogonalStartSash(){return this._orthogonalStartSash}get orthogonalEndSash(){return this._orthogonalEndSash}get startSnappingEnabled(){return this._startSnappingEnabled}get endSnappingEnabled(){return this._endSnappingEnabled}set orthogonalStartSash(e){for(const t of this.sashItems)t.sash.orthogonalStartSash=e;this._orthogonalStartSash=e}set orthogonalEndSash(e){for(const t of this.sashItems)t.sash.orthogonalEndSash=e;this._orthogonalEndSash=e}get sashes(){return this.sashItems.map(e=>e.sash)}set startSnappingEnabled(e){this._startSnappingEnabled!==e&&(this._startSnappingEnabled=e,this.updateSashEnablement())}set endSnappingEnabled(e){this._endSnappingEnabled!==e&&(this._endSnappingEnabled=e,this.updateSashEnablement())}constructor(e,t={}){super(),this.orientation=t.orientation??y.VERTICAL,this.inverseAltBehavior=t.inverseAltBehavior??!1,this.proportionalLayout=t.proportionalLayout??!0,this.getSashOrthogonalSize=t.getSashOrthogonalSize,this.el=document.createElement("div"),this.el.classList.add("monaco-split-view2"),this.el.classList.add(this.orientation===y.VERTICAL?"vertical":"horizontal"),e.appendChild(this.el),this.sashContainer=R(this.el,M(".sash-container")),this.viewContainer=M(".split-view-container"),this.scrollable=this._register(new ee({forceIntegerValues:!0,smoothScrollDuration:125,scheduleAtNextAnimationFrame:s=>X(W(this.el),s)})),this.scrollableElement=this._register(new k(this.viewContainer,{vertical:this.orientation===y.VERTICAL?t.scrollbarVisibility??N.Auto:N.Hidden,horizontal:this.orientation===y.HORIZONTAL?t.scrollbarVisibility??N.Auto:N.Hidden},this.scrollable));const i=this._register(new Z(this.viewContainer,"scroll")).event;this._register(i(s=>{const r=this.scrollableElement.getScrollPosition(),h=Math.abs(this.viewContainer.scrollLeft-r.scrollLeft)<=1?void 0:this.viewContainer.scrollLeft,n=Math.abs(this.viewContainer.scrollTop-r.scrollTop)<=1?void 0:this.viewContainer.scrollTop;(h!==void 0||n!==void 0)&&this.scrollableElement.setScrollPosition({scrollLeft:h,scrollTop:n})})),this.onDidScroll=this.scrollableElement.onScroll,this._register(this.onDidScroll(s=>{s.scrollTopChanged&&(this.viewContainer.scrollTop=s.scrollTop),s.scrollLeftChanged&&(this.viewContainer.scrollLeft=s.scrollLeft)})),R(this.el,this.scrollableElement.getDomNode()),this.style(t.styles||ie),t.descriptor&&(this.size=t.descriptor.size,t.descriptor.views.forEach((s,r)=>{const h=te.isUndefined(s.visible)||s.visible?s.size:{type:"invisible",cachedVisibleSize:s.size},n=s.view;this.doAddView(n,h,r,!0)}),this._contentSize=this.viewItems.reduce((s,r)=>s+r.size,0),this.saveProportions())}style(e){e.separatorBorder.isTransparent()?(this.el.classList.remove("separator-border"),this.el.style.removeProperty("--separator-border")):(this.el.classList.add("separator-border"),this.el.style.setProperty("--separator-border",e.separatorBorder.toString()))}addView(e,t,i=this.viewItems.length,s){this.doAddView(e,t,i,s)}removeView(e,t){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");if(this.state!==0)throw new Error("Cant modify splitview");this.state=1;try{t?.type==="auto"&&(this.areViewsDistributed()?t={type:"distribute"}:t={type:"split",index:t.index});const i=t?.type==="split"?this.viewItems[t.index]:void 0,s=this.viewItems.splice(e,1)[0];if(i&&(i.size+=s.size),this.viewItems.length>=1){const h=Math.max(e-1,0);this.sashItems.splice(h,1)[0].disposable.dispose()}this.relayout(),t?.type==="distribute"&&this.distributeViewSizes();const r=s.view;return s.dispose(),r}finally{this.state=0}}removeAllViews(){if(this.state!==0)throw new Error("Cant modify splitview");this.state=1;try{const e=this.viewItems.splice(0,this.viewItems.length);for(const i of e)i.dispose();const t=this.sashItems.splice(0,this.sashItems.length);for(const i of t)i.disposable.dispose();return this.relayout(),e.map(i=>i.view)}finally{this.state=0}}moveView(e,t){if(this.state!==0)throw new Error("Cant modify splitview");const i=this.getViewCachedVisibleSize(e),s=typeof i>"u"?this.getViewSize(e):G.Invisible(i),r=this.removeView(e);this.addView(r,s,t)}swapViews(e,t){if(this.state!==0)throw new Error("Cant modify splitview");if(e>t)return this.swapViews(t,e);const i=this.getViewSize(e),s=this.getViewSize(t),r=this.removeView(t),h=this.removeView(e);this.addView(r,i,e),this.addView(h,s,t)}isViewVisible(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].visible}setViewVisible(e,t){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");this.viewItems[e].setVisible(t),this.distributeEmptySpace(e),this.layoutViews(),this.saveProportions()}getViewCachedVisibleSize(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].cachedVisibleSize}layout(e,t){const i=Math.max(this.size,this._contentSize);if(this.size=e,this.layoutContext=t,this.proportions){let s=0;for(let r=0;r<this.viewItems.length;r++){const h=this.viewItems[r],n=this.proportions[r];typeof n=="number"?s+=n:e-=h.size}for(let r=0;r<this.viewItems.length;r++){const h=this.viewItems[r],n=this.proportions[r];typeof n=="number"&&s>0&&(h.size=z(Math.round(n*e/s),h.minimumSize,h.maximumSize))}}else{const s=b(this.viewItems.length),r=s.filter(n=>this.viewItems[n].priority===1),h=s.filter(n=>this.viewItems[n].priority===2);this.resize(this.viewItems.length-1,e-i,void 0,r,h)}this.distributeEmptySpace(),this.layoutViews()}saveProportions(){this.proportionalLayout&&this._contentSize>0&&(this.proportions=this.viewItems.map(e=>e.proportionalLayout&&e.visible?e.size/this._contentSize:void 0))}onSashStart({sash:e,start:t,alt:i}){for(const n of this.viewItems)n.enabled=!1;const s=this.sashItems.findIndex(n=>n.sash===e),r=O(H(this.el.ownerDocument.body,"keydown",n=>h(this.sashDragState.current,n.altKey)),H(this.el.ownerDocument.body,"keyup",()=>h(this.sashDragState.current,!1))),h=(n,a)=>{const m=this.viewItems.map(v=>v.size);let p=Number.NEGATIVE_INFINITY,c=Number.POSITIVE_INFINITY;if(this.inverseAltBehavior&&(a=!a),a)if(s===this.sashItems.length-1){const d=this.viewItems[s];p=(d.minimumSize-d.size)/2,c=(d.maximumSize-d.size)/2}else{const d=this.viewItems[s+1];p=(d.size-d.maximumSize)/2,c=(d.size-d.minimumSize)/2}let w,S;if(!a){const v=b(s,-1),d=b(s+1,this.viewItems.length),I=v.reduce((o,u)=>o+(this.viewItems[u].minimumSize-m[u]),0),x=v.reduce((o,u)=>o+(this.viewItems[u].viewMaximumSize-m[u]),0),g=d.length===0?Number.POSITIVE_INFINITY:d.reduce((o,u)=>o+(m[u]-this.viewItems[u].minimumSize),0),E=d.length===0?Number.NEGATIVE_INFINITY:d.reduce((o,u)=>o+(m[u]-this.viewItems[u].viewMaximumSize),0),D=Math.max(I,E),T=Math.min(g,x),f=this.findFirstSnapIndex(v),l=this.findFirstSnapIndex(d);if(typeof f=="number"){const o=this.viewItems[f],u=Math.floor(o.viewMinimumSize/2);w={index:f,limitDelta:o.visible?D-u:D+u,size:o.size}}if(typeof l=="number"){const o=this.viewItems[l],u=Math.floor(o.viewMinimumSize/2);S={index:l,limitDelta:o.visible?T+u:T-u,size:o.size}}}this.sashDragState={start:n,current:n,index:s,sizes:m,minDelta:p,maxDelta:c,alt:a,snapBefore:w,snapAfter:S,disposable:r}};h(t,i)}onSashChange({current:e}){const{index:t,start:i,sizes:s,alt:r,minDelta:h,maxDelta:n,snapBefore:a,snapAfter:m}=this.sashDragState;this.sashDragState.current=e;const p=e-i,c=this.resize(t,p,s,void 0,void 0,h,n,a,m);if(r){const w=t===this.sashItems.length-1,S=this.viewItems.map(E=>E.size),v=w?t:t+1,d=this.viewItems[v],I=d.size-d.maximumSize,x=d.size-d.minimumSize,g=w?t-1:t+1;this.resize(g,-c,S,void 0,void 0,I,x)}this.distributeEmptySpace(),this.layoutViews()}onSashEnd(e){this._onDidSashChange.fire(e),this.sashDragState.disposable.dispose(),this.saveProportions();for(const t of this.viewItems)t.enabled=!0}onViewChange(e,t){const i=this.viewItems.indexOf(e);i<0||i>=this.viewItems.length||(t=typeof t=="number"?t:e.size,t=z(t,e.minimumSize,e.maximumSize),this.inverseAltBehavior&&i>0?(this.resize(i-1,Math.floor((e.size-t)/2)),this.distributeEmptySpace(),this.layoutViews()):(e.size=t,this.relayout([i],void 0)))}resizeView(e,t){if(!(e<0||e>=this.viewItems.length)){if(this.state!==0)throw new Error("Cant modify splitview");this.state=1;try{const i=b(this.viewItems.length).filter(n=>n!==e),s=[...i.filter(n=>this.viewItems[n].priority===1),e],r=i.filter(n=>this.viewItems[n].priority===2),h=this.viewItems[e];t=Math.round(t),t=z(t,h.minimumSize,Math.min(h.maximumSize,this.size)),h.size=t,this.relayout(s,r)}finally{this.state=0}}}isViewExpanded(e){if(e<0||e>=this.viewItems.length)return!1;for(const t of this.viewItems)if(t!==this.viewItems[e]&&t.size>t.minimumSize)return!1;return!0}distributeViewSizes(){const e=[];let t=0;for(const n of this.viewItems)n.maximumSize-n.minimumSize>0&&(e.push(n),t+=n.size);const i=Math.floor(t/e.length);for(const n of e)n.size=z(i,n.minimumSize,n.maximumSize);const s=b(this.viewItems.length),r=s.filter(n=>this.viewItems[n].priority===1),h=s.filter(n=>this.viewItems[n].priority===2);this.relayout(r,h)}getViewSize(e){return e<0||e>=this.viewItems.length?-1:this.viewItems[e].size}doAddView(e,t,i=this.viewItems.length,s){if(this.state!==0)throw new Error("Cant modify splitview");this.state=1;try{const r=M(".split-view-view");i===this.viewItems.length?this.viewContainer.appendChild(r):this.viewContainer.insertBefore(r,this.viewContainer.children.item(i));const h=e.onDidChange(w=>this.onViewChange(p,w)),n=Q(()=>r.remove()),a=O(h,n);let m;typeof t=="number"?m=t:(t.type==="auto"&&(this.areViewsDistributed()?t={type:"distribute"}:t={type:"split",index:t.index}),t.type==="split"?m=this.getViewSize(t.index)/2:t.type==="invisible"?m={cachedVisibleSize:t.cachedVisibleSize}:m=e.minimumSize);const p=this.orientation===y.VERTICAL?new ne(r,e,m,a):new oe(r,e,m,a);if(this.viewItems.splice(i,0,p),this.viewItems.length>1){const w={orthogonalStartSash:this.orthogonalStartSash,orthogonalEndSash:this.orthogonalEndSash},S=this.orientation===y.VERTICAL?new Y(this.sashContainer,{getHorizontalSashTop:o=>this.getSashPosition(o),getHorizontalSashWidth:this.getSashOrthogonalSize},{...w,orientation:y.HORIZONTAL}):new Y(this.sashContainer,{getVerticalSashLeft:o=>this.getSashPosition(o),getVerticalSashHeight:this.getSashOrthogonalSize},{...w,orientation:y.VERTICAL}),v=this.orientation===y.VERTICAL?o=>({sash:S,start:o.startY,current:o.currentY,alt:o.altKey}):o=>({sash:S,start:o.startX,current:o.currentX,alt:o.altKey}),I=B.map(S.onDidStart,v)(this.onSashStart,this),g=B.map(S.onDidChange,v)(this.onSashChange,this),D=B.map(S.onDidEnd,()=>this.sashItems.findIndex(o=>o.sash===S))(this.onSashEnd,this),T=S.onDidReset(()=>{const o=this.sashItems.findIndex(K=>K.sash===S),u=b(o,-1),V=b(o+1,this.viewItems.length),C=this.findFirstSnapIndex(u),F=this.findFirstSnapIndex(V);typeof C=="number"&&!this.viewItems[C].visible||typeof F=="number"&&!this.viewItems[F].visible||this._onDidSashReset.fire(o)}),f=O(I,g,D,T,S),l={sash:S,disposable:f};this.sashItems.splice(i-1,0,l)}r.appendChild(e.element);let c;typeof t!="number"&&t.type==="split"&&(c=[t.index]),s||this.relayout([i],c),!s&&typeof t!="number"&&t.type==="distribute"&&this.distributeViewSizes()}finally{this.state=0}}relayout(e,t){const i=this.viewItems.reduce((s,r)=>s+r.size,0);this.resize(this.viewItems.length-1,this.size-i,void 0,e,t),this.distributeEmptySpace(),this.layoutViews(),this.saveProportions()}resize(e,t,i=this.viewItems.map(p=>p.size),s,r,h=Number.NEGATIVE_INFINITY,n=Number.POSITIVE_INFINITY,a,m){if(e<0||e>=this.viewItems.length)return 0;const p=b(e,-1),c=b(e+1,this.viewItems.length);if(r)for(const l of r)P(p,l),P(c,l);if(s)for(const l of s)A(p,l),A(c,l);const w=p.map(l=>this.viewItems[l]),S=p.map(l=>i[l]),v=c.map(l=>this.viewItems[l]),d=c.map(l=>i[l]),I=p.reduce((l,o)=>l+(this.viewItems[o].minimumSize-i[o]),0),x=p.reduce((l,o)=>l+(this.viewItems[o].maximumSize-i[o]),0),g=c.length===0?Number.POSITIVE_INFINITY:c.reduce((l,o)=>l+(i[o]-this.viewItems[o].minimumSize),0),E=c.length===0?Number.NEGATIVE_INFINITY:c.reduce((l,o)=>l+(i[o]-this.viewItems[o].maximumSize),0),D=Math.max(I,E,h),T=Math.min(g,x,n);let f=!1;if(a){const l=this.viewItems[a.index],o=t>=a.limitDelta;f=o!==l.visible,l.setVisible(o,a.size)}if(!f&&m){const l=this.viewItems[m.index],o=t<m.limitDelta;f=o!==l.visible,l.setVisible(o,m.size)}if(f)return this.resize(e,t,i,s,r,h,n);t=z(t,D,T);for(let l=0,o=t;l<w.length;l++){const u=w[l],V=z(S[l]+o,u.minimumSize,u.maximumSize),C=V-S[l];o-=C,u.size=V}for(let l=0,o=t;l<v.length;l++){const u=v[l],V=z(d[l]-o,u.minimumSize,u.maximumSize),C=V-d[l];o+=C,u.size=V}return t}distributeEmptySpace(e){const t=this.viewItems.reduce((n,a)=>n+a.size,0);let i=this.size-t;const s=b(this.viewItems.length-1,-1),r=s.filter(n=>this.viewItems[n].priority===1),h=s.filter(n=>this.viewItems[n].priority===2);for(const n of h)P(s,n);for(const n of r)A(s,n);typeof e=="number"&&A(s,e);for(let n=0;i!==0&&n<s.length;n++){const a=this.viewItems[s[n]],m=z(a.size+i,a.minimumSize,a.maximumSize),p=m-a.size;i-=p,a.size=m}}layoutViews(){this._contentSize=this.viewItems.reduce((t,i)=>t+i.size,0);let e=0;for(const t of this.viewItems)t.layout(e,this.layoutContext),e+=t.size;this.sashItems.forEach(t=>t.sash.layout()),this.updateSashEnablement(),this.updateScrollableElement()}updateScrollableElement(){this.orientation===y.VERTICAL?this.scrollableElement.setScrollDimensions({height:this.size,scrollHeight:this._contentSize}):this.scrollableElement.setScrollDimensions({width:this.size,scrollWidth:this._contentSize})}updateSashEnablement(){let e=!1;const t=this.viewItems.map(a=>e=a.size-a.minimumSize>0||e);e=!1;const i=this.viewItems.map(a=>e=a.maximumSize-a.size>0||e),s=[...this.viewItems].reverse();e=!1;const r=s.map(a=>e=a.size-a.minimumSize>0||e).reverse();e=!1;const h=s.map(a=>e=a.maximumSize-a.size>0||e).reverse();let n=0;for(let a=0;a<this.sashItems.length;a++){const{sash:m}=this.sashItems[a],p=this.viewItems[a];n+=p.size;const c=!(t[a]&&h[a+1]),w=!(i[a]&&r[a+1]);if(c&&w){const S=b(a,-1),v=b(a+1,this.viewItems.length),d=this.findFirstSnapIndex(S),I=this.findFirstSnapIndex(v),x=typeof d=="number"&&!this.viewItems[d].visible,g=typeof I=="number"&&!this.viewItems[I].visible;x&&r[a]&&(n>0||this.startSnappingEnabled)?m.state=L.AtMinimum:g&&t[a]&&(n<this._contentSize||this.endSnappingEnabled)?m.state=L.AtMaximum:m.state=L.Disabled}else c&&!w?m.state=L.AtMinimum:!c&&w?m.state=L.AtMaximum:m.state=L.Enabled}}getSashPosition(e){let t=0;for(let i=0;i<this.sashItems.length;i++)if(t+=this.viewItems[i].size,this.sashItems[i].sash===e)return t;return 0}findFirstSnapIndex(e){for(const t of e){const i=this.viewItems[t];if(i.visible&&i.snap)return t}for(const t of e){const i=this.viewItems[t];if(i.visible&&i.maximumSize-i.minimumSize>0)return;if(!i.visible&&i.snap)return t}}areViewsDistributed(){let e,t;for(const i of this.viewItems)if(e=e===void 0?i.size:Math.min(e,i.size),t=t===void 0?i.size:Math.max(t,i.size),t-e>2)return!1;return!0}dispose(){this.sashDragState?.disposable.dispose(),J(this.viewItems),this.viewItems=[],this.sashItems.forEach(e=>e.disposable.dispose()),this.sashItems=[],super.dispose()}}export{se as LayoutPriority,xe as Orientation,G as Sizing,ye as SplitView};
