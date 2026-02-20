import{$bk as t}from"../../../../base/common/codicons.js";import{localize as e}from"../../../../nls.js";import{$gu as o,$nu as g}from"../../../../platform/theme/common/iconRegistry.js";import{$xu as x}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as n}from"../../../../base/common/themables.js";import{$oxc as a,$Fxc as p,$Mxc as $}from"./theme.js";const R=o("test-view-icon",t.beaker,e(15059,null)),A=o("test-results-icon",t.checklist,e(15060,null)),d=o("testing-run-icon",t.run,e(15061,null)),O=o("testing-rerun-icon",t.debugRerun,e(15062,null)),m=o("testing-run-all-icon",t.runAll,e(15063,null)),S=o("testing-debug-all-icon",t.debugAltSmall,e(15064,null)),f=o("testing-debug-icon",t.debugAltSmall,e(15065,null)),T=o("testing-coverage-icon",t.runCoverage,e(15066,null)),q=o("testing-coverage-all-icon",t.runAllCoverage,e(15067,null)),F=o("testing-cancel-icon",t.debugStop,e(15068,null)),M=o("testing-filter",t.filter,e(15069,null)),z=o("testing-hidden",t.eyeClosed,e(15070,null)),I=o("testing-show-as-list-icon",t.listTree,e(15071,null)),N=o("testing-show-as-list-icon",t.listFlat,e(15072,null)),P=o("testing-update-profiles",t.gear,e(15073,null)),Q=o("testing-refresh-tests",t.refresh,e(15074,null)),U=o("testing-turn-continuous-run-on",t.eye,e(15075,null)),V=o("testing-turn-continuous-run-off",t.eyeClosed,e(15076,null)),W=o("testing-continuous-is-on",t.eye,e(15077,null)),X=o("testing-cancel-refresh-tests",t.stop,e(15078,null)),Y=o("testing-coverage",t.coverage,e(15079,null)),Z=o("testing-was-covered",t.check,e(15080,null)),j=o("testing-missing-branch",t.question,e(15081,null)),h=new Map([[6,o("testing-error-icon",t.issues,e(15082,null))],[4,o("testing-failed-icon",t.error,e(15083,null))],[3,o("testing-passed-icon",t.pass,e(15084,null))],[1,o("testing-queued-icon",t.history,e(15085,null))],[2,g],[5,o("testing-skipped-icon",t.debugStepOver,e(15086,null))],[0,o("testing-unset-icon",t.circleOutline,e(15087,null))]]);x((r,l)=>{for(const[c,s]of h.entries()){const i=p[c],u=$[c];i&&(l.addRule(`.monaco-workbench ${n.asCSSSelector(s)} {
			color: ${r.getColor(i)} !important;
		}`),u&&l.addRule(`
			.test-explorer .computed-state.retired${n.asCSSSelector(s)},
			.testing-run-glyph.retired${n.asCSSSelector(s)}{
				color: ${r.getColor(u)} !important;
			}
		`))}l.addRule(`
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(d)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(m)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(f)},
		.monaco-editor .glyph-margin-widgets ${n.asCSSSelector(S)} {
			color: ${r.getColor(a)};
		}
	`)});export{h as $$xc,j as $0xc,N as $1xc,P as $2xc,Q as $3xc,U as $4xc,V as $5xc,W as $6xc,X as $7xc,Y as $8xc,Z as $9xc,R as $Nxc,A as $Oxc,d as $Pxc,O as $Qxc,m as $Rxc,S as $Sxc,f as $Txc,T as $Uxc,q as $Vxc,F as $Wxc,M as $Xxc,z as $Yxc,I as $Zxc};
