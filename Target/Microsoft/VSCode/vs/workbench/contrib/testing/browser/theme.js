import{localize as e}from"../../../../nls.js";import{$Vp as C,$Up as q,$Qp as P,$Rp as w,$Pr as x,$Lr as B,$Ep as n,$Wq as l,$Xq as c,$5p as d,$dq as g,$6p as F,$jq as i,$sp as v,$mp as t,$rp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Pt as E}from"../../../../platform/theme/common/themeService.js";const j=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12256,null)),m=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12257,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12258,null)),V=t("testing.runAction",k,e(12259,null)),D=t("testing.iconQueued","#cca700",e(12260,null)),f=t("testing.iconUnset","#848484",e(12261,null)),L=t("testing.iconSkipped","#848484",e(12262,null)),Y=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12263,null)),Z=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12264,null)),_=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12265,null)),y=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12266,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12267,null)),Q=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12268,null)),I=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12269,null)),J=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12270,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12271,null)),R=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12272,null)),K=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12273,null)),M=t("testing.coverCountBadgeBackground",P,e(12274,null)),N=t("testing.coverCountBadgeForeground",w,e(12275,null)),b=t("testing.message.error.badgeBackground",C,e(12276,null));t("testing.message.error.badgeBorder",b,e(12277,null));t("testing.message.error.badgeForeground",q,e(12278,null));t("testing.message.error.lineBackground",null,e(12279,null));t("testing.message.info.decorationForeground",r(F,.5),e(12280,null));t("testing.message.info.lineBackground",null,e(12281,null));const T={6:m,4:j,3:k,1:D,0:f,5:L},U=t("testing.iconErrored.retired",r(m,.7),e(12282,null)),G=t("testing.iconFailed.retired",r(j,.7),e(12283,null)),H=t("testing.iconPassed.retired",r(k,.7),e(12284,null)),O=t("testing.iconQueued.retired",r(D,.7),e(12285,null)),S=t("testing.iconUnset.retired",r(f,.7),e(12286,null)),W=t("testing.iconSkipped.retired",r(L,.7),e(12287,null)),ee={6:U,4:G,3:H,1:O,0:S,5:W};E((o,h)=>{const s=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(Q)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(R)?.transparent(2)};
	}
		`),s){const p=o.getColor(a)?.transparent(2).makeOpaque(s),$=o.getColor(b)?.makeOpaque(s);h.addRule(`
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
		`)}});export{J as $$jc,I as $0jc,D as $1jc,f as $2jc,L as $3jc,Y as $4jc,Z as $5jc,_ as $6jc,y as $7jc,u as $8jc,Q as $9jc,j as $Wjc,m as $Xjc,k as $Yjc,V as $Zjc,a as $_jc,R as $akc,K as $bkc,M as $ckc,N as $dkc,T as $ekc,U as $fkc,G as $gkc,H as $hkc,O as $ikc,S as $jkc,W as $kkc,ee as $lkc};
