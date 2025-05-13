import*as u from"../../../../../base/browser/dom.js";import{$W7 as m}from"../../../../../base/browser/ui/button/button.js";import{$td as p}from"../../../../../base/common/lifecycle.js";import{localize as h}from"../../../../../nls.js";import{$Fo as g}from"../../../../../platform/telemetry/common/telemetry.js";import{$aS as C}from"../../common/chatModel.js";import{$6H as _}from"../../../../services/editor/common/editorService.js";var b=function(r,t,o,e){var a=arguments.length,n=a<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,o):e,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,t,o,e);else for(var d=r.length-1;d>=0;d--)(i=r[d])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n},l=function(r,t){return function(o,e){t(o,e,r)}};let s=class extends p{constructor(t,o,e,a){super(),this.a=e,this.b=a;const n=C(t.citations),i=u.h(".chat-code-citation-message@root",[u.h("span.chat-code-citation-label@label"),u.h(".chat-code-citation-button-container@button")]);i.label.textContent=n+" - ";const d=this.B(new m(i.button,{buttonBackground:void 0,buttonBorder:void 0,buttonForeground:void 0,buttonHoverBackground:void 0,buttonSecondaryBackground:void 0,buttonSecondaryForeground:void 0,buttonSecondaryHoverBackground:void 0,buttonSeparator:void 0}));d.label=h(5072,null),this.B(d.onDidClick(()=>{const f=`# Code Citations

`+t.citations.map(c=>`## License: ${c.license}
${c.value.toString()}

\`\`\`
${c.snippet}
\`\`\`

`).join(`
`);this.a.openEditor({resource:void 0,contents:f,languageId:"markdown"}),this.b.publicLog2("openedChatCodeCitations")})),this.domNode=i.root}hasSameContent(t,o,e){return t.kind==="codeCitations"}};s=b([l(2,_),l(3,g)],s);export{s as $_Lb};
