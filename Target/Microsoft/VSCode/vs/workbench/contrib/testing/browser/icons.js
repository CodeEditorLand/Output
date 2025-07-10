import{$Nj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Gt as o,$Nt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Wt as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$nlc as p,$Elc as $,$Llc as d}from"./theme.js";const R=o("test-view-icon",t.beaker,e(12440,null)),A=o("test-results-icon",t.checklist,e(12441,null)),m=o("testing-run-icon",t.run,e(12442,null)),N=o("testing-rerun-icon",t.debugRerun,e(12443,null)),S=o("testing-run-all-icon",t.runAll,e(12444,null)),x=o("testing-debug-all-icon",t.debugAltSmall,e(12445,null)),f=o("testing-debug-icon",t.debugAltSmall,e(12446,null)),O=o("testing-coverage-icon",t.runCoverage,e(12447,null)),T=o("testing-coverage-all-icon",t.runAllCoverage,e(12448,null)),q=o("testing-cancel-icon",t.debugStop,e(12449,null)),M=o("testing-filter",t.filter,e(12450,null)),W=o("testing-hidden",t.eyeClosed,e(12451,null)),j=o("testing-show-as-list-icon",t.listTree,e(12452,null)),z=o("testing-show-as-list-icon",t.listFlat,e(12453,null)),E=o("testing-update-profiles",t.gear,e(12454,null)),F=o("testing-refresh-tests",t.refresh,e(12455,null)),G=o("testing-turn-continuous-run-on",t.eye,e(12456,null)),I=o("testing-turn-continuous-run-off",t.eyeClosed,e(12457,null)),L=o("testing-continuous-is-on",t.eye,e(12458,null)),P=o("testing-cancel-refresh-tests",t.stop,e(12459,null)),Q=o("testing-coverage",t.coverage,e(12460,null)),U=o("testing-was-covered",t.check,e(12461,null)),V=o("testing-missing-branch",t.question,e(12462,null)),h=new Map([[6,o("testing-error-icon",t.issues,e(12463,null))],[4,o("testing-failed-icon",t.error,e(12464,null))],[3,o("testing-passed-icon",t.pass,e(12465,null))],[1,o("testing-queued-icon",t.history,e(12466,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12467,null))],[0,o("testing-unset-icon",t.circleOutline,e(12468,null))]]);a((l,r)=>{for(const[c,s]of h.entries()){const i=$[c],u=d[c];i&&(r.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${l.getColor(i)} !important;
		}`),u&&r.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${l.getColor(u)} !important;
			}
		`))}r.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(f)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)} {
			color: ${l.getColor(p)};
		}
	`)});export{h as $0lc,E as $1lc,F as $2lc,G as $3lc,I as $4lc,L as $5lc,P as $6lc,Q as $7lc,U as $8lc,V as $9lc,R as $Mlc,A as $Nlc,m as $Olc,N as $Plc,S as $Qlc,x as $Rlc,f as $Slc,O as $Tlc,T as $Ulc,q as $Vlc,M as $Wlc,W as $Xlc,j as $Ylc,z as $Zlc};
