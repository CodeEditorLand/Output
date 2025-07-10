import{localize as e}from"../../../../nls.js";import{$2p as q,$1p as w,$Wp as F,$Xp as P,$Wr as x,$Sr as B,$Kp as n,$4q as l,$5q as c,$$p as d,$kq as g,$_p as E,$qq as i,$yp as v,$sp as t,$xp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Wt as G}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12660,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12661,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12662,null)),I=t("testing.runAction",k,e(12663,null)),L=t("testing.iconQueued","#cca700",e(12664,null)),f=t("testing.iconUnset","#848484",e(12665,null)),b=t("testing.iconSkipped","#848484",e(12666,null)),J=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12667,null)),X=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12668,null)),_=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12669,null)),j=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12670,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12671,null)),H=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12672,null)),M=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12673,null)),N=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12674,null)),s=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12675,null)),S=t("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},e(12676,null)),T=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12677,null)),V=t("testing.coverCountBadgeBackground",F,e(12678,null)),Y=t("testing.coverCountBadgeForeground",P,e(12679,null)),C=t("testing.message.error.badgeBackground",q,e(12680,null));t("testing.message.error.badgeBorder",C,e(12681,null));t("testing.message.error.badgeForeground",w,e(12682,null));t("testing.message.error.lineBackground",null,e(12683,null));t("testing.message.info.decorationForeground",r(E,.5),e(12684,null));t("testing.message.info.lineBackground",null,e(12685,null));const Z={6:D,4:m,3:k,1:L,0:f,5:b},W=t("testing.iconErrored.retired",r(D,.7),e(12686,null)),y=t("testing.iconFailed.retired",r(m,.7),e(12687,null)),z=t("testing.iconPassed.retired",r(k,.7),e(12688,null)),A=t("testing.iconQueued.retired",r(L,.7),e(12689,null)),K=t("testing.iconUnset.retired",r(f,.7),e(12690,null)),O=t("testing.iconSkipped.retired",r(b,.7),e(12691,null)),ee={6:W,4:y,3:z,1:A,0:K,5:O};G((o,h)=>{const a=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(H)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(S)?.transparent(2)};
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
		`)}});export{S as $Alc,T as $Blc,V as $Clc,Y as $Dlc,Z as $Elc,W as $Flc,y as $Glc,z as $Hlc,A as $Ilc,K as $Jlc,O as $Klc,ee as $Llc,m as $klc,D as $llc,k as $mlc,I as $nlc,L as $olc,f as $plc,b as $qlc,J as $rlc,X as $slc,_ as $tlc,j as $ulc,u as $vlc,H as $wlc,M as $xlc,N as $ylc,s as $zlc};
