import{Dimension as a}from"../../dom.js";import{Orientation as o,OrthogonalEdge as S,Sash as n,SashState as h}from"../sash/sash.js";import{Emitter as _,Event as r}from"../../../common/event.js";import{DisposableStore as m}from"../../../common/lifecycle.js";class g{domNode;_onDidWillResize=new _;onDidWillResize=this._onDidWillResize.event;_onDidResize=new _;onDidResize=this._onDidResize.event;_northSash;_eastSash;_southSash;_westSash;_sashListener=new m;_size=new a(0,0);_minSize=new a(0,0);_maxSize=new a(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER);_preferredSize;constructor(){this.domNode=document.createElement("div"),this._eastSash=new n(this.domNode,{getVerticalSashLeft:()=>this._size.width},{orientation:o.VERTICAL}),this._westSash=new n(this.domNode,{getVerticalSashLeft:()=>0},{orientation:o.VERTICAL}),this._northSash=new n(this.domNode,{getHorizontalSashTop:()=>0},{orientation:o.HORIZONTAL,orthogonalEdge:S.North}),this._southSash=new n(this.domNode,{getHorizontalSashTop:()=>this._size.height},{orientation:o.HORIZONTAL,orthogonalEdge:S.South}),this._northSash.orthogonalStartSash=this._westSash,this._northSash.orthogonalEndSash=this._eastSash,this._southSash.orthogonalStartSash=this._westSash,this._southSash.orthogonalEndSash=this._eastSash;let e,t=0,i=0;this._sashListener.add(r.any(this._northSash.onDidStart,this._eastSash.onDidStart,this._southSash.onDidStart,this._westSash.onDidStart)(()=>{e===void 0&&(this._onDidWillResize.fire(),e=this._size,t=0,i=0)})),this._sashListener.add(r.any(this._northSash.onDidEnd,this._eastSash.onDidEnd,this._southSash.onDidEnd,this._westSash.onDidEnd)(()=>{e!==void 0&&(e=void 0,t=0,i=0,this._onDidResize.fire({dimension:this._size,done:!0}))})),this._sashListener.add(this._eastSash.onDidChange(s=>{e&&(i=s.currentX-s.startX,this.layout(e.height+t,e.width+i),this._onDidResize.fire({dimension:this._size,done:!1,east:!0}))})),this._sashListener.add(this._westSash.onDidChange(s=>{e&&(i=-(s.currentX-s.startX),this.layout(e.height+t,e.width+i),this._onDidResize.fire({dimension:this._size,done:!1,west:!0}))})),this._sashListener.add(this._northSash.onDidChange(s=>{e&&(t=-(s.currentY-s.startY),this.layout(e.height+t,e.width+i),this._onDidResize.fire({dimension:this._size,done:!1,north:!0}))})),this._sashListener.add(this._southSash.onDidChange(s=>{e&&(t=s.currentY-s.startY,this.layout(e.height+t,e.width+i),this._onDidResize.fire({dimension:this._size,done:!1,south:!0}))})),this._sashListener.add(r.any(this._eastSash.onDidReset,this._westSash.onDidReset)(s=>{this._preferredSize&&(this.layout(this._size.height,this._preferredSize.width),this._onDidResize.fire({dimension:this._size,done:!0}))})),this._sashListener.add(r.any(this._northSash.onDidReset,this._southSash.onDidReset)(s=>{this._preferredSize&&(this.layout(this._preferredSize.height,this._size.width),this._onDidResize.fire({dimension:this._size,done:!0}))}))}dispose(){this._northSash.dispose(),this._southSash.dispose(),this._eastSash.dispose(),this._westSash.dispose(),this._sashListener.dispose(),this._onDidResize.dispose(),this._onDidWillResize.dispose(),this.domNode.remove()}enableSashes(e,t,i,s){this._northSash.state=e?h.Enabled:h.Disabled,this._eastSash.state=t?h.Enabled:h.Disabled,this._southSash.state=i?h.Enabled:h.Disabled,this._westSash.state=s?h.Enabled:h.Disabled}layout(e=this.size.height,t=this.size.width){const{height:i,width:s}=this._minSize,{height:l,width:z}=this._maxSize;e=Math.max(i,Math.min(l,e)),t=Math.max(s,Math.min(z,t));const d=new a(t,e);a.equals(d,this._size)||(this.domNode.style.height=e+"px",this.domNode.style.width=t+"px",this._size=d,this._northSash.layout(),this._eastSash.layout(),this._southSash.layout(),this._westSash.layout())}clearSashHoverState(){this._eastSash.clearSashHoverState(),this._westSash.clearSashHoverState(),this._northSash.clearSashHoverState(),this._southSash.clearSashHoverState()}get size(){return this._size}set maxSize(e){this._maxSize=e}get maxSize(){return this._maxSize}set minSize(e){this._minSize=e}get minSize(){return this._minSize}set preferredSize(e){this._preferredSize=e}get preferredSize(){return this._preferredSize}}export{g as ResizableHTMLElement};
