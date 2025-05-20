import{localize as e}from"../../../../nls.js";import{$Op as C,$Np as q,$Jp as w,$Kp as F,$Ir as x,$Er as B,$xp as n,$Pq as l,$Qq as c,$Xp as d,$9p as i,$Yp as P,$cq as g,$lp as j,$fp as t,$kp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$It as E}from"../../../../platform/theme/common/themeService.js";const v=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12190,null)),m=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12191,null)),h=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12192,null)),K=t("testing.runAction",h,e(12193,null)),f=t("testing.iconQueued","#cca700",e(12194,null)),D=t("testing.iconUnset","#848484",e(12195,null)),L=t("testing.iconSkipped","#848484",e(12196,null)),N=t("testing.peekBorder",{dark:i,light:i,hcDark:n,hcLight:n},e(12197,null)),X=t("testing.messagePeekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12198,null)),Y=t("testing.peekHeaderBackground",{dark:r(i,.1),light:r(i,.1),hcDark:null,hcLight:null},e(12199,null)),_=t("testing.messagePeekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12200,null)),u=t("testing.coveredBackground",{dark:l,light:l,hcDark:null,hcLight:null},e(12201,null)),O=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12202,null)),y=t("testing.coveredGutterBackground",{dark:r(l,.6),light:r(l,.6),hcDark:x,hcLight:x},e(12203,null)),M=t("testing.uncoveredBranchBackground",{dark:j(r(c,2),d),light:j(r(c,2),d),hcDark:null,hcLight:null},e(12204,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12205,null)),Q=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12206,null)),T=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12207,null)),V=t("testing.coverCountBadgeBackground",w,e(12208,null)),W=t("testing.coverCountBadgeForeground",F,e(12209,null)),b=t("testing.message.error.badgeBackground",C,e(12210,null));t("testing.message.error.badgeBorder",b,e(12211,null));t("testing.message.error.badgeForeground",q,e(12212,null));t("testing.message.error.lineBackground",null,e(12213,null));t("testing.message.info.decorationForeground",r(P,.5),e(12214,null));t("testing.message.info.lineBackground",null,e(12215,null));const Z={6:m,4:v,3:h,1:f,0:D,5:L},G=t("testing.iconErrored.retired",r(m,.7),e(12216,null)),H=t("testing.iconFailed.retired",r(v,.7),e(12217,null)),I=t("testing.iconPassed.retired",r(h,.7),e(12218,null)),R=t("testing.iconQueued.retired",r(f,.7),e(12219,null)),S=t("testing.iconUnset.retired",r(D,.7),e(12220,null)),U=t("testing.iconSkipped.retired",r(L,.7),e(12221,null)),ee={6:G,4:H,3:I,1:R,0:S,5:U};E((o,k)=>{const s=o.getColor(d);if(k.addRule(`
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
		`)}});export{N as $$ic,L as $0ic,v as $4ic,m as $5ic,h as $6ic,K as $7ic,f as $8ic,D as $9ic,X as $_ic,Y as $ajc,_ as $bjc,u as $cjc,O as $djc,y as $ejc,M as $fjc,a as $gjc,Q as $hjc,T as $ijc,V as $jjc,W as $kjc,Z as $ljc,G as $mjc,H as $njc,I as $ojc,R as $pjc,S as $qjc,U as $rjc,ee as $sjc};
