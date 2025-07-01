import{$Mj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$Et as o,$Lt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Ut as p}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$4kc as a,$ilc as $,$plc as d}from"./theme.js";const A=o("test-view-icon",t.beaker,e(12398,null)),R=o("test-results-icon",t.checklist,e(12399,null)),m=o("testing-run-icon",t.run,e(12400,null)),q=o("testing-rerun-icon",t.debugRerun,e(12401,null)),x=o("testing-run-all-icon",t.runAll,e(12402,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(12403,null)),f=o("testing-debug-icon",t.debugAltSmall,e(12404,null)),M=o("testing-coverage-icon",t.runCoverage,e(12405,null)),z=o("testing-coverage-all-icon",t.runAllCoverage,e(12406,null)),E=o("testing-cancel-icon",t.debugStop,e(12407,null)),F=o("testing-filter",t.filter,e(12408,null)),I=o("testing-hidden",t.eyeClosed,e(12409,null)),L=o("testing-show-as-list-icon",t.listTree,e(12410,null)),O=o("testing-show-as-list-icon",t.listFlat,e(12411,null)),T=o("testing-update-profiles",t.gear,e(12412,null)),j=o("testing-refresh-tests",t.refresh,e(12413,null)),B=o("testing-turn-continuous-run-on",t.eye,e(12414,null)),D=o("testing-turn-continuous-run-off",t.eyeClosed,e(12415,null)),G=o("testing-continuous-is-on",t.eye,e(12416,null)),H=o("testing-cancel-refresh-tests",t.stop,e(12417,null)),J=o("testing-coverage",t.coverage,e(12418,null)),K=o("testing-was-covered",t.check,e(12419,null)),N=o("testing-missing-branch",t.question,e(12420,null)),C=new Map([[6,o("testing-error-icon",t.issues,e(12421,null))],[4,o("testing-failed-icon",t.error,e(12422,null))],[3,o("testing-passed-icon",t.pass,e(12423,null))],[1,o("testing-queued-icon",t.history,e(12424,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12425,null))],[0,o("testing-unset-icon",t.circleOutline,e(12426,null))]]);p((l,r)=>{for(const[c,s]of C.entries()){const i=$[c],u=d[c];i&&(r.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
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
	`)});export{F as $Alc,I as $Blc,L as $Clc,O as $Dlc,T as $Elc,j as $Flc,B as $Glc,D as $Hlc,G as $Ilc,H as $Jlc,J as $Klc,K as $Llc,N as $Mlc,C as $Nlc,A as $qlc,R as $rlc,m as $slc,q as $tlc,x as $ulc,S as $vlc,f as $wlc,M as $xlc,z as $ylc,E as $zlc};
