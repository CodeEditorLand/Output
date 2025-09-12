import{localize as e}from"../../../../nls.js";import{$6p as q,$5p as w,$1p as F,$2p as P,$1r as m,$Wr as B,$Op as n,$8q as l,$9q as c,$cq as d,$oq as g,$dq as O,$uq as i,$Cp as x,$wp as t,$Bp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$1t as Q}from"../../../../platform/theme/common/themeService.js";const v=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12834,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12835,null)),h=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12836,null)),N=t("testing.runAction",h,e(12837,null)),L=t("testing.iconQueued","#cca700",e(12838,null)),f=t("testing.iconUnset","#848484",e(12839,null)),b=t("testing.iconSkipped","#848484",e(12840,null)),T=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12841,null)),V=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12842,null)),X=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12843,null)),Y=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12844,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12845,null)),R=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12846,null)),Z=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:m,hcLight:m},e(12847,null)),_=t("testing.uncoveredBranchBackground",{dark:x(r(c,2),d),light:x(r(c,2),d),hcDark:null,hcLight:null},e(12848,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12849,null)),S=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12850,null)),j=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12851,null)),y=t("testing.coverCountBadgeBackground",F,e(12852,null)),I=t("testing.coverCountBadgeForeground",P,e(12853,null)),C=t("testing.message.error.badgeBackground",q,e(12854,null));t("testing.message.error.badgeBorder",C,e(12855,null));t("testing.message.error.badgeForeground",w,e(12856,null));t("testing.message.error.lineBackground",null,e(12857,null));t("testing.message.info.decorationForeground",r(O,.5),e(12858,null));t("testing.message.info.lineBackground",null,e(12859,null));const J={6:D,4:v,3:h,1:L,0:f,5:b},U=t("testing.iconErrored.retired",r(D,.7),e(12860,null)),E=t("testing.iconFailed.retired",r(v,.7),e(12861,null)),G=t("testing.iconPassed.retired",r(h,.7),e(12862,null)),H=t("testing.iconQueued.retired",r(L,.7),e(12863,null)),W=t("testing.iconUnset.retired",r(f,.7),e(12864,null)),z=t("testing.iconSkipped.retired",r(b,.7),e(12865,null)),ee={6:U,4:E,3:G,1:H,0:W,5:z};Q((o,k)=>{const s=o.getColor(d);if(k.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(R)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(S)?.transparent(2)};
	}
		`),s){const $=o.getColor(a)?.transparent(2).makeOpaque(s),p=o.getColor(C)?.makeOpaque(s);k.addRule(`
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
		`)}});export{z as $$mc,W as $0mc,S as $1mc,j as $2mc,y as $3mc,I as $4mc,J as $5mc,U as $6mc,E as $7mc,G as $8mc,H as $9mc,v as $Kmc,D as $Lmc,h as $Mmc,N as $Nmc,L as $Omc,f as $Pmc,b as $Qmc,T as $Rmc,V as $Smc,X as $Tmc,Y as $Umc,u as $Vmc,R as $Wmc,Z as $Xmc,_ as $Ymc,a as $Zmc,ee as $_mc};
