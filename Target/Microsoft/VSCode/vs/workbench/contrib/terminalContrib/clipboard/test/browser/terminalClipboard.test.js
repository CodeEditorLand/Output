import{strictEqual as e}from"assert";import{$29 as s}from"../../../../../../base/test/common/utils.js";import{$tl as a}from"../../../../../../platform/configuration/common/configuration.js";import{$sDc as r}from"../../../../../../platform/configuration/test/common/testConfigurationService.js";import{$1o as c}from"../../../../../../platform/dialogs/common/dialogs.js";import{$tDc as l}from"../../../../../../platform/dialogs/test/common/testDialogService.js";import{$xDc as d}from"../../../../../../platform/instantiation/test/common/instantiationServiceMock.js";import{$Upc as t}from"../../browser/terminalClipboard.js";suite("TerminalClipboard",function(){const u=s();suite("shouldPasteTerminalText",()=>{let n,o;setup(async()=>{n=u.add(new d),o=new r({"terminal.integrated.enableMultiLinePasteWarning":"auto"}),n.stub(a,o),n.stub(c,new l(void 0,{result:{confirmed:!1}}))});function i(f){o=new r({"terminal.integrated.enableMultiLinePasteWarning":f}),n.stub(a,o)}test("Single line string",async()=>{e(await n.invokeFunction(t,"foo",void 0),!0),i("always"),e(await n.invokeFunction(t,"foo",void 0),!0),i("never"),e(await n.invokeFunction(t,"foo",void 0),!0)}),test("Single line string with trailing new line",async()=>{e(await n.invokeFunction(t,`foo
`,void 0),!0),i("always"),e(await n.invokeFunction(t,`foo
`,void 0),!1),i("never"),e(await n.invokeFunction(t,`foo
`,void 0),!0)}),test("Multi-line string",async()=>{e(await n.invokeFunction(t,`foo
bar`,void 0),!1),i("always"),e(await n.invokeFunction(t,`foo
bar`,void 0),!1),i("never"),e(await n.invokeFunction(t,`foo
bar`,void 0),!0)}),test("Bracketed paste mode",async()=>{e(await n.invokeFunction(t,`foo
bar`,!0),!0),i("always"),e(await n.invokeFunction(t,`foo
bar`,!0),!1),i("never"),e(await n.invokeFunction(t,`foo
bar`,!0),!0)}),test("Legacy config",async()=>{i(!0),e(await n.invokeFunction(t,`foo
bar`,void 0),!1),e(await n.invokeFunction(t,`foo
bar`,!0),!0),i(!1),e(await n.invokeFunction(t,`foo
bar`,!0),!0)}),test("Invalid config",async()=>{i(123),e(await n.invokeFunction(t,`foo
bar`,void 0),!1),e(await n.invokeFunction(t,`foo
bar`,!0),!0)})})});
