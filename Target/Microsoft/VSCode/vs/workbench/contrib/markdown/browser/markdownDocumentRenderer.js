import{$m9 as b,$o9 as x}from"../../../../base/browser/domSanitize.js";import{$t9 as w}from"../../../../base/browser/markdownRenderer.js";import*as y from"../../../../base/common/marked/marked.js";import{Schemas as h}from"../../../../base/common/network.js";import{$Df as v}from"../../../../base/common/strings.js";import{$Keb as k}from"../../../../editor/common/languages/textToHtmlTokenizer.js";import{$Ljc as $}from"./markedGfmHeadingIdPlugin.js";const T=`
body {
	padding: 10px 20px;
	line-height: 22px;
	max-width: 882px;
	margin: 0 auto;
}

body *:last-child {
	margin-bottom: 0;
}

img {
	max-width: 100%;
	max-height: 100%;
}

a {
	text-decoration: var(--text-link-decoration);
}

a:hover {
	text-decoration: underline;
}

a:focus,
input:focus,
select:focus,
textarea:focus {
	outline: 1px solid -webkit-focus-ring-color;
	outline-offset: -1px;
}

hr {
	border: 0;
	height: 2px;
	border-bottom: 2px solid;
}

h1 {
	padding-bottom: 0.3em;
	line-height: 1.2;
	border-bottom-width: 1px;
	border-bottom-style: solid;
}

h1, h2, h3 {
	font-weight: normal;
}

table {
	border-collapse: collapse;
}

th {
	text-align: left;
	border-bottom: 1px solid;
}

th,
td {
	padding: 5px 10px;
}

table > tbody > tr + tr > td {
	border-top-width: 1px;
	border-top-style: solid;
}

blockquote {
	margin: 0 7px 0 5px;
	padding: 0 16px 0 10px;
	border-left-width: 5px;
	border-left-style: solid;
}

code {
	font-family: "SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace;
}

pre {
	padding: 16px;
	border-radius: 3px;
	overflow: auto;
}

pre code {
	font-family: var(--vscode-editor-font-family);
	font-weight: var(--vscode-editor-font-weight);
	font-size: var(--vscode-editor-font-size);
	line-height: 1.5;
	color: var(--vscode-editor-foreground);
	tab-size: 4;
}

.monaco-tokenized-source {
	white-space: pre;
}

/** Theming */

.pre {
	background-color: var(--vscode-textCodeBlock-background);
}

.vscode-high-contrast h1 {
	border-color: rgb(0, 0, 0);
}

.vscode-light th {
	border-color: rgba(0, 0, 0, 0.69);
}

.vscode-dark th {
	border-color: rgba(255, 255, 255, 0.69);
}

.vscode-light h1,
.vscode-light hr,
.vscode-light td {
	border-color: rgba(0, 0, 0, 0.18);
}

.vscode-dark h1,
.vscode-dark hr,
.vscode-dark td {
	border-color: rgba(255, 255, 255, 0.18);
}

@media (forced-colors: active) and (prefers-color-scheme: light){
	body {
		forced-color-adjust: none;
	}
}

@media (forced-colors: active) and (prefers-color-scheme: dark){
	body {
		forced-color-adjust: none;
	}
}
`,M=[h.http,h.https,h.command];function E(a,i=!1){return x(a,{allowedLinkProtocols:{override:i?"*":M},allowedTags:{override:[...b,"input","select","checkbox","checklist"]},allowedAttributes:{override:[...w,"data-command","name","id","role","tabindex","x-dispatch","required","checked","placeholder","when-checked","checked-on"]}})}async function P(a,i,r,t){const n=await new y.Marked(g.markedHighlight({async:!0,async highlight(s,c){if(typeof c!="string")return v(s);if(await i.whenInstalledExtensionsRegistered(),t?.token?.isCancellationRequested)return"";const l=r.getLanguageIdByLanguageName(c)??r.getLanguageIdByLanguageName(c.split(/\s+|:|,|(?!^)\{|\?]/,1)[0]);return k(r,s,l)}}),$(),...t?.markedExtensions??[]).parse(a,{async:!0});return t?.shouldSanitize??!0?E(n,t?.allowUnknownProtocols??!1):n}var g;(function(a){function i(e){if(typeof e=="function"&&(e={highlight:e}),!e||typeof e.highlight!="function")throw new Error("Must provide highlight function");return{async:!!e.async,walkTokens(o){if(o.type!=="code")return;if(e.async)return Promise.resolve(e.highlight(o.text,o.lang)).then(r(o));const d=e.highlight(o.text,o.lang);if(d instanceof Promise)throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");r(o)(d)},renderer:{code({text:o,lang:d,escaped:f}){const m=d?` class="language-${u(d)}"`:"";return o=o.replace(/\n$/,""),`<pre><code${m}>${f?o:u(o,!0)}
</code></pre>`}}}}a.markedHighlight=i;function r(e){return o=>{typeof o=="string"&&o!==e.text&&(e.escaped=!0,e.text=o)}}const t=/[&<>"']/,p=new RegExp(t.source,"g"),n=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,s=new RegExp(n.source,"g"),c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},l=e=>c[e];function u(e,o){if(o){if(t.test(e))return e.replace(p,l)}else if(n.test(e))return e.replace(s,l);return e}})(g||(g={}));export{T as $Mjc,P as $Njc};
