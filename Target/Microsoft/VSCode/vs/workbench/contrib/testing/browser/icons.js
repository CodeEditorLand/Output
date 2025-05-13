import{$Dj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$rt as o,$yt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Ht as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$ohc as p,$Fhc as h,$Mhc as $}from"./theme.js";const R=o("test-view-icon",t.beaker,e(11863,null)),A=o("test-results-icon",t.checklist,e(11864,null)),d=o("testing-run-icon",t.run,e(11865,null)),O=o("testing-rerun-icon",t.debugRerun,e(11866,null)),m=o("testing-run-all-icon",t.runAll,e(11867,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(11868,null)),x=o("testing-debug-icon",t.debugAltSmall,e(11869,null)),T=o("testing-coverage-icon",t.runCoverage,e(11870,null)),q=o("testing-coverage-all-icon",t.runAllCoverage,e(11871,null)),F=o("testing-cancel-icon",t.debugStop,e(11872,null)),M=o("testing-filter",t.filter,e(11873,null)),j=o("testing-hidden",t.eyeClosed,e(11874,null)),z=o("testing-show-as-list-icon",t.listTree,e(11875,null)),D=o("testing-show-as-list-icon",t.listFlat,e(11876,null)),H=o("testing-update-profiles",t.gear,e(11877,null)),I=o("testing-refresh-tests",t.refresh,e(11878,null)),N=o("testing-turn-continuous-run-on",t.eye,e(11879,null)),P=o("testing-turn-continuous-run-off",t.eyeClosed,e(11880,null)),Q=o("testing-continuous-is-on",t.eye,e(11881,null)),U=o("testing-cancel-refresh-tests",t.stop,e(11882,null)),V=o("testing-coverage",t.coverage,e(11883,null)),W=o("testing-was-covered",t.check,e(11884,null)),X=o("testing-missing-branch",t.question,e(11885,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(11886,null))],[4,o("testing-failed-icon",t.error,e(11887,null))],[3,o("testing-passed-icon",t.pass,e(11888,null))],[1,o("testing-queued-icon",t.history,e(11889,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(11890,null))],[0,o("testing-unset-icon",t.circleOutline,e(11891,null))]]);a((r,l)=>{for(const[c,s]of f.entries()){const i=h[c],u=$[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(d)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)} {
			color: ${r.getColor(p)};
		}
	`)});export{f as $$hc,X as $0hc,D as $1hc,H as $2hc,I as $3hc,N as $4hc,P as $5hc,Q as $6hc,U as $7hc,V as $8hc,W as $9hc,R as $Nhc,A as $Ohc,d as $Phc,O as $Qhc,m as $Rhc,S as $Shc,x as $Thc,T as $Uhc,q as $Vhc,F as $Whc,M as $Xhc,j as $Yhc,z as $Zhc};
