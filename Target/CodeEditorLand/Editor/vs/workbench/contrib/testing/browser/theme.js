import{localize as t}from"../../../../nls.js";import{$yq as C,$xq as w,$tq as F,$uq as P,$us as x,$qs as B,$gq as n,$Br as l,$Cr as c,$Iq as d,$Uq as g,$Jq as E,$1q as i,$7p as v,$1p as e,$6p as r}from"../../../../platform/theme/common/colorRegistry.js";import{$vu as U}from"../../../../platform/theme/common/themeService.js";const m=e("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},t(14033,null)),D=e("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},t(14034,null)),h=e("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},t(14035,null)),J=e("testing.runAction",h,t(14036,null)),f=e("testing.iconQueued","#cca700",t(14037,null)),L=e("testing.iconUnset","#848484",t(14038,null)),q=e("testing.iconSkipped","#848484",t(14039,null)),K=e("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},t(14040,null)),M=e("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},t(14041,null)),N=e("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},t(14042,null)),T=e("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},t(14043,null)),u=e("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},t(14044,null)),y=e("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},t(14045,null)),V=e("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},t(14046,null)),W=e("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},t(14047,null)),s=e("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},t(14048,null)),z=e("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},t(14049,null)),X=e("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},t(14050,null)),Y=e("testing.coverCountBadgeBackground",F,t(14051,null)),Z=e("testing.coverCountBadgeForeground",P,t(14052,null)),b=e("testing.message.error.badgeBackground",C,t(14053,null));e("testing.message.error.badgeBorder",b,t(14054,null));e("testing.message.error.badgeForeground",w,t(14055,null));e("testing.message.error.lineBackground",null,t(14056,null));e("testing.message.info.decorationForeground",r(E,.5),t(14057,null));e("testing.message.info.lineBackground",null,t(14058,null));const _={6:D,4:m,3:h,1:f,0:L,5:q},A=e("testing.iconErrored.retired",r(D,.7),t(14059,null)),G=e("testing.iconFailed.retired",r(m,.7),t(14060,null)),H=e("testing.iconPassed.retired",r(h,.7),t(14061,null)),O=e("testing.iconQueued.retired",r(f,.7),t(14062,null)),Q=e("testing.iconUnset.retired",r(L,.7),t(14063,null)),R=e("testing.iconSkipped.retired",r(q,.7),t(14064,null)),tt={6:A,4:G,3:H,1:O,0:Q,5:R};U((o,k)=>{const a=o.getColor(d);if(k.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(y)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(z)?.transparent(2)};
	}
		`),a){const $=o.getColor(s)?.transparent(2).makeOpaque(a),p=o.getColor(b)?.makeOpaque(a);k.addRule(`
			.coverage-deco-branch-miss-indicator::before {
				border-color: ${$?.transparent(1.3)};
				background-color: ${$};
			}
			.monaco-workbench .test-error-content-widget .inner{
				background: ${p};
			}
			.monaco-workbench .test-error-content-widget .inner .arrow svg {
				fill: ${p};
			}
		`)}});export{H as $Atc,O as $Btc,Q as $Ctc,R as $Dtc,tt as $Etc,m as $dtc,D as $etc,h as $ftc,J as $gtc,f as $htc,L as $itc,q as $jtc,K as $ktc,M as $ltc,N as $mtc,T as $ntc,u as $otc,y as $ptc,V as $qtc,W as $rtc,s as $stc,z as $ttc,X as $utc,Y as $vtc,Z as $wtc,_ as $xtc,A as $ytc,G as $ztc};
