import*as R from"./browser.js";import{BrowserFeatures as _}from"./canIUse.js";import{StandardKeyboardEvent as U}from"./keyboardEvent.js";import{StandardMouseEvent as se}from"./mouseEvent.js";import{AbstractIdleValue as ae,IntervalTimer as le,TimeoutTimer as de,_runWhenIdle as ue}from"../common/async.js";import{onUnexpectedError as ce}from"../common/errors.js";import*as T from"../common/event.js";import*as k from"./dompurify/dompurify.js";import{KeyCode as F}from"../common/keyCodes.js";import{Disposable as D,DisposableStore as v,toDisposable as E}from"../common/lifecycle.js";import{RemoteAuthorities as fe,Schemas as A}from"../common/network.js";import*as w from"../common/platform.js";import{URI as me}from"../common/uri.js";import{hash as pe}from"../common/hash.js";import{ensureCodeWindow as he,mainWindow as c}from"./window.js";import{isPointWithinTriangle as Te}from"../common/numbers.js";const{registerWindow:pt,getWindow:m,getDocument:ht,getWindows:B,getWindowsCount:ge,getWindowId:G,getWindowById:Tt,hasWindow:gt,onDidRegisterWindow:Ee,onWillUnregisterWindow:Et,onDidUnregisterWindow:yt}=function(){const e=new Map;he(c,1);const t={window:c,disposables:new v};e.set(c.vscodeWindowId,t);const n=new T.Emitter,o=new T.Emitter,r=new T.Emitter;function s(i,d){return(typeof i=="number"?e.get(i):void 0)??(d?t:void 0)}return{onDidRegisterWindow:n.event,onWillUnregisterWindow:r.event,onDidUnregisterWindow:o.event,registerWindow(i){if(e.has(i.vscodeWindowId))return D.None;const d=new v,l={window:i,disposables:d.add(new v)};return e.set(i.vscodeWindowId,l),d.add(E(()=>{e.delete(i.vscodeWindowId),o.fire(i)})),d.add(f(i,h.BEFORE_UNLOAD,()=>{r.fire(i)})),n.fire(l),d},getWindows(){return e.values()},getWindowsCount(){return e.size},getWindowId(i){return i.vscodeWindowId},hasWindow(i){return e.has(i)},getWindowById:s,getWindow(i){const d=i;if(d?.ownerDocument?.defaultView)return d.ownerDocument.defaultView.window;const l=i;return l?.view?l.view.window:c},getDocument(i){return m(i).document}}}();function bt(e){for(;e.firstChild;)e.firstChild.remove()}class ye{_handler;_node;_type;_options;constructor(t,n,o,r){this._node=t,this._type=n,this._handler=o,this._options=r||!1,this._node.addEventListener(this._type,this._handler,this._options)}dispose(){this._handler&&(this._node.removeEventListener(this._type,this._handler,this._options),this._node=null,this._handler=null)}}function f(e,t,n,o){return new ye(e,t,n,o)}function N(e,t){return function(n){return t(new se(e,n))}}function be(e){return function(t){return e(new U(t))}}const vt=function(t,n,o,r){let s=o;return n==="click"||n==="mousedown"||n==="contextmenu"?s=N(m(t),o):(n==="keydown"||n==="keypress"||n==="keyup")&&(s=be(o)),f(t,n,s,r)},Mt=function(t,n,o){const r=N(m(t),n);return ve(t,r,o)},wt=function(t,n,o){const r=N(m(t),n);return Me(t,r,o)};function ve(e,t,n){return f(e,w.isIOS&&_.pointerEvents?h.POINTER_DOWN:h.MOUSE_DOWN,t,n)}function Lt(e,t,n){return f(e,w.isIOS&&_.pointerEvents?h.POINTER_MOVE:h.MOUSE_MOVE,t,n)}function Me(e,t,n){return f(e,w.isIOS&&_.pointerEvents?h.POINTER_UP:h.MOUSE_UP,t,n)}function xt(e,t,n){return ue(e,t,n)}class St extends ae{constructor(t,n){super(t,n)}}let we,L;function Dt(e,t,n,o){let r=0;const s=e.setInterval(()=>{r++,(typeof o=="number"&&r>=o||t()===!0)&&i.dispose()},n),i=E(()=>{e.clearInterval(s)});return i}class Ht extends le{defaultTarget;constructor(t){super(),this.defaultTarget=t&&m(t)}cancelAndSet(t,n,o){return super.cancelAndSet(t,n,o??this.defaultTarget)}}class W{_runner;priority;_canceled;constructor(t,n=0){this._runner=t,this.priority=n,this._canceled=!1}dispose(){this._canceled=!0}execute(){if(!this._canceled)try{this._runner()}catch(t){ce(t)}}static sort(t,n){return n.priority-t.priority}}(function(){const e=new Map,t=new Map,n=new Map,o=new Map,r=s=>{n.set(s,!1);const i=e.get(s)??[];for(t.set(s,i),e.set(s,[]),o.set(s,!0);i.length>0;)i.sort(W.sort),i.shift().execute();o.set(s,!1)};L=(s,i,d=0)=>{const l=G(s),a=new W(i,d);let p=e.get(l);return p||(p=[],e.set(l,p)),p.push(a),n.get(l)||(n.set(l,!0),s.requestAnimationFrame(()=>r(l))),a},we=(s,i,d)=>{const l=G(s);if(o.get(l)){const a=new W(i,d);let p=t.get(l);return p||(p=[],t.set(l,p)),p.push(a),a}else return L(s,i,d)}})();function It(e,t){return L(e,t,1e4)}function Rt(e,t){return L(e,t,-1e4)}const Le=8,xe=function(e,t){return t};class Se extends D{constructor(t,n,o,r=xe,s=Le){super();let i=null,d=0;const l=this._register(new de),a=()=>{d=new Date().getTime(),o(i),i=null};this._register(f(t,n,p=>{i=r(i,p);const M=new Date().getTime()-d;M>=s?(l.cancel(),a()):l.setIfNotSet(a,s-M)}))}}function _t(e,t,n,o,r){return new Se(e,t,n,o,r)}function K(e){return m(e).getComputedStyle(e,null)}function De(e,t){const n=m(e),o=n.document;if(e!==o.body)return new g(e.clientWidth,e.clientHeight);if(w.isIOS&&n?.visualViewport)return new g(n.visualViewport.width,n.visualViewport.height);if(n?.innerWidth&&n.innerHeight)return new g(n.innerWidth,n.innerHeight);if(o.body&&o.body.clientWidth&&o.body.clientHeight)return new g(o.body.clientWidth,o.body.clientHeight);if(o.documentElement&&o.documentElement.clientWidth&&o.documentElement.clientHeight)return new g(o.documentElement.clientWidth,o.documentElement.clientHeight);if(t)return De(t);throw new Error("Unable to figure out browser width and height")}class u{static convertToPixels(t,n){return parseFloat(n)||0}static getDimension(t,n,o){const r=K(t),s=r?r.getPropertyValue(n):"0";return u.convertToPixels(t,s)}static getBorderLeftWidth(t){return u.getDimension(t,"border-left-width","borderLeftWidth")}static getBorderRightWidth(t){return u.getDimension(t,"border-right-width","borderRightWidth")}static getBorderTopWidth(t){return u.getDimension(t,"border-top-width","borderTopWidth")}static getBorderBottomWidth(t){return u.getDimension(t,"border-bottom-width","borderBottomWidth")}static getPaddingLeft(t){return u.getDimension(t,"padding-left","paddingLeft")}static getPaddingRight(t){return u.getDimension(t,"padding-right","paddingRight")}static getPaddingTop(t){return u.getDimension(t,"padding-top","paddingTop")}static getPaddingBottom(t){return u.getDimension(t,"padding-bottom","paddingBottom")}static getMarginLeft(t){return u.getDimension(t,"margin-left","marginLeft")}static getMarginTop(t){return u.getDimension(t,"margin-top","marginTop")}static getMarginRight(t){return u.getDimension(t,"margin-right","marginRight")}static getMarginBottom(t){return u.getDimension(t,"margin-bottom","marginBottom")}}class g{constructor(t,n){this.width=t;this.height=n}static None=new g(0,0);with(t=this.width,n=this.height){return t!==this.width||n!==this.height?new g(t,n):this}static is(t){return typeof t=="object"&&typeof t.height=="number"&&typeof t.width=="number"}static lift(t){return t instanceof g?t:new g(t.width,t.height)}static equals(t,n){return t===n?!0:!t||!n?!1:t.width===n.width&&t.height===n.height}}function V(e){let t=e.offsetParent,n=e.offsetTop,o=e.offsetLeft;for(;(e=e.parentNode)!==null&&e!==e.ownerDocument.body&&e!==e.ownerDocument.documentElement;){n-=e.scrollTop;const r=$(e)?null:K(e);r&&(o-=r.direction!=="rtl"?e.scrollLeft:-e.scrollLeft),e===t&&(o+=u.getBorderLeftWidth(e),n+=u.getBorderTopWidth(e),n+=e.offsetTop,o+=e.offsetLeft,t=e.offsetParent)}return{left:o,top:n}}function kt(e,t,n){typeof t=="number"&&(e.style.width=`${t}px`),typeof n=="number"&&(e.style.height=`${n}px`)}function At(e,t,n,o,r,s="absolute"){typeof t=="number"&&(e.style.top=`${t}px`),typeof n=="number"&&(e.style.right=`${n}px`),typeof o=="number"&&(e.style.bottom=`${o}px`),typeof r=="number"&&(e.style.left=`${r}px`),e.style.position=s}function Nt(e){const t=e.getBoundingClientRect(),n=m(e);return{left:t.left+n.scrollX,top:t.top+n.scrollY,width:t.width,height:t.height}}function Wt(e){let t=e,n=1;do{const o=K(t).zoom;o!=null&&o!=="1"&&(n*=o),t=t.parentElement}while(t!==null&&t!==t.ownerDocument.documentElement);return n}function He(e){const t=u.getMarginLeft(e)+u.getMarginRight(e);return e.offsetWidth+t}function Kt(e){const t=u.getBorderLeftWidth(e)+u.getBorderRightWidth(e),n=u.getPaddingLeft(e)+u.getPaddingRight(e);return e.offsetWidth-t-n}function Ie(e){const t=u.getMarginLeft(e)+u.getMarginRight(e);return e.scrollWidth+t}function Ot(e){const t=u.getBorderTopWidth(e)+u.getBorderBottomWidth(e),n=u.getPaddingTop(e)+u.getPaddingBottom(e);return e.offsetHeight-t-n}function Ct(e){const t=u.getMarginTop(e)+u.getMarginBottom(e);return e.offsetHeight+t}function Re(e,t){if(e===null)return 0;const n=V(e),o=V(t);return n.left-o.left}function Pt(e,t){const n=t.map(r=>Math.max(Ie(r),He(r))+Re(r,e)||0);return Math.max(...n)}function O(e,t){return!!t?.contains(e)}const Y="parentFlowToElementId";function Ut(e,t){e.dataset[Y]=t.id}function _e(e){const t=e.dataset[Y];return typeof t=="string"?e.ownerDocument.getElementById(t):null}function Ft(e,t){let n=e;for(;n;){if(n===t)return!0;if(y(n)){const o=_e(n);if(o){n=o;continue}}n=n.parentNode}return!1}function ke(e,t,n){for(;e&&e.nodeType===e.ELEMENT_NODE;){if(e.classList.contains(t))return e;if(n){if(typeof n=="string"){if(e.classList.contains(n))return null}else if(e===n)return null}e=e.parentNode}return null}function Bt(e,t,n){return!!ke(e,t,n)}function $(e){return e&&!!e.host&&!!e.mode}function Gt(e){return!!j(e)}function j(e){for(;e.parentNode;){if(e===e.ownerDocument?.body)return null;e=e.parentNode}return $(e)?e:null}function Q(){let e=C().activeElement;for(;e?.shadowRoot;)e=e.shadowRoot.activeElement;return e}function Vt(e){return Q()===e}function Yt(e){return O(Q(),e)}function $t(e){return e.ownerDocument===C()}function C(){return ge()<=1?c.document:Array.from(B()).map(({window:t})=>t.document).find(t=>t.hasFocus())??c.document}function X(){return C().defaultView?.window??c}const x=new Map;function jt(e){return x.has(e)}function Qt(){return new Ae}class Ae{_currentCssStyle="";_styleSheet=void 0;setStyle(t){t!==this._currentCssStyle&&(this._currentCssStyle=t,this._styleSheet?this._styleSheet.innerText=t:this._styleSheet=q(c.document.head,n=>n.innerText=t))}dispose(){this._styleSheet&&(this._styleSheet.remove(),this._styleSheet=void 0)}}function q(e=c.document.head,t,n){const o=document.createElement("style");if(o.type="text/css",o.media="screen",t?.(o),e.appendChild(o),n&&n.add(E(()=>o.remove())),e===c.document.head){const r=new Set;x.set(o,r);for(const{window:s,disposables:i}of B()){if(s===c)continue;const d=i.add(Z(o,r,s));n?.add(d)}}return o}function Xt(e){const t=new v;for(const[n,o]of x)t.add(Z(n,o,e));return t}function Z(e,t,n){const o=new v,r=e.cloneNode(!0);n.document.head.appendChild(r),o.add(E(()=>r.remove()));for(const s of te(e))r.sheet?.insertRule(s.cssText,r.sheet?.cssRules.length);return o.add(J.observe(e,o,{childList:!0})(()=>{r.textContent=e.textContent})),t.add(r),o.add(E(()=>t.delete(r))),o}const J=new class{mutationObservers=new Map;observe(e,t,n){let o=this.mutationObservers.get(e);o||(o=new Map,this.mutationObservers.set(e,o));const r=pe(n);let s=o.get(r);if(s)s.users+=1;else{const i=new T.Emitter,d=new MutationObserver(a=>i.fire(a));d.observe(e,n);const l=s={users:1,observer:d,onDidMutate:i.event};t.add(E(()=>{l.users-=1,l.users===0&&(i.dispose(),d.disconnect(),o?.delete(r),o?.size===0&&this.mutationObservers.delete(e))})),o.set(r,s)}return s.onDidMutate}};function qt(e=c.document.head){return z("meta",e)}function Zt(e=c.document.head){return z("link",e)}function z(e,t=c.document.head){const n=document.createElement(e);return t.appendChild(n),n}let P=null;function ee(){return P||(P=q()),P}function te(e){return e?.sheet?.rules?e.sheet.rules:e?.sheet?.cssRules?e.sheet.cssRules:[]}function Ne(e,t,n=ee()){if(!(!n||!t)){n.sheet?.insertRule(`${e} {${t}}`,0);for(const o of x.get(n)??[])Ne(e,t,o)}}function We(e,t=ee()){if(!t)return;const n=te(t),o=[];for(let r=0;r<n.length;r++){const s=n[r];Ke(s)&&s.selectorText.indexOf(e)!==-1&&o.push(r)}for(let r=o.length-1;r>=0;r--)t.sheet?.deleteRule(o[r]);for(const r of x.get(t)??[])We(e,r)}function Ke(e){return typeof e.selectorText=="string"}function y(e){return e instanceof HTMLElement||e instanceof m(e).HTMLElement}function Jt(e){return e instanceof HTMLAnchorElement||e instanceof m(e).HTMLAnchorElement}function zt(e){return e instanceof HTMLSpanElement||e instanceof m(e).HTMLSpanElement}function en(e){return e instanceof HTMLTextAreaElement||e instanceof m(e).HTMLTextAreaElement}function tn(e){return e instanceof HTMLInputElement||e instanceof m(e).HTMLInputElement}function nn(e){return e instanceof HTMLButtonElement||e instanceof m(e).HTMLButtonElement}function on(e){return e instanceof HTMLDivElement||e instanceof m(e).HTMLDivElement}function rn(e){return e instanceof SVGElement||e instanceof m(e).SVGElement}function sn(e){return e instanceof MouseEvent||e instanceof m(e).MouseEvent}function an(e){return e instanceof KeyboardEvent||e instanceof m(e).KeyboardEvent}function ln(e){return e instanceof PointerEvent||e instanceof m(e).PointerEvent}function dn(e){return e instanceof DragEvent||e instanceof m(e).DragEvent}const h={CLICK:"click",AUXCLICK:"auxclick",DBLCLICK:"dblclick",MOUSE_UP:"mouseup",MOUSE_DOWN:"mousedown",MOUSE_OVER:"mouseover",MOUSE_MOVE:"mousemove",MOUSE_OUT:"mouseout",MOUSE_ENTER:"mouseenter",MOUSE_LEAVE:"mouseleave",MOUSE_WHEEL:"wheel",POINTER_UP:"pointerup",POINTER_DOWN:"pointerdown",POINTER_MOVE:"pointermove",POINTER_LEAVE:"pointerleave",CONTEXT_MENU:"contextmenu",WHEEL:"wheel",KEY_DOWN:"keydown",KEY_PRESS:"keypress",KEY_UP:"keyup",LOAD:"load",BEFORE_UNLOAD:"beforeunload",UNLOAD:"unload",PAGE_SHOW:"pageshow",PAGE_HIDE:"pagehide",PASTE:"paste",ABORT:"abort",ERROR:"error",RESIZE:"resize",SCROLL:"scroll",FULLSCREEN_CHANGE:"fullscreenchange",WK_FULLSCREEN_CHANGE:"webkitfullscreenchange",SELECT:"select",CHANGE:"change",SUBMIT:"submit",RESET:"reset",FOCUS:"focus",FOCUS_IN:"focusin",FOCUS_OUT:"focusout",BLUR:"blur",INPUT:"input",STORAGE:"storage",DRAG_START:"dragstart",DRAG:"drag",DRAG_ENTER:"dragenter",DRAG_LEAVE:"dragleave",DRAG_OVER:"dragover",DROP:"drop",DRAG_END:"dragend",ANIMATION_START:R.isWebKit?"webkitAnimationStart":"animationstart",ANIMATION_END:R.isWebKit?"webkitAnimationEnd":"animationend",ANIMATION_ITERATION:R.isWebKit?"webkitAnimationIteration":"animationiteration"};function un(e){const t=e;return!!(t&&typeof t.preventDefault=="function"&&typeof t.stopPropagation=="function")}const cn={stop:(e,t)=>(e.preventDefault(),t&&e.stopPropagation(),e)};function fn(e){const t=[];for(let n=0;e&&e.nodeType===e.ELEMENT_NODE;n++)t[n]=e.scrollTop,e=e.parentNode;return t}function mn(e,t){for(let n=0;e&&e.nodeType===e.ELEMENT_NODE;n++)e.scrollTop!==t[n]&&(e.scrollTop=t[n]),e=e.parentNode}class I extends D{_onDidFocus=this._register(new T.Emitter);onDidFocus=this._onDidFocus.event;_onDidBlur=this._register(new T.Emitter);onDidBlur=this._onDidBlur.event;_refreshStateHandler;static hasFocusWithin(t){if(y(t)){const n=j(t),o=n?n.activeElement:t.ownerDocument.activeElement;return O(o,t)}else{const n=t;return O(n.document.activeElement,n.document)}}constructor(t){super();let n=I.hasFocusWithin(t),o=!1;const r=()=>{o=!1,n||(n=!0,this._onDidFocus.fire())},s=()=>{n&&(o=!0,(y(t)?m(t):t).setTimeout(()=>{o&&(o=!1,n=!1,this._onDidBlur.fire())},0))};this._refreshStateHandler=()=>{I.hasFocusWithin(t)!==n&&(n?s():r())},this._register(f(t,h.FOCUS,r,!0)),this._register(f(t,h.BLUR,s,!0)),y(t)&&(this._register(f(t,h.FOCUS_IN,()=>this._refreshStateHandler())),this._register(f(t,h.FOCUS_OUT,()=>this._refreshStateHandler())))}refreshState(){this._refreshStateHandler()}}function pn(e){return new I(e)}function hn(e,t){return e.after(t),t}function Oe(e,...t){if(e.append(...t),t.length===1&&typeof t[0]!="string")return t[0]}function Tn(e,t){return e.insertBefore(t,e.firstChild),t}function gn(e,...t){e.innerText="",Oe(e,...t)}const Ce=/([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;var Pe=(n=>(n.HTML="http://www.w3.org/1999/xhtml",n.SVG="http://www.w3.org/2000/svg",n))(Pe||{});function ne(e,t,n,...o){const r=Ce.exec(t);if(!r)throw new Error("Bad use of emmet");const s=r[1]||"div";let i;return e!=="http://www.w3.org/1999/xhtml"?i=document.createElementNS(e,s):i=document.createElement(s),r[3]&&(i.id=r[3]),r[4]&&(i.className=r[4].replace(/\./g," ").trim()),n&&Object.entries(n).forEach(([d,l])=>{typeof l>"u"||(/^on\w+$/.test(d)?i[d]=l:d==="selected"?l&&i.setAttribute(d,"true"):i.setAttribute(d,l))}),i.append(...o),i}function Ue(e,t,...n){return ne("http://www.w3.org/1999/xhtml",e,t,...n)}Ue.SVG=function(e,t,...n){return ne("http://www.w3.org/2000/svg",e,t,...n)};function En(e,t){const n=[];return e.forEach((o,r)=>{r>0&&(t instanceof Node?n.push(t.cloneNode()):n.push(document.createTextNode(t))),n.push(o)}),n}function yn(e,...t){e?Fe(...t):Be(...t)}function Fe(...e){for(const t of e)t.style.display="",t.removeAttribute("aria-hidden")}function Be(...e){for(const t of e)t.style.display="none",t.setAttribute("aria-hidden","true")}function Ge(e,t){for(;e&&e.nodeType===e.ELEMENT_NODE;){if(y(e)&&e.hasAttribute(t))return e;e=e.parentNode}return null}function bn(e){!e||!e.hasAttribute("tabIndex")||(e.ownerDocument.activeElement===e&&Ge(e.parentElement,"tabIndex")?.focus(),e.removeAttribute("tabindex"))}function vn(e){return t=>{t.preventDefault(),t.stopPropagation(),e(t)}}function Mn(e){return new Promise(t=>{if(e.document.readyState==="complete"||e.document&&e.document.body!==null)t(void 0);else{const o=()=>{e.window.removeEventListener("DOMContentLoaded",o,!1),t()};e.window.addEventListener("DOMContentLoaded",o,!1)}})}function wn(e,t){const n=e.devicePixelRatio*t;return Math.max(1,Math.floor(n))/e.devicePixelRatio}function Ln(e){c.open(e,"_blank","noopener")}const oe=780,re=640;function xn(e){const t=Math.floor(c.screenLeft+c.innerWidth/2-oe/2),n=Math.floor(c.screenTop+c.innerHeight/2-re/2);c.open(e,"_blank",`width=${oe},height=${re},top=${n},left=${t}`)}function Sn(e,t=!0){const n=c.open();return n?(t&&(n.opener=null),n.location.href=e,!0):!1}function Dn(e,t){const n=()=>{t(),o=L(e,n)};let o=L(e,n);return E(()=>o.dispose())}fe.setPreferredWebSchema(/^https:/.test(c.location.href)?"https":"http");function Hn(e,t){let n;if(me.isUri(e))n=e.toString(!0);else{const s=new Blob([e]);n=URL.createObjectURL(s),setTimeout(()=>URL.revokeObjectURL(n))}const o=X(),r=document.createElement("a");o.document.body.appendChild(r),r.download=t,r.href=n,r.click(),setTimeout(()=>r.remove())}function In(){return new Promise(e=>{const t=X(),n=document.createElement("input");t.document.body.appendChild(n),n.type="file",n.multiple=!0,T.Event.once(T.Event.fromDOMEventEmitter(n,"input"))(()=>{e(n.files??void 0)}),n.click(),setTimeout(()=>n.remove())})}var Ve=(n=>(n[n.DOCUMENT=1]="DOCUMENT",n[n.BROWSER=2]="BROWSER",n))(Ve||{});function Rn(e){return e.document.fullscreenElement||e.document.webkitFullscreenElement||e.document.webkitIsFullScreen?{mode:1,guess:!1}:e.innerHeight===e.screen.height?{mode:2,guess:!1}:(w.isMacintosh||w.isLinux)&&e.outerHeight===e.screen.height&&e.outerWidth===e.screen.width?{mode:2,guess:!0}:null}function Ye(e,t=!1){const n=document.createElement("a");return k.addHook("afterSanitizeAttributes",o=>{for(const r of["href","src"])if(o.hasAttribute(r)){const s=o.getAttribute(r);if(r==="href"&&s.startsWith("#"))continue;if(n.href=s,!e.includes(n.protocol.replace(/:$/,""))){if(t&&r==="src"&&n.href.startsWith("data:"))continue;o.removeAttribute(r)}}}),E(()=>{k.removeHook("afterSanitizeAttributes")})}const $e=[A.http,A.https,A.command],_n=Object.freeze(["a","abbr","b","bdo","blockquote","br","caption","cite","code","col","colgroup","dd","del","details","dfn","div","dl","dt","em","figcaption","figure","h1","h2","h3","h4","h5","h6","hr","i","img","input","ins","kbd","label","li","mark","ol","p","pre","q","rp","rt","ruby","samp","small","small","source","span","strike","strong","sub","summary","sup","table","tbody","td","tfoot","th","thead","time","tr","tt","u","ul","var","video","wbr"]),je=Object.freeze({ALLOWED_TAGS:["a","button","blockquote","code","div","h1","h2","h3","h4","h5","h6","hr","input","label","li","p","pre","select","small","span","strong","textarea","ul","ol"],ALLOWED_ATTR:["href","data-href","data-command","target","title","name","src","alt","class","id","role","tabindex","style","data-code","width","height","align","x-dispatch","required","checked","placeholder","type","start"],RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1,RETURN_TRUSTED_TYPE:!0});function kn(e,t,n){const o=Ye($e);try{const r=k.sanitize(t,{...je,...n});e.innerHTML=r}finally{o.dispose()}}function Qe(e){const t=new Uint16Array(e.length);for(let r=0;r<t.length;r++)t[r]=e.charCodeAt(r);let n="";const o=new Uint8Array(t.buffer);for(let r=0;r<o.length;r++)n+=String.fromCharCode(o[r]);return n}function An(e){return btoa(Qe(e))}class S extends T.Emitter{_subscriptions=new v;_keyStatus;static instance;constructor(){super(),this._keyStatus={altKey:!1,shiftKey:!1,ctrlKey:!1,metaKey:!1},this._subscriptions.add(T.Event.runAndSubscribe(Ee,({window:t,disposables:n})=>this.registerListeners(t,n),{window:c,disposables:this._subscriptions}))}registerListeners(t,n){n.add(f(t,"keydown",o=>{if(o.defaultPrevented)return;const r=new U(o);if(!(r.keyCode===F.Alt&&o.repeat)){if(o.altKey&&!this._keyStatus.altKey)this._keyStatus.lastKeyPressed="alt";else if(o.ctrlKey&&!this._keyStatus.ctrlKey)this._keyStatus.lastKeyPressed="ctrl";else if(o.metaKey&&!this._keyStatus.metaKey)this._keyStatus.lastKeyPressed="meta";else if(o.shiftKey&&!this._keyStatus.shiftKey)this._keyStatus.lastKeyPressed="shift";else if(r.keyCode!==F.Alt)this._keyStatus.lastKeyPressed=void 0;else return;this._keyStatus.altKey=o.altKey,this._keyStatus.ctrlKey=o.ctrlKey,this._keyStatus.metaKey=o.metaKey,this._keyStatus.shiftKey=o.shiftKey,this._keyStatus.lastKeyPressed&&(this._keyStatus.event=o,this.fire(this._keyStatus))}},!0)),n.add(f(t,"keyup",o=>{o.defaultPrevented||(!o.altKey&&this._keyStatus.altKey?this._keyStatus.lastKeyReleased="alt":!o.ctrlKey&&this._keyStatus.ctrlKey?this._keyStatus.lastKeyReleased="ctrl":!o.metaKey&&this._keyStatus.metaKey?this._keyStatus.lastKeyReleased="meta":!o.shiftKey&&this._keyStatus.shiftKey?this._keyStatus.lastKeyReleased="shift":this._keyStatus.lastKeyReleased=void 0,this._keyStatus.lastKeyPressed!==this._keyStatus.lastKeyReleased&&(this._keyStatus.lastKeyPressed=void 0),this._keyStatus.altKey=o.altKey,this._keyStatus.ctrlKey=o.ctrlKey,this._keyStatus.metaKey=o.metaKey,this._keyStatus.shiftKey=o.shiftKey,this._keyStatus.lastKeyReleased&&(this._keyStatus.event=o,this.fire(this._keyStatus)))},!0)),n.add(f(t.document.body,"mousedown",()=>{this._keyStatus.lastKeyPressed=void 0},!0)),n.add(f(t.document.body,"mouseup",()=>{this._keyStatus.lastKeyPressed=void 0},!0)),n.add(f(t.document.body,"mousemove",o=>{o.buttons&&(this._keyStatus.lastKeyPressed=void 0)},!0)),n.add(f(t,"blur",()=>{this.resetKeyStatus()}))}get keyStatus(){return this._keyStatus}get isModifierPressed(){return this._keyStatus.altKey||this._keyStatus.ctrlKey||this._keyStatus.metaKey||this._keyStatus.shiftKey}resetKeyStatus(){this.doResetKeyStatus(),this.fire(this._keyStatus)}doResetKeyStatus(){this._keyStatus={altKey:!1,shiftKey:!1,ctrlKey:!1,metaKey:!1}}static getInstance(){return S.instance||(S.instance=new S),S.instance}dispose(){super.dispose(),this._subscriptions.dispose()}}function Nn(e){const t=document.cookie.match("(^|[^;]+)\\s*"+e+"\\s*=\\s*([^;]+)");return t?t.pop():void 0}class Wn extends D{constructor(n,o){super();this.element=n;this.callbacks=o;this.registerListeners()}counter=0;dragStartTime=0;registerListeners(){this.callbacks.onDragStart&&this._register(f(this.element,h.DRAG_START,n=>{this.callbacks.onDragStart?.(n)})),this.callbacks.onDrag&&this._register(f(this.element,h.DRAG,n=>{this.callbacks.onDrag?.(n)})),this._register(f(this.element,h.DRAG_ENTER,n=>{this.counter++,this.dragStartTime=n.timeStamp,this.callbacks.onDragEnter?.(n)})),this._register(f(this.element,h.DRAG_OVER,n=>{n.preventDefault(),this.callbacks.onDragOver?.(n,n.timeStamp-this.dragStartTime)})),this._register(f(this.element,h.DRAG_LEAVE,n=>{this.counter--,this.counter===0&&(this.dragStartTime=0,this.callbacks.onDragLeave?.(n))})),this._register(f(this.element,h.DRAG_END,n=>{this.counter=0,this.dragStartTime=0,this.callbacks.onDragEnd?.(n)})),this._register(f(this.element,h.DROP,n=>{this.counter=0,this.dragStartTime=0,this.callbacks.onDrop?.(n)}))}}const ie=/(?<tag>[\w\-]+)?(?:#(?<id>[\w\-]+))?(?<class>(?:\.(?:[\w\-]+))*)(?:@(?<name>(?:[\w\_])+))?/;function Kn(e,...t){let n,o;Array.isArray(t[0])?(n={},o=t[0]):(n=t[0]||{},o=t[1]);const r=ie.exec(e);if(!r||!r.groups)throw new Error("Bad use of h");const s=r.groups.tag||"div",i=document.createElement(s);r.groups.id&&(i.id=r.groups.id);const d=[];if(r.groups.class)for(const a of r.groups.class.split("."))a!==""&&d.push(a);if(n.className!==void 0)for(const a of n.className.split("."))a!==""&&d.push(a);d.length>0&&(i.className=d.join(" "));const l={};if(r.groups.name&&(l[r.groups.name]=i),o)for(const a of o)y(a)?i.appendChild(a):typeof a=="string"?i.append(a):"root"in a&&(Object.assign(l,a),i.appendChild(a.root));for(const[a,p]of Object.entries(n))if(a!=="className")if(a==="style")for(const[M,b]of Object.entries(p))i.style.setProperty(H(M),typeof b=="number"?b+"px":""+b);else a==="tabIndex"?i.tabIndex=p:i.setAttribute(H(a),p.toString());return l.root=i,l}function On(e,...t){let n,o;Array.isArray(t[0])?(n={},o=t[0]):(n=t[0]||{},o=t[1]);const r=ie.exec(e);if(!r||!r.groups)throw new Error("Bad use of h");const s=r.groups.tag||"div",i=document.createElementNS("http://www.w3.org/2000/svg",s);r.groups.id&&(i.id=r.groups.id);const d=[];if(r.groups.class)for(const a of r.groups.class.split("."))a!==""&&d.push(a);if(n.className!==void 0)for(const a of n.className.split("."))a!==""&&d.push(a);d.length>0&&(i.className=d.join(" "));const l={};if(r.groups.name&&(l[r.groups.name]=i),o)for(const a of o)y(a)?i.appendChild(a):typeof a=="string"?i.append(a):"root"in a&&(Object.assign(l,a),i.appendChild(a.root));for(const[a,p]of Object.entries(n))if(a!=="className")if(a==="style")for(const[M,b]of Object.entries(p))i.style.setProperty(H(M),typeof b=="number"?b+"px":""+b);else a==="tabIndex"?i.tabIndex=p:i.setAttribute(H(a),p.toString());return l.root=i,l}function H(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function Xe(e,t,n){for(const{name:o,value:r}of e.attributes)(!n||n.includes(o))&&t.setAttribute(o,r)}function qe(e,t,n){const o=e.getAttribute(n);o?t.setAttribute(n,o):t.removeAttribute(n)}function Cn(e,t,n){Xe(e,t,n);const o=new v;return o.add(J.observe(e,o,{attributes:!0,attributeFilter:n})(r=>{for(const s of r)s.type==="attributes"&&s.attributeName&&qe(e,t,s.attributeName)})),o}function Pn(e){return e.tagName.toLowerCase()==="input"||e.tagName.toLowerCase()==="textarea"||y(e)&&!!e.editContext}class Un{constructor(t,n,o){this.originX=t;this.originY=n;const{top:r,left:s,right:i,bottom:d}=o.getBoundingClientRect(),l=this.points;let a=0;l[a++]=s,l[a++]=r,l[a++]=i,l[a++]=r,l[a++]=s,l[a++]=d,l[a++]=i,l[a++]=d}points=new Int16Array(8);contains(t,n){const{points:o,originX:r,originY:s}=this;for(let i=0;i<4;i++){const d=2*i,l=2*((i+1)%4);if(Te(t,n,r,s,o[d],o[d+1],o[l],o[l+1]))return!0}return!1}}export{Ue as $,Ve as DetectedFullscreenMode,g as Dimension,Wn as DragAndDropObserver,cn as EventHelper,h as EventType,S as ModifierKeyEmitter,Pe as Namespace,Un as SafeTriangle,St as WindowIdleValue,Ht as WindowIntervalTimer,ve as addDisposableGenericMouseDownListener,Lt as addDisposableGenericMouseMoveListener,Me as addDisposableGenericMouseUpListener,f as addDisposableListener,_t as addDisposableThrottledListener,Mt as addStandardDisposableGenericMouseDownListener,wt as addStandardDisposableGenericMouseUpListener,vt as addStandardDisposableListener,hn as after,Dn as animate,Oe as append,_n as basicMarkupHtmlTags,bt as clearNode,Xt as cloneGlobalStylesheets,wn as computeScreenAwareSize,Xe as copyAttributes,Ne as createCSSRule,Zt as createLinkElement,qt as createMetaElement,q as createStyleSheet,Qt as createStyleSheet2,Rn as detectFullscreen,Dt as disposableWindowInterval,Mn as domContentLoaded,vn as finalHandler,ke as findParentWithClass,C as getActiveDocument,Q as getActiveElement,X as getActiveWindow,De as getClientArea,K as getComputedStyle,Ot as getContentHeight,Kt as getContentWidth,Nn as getCookieValue,ht as getDocument,Nt as getDomNodePagePosition,Wt as getDomNodeZoomLevel,Pt as getLargestChildWidth,j as getShadowRoot,V as getTopLeftOffset,Ct as getTotalHeight,Ie as getTotalScrollWidth,He as getTotalWidth,m as getWindow,Tt as getWindowById,G as getWindowId,B as getWindows,ge as getWindowsCount,Kn as h,Bt as hasParentWithClass,gt as hasWindow,Be as hide,Ye as hookDomPurifyHrefAndSrcSanitizer,$t as isActiveDocument,Vt as isActiveElement,O as isAncestor,Yt as isAncestorOfActiveElement,Ft as isAncestorUsingFlowTo,dn as isDragEvent,Pn as isEditableElement,un as isEventLike,jt as isGlobalStylesheet,Jt as isHTMLAnchorElement,nn as isHTMLButtonElement,on as isHTMLDivElement,y as isHTMLElement,tn as isHTMLInputElement,zt as isHTMLSpanElement,en as isHTMLTextAreaElement,Gt as isInShadowDOM,an as isKeyboardEvent,sn as isMouseEvent,ln as isPointerEvent,rn as isSVGElement,$ as isShadowRoot,En as join,It as measure,Rt as modify,An as multibyteAwareBtoa,Ee as onDidRegisterWindow,yt as onDidUnregisterWindow,Et as onWillUnregisterWindow,At as position,Tn as prepend,pt as registerWindow,We as removeCSSRulesContainingSelector,bn as removeTabIndexAndUpdateFocus,gn as reset,mn as restoreParentsScrollTop,we as runAtThisOrScheduleAtNextAnimationFrame,xt as runWhenWindowIdle,kn as safeInnerHtml,fn as saveParentsScrollTop,L as scheduleAtNextAnimationFrame,Ut as setParentFlowTo,yn as setVisibility,J as sharedMutationObserver,Fe as show,kt as size,On as svgElem,Cn as trackAttributes,pn as trackFocus,Hn as triggerDownload,In as triggerUpload,Ln as windowOpenNoOpener,xn as windowOpenPopup,Sn as windowOpenWithSuccess};
