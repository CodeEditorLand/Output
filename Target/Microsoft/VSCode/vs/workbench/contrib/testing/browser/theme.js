import{localize as e}from"../../../../nls.js";import{$2p as q,$1p as w,$Wp as F,$Xp as P,$Wr as x,$Sr as B,$Kp as n,$4q as l,$5q as c,$$p as d,$kq as g,$_p as S,$qq as i,$yp as v,$sp as t,$xp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Wt as W}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12646,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12647,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12648,null)),j=t("testing.runAction",k,e(12649,null)),f=t("testing.iconQueued","#cca700",e(12650,null)),L=t("testing.iconUnset","#848484",e(12651,null)),b=t("testing.iconSkipped","#848484",e(12652,null)),K=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12653,null)),X=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12654,null)),I=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12655,null)),J=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12656,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12657,null)),y=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12658,null)),M=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12659,null)),N=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12660,null)),s=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12661,null)),z=t("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},e(12662,null)),T=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12663,null)),V=t("testing.coverCountBadgeBackground",F,e(12664,null)),Y=t("testing.coverCountBadgeForeground",P,e(12665,null)),C=t("testing.message.error.badgeBackground",q,e(12666,null));t("testing.message.error.badgeBorder",C,e(12667,null));t("testing.message.error.badgeForeground",w,e(12668,null));t("testing.message.error.lineBackground",null,e(12669,null));t("testing.message.info.decorationForeground",r(S,.5),e(12670,null));t("testing.message.info.lineBackground",null,e(12671,null));const Z={6:D,4:m,3:k,1:f,0:L,5:b},A=t("testing.iconErrored.retired",r(D,.7),e(12672,null)),E=t("testing.iconFailed.retired",r(m,.7),e(12673,null)),G=t("testing.iconPassed.retired",r(k,.7),e(12674,null)),H=t("testing.iconQueued.retired",r(f,.7),e(12675,null)),O=t("testing.iconUnset.retired",r(L,.7),e(12676,null)),Q=t("testing.iconSkipped.retired",r(b,.7),e(12677,null)),ee={6:A,4:E,3:G,1:H,0:O,5:Q};W((o,h)=>{const a=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(y)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(z)?.transparent(2)};
	}
		`),a){const p=o.getColor(s)?.transparent(2).makeOpaque(a),$=o.getColor(C)?.makeOpaque(a);h.addRule(`
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
		`)}});export{ee as $Alc,m as $_kc,D as $alc,k as $blc,j as $clc,f as $dlc,L as $elc,b as $flc,K as $glc,X as $hlc,I as $ilc,J as $jlc,u as $klc,y as $llc,M as $mlc,N as $nlc,s as $olc,z as $plc,T as $qlc,V as $rlc,Y as $slc,Z as $tlc,A as $ulc,E as $vlc,G as $wlc,H as $xlc,O as $ylc,Q as $zlc};
