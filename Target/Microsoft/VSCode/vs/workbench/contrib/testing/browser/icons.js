import{$Dj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$rt as o,$yt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Ht as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$Oic as p,$6ic as $,$ajc as d}from"./theme.js";const k=o("test-view-icon",t.beaker,e(11919,null)),A=o("test-results-icon",t.checklist,e(11920,null)),j=o("testing-run-icon",t.run,e(11921,null)),R=o("testing-rerun-icon",t.debugRerun,e(11922,null)),m=o("testing-run-all-icon",t.runAll,e(11923,null)),x=o("testing-debug-all-icon",t.debugAltSmall,e(11924,null)),S=o("testing-debug-icon",t.debugAltSmall,e(11925,null)),q=o("testing-coverage-icon",t.runCoverage,e(11926,null)),O=o("testing-coverage-all-icon",t.runAllCoverage,e(11927,null)),T=o("testing-cancel-icon",t.debugStop,e(11928,null)),z=o("testing-filter",t.filter,e(11929,null)),D=o("testing-hidden",t.eyeClosed,e(11930,null)),F=o("testing-show-as-list-icon",t.listTree,e(11931,null)),H=o("testing-show-as-list-icon",t.listFlat,e(11932,null)),I=o("testing-update-profiles",t.gear,e(11933,null)),M=o("testing-refresh-tests",t.refresh,e(11934,null)),B=o("testing-turn-continuous-run-on",t.eye,e(11935,null)),E=o("testing-turn-continuous-run-off",t.eyeClosed,e(11936,null)),G=o("testing-continuous-is-on",t.eye,e(11937,null)),J=o("testing-cancel-refresh-tests",t.stop,e(11938,null)),K=o("testing-coverage",t.coverage,e(11939,null)),L=o("testing-was-covered",t.check,e(11940,null)),N=o("testing-missing-branch",t.question,e(11941,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(11942,null))],[4,o("testing-failed-icon",t.error,e(11943,null))],[3,o("testing-passed-icon",t.pass,e(11944,null))],[1,o("testing-queued-icon",t.history,e(11945,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(11946,null))],[0,o("testing-unset-icon",t.circleOutline,e(11947,null))]]);a((r,l)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(j)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)} {
			color: ${r.getColor(p)};
		}
	`)});export{k as $bjc,A as $cjc,j as $djc,R as $ejc,m as $fjc,x as $gjc,S as $hjc,q as $ijc,O as $jjc,T as $kjc,z as $ljc,D as $mjc,F as $njc,H as $ojc,I as $pjc,M as $qjc,B as $rjc,E as $sjc,G as $tjc,J as $ujc,K as $vjc,L as $wjc,N as $xjc,f as $yjc};
