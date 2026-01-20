import{$ak as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$eu as o,$lu as g}from"../../../../platform/theme/common/iconRegistry.js";import{$vu as a}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$gtc as p,$xtc as $,$Etc as d}from"./theme.js";const R=o("test-view-icon",t.beaker,e(13816,null)),A=o("test-results-icon",t.checklist,e(13817,null)),m=o("testing-run-icon",t.run,e(13818,null)),O=o("testing-rerun-icon",t.debugRerun,e(13819,null)),x=o("testing-run-all-icon",t.runAll,e(13820,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(13821,null)),f=o("testing-debug-icon",t.debugAltSmall,e(13822,null)),T=o("testing-coverage-icon",t.runCoverage,e(13823,null)),q=o("testing-coverage-all-icon",t.runAllCoverage,e(13824,null)),F=o("testing-cancel-icon",t.debugStop,e(13825,null)),I=o("testing-filter",t.filter,e(13826,null)),M=o("testing-hidden",t.eyeClosed,e(13827,null)),z=o("testing-show-as-list-icon",t.listTree,e(13828,null)),E=o("testing-show-as-list-icon",t.listFlat,e(13829,null)),G=o("testing-update-profiles",t.gear,e(13830,null)),H=o("testing-refresh-tests",t.refresh,e(13831,null)),J=o("testing-turn-continuous-run-on",t.eye,e(13832,null)),K=o("testing-turn-continuous-run-off",t.eyeClosed,e(13833,null)),L=o("testing-continuous-is-on",t.eye,e(13834,null)),N=o("testing-cancel-refresh-tests",t.stop,e(13835,null)),P=o("testing-coverage",t.coverage,e(13836,null)),Q=o("testing-was-covered",t.check,e(13837,null)),U=o("testing-missing-branch",t.question,e(13838,null)),h=new Map([[6,o("testing-error-icon",t.issues,e(13839,null))],[4,o("testing-failed-icon",t.error,e(13840,null))],[3,o("testing-passed-icon",t.pass,e(13841,null))],[1,o("testing-queued-icon",t.history,e(13842,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(13843,null))],[0,o("testing-unset-icon",t.circleOutline,e(13844,null))]]);a((l,r)=>{for(const[c,s]of h.entries()){const i=$[c],u=d[c];i&&(r.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
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
	`)});export{Q as $1tc,U as $2tc,h as $3tc,R as $Ftc,A as $Gtc,m as $Htc,O as $Itc,x as $Jtc,S as $Ktc,f as $Ltc,T as $Mtc,q as $Ntc,F as $Otc,I as $Ptc,M as $Qtc,z as $Rtc,E as $Stc,G as $Ttc,H as $Utc,J as $Vtc,K as $Wtc,L as $Xtc,N as $Ytc,P as $Ztc};
