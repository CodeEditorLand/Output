import{$Ej as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$st as o,$zt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$It as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$djc as p,$ujc as $,$Bjc as d}from"./theme.js";const k=o("test-view-icon",t.beaker,e(11988,null)),R=o("test-results-icon",t.checklist,e(11989,null)),j=o("testing-run-icon",t.run,e(11990,null)),A=o("testing-rerun-icon",t.debugRerun,e(11991,null)),m=o("testing-run-all-icon",t.runAll,e(11992,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(11993,null)),x=o("testing-debug-icon",t.debugAltSmall,e(11994,null)),I=o("testing-coverage-icon",t.runCoverage,e(11995,null)),O=o("testing-coverage-all-icon",t.runAllCoverage,e(11996,null)),T=o("testing-cancel-icon",t.debugStop,e(11997,null)),q=o("testing-filter",t.filter,e(11998,null)),z=o("testing-hidden",t.eyeClosed,e(11999,null)),E=o("testing-show-as-list-icon",t.listTree,e(12e3,null)),F=o("testing-show-as-list-icon",t.listFlat,e(12001,null)),M=o("testing-update-profiles",t.gear,e(12002,null)),B=o("testing-refresh-tests",t.refresh,e(12003,null)),D=o("testing-turn-continuous-run-on",t.eye,e(12004,null)),G=o("testing-turn-continuous-run-off",t.eyeClosed,e(12005,null)),H=o("testing-continuous-is-on",t.eye,e(12006,null)),J=o("testing-cancel-refresh-tests",t.stop,e(12007,null)),K=o("testing-coverage",t.coverage,e(12008,null)),L=o("testing-was-covered",t.check,e(12009,null)),N=o("testing-missing-branch",t.question,e(12010,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(12011,null))],[4,o("testing-failed-icon",t.error,e(12012,null))],[3,o("testing-passed-icon",t.pass,e(12013,null))],[1,o("testing-queued-icon",t.history,e(12014,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12015,null))],[0,o("testing-unset-icon",t.circleOutline,e(12016,null))]]);a((r,l)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(j)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)} {
			color: ${r.getColor(p)};
		}
	`)});export{k as $Cjc,R as $Djc,j as $Ejc,A as $Fjc,m as $Gjc,S as $Hjc,x as $Ijc,I as $Jjc,O as $Kjc,T as $Ljc,q as $Mjc,z as $Njc,E as $Ojc,F as $Pjc,M as $Qjc,B as $Rjc,D as $Sjc,G as $Tjc,H as $Ujc,J as $Vjc,K as $Wjc,L as $Xjc,N as $Yjc,f as $Zjc};
