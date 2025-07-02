import{localize as e}from"../../../../nls.js";import{$Zp as q,$Yp as w,$Up as F,$Vp as U,$Ur as x,$Qr as B,$Ip as n,$2q as l,$3q as c,$9p as d,$iq as g,$0p as P,$oq as i,$wp as v,$qp as t,$vp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Ut as Q}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12618,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12619,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12620,null)),Y=t("testing.runAction",k,e(12621,null)),f=t("testing.iconQueued","#cca700",e(12622,null)),L=t("testing.iconUnset","#848484",e(12623,null)),b=t("testing.iconSkipped","#848484",e(12624,null)),Z=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12625,null)),_=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12626,null)),y=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12627,null)),J=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12628,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12629,null)),E=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12630,null)),K=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12631,null)),M=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12632,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12633,null)),G=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12634,null)),N=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12635,null)),T=t("testing.coverCountBadgeBackground",F,e(12636,null)),W=t("testing.coverCountBadgeForeground",U,e(12637,null)),C=t("testing.message.error.badgeBackground",q,e(12638,null));t("testing.message.error.badgeBorder",C,e(12639,null));t("testing.message.error.badgeForeground",w,e(12640,null));t("testing.message.error.lineBackground",null,e(12641,null));t("testing.message.info.decorationForeground",r(P,.5),e(12642,null));t("testing.message.info.lineBackground",null,e(12643,null));const X={6:D,4:m,3:k,1:f,0:L,5:b},H=t("testing.iconErrored.retired",r(D,.7),e(12644,null)),O=t("testing.iconFailed.retired",r(m,.7),e(12645,null)),R=t("testing.iconPassed.retired",r(k,.7),e(12646,null)),S=t("testing.iconQueued.retired",r(f,.7),e(12647,null)),j=t("testing.iconUnset.retired",r(L,.7),e(12648,null)),z=t("testing.iconSkipped.retired",r(b,.7),e(12649,null)),ee={6:H,4:O,3:R,1:S,0:j,5:z};Q((o,h)=>{const s=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(E)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(G)?.transparent(2)};
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
		`)}});export{J as $$kc,y as $0kc,m as $1kc,D as $2kc,k as $3kc,Y as $4kc,f as $5kc,L as $6kc,b as $7kc,Z as $8kc,_ as $9kc,u as $_kc,E as $alc,K as $blc,M as $clc,a as $dlc,G as $elc,N as $flc,T as $glc,W as $hlc,X as $ilc,H as $jlc,O as $klc,R as $llc,S as $mlc,j as $nlc,z as $olc,ee as $plc};
