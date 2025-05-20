import{$Ej as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$st as o,$zt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$It as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$7ic as p,$ljc as $,$sjc as d}from"./theme.js";const k=o("test-view-icon",t.beaker,e(11976,null)),A=o("test-results-icon",t.checklist,e(11977,null)),j=o("testing-run-icon",t.run,e(11978,null)),R=o("testing-rerun-icon",t.debugRerun,e(11979,null)),m=o("testing-run-all-icon",t.runAll,e(11980,null)),x=o("testing-debug-all-icon",t.debugAltSmall,e(11981,null)),S=o("testing-debug-icon",t.debugAltSmall,e(11982,null)),z=o("testing-coverage-icon",t.runCoverage,e(11983,null)),I=o("testing-coverage-all-icon",t.runAllCoverage,e(11984,null)),O=o("testing-cancel-icon",t.debugStop,e(11985,null)),q=o("testing-filter",t.filter,e(11986,null)),E=o("testing-hidden",t.eyeClosed,e(11987,null)),F=o("testing-show-as-list-icon",t.listTree,e(11988,null)),M=o("testing-show-as-list-icon",t.listFlat,e(11989,null)),T=o("testing-update-profiles",t.gear,e(11990,null)),B=o("testing-refresh-tests",t.refresh,e(11991,null)),D=o("testing-turn-continuous-run-on",t.eye,e(11992,null)),G=o("testing-turn-continuous-run-off",t.eyeClosed,e(11993,null)),H=o("testing-continuous-is-on",t.eye,e(11994,null)),J=o("testing-cancel-refresh-tests",t.stop,e(11995,null)),K=o("testing-coverage",t.coverage,e(11996,null)),L=o("testing-was-covered",t.check,e(11997,null)),N=o("testing-missing-branch",t.question,e(11998,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(11999,null))],[4,o("testing-failed-icon",t.error,e(12e3,null))],[3,o("testing-passed-icon",t.pass,e(12001,null))],[1,o("testing-queued-icon",t.history,e(12002,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12003,null))],[0,o("testing-unset-icon",t.circleOutline,e(12004,null))]]);a((l,r)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(r.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${l.getColor(i)} !important;
		}`),u&&r.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${l.getColor(u)} !important;
			}
		`))}r.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(j)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)} {
			color: ${l.getColor(p)};
		}
	`)});export{z as $Ajc,I as $Bjc,O as $Cjc,q as $Djc,E as $Ejc,F as $Fjc,M as $Gjc,T as $Hjc,B as $Ijc,D as $Jjc,G as $Kjc,H as $Ljc,J as $Mjc,K as $Njc,L as $Ojc,N as $Pjc,f as $Qjc,k as $tjc,A as $ujc,j as $vjc,R as $wjc,m as $xjc,x as $yjc,S as $zjc};
