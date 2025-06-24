import{localize as e}from"../../../../nls.js";import{$Xp as q,$Wp as w,$Sp as F,$Tp as S,$Sr as x,$Or as B,$Gp as n,$Zq as l,$1q as c,$7p as d,$gq as g,$8p as G,$mq as i,$up as v,$op as t,$tp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$St as P}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12463,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12464,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12465,null)),W=t("testing.runAction",k,e(12466,null)),f=t("testing.iconQueued","#cca700",e(12467,null)),L=t("testing.iconUnset","#848484",e(12468,null)),b=t("testing.iconSkipped","#848484",e(12469,null)),X=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12470,null)),Z=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12471,null)),I=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12472,null)),J=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12473,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12474,null)),E=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12475,null)),K=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12476,null)),M=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12477,null)),s=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12478,null)),O=t("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},e(12479,null)),N=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12480,null)),V=t("testing.coverCountBadgeBackground",F,e(12481,null)),Y=t("testing.coverCountBadgeForeground",S,e(12482,null)),C=t("testing.message.error.badgeBackground",q,e(12483,null));t("testing.message.error.badgeBorder",C,e(12484,null));t("testing.message.error.badgeForeground",w,e(12485,null));t("testing.message.error.lineBackground",null,e(12486,null));t("testing.message.info.decorationForeground",r(G,.5),e(12487,null));t("testing.message.info.lineBackground",null,e(12488,null));const _={6:D,4:m,3:k,1:f,0:L,5:b},z=t("testing.iconErrored.retired",r(D,.7),e(12489,null)),A=t("testing.iconFailed.retired",r(m,.7),e(12490,null)),H=t("testing.iconPassed.retired",r(k,.7),e(12491,null)),Q=t("testing.iconQueued.retired",r(f,.7),e(12492,null)),R=t("testing.iconUnset.retired",r(L,.7),e(12493,null)),U=t("testing.iconSkipped.retired",r(b,.7),e(12494,null)),ee={6:z,4:A,3:H,1:Q,0:R,5:U};P((o,h)=>{const a=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(E)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(O)?.transparent(2)};
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
		`)}});export{z as $Akc,A as $Bkc,H as $Ckc,Q as $Dkc,R as $Ekc,U as $Fkc,ee as $Gkc,m as $fkc,D as $gkc,k as $hkc,W as $ikc,f as $jkc,L as $kkc,b as $lkc,X as $mkc,Z as $nkc,I as $okc,J as $pkc,u as $qkc,E as $rkc,K as $skc,M as $tkc,s as $ukc,O as $vkc,N as $wkc,V as $xkc,Y as $ykc,_ as $zkc};
