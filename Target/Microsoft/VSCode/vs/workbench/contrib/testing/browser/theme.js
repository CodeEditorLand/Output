import{localize as e}from"../../../../nls.js";import{$Op as C,$Np as q,$Jp as w,$Kp as F,$Ir as x,$Er as j,$xp as n,$Pq as l,$Qq as c,$Xp as d,$9p as g,$Yp as P,$cq as i,$lp as B,$fp as t,$kp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$It as E}from"../../../../platform/theme/common/themeService.js";const v=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12202,null)),m=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12203,null)),h=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12204,null)),J=t("testing.runAction",h,e(12205,null)),f=t("testing.iconQueued","#cca700",e(12206,null)),D=t("testing.iconUnset","#848484",e(12207,null)),L=t("testing.iconSkipped","#848484",e(12208,null)),K=t("testing.peekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12209,null)),N=t("testing.messagePeekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12210,null)),X=t("testing.peekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12211,null)),Y=t("testing.messagePeekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12212,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12213,null)),O=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12214,null)),M=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12215,null)),T=t("testing.uncoveredBranchBackground",{dark:B(r(c,2),d),light:B(r(c,2),d),hcDark:null,hcLight:null},e(12216,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12217,null)),Q=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12218,null)),V=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:j,hcLight:j},e(12219,null)),W=t("testing.coverCountBadgeBackground",w,e(12220,null)),Z=t("testing.coverCountBadgeForeground",F,e(12221,null)),b=t("testing.message.error.badgeBackground",C,e(12222,null));t("testing.message.error.badgeBorder",b,e(12223,null));t("testing.message.error.badgeForeground",q,e(12224,null));t("testing.message.error.lineBackground",null,e(12225,null));t("testing.message.info.decorationForeground",r(P,.5),e(12226,null));t("testing.message.info.lineBackground",null,e(12227,null));const _={6:m,4:v,3:h,1:f,0:D,5:L},z=t("testing.iconErrored.retired",r(m,.7),e(12228,null)),A=t("testing.iconFailed.retired",r(v,.7),e(12229,null)),G=t("testing.iconPassed.retired",r(h,.7),e(12230,null)),H=t("testing.iconQueued.retired",r(f,.7),e(12231,null)),I=t("testing.iconUnset.retired",r(D,.7),e(12232,null)),R=t("testing.iconSkipped.retired",r(L,.7),e(12233,null)),ee={6:z,4:A,3:G,1:H,0:I,5:R};E((o,k)=>{const s=o.getColor(d);if(k.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(O)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(Q)?.transparent(2)};
	}
		`),s){const p=o.getColor(a)?.transparent(2).makeOpaque(s),$=o.getColor(b)?.makeOpaque(s);k.addRule(`
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
		`)}});export{R as $Ajc,ee as $Bjc,v as $ajc,m as $bjc,h as $cjc,J as $djc,f as $ejc,D as $fjc,L as $gjc,K as $hjc,N as $ijc,X as $jjc,Y as $kjc,u as $ljc,O as $mjc,M as $njc,T as $ojc,a as $pjc,Q as $qjc,V as $rjc,W as $sjc,Z as $tjc,_ as $ujc,z as $vjc,A as $wjc,G as $xjc,H as $yjc,I as $zjc};
