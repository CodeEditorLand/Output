import{$u9 as Y}from"../../browser.js";import{EventType as M,$w$ as R}from"../../touch.js";import{$ as b,$V9 as h,$Z0 as p,$U9 as V,$c0 as O,$U0 as d,$S0 as m,$x0 as $,getWindow as S,$p0 as x,$v0 as U}from"../../dom.js";import{$f_ as T}from"../../domStylesheets.js";import{$O9 as g}from"../../keyboardEvent.js";import{$I9 as P}from"../../mouseEvent.js";import{$X$ as X}from"../actionbar/actionbar.js";import{$dab as K,$cab as Q}from"../actionbar/actionViewItems.js";import{$M$ as Z}from"../scrollbar/scrollableElement.js";import{$Jm as j,$Hm as k,$Im as H}from"../../../common/actions.js";import{$ji as I}from"../../../common/async.js";import{$bk as y}from"../../../common/codicons.js";import{$0j as G}from"../../../common/codiconsUtil.js";import{ThemeIcon as _}from"../../../common/themables.js";import{$fk as J}from"../../../common/iconLabels.js";import{$Dd as ee}from"../../../common/lifecycle.js";import{$o as W,$n as te}from"../../../common/platform.js";import*as z from"../../../common/strings.js";import{$Z$ as N}from"../../../common/layout.js";const D=/\(&([^\s&])\)|(^|[^&])&([^\s&])/,A=/(&amp;)?(&amp;)([^\s&])/g;var C;(function(r){r[r.Right=0]="Right",r[r.Left=1]="Left"})(C||(C={}));var L;(function(r){r[r.Above=0]="Above",r[r.Below=1]="Below"})(L||(L={}));const Se={shadowColor:void 0,borderColor:void 0,foregroundColor:void 0,backgroundColor:void 0,selectionForegroundColor:void 0,selectionBackgroundColor:void 0,selectionBorderColor:void 0,separatorColor:void 0,scrollbarShadow:void 0,scrollbarSliderBackground:void 0,scrollbarSliderHoverBackground:void 0,scrollbarSliderActiveBackground:void 0};class v extends X{constructor(e,t,i,n){e.classList.add("monaco-menu-container"),e.setAttribute("role","presentation");const o=document.createElement("div");o.classList.add("monaco-menu"),o.setAttribute("role","presentation"),super(o,{orientation:1,actionViewItemProvider:a=>this.fb(a,i,c),context:i.context,actionRunner:i.actionRunner,ariaLabel:i.ariaLabel,ariaRole:"menu",focusOnlyEnabledItems:!0,triggerKeys:{keys:[3,...te||W?[10]:[]],keyDown:!0}}),this.Z=n,this.X=o,this.z.tabIndex=0,this.ab(e,n),this.D(R.addTarget(o)),this.D(h(o,m.KEY_DOWN,a=>{new g(a).equals(2)&&a.preventDefault()})),i.enableMnemonics&&this.D(h(o,m.KEY_DOWN,a=>{const s=a.key.toLocaleLowerCase(),l=this.U.get(s);if(l!==void 0&&(d.stop(a,!0),l.length===1&&(l[0]instanceof E&&l[0].container&&this.cb(l[0].container),l[0].onClick(a)),l.length>1)){const w=l.shift();w&&w.container&&(this.cb(w.container),l.push(w)),this.U.set(s,l)}})),W&&this.D(h(o,m.KEY_DOWN,a=>{const s=new g(a);s.equals(14)||s.equals(11)?(this.t=this.viewItems.length-1,this.P(),d.stop(a,!0)):(s.equals(13)||s.equals(12))&&(this.t=0,this.Q(),d.stop(a,!0))})),this.D(h(this.domNode,m.MOUSE_OUT,a=>{const s=a.relatedTarget;x(s,this.domNode)||(this.t=void 0,this.R(),a.stopPropagation())})),this.D(h(this.z,m.MOUSE_OVER,a=>{let s=a.target;if(!(!s||!x(s,this.z)||s===this.z)){for(;s.parentElement!==this.z&&s.parentElement!==null;)s=s.parentElement;if(s.classList.contains("action-item")){const l=this.t;this.db(s),l!==this.t&&this.R()}}})),this.D(R.addTarget(this.z)),this.D(h(this.z,M.Tap,a=>{let s=a.initialTarget;if(!(!s||!x(s,this.z)||s===this.z)){for(;s.parentElement!==this.z&&s.parentElement!==null;)s=s.parentElement;if(s.classList.contains("action-item")){const l=this.t;this.db(s),l!==this.t&&this.R()}}}));const c={parent:this};this.U=new Map,this.W=this.D(new Z(o,{alwaysConsumeMouseWheel:!0,horizontal:2,vertical:3,verticalScrollbarSize:7,handleMouseWheel:!0,useShadows:!0}));const u=this.W.getDomNode();u.style.position="",this.bb(u,n),this.D(h(o,M.Change,a=>{d.stop(a,!0);const s=this.W.getScrollPosition().scrollTop;this.W.setScrollPosition({scrollTop:s-a.translationY})})),this.D(h(u,m.MOUSE_UP,a=>{a.preventDefault()}));const f=S(e);o.style.maxHeight=`${Math.max(10,f.innerHeight-e.getBoundingClientRect().top-35)}px`,t=t.filter((a,s)=>!(i.submenuIds?.has(a.id)||a instanceof k&&(s===t.length-1||s===0||t[s-1]instanceof k))),this.push(t,{icon:!0,label:!0,isMenu:!0}),e.appendChild(this.W.getDomNode()),this.W.scanDomNode(),this.viewItems.filter(a=>!(a instanceof q)).forEach((a,s,l)=>{a.updatePositionInSet(s+1,l.length)})}ab(e,t){this.Y||(U(e)?this.Y=T(e):(v.globalStyleSheet||(v.globalStyleSheet=T()),this.Y=v.globalStyleSheet)),this.Y.textContent=oe(t,U(e))}bb(e,t){const i=t.foregroundColor??"",n=t.backgroundColor??"",o=t.borderColor?`1px solid ${t.borderColor}`:"",c="5px",u=t.shadowColor?`0 2px 8px ${t.shadowColor}`:"";e.style.outline=o,e.style.borderRadius=c,e.style.color=i,e.style.backgroundColor=n,e.style.boxShadow=u}getContainer(){return this.W.getDomNode()}get onScroll(){return this.W.onScroll}get scrollOffset(){return this.X.scrollTop}trigger(e){if(e<=this.viewItems.length&&e>=0){const t=this.viewItems[e];if(t instanceof E)super.focus(e),t.open(!0);else if(t instanceof B)super.run(t._action,t._context);else return}}cb(e){const t=this.t;this.db(e),t!==this.t&&this.R()}db(e){for(let t=0;t<this.z.children.length;t++){const i=this.z.children[t];if(e===i){this.t=t;break}}}R(e){super.R(e,!0,!0),typeof this.t<"u"&&this.W.setScrollPosition({scrollTop:Math.round(this.X.scrollTop)})}fb(e,t,i){if(e instanceof k)return new q(t.context,e,{icon:!0},this.Z);if(e instanceof H){const n=new E(e,e.actions,i,{...t,submenuIds:new Set([...t.submenuIds||[],e.id])},this.Z);if(t.enableMnemonics){const o=n.getMnemonic();if(o&&n.isEnabled()){const c=this.U.get(o);c!==void 0?c.push(n):this.U.set(o,[n])}}return n}else{const n=t.getKeyBinding?.(e)?.getLabel(),o={enableMnemonics:t.enableMnemonics,useEventAsContext:t.useEventAsContext,keybinding:n},c=new B(t.context,e,o,this.Z);if(t.enableMnemonics){const u=c.getMnemonic();if(u&&c.isEnabled()){const f=this.U.get(u);f!==void 0?f.push(c):this.U.set(u,[c])}}return c}}}class B extends Q{constructor(e,t,i,n){if(i={...i,isMenu:!0,icon:i.icon!==void 0?i.icon:!1,label:i.label!==void 0?i.label:!0},super(t,t,i),this.r=n,this.z=i,this.q="",this.z.label&&i.enableMnemonics){const o=this.action.label;if(o){const c=D.exec(o);c&&(this.n=(c[1]?c[1]:c[3]).toLocaleLowerCase())}}this.g=new I(()=>{this.element&&(this.D(h(this.element,m.MOUSE_UP,o=>{if(d.stop(o,!0),Y){if(new P(S(this.element),o).rightButton)return;this.onClick(o)}else setTimeout(()=>{this.onClick(o)},0)})),this.D(h(this.element,m.CONTEXT_MENU,o=>{d.stop(o,!0)})))},100),this.D(this.g)}render(e){super.render(e),this.element&&(this.container=e,this.f=p(this.element,b("a.action-menu-item")),this._action.id===k.ID?this.f.setAttribute("role","presentation"):(this.f.setAttribute("role","menuitem"),this.n&&this.f.setAttribute("aria-keyshortcuts",`${this.n}`)),this.m=p(this.f,b("span.menu-item-check"+_.asCSSSelector(y.menuSelection))),this.m.setAttribute("role","none"),this.h=p(this.f,b("span.action-label")),this.z.label&&this.z.keybinding&&(p(this.f,b("span.keybinding")).textContent=this.z.keybinding),this.g.schedule(),this.N(),this.G(),this.L(),this.F(),this.O(),this.Q())}blur(){super.blur(),this.Q()}focus(){super.focus(),this.f?.focus(),this.Q()}updatePositionInSet(e,t){this.f&&(this.f.setAttribute("aria-posinset",`${e}`),this.f.setAttribute("aria-setsize",`${t}`))}G(){if(this.h&&this.z.label){V(this.h);let e=J(this.action.label);if(e){const t=ie(e);this.z.enableMnemonics||(e=t),this.h.setAttribute("aria-label",t.replace(/&&/g,"&"));const i=D.exec(e);if(i){e=z.$Yf(e),A.lastIndex=0;let n=A.exec(e);for(;n&&n[1];)n=A.exec(e);const o=c=>c.replace(/&amp;&amp;/g,"&amp;");n?this.h.append(z.$5f(o(e.substr(0,n.index))," "),b("u",{"aria-hidden":"true"},n[3]),z.$6f(o(e.substr(n.index+n[0].length))," ")):this.h.textContent=o(e).trim(),this.f?.setAttribute("aria-keyshortcuts",(i[1]?i[1]:i[3]).toLocaleLowerCase())}else this.h.textContent=e.replace(/&&/g,"&").trim()}}}L(){}N(){this.q&&this.f&&this.f.classList.remove(...this.q.split(" ")),this.z.icon&&this.h?(this.q=this.action.class||"",this.h.classList.add("icon"),this.q&&this.h.classList.add(...this.q.split(" ")),this.F()):this.h&&this.h.classList.remove("icon")}F(){this.action.enabled?(this.element&&(this.element.classList.remove("disabled"),this.element.removeAttribute("aria-disabled")),this.f&&(this.f.classList.remove("disabled"),this.f.removeAttribute("aria-disabled"),this.f.tabIndex=0)):(this.element&&(this.element.classList.add("disabled"),this.element.setAttribute("aria-disabled","true")),this.f&&(this.f.classList.add("disabled"),this.f.setAttribute("aria-disabled","true")))}O(){if(!this.f)return;const e=this.action.checked;this.f.classList.toggle("checked",!!e),e!==void 0?(this.f.setAttribute("role","menuitemcheckbox"),this.f.setAttribute("aria-checked",e?"true":"false")):(this.f.setAttribute("role","menuitem"),this.f.setAttribute("aria-checked",""))}getMnemonic(){return this.n}Q(){const e=this.element&&this.element.classList.contains("focused"),t=e&&this.r.selectionForegroundColor?this.r.selectionForegroundColor:this.r.foregroundColor,i=e&&this.r.selectionBackgroundColor?this.r.selectionBackgroundColor:void 0,n=e&&this.r.selectionBorderColor?`1px solid ${this.r.selectionBorderColor}`:"",o=e&&this.r.selectionBorderColor?"-1px":"";this.f&&(this.f.style.color=t??"",this.f.style.backgroundColor=i??"",this.f.style.outline=n,this.f.style.outlineOffset=o),this.m&&(this.m.style.color=t??"")}}class E extends B{constructor(e,t,i,n,o){super(e,e,n,o),this.bb=t,this.cb=i,this.db=n,this.R=null,this.W=this.D(new ee),this.X=!1,this.ab=n&&n.expandDirection!==void 0?n.expandDirection:{horizontal:C.Right,vertical:L.Below},this.Y=new I(()=>{this.X&&(this.fb(!1),this.hb(!1))},250),this.Z=new I(()=>{this.element&&!x($(),this.element)&&this.cb.submenu===this.R&&(this.cb.parent.focus(!1),this.fb(!0))},750)}render(e){super.render(e),this.element&&(this.f&&(this.f.classList.add("monaco-submenu-item"),this.f.tabIndex=0,this.f.setAttribute("aria-haspopup","true"),this.ib("false"),this.U=p(this.f,b("span.submenu-indicator"+_.asCSSSelector(y.menuSubmenu))),this.U.setAttribute("aria-hidden","true")),this.D(h(this.element,m.KEY_UP,t=>{const i=new g(t);(i.equals(17)||i.equals(3))&&(d.stop(t,!0),this.hb(!0))})),this.D(h(this.element,m.KEY_DOWN,t=>{const i=new g(t);$()===this.f&&(i.equals(17)||i.equals(3))&&d.stop(t,!0)})),this.D(h(this.element,m.MOUSE_OVER,t=>{this.X||(this.X=!0,this.Y.schedule())})),this.D(h(this.element,m.MOUSE_LEAVE,t=>{this.X=!1})),this.D(h(this.element,m.FOCUS_OUT,t=>{this.element&&!x($(),this.element)&&this.Z.schedule()})),this.D(this.cb.parent.onScroll(()=>{this.cb.submenu===this.R&&(this.cb.parent.focus(!1),this.fb(!0))})))}F(){}open(e){this.fb(!1),this.hb(e)}onClick(e){d.stop(e,!0),this.fb(!1),this.hb(!0)}fb(e){if(this.cb.submenu&&(e||this.cb.submenu!==this.R)){try{this.cb.submenu.dispose()}catch{}this.cb.submenu=void 0,this.ib("false"),this.S&&(this.W.clear(),this.S=void 0)}}gb(e,t,i,n){const o={top:0,left:0};return o.left=N(e.width,t.width,{position:n.horizontal===C.Right?0:1,offset:i.left,size:i.width}).position,o.left>=i.left&&o.left<i.left+i.width&&(i.left+10+t.width<=e.width&&(o.left=i.left+10),i.top+=10,i.height=0),o.top=N(e.height,t.height,{position:0,offset:i.top,size:0}).position,o.top+t.height===i.top&&o.top+i.height+t.height<=e.height&&(o.top+=i.height),o}hb(e=!0){if(this.element)if(this.cb.submenu)this.cb.submenu.focus(!1);else{this.ib("true"),this.S=p(this.element,b("div.monaco-submenu")),this.S.classList.add("menubar-menu-items-holder","context-view");const t=S(this.cb.parent.domNode).getComputedStyle(this.cb.parent.domNode),i=parseFloat(t.paddingTop||"0")||0;this.S.style.position="fixed",this.S.style.top="0",this.S.style.left="0",this.S.style.zIndex="1",this.cb.submenu=new v(this.S,this.bb.length?this.bb:[new j],this.db,this.r);const n=this.element.getBoundingClientRect(),o={top:n.top-i,left:n.left,height:n.height+2*i,width:n.width},c=this.S.getBoundingClientRect(),u=S(this.element),{top:f,left:a}=this.gb(new O(u.innerWidth,u.innerHeight),O.lift(c),o,this.ab);this.S.style.left=`${a-c.left}px`,this.S.style.top=`${f-c.top}px`,this.W.add(h(this.S,m.KEY_UP,s=>{new g(s).equals(15)&&(d.stop(s,!0),this.cb.parent.focus(),this.fb(!0))})),this.W.add(h(this.S,m.KEY_DOWN,s=>{new g(s).equals(15)&&d.stop(s,!0)})),this.W.add(this.cb.submenu.onDidCancel(()=>{this.cb.parent.focus(),this.fb(!0)})),this.cb.submenu.focus(e),this.R=this.cb.submenu}}ib(e){this.f&&this.f?.setAttribute("aria-expanded",e)}Q(){super.Q();const t=this.element&&this.element.classList.contains("focused")&&this.r.selectionForegroundColor?this.r.selectionForegroundColor:this.r.foregroundColor;this.U&&(this.U.style.color=t??"")}dispose(){super.dispose(),this.Z.dispose(),this.R&&(this.R.dispose(),this.R=null),this.S&&(this.S=void 0)}}class q extends K{constructor(e,t,i,n){super(e,t,i),this.b=n}render(e){super.render(e),this.f&&(this.f.style.borderBottomColor=this.b.separatorColor?`${this.b.separatorColor}`:"")}}function ie(r){const e=D,t=e.exec(r);if(!t)return r;const i=!t[1];return r.replace(e,i?"$2$3":"").trim()}function F(r){const e=G()[r.id];return`.codicon-${r.id}:before { content: '\\${e.toString(16)}'; }`}function oe(r,e){let t=`
.monaco-menu {
	font-size: 13px;
	border-radius: 5px;
	min-width: 160px;
}

${F(y.menuSelection)}
${F(y.menuSubmenu)}

.monaco-menu .monaco-action-bar {
	text-align: right;
	overflow: hidden;
	white-space: nowrap;
}

.monaco-menu .monaco-action-bar .actions-container {
	display: flex;
	margin: 0 auto;
	padding: 0;
	width: 100%;
	justify-content: flex-end;
}

.monaco-menu .monaco-action-bar.vertical .actions-container {
	display: inline-block;
}

.monaco-menu .monaco-action-bar.reverse .actions-container {
	flex-direction: row-reverse;
}

.monaco-menu .monaco-action-bar .action-item {
	cursor: pointer;
	display: inline-block;
	transition: transform 50ms ease;
	position: relative;  /* DO NOT REMOVE - this is the key to preventing the ghosting icon bug in Chrome 42 */
}

.monaco-menu .monaco-action-bar .action-item.disabled {
	cursor: default;
}

.monaco-menu .monaco-action-bar .action-item .icon,
.monaco-menu .monaco-action-bar .action-item .codicon {
	display: inline-block;
}

.monaco-menu .monaco-action-bar .action-item .codicon {
	display: flex;
	align-items: center;
}

.monaco-menu .monaco-action-bar .action-label {
	font-size: 11px;
	margin-right: 4px;
}

.monaco-menu .monaco-action-bar .action-item.disabled .action-label,
.monaco-menu .monaco-action-bar .action-item.disabled .action-label:hover {
	color: var(--vscode-disabledForeground);
}

/* Vertical actions */

.monaco-menu .monaco-action-bar.vertical {
	text-align: left;
}

.monaco-menu .monaco-action-bar.vertical .action-item {
	display: block;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator {
	display: block;
	border-bottom: 1px solid var(--vscode-menu-separatorBackground);
	padding-top: 1px;
	padding: 30px;
}

.monaco-menu .secondary-actions .monaco-action-bar .action-label {
	margin-left: 6px;
}

/* Action Items */
.monaco-menu .monaco-action-bar .action-item.select-container {
	overflow: hidden; /* somehow the dropdown overflows its container, we prevent it here to not push */
	flex: 1;
	max-width: 170px;
	min-width: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
}

.monaco-menu .monaco-action-bar.vertical {
	margin-left: 0;
	overflow: visible;
}

.monaco-menu .monaco-action-bar.vertical .actions-container {
	display: block;
}

.monaco-menu .monaco-action-bar.vertical .action-item {
	padding: 0;
	transform: none;
	display: flex;
}

.monaco-menu .monaco-action-bar.vertical .action-item.active {
	transform: none;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item {
	flex: 1 1 auto;
	display: flex;
	height: 2em;
	align-items: center;
	position: relative;
	margin: 0 4px;
	border-radius: 4px;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item:hover .keybinding,
.monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .keybinding {
	opacity: unset;
}

.monaco-menu .monaco-action-bar.vertical .action-label {
	flex: 1 1 auto;
	text-decoration: none;
	padding: 0 1em;
	background: none;
	font-size: 12px;
	line-height: 1;
}

.monaco-menu .monaco-action-bar.vertical .keybinding,
.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	display: inline-block;
	flex: 2 1 auto;
	padding: 0 1em;
	text-align: right;
	font-size: 12px;
	line-height: 1;
	opacity: 0.7;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	height: 100%;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon {
	font-size: 16px !important;
	display: flex;
	align-items: center;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon::before {
	margin-left: auto;
	margin-right: -20px;
}

.monaco-menu .monaco-action-bar.vertical .action-item.disabled .keybinding,
.monaco-menu .monaco-action-bar.vertical .action-item.disabled .submenu-indicator {
	opacity: 0.4;
}

.monaco-menu .monaco-action-bar.vertical .action-label:not(.separator) {
	display: inline-block;
	box-sizing: border-box;
	margin: 0;
}

.monaco-menu .monaco-action-bar.vertical .action-item {
	position: static;
	overflow: visible;
}

.monaco-menu .monaco-action-bar.vertical .action-item .monaco-submenu {
	position: absolute;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator {
	width: 100%;
	height: 0px !important;
	opacity: 1;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator.text {
	padding: 0.7em 1em 0.1em 1em;
	font-weight: bold;
	opacity: 1;
}

.monaco-menu .monaco-action-bar.vertical .action-label:hover {
	color: inherit;
}

.monaco-menu .monaco-action-bar.vertical .menu-item-check {
	position: absolute;
	visibility: hidden;
	width: 1em;
	height: 100%;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item.checked .menu-item-check {
	visibility: visible;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Context Menu */

.context-view.monaco-menu-container {
	outline: 0;
	border: none;
	animation: fadeIn 0.083s linear;
	-webkit-app-region: no-drag;
}

.context-view.monaco-menu-container :focus,
.context-view.monaco-menu-container .monaco-action-bar.vertical:focus,
.context-view.monaco-menu-container .monaco-action-bar.vertical :focus {
	outline: 0;
}

.hc-black .context-view.monaco-menu-container,
.hc-light .context-view.monaco-menu-container,
:host-context(.hc-black) .context-view.monaco-menu-container,
:host-context(.hc-light) .context-view.monaco-menu-container {
	box-shadow: none;
}

.hc-black .monaco-menu .monaco-action-bar.vertical .action-item.focused,
.hc-light .monaco-menu .monaco-action-bar.vertical .action-item.focused,
:host-context(.hc-black) .monaco-menu .monaco-action-bar.vertical .action-item.focused,
:host-context(.hc-light) .monaco-menu .monaco-action-bar.vertical .action-item.focused {
	background: none;
}

/* Vertical Action Bar Styles */

.monaco-menu .monaco-action-bar.vertical {
	padding: 4px 0;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item {
	height: 2em;
}

.monaco-menu .monaco-action-bar.vertical .action-label:not(.separator),
.monaco-menu .monaco-action-bar.vertical .keybinding {
	font-size: inherit;
	padding: 0 2em;
	max-height: 100%;
}

.monaco-menu .monaco-action-bar.vertical .menu-item-check {
	font-size: inherit;
	width: 2em;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator {
	font-size: inherit;
	margin: 5px 0 !important;
	padding: 0;
	border-radius: 0;
}

.linux .monaco-menu .monaco-action-bar.vertical .action-label.separator,
:host-context(.linux) .monaco-menu .monaco-action-bar.vertical .action-label.separator {
	margin-left: 0;
	margin-right: 0;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	font-size: 60%;
	padding: 0 1.8em;
}

.linux .monaco-menu .monaco-action-bar.vertical .submenu-indicator,
:host-context(.linux) .monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	height: 100%;
	mask-size: 10px 10px;
	-webkit-mask-size: 10px 10px;
}

.monaco-menu .action-item {
	cursor: default;
}`;if(e){t+=`
			/* Arrows */
			.monaco-scrollable-element > .scrollbar > .scra {
				cursor: pointer;
				font-size: 11px !important;
			}

			.monaco-scrollable-element > .visible {
				opacity: 1;

				/* Background rule added for IE9 - to allow clicks on dom node */
				background:rgba(0,0,0,0);

				transition: opacity 100ms linear;
			}
			.monaco-scrollable-element > .invisible {
				opacity: 0;
				pointer-events: none;
			}
			.monaco-scrollable-element > .invisible.fade {
				transition: opacity 800ms linear;
			}

			/* Scrollable Content Inset Shadow */
			.monaco-scrollable-element > .shadow {
				position: absolute;
				display: none;
			}
			.monaco-scrollable-element > .shadow.top {
				display: block;
				top: 0;
				left: 3px;
				height: 3px;
				width: 100%;
			}
			.monaco-scrollable-element > .shadow.left {
				display: block;
				top: 3px;
				left: 0;
				height: 100%;
				width: 3px;
			}
			.monaco-scrollable-element > .shadow.top-left-corner {
				display: block;
				top: 0;
				left: 0;
				height: 3px;
				width: 3px;
			}
			/* Fix for https://github.com/microsoft/vscode/issues/103170 */
			.monaco-menu .action-item .monaco-submenu {
				z-index: 1;
			}
		`;const i=r.scrollbarShadow;i&&(t+=`
				.monaco-scrollable-element > .shadow.top {
					box-shadow: ${i} 0 6px 6px -6px inset;
				}

				.monaco-scrollable-element > .shadow.left {
					box-shadow: ${i} 6px 0 6px -6px inset;
				}

				.monaco-scrollable-element > .shadow.top.left {
					box-shadow: ${i} 6px 6px 6px -6px inset;
				}
			`);const n=r.scrollbarSliderBackground;n&&(t+=`
				.monaco-scrollable-element > .scrollbar > .slider {
					background: ${n};
				}
			`);const o=r.scrollbarSliderHoverBackground;o&&(t+=`
				.monaco-scrollable-element > .scrollbar > .slider:hover {
					background: ${o};
				}
			`);const c=r.scrollbarSliderActiveBackground;c&&(t+=`
				.monaco-scrollable-element > .scrollbar > .slider.active {
					background: ${c};
				}
			`)}return t}export{D as $tab,A as $uab,Se as $vab,ie as $xab,F as $yab,oe as $zab,C as HorizontalDirection,v as Menu,L as VerticalDirection};
