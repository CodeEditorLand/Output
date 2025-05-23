import{$Lj as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$zt as o,$Gt as g}from"../../../../platform/theme/common/iconRegistry.js";import{$Pt as p}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$Zjc as a,$ekc as $,$lkc as d}from"./theme.js";const A=o("test-view-icon",t.beaker,e(12042,null)),R=o("test-results-icon",t.checklist,e(12043,null)),k=o("testing-run-icon",t.run,e(12044,null)),q=o("testing-rerun-icon",t.debugRerun,e(12045,null)),m=o("testing-run-all-icon",t.runAll,e(12046,null)),x=o("testing-debug-all-icon",t.debugAltSmall,e(12047,null)),S=o("testing-debug-icon",t.debugAltSmall,e(12048,null)),z=o("testing-coverage-icon",t.runCoverage,e(12049,null)),j=o("testing-coverage-all-icon",t.runAllCoverage,e(12050,null)),F=o("testing-cancel-icon",t.debugStop,e(12051,null)),G=o("testing-filter",t.filter,e(12052,null)),I=o("testing-hidden",t.eyeClosed,e(12053,null)),O=o("testing-show-as-list-icon",t.listTree,e(12054,null)),T=o("testing-show-as-list-icon",t.listFlat,e(12055,null)),B=o("testing-update-profiles",t.gear,e(12056,null)),D=o("testing-refresh-tests",t.refresh,e(12057,null)),E=o("testing-turn-continuous-run-on",t.eye,e(12058,null)),H=o("testing-turn-continuous-run-off",t.eyeClosed,e(12059,null)),J=o("testing-continuous-is-on",t.eye,e(12060,null)),L=o("testing-cancel-refresh-tests",t.stop,e(12061,null)),M=o("testing-coverage",t.coverage,e(12062,null)),P=o("testing-was-covered",t.check,e(12063,null)),Z=o("testing-missing-branch",t.question,e(12064,null)),f=new Map([[6,o("testing-error-icon",t.issues,e(12065,null))],[4,o("testing-failed-icon",t.error,e(12066,null))],[3,o("testing-passed-icon",t.pass,e(12067,null))],[1,o("testing-queued-icon",t.history,e(12068,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(12069,null))],[0,o("testing-unset-icon",t.circleOutline,e(12070,null))]]);p((r,l)=>{for(const[c,s]of f.entries()){const i=$[c],u=d[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(k)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(x)} {
			color: ${r.getColor(a)};
		}
	`)});export{B as $Akc,D as $Bkc,E as $Ckc,H as $Dkc,J as $Ekc,L as $Fkc,M as $Gkc,P as $Hkc,Z as $Ikc,f as $Jkc,A as $mkc,R as $nkc,k as $okc,q as $pkc,m as $qkc,x as $rkc,S as $skc,z as $tkc,j as $ukc,F as $vkc,G as $wkc,I as $xkc,O as $ykc,T as $zkc};
