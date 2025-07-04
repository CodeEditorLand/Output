import{$Nj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Gt as o,$Nt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Wt as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$clc as p,$tlc as $,$Alc as d}from"./theme.js";const A=o("test-view-icon",t.beaker,e(12426,null)),R=o("test-results-icon",t.checklist,e(12427,null)),m=o("testing-run-icon",t.run,e(12428,null)),N=o("testing-rerun-icon",t.debugRerun,e(12429,null)),S=o("testing-run-all-icon",t.runAll,e(12430,null)),x=o("testing-debug-all-icon",t.debugAltSmall,e(12431,null)),f=o("testing-debug-icon",t.debugAltSmall,e(12432,null)),O=o("testing-coverage-icon",t.runCoverage,e(12433,null)),T=o("testing-coverage-all-icon",t.runAllCoverage,e(12434,null)),q=o("testing-cancel-icon",t.debugStop,e(12435,null)),F=o("testing-filter",t.filter,e(12436,null)),G=o("testing-hidden",t.eyeClosed,e(12437,null)),I=o("testing-show-as-list-icon",t.listTree,e(12438,null)),M=o("testing-show-as-list-icon",t.listFlat,e(12439,null)),W=o("testing-update-profiles",t.gear,e(12440,null)),j=o("testing-refresh-tests",t.refresh,e(12441,null)),z=o("testing-turn-continuous-run-on",t.eye,e(12442,null)),B=o("testing-turn-continuous-run-off",t.eyeClosed,e(12443,null)),D=o("testing-continuous-is-on",t.eye,e(12444,null)),E=o("testing-cancel-refresh-tests",t.stop,e(12445,null)),H=o("testing-coverage",t.coverage,e(12446,null)),J=o("testing-was-covered",t.check,e(12447,null)),K=o("testing-missing-branch",t.question,e(12448,null)),C=new Map([[6,o("testing-error-icon",t.issues,e(12449,null))],[4,o("testing-failed-icon",t.error,e(12450,null))],[3,o("testing-passed-icon",t.pass,e(12451,null))],[1,o("testing-queued-icon",t.history,e(12452,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12453,null))],[0,o("testing-unset-icon",t.circleOutline,e(12454,null))]]);a((l,r)=>{for(const[c,s]of C.entries()){const i=$[c],u=d[c];i&&(r.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
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
	`)});export{A as $Blc,R as $Clc,m as $Dlc,N as $Elc,S as $Flc,x as $Glc,f as $Hlc,O as $Ilc,T as $Jlc,q as $Klc,F as $Llc,G as $Mlc,I as $Nlc,M as $Olc,W as $Plc,j as $Qlc,z as $Rlc,B as $Slc,D as $Tlc,E as $Ulc,H as $Vlc,J as $Wlc,K as $Xlc,C as $Ylc};
