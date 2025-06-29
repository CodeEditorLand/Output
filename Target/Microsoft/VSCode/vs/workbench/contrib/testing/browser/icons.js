import{$Mj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Dt as o,$Kt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Tt as p}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$Rkc as a,$9kc as $,$dlc as d}from"./theme.js";const A=o("test-view-icon",t.beaker,e(12343,null)),R=o("test-results-icon",t.checklist,e(12344,null)),m=o("testing-run-icon",t.run,e(12345,null)),q=o("testing-rerun-icon",t.debugRerun,e(12346,null)),x=o("testing-run-all-icon",t.runAll,e(12347,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(12348,null)),f=o("testing-debug-icon",t.debugAltSmall,e(12349,null)),T=o("testing-coverage-icon",t.runCoverage,e(12350,null)),j=o("testing-coverage-all-icon",t.runAllCoverage,e(12351,null)),z=o("testing-cancel-icon",t.debugStop,e(12352,null)),M=o("testing-filter",t.filter,e(12353,null)),O=o("testing-hidden",t.eyeClosed,e(12354,null)),B=o("testing-show-as-list-icon",t.listTree,e(12355,null)),D=o("testing-show-as-list-icon",t.listFlat,e(12356,null)),F=o("testing-update-profiles",t.gear,e(12357,null)),I=o("testing-refresh-tests",t.refresh,e(12358,null)),K=o("testing-turn-continuous-run-on",t.eye,e(12359,null)),E=o("testing-turn-continuous-run-off",t.eyeClosed,e(12360,null)),G=o("testing-continuous-is-on",t.eye,e(12361,null)),H=o("testing-cancel-refresh-tests",t.stop,e(12362,null)),J=o("testing-coverage",t.coverage,e(12363,null)),L=o("testing-was-covered",t.check,e(12364,null)),N=o("testing-missing-branch",t.question,e(12365,null)),h=new Map([[6,o("testing-error-icon",t.issues,e(12366,null))],[4,o("testing-failed-icon",t.error,e(12367,null))],[3,o("testing-passed-icon",t.pass,e(12368,null))],[1,o("testing-queued-icon",t.history,e(12369,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12370,null))],[0,o("testing-unset-icon",t.circleOutline,e(12371,null))]]);p((l,r)=>{for(const[c,s]of h.entries()){const i=$[c],u=d[c];i&&(r.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${l.getColor(i)} !important;
		}`),u&&r.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${l.getColor(u)} !important;
			}
		`))}r.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(f)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)} {
			color: ${l.getColor(a)};
		}
	`)});export{N as $Alc,h as $Blc,A as $elc,R as $flc,m as $glc,q as $hlc,x as $ilc,S as $jlc,f as $klc,T as $llc,j as $mlc,z as $nlc,M as $olc,O as $plc,B as $qlc,D as $rlc,F as $slc,I as $tlc,K as $ulc,E as $vlc,G as $wlc,H as $xlc,J as $ylc,L as $zlc};
