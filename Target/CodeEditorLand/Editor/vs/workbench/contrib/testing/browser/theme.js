import{localize as e}from"../../../../nls.js";import{$Fq as C,$Eq as F,$Aq as w,$Bq as P,$Bs as p,$xs as x,$nq as n,$Ir as l,$Jr as c,$Pq as d,$2q as g,$Qq as E,$8q as i,$bq as v,$8p as t,$aq as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Du as A}from"../../../../platform/theme/common/themeService.js";const D=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(16130,null)),m=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(16131,null)),B=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(16132,null)),K=t("testing.runAction",B,e(16133,null)),L=t("testing.iconQueued","#cca700",e(16134,null)),f=t("testing.iconUnset","#848484",e(16135,null)),q=t("testing.iconSkipped","#848484",e(16136,null)),M=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(16137,null)),N=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(16138,null)),j=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(16139,null)),T=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(16140,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(16141,null)),G=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(16142,null)),V=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:p,hcLight:p},e(16143,null)),W=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(16144,null)),s=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(16145,null)),H=t("testing.uncoveredBorder",{dark:r(s,.75),light:r(s,.75),hcDark:n,hcLight:n},e(16146,null)),X=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:x,hcLight:x},e(16147,null)),Y=t("testing.coverCountBadgeBackground",w,e(16148,null)),Z=t("testing.coverCountBadgeForeground",P,e(16149,null)),b=t("testing.message.error.badgeBackground",C,e(16150,null));t("testing.message.error.badgeBorder",b,e(16151,null));t("testing.message.error.badgeForeground",F,e(16152,null));t("testing.message.error.lineBackground",null,e(16153,null));t("testing.message.info.decorationForeground",r(E,.5),e(16154,null));t("testing.message.info.lineBackground",null,e(16155,null));const _={6:m,4:D,3:B,1:L,0:f,5:q},Q=t("testing.iconErrored.retired",r(m,.7),e(16156,null)),z=t("testing.iconFailed.retired",r(D,.7),e(16157,null)),I=t("testing.iconPassed.retired",r(B,.7),e(16158,null)),J=t("testing.iconQueued.retired",r(L,.7),e(16159,null)),O=t("testing.iconUnset.retired",r(f,.7),e(16160,null)),R=t("testing.iconSkipped.retired",r(q,.7),e(16161,null)),ee={6:Q,4:z,3:I,1:J,0:O,5:R};A((o,h)=>{const a=o.getColor(d);if(h.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(G)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(s)?.transparent(1.3)};
		outline-color: ${o.getColor(H)?.transparent(2)};
	}
		`),a){const k=o.getColor(s)?.transparent(2).makeOpaque(a),$=o.getColor(b)?.makeOpaque(a);h.addRule(`
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
		`)}});export{W as $ABc,s as $BBc,H as $CBc,X as $DBc,Y as $EBc,Z as $FBc,_ as $GBc,Q as $HBc,z as $IBc,I as $JBc,J as $KBc,O as $LBc,R as $MBc,ee as $NBc,D as $mBc,m as $nBc,B as $oBc,K as $pBc,L as $qBc,f as $rBc,q as $sBc,M as $tBc,N as $uBc,j as $vBc,T as $wBc,u as $xBc,G as $yBc,V as $zBc};
