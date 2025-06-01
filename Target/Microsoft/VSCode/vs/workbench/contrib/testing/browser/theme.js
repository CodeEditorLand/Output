import{localize as e}from"../../../../nls.js";import{$Xp as q,$Wp as w,$Sp as F,$Tp as G,$Rr as x,$Nr as B,$Gp as n,$Yq as l,$Zq as c,$7p as d,$fq as g,$8p as P,$lq as i,$up as v,$op as t,$tp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Rt as R}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12367,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12368,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12369,null)),T=t("testing.runAction",k,e(12370,null)),f=t("testing.iconQueued","#cca700",e(12371,null)),L=t("testing.iconUnset","#848484",e(12372,null)),b=t("testing.iconSkipped","#848484",e(12373,null)),W=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12374,null)),X=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12375,null)),Y=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12376,null)),Z=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12377,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12378,null)),E=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12379,null)),I=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12380,null)),J=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12381,null)),s=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12382,null)),H=t("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},e(12383,null)),K=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12384,null)),M=t("testing.coverCountBadgeBackground",F,e(12385,null)),V=t("testing.coverCountBadgeForeground",G,e(12386,null)),C=t("testing.message.error.badgeBackground",q,e(12387,null));t("testing.message.error.badgeBorder",C,e(12388,null));t("testing.message.error.badgeForeground",w,e(12389,null));t("testing.message.error.lineBackground",null,e(12390,null));t("testing.message.info.decorationForeground",r(P,.5),e(12391,null));t("testing.message.info.lineBackground",null,e(12392,null));const _={6:D,4:m,3:k,1:f,0:L,5:b},S=t("testing.iconErrored.retired",r(D,.7),e(12393,null)),z=t("testing.iconFailed.retired",r(m,.7),e(12394,null)),A=t("testing.iconPassed.retired",r(k,.7),e(12395,null)),O=t("testing.iconQueued.retired",r(f,.7),e(12396,null)),Q=t("testing.iconUnset.retired",r(L,.7),e(12397,null)),U=t("testing.iconSkipped.retired",r(b,.7),e(12398,null)),ee={6:S,4:z,3:A,1:O,0:Q,5:U};R((o,h)=>{const a=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(E)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(H)?.transparent(2)};
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
		`)}});export{_ as $Akc,S as $Bkc,z as $Ckc,A as $Dkc,O as $Ekc,Q as $Fkc,U as $Gkc,ee as $Hkc,m as $gkc,D as $hkc,k as $ikc,T as $jkc,f as $kkc,L as $lkc,b as $mkc,W as $nkc,X as $okc,Y as $pkc,Z as $qkc,u as $rkc,E as $skc,I as $tkc,J as $ukc,s as $vkc,H as $wkc,K as $xkc,M as $ykc,V as $zkc};
