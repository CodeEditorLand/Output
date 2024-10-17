import{KeyCode as a,KeyMod as m}from"../../../../../base/common/keyCodes.js";import{asyncTransaction as C,transaction as h}from"../../../../../base/common/observable.js";import{splitLines as N}from"../../../../../base/common/strings.js";import*as o from"../../../../../nls.js";import{Action2 as V,MenuId as g}from"../../../../../platform/actions/common/actions.js";import{IClipboardService as T}from"../../../../../platform/clipboard/common/clipboardService.js";import{IConfigurationService as O}from"../../../../../platform/configuration/common/configuration.js";import{ContextKeyExpr as r}from"../../../../../platform/contextkey/common/contextkey.js";import{KeybindingWeight as x}from"../../../../../platform/keybinding/common/keybindingsRegistry.js";import"../../../../browser/editorBrowser.js";import{EditorAction as l}from"../../../../browser/editorExtensions.js";import{EditorContextKeys as n}from"../../../../common/editorContextKeys.js";import{Context as S}from"../../../suggest/browser/suggest.js";import{inlineSuggestCommitId as z,showNextInlineSuggestionActionId as P,showPreviousInlineSuggestionActionId as k}from"./commandIds.js";import{InlineCompletionContextKeys as i}from"./inlineCompletionContextKeys.js";import{InlineCompletionsController as c}from"./inlineCompletionsController.js";class v extends l{static ID=P;constructor(){super({id:v.ID,label:o.localize("action.inlineSuggest.showNext","Show Next Inline Suggestion"),alias:"Show Next Inline Suggestion",precondition:r.and(n.writable,i.inlineSuggestionVisible),kbOpts:{weight:100,primary:m.Alt|a.BracketRight}})}async run(s,t){c.get(t)?.model.get()?.next()}}class w extends l{static ID=k;constructor(){super({id:w.ID,label:o.localize("action.inlineSuggest.showPrevious","Show Previous Inline Suggestion"),alias:"Show Previous Inline Suggestion",precondition:r.and(n.writable,i.inlineSuggestionVisible),kbOpts:{weight:100,primary:m.Alt|a.BracketLeft}})}async run(s,t){c.get(t)?.model.get()?.previous()}}class Z extends l{constructor(){super({id:"editor.action.inlineSuggest.trigger",label:o.localize("action.inlineSuggest.trigger","Trigger Inline Suggestion"),alias:"Trigger Inline Suggestion",precondition:n.writable})}async run(s,t){const e=c.get(t);await C(async d=>{await e?.model.get()?.triggerExplicitly(d),e?.playAccessibilitySignal(d)})}}class _ extends l{constructor(){super({id:"editor.action.inlineSuggest.acceptNextWord",label:o.localize("action.inlineSuggest.acceptNextWord","Accept Next Word Of Inline Suggestion"),alias:"Accept Next Word Of Inline Suggestion",precondition:r.and(n.writable,i.inlineSuggestionVisible),kbOpts:{weight:x.EditorContrib+1,primary:m.CtrlCmd|a.RightArrow,kbExpr:r.and(n.writable,i.inlineSuggestionVisible)},menuOpts:[{menuId:g.InlineSuggestionToolbar,title:o.localize("acceptWord","Accept Word"),group:"primary",order:2}]})}async run(s,t){const e=c.get(t);await e?.model.get()?.acceptNextWord(e.editor)}}class ee extends l{constructor(){super({id:"editor.action.inlineSuggest.acceptNextLine",label:o.localize("action.inlineSuggest.acceptNextLine","Accept Next Line Of Inline Suggestion"),alias:"Accept Next Line Of Inline Suggestion",precondition:r.and(n.writable,i.inlineSuggestionVisible),kbOpts:{weight:x.EditorContrib+1},menuOpts:[{menuId:g.InlineSuggestionToolbar,title:o.localize("acceptLine","Accept Line"),group:"secondary",order:2}]})}async run(s,t){const e=c.get(t);await e?.model.get()?.acceptNextLine(e.editor)}}class ie extends l{constructor(){super({id:z,label:o.localize("action.inlineSuggest.accept","Accept Inline Suggestion"),alias:"Accept Inline Suggestion",precondition:r.or(i.inlineSuggestionVisible,i.inlineEditVisible),menuOpts:[{menuId:g.InlineSuggestionToolbar,title:o.localize("accept","Accept"),group:"primary",order:1},{menuId:g.InlineEditsActions,title:o.localize("accept","Accept"),group:"primary",order:1}],kbOpts:[{primary:a.Tab,weight:200,kbExpr:r.or(r.and(i.inlineSuggestionVisible,n.tabMovesFocus.toNegated(),S.Visible.toNegated(),n.hoverFocused.toNegated(),i.inlineSuggestionHasIndentationLessThanTabSize),r.and(i.inlineEditVisible,n.tabMovesFocus.toNegated(),S.Visible.toNegated(),n.hoverFocused.toNegated(),i.hasSelection.toNegated(),i.cursorAtInlineEdit))},{primary:m.CtrlCmd|a.Enter,weight:200,kbExpr:r.and(n.editorTextFocus,i.inlineEditVisible,S.Visible.toNegated(),n.hoverFocused.toNegated(),n.tabMovesFocus.toNegated())}]})}async run(s,t){const e=c.get(t);e&&(e.model.get()?.accept(e.editor),e.editor.focus())}}class te extends l{constructor(){super({id:"editor.action.inlineSuggest.jump",label:o.localize("action.inlineSuggest.jump","Jump to next inline edit"),alias:"Jump to next inline edit",precondition:i.inlineEditVisible,menuOpts:[{menuId:g.InlineEditsActions,title:o.localize("jump","Jump"),group:"primary",order:2,when:i.cursorAtInlineEdit.toNegated()}],kbOpts:{primary:a.Tab,weight:201,kbExpr:r.and(i.inlineEditVisible,i.hasSelection.toNegated(),n.tabMovesFocus.toNegated(),S.Visible.toNegated(),n.hoverFocused.toNegated(),i.cursorAtInlineEdit.toNegated())}})}async run(s,t){const e=c.get(t);e&&e.jump()}}class y extends l{static ID="editor.action.inlineSuggest.hide";constructor(){super({id:y.ID,label:o.localize("action.inlineSuggest.hide","Hide Inline Suggestion"),alias:"Hide Inline Suggestion",precondition:r.or(i.inlineSuggestionVisible,i.inlineEditVisible),kbOpts:{weight:100,primary:a.Escape}})}async run(s,t){const e=c.get(t);h(d=>{e?.model.get()?.stop(d)})}}class f extends V{static ID="editor.action.inlineSuggest.toggleAlwaysShowToolbar";constructor(){super({id:f.ID,title:o.localize("action.inlineSuggest.alwaysShowToolbar","Always Show Toolbar"),f1:!1,precondition:void 0,menu:[{id:g.InlineSuggestionToolbar,group:"secondary",order:10}],toggled:r.equals("config.editor.inlineSuggest.showToolbar","always")})}async run(s,t){const e=s.get(O),p=e.getValue("editor.inlineSuggest.showToolbar")==="always"?"onHover":"always";e.updateValue("editor.inlineSuggest.showToolbar",p)}}class oe extends l{constructor(){super({id:"editor.action.inlineSuggest.dev.extractRepro",label:o.localize("action.inlineSuggest.dev.extractRepro","Developer: Extract Inline Suggest State"),alias:"Developer: Inline Suggest Extract Repro",precondition:i.inlineEditVisible})}async run(s,t){const e=s.get(T),p=c.get(t)?.model.get();if(!p)return;const b=p.extractReproSample(),A=N(JSON.stringify({inlineCompletion:b.inlineCompletion},null,4)).map(E=>"// "+E).join(`
`),I=`${b.documentValue}

// <json>
${A}
// </json>
`;return await e.writeText(I),{reproCase:I}}}export{ie as AcceptInlineCompletion,ee as AcceptNextLineOfInlineCompletion,_ as AcceptNextWordOfInlineCompletion,oe as DevExtractReproSample,y as HideInlineCompletion,te as JumpToNextInlineEdit,v as ShowNextInlineSuggestionAction,w as ShowPreviousInlineSuggestionAction,f as ToggleAlwaysShowInlineSuggestionToolbar,Z as TriggerInlineSuggestionAction};
