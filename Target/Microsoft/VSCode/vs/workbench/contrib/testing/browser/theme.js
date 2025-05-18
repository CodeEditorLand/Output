import{localize as e}from"../../../../nls.js";import{$Np as w,$Mp as P,$Ip as q,$Jp as F,$Hr as x,$Dr as B,$wp as n,$Oq as i,$Pq as c,$Wp as d,$8p as l,$Xp as H,$bq as g,$kp as v,$ep as t,$jp as r}from"../../../../platform/theme/common/colorRegistry.js";import{$Ht as O}from"../../../../platform/theme/common/themeService.js";const D=t("testing.iconFailed",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12133,null)),m=t("testing.iconErrored",{dark:"#f14c4c",light:"#f14c4c",hcDark:"#f14c4c",hcLight:"#B5200D"},e(12134,null)),h=t("testing.iconPassed",{dark:"#73c991",light:"#73c991",hcDark:"#73c991",hcLight:"#007100"},e(12135,null)),z=t("testing.runAction",h,e(12136,null)),L=t("testing.iconQueued","#cca700",e(12137,null)),f=t("testing.iconUnset","#848484",e(12138,null)),b=t("testing.iconSkipped","#848484",e(12139,null)),A=t("testing.peekBorder",{dark:l,light:l,hcDark:n,hcLight:n},e(12140,null)),I=t("testing.messagePeekBorder",{dark:g,light:g,hcDark:n,hcLight:n},e(12141,null)),J=t("testing.peekHeaderBackground",{dark:r(l,.1),light:r(l,.1),hcDark:null,hcLight:null},e(12142,null)),T=t("testing.messagePeekHeaderBackground",{dark:r(g,.1),light:r(g,.1),hcDark:null,hcLight:null},e(12143,null)),u=t("testing.coveredBackground",{dark:i,light:i,hcDark:null,hcLight:null},e(12144,null)),Q=t("testing.coveredBorder",{dark:r(u,.75),light:r(u,.75),hcDark:n,hcLight:n},e(12145,null)),V=t("testing.coveredGutterBackground",{dark:r(i,.6),light:r(i,.6),hcDark:x,hcLight:x},e(12146,null)),Y=t("testing.uncoveredBranchBackground",{dark:v(r(c,2),d),light:v(r(c,2),d),hcDark:null,hcLight:null},e(12147,null)),a=t("testing.uncoveredBackground",{dark:c,light:c,hcDark:null,hcLight:null},e(12148,null)),R=t("testing.uncoveredBorder",{dark:r(a,.75),light:r(a,.75),hcDark:n,hcLight:n},e(12149,null)),Z=t("testing.uncoveredGutterBackground",{dark:r(c,1.5),light:r(c,1.5),hcDark:B,hcLight:B},e(12150,null)),_=t("testing.coverCountBadgeBackground",q,e(12151,null)),y=t("testing.coverCountBadgeForeground",F,e(12152,null)),C=t("testing.message.error.badgeBackground",w,e(12153,null));t("testing.message.error.badgeBorder",C,e(12154,null));t("testing.message.error.badgeForeground",P,e(12155,null));t("testing.message.error.lineBackground",null,e(12156,null));t("testing.message.info.decorationForeground",r(H,.5),e(12157,null));t("testing.message.info.lineBackground",null,e(12158,null));const K={6:m,4:D,3:h,1:L,0:f,5:b},S=t("testing.iconErrored.retired",r(m,.7),e(12159,null)),U=t("testing.iconFailed.retired",r(D,.7),e(12160,null)),j=t("testing.iconPassed.retired",r(h,.7),e(12161,null)),E=t("testing.iconQueued.retired",r(L,.7),e(12162,null)),G=t("testing.iconUnset.retired",r(f,.7),e(12163,null)),M=t("testing.iconSkipped.retired",r(b,.7),e(12164,null)),ee={6:S,4:U,3:j,1:E,0:G,5:M};O((o,k)=>{const s=o.getColor(d);if(k.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${o.getColor(u)?.transparent(1.3)};
		outline-color: ${o.getColor(Q)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${o.getColor(a)?.transparent(1.3)};
		outline-color: ${o.getColor(R)?.transparent(2)};
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
		`)}});export{G as $$ic,E as $0ic,a as $1ic,R as $2ic,Z as $3ic,_ as $4ic,y as $5ic,K as $6ic,S as $7ic,U as $8ic,j as $9ic,D as $Lic,m as $Mic,h as $Nic,z as $Oic,L as $Pic,f as $Qic,b as $Ric,A as $Sic,I as $Tic,J as $Uic,T as $Vic,u as $Wic,Q as $Xic,V as $Yic,Y as $Zic,M as $_ic,ee as $ajc};
