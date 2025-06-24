import{$Mj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Ct as o,$Jt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$St as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$ikc as p,$zkc as $,$Gkc as d}from"./theme.js";const R=o("test-view-icon",t.beaker,e(12249,null)),A=o("test-results-icon",t.checklist,e(12250,null)),k=o("testing-run-icon",t.run,e(12251,null)),M=o("testing-rerun-icon",t.debugRerun,e(12252,null)),S=o("testing-run-all-icon",t.runAll,e(12253,null)),m=o("testing-debug-all-icon",t.debugAltSmall,e(12254,null)),x=o("testing-debug-icon",t.debugAltSmall,e(12255,null)),O=o("testing-coverage-icon",t.runCoverage,e(12256,null)),T=o("testing-coverage-all-icon",t.runAllCoverage,e(12257,null)),q=o("testing-cancel-icon",t.debugStop,e(12258,null)),z=o("testing-filter",t.filter,e(12259,null)),I=o("testing-hidden",t.eyeClosed,e(12260,null)),J=o("testing-show-as-list-icon",t.listTree,e(12261,null)),j=o("testing-show-as-list-icon",t.listFlat,e(12262,null)),F=o("testing-update-profiles",t.gear,e(12263,null)),G=o("testing-refresh-tests",t.refresh,e(12264,null)),H=o("testing-turn-continuous-run-on",t.eye,e(12265,null)),K=o("testing-turn-continuous-run-off",t.eyeClosed,e(12266,null)),L=o("testing-continuous-is-on",t.eye,e(12267,null)),N=o("testing-cancel-refresh-tests",t.stop,e(12268,null)),P=o("testing-coverage",t.coverage,e(12269,null)),Q=o("testing-was-covered",t.check,e(12270,null)),U=o("testing-missing-branch",t.question,e(12271,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(12272,null))],[4,o("testing-failed-icon",t.error,e(12273,null))],[3,o("testing-passed-icon",t.pass,e(12274,null))],[1,o("testing-queued-icon",t.history,e(12275,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12276,null))],[0,o("testing-unset-icon",t.circleOutline,e(12277,null))]]);a((r,l)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(k)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)} {
			color: ${r.getColor(p)};
		}
	`)});export{N as $1kc,P as $2kc,Q as $3kc,U as $4kc,f as $5kc,R as $Hkc,A as $Ikc,k as $Jkc,M as $Kkc,S as $Lkc,m as $Mkc,x as $Nkc,O as $Okc,T as $Pkc,q as $Qkc,z as $Rkc,I as $Skc,J as $Tkc,j as $Ukc,F as $Vkc,G as $Wkc,H as $Xkc,K as $Ykc,L as $Zkc};
