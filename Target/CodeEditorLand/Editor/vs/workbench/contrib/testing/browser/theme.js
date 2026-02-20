import{localize as e}from"../../../../nls.js";import{$zq as C,$yq as w,$uq as F,$vq as P,$vs as p,$rs as B,$hq as n,$Cr as l,$Dr as c,$Jq as d,$Vq as g,$Kq as z,$2q as i,$8p as v,$2p as t,$7p as r}from"../../../../platform/theme/common/colorRegistry.js";import{$xu as E}from"../../../../platform/theme/common/themeService.js";const D=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(15276,null)),m=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(15277,null)),h=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(15278,null)),I=t("testing.runAction",h,e(15279,null)),L=t("testing.iconQueued","#cca700",e(15280,null)),f=t("testing.iconUnset","#848484",e(15281,null)),b=t("testing.iconSkipped","#848484",e(15282,null)),M=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(15283,null)),V=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(15284,null)),j=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(15285,null)),N=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(15286,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(15287,null)),G=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(15288,null)),T=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:p,hcLight:p},e(15289,null)),W=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(15290,null)),s=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(15291,null)),H=t("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},e(15292,null)),X=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(15293,null)),Y=t("testing.coverCountBadgeBackground",F,e(15294,null)),Z=t("testing.coverCountBadgeForeground",P,e(15295,null)),q=t("testing.message.error.badgeBackground",C,e(15296,null));t("testing.message.error.badgeBorder",q,e(15297,null));t("testing.message.error.badgeForeground",w,e(15298,null));t("testing.message.error.lineBackground",null,e(15299,null));t("testing.message.info.decorationForeground",r(z,.5),e(15300,null));t("testing.message.info.lineBackground",null,e(15301,null));const _={6:m,4:D,3:h,1:L,0:f,5:b},y=t("testing.iconErrored.retired",r(m,.7),e(15302,null)),A=t("testing.iconFailed.retired",r(D,.7),e(15303,null)),J=t("testing.iconPassed.retired",r(h,.7),e(15304,null)),K=t("testing.iconQueued.retired",r(L,.7),e(15305,null)),O=t("testing.iconUnset.retired",r(f,.7),e(15306,null)),Q=t("testing.iconSkipped.retired",r(b,.7),e(15307,null)),ee={6:y,4:A,3:J,1:K,0:O,5:Q};E((o,x)=>{const a=o.getColor(d);if(x.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(G)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(H)?.transparent(2)};
	}
		`),a){const k=o.getColor(s)?.transparent(2).makeOpaque(a),$=o.getColor(q)?.makeOpaque(a);x.addRule(`
			.coverage-deco-branch-miss-indicator::before {
				border-color: ${k?.transparent(1.3)};
				background-color: ${k};
			}
			.monaco-workbench .test-error-content-widget .inner{
				background: ${$};
			}
			.monaco-workbench .test-error-content-widget .inner .arrow svg {
				fill: ${$};
			}
		`)}});export{s as $Axc,H as $Bxc,X as $Cxc,Y as $Dxc,Z as $Exc,_ as $Fxc,y as $Gxc,A as $Hxc,J as $Ixc,K as $Jxc,O as $Kxc,Q as $Lxc,ee as $Mxc,D as $lxc,m as $mxc,h as $nxc,I as $oxc,L as $pxc,f as $qxc,b as $rxc,M as $sxc,V as $txc,j as $uxc,N as $vxc,u as $wxc,G as $xxc,T as $yxc,W as $zxc};
