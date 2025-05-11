import{$Cj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$qt as o,$xt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Gt as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$khc as p,$Bhc as h,$Ihc as $}from"./theme.js";const R=o("test-view-icon",t.beaker,e(11844,null)),A=o("test-results-icon",t.checklist,e(11845,null)),d=o("testing-run-icon",t.run,e(11846,null)),q=o("testing-rerun-icon",t.debugRerun,e(11847,null)),m=o("testing-run-all-icon",t.runAll,e(11848,null)),x=o("testing-debug-all-icon",t.debugAltSmall,e(11849,null)),S=o("testing-debug-icon",t.debugAltSmall,e(11850,null)),O=o("testing-coverage-icon",t.runCoverage,e(11851,null)),T=o("testing-coverage-all-icon",t.runAllCoverage,e(11852,null)),I=o("testing-cancel-icon",t.debugStop,e(11853,null)),M=o("testing-filter",t.filter,e(11854,null)),j=o("testing-hidden",t.eyeClosed,e(11855,null)),z=o("testing-show-as-list-icon",t.listTree,e(11856,null)),B=o("testing-show-as-list-icon",t.listFlat,e(11857,null)),F=o("testing-update-profiles",t.gear,e(11858,null)),G=o("testing-refresh-tests",t.refresh,e(11859,null)),J=o("testing-turn-continuous-run-on",t.eye,e(11860,null)),K=o("testing-turn-continuous-run-off",t.eyeClosed,e(11861,null)),L=o("testing-continuous-is-on",t.eye,e(11862,null)),N=o("testing-cancel-refresh-tests",t.stop,e(11863,null)),P=o("testing-coverage",t.coverage,e(11864,null)),Q=o("testing-was-covered",t.check,e(11865,null)),U=o("testing-missing-branch",t.question,e(11866,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(11867,null))],[4,o("testing-failed-icon",t.error,e(11868,null))],[3,o("testing-passed-icon",t.pass,e(11869,null))],[1,o("testing-queued-icon",t.history,e(11870,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(11871,null))],[0,o("testing-unset-icon",t.circleOutline,e(11872,null))]]);a((r,l)=>{for(const[c,s]of f.entries()){const i=h[c],u=$[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(d)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)} {
			color: ${r.getColor(p)};
		}
	`)});export{K as $1hc,L as $2hc,N as $3hc,P as $4hc,Q as $5hc,U as $6hc,f as $7hc,R as $Jhc,A as $Khc,d as $Lhc,q as $Mhc,m as $Nhc,x as $Ohc,S as $Phc,O as $Qhc,T as $Rhc,I as $Shc,M as $Thc,j as $Uhc,z as $Vhc,B as $Whc,F as $Xhc,G as $Yhc,J as $Zhc};
