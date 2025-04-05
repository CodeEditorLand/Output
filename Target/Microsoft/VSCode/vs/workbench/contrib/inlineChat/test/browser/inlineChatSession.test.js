import n from"assert";import{DisposableStore as N}from"../../../../../base/common/lifecycle.js";import{Event as V}from"../../../../../base/common/event.js";import{mock as E}from"../../../../../base/test/common/mock.js";import{ensureNoDisposablesAreLeakedInTestSuite as C}from"../../../../../base/test/common/utils.js";import{TestDiffProviderFactoryService as T}from"../../../../../editor/test/browser/diff/testDiffProviderFactoryService.js";import"../../../../../editor/browser/editorBrowser.js";import{IDiffProviderFactoryService as R}from"../../../../../editor/browser/widget/diffEditor/diffProviderFactoryService.js";import{Range as m}from"../../../../../editor/common/core/range.js";import"../../../../../editor/common/model.js";import{IModelService as y}from"../../../../../editor/common/services/model.js";import{instantiateTestCodeEditor as b}from"../../../../../editor/test/browser/testCodeEditor.js";import{IConfigurationService as p}from"../../../../../platform/configuration/common/configuration.js";import{TestConfigurationService as v}from"../../../../../platform/configuration/test/common/testConfigurationService.js";import{IContextKeyService as x}from"../../../../../platform/contextkey/common/contextkey.js";import{SyncDescriptor as f}from"../../../../../platform/instantiation/common/descriptors.js";import{ServiceCollection as O}from"../../../../../platform/instantiation/common/serviceCollection.js";import"../../../../../platform/instantiation/test/common/instantiationServiceMock.js";import{MockContextKeyService as k}from"../../../../../platform/keybinding/test/common/mockKeybindingService.js";import{IEditorProgressService as j}from"../../../../../platform/progress/common/progress.js";import{IViewDescriptorService as _}from"../../../../common/views.js";import"../../../accessibility/browser/accessibilityConfiguration.js";import{IChatAccessibilityService as H,IChatWidgetService as z}from"../../../chat/browser/chat.js";import"../../../chat/common/chatViewModel.js";import{HunkState as w}from"../../browser/inlineChatSession.js";import{IInlineChatSessionService as M}from"../../browser/inlineChatSessionService.js";import{InlineChatSessionServiceImpl as F}from"../../browser/inlineChatSessionServiceImpl.js";import{workbenchInstantiationService as W}from"../../../../test/browser/workbenchTestServices.js";import{CancellationToken as d}from"../../../../../base/common/cancellation.js";import{assertType as u}from"../../../../../base/common/types.js";import{EditOperation as i}from"../../../../../editor/common/core/editOperation.js";import{Position as r}from"../../../../../editor/common/core/position.js";import{IEditorWorkerService as U}from"../../../../../editor/common/services/editorWorker.js";import{TestWorkerService as L}from"./testWorkerService.js";import{IExtensionService as P,nullExtensionDescription as B}from"../../../../services/extensions/common/extensions.js";import{ILogService as K,NullLogService as G}from"../../../../../platform/log/common/log.js";import{ITelemetryService as X}from"../../../../../platform/telemetry/common/telemetry.js";import{NullTelemetryService as J}from"../../../../../platform/telemetry/common/telemetryUtils.js";import{IWorkspaceContextService as Q}from"../../../../../platform/workspace/common/workspace.js";import{ChatWidgetService as Y}from"../../../chat/browser/chatWidget.js";import{IChatService as Z}from"../../../chat/common/chatService.js";import{ChatService as $}from"../../../chat/common/chatServiceImpl.js";import{IChatSlashCommandService as ee,ChatSlashCommandService as te}from"../../../chat/common/chatSlashCommands.js";import{IChatVariablesService as ne}from"../../../chat/common/chatVariables.js";import{IChatWidgetHistoryService as ie,ChatWidgetHistoryService as oe}from"../../../chat/common/chatWidgetHistoryService.js";import{IViewsService as re}from"../../../../services/views/common/viewsService.js";import{TestExtensionService as A,TestContextService as ae}from"../../../../test/common/workbenchTestServices.js";import{IChatAgentService as q,ChatAgentService as se}from"../../../chat/common/chatAgents.js";import{ChatVariablesService as le}from"../../../chat/browser/chatVariables.js";import{ICommandService as ue}from"../../../../../platform/commands/common/commands.js";import{TestCommandService as ce}from"../../../../../editor/test/browser/editorTestServices.js";import{IAccessibleViewService as de}from"../../../../../platform/accessibility/browser/accessibleView.js";import{IWorkbenchAssignmentService as fe}from"../../../../services/assignment/common/assignmentService.js";import{NullWorkbenchAssignmentService as ge}from"../../../../services/assignment/test/common/nullAssignmentService.js";import{ILanguageModelToolsService as me}from"../../../chat/common/languageModelToolsService.js";import{MockLanguageModelToolsService as we}from"../../../chat/test/common/mockLanguageModelToolsService.js";import"../../../chat/common/chatModel.js";import{assertSnapshot as S}from"../../../../../base/test/common/snapshot.js";import{constObservable as he}from"../../../../../base/common/observable.js";import{IChatEditingService as Ee}from"../../../chat/common/chatEditingService.js";import{ChatAgentLocation as Ie}from"../../../chat/common/constants.js";import{ChatTransferService as Se,IChatTransferService as pe}from"../../../chat/common/chatTransferService.js";suite("InlineChatSession",function(){const h=new N;let o,l,I,a;setup(function(){const t=new k,e=new O([p,new v],[ne,new f(le)],[K,new G],[X,J],[P,new A],[x,new k],[re,new A],[Q,new ae],[ie,new f(oe)],[z,new f(Y)],[ee,new f(te)],[pe,new f(Se)],[Z,new f($)],[U,new f(L)],[q,new f(se)],[x,t],[R,new f(T)],[M,new f(F)],[ue,new f(ce)],[me,new we],[j,new class extends E(){show(s,D){return{total(){},worked(ve){},done(){}}}}],[Ee,new class extends E(){editingSessionsObs=he([])}],[H,new class extends E(){acceptResponse(s,D){}acceptRequest(){return-1}}],[de,new class extends E(){getOpenAriaHint(s){return null}}],[p,new v],[_,new class extends E(){onDidChangeLocation=V.None}],[fe,new ge]);I=h.add(W(void 0,h).createChild(e)),a=h.add(I.get(M)),I.get(q).registerDynamicAgent({extensionId:B.identifier,publisherDisplayName:"",extensionDisplayName:"",extensionPublisherId:"",id:"testAgent",name:"testAgent",isDefault:!0,locations:[Ie.Editor],metadata:{},slashCommands:[],disambiguation:[]},{async invoke(){return{}}}),l=h.add(I.get(y).createModel(`one
two
three
four
five
six
seven
eight
nine
ten
eleven`,null)),o=h.add(b(I,l))}),teardown(function(){h.clear()}),C();async function c(t){const e=a.getSession(o,o.getModel().uri);u(e),e.hunkData.ignoreTextModelNChanges=!0;try{o.executeEdits("test",Array.isArray(t)?t:[t])}finally{e.hunkData.ignoreTextModelNChanges=!1}await e.hunkData.recompute({applied:0,sha1:"fakeSha1"})}function g(t){o.executeEdits("test",Array.isArray(t)?t:[t])}test("Create, release",async function(){const t=await a.createSession(o,{},d.None);u(t),a.releaseSession(t)}),test("HunkData, info",async function(){const t=l.getAllDecorations().length,e=await a.createSession(o,{},d.None);u(e),n.ok(e.textModelN===l),await c(i.insert(new r(1,1),`AI_EDIT
`)),n.strictEqual(e.hunkData.size,1);let[s]=e.hunkData.getInfo();u(s),n.ok(!e.textModel0.equalsTextBuffer(e.textModelN.getTextBuffer())),n.strictEqual(s.getState(),w.Pending),n.ok(s.getRangesN()[0].equalsRange({startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:8})),await c(i.insert(new r(1,3),"foobar")),[s]=e.hunkData.getInfo(),n.ok(s.getRangesN()[0].equalsRange({startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:14})),a.releaseSession(e),n.strictEqual(l.getAllDecorations().length,t)}),test("HunkData, accept",async function(){const t=await a.createSession(o,{},d.None);u(t),await c([i.insert(new r(1,1),`AI_EDIT
`),i.insert(new r(10,1),`AI_EDIT
`)]),n.strictEqual(t.hunkData.size,2),n.ok(!t.textModel0.equalsTextBuffer(t.textModelN.getTextBuffer()));for(const e of t.hunkData.getInfo())u(e),n.strictEqual(e.getState(),w.Pending),e.acceptChanges(),n.strictEqual(e.getState(),w.Accepted);n.strictEqual(t.textModel0.getValue(),t.textModelN.getValue()),a.releaseSession(t)}),test("HunkData, reject",async function(){const t=await a.createSession(o,{},d.None);u(t),await c([i.insert(new r(1,1),`AI_EDIT
`),i.insert(new r(10,1),`AI_EDIT
`)]),n.strictEqual(t.hunkData.size,2),n.ok(!t.textModel0.equalsTextBuffer(t.textModelN.getTextBuffer()));for(const e of t.hunkData.getInfo())u(e),n.strictEqual(e.getState(),w.Pending),e.discardChanges(),n.strictEqual(e.getState(),w.Rejected);n.strictEqual(t.textModel0.getValue(),t.textModelN.getValue()),a.releaseSession(t)}),test("HunkData, N rounds",async function(){l.setValue(`one
two
three
four
five
six
seven
eight
nine
ten
eleven
twelwe
thirteen
fourteen
fifteen
sixteen
seventeen
eighteen
nineteen
`);const t=await a.createSession(o,{},d.None);u(t),n.ok(t.textModel0.equalsTextBuffer(t.textModelN.getTextBuffer())),n.strictEqual(t.hunkData.size,0),await c([i.insert(new r(1,1),"AI1"),i.insert(new r(4,1),"AI2"),i.insert(new r(19,1),"AI3")]),n.strictEqual(t.hunkData.size,2);let[e,s]=t.hunkData.getInfo();n.ok(l.getValueInRange(e.getRangesN()[0]).includes("AI1")),n.ok(l.getValueInRange(e.getRangesN()[0]).includes("AI2")),n.ok(l.getValueInRange(s.getRangesN()[0]).includes("AI3")),n.ok(!t.textModel0.getValueInRange(e.getRangesN()[0]).includes("AI1")),n.ok(!t.textModel0.getValueInRange(e.getRangesN()[0]).includes("AI2")),n.ok(!t.textModel0.getValueInRange(s.getRangesN()[0]).includes("AI3")),e.acceptChanges(),n.ok(t.textModel0.getValueInRange(e.getRangesN()[0]).includes("AI1")),n.ok(t.textModel0.getValueInRange(e.getRangesN()[0]).includes("AI2")),n.ok(!t.textModel0.getValueInRange(s.getRangesN()[0]).includes("AI3")),await c([i.insert(new r(7,1),"AI4")]),n.strictEqual(t.hunkData.size,2),[e,s]=t.hunkData.getInfo(),n.ok(l.getValueInRange(e.getRangesN()[0]).includes("AI4")),n.ok(l.getValueInRange(s.getRangesN()[0]).includes("AI3")),a.releaseSession(t)}),test("HunkData, (mirror) edit before",async function(){const t=["one","two","three"];l.setValue(t.join(`
`));const e=await a.createSession(o,{},d.None);u(e),await c([i.insert(new r(3,1),`AI WAS HERE
`)]),n.strictEqual(e.textModelN.getValue(),["one","two","AI WAS HERE","three"].join(`
`)),n.strictEqual(e.textModel0.getValue(),t.join(`
`)),g([i.replace(new m(1,1,1,4),"ONE")]),n.strictEqual(e.textModelN.getValue(),["ONE","two","AI WAS HERE","three"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["ONE","two","three"].join(`
`))}),test("HunkData, (mirror) edit after",async function(){const t=["one","two","three","four","five"];l.setValue(t.join(`
`));const e=await a.createSession(o,{},d.None);u(e),await c([i.insert(new r(3,1),`AI_EDIT
`)]),n.strictEqual(e.hunkData.size,1);const[s]=e.hunkData.getInfo();g([i.insert(new r(1,1),"USER1")]),n.strictEqual(e.textModelN.getValue(),["USER1one","two","AI_EDIT","three","four","five"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["USER1one","two","three","four","five"].join(`
`)),g([i.insert(new r(5,1),"USER2")]),n.strictEqual(e.textModelN.getValue(),["USER1one","two","AI_EDIT","three","USER2four","five"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["USER1one","two","three","USER2four","five"].join(`
`)),s.acceptChanges(),n.strictEqual(e.textModelN.getValue(),["USER1one","two","AI_EDIT","three","USER2four","five"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["USER1one","two","AI_EDIT","three","USER2four","five"].join(`
`))}),test("HunkData, (mirror) edit inside ",async function(){const t=["one","two","three"];l.setValue(t.join(`
`));const e=await a.createSession(o,{},d.None);u(e),await c([i.insert(new r(3,1),`AI WAS HERE
`)]),n.strictEqual(e.textModelN.getValue(),["one","two","AI WAS HERE","three"].join(`
`)),n.strictEqual(e.textModel0.getValue(),t.join(`
`)),g([i.replace(new m(3,4,3,7),"wwaaassss")]),n.strictEqual(e.textModelN.getValue(),["one","two","AI wwaaassss HERE","three"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","three"].join(`
`))}),test("HunkData, (mirror) edit after dicard ",async function(){const t=["one","two","three"];l.setValue(t.join(`
`));const e=await a.createSession(o,{},d.None);u(e),await c([i.insert(new r(3,1),`AI WAS HERE
`)]),n.strictEqual(e.textModelN.getValue(),["one","two","AI WAS HERE","three"].join(`
`)),n.strictEqual(e.textModel0.getValue(),t.join(`
`)),n.strictEqual(e.hunkData.size,1);const[s]=e.hunkData.getInfo();s.discardChanges(),n.strictEqual(e.textModelN.getValue(),t.join(`
`)),n.strictEqual(e.textModel0.getValue(),t.join(`
`)),g([i.replace(new m(3,4,3,6),"3333")]),n.strictEqual(e.textModelN.getValue(),["one","two","thr3333"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","thr3333"].join(`
`))}),test("HunkData, (mirror) edit after, multi turn",async function(){const t=["one","two","three","four","five"];l.setValue(t.join(`
`));const e=await a.createSession(o,{},d.None);u(e),await c([i.insert(new r(3,1),`AI_EDIT
`)]),n.strictEqual(e.hunkData.size,1),g([i.insert(new r(5,1),"FOO")]),n.strictEqual(e.textModelN.getValue(),["one","two","AI_EDIT","three","FOOfour","five"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","three","FOOfour","five"].join(`
`)),await c([i.insert(new r(2,4)," zwei")]),n.strictEqual(e.hunkData.size,1),n.strictEqual(e.textModelN.getValue(),["one","two zwei","AI_EDIT","three","FOOfour","five"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","three","FOOfour","five"].join(`
`)),g([i.replace(new m(6,3,6,5),"vefivefi")]),n.strictEqual(e.textModelN.getValue(),["one","two zwei","AI_EDIT","three","FOOfour","fivefivefi"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","three","FOOfour","fivefivefi"].join(`
`))}),test("HunkData, (mirror) edit after, multi turn 2",async function(){const t=["one","two","three","four","five"];l.setValue(t.join(`
`));const e=await a.createSession(o,{},d.None);u(e),await c([i.insert(new r(3,1),`AI_EDIT
`)]),n.strictEqual(e.hunkData.size,1),g([i.insert(new r(5,1),"FOO")]),n.strictEqual(e.textModelN.getValue(),["one","two","AI_EDIT","three","FOOfour","five"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","three","FOOfour","five"].join(`
`)),await c([i.insert(new r(2,4),"zwei")]),n.strictEqual(e.hunkData.size,1),n.strictEqual(e.textModelN.getValue(),["one","twozwei","AI_EDIT","three","FOOfour","five"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","three","FOOfour","five"].join(`
`)),g([i.replace(new m(6,3,6,5),"vefivefi")]),n.strictEqual(e.textModelN.getValue(),["one","twozwei","AI_EDIT","three","FOOfour","fivefivefi"].join(`
`)),n.strictEqual(e.textModel0.getValue(),["one","two","three","FOOfour","fivefivefi"].join(`
`)),e.hunkData.getInfo()[0].acceptChanges(),n.strictEqual(e.textModelN.getValue(),e.textModel0.getValue()),g([i.replace(new m(1,1,1,1),"done")]),n.strictEqual(e.textModelN.getValue(),e.textModel0.getValue())}),test("HunkData, accept, discardAll",async function(){const t=await a.createSession(o,{},d.None);u(t),await c([i.insert(new r(1,1),`AI_EDIT
`),i.insert(new r(10,1),`AI_EDIT
`)]),n.strictEqual(t.hunkData.size,2),n.ok(!t.textModel0.equalsTextBuffer(t.textModelN.getTextBuffer()));const e=t.textModelN.getValue();t.hunkData.getInfo()[0].acceptChanges(),n.strictEqual(e,t.textModelN.getValue()),t.hunkData.discardAll(),n.strictEqual(t.textModelN.getValue(),`AI_EDIT
one
two
three
four
five
six
seven
eight
nine
ten
eleven`),n.strictEqual(t.textModelN.getValue(),t.textModel0.getValue()),a.releaseSession(t)}),test("HunkData, discardAll return undo edits",async function(){const t=await a.createSession(o,{},d.None);u(t),await c([i.insert(new r(1,1),`AI_EDIT
`),i.insert(new r(10,1),`AI_EDIT
`)]),n.strictEqual(t.hunkData.size,2),n.ok(!t.textModel0.equalsTextBuffer(t.textModelN.getTextBuffer()));const e=t.textModelN.getValue();t.hunkData.getInfo()[0].acceptChanges(),n.strictEqual(e,t.textModelN.getValue());const s=t.hunkData.discardAll();n.strictEqual(t.textModelN.getValue(),`AI_EDIT
one
two
three
four
five
six
seven
eight
nine
ten
eleven`),n.strictEqual(t.textModelN.getValue(),t.textModel0.getValue()),t.textModelN.pushEditOperations(null,s,()=>null),n.strictEqual(e,t.textModelN.getValue()),a.releaseSession(t)}),test('Pressing Escape after inline chat errored with "response filtered" leaves document dirty #7764',async function(){const t=`class Foo {
	private onError(error: string): void {
		if (/The request timed out|The network connection was lost/i.test(error)) {
			return;
		}

		error = error.replace(/See https://github.com/Squirrel/Squirrel.Mac/issues/182 for more information/, 'This might mean the application was put on quarantine by macOS. See [this link](https://github.com/microsoft/vscode/issues/7426#issuecomment-425093469) for more information');

		this.notificationService.notify({
			severity: Severity.Error,
			message: error,
			source: nls.localize('update service', "Update Service"),
		});
	}
}`;l.setValue(t);const e=await a.createSession(o,{},d.None);u(e);const s=new class extends E(){get id(){return"one"}};e.markModelVersion(s),n.strictEqual(o.getModel().getLineCount(),15),await c([i.replace(new m(7,1,7,Number.MAX_SAFE_INTEGER),`error = error.replace(
			/See https://github.com/Squirrel/Squirrel.Mac/issues/182 for more information/,
			'This might mean the application was put on quarantine by macOS. See [this link](https://github.com/microsoft/vscode/issues/7426#issuecomment-425093469) for more information'
		);`)]),n.strictEqual(o.getModel().getLineCount(),18),await e.undoChangesUntil(s.id),await e.hunkData.recompute({applied:0,sha1:"fakeSha1"},void 0),n.strictEqual(o.getModel().getValue(),t),e.hunkData.discardAll(),n.strictEqual(o.getModel().getValue(),t)}),test("Apply Code's preview should be easier to undo/esc #7537",async function(){l.setValue(`export function fib(n) {
	if (n <= 0) return 0;
	if (n === 1) return 0;
	if (n === 2) return 1;
	return fib(n - 1) + fib(n - 2);
}`);const t=await a.createSession(o,{},d.None);u(t),await c([i.replace(new m(5,1,6,Number.MAX_SAFE_INTEGER),`
	let a = 0, b = 1, c;
	for (let i = 3; i <= n; i++) {
		c = a + b;
		a = b;
		b = c;
	}
	return b;
}`)]),n.strictEqual(t.hunkData.size,1),n.strictEqual(t.hunkData.pending,1),n.ok(t.hunkData.getInfo().every(e=>e.getState()===w.Pending)),await S(o.getModel().getValue(),{name:"1"}),await l.undo(),await S(o.getModel().getValue(),{name:"2"}),n.strictEqual(t.hunkData.size,1),n.strictEqual(t.hunkData.pending,0),n.ok(t.hunkData.getInfo().every(e=>e.getState()===w.Accepted)),t.hunkData.discardAll(),await S(o.getModel().getValue(),{name:"2"})})});
