import{localize as e}from"../../../../nls.js";import{$Np as w,$Mp as q,$Ip as F,$Jp as H,$Hr as x,$Dr as B,$wp as n,$Oq as l,$Pq as c,$Wp as d,$8p as g,$Xp as P,$bq as i,$kp as v,$ep as t,$jp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Ht as E}from"../../../../platform/theme/common/themeService.js";const D=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12077,null)),m=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12078,null)),u=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12079,null)),j=t("testing.runAction",u,e(12080,null)),L=t("testing.iconQueued","#cca700",e(12081,null)),f=t("testing.iconUnset","#848484",e(12082,null)),b=t("testing.iconSkipped","#848484",e(12083,null)),y=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12084,null)),K=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12085,null)),N=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12086,null)),W=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12087,null)),h=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12088,null)),G=t("testing.coveredBorder",{dark:r(h,.75),light:r(h,.75),hcDark:n,hcLight:n},e(12089,null)),X=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12090,null)),T=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12091,null)),s=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12092,null)),O=t("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},e(12093,null)),V=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12094,null)),Y=t("testing.coverCountBadgeBackground",F,e(12095,null)),Z=t("testing.coverCountBadgeForeground",H,e(12096,null)),C=t("testing.message.error.badgeBackground",w,e(12097,null));t("testing.message.error.badgeBorder",C,e(12098,null));t("testing.message.error.badgeForeground",q,e(12099,null));t("testing.message.error.lineBackground",null,e(12100,null));t("testing.message.info.decorationForeground",r(P,.5),e(12101,null));t("testing.message.info.lineBackground",null,e(12102,null));const _={6:m,4:D,3:u,1:L,0:f,5:b},z=t("testing.iconErrored.retired",r(m,.7),e(12103,null)),A=t("testing.iconFailed.retired",r(D,.7),e(12104,null)),I=t("testing.iconPassed.retired",r(u,.7),e(12105,null)),J=t("testing.iconQueued.retired",r(L,.7),e(12106,null)),M=t("testing.iconUnset.retired",r(f,.7),e(12107,null)),Q=t("testing.iconSkipped.retired",r(b,.7),e(12108,null)),ee={6:z,4:A,3:I,1:J,0:M,5:Q};E((o,k)=>{const a=o.getColor(d);if(k.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(h)?.transparent(1.3)};
		outline-color: ${o.getColor(G)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(O)?.transparent(2)};
	}
		`),a){const p=o.getColor(s)?.transparent(2).makeOpaque(a),$=o.getColor(C)?.makeOpaque(a);k.addRule(`
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
		`)}});export{s as $Ahc,O as $Bhc,V as $Chc,Y as $Dhc,Z as $Ehc,_ as $Fhc,z as $Ghc,A as $Hhc,I as $Ihc,J as $Jhc,M as $Khc,Q as $Lhc,ee as $Mhc,D as $lhc,m as $mhc,u as $nhc,j as $ohc,L as $phc,f as $qhc,b as $rhc,y as $shc,K as $thc,N as $uhc,W as $vhc,h as $whc,G as $xhc,X as $yhc,T as $zhc};
