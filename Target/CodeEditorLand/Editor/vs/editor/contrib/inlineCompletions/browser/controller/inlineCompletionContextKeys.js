import{autorun as c}from"../../../../../base/common/observable.js";import{firstNonWhitespaceIndex as b}from"../../../../../base/common/strings.js";import{CursorColumns as m}from"../../../../common/core/cursorColumns.js";import"../model/inlineCompletionsModel.js";import{RawContextKey as n}from"../../../../../platform/contextkey/common/contextkey.js";import{Disposable as S}from"../../../../../base/common/lifecycle.js";import{localize as t}from"../../../../../nls.js";import{bindContextKey as I}from"../../../../../platform/observable/common/platformObservableUtils.js";class s extends S{constructor(y,T){super();this.contextKeyService=y;this.model=T;this._register(I(s.inlineEditVisible,this.contextKeyService,i=>this.model.read(i)?.stateInlineEdit.read(i)!==void 0)),this._register(c(i=>{const e=this.model.read(i)?.state.read(i),l=!!e?.inlineCompletion&&e?.primaryGhostText!==void 0&&!e?.primaryGhostText.isEmpty();this.inlineCompletionVisible.set(l),e?.primaryGhostText&&e?.inlineCompletion&&this.suppressSuggestions.set(e.inlineCompletion.inlineCompletion.source.inlineCompletions.suppressSuggestions)})),this._register(c(i=>{const o=this.model.read(i);let e=!1,l=!0;const a=o?.primaryGhostText.read(i);if(o?.selectedSuggestItem&&a&&a.parts.length>0){const{column:g,lines:h}=a.parts[0],d=h[0],p=o.textModel.getLineIndentColumn(a.lineNumber);if(g<=p){let r=b(d);r===-1&&(r=d.length-1),e=r>0;const u=o.textModel.getOptions().tabSize;l=m.visibleColumnFromColumn(d,r+1,u)<u}}this.inlineCompletionSuggestsIndentation.set(e),this.inlineCompletionSuggestsIndentationLessThanTabSize.set(l)}))}static inlineSuggestionVisible=new n("inlineSuggestionVisible",!1,t("inlineSuggestionVisible","Whether an inline suggestion is visible"));static inlineSuggestionHasIndentation=new n("inlineSuggestionHasIndentation",!1,t("inlineSuggestionHasIndentation","Whether the inline suggestion starts with whitespace"));static inlineSuggestionHasIndentationLessThanTabSize=new n("inlineSuggestionHasIndentationLessThanTabSize",!0,t("inlineSuggestionHasIndentationLessThanTabSize","Whether the inline suggestion starts with whitespace that is less than what would be inserted by tab"));static suppressSuggestions=new n("inlineSuggestionSuppressSuggestions",void 0,t("suppressSuggestions","Whether suggestions should be suppressed for the current suggestion"));static cursorInIndentation=new n("cursorInIndentation",!1,t("cursorInIndentation","Whether the cursor is in indentation"));static hasSelection=new n("editor.hasSelection",!1,t("editor.hasSelection","Whether the editor has a selection"));static cursorAtInlineEdit=new n("cursorAtInlineEdit",!1,t("cursorAtInlineEdit","Whether the cursor is at an inline edit"));static inlineEditVisible=new n("inlineEditIsVisible",!1,t("inlineEditVisible","Whether an inline edit is visible"));inlineCompletionVisible=s.inlineSuggestionVisible.bindTo(this.contextKeyService);inlineCompletionSuggestsIndentation=s.inlineSuggestionHasIndentation.bindTo(this.contextKeyService);inlineCompletionSuggestsIndentationLessThanTabSize=s.inlineSuggestionHasIndentationLessThanTabSize.bindTo(this.contextKeyService);suppressSuggestions=s.suppressSuggestions.bindTo(this.contextKeyService)}export{s as InlineCompletionContextKeys};
