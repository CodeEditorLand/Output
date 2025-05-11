import{localize as e}from"../../../../nls.js";import{$Mp as q,$Lp as w,$Hp as F,$Ip as G,$Gr as x,$Cr as B,$vp as n,$Nq as l,$Oq as c,$Vp as d,$7p as g,$Wp as H,$aq as i,$jp as v,$dp as t,$ip as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Gt as P}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12057,null)),D=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12058,null)),u=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12059,null)),M=t("testing.runAction",u,e(12060,null)),L=t("testing.iconQueued","#cca700",e(12061,null)),f=t("testing.iconUnset","#848484",e(12062,null)),b=t("testing.iconSkipped","#848484",e(12063,null)),N=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12064,null)),V=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12065,null)),W=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12066,null)),J=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12067,null)),h=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12068,null)),E=t("testing.coveredBorder",{dark:r(h,.75),light:r(h,.75),hcDark:n,hcLight:n},e(12069,null)),K=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12070,null)),T=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12071,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12072,null)),O=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12073,null)),X=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12074,null)),Y=t("testing.coverCountBadgeBackground",F,e(12075,null)),Z=t("testing.coverCountBadgeForeground",G,e(12076,null)),C=t("testing.message.error.badgeBackground",q,e(12077,null));t("testing.message.error.badgeBorder",C,e(12078,null));t("testing.message.error.badgeForeground",w,e(12079,null));t("testing.message.error.lineBackground",null,e(12080,null));t("testing.message.info.decorationForeground",r(H,.5),e(12081,null));t("testing.message.info.lineBackground",null,e(12082,null));const _={6:D,4:m,3:u,1:L,0:f,5:b},j=t("testing.iconErrored.retired",r(D,.7),e(12083,null)),z=t("testing.iconFailed.retired",r(m,.7),e(12084,null)),A=t("testing.iconPassed.retired",r(u,.7),e(12085,null)),I=t("testing.iconQueued.retired",r(L,.7),e(12086,null)),Q=t("testing.iconUnset.retired",r(f,.7),e(12087,null)),R=t("testing.iconSkipped.retired",r(b,.7),e(12088,null)),ee={6:j,4:z,3:A,1:I,0:Q,5:R};P((o,k)=>{const s=o.getColor(d);if(k.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(h)?.transparent(1.3)};
		outline-color: ${o.getColor(E)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(O)?.transparent(2)};
	}
		`),s){const p=o.getColor(a)?.transparent(2).makeOpaque(s),$=o.getColor(C)?.makeOpaque(s);k.addRule(`
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
		`)}});export{Z as $Ahc,_ as $Bhc,j as $Chc,z as $Dhc,A as $Ehc,I as $Fhc,Q as $Ghc,R as $Hhc,ee as $Ihc,m as $hhc,D as $ihc,u as $jhc,M as $khc,L as $lhc,f as $mhc,b as $nhc,N as $ohc,V as $phc,W as $qhc,J as $rhc,h as $shc,E as $thc,K as $uhc,T as $vhc,a as $whc,O as $xhc,X as $yhc,Y as $zhc};
