import{$Mj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Et as o,$Lt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Ut as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$6kc as p,$klc as $,$rlc as d}from"./theme.js";const A=o("test-view-icon",t.beaker,e(12403,null)),R=o("test-results-icon",t.checklist,e(12404,null)),m=o("testing-run-icon",t.run,e(12405,null)),M=o("testing-rerun-icon",t.debugRerun,e(12406,null)),x=o("testing-run-all-icon",t.runAll,e(12407,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(12408,null)),f=o("testing-debug-icon",t.debugAltSmall,e(12409,null)),O=o("testing-coverage-icon",t.runCoverage,e(12410,null)),q=o("testing-coverage-all-icon",t.runAllCoverage,e(12411,null)),z=o("testing-cancel-icon",t.debugStop,e(12412,null)),E=o("testing-filter",t.filter,e(12413,null)),F=o("testing-hidden",t.eyeClosed,e(12414,null)),I=o("testing-show-as-list-icon",t.listTree,e(12415,null)),L=o("testing-show-as-list-icon",t.listFlat,e(12416,null)),T=o("testing-update-profiles",t.gear,e(12417,null)),j=o("testing-refresh-tests",t.refresh,e(12418,null)),B=o("testing-turn-continuous-run-on",t.eye,e(12419,null)),D=o("testing-turn-continuous-run-off",t.eyeClosed,e(12420,null)),G=o("testing-continuous-is-on",t.eye,e(12421,null)),H=o("testing-cancel-refresh-tests",t.stop,e(12422,null)),J=o("testing-coverage",t.coverage,e(12423,null)),K=o("testing-was-covered",t.check,e(12424,null)),N=o("testing-missing-branch",t.question,e(12425,null)),C=new Map([[6,o("testing-error-icon",t.issues,e(12426,null))],[4,o("testing-failed-icon",t.error,e(12427,null))],[3,o("testing-passed-icon",t.pass,e(12428,null))],[1,o("testing-queued-icon",t.history,e(12429,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12430,null))],[0,o("testing-unset-icon",t.circleOutline,e(12431,null))]]);a((l,r)=>{for(const[c,s]of C.entries()){const i=$[c],u=d[c];i&&(r.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
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
			color: ${l.getColor(p)};
		}
	`)});export{q as $Alc,z as $Blc,E as $Clc,F as $Dlc,I as $Elc,L as $Flc,T as $Glc,j as $Hlc,B as $Ilc,D as $Jlc,G as $Klc,H as $Llc,J as $Mlc,K as $Nlc,N as $Olc,C as $Plc,A as $slc,R as $tlc,m as $ulc,M as $vlc,x as $wlc,S as $xlc,f as $ylc,O as $zlc};
