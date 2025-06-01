import{$Nj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Bt as o,$It as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Rt as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$jkc as p,$Akc as $,$Hkc as d}from"./theme.js";const R=o("test-view-icon",t.beaker,e(12153,null)),A=o("test-results-icon",t.checklist,e(12154,null)),k=o("testing-run-icon",t.run,e(12155,null)),I=o("testing-rerun-icon",t.debugRerun,e(12156,null)),m=o("testing-run-all-icon",t.runAll,e(12157,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(12158,null)),x=o("testing-debug-icon",t.debugAltSmall,e(12159,null)),O=o("testing-coverage-icon",t.runCoverage,e(12160,null)),T=o("testing-coverage-all-icon",t.runAllCoverage,e(12161,null)),j=o("testing-cancel-icon",t.debugStop,e(12162,null)),q=o("testing-filter",t.filter,e(12163,null)),M=o("testing-hidden",t.eyeClosed,e(12164,null)),N=o("testing-show-as-list-icon",t.listTree,e(12165,null)),z=o("testing-show-as-list-icon",t.listFlat,e(12166,null)),B=o("testing-update-profiles",t.gear,e(12167,null)),F=o("testing-refresh-tests",t.refresh,e(12168,null)),H=o("testing-turn-continuous-run-on",t.eye,e(12169,null)),J=o("testing-turn-continuous-run-off",t.eyeClosed,e(12170,null)),K=o("testing-continuous-is-on",t.eye,e(12171,null)),L=o("testing-cancel-refresh-tests",t.stop,e(12172,null)),P=o("testing-coverage",t.coverage,e(12173,null)),Q=o("testing-was-covered",t.check,e(12174,null)),U=o("testing-missing-branch",t.question,e(12175,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(12176,null))],[4,o("testing-failed-icon",t.error,e(12177,null))],[3,o("testing-passed-icon",t.pass,e(12178,null))],[1,o("testing-queued-icon",t.history,e(12179,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12180,null))],[0,o("testing-unset-icon",t.circleOutline,e(12181,null))]]);a((r,l)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(k)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)} {
			color: ${r.getColor(p)};
		}
	`)});export{K as $1kc,L as $2kc,P as $3kc,Q as $4kc,U as $5kc,f as $6kc,R as $Ikc,A as $Jkc,k as $Kkc,I as $Lkc,m as $Mkc,S as $Nkc,x as $Okc,O as $Pkc,T as $Qkc,j as $Rkc,q as $Skc,M as $Tkc,N as $Ukc,z as $Vkc,B as $Wkc,F as $Xkc,H as $Ykc,J as $Zkc};
