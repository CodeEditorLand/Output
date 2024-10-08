import*as u from"../../../../../../base/browser/dom.js";import{createTrustedTypesPolicy as C}from"../../../../../../base/browser/trustedTypes.js";import{Color as L}from"../../../../../../base/common/color.js";import*as h from"../../../../../../base/common/platform.js";import"../../../../../../editor/browser/editorBrowser.js";import{EditorOption as M}from"../../../../../../editor/common/config/editorOptions.js";import{Range as y}from"../../../../../../editor/common/core/range.js";import{ColorId as p}from"../../../../../../editor/common/encodedTokenAttributes.js";import*as I from"../../../../../../editor/common/languages.js";import{tokenizeLineToHTML as H}from"../../../../../../editor/common/languages/textToHtmlTokenizer.js";import"../../../../../../editor/common/model.js";import"../notebookRenderingCommon.js";class d{static _ttPolicy=C("cellRendererEditorText",{createHTML(t){return t}});getRichText(t,o){const n=t.getModel();if(!n)return null;const e=this.getDefaultColorMap(),i=t.getOptions().get(M.fontInfo),l="--notebook-editor-font-family",s="--notebook-editor-font-size",m="--notebook-editor-font-weight",a=`color: ${e[p.DefaultForeground]};background-color: ${e[p.DefaultBackground]};font-family: var(${l});font-weight: var(${m});font-size: var(${s});line-height: ${i.lineHeight}px;white-space: pre;`,r=u.$("div",{style:a}),f=i.fontSize,c=i.fontWeight;r.style.setProperty(l,i.fontFamily),r.style.setProperty(s,`${f}px`),r.style.setProperty(m,c);const g=this.getRichTextLinesAsHtml(n,o,e);return r.innerHTML=g,r}getRichTextLinesAsHtml(t,o,n){const e=o.startLineNumber,i=o.startColumn,l=o.endLineNumber,s=o.endColumn,m=t.getOptions().tabSize;let a="";for(let r=e;r<=l;r++){const f=t.tokenization.getLineTokens(r),c=f.getLineContent(),g=r===e?i-1:0,T=r===l?s-1:c.length;c===""?a+="<br>":a+=H(c,f.inflate(),n,g,T,m,h.isWindows)}return d._ttPolicy?.createHTML(a)??a}getDefaultColorMap(){const t=I.TokenizationRegistry.getColorMap(),o=["#000000"];if(t)for(let n=1,e=t.length;n<e;n++)o[n]=L.Format.CSS.formatHex(t[n]);return o}}class P{getDragImage(t,o,n){let e=this.getDragImageImpl(t,o,n);return e||(e=document.createElement("div"),e.textContent="1 cell"),e}getDragImageImpl(t,o,n){const e=t.container.cloneNode(!0);e.classList.forEach(s=>e.classList.remove(s)),e.classList.add("cell-drag-image","monaco-list-row","focused",`${n}-cell-row`);const i=e.querySelector(".cell-editor-container");if(!i)return null;const l=new d().getRichText(o,new y(1,1,1,1e3));return l?(u.reset(i,l),e):null}}export{P as CodeCellDragImageRenderer};
