import{$y0 as S}from"../../canIUse.js";import*as s from"../../dom.js";import{$Ed as a,$Dd as y,$Cd as x}from"../../../common/lifecycle.js";import{$S_ as $}from"../../../common/layout.js";import*as w from"../../../common/platform.js";import"./contextview.css";import{AnchorAlignment as E,AnchorAxisAlignment as F,AnchorPosition as I}from"../../../common/layout.js";var c;(function(i){i[i.ABSOLUTE=1]="ABSOLUTE",i[i.FIXED=2]="FIXED",i[i.FIXED_SHADOW=3]="FIXED_SHADOW"})(c||(c={}));function H(i){const t=i;return!!t&&typeof t.x=="number"&&typeof t.y=="number"}function A(i){if(s.$y$(i)){const t=s.$_0(i),e=s.$a$(i);return{top:t.top*e,left:t.left*e,width:t.width*e,height:t.height*e}}else return H(i)?{top:i.y,left:i.x,width:i.width||1,height:i.height||2}:{top:i.posy,left:i.posx,width:2,height:2}}class r extends a{static{this.a=["click","keydown","focus","blur"]}static{this.b=["click"]}constructor(t,e){super(),this.c=null,this.g=!1,this.h=!1,this.j=null,this.m=a.None,this.n=a.None,this.q=null,this.r=null,this.f=s.$(".context-view"),s.$Y$(this.f),this.setContainer(t,e),this.D(x(()=>this.setContainer(null,1)))}setContainer(t,e){this.g=e!==1;const l=this.h;if(this.h=e===3,!(t===this.c&&l===this.h)&&(this.c&&(this.n.dispose(),this.f.remove(),this.q&&(this.q=null,this.r?.remove(),this.r=null),this.c=null),t)){if(this.c=t,this.h){this.r=s.$(".shadow-root-host"),this.c.appendChild(this.r),this.q=this.r.attachShadow({mode:"open"});const n=document.createElement("style");n.textContent=b,this.q.appendChild(n),this.q.appendChild(this.f),this.q.appendChild(s.$("slot"))}else this.c.appendChild(this.f);const h=new y;r.a.forEach(n=>{h.add(s.$P0(this.c,n,o=>{this.u(o,!1)}))}),r.b.forEach(n=>{h.add(s.$P0(this.c,n,o=>{this.u(o,!0)},!0))}),this.n=h}}show(t){this.t()&&this.hide(),s.$N0(this.f),this.f.className="context-view monaco-component",this.f.style.top="0px",this.f.style.left="0px",this.f.style.zIndex=`${2575+(t.layer??0)}`,this.f.style.position=this.g?"fixed":"absolute",s.$X$(this.f),this.m=t.render(this.f)||a.None,this.j=t,this.s(),this.j.focus?.()}getViewElement(){return this.f}layout(){if(this.t()){if(this.j.canRelayout===!1&&!(w.$v&&S.pointerEvents)){this.hide();return}this.j?.layout?.(),this.s()}}s(){if(!this.t())return;const t=A(this.j.getAnchor()),e=s.$u$(),l={top:e.pageYOffset,left:e.pageXOffset,width:e.innerWidth,height:e.innerHeight},h={width:s.$b$(this.f),height:s.$f$(this.f)},n=this.j.anchorPosition,o=this.j.anchorAlignment,u=this.j.anchorAxisAlignment,{top:m,left:p}=$(l,h,t,{anchorAlignment:o,anchorPosition:n,anchorAxisAlignment:u});this.f.classList.remove("top","bottom","left","right"),this.f.classList.add(n===0?"bottom":"top"),this.f.classList.add(o===0?"left":"right"),this.f.classList.toggle("fixed",this.g);const f=s.$_0(this.c),d=this.c.scrollTop||0,g=this.c.scrollLeft||0;this.f.style.top=`${m-(this.g?s.$_0(this.f).top:f.top)+d}px`,this.f.style.left=`${p-(this.g?s.$_0(this.f).left:f.left)+g}px`,this.f.style.width="initial"}hide(t){const e=this.j;this.j=null,e?.onHide&&e.onHide(t),this.m.dispose(),s.$Y$(this.f)}t(){return!!this.j}u(t,e){this.j&&(this.j.onDOMEvent?this.j.onDOMEvent(t,s.getWindow(t).document.activeElement):e&&!s.$h$(t.target,this.c)&&this.hide())}dispose(){this.hide(),super.dispose()}}const b=`
	:host {
		all: initial; /* 1st rule so subsequent properties are reset. */
	}

	.codicon[class*='codicon-'] {
		font: normal normal normal 16px/1 codicon;
		display: inline-block;
		text-decoration: none;
		text-rendering: auto;
		text-align: center;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}

	:host {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "HelveticaNeue-Light", system-ui, "Ubuntu", "Droid Sans", sans-serif;
	}

	:host-context(.mac) { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
	:host-context(.mac:lang(zh-Hans)) { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", sans-serif; }
	:host-context(.mac:lang(zh-Hant)) { font-family: -apple-system, BlinkMacSystemFont, "PingFang TC", sans-serif; }
	:host-context(.mac:lang(ja)) { font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic Pro", sans-serif; }
	:host-context(.mac:lang(ko)) { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Nanum Gothic", "AppleGothic", sans-serif; }

	:host-context(.windows) { font-family: "Segoe WPC", "Segoe UI", sans-serif; }
	:host-context(.windows:lang(zh-Hans)) { font-family: "Segoe WPC", "Segoe UI", "Microsoft YaHei", sans-serif; }
	:host-context(.windows:lang(zh-Hant)) { font-family: "Segoe WPC", "Segoe UI", "Microsoft Jhenghei", sans-serif; }
	:host-context(.windows:lang(ja)) { font-family: "Segoe WPC", "Segoe UI", "Yu Gothic UI", "Meiryo UI", sans-serif; }
	:host-context(.windows:lang(ko)) { font-family: "Segoe WPC", "Segoe UI", "Malgun Gothic", "Dotom", sans-serif; }

	:host-context(.linux) { font-family: system-ui, "Ubuntu", "Droid Sans", sans-serif; }
	:host-context(.linux:lang(zh-Hans)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans SC", "Source Han Sans CN", "Source Han Sans", sans-serif; }
	:host-context(.linux:lang(zh-Hant)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans TC", "Source Han Sans TW", "Source Han Sans", sans-serif; }
	:host-context(.linux:lang(ja)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans J", "Source Han Sans JP", "Source Han Sans", sans-serif; }
	:host-context(.linux:lang(ko)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans K", "Source Han Sans JR", "Source Han Sans", "UnDotum", "FBaekmuk Gulim", sans-serif; }
`;export{H as $T_,A as $U_,r as $V_,E as AnchorAlignment,F as AnchorAxisAlignment,I as AnchorPosition,c as ContextViewDOMPosition};
