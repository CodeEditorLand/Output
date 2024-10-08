import{EditorOptions as o,WrappingIndent as t,EditorAutoIndentStrategy as a}from"./common/config/editorOptions.js";import{createMonacoBaseAPI as r}from"./common/services/editorBaseApi.js";import{createMonacoEditorAPI as i}from"./standalone/browser/standaloneEditor.js";import{createMonacoLanguagesAPI as s}from"./standalone/browser/standaloneLanguages.js";import{FormattingConflicts as c}from"./contrib/format/browser/format.js";o.wrappingIndent.defaultValue=t.None,o.glyphMargin.defaultValue=!1,o.autoIndent.defaultValue=a.Advanced,o.overviewRulerLanes.defaultValue=2,c.setFormatterSelector((n,d,g)=>Promise.resolve(n[0]));const e=r();e.editor=i(),e.languages=s();const y=e.CancellationTokenSource,x=e.Emitter,M=e.KeyCode,T=e.KeyMod,b=e.Position,I=e.Range,S=e.Selection,E=e.SelectionDirection,h=e.MarkerSeverity,k=e.MarkerTag,P=e.Uri,A=e.Token,C=e.editor,K=e.languages,l=globalThis.MonacoEnvironment;(l?.globalAPI||typeof globalThis.define=="function"&&globalThis.define.amd)&&(globalThis.monaco=e),typeof globalThis.require<"u"&&typeof globalThis.require.config=="function"&&globalThis.require.config({ignoreDuplicateModules:["vscode-languageserver-types","vscode-languageserver-types/main","vscode-languageserver-textdocument","vscode-languageserver-textdocument/main","vscode-nls","vscode-nls/vscode-nls","jsonc-parser","jsonc-parser/main","vscode-uri","vscode-uri/index","vs/basic-languages/typescript/typescript"]});export{y as CancellationTokenSource,x as Emitter,M as KeyCode,T as KeyMod,h as MarkerSeverity,k as MarkerTag,b as Position,I as Range,S as Selection,E as SelectionDirection,A as Token,P as Uri,C as editor,K as languages};
