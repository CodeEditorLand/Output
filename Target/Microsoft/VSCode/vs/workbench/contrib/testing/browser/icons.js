import{$Nj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Bt as o,$It as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Rt as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$0jc as p,$okc as $,$vkc as d}from"./theme.js";const R=o("test-view-icon",t.beaker,e(12083,null)),A=o("test-results-icon",t.checklist,e(12084,null)),k=o("testing-run-icon",t.run,e(12085,null)),I=o("testing-rerun-icon",t.debugRerun,e(12086,null)),m=o("testing-run-all-icon",t.runAll,e(12087,null)),x=o("testing-debug-all-icon",t.debugAltSmall,e(12088,null)),S=o("testing-debug-icon",t.debugAltSmall,e(12089,null)),O=o("testing-coverage-icon",t.runCoverage,e(12090,null)),T=o("testing-coverage-all-icon",t.runAllCoverage,e(12091,null)),j=o("testing-cancel-icon",t.debugStop,e(12092,null)),q=o("testing-filter",t.filter,e(12093,null)),z=o("testing-hidden",t.eyeClosed,e(12094,null)),B=o("testing-show-as-list-icon",t.listTree,e(12095,null)),F=o("testing-show-as-list-icon",t.listFlat,e(12096,null)),M=o("testing-update-profiles",t.gear,e(12097,null)),N=o("testing-refresh-tests",t.refresh,e(12098,null)),D=o("testing-turn-continuous-run-on",t.eye,e(12099,null)),E=o("testing-turn-continuous-run-off",t.eyeClosed,e(12100,null)),G=o("testing-continuous-is-on",t.eye,e(12101,null)),H=o("testing-cancel-refresh-tests",t.stop,e(12102,null)),J=o("testing-coverage",t.coverage,e(12103,null)),K=o("testing-was-covered",t.check,e(12104,null)),L=o("testing-missing-branch",t.question,e(12105,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(12106,null))],[4,o("testing-failed-icon",t.error,e(12107,null))],[3,o("testing-passed-icon",t.pass,e(12108,null))],[1,o("testing-queued-icon",t.history,e(12109,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12110,null))],[0,o("testing-unset-icon",t.circleOutline,e(12111,null))]]);a((r,l)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(k)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)} {
			color: ${r.getColor(p)};
		}
	`)});export{m as $Akc,x as $Bkc,S as $Ckc,O as $Dkc,T as $Ekc,j as $Fkc,q as $Gkc,z as $Hkc,B as $Ikc,F as $Jkc,M as $Kkc,N as $Lkc,D as $Mkc,E as $Nkc,G as $Okc,H as $Pkc,J as $Qkc,K as $Rkc,L as $Skc,f as $Tkc,R as $wkc,A as $xkc,k as $ykc,I as $zkc};
