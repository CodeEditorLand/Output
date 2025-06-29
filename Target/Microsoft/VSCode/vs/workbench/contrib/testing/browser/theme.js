import{localize as e}from"../../../../nls.js";import{$Yp as q,$Xp as P,$Tp as w,$Up as F,$Tr as x,$Pr as B,$Hp as n,$1q as l,$2q as c,$8p as d,$hq as g,$9p as T,$nq as i,$vp as v,$pp as t,$up as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Tt as U}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12563,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12564,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12565,null)),V=t("testing.runAction",k,e(12566,null)),f=t("testing.iconQueued","#cca700",e(12567,null)),L=t("testing.iconUnset","#848484",e(12568,null)),b=t("testing.iconSkipped","#848484",e(12569,null)),W=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12570,null)),Z=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12571,null)),_=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12572,null)),j=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12573,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12574,null)),H=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12575,null)),y=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12576,null)),I=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12577,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12578,null)),O=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12579,null)),J=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12580,null)),K=t("testing.coverCountBadgeBackground",w,e(12581,null)),M=t("testing.coverCountBadgeForeground",F,e(12582,null)),C=t("testing.message.error.badgeBackground",q,e(12583,null));t("testing.message.error.badgeBorder",C,e(12584,null));t("testing.message.error.badgeForeground",P,e(12585,null));t("testing.message.error.lineBackground",null,e(12586,null));t("testing.message.info.decorationForeground",r(T,.5),e(12587,null));t("testing.message.info.lineBackground",null,e(12588,null));const N={6:D,4:m,3:k,1:f,0:L,5:b},Q=t("testing.iconErrored.retired",r(D,.7),e(12589,null)),R=t("testing.iconFailed.retired",r(m,.7),e(12590,null)),S=t("testing.iconPassed.retired",r(k,.7),e(12591,null)),E=t("testing.iconQueued.retired",r(f,.7),e(12592,null)),G=t("testing.iconUnset.retired",r(L,.7),e(12593,null)),X=t("testing.iconSkipped.retired",r(b,.7),e(12594,null)),ee={6:Q,4:R,3:S,1:E,0:G,5:X};U((o,h)=>{const s=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(H)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(O)?.transparent(2)};
	}
		`),s){const p=o.getColor(a)?.transparent(2).makeOpaque(s),$=o.getColor(C)?.makeOpaque(s);h.addRule(`
			.coverage-deco-branch-miss-indicator::before {
				border-color: ${p?.transparent(1.3)};
				background-color: ${p};
			}
			.monaco-workbench .test-error-content-widget .inner{
				background: ${$};
			}
			.monaco-workbench .test-error-content-widget .inner .arrow svg {
				fill: ${$};
			}
		`)}});export{R as $$kc,Q as $0kc,H as $1kc,y as $2kc,I as $3kc,a as $4kc,O as $5kc,J as $6kc,K as $7kc,M as $8kc,N as $9kc,m as $Okc,D as $Pkc,k as $Qkc,V as $Rkc,f as $Skc,L as $Tkc,b as $Ukc,W as $Vkc,Z as $Wkc,_ as $Xkc,j as $Ykc,u as $Zkc,S as $_kc,E as $alc,G as $blc,X as $clc,ee as $dlc};
