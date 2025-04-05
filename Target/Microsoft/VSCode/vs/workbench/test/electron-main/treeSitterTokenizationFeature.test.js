import o from"assert";import{TestInstantiationService as L}from"../../../platform/instantiation/test/common/instantiationServiceMock.js";import{ensureNoDisposablesAreLeakedInTestSuite as D}from"../../../base/test/common/utils.js";import{TreeSitterTextModelService as F}from"../../../editor/common/services/treeSitter/treeSitterParserService.js";import{IModelService as N}from"../../../editor/common/services/model.js";import{Event as U}from"../../../base/common/event.js";import{URI as z}from"../../../base/common/uri.js";import{IFileService as O}from"../../../platform/files/common/files.js";import{ILogService as A,NullLogService as $}from"../../../platform/log/common/log.js";import{ITelemetryService as G,TelemetryLevel as Q}from"../../../platform/telemetry/common/telemetry.js";import"../../../platform/telemetry/common/gdprTypings.js";import{IConfigurationService as B}from"../../../platform/configuration/common/configuration.js";import{TestConfigurationService as H}from"../../../platform/configuration/test/common/testConfigurationService.js";import{IEnvironmentService as Y}from"../../../platform/environment/common/environment.js";import{ModelService as _}from"../../../editor/common/services/modelService.js";import{TreeSitterTokenizationFeature as j}from"../../services/treeSitter/browser/treeSitterTokenizationFeature.js";import{ITreeSitterImporter as J,ITreeSitterParserService as K,TreeSitterImporter as V}from"../../../editor/common/services/treeSitterParserService.js";import{TreeSitterTokenizationRegistry as W}from"../../../editor/common/languages.js";import{FileService as X}from"../../../platform/files/common/fileService.js";import{Schemas as Z}from"../../../base/common/network.js";import{DiskFileSystemProvider as ee}from"../../../platform/files/node/diskFileSystemProvider.js";import{ILanguageService as te}from"../../../editor/common/languages/language.js";import{LanguageService as ne}from"../../../editor/common/services/languageService.js";import{TestColorTheme as oe,TestThemeService as re}from"../../../platform/theme/test/common/testThemeService.js";import{IThemeService as ie}from"../../../platform/theme/common/themeService.js";import{ITextResourcePropertiesService as se}from"../../../editor/common/services/textResourceConfiguration.js";import{TestTextResourcePropertiesService as ae}from"../common/workbenchTestServices.js";import{TestLanguageConfigurationService as le}from"../../../editor/test/common/modes/testLanguageConfigurationService.js";import{ILanguageConfigurationService as ce}from"../../../editor/common/languages/languageConfigurationRegistry.js";import{IUndoRedoService as de}from"../../../platform/undoRedo/common/undoRedo.js";import{UndoRedoService as me}from"../../../platform/undoRedo/common/undoRedoService.js";import{TestDialogService as ge}from"../../../platform/dialogs/test/common/testDialogService.js";import{TestNotificationService as pe}from"../../../platform/notification/test/common/testNotificationService.js";import{DisposableStore as ue}from"../../../base/common/lifecycle.js";import{TokenStyle as Se}from"../../../platform/theme/common/tokenClassificationRegistry.js";import"../../services/themes/common/colorThemeData.js";import{Color as Te}from"../../../base/common/color.js";import{ITreeSitterTokenizationStoreService as ve}from"../../../editor/common/model/treeSitterTokenStoreService.js";import{Range as a}from"../../../editor/common/core/range.js";import"../../../editor/common/model.js";import"../../../editor/common/model/tokenStore.js";import{ICodeEditorService as fe}from"../../../editor/browser/services/codeEditorService.js";import{TestCodeEditorService as Ie}from"../../../editor/test/browser/editorTestServices.js";import"../../../editor/common/textModelEvents.js";class he{_serviceBrand;telemetryLevel=Q.NONE;sessionId="";machineId="";sqmId="";devDeviceId="";firstSessionDate="";sendErrorTelemetry=!1;publicLog(r,s){}publicLog2(r,s){}publicLogError(r,s){}publicLogError2(r,s){}setExperimentProperty(r,s){}}class ke{delete(r){throw new Error("Method not implemented.")}handleContentChanged(r,s){}rangeHasTokens(r,s,T){return!0}rangHasAnyTokens(r){return!0}getNeedsRefresh(r){return[]}_serviceBrand;setTokens(r,s){}getTokens(r,s){}updateTokens(r,s,T){}markForRefresh(r,s){}hasTokens(r,s){return!0}}class we extends oe{resolveScopes(r,s){return new Se(Te.red,void 0,void 0,void 0,void 0)}getTokenColorIndex(){return{get:()=>10}}}suite("Tree Sitter TokenizationFeature",function(){let i,r,s,T,w,y,v,f,E,x,M,R,S,l,m;setup(async()=>{m=new ue,i=m.add(new L),y=new he,v=new $,f=new H({"editor.experimental.preferTreeSitter.typescript":!0}),E=new re(new we),M={},R=new ke,i.set(Y,M),i.set(B,f),i.set(A,v),i.set(G,y),i.set(ve,R),x=m.add(i.createInstance(ne)),i.set(te,x),i.set(ie,E),T=i.createInstance(ae),i.set(se,T),w=m.add(i.createInstance(le)),i.set(ce,w),i.set(J,i.createInstance(V)),i.set(fe,i.createInstance(Ie)),s=m.add(i.createInstance(X));const n=m.add(new ee(v));m.add(s.registerProvider(Z.file,n)),i.set(O,s);const t=new ge,e=new pe,d=new me(t,e);i.set(de,d),r=new _(f,T,d,i),i.set(N,r),S=m.add(i.createInstance(F)),S.isTest=!0,i.set(K,S),m.add(i.createInstance(j)),l=m.add(await W.getOrCreate("typescript"))}),teardown(()=>{m.dispose()}),D();function g(n){return n[n.length-1].startOffsetInclusive+n[n.length-1].length}let q=1;async function c(n){const t=m.add(r.createModel(n,{languageId:"typescript",onDidChange:U.None},z.file(`file${q++}.ts`))),e=m.add(await S.getTextModelTreeSitter(t)),d=new Promise(I=>{const h=S.onDidUpdateTree(k=>{k.textModel===t&&(h.dispose(),I())})});return await e.parse(),await d,o.ok(e),t}function p(n){o.ok(n);for(let t=1;t<n.length;t++){const e=n[t-1],d=n[t];o.deepStrictEqual(e.startOffsetInclusive+e.length,d.startOffsetInclusive)}}test("Three changes come back to back ",async()=>{const t=await c(`/**
**/
class x {
}




class y {
}`);let e,d;const I=new Promise(u=>{e=S.onDidUpdateTree(async b=>{b.textModel===t&&(d=b,u())})}),h=new Promise(u=>{t.applyEdits([{range:new a(7,1,8,1),text:""}]),u()}),k=new Promise(u=>{t.applyEdits([{range:new a(6,1,7,1),text:""}]),u()}),C=new Promise(u=>{t.applyEdits([{range:new a(5,1,6,1),text:""}]),u()}),P=Promise.all([h,k,C]);await I,await P,o.ok(d),o.strictEqual(d.versionId,4),o.strictEqual(d.ranges[0].newRangeStartOffset,0),o.strictEqual(d.ranges[0].newRangeEndOffset,32),o.strictEqual(d.ranges[0].newRange.startLineNumber,1),o.strictEqual(d.ranges[0].newRange.endLineNumber,7),e?.dispose(),r.destroyModel(t.uri)}),test("File single line file",async()=>{const n="console.log('x');",t=await c(n),e=l.getTokensInRange(t,new a(1,1,1,18),0,17);p(e),o.deepStrictEqual(e?.length,9),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with new lines at beginning and end",async()=>{const n=`
console.log('x');
`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,3,1),0,19);p(e),o.deepStrictEqual(e?.length,11),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with new lines at beginning and end \\r\\n",async()=>{const n=`\r
console.log('x');\r
`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,3,1),0,21);p(e),o.deepStrictEqual(e?.length,11),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with empty lines in the middle",async()=>{const n=`
console.log('x');

console.log('7');
`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,5,1),0,38);p(e),o.deepStrictEqual(e?.length,21),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with empty lines in the middle \\r\\n",async()=>{const n=`\r
console.log('x');\r
\r
console.log('7');\r
`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,5,1),0,42);p(e),o.deepStrictEqual(e?.length,21),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with non-empty lines that match no scopes",async()=>{const n=`console.log('x');
;
{
}
`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,5,1),0,24);p(e),o.deepStrictEqual(e?.length,16),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with non-empty lines that match no scopes \\r\\n",async()=>{const n=`console.log('x');\r
;\r
{\r
}\r
`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,5,1),0,28);p(e),o.deepStrictEqual(e?.length,16),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with tree-sitter token that spans multiple lines",async()=>{const n=`/**
**/

console.log('x');

`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,6,1),0,28);p(e),o.deepStrictEqual(e?.length,12),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with tree-sitter token that spans multiple lines \\r\\n",async()=>{const n=`/**\r
**/\r
\r
console.log('x');\r
\r
`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,6,1),0,33);p(e),o.deepStrictEqual(e?.length,12),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with tabs",async()=>{const n=`function x() {
	return true;
}

class Y {
	private z = false;
}`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,7,1),0,63);p(e),o.deepStrictEqual(e?.length,30),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("File with tabs \\r\\n",async()=>{const n=`function x() {\r
	return true;\r
}\r
\r
class Y {\r
	private z = false;\r
}`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,7,1),0,69);p(e),o.deepStrictEqual(e?.length,30),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("Template string",async()=>{const n="`t ${6}`",t=await c(n),e=l.getTokensInRange(t,new a(1,1,1,8),0,8);p(e),o.deepStrictEqual(e?.length,6),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)}),test("Many nested scopes",async()=>{const n=`y = new x(ttt({
	message: '{0} i\\n\\n [commandName]({1}).',
	args: ['Test', \`command:\${openSettingsCommand}?\${encodeURIComponent('["SettingName"]')}\`],
	// To make sure the translators don't break the link
	comment: ["{Locked=']({'}"]
}));`,t=await c(n),e=l.getTokensInRange(t,new a(1,1,6,5),0,238);p(e),o.deepStrictEqual(e?.length,65),o.deepStrictEqual(g(e),n.length),r.destroyModel(t.uri)})});
