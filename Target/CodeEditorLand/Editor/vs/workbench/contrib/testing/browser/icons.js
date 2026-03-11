import{$bk as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$mu as o,$tu as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Du as p}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$pBc as a,$GBc as $,$NBc as d}from"./theme.js";const k=o("test-view-icon",t.beaker,e(15912,null)),R=o("test-results-icon",t.checklist,e(15913,null)),m=o("testing-run-icon",t.run,e(15914,null)),A=o("testing-rerun-icon",t.debugRerun,e(15915,null)),B=o("testing-run-all-icon",t.runAll,e(15916,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(15917,null)),x=o("testing-debug-icon",t.debugAltSmall,e(15918,null)),O=o("testing-coverage-icon",t.runCoverage,e(15919,null)),T=o("testing-coverage-all-icon",t.runAllCoverage,e(15920,null)),q=o("testing-cancel-icon",t.debugStop,e(15921,null)),z=o("testing-filter",t.filter,e(15922,null)),D=o("testing-hidden",t.eyeClosed,e(15923,null)),F=o("testing-show-as-list-icon",t.listTree,e(15924,null)),G=o("testing-show-as-list-icon",t.listFlat,e(15925,null)),I=o("testing-update-profiles",t.gear,e(15926,null)),M=o("testing-refresh-tests",t.refresh,e(15927,null)),N=o("testing-turn-continuous-run-on",t.eye,e(15928,null)),P=o("testing-turn-continuous-run-off",t.eyeClosed,e(15929,null)),Q=o("testing-continuous-is-on",t.eye,e(15930,null)),U=o("testing-cancel-refresh-tests",t.stop,e(15931,null)),V=o("testing-coverage",t.coverage,e(15932,null)),W=o("testing-was-covered",t.check,e(15933,null)),X=o("testing-missing-branch",t.question,e(15934,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(15935,null))],[4,o("testing-failed-icon",t.error,e(15936,null))],[3,o("testing-passed-icon",t.pass,e(15937,null))],[1,o("testing-queued-icon",t.history,e(15938,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(15939,null))],[0,o("testing-unset-icon",t.circleOutline,e(15940,null))]]);p((r,l)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(B)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)} {
			color: ${r.getColor(a)};
		}
	`)});export{X as $$Bc,W as $0Bc,F as $1Bc,G as $2Bc,I as $3Bc,M as $4Bc,N as $5Bc,P as $6Bc,Q as $7Bc,U as $8Bc,V as $9Bc,k as $OBc,R as $PBc,m as $QBc,A as $RBc,B as $SBc,S as $TBc,x as $UBc,O as $VBc,T as $WBc,q as $XBc,z as $YBc,D as $ZBc,f as $_Bc};
