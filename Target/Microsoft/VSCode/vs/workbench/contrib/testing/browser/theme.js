import{localize as e}from"../../../../nls.js";import{$Xp as j,$Wp as q,$Sp as w,$Tp as F,$Rr as x,$Nr as B,$Gp as n,$Yq as l,$Zq as c,$7p as d,$fq as g,$8p as P,$lq as i,$up as v,$op as t,$tp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Rt as R}from"../../../../platform/theme/common/themeService.js";const m=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12297,null)),f=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12298,null)),k=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12299,null)),W=t("testing.runAction",k,e(12300,null)),D=t("testing.iconQueued","#cca700",e(12301,null)),L=t("testing.iconUnset","#848484",e(12302,null)),b=t("testing.iconSkipped","#848484",e(12303,null)),X=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12304,null)),Y=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12305,null)),Z=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12306,null)),_=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12307,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12308,null)),G=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12309,null)),y=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12310,null)),I=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12311,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12312,null)),S=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12313,null)),J=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12314,null)),K=t("testing.coverCountBadgeBackground",w,e(12315,null)),M=t("testing.coverCountBadgeForeground",F,e(12316,null)),C=t("testing.message.error.badgeBackground",j,e(12317,null));t("testing.message.error.badgeBorder",C,e(12318,null));t("testing.message.error.badgeForeground",q,e(12319,null));t("testing.message.error.lineBackground",null,e(12320,null));t("testing.message.info.decorationForeground",r(P,.5),e(12321,null));t("testing.message.info.lineBackground",null,e(12322,null));const V={6:f,4:m,3:k,1:D,0:L,5:b},E=t("testing.iconErrored.retired",r(f,.7),e(12323,null)),H=t("testing.iconFailed.retired",r(m,.7),e(12324,null)),O=t("testing.iconPassed.retired",r(k,.7),e(12325,null)),Q=t("testing.iconQueued.retired",r(D,.7),e(12326,null)),U=t("testing.iconUnset.retired",r(L,.7),e(12327,null)),z=t("testing.iconSkipped.retired",r(b,.7),e(12328,null)),ee={6:E,4:H,3:O,1:Q,0:U,5:z};R((o,h)=>{const s=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(G)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(S)?.transparent(2)};
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
		`)}});export{D as $$jc,W as $0jc,m as $7jc,f as $8jc,k as $9jc,L as $_jc,b as $akc,X as $bkc,Y as $ckc,Z as $dkc,_ as $ekc,u as $fkc,G as $gkc,y as $hkc,I as $ikc,a as $jkc,S as $kkc,J as $lkc,K as $mkc,M as $nkc,V as $okc,E as $pkc,H as $qkc,O as $rkc,Q as $skc,U as $tkc,z as $ukc,ee as $vkc};
