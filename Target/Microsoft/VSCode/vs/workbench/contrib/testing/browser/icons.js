import{$Rj as t}from"../../../../base/common/codicons.js";import{localize as n}from"../../../../nls.js";import{$Kt as e,$Rt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$1t as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as o}from"../../../../base/common/themables.js";import{$Nmc as p,$5mc as $,$_mc as d}from"./theme.js";const R=e("test-view-icon",t.beaker,n(12619,null)),A=e("test-results-icon",t.checklist,n(12620,null)),m=e("testing-run-icon",t.run,n(12621,null)),q=e("testing-rerun-icon",t.debugRerun,n(12622,null)),x=e("testing-run-all-icon",t.runAll,n(12623,null)),S=e("testing-debug-all-icon",t.debugAltSmall,n(12624,null)),f=e("testing-debug-icon",t.debugAltSmall,n(12625,null)),j=e("testing-coverage-icon",t.runCoverage,n(12626,null)),O=e("testing-coverage-all-icon",t.runAllCoverage,n(12627,null)),T=e("testing-cancel-icon",t.debugStop,n(12628,null)),z=e("testing-filter",t.filter,n(12629,null)),F=e("testing-hidden",t.eyeClosed,n(12630,null)),I=e("testing-show-as-list-icon",t.listTree,n(12631,null)),K=e("testing-show-as-list-icon",t.listFlat,n(12632,null)),M=e("testing-update-profiles",t.gear,n(12633,null)),N=e("testing-refresh-tests",t.refresh,n(12634,null)),_=e("testing-turn-continuous-run-on",t.eye,n(12635,null)),B=e("testing-turn-continuous-run-off",t.eyeClosed,n(12636,null)),D=e("testing-continuous-is-on",t.eye,n(12637,null)),E=e("testing-cancel-refresh-tests",t.stop,n(12638,null)),G=e("testing-coverage",t.coverage,n(12639,null)),H=e("testing-was-covered",t.check,n(12640,null)),J=e("testing-missing-branch",t.question,n(12641,null)),h=new Map([[6,e("testing-error-icon",t.issues,n(12642,null))],[4,e("testing-failed-icon",t.error,n(12643,null))],[3,e("testing-passed-icon",t.pass,n(12644,null))],[1,e("testing-queued-icon",t.history,n(12645,null))],[2,g],[5,e("testing-skipped-icon",t.debugStepOver,n(12646,null))],[0,e("testing-unset-icon",t.circleOutline,n(12647,null))]]);a((r,l)=>{for(const[c,s]of h.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${o.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${o.asCSSSelector(s)},
			.testing-run-glyph.retired${o.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${o.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${o.asCSSSelector(x)},
		.monaco-editor .glyph-margin-widgets ${o.asCSSSelector(f)},
		.monaco-editor .glyph-margin-widgets ${o.asCSSSelector(S)} {
			color: ${r.getColor(p)};
		}
	`)});export{R as $anc,A as $bnc,m as $cnc,q as $dnc,x as $enc,S as $fnc,f as $gnc,j as $hnc,O as $inc,T as $jnc,z as $knc,F as $lnc,I as $mnc,K as $nnc,M as $onc,N as $pnc,_ as $qnc,B as $rnc,D as $snc,E as $tnc,G as $unc,H as $vnc,J as $wnc,h as $xnc};
